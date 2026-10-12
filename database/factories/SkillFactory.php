<?php

namespace Database\Factories;

use App\Models\Skill;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Skill>
 */
class SkillFactory extends Factory
{
    protected $model = Skill::class;

    public function definition(): array
    {
        $categories = ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Languages', 'Frameworks', 'General'];
        return [
            'user_id' => User::factory(),
            'name' => fake()->unique()->randomElement([
                'PHP', 'Laravel', 'JavaScript', 'TypeScript', 'Vue.js', 'React', 'Node.js',
                'MySQL', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'Git', 'CI/CD',
                'HTML/CSS', 'Tailwind CSS', 'REST APIs', 'GraphQL', 'Testing', 'Linux'
            ]),
            'category' => fake()->randomElement($categories),
            'icon' => fake()->optional(0.6)->randomElement([
                'php', 'laravel', 'javascript', 'typescript', 'vue', 'react', 'nodejs',
                'mysql', 'postgresql', 'redis', 'docker', 'aws', 'git', 'github',
                'html5', 'css3', 'tailwind', 'api', 'graphql', 'jest', 'linux'
            ]),
            'proficiency' => fake()->numberBetween(30, 100),
            'years_of_experience' => fake()->numberBetween(0, 10),
            'sort_order' => fake()->numberBetween(0, 100),
        ];
    }
}