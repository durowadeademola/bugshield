<?php

namespace App\Http\Requests;

use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

use App\Http\Requests\BaseFormRequest;

class StoreTransactionRequest extends BaseFormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'program_id' => 'required|exists:programs,id',
            'bounty_id' => 'required|exists:bounties,id',
            'researcher_id' => 'required|exists:users,id',
            'organization_id' => 'required|exists:organizations,id',
            'amount' => 'required|numeric',
            'status' => 'required|string',
            'payment_method' => 'required|string|max:255',
            'transaction_reference' => 'required|string|max:255|unique:transactions',
        ];
    }
}