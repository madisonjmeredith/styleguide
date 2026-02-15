<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StyleGuide>
 */
class StyleGuideFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $headingFonts = ['Fraunces', 'Playfair Display', 'DM Serif Display', 'Libre Baskerville', 'Lora', 'Plus Jakarta Sans', 'Outfit', 'Sora'];
        $bodyFonts = ['DM Sans', 'Plus Jakarta Sans', 'Nunito', 'Source Sans 3', 'Lato', 'Work Sans', 'Manrope', 'Outfit'];

        return [
            'user_id' => User::factory(),
            'name' => fake()->words(3, true),
            'configuration' => [
                'primaryColor' => fake()->hexColor(),
                'secondaryColor' => fake()->hexColor(),
                'neutralFamily' => fake()->randomElement(['cool', 'neutral', 'warm']),
                'headingFont' => fake()->randomElement($headingFonts),
                'bodyFont' => fake()->randomElement($bodyFonts),
                'iconLibrary' => fake()->randomElement(['fontawesome', 'heroicons', 'feather']),
                'borderEnabled' => fake()->boolean(),
                'shadowEnabled' => fake()->boolean(),
                'radius' => fake()->randomElement([0, 4, 8, 12, 16]),
            ],
        ];
    }
}
