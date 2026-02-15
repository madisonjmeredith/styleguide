<?php

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

test('google fonts endpoint returns fallback fonts when no api key is configured', function () {
    config()->set('services.google_fonts.key', null);

    $this->getJson(route('google-fonts'))
        ->assertSuccessful()
        ->assertJsonCount(18)
        ->assertJsonFragment(['family' => 'Fraunces', 'category' => 'serif'])
        ->assertJsonFragment(['family' => 'DM Sans', 'category' => 'sans-serif']);
});

test('google fonts endpoint returns fonts from api when key is configured', function () {
    config()->set('services.google_fonts.key', 'test-key');
    Cache::forget('google-fonts-catalog');

    Http::fake([
        'www.googleapis.com/webfonts/v1/webfonts*' => Http::response([
            'items' => [
                ['family' => 'Roboto', 'category' => 'sans-serif', 'variants' => ['regular', '700']],
                ['family' => 'Open Sans', 'category' => 'sans-serif', 'variants' => ['regular', '600']],
            ],
        ]),
    ]);

    $this->getJson(route('google-fonts'))
        ->assertSuccessful()
        ->assertJsonCount(2)
        ->assertJsonFragment(['family' => 'Roboto'])
        ->assertJsonFragment(['family' => 'Open Sans']);
});

test('google fonts endpoint caches the api response', function () {
    config()->set('services.google_fonts.key', 'test-key');
    Cache::forget('google-fonts-catalog');

    Http::fake([
        'www.googleapis.com/webfonts/v1/webfonts*' => Http::response([
            'items' => [
                ['family' => 'Inter', 'category' => 'sans-serif', 'variants' => ['regular']],
            ],
        ]),
    ]);

    $this->getJson(route('google-fonts'))->assertSuccessful();
    $this->getJson(route('google-fonts'))->assertSuccessful();

    Http::assertSentCount(1);
});

test('google fonts endpoint returns fallback when api call fails', function () {
    config()->set('services.google_fonts.key', 'test-key');
    Cache::forget('google-fonts-catalog');

    Http::fake([
        'www.googleapis.com/webfonts/v1/webfonts*' => Http::response(null, 500),
    ]);

    $this->getJson(route('google-fonts'))
        ->assertSuccessful()
        ->assertJsonCount(18)
        ->assertJsonFragment(['family' => 'Fraunces']);
});
