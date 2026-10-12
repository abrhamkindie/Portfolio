<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSkillRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'sometimes|required|string|max:255',
            'category' => 'nullable|string|max:100',
            'icon' => 'nullable|string|max:255',
            'proficiency' => 'sometimes|required|integer|min:0|max:100',
            'years_of_experience' => 'nullable|integer|min:0',
            'sort_order' => 'nullable|integer|min:0',
        ];
    }
}