<?php

namespace App\Http\Controllers;

use Inertia\Response;
use Inertia\Inertia;
use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\Auth;

class PageController extends Controller
{
    public function terms(): Response
    {
        return Inertia::render('Terms', [
            'user' => Auth::user()
        ]);
    }

    public function privacy(): Response
    {
        return Inertia::render('Privacy', [
            'user' => Auth::user()
        ]);
    }

    public function solution(): Response
    {
        return Inertia::render('Solution', [
            'user' => Auth::user()
        ]);
    }

    public function hacker(): Response
    {
        return Inertia::render('Hacker', [
            'user' => Auth::user()
        ]);
    }

    public function customer(): Response
    {
        return Inertia::render('Customer', [
            'user' => Auth::user()
        ]);
    }

    public function resource(): Response
    {
        return Inertia::render('Resource', [
            'user' => Auth::user()
        ]);
    }

    public function company(): Response
    {
        return Inertia::render('Company', [
            'user' => Auth::user()
        ]);
    }
}

