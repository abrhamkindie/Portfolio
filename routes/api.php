<?php

use App\Http\Controllers\Api\CertificateController;
use App\Http\Controllers\Api\EducationController;
use App\Http\Controllers\Api\ExperienceController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\SkillController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('profile', ProfileController::class)->only(['show', 'store', 'update', 'destroy']);
    Route::post('profile/{profile}/avatar', [ProfileController::class, 'uploadAvatar'])->name('profile.avatar');

    Route::apiResource('projects', ProjectController::class);

    Route::apiResource('skills', SkillController::class);

    Route::apiResource('certificates', CertificateController::class);

    Route::apiResource('experiences', ExperienceController::class);

    Route::apiResource('educations', EducationController::class);

    Route::apiResource('messages', MessageController::class);
    Route::patch('messages/{message}/read', [MessageController::class, 'markAsRead']);
    Route::patch('messages/{message}/unread', [MessageController::class, 'markAsUnread']);
});

Route::get('profile', [ProfileController::class, 'show'])->name('profile.show');

Route::get('projects', [ProjectController::class, 'index'])->name('projects.index');
Route::get('projects/{project}', [ProjectController::class, 'show'])->name('projects.show');

Route::get('skills', [SkillController::class, 'index'])->name('skills.index');
Route::get('skills/{skill}', [SkillController::class, 'show'])->name('skills.show');

Route::get('certificates', [CertificateController::class, 'index'])->name('certificates.index');
Route::get('certificates/{certificate}', [CertificateController::class, 'show'])->name('certificates.show');

Route::get('experiences', [ExperienceController::class, 'index'])->name('experiences.index');
Route::get('experiences/{experience}', [ExperienceController::class, 'show'])->name('experiences.show');

Route::get('educations', [EducationController::class, 'index'])->name('educations.index');
Route::get('educations/{education}', [EducationController::class, 'show'])->name('educations.show');

Route::post('messages', [MessageController::class, 'store'])->name('messages.store');