<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\Auth;

class PageController extends Controller
{
    public function terms() 
    {
        return Inertia::render('Terms', [
            'user' => Auth::user()
        ]);
    }

    public function privacy()
    {
        return Inertia::render('Privacy', [
            'user' => Auth::user()
        ]);
    }

    public function solution()
    {
        return Inertia::render('Solution', [
            'user' => Auth::user()
        ]);
    }

    public function hacker()
    {
        return Inertia::render('Hacker', [
            'user' => Auth::user()
        ]);
    }

    public function customer()
    {
        return Inertia::render('Customer', [
            'user' => Auth::user()
        ]);
    }

    public function resource()
    {
        return Inertia::render('Resource', [
            'user' => Auth::user()
        ]);
    }

    public function company()
    {
        return Inertia::render('Company', [
            'user' => Auth::user()
        ]);
    }
}

