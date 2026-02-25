<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'sale_id', 'vendor_id', 'client_id', 'amount', 'payment_date', 'notes',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'payment_date' => 'date',
    ];

    protected static function booted(): void
    {
        static::addGlobalScope('vendor', function ($query) {
            if (auth()->check() && auth()->user()->isVendor()) {
                $query->where('vendor_id', auth()->id());
            }
        });
    }

    public function sale()
    {
        return $this->belongsTo(Sale::class);
    }

    public function vendor()
    {
        return $this->belongsTo(User::class, 'vendor_id');
    }

    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}
