<?php

namespace App\Http\Controllers;

use App\Models\Program;
use App\Models\Report;
use App\Models\Researcher;
use App\Notifications\NewReportSubmitted;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ResearcherController extends Controller
{
    private function getResearcher(): ?Researcher
    {
        return Auth::user()->researcher;
    }

    public function index()
    {
        $researcher = $this->getResearcher();

        $stats = [
            'total_submissions' => 0,
            'pending_reports' => 0,
            'resolved_reports' => 0,
            'total_earned' => 0,
            'reputation_points' => 0,
            'rank' => 0,
        ];

        $recentSubmissions = [];

        if ($researcher) {
            $stats = [
                'total_submissions' => $researcher->reports()->count(),
                'pending_reports' => $researcher->reports()->where('status', 'pending')->count(),
                'triaged_reports' => $researcher->reports()->where('status', 'triaged')->count(),
                'resolved_reports' => $researcher->reports()->where('status', 'resolved')->count(),
                'total_earned' => $researcher->total_earnings,
                'reputation_points' => $researcher->reputation_points,
                'rank' => $researcher->rank,
            ];

            $recentSubmissions = $researcher->reports()
                ->with(['program:id,title'])
                ->latest()
                ->take(5)
                ->get();
        }

        return Inertia::render('Researcher/Dashboard', [
            'stats' => $stats,
            'recentSubmissions' => $recentSubmissions,
            'hasProfile' => (bool) $researcher,
        ]);
    }

    public function programs(Request $request)
    {
        $query = Program::where('is_active', true)
            ->where('is_public', true)
            ->with('organization:id,name,logo_path')
            ->withCount('reports');

        if ($request->type) {
            $query->where('type', $request->type);
        }
        if ($request->search) {
            $query->where('title', 'like', "%{$request->search}%");
        }

        $programs = $query->latest()->paginate(15)->withQueryString();

        return Inertia::render('Researcher/Programs/Index', [
            'programs' => $programs,
            'filters' => $request->only(['type', 'search']),
        ]);
    }

    public function showProgram(string $id)
    {
        $program = Program::where('is_active', true)
            ->with('organization:id,name,logo_path,website')
            ->findOrFail($id);

        $researcher = $this->getResearcher();
        $hasSubmitted = $researcher
            ? $researcher->reports()->where('program_id', $id)->exists()
            : false;

        return Inertia::render('Researcher/Programs/Show', [
            'program' => $program,
            'hasSubmitted' => $hasSubmitted,
        ]);
    }

    public function submitReport(string $programId)
    {
        $program = Program::where('is_active', true)->findOrFail($programId);

        return Inertia::render('Researcher/Reports/Create', [
            'program' => $program,
        ]);
    }

    public function storeReport(Request $request, string $programId)
    {
        $program = Program::where('is_active', true)->findOrFail($programId);
        $researcher = $this->getResearcher();

        if (!$researcher) {
            return back()->withErrors(['error' => 'Researcher profile not found. Please complete your profile first.']);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|min:50',
            'steps_to_reproduce' => 'required|string|min:20',
            'proof_of_concept' => 'nullable|string',
            'url' => 'nullable|url|max:500',
            'asset' => 'required|string|max:255',
            'weakness' => 'required|string|max:255',
            'severity' => 'required|in:critical,high,medium,low,informational',
            'impact' => 'required|string|min:20',
            'cvss_score' => 'nullable|numeric|min:0|max:10',
            'cvss_vector' => 'nullable|string|max:100',
        ]);

        $report = Report::create([
            'researcher_id' => $researcher->id,
            'program_id' => $program->id,
            'title' => $validated['title'],
            'description' => $validated['description'],
            'steps_to_reproduce' => $validated['steps_to_reproduce'],
            'proof_of_concept' => $validated['proof_of_concept'] ?? null,
            'url' => $validated['url'] ?? null,
            'asset' => $validated['asset'],
            'weakness' => $validated['weakness'],
            'severity' => $validated['severity'],
            'impact' => $validated['impact'],
            'cvss_score' => $validated['cvss_score'] ?? null,
            'cvss_vector' => $validated['cvss_vector'] ?? null,
            'status' => 'pending',
            'is_critical' => $validated['severity'] === 'critical',
            'is_high' => $validated['severity'] === 'high',
            'is_medium' => $validated['severity'] === 'medium',
            'is_low' => $validated['severity'] === 'low',
            'is_informational' => $validated['severity'] === 'informational',
        ]);

        // Increment researcher stats and program stats
        $researcher->increment('reports_submitted');
        $program->increment('total_reports');

        // Award reputation points for submission
        $researcher->increment('reputation_points', 5);

        // Notify the organization owner
        $orgUser = $program->organization?->user ?? null;
        if ($orgUser) {
            try {
                $report->load('program');
                $orgUser->notify(new NewReportSubmitted($report));
            } catch (\Throwable $e) {
                Log::warning('Failed to send NewReportSubmitted notification', ['error' => $e->getMessage()]);
            }
        }

        return redirect()->route('researcher.submissions.show', $report->id)
            ->with('success', 'Report submitted successfully. We will review it shortly.');
    }

    public function invites()
    {
        return Inertia::render('Researcher/Invites/Index', [
            'invites' => [],
        ]);
    }

    public function submissions(Request $request)
    {
        $researcher = $this->getResearcher();
        $query = $researcher
            ? $researcher->reports()->with(['program:id,title,organization_id', 'bounty'])
            : Report::whereRaw('1=0');

        if ($request->status) {
            $query->where('status', $request->status);
        }
        if ($request->severity) {
            $query->where('severity', $request->severity);
        }

        $submissions = $query->latest()->paginate(15)->withQueryString();

        return Inertia::render('Researcher/Submissions/Index', [
            'submissions' => $submissions,
            'filters' => $request->only(['status', 'severity']),
            'stats' => $researcher ? [
                'total' => $researcher->reports()->count(),
                'pending' => $researcher->reports()->where('status', 'pending')->count(),
                'triaged' => $researcher->reports()->where('status', 'triaged')->count(),
                'resolved' => $researcher->reports()->where('status', 'resolved')->count(),
            ] : [],
        ]);
    }

    public function showSubmission(string $id)
    {
        $researcher = $this->getResearcher();
        $report = Report::with([
            'program:id,title,organization_id,critical_bounty_range,high_bounty_range,medium_bounty_range,low_bounty_range',
            'comments.user:id,name',
            'bounty',
        ])->findOrFail($id);

        if ($researcher && $report->researcher_id !== $researcher->id) {
            abort(403);
        }

        return Inertia::render('Researcher/Submissions/Show', [
            'report' => $report,
        ]);
    }

    public function payments(Request $request)
    {
        $researcher = $this->getResearcher();
        $bounties = $researcher
            ? $researcher->bounties()->with(['program:id,title', 'report:id,title,severity'])->latest()->paginate(15)
            : collect();

        $totalEarned = $researcher?->total_earnings ?? 0;
        $pendingAmount = $researcher
            ? $researcher->bounties()->where('status', 'pending')->sum('amount')
            : 0;

        return Inertia::render('Researcher/Payments/Index', [
            'bounties' => $bounties,
            'totalEarned' => $totalEarned,
            'pendingAmount' => $pendingAmount,
        ]);
    }

    public function leaderboards()
    {
        $researchers = Researcher::select([
                'id', 'first_name', 'last_name', 'country',
                'reputation_points', 'total_earnings', 'reports_resolved',
                'reports_submitted', 'rank', 'image_path',
            ])
            ->where('is_active', true)
            ->orderByDesc('reputation_points')
            ->take(50)
            ->get();

        $currentResearcher = $this->getResearcher();

        return Inertia::render('Researcher/Leaderboards/Index', [
            'researchers' => $researchers,
            'currentResearcherId' => $currentResearcher?->id,
        ]);
    }
}
