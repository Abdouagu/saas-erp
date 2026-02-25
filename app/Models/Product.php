<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'vendor_id', 'category', 'brand', 'name', 'serial_number', 'battery_percentage',
        'storage', 'color', 'condition', 'purchase_price', 'selling_price',
        'photo', 'barcode', 'internal_code', 'status',
    ];

    protected $casts = [
        'purchase_price' => 'decimal:2',
        'selling_price' => 'decimal:2',
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

    public function saleItems()
    {
        return $this->hasMany(SaleItem::class);
    }

    public function stockMovements()
    {
        return $this->hasMany(StockMovement::class);
    }
}
