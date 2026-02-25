<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\Subscription;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubscriptionController extends Controller
{
    public function index()
    {
        $subscriptions = Subscription::with('vendor')->latest()->paginate(15);
        $vendors = User::where('role', 'vendor')->get();
        return Inertia::render('SuperAdmin/Subscriptions/Index', [
            'subscriptions' => $subscriptions,
            'vendors'       => $vendors,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'vendor_id' => 'required|exists:users,id',
            'plan_name' => 'required|string|max:100',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'amount' => 'required|numeric|min:0',
            'status' => 'required|in:active,expired,suspended',
        ]);

        Subscription::updateOrCreate(
            ['vendor_id' => $request->vendor_id],
            $request->only('plan_name', 'start_date', 'end_date', 'amount', 'status')
        );

        return redirect()->route('superadmin.subscriptions.index')->with('success', 'Abonnement enregistré.');
    }
}
