<?php

use App\Models\StyleGuide;
use App\Models\User;

$validConfig = [
    'primaryColor' => '#4f46e5',
    'secondaryColor' => '#d946ef',
    'neutralFamily' => 'cool',
    'headingFont' => 'Fraunces',
    'headingFontMeta' => ['category' => 'serif', 'weights' => '400;700'],
    'bodyFont' => 'DM Sans',
    'bodyFontMeta' => ['category' => 'sans-serif', 'weights' => '400;500;700'],
    'typeScale' => 'regular',
    'iconLibrary' => 'heroicons',
    'borderWidth' => 1,
    'shadowEnabled' => true,
    'radius' => 8,
];

test('configurator page is accessible to guests', function () {
    $this->get(route('configurator'))
        ->assertSuccessful()
        ->assertInertia(fn ($page) => $page
            ->component('configurator')
            ->has('styleGuides', 0)
        );
});

test('configurator page shows saved guides for authenticated users', function () {
    $user = User::factory()->create();
    StyleGuide::factory()->count(3)->for($user)->create();

    $this->actingAs($user)
        ->get(route('configurator'))
        ->assertSuccessful()
        ->assertInertia(fn ($page) => $page
            ->component('configurator')
            ->has('styleGuides', 3)
        );
});

test('guests cannot save style guides', function () {
    $this->post(route('configurator.store'), [
        'name' => 'My Guide',
        'configuration' => $GLOBALS['validConfig'] ?? [],
    ])->assertRedirect(route('login'));
});

test('authenticated users can save style guides', function () use ($validConfig) {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->post(route('configurator.store'), [
            'name' => 'My Guide',
            'configuration' => $validConfig,
        ])
        ->assertRedirect();

    expect($user->styleGuides()->count())->toBe(1);
    expect($user->styleGuides()->first()->name)->toBe('My Guide');
});

test('style guide validation rejects invalid configuration', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->post(route('configurator.store'), [
            'name' => '',
            'configuration' => ['neutralFamily' => 'invalid'],
        ])
        ->assertSessionHasErrors(['name', 'configuration.primaryColor', 'configuration.neutralFamily']);
});

test('users can update their own style guides', function () use ($validConfig) {
    $user = User::factory()->create();
    $guide = StyleGuide::factory()->for($user)->create();

    $this->actingAs($user)
        ->put(route('configurator.update', $guide), [
            'name' => 'Updated Guide',
            'configuration' => $validConfig,
        ])
        ->assertRedirect();

    expect($guide->fresh()->name)->toBe('Updated Guide');
});

test('users cannot update other users style guides', function () use ($validConfig) {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();
    $guide = StyleGuide::factory()->for($otherUser)->create();

    $this->actingAs($user)
        ->put(route('configurator.update', $guide), [
            'name' => 'Hacked',
            'configuration' => $validConfig,
        ])
        ->assertForbidden();
});

test('users can delete their own style guides', function () {
    $user = User::factory()->create();
    $guide = StyleGuide::factory()->for($user)->create();

    $this->actingAs($user)
        ->delete(route('configurator.destroy', $guide))
        ->assertRedirect();

    expect(StyleGuide::find($guide->id))->toBeNull();
});

test('users cannot delete other users style guides', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();
    $guide = StyleGuide::factory()->for($otherUser)->create();

    $this->actingAs($user)
        ->delete(route('configurator.destroy', $guide))
        ->assertForbidden();
});

test('guests cannot delete style guides', function () {
    $guide = StyleGuide::factory()->create();

    $this->delete(route('configurator.destroy', $guide))
        ->assertRedirect(route('login'));
});
