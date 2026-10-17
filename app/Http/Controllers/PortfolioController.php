<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    public function index()
    {
        $profile = Profile::with('user')->first();

        $projects = Project::where('published', true)
            ->orderBy('sort_order')
            ->orderByDesc('featured')
            ->orderByDesc('created_at')
            ->take(20)
            ->get();

        $skills = Skill::orderBy('category')
            ->orderBy('sort_order')
            ->take(50)
            ->get();

        $experiences = Experience::orderByDesc('start_date')
            ->take(20)
            ->get();

        $educations = Education::orderByDesc('start_date')
            ->take(20)
            ->get();

        $certificates = Certificate::orderByDesc('issued_at')
            ->take(20)
            ->get();

        return Inertia::render('Portfolio', [
            'initialData' => [
                'profile' => $profile ? $this->transformProfile($profile) : null,
                'projects' => $projects->map(fn($p) => $this->transformProject($p))->values(),
                'skills' => $skills->map(fn($s) => $this->transformSkill($s))->values(),
                'experiences' => $experiences->map(fn($e) => $this->transformExperience($e))->values(),
                'educations' => $educations->map(fn($e) => $this->transformEducation($e))->values(),
                'certificates' => $certificates->map(fn($c) => $this->transformCertificate($c))->values(),
            ],
        ]);
    }

    private function transformProfile($profile)
    {
        return [
            'id' => $profile->id,
            'full_name' => $profile->full_name,
            'title' => $profile->title,
            'bio' => $profile->bio,
            'avatar' => $profile->avatar,
            'email' => $profile->email,
            'phone' => $profile->phone,
            'location' => $profile->location,
            'github' => $profile->github,
            'linkedin' => $profile->linkedin,
            'twitter' => $profile->twitter,
            'website' => $profile->website,
        ];
    }

    private function transformProject($project)
    {
        return [
            'id' => $project->id,
            'title' => $project->title,
            'slug' => $project->slug,
            'description' => $project->description,
            'content' => $project->content,
            'thumbnail' => $project->thumbnail,
            'images' => $project->images,
            'technologies' => $project->technologies,
            'category' => $project->category,
            'live_url' => $project->live_url,
            'github_url' => $project->github_url,
            'featured' => $project->featured,
            'published' => $project->published,
            'completed_at' => $project->completed_at?->toISOString(),
        ];
    }

    private function transformSkill($skill)
    {
        return [
            'id' => $skill->id,
            'name' => $skill->name,
            'category' => $skill->category,
            'icon' => $skill->icon,
            'proficiency' => $skill->proficiency,
            'years_of_experience' => $skill->years_of_experience,
        ];
    }

    private function transformExperience($experience)
    {
        return [
            'id' => $experience->id,
            'company' => $experience->company,
            'position' => $experience->position,
            'location' => $experience->location,
            'description' => $experience->description,
            'start_date' => $experience->start_date?->toISOString(),
            'end_date' => $experience->end_date?->toISOString(),
            'is_current' => $experience->is_current,
        ];
    }

    private function transformEducation($education)
    {
        return [
            'id' => $education->id,
            'institution' => $education->institution,
            'degree' => $education->degree,
            'field_of_study' => $education->field_of_study,
            'location' => $education->location,
            'description' => $education->description,
            'start_date' => $education->start_date?->toISOString(),
            'end_date' => $education->end_date?->toISOString(),
            'is_current' => $education->is_current,
        ];
    }

    private function transformCertificate($certificate)
    {
        return [
            'id' => $certificate->id,
            'title' => $certificate->title,
            'issuer' => $certificate->issuer,
            'credential_id' => $certificate->credential_id,
            'credential_url' => $certificate->credential_url,
            'image' => $certificate->image,
            'description' => $certificate->description,
            'issued_at' => $certificate->issued_at?->toISOString(),
            'expires_at' => $certificate->expires_at?->toISOString(),
        ];
    }
}
