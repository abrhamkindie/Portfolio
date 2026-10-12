<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Inertia\Inertia;

class WorkController extends Controller
{
    public function show(string $slug)
    {
        $project = Project::where('slug', $slug)->where('published', true)->firstOrFail();

        return Inertia::render('Work', [
            'project' => [
                'id' => $project->id,
                'title' => $project->title,
                'slug' => $project->slug,
                'description' => $project->description,
                'content' => $project->content,
                'thumbnail' => $project->thumbnail,
                'images' => $project->images ?? [],
                'technologies' => $project->technologies ?? [],
                'category' => $project->category,
                'live_url' => $project->live_url,
                'github_url' => $project->github_url,
                'completed_at' => $project->completed_at?->toDateString(),
            ],
        ]);
    }
}
