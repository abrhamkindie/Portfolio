<?php

namespace Database\Factories;

use App\Models\Education;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Education>
 */
class EducationFactory extends Factory
{
    protected $model = Education::class;

    public function definition(): array
    {
        $startDate = fake()->dateTimeBetween('-15 years', '-2 years');
        $isCurrent = fake()->boolean(10);
        $endDate = $isCurrent ? null : fake()->dateTimeBetween($startDate, 'now');

        return [
            'user_id' => User::factory(),
            'institution' => fake()->randomElement([
                'Stanford University',
                'MIT',
                'University of California, Berkeley',
                'Harvard University',
                'Carnegie Mellon University',
                'University of Washington',
                'Georgia Institute of Technology',
                'University of Texas at Austin',
            ]),
            'degree' => fake()->randomElement([
                'Bachelor of Science in Computer Science',
                'Master of Science in Software Engineering',
                'Bachelor of Arts in Information Technology',
                'Associate Degree in Web Development',
                'PhD in Computer Science',
                'Bootcamp Certificate in Full Stack Development',
            ]),
            'field_of_study' => fake()->randomElement(['Computer Science', 'Software Engineering', 'Information Technology', 'Data Science', 'Cybersecurity']),
            'location' => fake()->city() . ', ' . fake()->country(),
            'description' => fake()->optional(0.5)->paragraph(),
            'start_date' => $startDate,
            'end_date' => $endDate,
            'is_current' => $isCurrent,
            'sort_order' => fake()->numberBetween(0, 100),
        ];
    }
}