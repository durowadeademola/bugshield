<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function store(Request $request, string $reportId)
    {
        $report = Report::findOrFail($reportId);

        $validated = $request->validate([
            'message' => 'required|string|max:5000',
        ]);

        Comment::create([
            'report_id' => $report->id,
            'program_id' => $report->program_id,
            'user_id' => Auth::id(),
            'message' => $validated['message'],
        ]);

        return back()->with('success', 'Comment added.');
    }
}
