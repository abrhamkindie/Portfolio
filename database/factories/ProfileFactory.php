<?php

namespace Database\Factories;

use App\Models\Profile;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Profile>
 */
class ProfileFactory extends Factory
{
    protected $model = Profile::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'full_name' => fake()->name(),
            'title' => fake()->jobTitle(),
            'bio' => fake()->paragraphs(3, true),
            'avatar' => fake()->imageUrl(400, 400, 'people'),
            'resume' => fake()->url(),
            'email' => fake()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'location' => fake()->city() . ', ' . fake()->country(),
            'github' => 'https://github.com/' . fake()->userName(),
            'linkedin' => 'https://linkedin.com/in/' . fake()->userName(),
            'twitter' => 'https://twitter.com/' . fake()->userName(),
            'website' => fake()->url(),
        ];
    }
}