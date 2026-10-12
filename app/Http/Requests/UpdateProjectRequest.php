<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $projectId = $this->route('project');
        return [
            'title' => 'sometimes|required|string|max:255',
            'slug' => 'sometimes|required|string|max:255|unique:projects,slug,' . $projectId,
            'description' => 'sometimes|required|string',
            'content' => 'nullable|string',
            'thumbnail' => 'nullable|url|max:255',
            'images' => 'nullable|array',
            'images.*' => 'url|max:255',
            'technologies' => 'nullable|array',
            'technologies.*' => 'string|max:100',
            'category' => 'nullable|string|max:100',
            'live_url' => 'nullable|url|max:255',
            'github_url' => 'nullable|url|max:255',
            'featured' => 'boolean',
            'published' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
            'completed_at' => 'nullable|date',
        ];
    }
}