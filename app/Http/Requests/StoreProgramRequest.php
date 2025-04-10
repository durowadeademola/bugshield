<?php

namespace App\Http\Requests;

use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

use App\Http\Requests\BaseFormRequest;

class StoreProgramRequest extends BaseFormRequest
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
            'organization_id' => 'required|exists:organizations,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'is_public' => 'required|boolean',
            'is_private' => 'required|boolean',
            'is_active' => 'required|boolean',
            'is_vdp' => 'required|boolean',
            'is_managed' => 'required|boolean',
            'critical_bounty_range' => 'nullable|numeric',
            'high_bounty_range' => 'nullable|numeric',
            'medium_bounty_range' => 'nullable|numeric',
            'low_bounty_range' => 'nullable|numeric',
            'asset' => 'nullable|string|max:255',
            'in_scope' => 'nullable|string|max:1000',
            'out_of_scope' => 'nullable|string|max:1000',
            'logo_name' => 'nullable|string|max:255',
            'logo_path' => 'nullable|string|max:255',
        ];
    }
}