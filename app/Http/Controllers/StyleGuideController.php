<?php

namespace App\Http\Controllers;

use App\Http\Requests\StyleGuide\StoreStyleGuideRequest;
use App\Http\Requests\StyleGuide\UpdateStyleGuideRequest;
use App\Models\StyleGuide;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class StyleGuideController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('configurator', [
            'styleGuides' => $request->user()?->styleGuides()
                ->latest()
                ->get(['id', 'name', 'configuration', 'updated_at']) ?? [],
        ]);
    }

    public function show(Request $request, StyleGuide $guide): Response
    {
        Gate::authorize('view', $guide);

        return Inertia::render('configurator', [
            'styleGuides' => $request->user()->styleGuides()
                ->latest()
                ->get(['id', 'name', 'configuration', 'updated_at']),
            'activeGuide' => $guide->only('id', 'name', 'configuration', 'updated_at'),
        ]);
    }

    public function store(StoreStyleGuideRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        if (empty($validated['name'])) {
            $validated['name'] = $this->generateDefaultName($request->user());
        }

        $guide = $request->user()->styleGuides()->create($validated);

        return redirect()
            ->route('guides.show', $guide)
            ->with('success', 'Style guide saved.');
    }

    public function update(UpdateStyleGuideRequest $request, StyleGuide $styleGuide): RedirectResponse
    {
        Gate::authorize('update', $styleGuide);

        $styleGuide->update($request->validated());

        return back();
    }

    public function destroy(Request $request, StyleGuide $styleGuide): RedirectResponse
    {
        Gate::authorize('delete', $styleGuide);

        $styleGuide->delete();

        return back();
    }

    private function generateDefaultName(User $user): string
    {
        $prefix = 'My style guide';

        $existingNumbers = $user->styleGuides()
            ->where('name', 'like', $prefix.' %')
            ->pluck('name')
            ->map(function (string $name) use ($prefix): int {
                $suffix = trim(str_replace($prefix, '', $name));

                return is_numeric($suffix) ? (int) $suffix : 0;
            })
            ->filter();

        $nextNumber = $existingNumbers->isEmpty() ? 1 : $existingNumbers->max() + 1;

        return "{$prefix} {$nextNumber}";
    }
}
