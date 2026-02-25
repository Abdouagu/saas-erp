<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Product;
use App\Models\Sale;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke()
    {
        $vendor = auth()->user();
        $totalProducts = Product::count();
        $availableProducts = Product::where('status', 'available')->count();
        $soldProducts = Product::where('status', 'sold')->count();
        $totalClients = Client::count();
        $totalSales = Sale::count();
        $totalRevenue = Sale::sum('final_amount');
        $totalProfit = Product::withoutGlobalScopes()->where('vendor_id', $vendor->id)
            ->where('status', 'sold')
            ->selectRaw('SUM(selling_price - purchase_price) as profit')
            ->value('profit') ?? 0;

        $recentSales = Sale::with('client')->latest()->take(5)->get();
        $lowStockProducts = Product::where('status', 'available')->latest()->take(5)->get();

        // Monthly revenue for chart (last 6 months)
        $monthlyRevenue = [];
        for ($i = 5; $i >= 0; $i--) {
            $month = now()->subMonths($i);
            $revenue = Sale::whereYear('created_at', $month->year)
                ->whereMonth('created_at', $month->month)
                ->sum('final_amount');
            $monthlyRevenue[] = [
                'month' => $month->format('M Y'),
                'revenue' => (float) $revenue,
            ];
        }

        return Inertia::render('Vendor/Dashboard', [
            'totalProducts'     => $totalProducts,
            'availableProducts' => $availableProducts,
            'soldProducts'      => $soldProducts,
            'totalClients'      => $totalClients,
            'totalSales'        => $totalSales,
            'totalRevenue'      => (float) $totalRevenue,
            'totalProfit'       => (float) $totalProfit,
            'recentSales'       => $recentSales,
            'lowStockProducts'  => $lowStockProducts,
            'monthlyRevenue'    => $monthlyRevenue,
        ]);
    }
}
