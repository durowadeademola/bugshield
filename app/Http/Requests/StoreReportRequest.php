<?php

namespace App\Http\Requests;

use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

use App\Http\Requests\BaseFormRequest;

class StoreReportRequest extends BaseFormRequest
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
            'researcher_id' => 'required|exists:users,id',
            'program_id' => 'required|exists:programs,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'status' => 'required|string',
            'is_low' => 'required|boolean',
            'is_medium' => 'required|boolean',
            'is_high' => 'required|boolean',
            'is_critical' => 'required|boolean',
            'is_informational' => 'required|boolean',
            'asset' => 'nullable|string|max:255',
            'weakness' => 'nullable|string|max:255',
            'severity' => 'nullable|string|max:255',
            'attch_name' => 'nullable|string|max:255',
            'impact' => 'nullable|string|max:1000',
        ];
    }
}