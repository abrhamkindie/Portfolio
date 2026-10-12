<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Project>
 */
class ProjectFactory extends Factory
{
    protected $model = Project::class;

    public function definition(): array
    {
        $title = fake()->unique()->sentence(3);
        $slug = fake()->unique()->slug(3);
        return [
            'user_id' => User::factory(),
            'title' => $title,
            'slug' => $slug,
            'description' => fake()->paragraph(),
            'content' => fake()->paragraphs(5, true),
            'thumbnail' => fake()->imageUrl(800, 600, 'technics'),
            'images' => array_map(fn () => fake()->imageUrl(1200, 800, 'technics'), range(1, fake()->numberBetween(1, 5))),
            'technologies' => fake()->randomElements(['PHP', 'Laravel', 'Vue.js', 'React', 'MySQL', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'Git'], fake()->numberBetween(3, 8)),
            'category' => fake()->randomElement(['Web Development', 'Mobile App', 'API', 'E-commerce', 'CMS', 'SaaS', 'Open Source']),
            'live_url' => fake()->optional(0.7)->url(),
            'github_url' => fake()->optional(0.8)->url(),
            'featured' => fake()->boolean(20),
            'published' => fake()->boolean(90),
            'sort_order' => fake()->numberBetween(0, 100),
            'completed_at' => fake()->optional(0.7)->dateTimeBetween('-2 years', 'now'),
        ];
    }
}