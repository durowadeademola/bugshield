<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PageController extends Controller
{

    /**
     * Display the terms of bugshield.
     */
    public function terms() 
    {
        return view('pages.terms');
    }

    /**
     * Display the privacy of bugshield.
     */
    public function privacy()
    {
        return view('pages.privacy');
    }
    
     /**
     * Display the solutions of bugshield.
     */
    public function solution()
    {
        return view('pages.solution');
    }

     /**
     * Display the hackers of bugshield.
     */
    public function hacker()
    {
        return view('pages.hacker');
    }

     /**
     * Display the customers of bugshield.
     */
    public function customer()
    {
        return view('pages.customer');
    }

     /**
     * Display the resources of bugshield.
     */
    public function resource()
    {
        return view('pages.resource');
    }

     /**
     * Display the privacy of bugshield.
     */
    public function company()
    {
        return view('pages.company');
    }

}
