<?php

namespace App\Http\Requests;

class UpdateAttachmentRequest extends BaseFormRequest
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
            'report_id' => 'required|exists:reports,id',
            'file_path' => 'required|string|max:255',
        ];
    }

    public function attributes(): array
    {
        return [
            'report_id' => 'report',
        ];
    }
}
