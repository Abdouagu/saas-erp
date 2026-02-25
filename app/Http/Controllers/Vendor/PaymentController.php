<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Payment;
use App\Models\Sale;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function index()
    {
        $payments = Payment::with('client', 'sale')->latest()->paginate(15);
        return Inertia::render('Vendor/Payments/Index', ['payments' => $payments]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'sale_id' => 'required|exists:sales,id',
            'amount' => 'required|numeric|min:0.01',
            'payment_date' => 'required|date',
            'notes' => 'nullable|string',
        ]);

        $sale = Sale::findOrFail($request->sale_id);

        $remaining = $sale->remainingAmount();
        $amount = min((float)$request->amount, $remaining);

        Payment::create([
            'sale_id' => $sale->id,
            'vendor_id' => auth()->id(),
            'client_id' => $sale->client_id,
            'amount' => $amount,
            'payment_date' => $request->payment_date,
            'notes' => $request->notes,
        ]);

        $newPaid = (float)$sale->paid_amount + $amount;
        $newStatus = $newPaid >= (float)$sale->final_amount ? 'paid' : 'partial';
        $sale->update(['paid_amount' => $newPaid, 'status' => $newStatus]);

        // Update client status if all debts are cleared
        if ($sale->client_id && $newStatus === 'paid') {
            $pendingDebt = Sale::where('client_id', $sale->client_id)
                ->whereIn('status', ['partial', 'pending'])
                ->where('id', '!=', $sale->id)
                ->exists();
            if (!$pendingDebt) {
                $sale->client()->update(['status' => 'good']);
            }
        }

        return redirect()->back()->with('success', 'Paiement enregistré.');
    }
}
