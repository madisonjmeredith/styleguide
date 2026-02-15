<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class GoogleFontsController extends Controller
{
    /**
     * @return array<int, array{family: string, category: string, variants: list<string>}>
     */
    private function fallbackFonts(): array
    {
        return [
            ['family' => 'Fraunces', 'category' => 'serif', 'variants' => ['regular', '700']],
            ['family' => 'Playfair Display', 'category' => 'serif', 'variants' => ['regular', '700']],
            ['family' => 'DM Serif Display', 'category' => 'serif', 'variants' => ['regular']],
            ['family' => 'Libre Baskerville', 'category' => 'serif', 'variants' => ['regular', '700']],
            ['family' => 'Lora', 'category' => 'serif', 'variants' => ['regular', '700']],
            ['family' => 'Merriweather', 'category' => 'serif', 'variants' => ['regular', '700']],
            ['family' => 'Bitter', 'category' => 'serif', 'variants' => ['regular', '700']],
            ['family' => 'Plus Jakarta Sans', 'category' => 'sans-serif', 'variants' => ['regular', '500', '700']],
            ['family' => 'Outfit', 'category' => 'sans-serif', 'variants' => ['regular', '500', '700']],
            ['family' => 'Sora', 'category' => 'sans-serif', 'variants' => ['regular', '600', '700']],
            ['family' => 'DM Sans', 'category' => 'sans-serif', 'variants' => ['regular', '500', '700']],
            ['family' => 'Nunito', 'category' => 'sans-serif', 'variants' => ['regular', '600', '700']],
            ['family' => 'Source Sans 3', 'category' => 'sans-serif', 'variants' => ['regular', '600', '700']],
            ['family' => 'Lato', 'category' => 'sans-serif', 'variants' => ['regular', '700']],
            ['family' => 'Work Sans', 'category' => 'sans-serif', 'variants' => ['regular', '500', '700']],
            ['family' => 'Manrope', 'category' => 'sans-serif', 'variants' => ['regular', '500', '700']],
            ['family' => 'Karla', 'category' => 'sans-serif', 'variants' => ['regular', '500', '700']],
            ['family' => 'Open Sans', 'category' => 'sans-serif', 'variants' => ['regular', '600', '700']],
        ];
    }

    public function __invoke(): JsonResponse
    {
        $apiKey = config('services.google_fonts.key');

        if (! $apiKey) {
            return response()->json($this->fallbackFonts());
        }

        $fonts = Cache::remember('google-fonts-catalog', now()->addDay(), function () use ($apiKey) {
            $response = Http::get('https://www.googleapis.com/webfonts/v1/webfonts', [
                'key' => $apiKey,
                'sort' => 'popularity',
            ]);

            if ($response->failed()) {
                return null;
            }

            return collect($response->json('items', []))
                ->map(fn (array $font) => [
                    'family' => $font['family'],
                    'category' => $font['category'],
                    'variants' => $font['variants'],
                ])
                ->values()
                ->all();
        });

        return response()->json($fonts ?? $this->fallbackFonts());
    }
}
