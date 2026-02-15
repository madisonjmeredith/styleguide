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
        $headingFonts = [
            ['name' => 'Fraunces', 'category' => 'serif', 'weights' => '400;700'],
            ['name' => 'Playfair Display', 'category' => 'serif', 'weights' => '400;700'],
            ['name' => 'DM Serif Display', 'category' => 'serif', 'weights' => '400'],
            ['name' => 'Libre Baskerville', 'category' => 'serif', 'weights' => '400;700'],
            ['name' => 'Lora', 'category' => 'serif', 'weights' => '400;700'],
            ['name' => 'Plus Jakarta Sans', 'category' => 'sans-serif', 'weights' => '400;500;700'],
            ['name' => 'Outfit', 'category' => 'sans-serif', 'weights' => '400;500;700'],
            ['name' => 'Sora', 'category' => 'sans-serif', 'weights' => '400;600;700'],
        ];
        $bodyFonts = [
            ['name' => 'DM Sans', 'category' => 'sans-serif', 'weights' => '400;500;700'],
            ['name' => 'Plus Jakarta Sans', 'category' => 'sans-serif', 'weights' => '400;500;700'],
            ['name' => 'Nunito', 'category' => 'sans-serif', 'weights' => '400;600;700'],
            ['name' => 'Source Sans 3', 'category' => 'sans-serif', 'weights' => '400;600;700'],
            ['name' => 'Lato', 'category' => 'sans-serif', 'weights' => '400;700'],
            ['name' => 'Work Sans', 'category' => 'sans-serif', 'weights' => '400;500;700'],
            ['name' => 'Manrope', 'category' => 'sans-serif', 'weights' => '400;500;700'],
            ['name' => 'Outfit', 'category' => 'sans-serif', 'weights' => '400;500;700'],
        ];

        $hf = fake()->randomElement($headingFonts);
        $bf = fake()->randomElement($bodyFonts);

        return [
            'user_id' => User::factory(),
            'name' => fake()->words(3, true),
            'configuration' => [
                'primaryColor' => fake()->hexColor(),
                'secondaryColor' => fake()->hexColor(),
                'neutralFamily' => fake()->randomElement(['cool', 'neutral', 'warm']),
                'headingFont' => $hf['name'],
                'headingFontMeta' => ['category' => $hf['category'], 'weights' => $hf['weights']],
                'bodyFont' => $bf['name'],
                'bodyFontMeta' => ['category' => $bf['category'], 'weights' => $bf['weights']],
                'typeScale' => fake()->randomElement(['small', 'regular', 'large', 'extra-large']),
                'iconLibrary' => fake()->randomElement(['fontawesome-regular', 'fontawesome-solid', 'heroicons', 'lucide', 'material-symbols']),
                'borderWidth' => fake()->randomElement([0, 1, 2]),
                'shadowEnabled' => fake()->boolean(),
                'radius' => fake()->randomElement([0, 4, 8, 12, 16]),
                'transitionDuration' => fake()->randomElement([0, 100, 150, 200, 300]),
                'transitionEasing' => fake()->randomElement(['linear', 'ease']),
            ],
        ];
    }
}
