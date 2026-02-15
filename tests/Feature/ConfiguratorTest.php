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
    'headingFontWeight' => 700,
    'bodyFontWeight' => 400,
    'headingLetterSpacing' => 'normal',
    'bodyLineHeight' => 'comfortable',
    'buttonTextTransform' => 'none',
    'headingTextTransform' => 'none',
    'iconLibrary' => 'heroicons',
    'borderWidth' => 1,
    'shadowEnabled' => true,
    'radius' => 8,
    'transitionDuration' => 150,
];

test('configurator page is accessible to guests', function () {
    $this->get(route('home'))
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
        ->get(route('home'))
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

test('authenticated users can save style guides and are redirected to the guide', function () use ($validConfig) {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->post(route('configurator.store'), [
            'name' => 'My Guide',
            'configuration' => $validConfig,
        ])
        ->assertRedirect(route('guides.show', $user->styleGuides()->first()))
        ->assertSessionHas('success', 'Style guide saved.');

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
        ->assertSessionHasErrors(['configuration.primaryColor', 'configuration.neutralFamily']);
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

test('style guide validation rejects invalid transition configuration', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->post(route('configurator.store'), [
            'name' => 'Test Guide',
            'configuration' => [
                'primaryColor' => '#4f46e5',
                'secondaryColor' => '#d946ef',
                'neutralFamily' => 'cool',
                'headingFont' => 'Fraunces',
                'bodyFont' => 'DM Sans',
                'typeScale' => 'regular',
                'iconLibrary' => 'heroicons',
                'borderWidth' => 1,
                'shadowEnabled' => true,
                'radius' => 8,
                'transitionDuration' => 999,
            ],
        ])
        ->assertSessionHasErrors(['configuration.transitionDuration']);
});

test('saving without a name auto-generates "My style guide 1"', function () use ($validConfig) {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->post(route('configurator.store'), [
            'name' => null,
            'configuration' => $validConfig,
        ])
        ->assertRedirect();

    expect($user->styleGuides()->first()->name)->toBe('My style guide 1');
});

test('auto-generated names increment sequentially', function () use ($validConfig) {
    $user = User::factory()->create();
    StyleGuide::factory()->for($user)->create(['name' => 'My style guide 1']);
    StyleGuide::factory()->for($user)->create(['name' => 'My style guide 2']);

    $this->actingAs($user)
        ->post(route('configurator.store'), [
            'name' => '',
            'configuration' => $validConfig,
        ])
        ->assertRedirect();

    expect($user->styleGuides()->where('name', 'My style guide 3')->exists())->toBeTrue();
});

test('auto-generated names skip gaps in numbering', function () use ($validConfig) {
    $user = User::factory()->create();
    StyleGuide::factory()->for($user)->create(['name' => 'My style guide 1']);
    StyleGuide::factory()->for($user)->create(['name' => 'My style guide 5']);

    $this->actingAs($user)
        ->post(route('configurator.store'), [
            'name' => null,
            'configuration' => $validConfig,
        ])
        ->assertRedirect();

    expect($user->styleGuides()->where('name', 'My style guide 6')->exists())->toBeTrue();
});

test('saving with a name uses the provided name', function () use ($validConfig) {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->post(route('configurator.store'), [
            'name' => 'Custom Name',
            'configuration' => $validConfig,
        ])
        ->assertRedirect();

    expect($user->styleGuides()->first()->name)->toBe('Custom Name');
});

test('guests cannot delete style guides', function () {
    $guide = StyleGuide::factory()->create();

    $this->delete(route('configurator.destroy', $guide))
        ->assertRedirect(route('login'));
});

test('users can view their own style guide at its URL', function () {
    $user = User::factory()->create();
    $guide = StyleGuide::factory()->for($user)->create();

    $this->actingAs($user)
        ->get(route('guides.show', $guide))
        ->assertSuccessful()
        ->assertInertia(fn ($page) => $page
            ->component('configurator')
            ->has('activeGuide')
            ->where('activeGuide.id', $guide->id)
        );
});

test('users cannot view other users style guides', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();
    $guide = StyleGuide::factory()->for($otherUser)->create();

    $this->actingAs($user)
        ->get(route('guides.show', $guide))
        ->assertForbidden();
});

test('guests cannot view style guides', function () {
    $guide = StyleGuide::factory()->create();

    $this->get(route('guides.show', $guide))
        ->assertRedirect(route('login'));
});
