<?php

namespace App\Http\Requests;

class UpdatePlanRequest extends BaseFormRequest
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
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'amount' => 'required|numeric',
            'max_reports' => 'nullable|integer',
            'is_free' => 'required|boolean',
            'is_basic' => 'required|boolean',
            'is_pro' => 'required|boolean',
            'is_enterprise' => 'required|boolean',
            'is_life_time' => 'required|boolean',
            'is_daily' => 'required|boolean',
            'is_weekly' => 'required|boolean',
            'is_monthly' => 'required|boolean',
            'is_yearly' => 'required|boolean',
            'custom_period' => 'nullable|string|max:100',
            'logo_name' => 'nullable|string|max:255',
            'logo_path' => 'nullable|string|max:255',
        ];
    }

    public function attributes(): array
    {
        return [];
    }
}
