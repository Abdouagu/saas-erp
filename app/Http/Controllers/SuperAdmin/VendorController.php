<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class VendorController extends Controller
{
    public function index()
    {
        $vendors = User::where('role', 'vendor')->with('subscription')->latest()->paginate(15);
        return Inertia::render('SuperAdmin/Vendors/Index', ['vendors' => $vendors]);
    }

    public function create()
    {
        return Inertia::render('SuperAdmin/Vendors/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8|confirmed',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'vendor',
            'phone' => $request->phone,
            'address' => $request->address,
            'is_active' => true,
        ]);

        return redirect()->route('superadmin.vendors.index')->with('success', 'Vendeur créé avec succès.');
    }

    public function edit(User $vendor)
    {
        abort_if($vendor->role !== 'vendor', 404);
        return Inertia::render('SuperAdmin/Vendors/Edit', ['vendor' => $vendor]);
    }

    public function update(Request $request, User $vendor)
    {
        abort_if($vendor->role !== 'vendor', 404);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $vendor->id,
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
        ]);

        $vendor->update($request->only('name', 'email', 'phone', 'address'));

        if ($request->filled('password')) {
            $request->validate(['password' => 'min:8|confirmed']);
            $vendor->update(['password' => Hash::make($request->password)]);
        }

        return redirect()->route('superadmin.vendors.index')->with('success', 'Vendeur mis à jour.');
    }

    public function destroy(User $vendor)
    {
        abort_if($vendor->role !== 'vendor', 404);
        $vendor->delete();
        return redirect()->route('superadmin.vendors.index')->with('success', 'Vendeur supprimé.');
    }

    public function toggleBlock(User $vendor)
    {
        abort_if($vendor->role !== 'vendor', 404);
        $vendor->update(['is_active' => !$vendor->is_active]);
        $msg = $vendor->is_active ? 'Vendeur activé.' : 'Vendeur bloqué.';
        return redirect()->back()->with('success', $msg);
    }
}
