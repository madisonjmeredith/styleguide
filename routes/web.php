<?php

use App\Http\Controllers\GoogleFontsController;
use App\Http\Controllers\StyleGuideController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('configurator', [StyleGuideController::class, 'index'])->name('configurator');
Route::get('google-fonts', GoogleFontsController::class)->name('google-fonts');

Route::middleware(['auth'])->group(function () {
    Route::post('configurator', [StyleGuideController::class, 'store'])->name('configurator.store');
    Route::put('configurator/{styleGuide}', [StyleGuideController::class, 'update'])->name('configurator.update');
    Route::delete('configurator/{styleGuide}', [StyleGuideController::class, 'destroy'])->name('configurator.destroy');
});

require __DIR__.'/settings.php';
