<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientController extends Controller
{
    public function index()
    {
        $clients = Client::withCount('sales')->latest()->paginate(15);
        return Inertia::render('Vendor/Clients/Index', ['clients' => $clients]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email',
            'address' => 'nullable|string',
        ]);

        Client::create([
            'vendor_id' => auth()->id(),
            'name' => $request->name,
            'phone' => $request->phone,
            'email' => $request->email,
            'address' => $request->address,
        ]);

        return redirect()->route('vendor.clients.index')->with('success', 'Client ajouté.');
    }

    public function show(Client $client)
    {
        $client->load('sales.items.product', 'payments');
        $totalDebt = max(0, (float)$client->sales->sum('final_amount') - (float)$client->sales->sum('paid_amount'));
        return Inertia::render('Vendor/Clients/Show', [
            'client'    => $client,
            'totalDebt' => $totalDebt,
        ]);
    }
}
