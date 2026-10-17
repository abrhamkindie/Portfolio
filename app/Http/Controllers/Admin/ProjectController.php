<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(Request $request): Response
    {
        $sort = $request->string('sort')->toString();

        $query = Project::query()
            ->when($request->string('search')->trim()->toString(), function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('title', 'like', "%{$search}%")
                        ->orWhere('category', 'like', "%{$search}%");
                });
            });

        // Display order. "order" uses the manual sort_order field (featured-first,
        // then newest) so admins control the sequence shown on the public portfolio.
        match ($sort) {
            'oldest' => $query->orderBy('created_at'),
            'title' => $query->orderBy('title'),
            'featured' => $query->orderByDesc('featured')->orderByDesc('created_at'),
            'order' => $query->orderBy('sort_order')->orderByDesc('featured')->orderByDesc('created_at'),
            default => $query->orderByDesc('created_at'),
        };

        $projects = $query->paginate(10)->withQueryString();

        return Inertia::render('Admin/Projects/Index', [
            'projects' => $projects,
            'filters' => [
                'search' => $request->string('search')->toString(),
                'sort' => $sort !== '' ? $sort : 'order',
            ],
        ]);
    }

    /**
     * Move a project up or down within the manual display order.
     * sort_order is reindexed to a gapless 0..n so the public portfolio
     * (which orders by sort_order) always reflects the exact sequence set here.
     */
    public function updateOrder(Request $request, Project $project): RedirectResponse
    {
        $request->validate(['direction' => ['required', 'in:up,down']]);
        $direction = $request->string('direction')->toString();

        $ids = Project::where('user_id', $project->user_id)
            ->orderBy('sort_order')
            ->orderByDesc('featured')
            ->orderByDesc('created_at')
            ->pluck('id')
            ->all();

        $pos = array_search($project->id, $ids, true);
        $target = $direction === 'up' ? $pos - 1 : $pos + 1;

        if ($pos === false || $target < 0 || $target >= count($ids)) {
            return back()->with('error', 'Cannot move the project any further.');
        }

        [$ids[$pos], $ids[$target]] = [$ids[$target], $ids[$pos]];

        DB::transaction(function () use ($ids) {
            foreach ($ids as $index => $id) {
                Project::where('id', $id)->update(['sort_order' => $index]);
            }
        });

        return back()->with('success', 'Display order updated.');
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Projects/Form', [
            'project' => null,
        ]);
    }

    public function store(StoreProjectRequest $request): RedirectResponse
    {
        $data = $request->validated();
        unset($data['thumbnail_file']);
        $data['thumbnail'] = $this->resolveThumbnail($request, $data['thumbnail'] ?? null);

        $request->user()->projects()->create($data);

        return redirect()->route('admin.projects.index')->with('success', 'Project created successfully.');
    }

    public function edit(Project $project): Response
    {
        return Inertia::render('Admin/Projects/Form', [
            'project' => $project,
        ]);
    }

    public function update(UpdateProjectRequest $request, Project $project): RedirectResponse
    {
        $data = $request->validated();
        unset($data['thumbnail_file']);
        $data['thumbnail'] = $this->resolveThumbnail($request, $data['thumbnail'] ?? $project->thumbnail, $project->thumbnail);

        $project->update($data);

        return redirect()->route('admin.projects.index')->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project): RedirectResponse
    {
        $project->delete();

        return back()->with('success', 'Project deleted.');
    }

    /**
     * Resolve the thumbnail value from either an uploaded image (preferred) or a
     * pasted URL. Removes the previous locally-stored file when it is replaced.
     */
    private function resolveThumbnail(Request $request, ?string $providedUrl, ?string $current = null): ?string
    {
        if (! $request->hasFile('thumbnail_file')) {
            return $providedUrl ?? $current;
        }

        if ($current && str_contains($current, '/storage/project-thumbnails/')) {
            Storage::disk('public')->delete(str_replace(url('/storage') . '/', '', $current));
        }

        $path = $request->file('thumbnail_file')->store('project-thumbnails', 'public');

        return url('/storage/' . $path);
    }
}
