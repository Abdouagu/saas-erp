<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\Client;
use App\Models\Payment;
use App\Models\Product;
use App\Models\Sale;
use App\Models\SaleItem;
use App\Models\StockMovement;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SaleController extends Controller
{
    public function index()
    {
        $sales = Sale::with('client')->latest()->paginate(15);
        return Inertia::render('Vendor/Sales/Index', ['sales' => $sales]);
    }

    public function create()
    {
        $clients = Client::orderBy('name')->get();
        $products = Product::where('status', 'available')->orderBy('name')->get();
        return Inertia::render('Vendor/Sales/Create', [
            'clients'  => $clients,
            'products' => $products,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'products' => 'required|array|min:1',
            'products.*' => 'exists:products,id',
            'prices' => 'required|array',
            'prices.*' => 'numeric|min:0',
            'client_id' => 'nullable|exists:clients,id',
            'discount_percentage' => 'nullable|numeric|min:0|max:100',
            'paid_amount' => 'required|numeric|min:0',
            'payment_method' => 'required|in:cash,card,transfer,installment',
            'notes' => 'nullable|string',
        ]);

        $saleId = null;

        DB::transaction(function () use ($request, &$saleId) {
            $totalAmount = 0;
            $selectedProducts = [];

            foreach ($request->products as $idx => $productId) {
                $product = Product::findOrFail($productId);
                $price = (float) $request->prices[$idx];
                $totalAmount += $price;
                $selectedProducts[] = ['product' => $product, 'price' => $price];
            }

            $discount = (float) ($request->discount_percentage ?? 0);
            $finalAmount = $totalAmount * (1 - $discount / 100);
            $paidAmount = (float) $request->paid_amount;

            $status = 'pending';
            if ($paidAmount >= $finalAmount) {
                $status = 'paid';
                $paidAmount = $finalAmount;
            } elseif ($paidAmount > 0) {
                $status = 'partial';
            }

            $sale = Sale::create([
                'vendor_id' => auth()->id(),
                'client_id' => $request->client_id,
                'total_amount' => $totalAmount,
                'discount_percentage' => $discount,
                'final_amount' => $finalAmount,
                'paid_amount' => $paidAmount,
                'payment_method' => $request->payment_method,
                'status' => $status,
                'notes' => $request->notes,
            ]);

            foreach ($selectedProducts as $item) {
                SaleItem::create([
                    'sale_id' => $sale->id,
                    'product_id' => $item['product']->id,
                    'price' => $item['price'],
                    'quantity' => 1,
                ]);

                $item['product']->update(['status' => 'sold']);

                StockMovement::create([
                    'vendor_id' => auth()->id(),
                    'product_id' => $item['product']->id,
                    'type' => 'sale',
                    'quantity' => -1,
                    'notes' => "Vendu - Vente #{$sale->id}",
                ]);
            }

            if ($paidAmount > 0) {
                Payment::create([
                    'sale_id' => $sale->id,
                    'vendor_id' => auth()->id(),
                    'client_id' => $request->client_id,
                    'amount' => $paidAmount,
                    'payment_date' => now()->toDateString(),
                    'notes' => 'Paiement initial',
                ]);
            }

            // Update client status if debt
            if ($request->client_id && $status !== 'paid') {
                $client = Client::find($request->client_id);
                if ($client) {
                    $client->update(['status' => 'late']);
                }
            }

            ActivityLog::log('sale_created', "Vente #{$sale->id} créée");

            $saleId = $sale->id;
        });

        return redirect()->route('vendor.sales.show', $saleId)->with('success', 'Vente enregistrée avec succès.');
    }

    public function show(Sale $sale)
    {
        $sale->load('items.product', 'client', 'payments');
        return Inertia::render('Vendor/Sales/Show', ['sale' => $sale]);
    }

    public function downloadInvoice(Sale $sale)
    {
        $sale->load('items.product', 'client', 'vendor');
        $pdf = Pdf::loadView('vendor.sales.invoice', compact('sale'));
        return $pdf->download("facture-{$sale->id}.pdf");
    }
}
