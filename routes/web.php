<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GoogleFontsController;
use App\Http\Controllers\StyleGuideController;
use Illuminate\Support\Facades\Route;

Route::get('/', [StyleGuideController::class, 'index'])->name('home');

Route::get('dashboard', DashboardController::class)->middleware(['auth', 'verified'])->name('dashboard');

Route::get('google-fonts', GoogleFontsController::class)->name('google-fonts');

Route::middleware(['auth'])->group(function () {
    Route::get('guides/{guide}', [StyleGuideController::class, 'show'])->name('guides.show');
    Route::post('configurator', [StyleGuideController::class, 'store'])->name('configurator.store');
    Route::put('configurator/{styleGuide}', [StyleGuideController::class, 'update'])->name('configurator.update');
    Route::delete('configurator/{styleGuide}', [StyleGuideController::class, 'destroy'])->name('configurator.destroy');
});

require __DIR__.'/settings.php';
