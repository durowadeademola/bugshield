<?php

namespace App\Http\Requests;

class StoreBountyRequest extends BaseFormRequest
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
            'report_id' => 'required|exists:reports,id',
            'researcher_id' => 'required|exists:users,id',
            'organization_id' => 'required|exists:organizations,id',
            'amount' => 'required|numeric',
            'status' => 'required|string',
            'is_low' => 'required|boolean',
            'is_medium' => 'required|boolean',
            'is_high' => 'required|boolean',
            'is_critical' => 'required|boolean',
            'is_informational' => 'required|boolean',
        ];
    }
}
