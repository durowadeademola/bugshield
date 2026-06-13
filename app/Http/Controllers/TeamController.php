<?php

namespace App\Http\Controllers;

use App\Models\Program;
use App\Models\Report;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TeamController extends Controller
{
    public function index()
    {
        $team = Auth::user()->team;
        $org = $team ? $team->organization : null;

        $stats = [
            'total_programs' => 0,
            'total_reports' => 0,
            'pending_reports' => 0,
            'resolved_reports' => 0,
        ];

        $recentReports = [];

        if ($org) {
            $stats = [
                'total_programs' => $org->programs()->count(),
                'total_reports' => $org->reports()->count(),
                'pending_reports' => $org->reports()->where('reports.status', 'pending')->count(),
                'resolved_reports' => $org->reports()->where('reports.status', 'resolved')->count(),
            ];

            $recentReports = $org->reports()
                ->with(['program:id,title', 'researcher:id,first_name,last_name'])
                ->latest('reports.created_at')
                ->take(5)
                ->get();
        }

        return Inertia::render('Team/Dashboard', [
            'stats' => $stats,
            'recentReports' => $recentReports,
        ]);
    }
}
