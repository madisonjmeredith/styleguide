<?php

use App\Models\StyleGuide;
use App\Models\User;

test('guests are redirected to the login page', function () {
    $response = $this->get(route('dashboard'));
    $response->assertRedirect(route('login'));
});

test('authenticated users can visit the dashboard', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->get(route('dashboard'));
    $response->assertOk();
});

test('dashboard displays the users saved style guides', function () {
    $user = User::factory()->create();
    StyleGuide::factory()->count(3)->for($user)->create();

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertSuccessful()
        ->assertInertia(fn ($page) => $page
            ->component('dashboard')
            ->has('styleGuides', 3)
        );
});

test('dashboard does not display other users style guides', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();
    StyleGuide::factory()->count(2)->for($user)->create();
    StyleGuide::factory()->count(3)->for($otherUser)->create();

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertSuccessful()
        ->assertInertia(fn ($page) => $page
            ->component('dashboard')
            ->has('styleGuides', 2)
        );
});

test('dashboard shows empty state when user has no style guides', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertSuccessful()
        ->assertInertia(fn ($page) => $page
            ->component('dashboard')
            ->has('styleGuides', 0)
        );
});
