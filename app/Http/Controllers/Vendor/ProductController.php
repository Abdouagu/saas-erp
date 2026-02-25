<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\Product;
use App\Models\StockMovement;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query();

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%$search%")
                  ->orWhere('brand', 'like', "%$search%")
                  ->orWhere('serial_number', 'like', "%$search%")
                  ->orWhere('barcode', 'like', "%$search%")
                  ->orWhere('internal_code', 'like', "%$search%");
            });
        }

        $products = $query->latest()->paginate(20)->withQueryString();

        // append photo_url for each product
        $products->getCollection()->transform(function ($p) {
            $p->photo_url = $p->photo ? asset('storage/' . $p->photo) : null;
            return $p;
        });

        return Inertia::render('Vendor/Products/Index', [
            'products' => $products,
            'filters'  => $request->only('search', 'category', 'status'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Vendor/Products/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'category' => 'required|in:phone,pc',
            'brand' => 'nullable|string|max:100',
            'name' => 'required|string|max:255',
            'serial_number' => 'nullable|string|max:100',
            'battery_percentage' => 'nullable|integer|min:0|max:100',
            'storage' => 'nullable|string|max:50',
            'color' => 'nullable|string|max:50',
            'condition' => 'required|in:new,used',
            'purchase_price' => 'required|numeric|min:0',
            'selling_price' => 'required|numeric|min:0',
            'photo' => 'nullable|image|max:2048',
        ]);

        $data = $request->except(['photo', '_token']);
        $data['vendor_id'] = auth()->id();
        $data['internal_code'] = 'INT-' . strtoupper(Str::random(8));
        $data['barcode'] = '2' . str_pad(auth()->id(), 4, '0', STR_PAD_LEFT) . str_pad(time() % 100000000, 8, '0', STR_PAD_LEFT);

        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('products', 'public');
        }

        $product = Product::create($data);

        StockMovement::create([
            'vendor_id' => auth()->id(),
            'product_id' => $product->id,
            'type' => 'entry',
            'quantity' => 1,
            'notes' => 'Ajout initial du produit',
        ]);

        ActivityLog::log('product_created', "Produit créé: {$product->name}");

        return redirect()->route('vendor.products.show', $product)->with('success', 'Produit ajouté avec succès.');
    }

    public function show(Product $product)
    {
        $product->load('stockMovements');
        $product->photo_url = $product->photo ? asset('storage/' . $product->photo) : null;
        return Inertia::render('Vendor/Products/Show', ['product' => $product]);
    }

    public function edit(Product $product)
    {
        $product->photo_url = $product->photo ? asset('storage/' . $product->photo) : null;
        return Inertia::render('Vendor/Products/Create', ['product' => $product]);
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'category' => 'required|in:phone,pc',
            'brand' => 'nullable|string|max:100',
            'name' => 'required|string|max:255',
            'serial_number' => 'nullable|string|max:100',
            'battery_percentage' => 'nullable|integer|min:0|max:100',
            'storage' => 'nullable|string|max:50',
            'color' => 'nullable|string|max:50',
            'condition' => 'required|in:new,used',
            'purchase_price' => 'required|numeric|min:0',
            'selling_price' => 'required|numeric|min:0',
            'photo' => 'nullable|image|max:2048',
        ]);

        $data = $request->except(['photo', '_token', '_method']);

        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('products', 'public');
        }

        $product->update($data);
        ActivityLog::log('product_updated', "Produit mis à jour: {$product->name}");

        return redirect()->route('vendor.products.show', $product)->with('success', 'Produit mis à jour.');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        ActivityLog::log('product_deleted', "Produit supprimé: {$product->name}");
        return redirect()->route('vendor.products.index')->with('success', 'Produit supprimé.');
    }
}
