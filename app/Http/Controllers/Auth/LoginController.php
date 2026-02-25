<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function showForm()
    {
        if (Auth::check()) {
            return $this->redirectByRole(Auth::user());
        }
        return Inertia::render('Auth/Login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials, $request->boolean('remember'))) {
            $request->session()->regenerate();
            $user = Auth::user();

            if (!$user->is_active) {
                Auth::logout();
                return back()->withErrors(['email' => 'Votre compte est bloqué.']);
            }

            ActivityLog::log('login', 'Connexion réussie');

            return $this->redirectByRole($user);
        }

        return back()->withErrors([
            'email' => 'Les informations de connexion sont incorrectes.',
        ])->onlyInput('email');
    }

    public function logout(Request $request)
    {
        ActivityLog::log('logout', 'Déconnexion');
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('login');
    }

    private function redirectByRole($user)
    {
        if ($user->isSuperAdmin()) {
            return redirect()->route('superadmin.dashboard');
        }
        return redirect()->route('vendor.dashboard');
    }
}
