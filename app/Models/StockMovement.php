<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StockMovement extends Model
{
    protected $fillable = [
        'vendor_id', 'product_id', 'type', 'quantity', 'notes',
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

    public function product()
    {
        return $this->belongsTo(Product::class)->withoutGlobalScopes();
    }
}
