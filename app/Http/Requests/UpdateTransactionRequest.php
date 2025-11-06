<?php

namespace App\Http\Requests;

class UpdateTransactionRequest extends BaseFormRequest
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
            'transaction_reference' => 'required|string|max:255|unique:transactions,transaction_reference,'.$this->transaction->id,
        ];
    }

    public function attributes(): array
    {
        return [
            'program_id' => 'program',
            'bounty_id' => 'bounty',
            'researcher_id' => 'researcher',
            'organization_id' => 'organization',
        ];
    }
}
