<?php

namespace Database\Factories;

use App\Models\Certificate;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Certificate>
 */
class CertificateFactory extends Factory
{
    protected $model = Certificate::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'title' => fake()->randomElement([
                'AWS Certified Solutions Architect',
                'Laravel Certification',
                'PHP Zend Certification',
                'Google Cloud Professional',
                'Docker Certified Associate',
                'Kubernetes Administrator (CKA)',
                'Certified Scrum Master',
                'Oracle Java Certification',
            ]),
            'issuer' => fake()->randomElement(['AWS', 'Laravel', 'Zend', 'Google Cloud', 'Docker', 'CNCF', 'Scrum Alliance', 'Oracle']),
            'credential_id' => fake()->optional(0.7)->bothify('CERT-####-????'),
            'credential_url' => fake()->optional(0.7)->url(),
            'image' => fake()->optional(0.5)->imageUrl(400, 400, 'business'),
            'description' => fake()->optional(0.6)->paragraph(),
            'issued_at' => fake()->dateTimeBetween('-5 years', 'now'),
            'expires_at' => fake()->optional(0.4)->dateTimeBetween('now', '+3 years'),
            'sort_order' => fake()->numberBetween(0, 100),
        ];
    }
}