<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Barryvdh\DomPDF\Facade\Pdf;
use Inertia\Inertia;
use Picqer\Barcode\BarcodeGeneratorPNG;

class BarcodeController extends Controller
{
    public function downloadPDF(Product $product)
    {
        $code = $product->barcode ?: $product->internal_code;

        // Generate barcode as PNG then encode to base64
        $generator = new BarcodeGeneratorPNG();
        $barcodePng = $generator->getBarcode($code, $generator::TYPE_CODE_128, 3, 80);
        $barcodeBase64 = 'data:image/png;base64,' . base64_encode($barcodePng);

        // Vendor logo as base64
        $vendor = auth()->user();
        $logoBase64 = null;
        if ($vendor->logo && file_exists(storage_path("app/public/{$vendor->logo}"))) {
            $logoData = base64_encode(file_get_contents(storage_path("app/public/{$vendor->logo}")));
            $logoMime = mime_content_type(storage_path("app/public/{$vendor->logo}"));
            $logoBase64 = "data:{$logoMime};base64,{$logoData}";
        }

        $pdf = Pdf::loadView('vendor.barcode.pdf', compact('product', 'barcodeBase64', 'code', 'vendor', 'logoBase64'));
        $pdf->setPaper([0, 0, 252, 165], 'portrait'); // ~8.9cm x 5.8cm label
        return $pdf->download("ticket-{$product->internal_code}.pdf");
    }

    public function scanPage()
    {
        return Inertia::render('Vendor/Barcode/Scan');
    }

    public function showProduct(string $code)
    {
        $product = Product::withoutGlobalScopes()
            ->where('barcode', $code)
            ->orWhere('internal_code', $code)
            ->firstOrFail();

        return view('vendor.barcode.product', compact('product'));
    }
}
