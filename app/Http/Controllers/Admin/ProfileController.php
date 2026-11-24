<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Concerns\StoresPublicFiles;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateProfileRequest;
use App\Http\Requests\UploadAvatarRequest;
use App\Models\Profile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    use StoresPublicFiles;

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

        $this->deletePublicFileFromUrl($profile->avatar);

        $profile->update(['avatar' => $this->publicFileUrl($path)]);

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
