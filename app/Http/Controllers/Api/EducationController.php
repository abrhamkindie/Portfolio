<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEducationRequest;
use App\Http\Requests\UpdateEducationRequest;
use App\Http\Resources\EducationResource;
use App\Models\Education;
use Illuminate\Http\Request;

class EducationController extends Controller
{
    public function index(Request $request)
    {
        $educations = Education::orderByDesc('start_date')
            ->paginate($request->integer('per_page', 15));

        return EducationResource::collection($educations);
    }

    public function show(Education $education)
    {
        return new EducationResource($education);
    }

    public function store(StoreEducationRequest $request)
    {
        $education = Education::create($request->validated());
        return new EducationResource($education);
    }

    public function update(UpdateEducationRequest $request, Education $education)
    {
        $education->update($request->validated());
        return new EducationResource($education);
    }

    public function destroy(Education $education)
    {
        $education->delete();
        return response()->noContent();
    }
}