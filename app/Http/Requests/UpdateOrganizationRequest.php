<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

use App\Http\Requests\BaseFormRequest;

class UpdateOrganizationRequest extends BaseFormRequest
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
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:organizations,email,' . $this->organization->id,
            'website' => 'nullable|url',
            'address' => 'nullable|string|max:255',
            'phone_number' => 'nullable|string|max:15',
            'description' => 'nullable|string',
            'country' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'logo_name' => 'nullable|string|max:255',
            'logo_path' => 'nullable|string|max:255',
            'is_active' => 'required|boolean',
        ];
    }
}
