<?php

namespace App\Http\Controllers;

use App\Models\Bounty;
use App\Models\Organization;
use App\Models\Program;
use App\Models\Report;
use App\Models\Transaction;
use App\Notifications\ReportStatusChanged;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class OrganizationController extends Controller
{
    private function getOrg(): Organization
    {
        return Auth::user()->organization;
    }

    public function index()
    {
        $org = $this->getOrg();

        $stats = [
            'total_programs' => 0,
            'active_programs' => 0,
            'total_reports' => 0,
            'pending_reports' => 0,
            'triaged_reports' => 0,
            'resolved_reports' => 0,
            'total_bounties_paid' => 0,
        ];

        $recentReports = [];

        if ($org) {
            $stats = [
                'total_programs' => $org->programs()->count(),
                'active_programs' => $org->programs()->where('is_active', true)->count(),
                'total_reports' => $org->reports()->count(),
                'pending_reports' => $org->reports()->where('reports.status', 'pending')->count(),
                'triaged_reports' => $org->reports()->where('reports.status', 'triaged')->count(),
                'resolved_reports' => $org->reports()->where('reports.status', 'resolved')->count(),
                'total_bounties_paid' => $org->bounties()->where('status', 'paid')->sum('amount'),
            ];

            $recentReports = $org->reports()
                ->with(['program:id,title', 'researcher:id,first_name,last_name'])
                ->latest('reports.created_at')
                ->take(5)
                ->get();
        }

        return Inertia::render('Organization/Dashboard', [
            'stats' => $stats,
            'recentReports' => $recentReports,
            'hasOrg' => (bool) $org,
        ]);
    }

    // ---- PROGRAMS ----

    public function programs()
    {
        $org = $this->getOrg();
        $programs = $org
            ? $org->programs()->withCount('reports')->latest()->paginate(15)
            : collect();

        return Inertia::render('Organization/Programs/Index', [
            'programs' => $programs,
        ]);
    }

    public function bugBounty()
    {
        $org = $this->getOrg();
        $programs = $org
            ? $org->programs()->where('type', 'bug_bounty')->withCount('reports')->latest()->paginate(15)
            : collect();

        return Inertia::render('Organization/Programs/Index', [
            'programs' => $programs,
            'type' => 'bug_bounty',
            'typeLabel' => 'Bug Bounty Programs',
        ]);
    }

    public function vulnDisclosure()
    {
        $org = $this->getOrg();
        $programs = $org
            ? $org->programs()->where('type', 'vdp')->withCount('reports')->latest()->paginate(15)
            : collect();

        return Inertia::render('Organization/Programs/Index', [
            'programs' => $programs,
            'type' => 'vdp',
            'typeLabel' => 'Vulnerability Disclosure Programs',
        ]);
    }

    public function penTest()
    {
        $org = $this->getOrg();
        $programs = $org
            ? $org->programs()->where('type', 'pentest')->withCount('reports')->latest()->paginate(15)
            : collect();

        return Inertia::render('Organization/Programs/Index', [
            'programs' => $programs,
            'type' => 'pentest',
            'typeLabel' => 'Penetration Testing Programs',
        ]);
    }

    public function createProgram()
    {
        return Inertia::render('Organization/Programs/Create');
    }

    public function storeProgram(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|in:bug_bounty,vdp,pentest',
            'asset' => 'required|string',
            'in_scope' => 'required|string',
            'out_of_scope' => 'required|string',
            'policy' => 'nullable|string',
            'response_sla' => 'nullable|string|max:100',
            'critical_bounty_range' => 'nullable|string|max:100',
            'high_bounty_range' => 'nullable|string|max:100',
            'medium_bounty_range' => 'nullable|string|max:100',
            'low_bounty_range' => 'nullable|string|max:100',
            'informational_bounty_range' => 'nullable|string|max:100',
            'is_public' => 'boolean',
            'is_private' => 'boolean',
            'is_vdp' => 'boolean',
            'logo' => 'nullable|image|max:2048',
        ]);

        $org = $this->getOrg();
        if (!$org) {
            return back()->withErrors(['error' => 'Organization profile not found. Please complete your profile first.']);
        }

        $logoName = null;
        $logoPath = null;
        if ($request->hasFile('logo')) {
            $file = $request->file('logo');
            $logoName = $file->getClientOriginalName();
            $logoPath = $file->store('program-logos', 'public');
        }

        $program = Program::create([
            'organization_id' => $org->id,
            'title' => $validated['title'],
            'description' => $validated['description'],
            'type' => $validated['type'],
            'asset' => $validated['asset'],
            'in_scope' => $validated['in_scope'],
            'out_of_scope' => $validated['out_of_scope'],
            'policy' => $validated['policy'] ?? null,
            'response_sla' => $validated['response_sla'] ?? null,
            'critical_bounty_range' => $validated['critical_bounty_range'] ?? null,
            'high_bounty_range' => $validated['high_bounty_range'] ?? null,
            'medium_bounty_range' => $validated['medium_bounty_range'] ?? null,
            'low_bounty_range' => $validated['low_bounty_range'] ?? null,
            'informational_bounty_range' => $validated['informational_bounty_range'] ?? null,
            'is_public' => $validated['is_public'] ?? true,
            'is_private' => $validated['is_private'] ?? false,
            'is_vdp' => $validated['type'] === 'vdp',
            'is_managed' => $validated['type'] === 'pentest',
            'is_active' => true,
            'status' => 'active',
            'currency' => 'NGN',
            'logo_name' => $logoName,
            'logo_path' => $logoPath,
        ]);

        return redirect()->route('organization.programs.show', $program->id)
            ->with('success', 'Program created successfully.');
    }

    public function showProgram(string $id)
    {
        $org = $this->getOrg();
        $program = Program::where('organization_id', $org?->id)->with([
            'reports' => fn($q) => $q->with('researcher:id,first_name,last_name')->latest()->take(10),
        ])->withCount('reports')->findOrFail($id);

        $reportStats = [
            'total' => $program->reports()->count(),
            'pending' => $program->reports()->where('status', 'pending')->count(),
            'triaged' => $program->reports()->where('status', 'triaged')->count(),
            'resolved' => $program->reports()->where('status', 'resolved')->count(),
            'cancelled' => $program->reports()->where('status', 'cancelled')->count(),
        ];

        return Inertia::render('Organization/Programs/Show', [
            'program' => $program,
            'reportStats' => $reportStats,
        ]);
    }

    public function editProgram(string $id)
    {
        $org = $this->getOrg();
        $program = Program::where('organization_id', $org?->id)->findOrFail($id);

        return Inertia::render('Organization/Programs/Edit', [
            'program' => $program,
        ]);
    }

    public function updateProgram(Request $request, string $id)
    {
        $org = $this->getOrg();
        $program = Program::where('organization_id', $org?->id)->findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|in:bug_bounty,vdp,pentest',
            'asset' => 'required|string',
            'in_scope' => 'required|string',
            'out_of_scope' => 'required|string',
            'policy' => 'nullable|string',
            'response_sla' => 'nullable|string|max:100',
            'critical_bounty_range' => 'nullable|string|max:100',
            'high_bounty_range' => 'nullable|string|max:100',
            'medium_bounty_range' => 'nullable|string|max:100',
            'low_bounty_range' => 'nullable|string|max:100',
            'informational_bounty_range' => 'nullable|string|max:100',
            'is_public' => 'boolean',
            'is_active' => 'boolean',
            'logo' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('logo')) {
            if ($program->logo_path) {
                Storage::disk('public')->delete($program->logo_path);
            }
            $file = $request->file('logo');
            $validated['logo_name'] = $file->getClientOriginalName();
            $validated['logo_path'] = $file->store('program-logos', 'public');
        }

        $program->update($validated);

        return redirect()->route('organization.programs.show', $program->id)
            ->with('success', 'Program updated successfully.');
    }

    public function destroyProgram(string $id)
    {
        $org = $this->getOrg();
        $program = Program::where('organization_id', $org?->id)->findOrFail($id);
        $program->delete();

        return redirect()->route('organization.security.bug-bounty')
            ->with('success', 'Program deleted successfully.');
    }

    public function toggleProgramStatus(string $id)
    {
        $org = $this->getOrg();
        $program = Program::where('organization_id', $org?->id)->findOrFail($id);
        $program->update(['is_active' => !$program->is_active]);

        return back()->with('success', 'Program status updated.');
    }

    // ---- REPORTS ----

    public function reports(Request $request)
    {
        $org = $this->getOrg();
        $query = $org
            ? $org->reports()->with(['program:id,title', 'researcher:id,first_name,last_name'])
            : Report::whereRaw('1=0');

        if ($request->status) {
            $query->where('reports.status', $request->status);
        }
        if ($request->severity) {
            $query->where('reports.severity', $request->severity);
        }
        if ($request->program_id) {
            $query->where('reports.program_id', $request->program_id);
        }

        $reports = $query->latest('reports.created_at')->paginate(20)->withQueryString();

        $programs = $org ? $org->programs()->select('id', 'title')->get() : collect();

        return Inertia::render('Organization/Reports/Index', [
            'reports' => $reports,
            'programs' => $programs,
            'filters' => $request->only(['status', 'severity', 'program_id']),
        ]);
    }

    public function showReport(string $id)
    {
        $org = $this->getOrg();
        $report = Report::with([
            'program:id,title,organization_id',
            'researcher:id,first_name,last_name,email,reputation_points',
            'comments.user:id,name',
            'bounty',
            'attachments',
        ])->findOrFail($id);

        // Ensure this report belongs to this org's programs
        if ($org && $report->program->organization_id !== $org->id) {
            abort(403);
        }

        return Inertia::render('Organization/Reports/Show', [
            'report' => $report,
        ]);
    }

    public function updateReportStatus(Request $request, string $id)
    {
        $org = $this->getOrg();
        $report = Report::with('program')->findOrFail($id);

        if ($org && $report->program->organization_id !== $org->id) {
            abort(403);
        }

        $validated = $request->validate([
            'status' => 'required|in:pending,triaged,resolved,cancelled',
            'triage_notes' => 'nullable|string|max:2000',
        ]);

        $updateData = [
            'status' => $validated['status'],
            'triage_notes' => $validated['triage_notes'] ?? $report->triage_notes,
        ];

        if ($validated['status'] === 'triaged' && !$report->triaged_at) {
            $updateData['triaged_by'] = Auth::id();
            $updateData['triaged_at'] = now();
        }

        if ($validated['status'] === 'resolved' && !$report->resolved_at) {
            $updateData['resolved_at'] = now();
            // Update researcher stats
            if ($report->researcher) {
                $report->researcher->increment('reports_resolved');
            }
        }

        $oldStatus = $report->status;
        $report->update($updateData);

        // Notify researcher of status change
        if ($report->researcher?->user && $oldStatus !== $validated['status']) {
            try {
                $report->researcher->user->notify(
                    new ReportStatusChanged($report, $oldStatus, $validated['status'], $validated['triage_notes'] ?? null)
                );
            } catch (\Throwable $e) {
                Log::warning('Failed to send ReportStatusChanged notification', ['error' => $e->getMessage()]);
            }
        }

        return back()->with('success', 'Report status updated.');
    }

    // ---- AI & AUTOMATION / AUDIT (stubs) ----

    public function vulnScanner()
    {
        return Inertia::render('Organization/ComingSoon', [
            'feature' => 'Vulnerability Scanner',
            'description' => 'Automated vulnerability scanning powered by AI. Coming soon.',
        ]);
    }

    public function threatMonitor()
    {
        return Inertia::render('Organization/ComingSoon', [
            'feature' => 'Threat Monitoring',
            'description' => 'Real-time threat monitoring and alerting. Coming soon.',
        ]);
    }

    public function aiAssistant()
    {
        return Inertia::render('Organization/ComingSoon', [
            'feature' => 'AI Assistant',
            'description' => 'AI-powered security assistant. Coming soon.',
        ]);
    }

    public function securityAudit()
    {
        return Inertia::render('Organization/ComingSoon', [
            'feature' => 'Security Audit',
            'description' => 'Comprehensive security audit reports. Coming soon.',
        ]);
    }

    public function threatReport()
    {
        return Inertia::render('Organization/ComingSoon', [
            'feature' => 'Threat Report',
            'description' => 'Detailed threat intelligence reports. Coming soon.',
        ]);
    }

    public function vulnReport()
    {
        $org = $this->getOrg();
        $reports = $org
            ? $org->reports()->with(['program:id,title', 'researcher:id,first_name,last_name'])->latest('reports.created_at')->paginate(20)
            : collect();

        return Inertia::render('Organization/Reports/Index', [
            'reports' => $reports,
            'programs' => $org ? $org->programs()->select('id', 'title')->get() : collect(),
            'filters' => [],
        ]);
    }
}
