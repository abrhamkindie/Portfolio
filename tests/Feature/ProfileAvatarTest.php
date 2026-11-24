<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Tests\TestCase;

class ProfileAvatarTest extends TestCase
{
    use RefreshDatabase;

    public function test_avatar_upload_is_stored_on_the_public_disk_and_saved_as_its_url(): void
    {
        Storage::fake('public');

        $user = User::factory()->create(['email_verified_at' => now()]);

        $this->actingAs($user)
            ->post('/admin/profile/avatar', [
                'avatar' => UploadedFile::fake()->image('me.png'),
            ])
            ->assertSessionHasNoErrors()
            ->assertRedirect();

        $avatar = $user->profile()->firstOrFail()->avatar;

        $this->assertNotNull($avatar);
        $this->assertStringStartsWith(Storage::disk('public')->url('avatars/'), $avatar);

        $path = Str::after($avatar, Storage::disk('public')->url('avatars/'));
        Storage::disk('public')->assertExists('avatars/'.$path);
    }

    public function test_replacing_an_avatar_deletes_the_previous_file(): void
    {
        Storage::fake('public');

        $user = User::factory()->create(['email_verified_at' => now()]);

        $this->actingAs($user)->post('/admin/profile/avatar', [
            'avatar' => UploadedFile::fake()->image('first.png'),
        ]);

        $first = Str::after($user->profile()->firstOrFail()->avatar, Storage::disk('public')->url('avatars/'));

        $this->actingAs($user)->post('/admin/profile/avatar', [
            'avatar' => UploadedFile::fake()->image('second.png'),
        ]);

        $second = Str::after($user->profile()->firstOrFail()->avatar, Storage::disk('public')->url('avatars/'));

        $this->assertNotSame($first, $second);
        Storage::disk('public')->assertMissing('avatars/'.$first);
        Storage::disk('public')->assertExists('avatars/'.$second);
    }
}
