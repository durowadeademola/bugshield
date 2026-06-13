<?php

namespace App\Http\Controllers;

use App\Models\Program;
use App\Models\Researcher;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicController extends Controller
{
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
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', "%{$request->search}%")
                  ->orWhereHas('organization', fn($o) => $o->where('name', 'like', "%{$request->search}%"));
            });
        }

        $programs = $query->latest()->paginate(18)->withQueryString();

        $stats = [
            'total_programs'       => Program::where('is_active', true)->where('is_public', true)->count(),
            'total_researchers'    => Researcher::where('is_active', true)->count(),
            'total_bounties_paid'  => Program::sum('total_bounties_paid'),
        ];

        return Inertia::render('Public/Programs', [
            'programs' => $programs,
            'filters'  => $request->only(['type', 'search']),
            'stats'    => $stats,
        ]);
    }

    public function researcherProfile(string $id)
    {
        $researcher = Researcher::with([
            'reports' => fn($q) => $q->with('program:id,title')->latest()->take(10),
        ])->where('is_active', true)->findOrFail($id);

        $stats = [
            'reports_submitted' => $researcher->reports_submitted,
            'reports_resolved'  => $researcher->reports_resolved,
            'total_earned'      => $researcher->total_earnings,
            'reputation_points' => $researcher->reputation_points,
        ];

        $rank = Researcher::where('is_active', true)
            ->where('reputation_points', '>', $researcher->reputation_points)
            ->count() + 1;

        $recentActivity = $researcher->reports()
            ->with('program:id,title')
            ->select('id', 'title', 'severity', 'status', 'program_id', 'created_at')
            ->latest()
            ->take(8)
            ->get();

        return Inertia::render('Public/ResearcherProfile', [
            'researcher'     => $researcher,
            'stats'          => $stats,
            'rank'           => $rank,
            'recentActivity' => $recentActivity,
        ]);
    }
}
