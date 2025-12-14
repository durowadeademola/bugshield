<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function terms(): Response
    {
        return Inertia::render('Terms', ['user' => Auth::user()]);
    }

    public function privacy(): Response
    {
        return Inertia::render('Privacy', ['user' => Auth::user()]);
    }

    public function solution(): Response
    {
        return Inertia::render('Solution', ['user' => Auth::user()]);
    }

    public function researcher(): Response
    {
        return Inertia::render('Researcher', ['user' => Auth::user()]);
    }

    public function customer(): Response
    {
        return Inertia::render('Customer', ['user' => Auth::user()]);
    }

    public function resource(): Response
    {
        return Inertia::render('Resource', ['user' => Auth::user()]);
    }

    public function company(): Response
    {
        return Inertia::render('Company', ['user' => Auth::user()]);
    }
}
