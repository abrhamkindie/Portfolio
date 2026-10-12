<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreExperienceRequest;
use App\Http\Requests\UpdateExperienceRequest;
use App\Http\Resources\ExperienceResource;
use App\Models\Experience;
use Illuminate\Http\Request;

class ExperienceController extends Controller
{
    public function index(Request $request)
    {
        $experiences = Experience::orderByDesc('start_date')
            ->paginate($request->integer('per_page', 15));

        return ExperienceResource::collection($experiences);
    }

    public function show(Experience $experience)
    {
        return new ExperienceResource($experience);
    }

    public function store(StoreExperienceRequest $request)
    {
        $experience = Experience::create($request->validated());
        return new ExperienceResource($experience);
    }

    public function update(UpdateExperienceRequest $request, Experience $experience)
    {
        $experience->update($request->validated());
        return new ExperienceResource($experience);
    }

    public function destroy(Experience $experience)
    {
        $experience->delete();
        return response()->noContent();
    }
}