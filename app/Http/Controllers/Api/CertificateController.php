<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCertificateRequest;
use App\Http\Requests\UpdateCertificateRequest;
use App\Http\Resources\CertificateResource;
use App\Models\Certificate;
use Illuminate\Http\Request;

class CertificateController extends Controller
{
    public function index(Request $request)
    {
        $query = Certificate::query();

        if ($request->has('issuer')) {
            $query->where('issuer', $request->string('issuer'));
        }

        $certificates = $query->orderByDesc('issued_at')->paginate($request->integer('per_page', 15));

        return CertificateResource::collection($certificates);
    }

    public function show(Certificate $certificate)
    {
        return new CertificateResource($certificate);
    }

    public function store(StoreCertificateRequest $request)
    {
        $certificate = Certificate::create($request->validated());
        return new CertificateResource($certificate);
    }

    public function update(UpdateCertificateRequest $request, Certificate $certificate)
    {
        $certificate->update($request->validated());
        return new CertificateResource($certificate);
    }

    public function destroy(Certificate $certificate)
    {
        $certificate->delete();
        return response()->noContent();
    }
}