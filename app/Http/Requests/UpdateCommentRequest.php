<?php

namespace App\Http\Requests;

class UpdateCommentRequest extends BaseFormRequest
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
            'user_id' => 'required|exists:users,id',
            'message' => 'required|string|max:1000',
        ];
    }
}
