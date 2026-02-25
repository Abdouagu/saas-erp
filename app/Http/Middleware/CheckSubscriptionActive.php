<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckSubscriptionActive
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth()->user();
        if ($user && $user->isVendor() && !$user->hasActiveSubscription()) {
            return redirect()->route('subscription.expired');
        }
        return $next($request);
    }
}
