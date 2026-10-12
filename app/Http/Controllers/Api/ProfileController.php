<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProfileRequest;
use App\Http\Requests\UploadAvatarRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Http\Resources\ProfileResource;
use App\Models\Profile;

class ProfileController extends Controller
{
    public function show()
    {
        $profile = Profile::with('user')->firstOrFail();
        return new ProfileResource($profile);
    }

    public function store(StoreProfileRequest $request)
    {
        $profile = Profile::create($request->validated());
        return new ProfileResource($profile);
    }

    public function update(UpdateProfileRequest $request, Profile $profile)
    {
        $profile->update($request->validated());
        return new ProfileResource($profile);
    }

    public function uploadAvatar(UploadAvatarRequest $request, Profile $profile)
    {
        $path = $request->file('avatar')->store('avatars', 'public');

        if ($profile->avatar && str_contains($profile->avatar, '/storage/avatars/')) {
            $old = str_replace(url('/storage').'/', '', $profile->avatar);
            \Illuminate\Support\Facades\Storage::disk('public')->delete($old);
        }

        $profile->update(['avatar' => url('/storage/'.$path)]);

        return new ProfileResource($profile);
    }

    public function destroy(Profile $profile)
    {
        $profile->delete();
        return response()->noContent();
    }
}