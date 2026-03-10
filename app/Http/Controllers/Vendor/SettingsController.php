<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function index()
    {
        return Inertia::render('Vendor/Settings/Index', [
            'vendor' => auth()->user(),
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'shop_name' => 'nullable|string|max:100',
            'phone'     => 'nullable|string|max:30',
            'address'   => 'nullable|string|max:255',
            'logo'      => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $user = auth()->user();
        $data = $request->only(['shop_name', 'phone', 'address']);

        if ($request->hasFile('logo')) {
            // Delete old logo
            if ($user->logo) {
                Storage::disk('public')->delete($user->logo);
            }
            $data['logo'] = $request->file('logo')->store('logos', 'public');
        }

        $user->update($data);

        return back()->with('success', 'Paramètres mis à jour.');
    }

    public function deleteLogo()
    {
        $user = auth()->user();
        if ($user->logo) {
            Storage::disk('public')->delete($user->logo);
            $user->update(['logo' => null]);
        }
        return back()->with('success', 'Logo supprimé.');
    }
}
