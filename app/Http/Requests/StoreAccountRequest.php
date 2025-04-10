<?php

namespace App\Http\Requests;

use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

use App\Http\Requests\BaseFormRequest;

class StoreAccountRequest extends BaseFormRequest
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
            'user_id' => 'required|exists:users,id',
            'account_number' => 'required|string|unique:accounts',
            'account_name' => 'required|string',
            'bank_name' => 'required|string',
            'bank_code' => 'required|string',
            'account_type' => 'required|string',
            'currency' => 'required|string',
            'balance' => 'nullable|numeric',
            'status' => 'required|in:active,inactive',
        ];
    }
}