<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Product;
use App\Models\Sale;
use App\Models\SaleItem;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class StatsController extends Controller
{
    public function index()
    {
        $vendor = auth()->user();

        // Revenue & profit
        $totalRevenue = Sale::sum('final_amount');
        $totalProfit = (float) Product::withoutGlobalScopes()
            ->where('vendor_id', $vendor->id)
            ->where('status', 'sold')
            ->selectRaw('SUM(selling_price - purchase_price) as profit')
            ->value('profit') ?? 0;

        // This month
        $thisMonthRevenue = Sale::whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->sum('final_amount');

        // Unpaid / Partial sales
        $pendingSales = Sale::whereIn('status', ['pending', 'partial'])->count();
        $totalDebt = Sale::whereIn('status', ['pending', 'partial'])
            ->selectRaw('SUM(final_amount - paid_amount) as debt')
            ->value('debt') ?? 0;

        // Top products sold
        $topProducts = SaleItem::select('product_id', DB::raw('count(*) as total_sold'))
            ->whereHas('sale', fn($q) => $q->where('vendor_id', $vendor->id))
            ->groupBy('product_id')
            ->orderByDesc('total_sold')
            ->take(5)
            ->with('product')
            ->get();

        // Clients with most purchases
        $topClients = Client::withCount('sales')->orderByDesc('sales_count')->take(5)->get();

        // Monthly revenue (last 12 months)
        $monthlyRevenue = [];
        for ($i = 11; $i >= 0; $i--) {
            $month = now()->subMonths($i);
            $revenue = Sale::whereYear('created_at', $month->year)
                ->whereMonth('created_at', $month->month)
                ->sum('final_amount');
            $monthlyRevenue[] = [
                'month' => $month->format('M Y'),
                'revenue' => (float) $revenue,
            ];
        }

        // Category breakdown
        $phonesSold = Product::withoutGlobalScopes()
            ->where('vendor_id', $vendor->id)
            ->where('category', 'phone')
            ->where('status', 'sold')
            ->count();
        $pcsSold = Product::withoutGlobalScopes()
            ->where('vendor_id', $vendor->id)
            ->where('category', 'pc')
            ->where('status', 'sold')
            ->count();

        return Inertia::render('Vendor/Stats/Index', [
            'totalRevenue'     => (float) $totalRevenue,
            'totalProfit'      => (float) $totalProfit,
            'thisMonthRevenue' => (float) $thisMonthRevenue,
            'pendingSales'     => $pendingSales,
            'totalDebt'        => (float) $totalDebt,
            'topProducts'      => $topProducts,
            'topClients'       => $topClients,
            'monthlyRevenue'   => $monthlyRevenue,
            'phonesSold'       => $phonesSold,
            'pcsSold'          => $pcsSold,
        ]);
    }
}
