<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    protected $fillable = [
        'vendor_id', 'client_id', 'total_amount', 'discount_percentage',
        'final_amount', 'paid_amount', 'payment_method', 'status', 'notes',
    ];

    protected $casts = [
        'total_amount' => 'decimal:2',
        'discount_percentage' => 'decimal:2',
        'final_amount' => 'decimal:2',
        'paid_amount' => 'decimal:2',
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

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function items()
    {
        return $this->hasMany(SaleItem::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function remainingAmount(): float
    {
        return max(0, (float)$this->final_amount - (float)$this->paid_amount);
    }
}
