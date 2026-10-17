<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Message;
use App\Models\Project;
use App\Models\Skill;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'projects' => Project::count(),
                'published_projects' => Project::where('published', true)->count(),
                'skills' => Skill::count(),
                'experiences' => Experience::count(),
                'educations' => Education::count(),
                'certificates' => Certificate::count(),
                'messages' => Message::count(),
                'unread_messages' => Message::where('is_read', false)->count(),
            ],
            'projects' => Project::latest()->take(6)->get([
                'id',
                'title',
                'slug',
                'description',
                'thumbnail',
                'images',
                'technologies',
                'category',
                'featured',
                'published',
                'completed_at',
                'created_at',
            ]),
            'skills' => Skill::orderByDesc('proficiency')->take(8)->get([
                'id',
                'name',
                'category',
                'proficiency',
                'years_of_experience',
            ]),
            'messages' => Message::latest()->take(8)->get([
                'id',
                'name',
                'email',
                'subject',
                'message',
                'is_read',
                'created_at',
            ]),
        ]);
    }
}
