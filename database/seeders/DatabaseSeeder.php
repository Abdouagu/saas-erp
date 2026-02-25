<?php

namespace Database\Seeders;

use App\Models\Subscription;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Super Admin
        User::create([
            'name' => 'Super Admin',
            'email' => 'admin@erp.com',
            'password' => Hash::make('password'),
            'role' => 'superadmin',
            'is_active' => true,
        ]);

        // Test Vendor
        $vendor = User::create([
            'name' => 'Vendeur Test',
            'email' => 'vendor@erp.com',
            'password' => Hash::make('password'),
            'role' => 'vendor',
            'phone' => '+213 555 000 000',
            'address' => '12 Rue des Téléphones, Alger',
            'is_active' => true,
        ]);

        // Subscription for test vendor
        Subscription::create([
            'vendor_id' => $vendor->id,
            'plan_name' => 'Plan Pro',
            'start_date' => now(),
            'end_date' => now()->addYear(),
            'status' => 'active',
            'amount' => 5000,
        ]);
    }
}
