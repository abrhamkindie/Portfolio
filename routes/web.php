<?php

use App\Http\Controllers\Admin;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\WorkController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PortfolioController::class, 'index'])->name('home');

Route::get('/portfolio', [PortfolioController::class, 'index'])->name('portfolio');

Route::get('/work/{slug}', [WorkController::class, 'show'])->name('work.show');

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [Admin\DashboardController::class, 'index'])->name('dashboard');

    Route::get('profile', [Admin\ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('profile', [Admin\ProfileController::class, 'update'])->name('profile.update');
    Route::post('profile/avatar', [Admin\ProfileController::class, 'uploadAvatar'])->name('profile.avatar');

    Route::resource('projects', Admin\ProjectController::class)->except('show');
    Route::patch('projects/{project}/order', [Admin\ProjectController::class, 'updateOrder'])->name('projects.order');
    Route::resource('skills', Admin\SkillController::class)->except('show');
    Route::resource('experiences', Admin\ExperienceController::class)->except('show');
    Route::resource('educations', Admin\EducationController::class)->except('show');
    Route::resource('certificates', Admin\CertificateController::class)->except('show');

    Route::resource('messages', Admin\MessageController::class)->only(['index', 'show', 'destroy']);
    Route::patch('messages/{message}/read', [Admin\MessageController::class, 'markAsRead'])->name('messages.read');
    Route::patch('messages/{message}/unread', [Admin\MessageController::class, 'markAsUnread'])->name('messages.unread');
});

Route::get('/dashboard', function () {
    return redirect()->route('admin.dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
