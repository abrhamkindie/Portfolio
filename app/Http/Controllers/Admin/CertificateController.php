<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCertificateRequest;
use App\Http\Requests\UpdateCertificateRequest;
use App\Models\Certificate;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CertificateController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Certificates/Index', [
            'certificates' => Certificate::orderByDesc('issued_at')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Certificates/Form', [
            'certificate' => null,
        ]);
    }

    public function store(StoreCertificateRequest $request): RedirectResponse
    {
        $request->user()->certificates()->create($request->validated());

        return redirect()->route('admin.certificates.index')->with('success', 'Certificate created successfully.');
    }

    public function edit(Certificate $certificate): Response
    {
        return Inertia::render('Admin/Certificates/Form', [
            'certificate' => $certificate,
        ]);
    }

    public function update(UpdateCertificateRequest $request, Certificate $certificate): RedirectResponse
    {
        $certificate->update($request->validated());

        return redirect()->route('admin.certificates.index')->with('success', 'Certificate updated successfully.');
    }

    public function destroy(Certificate $certificate): RedirectResponse
    {
        $certificate->delete();

        return back()->with('success', 'Certificate deleted.');
    }
}