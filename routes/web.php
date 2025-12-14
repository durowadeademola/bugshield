<?php

use App\Http\Controllers\AnalystController;
use App\Http\Controllers\Auth\EmailTwoFactorController;
use App\Http\Controllers\Auth\TotpTwoFactorController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\OrganizationController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ResearcherController;
use App\Http\Controllers\TeamController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth', 'verified')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::put('/profile/email-2fa', [EmailTwoFactorController::class, 'update'])->name('email-2fa');
    Route::post('/profile/totp-2fa/enable', [TotpTwoFactorController::class, 'enable'])->name('totp-2fa-enable');
    Route::delete('/profile/totp-2fa/disable', [TotpTwoFactorController::class, 'disable'])->name('totp-2fa-disable');
    Route::get('/notifications', [NotificationController::class, 'index'])->name('notification');
    Route::post('/notifications/update', [NotificationController::class, 'markAllAsRead'])->name('notifications.update');
    Route::post('/notifications/read/{id}', [NotificationController::class, 'markAsRead'])->name('notifications.read');

});

Route::middleware(['auth', 'verified', 'role:organization'])->group(function () {
    Route::get('/org/dashboard', [OrganizationController::class, 'index'])->name('organization.dashboard');
});

Route::middleware(['auth', 'verified', 'role:analyst'])->group(function () {
    Route::get('/analyst/dashboard', [AnalystController::class, 'index'])->name('analyst.dashboard');
});

Route::middleware(['auth', 'verified', 'role:researcher'])->group(function () {
    Route::get('/researcher/dashboard', [ResearcherController::class, 'index'])->name('researcher.dashboard');
});

Route::middleware(['auth', 'verified', 'role:team'])->group(function () {
    Route::get('/team/dashboard', [TeamController::class, 'index'])->name('team.dashboard');
});

Route::get('/terms', [PageController::class, 'terms'])->name('terms');
Route::get('/privacy', [PageController::class, 'privacy'])->name('privacy');
Route::get('/solution', [PageController::class, 'solution'])->name('solution');
Route::get('/researchers', [PageController::class, 'researcher'])->name('researcher');
Route::get('/customers', [PageController::class, 'customer'])->name('customer');
Route::get('/resources', [PageController::class, 'resource'])->name('resource');
Route::get('/company', [PageController::class, 'company'])->name('company');

require __DIR__.'/auth.php';
