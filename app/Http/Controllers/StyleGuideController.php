<?php

namespace App\Http\Controllers;

use App\Http\Requests\StyleGuide\StoreStyleGuideRequest;
use App\Http\Requests\StyleGuide\UpdateStyleGuideRequest;
use App\Models\StyleGuide;
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

    public function store(StoreStyleGuideRequest $request): RedirectResponse
    {
        $request->user()->styleGuides()->create($request->validated());

        return back();
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
}
