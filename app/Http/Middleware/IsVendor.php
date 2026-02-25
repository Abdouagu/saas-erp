<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class IsVendor
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!auth()->check() || !auth()->user()->isVendor()) {
            abort(403, 'Accès refusé.');
        }

        if (!auth()->user()->is_active) {
            Auth::logout();
            return redirect()->route('login')->withErrors(['email' => 'Votre compte est bloqué.']);
        }

        return $next($request);
    }
}
