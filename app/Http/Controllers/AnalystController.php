<?php

namespace App\Http\Controllers;

use App\Models\Program;
use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AnalystController extends Controller
{
    public function index()
    {
        $stats = [
            'total_programs' => Program::where('is_active', true)->count(),
            'total_reports' => Report::count(),
            'pending_reports' => Report::where('status', 'pending')->count(),
            'triaged_reports' => Report::where('status', 'triaged')->count(),
            'resolved_reports' => Report::where('status', 'resolved')->count(),
        ];

        $recentReports = Report::with([
            'program:id,title',
            'researcher:id,first_name,last_name',
        ])->latest()->take(5)->get();

        return Inertia::render('Analyst/Dashboard', [
            'stats' => $stats,
            'recentReports' => $recentReports,
        ]);
    }

    public function programs(Request $request)
    {
        $query = Program::with('organization:id,name')->withCount('reports');

        if ($request->type) {
            $query->where('type', $request->type);
        }
        if ($request->search) {
            $query->where('title', 'like', "%{$request->search}%");
        }

        $programs = $query->latest()->paginate(15)->withQueryString();

        return Inertia::render('Analyst/Programs/Index', [
            'programs' => $programs,
            'filters' => $request->only(['type', 'search']),
        ]);
    }

    public function showProgram(string $id)
    {
        $program = Program::with([
            'organization:id,name',
            'reports' => fn($q) => $q->with('researcher:id,first_name,last_name')->latest()->take(10),
        ])->withCount('reports')->findOrFail($id);

        $reportStats = [
            'total' => $program->reports()->count(),
            'pending' => $program->reports()->where('status', 'pending')->count(),
            'triaged' => $program->reports()->where('status', 'triaged')->count(),
            'resolved' => $program->reports()->where('status', 'resolved')->count(),
        ];

        return Inertia::render('Analyst/Programs/Show', [
            'program' => $program,
            'reportStats' => $reportStats,
        ]);
    }

    public function reports(Request $request)
    {
        $query = Report::with([
            'program:id,title',
            'researcher:id,first_name,last_name',
        ]);

        if ($request->status) {
            $query->where('status', $request->status);
        }
        if ($request->severity) {
            $query->where('severity', $request->severity);
        }
        if ($request->program_id) {
            $query->where('program_id', $request->program_id);
        }

        $reports = $query->latest()->paginate(20)->withQueryString();
        $programs = Program::select('id', 'title')->get();

        return Inertia::render('Analyst/Reports/Index', [
            'reports' => $reports,
            'programs' => $programs,
            'filters' => $request->only(['status', 'severity', 'program_id']),
        ]);
    }

    public function showReport(string $id)
    {
        $report = Report::with([
            'program:id,title,organization_id',
            'researcher:id,first_name,last_name,email,reputation_points',
            'comments.user:id,name',
            'bounty',
            'attachments',
        ])->findOrFail($id);

        return Inertia::render('Analyst/Reports/Show', [
            'report' => $report,
        ]);
    }

    public function updateReportStatus(Request $request, string $id)
    {
        $report = Report::findOrFail($id);

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
            if ($report->researcher) {
                $report->researcher->increment('reports_resolved');
            }
        }

        $report->update($updateData);

        return back()->with('success', 'Report status updated.');
    }
}
