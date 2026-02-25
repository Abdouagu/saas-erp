<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    protected $fillable = [
        'name', 'email', 'password', 'role', 'phone', 'address', 'is_active',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_active' => 'boolean',
        ];
    }

    public function isSuperAdmin(): bool
    {
        return $this->role === 'superadmin';
    }

    public function isVendor(): bool
    {
        return $this->role === 'vendor';
    }

    public function subscription()
    {
        return $this->hasOne(Subscription::class, 'vendor_id');
    }

    public function products()
    {
        return $this->hasMany(Product::class, 'vendor_id');
    }

    public function sales()
    {
        return $this->hasMany(Sale::class, 'vendor_id');
    }

    public function clients()
    {
        return $this->hasMany(Client::class, 'vendor_id');
    }

    public function payments()
    {
        return $this->hasMany(Payment::class, 'vendor_id');
    }

    public function stockMovements()
    {
        return $this->hasMany(StockMovement::class, 'vendor_id');
    }

    public function activityLogs()
    {
        return $this->hasMany(ActivityLog::class, 'user_id');
    }

    public function hasActiveSubscription(): bool
    {
        $sub = $this->subscription;
        if (!$sub) return false;
        return $sub->status === 'active' && $sub->end_date >= now()->toDateString();
    }
}
