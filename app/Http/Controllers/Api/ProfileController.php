<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Concerns\StoresPublicFiles;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProfileRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Http\Requests\UploadAvatarRequest;
use App\Http\Resources\ProfileResource;
use App\Models\Profile;

class ProfileController extends Controller
{
    use StoresPublicFiles;

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

        $this->deletePublicFileFromUrl($profile->avatar);

        $profile->update(['avatar' => $this->publicFileUrl($path)]);

        return new ProfileResource($profile);
    }

    public function destroy(Profile $profile)
    {
        $profile->delete();

        return response()->noContent();
    }
}
