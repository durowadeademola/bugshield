<?php

use App\Http\Controllers\AnalystController;
use App\Http\Controllers\Auth\EmailTwoFactorController;
use App\Http\Controllers\Auth\TotpTwoFactorController;
use App\Http\Controllers\BountyController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\OnboardingController;
use App\Http\Controllers\OrganizationController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicController;
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

// ---- ORGANIZATION ----
Route::middleware(['auth', 'verified', 'role:organization'])->group(function () {
    Route::get('/org/dashboard', [OrganizationController::class, 'index'])->name('organization.dashboard');

    // Programs CRUD
    Route::get('/org/programs', [OrganizationController::class, 'programs'])->name('organization.programs');
    Route::get('/org/programs/create', [OrganizationController::class, 'createProgram'])->name('organization.programs.create');
    Route::post('/org/programs', [OrganizationController::class, 'storeProgram'])->name('organization.programs.store');
    Route::get('/org/programs/{id}', [OrganizationController::class, 'showProgram'])->name('organization.programs.show');
    Route::get('/org/programs/{id}/edit', [OrganizationController::class, 'editProgram'])->name('organization.programs.edit');
    Route::put('/org/programs/{id}', [OrganizationController::class, 'updateProgram'])->name('organization.programs.update');
    Route::delete('/org/programs/{id}', [OrganizationController::class, 'destroyProgram'])->name('organization.programs.destroy');
    Route::patch('/org/programs/{id}/toggle', [OrganizationController::class, 'toggleProgramStatus'])->name('organization.programs.toggle');

    // Security sections (filtered by type)
    Route::get('/org/security/bug-bounty', [OrganizationController::class, 'bugBounty'])->name('organization.security.bug-bounty');
    Route::get('/org/security/disclosure', [OrganizationController::class, 'vulnDisclosure'])->name('organization.security.disclosure');
    Route::get('/org/security/pentest', [OrganizationController::class, 'penTest'])->name('organization.security.pentest');

    // Incoming Reports
    Route::get('/org/reports', [OrganizationController::class, 'reports'])->name('organization.reports');
    Route::get('/org/reports/{id}', [OrganizationController::class, 'showReport'])->name('organization.reports.show');
    Route::patch('/org/reports/{id}/status', [OrganizationController::class, 'updateReportStatus'])->name('organization.reports.status');
    Route::post('/org/reports/{id}/bounty', [BountyController::class, 'store'])->name('organization.reports.bounty');
    Route::post('/org/reports/{id}/comments', [CommentController::class, 'store'])->name('organization.reports.comment');

    // AI & Automation (stubs)
    Route::get('/org/ai-auto/scanner', [OrganizationController::class, 'vulnScanner'])->name('organization.ai-auto.scanner');
    Route::get('/org/ai-auto/threat-monitor', [OrganizationController::class, 'threatMonitor'])->name('organization.ai-auto.threat-monitor');
    Route::get('/org/ai-auto/ai-assistant', [OrganizationController::class, 'aiAssistant'])->name('organization.ai-auto.ai-assistant');

    // Audit & Reports
    Route::get('/org/audit-report/security-audit', [OrganizationController::class, 'securityAudit'])->name('organization.audit-report.security-audit');
    Route::get('/org/audit-report/threat-report', [OrganizationController::class, 'threatReport'])->name('organization.audit-report.threat-report');
    Route::get('/org/audit-report/vuln-report', [OrganizationController::class, 'vulnReport'])->name('organization.audit-report.vuln-report');
});

// ---- ANALYST ----
Route::middleware(['auth', 'verified', 'role:analyst'])->group(function () {
    Route::get('/analyst/dashboard', [AnalystController::class, 'index'])->name('analyst.dashboard');
    Route::get('/analyst/programs', [AnalystController::class, 'programs'])->name('analyst.programs');
    Route::get('/analyst/programs/{id}', [AnalystController::class, 'showProgram'])->name('analyst.programs.show');
    Route::get('/analyst/reports', [AnalystController::class, 'reports'])->name('analyst.reports');
    Route::get('/analyst/reports/{id}', [AnalystController::class, 'showReport'])->name('analyst.reports.show');
    Route::patch('/analyst/reports/{id}/status', [AnalystController::class, 'updateReportStatus'])->name('analyst.reports.status');
    Route::post('/analyst/reports/{id}/comments', [CommentController::class, 'store'])->name('analyst.reports.comment');
});

// ---- RESEARCHER ----
Route::middleware(['auth', 'verified', 'role:researcher'])->group(function () {
    Route::get('/researcher/dashboard', [ResearcherController::class, 'index'])->name('researcher.dashboard');
    Route::get('/researcher/programs', [ResearcherController::class, 'programs'])->name('researcher.programs');
    Route::get('/researcher/programs/{id}', [ResearcherController::class, 'showProgram'])->name('researcher.programs.show');
    Route::get('/researcher/programs/{id}/submit', [ResearcherController::class, 'submitReport'])->name('researcher.programs.submit');
    Route::post('/researcher/programs/{id}/submit', [ResearcherController::class, 'storeReport'])->name('researcher.reports.store');
    Route::get('/researcher/invites', [ResearcherController::class, 'invites'])->name('researcher.invites');
    Route::get('/researcher/submissions', [ResearcherController::class, 'submissions'])->name('researcher.submissions');
    Route::get('/researcher/submissions/{id}', [ResearcherController::class, 'showSubmission'])->name('researcher.submissions.show');
    Route::post('/researcher/submissions/{id}/comments', [CommentController::class, 'store'])->name('researcher.submissions.comment');
    Route::get('/researcher/payments', [ResearcherController::class, 'payments'])->name('researcher.payments');
    Route::get('/researcher/leaderboards', [ResearcherController::class, 'leaderboards'])->name('researcher.leaderboards');
});

// ---- TEAM ----
Route::middleware(['auth', 'verified', 'role:team'])->group(function () {
    Route::get('/team/dashboard', [TeamController::class, 'index'])->name('team.dashboard');
    Route::get('/org/security/bug-bounty', [OrganizationController::class, 'bugBounty']);
    Route::get('/org/security/disclosure', [OrganizationController::class, 'vulnDisclosure']);
    Route::get('/org/security/pentest', [OrganizationController::class, 'penTest']);
    Route::get('/org/ai-auto/scanner', [OrganizationController::class, 'vulnScanner']);
    Route::get('/org/ai-auto/threat-monitor', [OrganizationController::class, 'threatMonitor']);
    Route::get('/org/ai-auto/ai-assistant', [OrganizationController::class, 'aiAssistant']);
    Route::get('/org/audit-report/security-audit', [OrganizationController::class, 'securityAudit']);
    Route::get('/org/audit-report/threat-report', [OrganizationController::class, 'threatReport']);
    Route::get('/org/audit-report/vuln-report', [OrganizationController::class, 'vulnReport']);
    Route::get('/org/reports', [OrganizationController::class, 'reports']);
    Route::get('/org/reports/{id}', [OrganizationController::class, 'showReport']);
});

// ---- ORGANIZATION ONBOARDING ----
Route::middleware(['auth', 'verified', 'role:organization'])->group(function () {
    Route::get('/org/onboarding', [OnboardingController::class, 'show'])->name('organization.onboarding');
    Route::post('/org/onboarding', [OnboardingController::class, 'store'])->name('organization.onboarding.store');
});

// ---- PUBLIC PAGES ----
Route::get('/programs', [PublicController::class, 'programs'])->name('public.programs');
Route::get('/researchers/{id}', [PublicController::class, 'researcherProfile'])->name('public.researcher.profile');
Route::get('/terms', [PageController::class, 'terms'])->name('terms');
Route::get('/privacy', [PageController::class, 'privacy'])->name('privacy');
Route::get('/solution', [PageController::class, 'solution'])->name('solution');
Route::get('/researchers', [PageController::class, 'researcher'])->name('researcher');
Route::get('/customers', [PageController::class, 'customer'])->name('customer');
Route::get('/resources', [PageController::class, 'resource'])->name('resource');
Route::get('/company', [PageController::class, 'company'])->name('company');

require __DIR__.'/auth.php';
