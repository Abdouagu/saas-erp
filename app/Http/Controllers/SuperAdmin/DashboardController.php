<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\Subscription;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke()
    {
        $totalVendors = User::where('role', 'vendor')->count();
        $activeVendors = User::where('role', 'vendor')->where('is_active', true)->count();
        $blockedVendors = User::where('role', 'vendor')->where('is_active', false)->count();
        $activeSubscriptions = Subscription::where('status', 'active')->count();
        $totalRevenue = Subscription::sum('amount');
        $recentVendors = User::where('role', 'vendor')->latest()->take(5)->with('subscription')->get();

        return Inertia::render('SuperAdmin/Dashboard', [
            'totalVendors'        => $totalVendors,
            'activeVendors'       => $activeVendors,
            'blockedVendors'      => $blockedVendors,
            'activeSubscriptions' => $activeSubscriptions,
            'totalRevenue'        => (float) $totalRevenue,
            'recentVendors'       => $recentVendors,
        ]);
    }
}
