<?php

namespace App\Http\Requests;

class StoreNotificationRequest extends BaseFormRequest
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
            'message' => 'required|string|max:1000',
            'read_status' => 'required|boolean',
        ];
    }

    public function attributes(): array
    {
        return [
            'user_id' => 'user',
        ];
    }
}
