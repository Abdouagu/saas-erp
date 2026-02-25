<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $fillable = [
        'vendor_id', 'name', 'phone', 'email', 'address', 'status',
    ];

    protected static function booted(): void
    {
        static::addGlobalScope('vendor', function ($query) {
            if (auth()->check() && auth()->user()->isVendor()) {
                $query->where('vendor_id', auth()->id());
            }
        });
    }

    public function vendor()
    {
        return $this->belongsTo(User::class, 'vendor_id');
    }

    public function sales()
    {
        return $this->hasMany(Sale::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function totalDebt(): float
    {
        return (float) $this->sales()->where('status', '!=', 'paid')->sum(\Illuminate\Support\Facades\DB::raw('final_amount - paid_amount'));
    }
}
