<?php

namespace Database\Seeders;

use App\Models\Certificate;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Message;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::firstOrCreate(
            ['email' => 'abrhamkindie805@gmail.com'],
            ['name' => 'Abrham Kindie', 'password' => bcrypt('password')]
        );

        Profile::firstOrCreate(
            ['user_id' => $user->id],
            [
                'full_name' => 'Abrham Kindie',
                'title' => 'Full Stack Developer',
                'bio' => 'Passionate full-stack developer with 5+ years of experience building web applications. I specialize in Laravel, Vue.js, and modern PHP development. When I\'m not coding, I enjoy contributing to open-source projects and learning new technologies.',
                'avatar' => 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
                'email' => 'abrhamkindie805@gmail.com',
                'phone' => '+251 953581906',
                'location' => 'San Francisco, USA',
                'github' => 'https://github.com/johndoe',
                'linkedin' => 'https://linkedin.com/in/johndoe',
                'twitter' => 'https://twitter.com/johndoe',
                'website' => 'https://johndoe.dev',
            ]
        );

        Project::factory()->count(8)->create([
            'user_id' => $user->id,
        ]);

        Skill::factory()->count(15)->create([
            'user_id' => $user->id,
        ]);

        Certificate::factory()->count(5)->create([
            'user_id' => $user->id,
        ]);

        Experience::factory()->count(4)->create([
            'user_id' => $user->id,
        ]);

        Education::factory()->count(2)->create([
            'user_id' => $user->id,
        ]);

        Message::factory()->count(10)->create();
    }
}
