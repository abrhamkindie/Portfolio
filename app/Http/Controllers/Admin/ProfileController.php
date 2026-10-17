<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateProfileRequest;
use App\Http\Requests\UploadAvatarRequest;
use App\Models\Profile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function edit(Request $request): Response
    {
        return Inertia::render('Admin/Profile', [
            'profile' => $this->profileFor($request),
        ]);
    }

    public function update(UpdateProfileRequest $request): RedirectResponse
    {
        $this->profileFor($request)->update($request->validated());

        return back()->with('success', 'Profile updated successfully.');
    }

    public function uploadAvatar(UploadAvatarRequest $request): RedirectResponse
    {
        $profile = $this->profileFor($request);

        $path = $request->file('avatar')->store('avatars', 'public');

        if ($profile->avatar && str_contains($profile->avatar, '/storage/avatars/')) {
            $old = str_replace(url('/storage').'/', '', $profile->avatar);
            Storage::disk('public')->delete($old);
        }

        $profile->update(['avatar' => url('/storage/'.$path)]);

        return back()->with('success', 'Avatar updated successfully.');
    }

    private function profileFor(Request $request): Profile
    {
        return $request->user()->profile()->firstOrCreate(
            ['user_id' => $request->user()->id],
            ['full_name' => $request->user()->name],
        );
    }
}