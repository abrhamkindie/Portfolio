<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEducationRequest;
use App\Http\Requests\UpdateEducationRequest;
use App\Models\Education;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class EducationController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Educations/Index', [
            'educations' => Education::orderByDesc('start_date')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Educations/Form', [
            'education' => null,
        ]);
    }

    public function store(StoreEducationRequest $request): RedirectResponse
    {
        $request->user()->educations()->create($request->validated());

        return redirect()->route('admin.educations.index')->with('success', 'Education created successfully.');
    }

    public function edit(Education $education): Response
    {
        return Inertia::render('Admin/Educations/Form', [
            'education' => $education,
        ]);
    }

    public function update(UpdateEducationRequest $request, Education $education): RedirectResponse
    {
        $education->update($request->validated());

        return redirect()->route('admin.educations.index')->with('success', 'Education updated successfully.');
    }

    public function destroy(Education $education): RedirectResponse
    {
        $education->delete();

        return back()->with('success', 'Education deleted.');
    }
}