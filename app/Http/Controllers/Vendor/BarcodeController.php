<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Barryvdh\DomPDF\Facade\Pdf;
use Inertia\Inertia;
use Picqer\Barcode\BarcodeGeneratorSVG;

class BarcodeController extends Controller
{
    public function downloadPDF(Product $product)
    {
        $generator = new BarcodeGeneratorSVG();
        $barcodeSvg = $generator->getBarcode($product->barcode, $generator::TYPE_CODE_128);

        $pdf = Pdf::loadView('vendor.barcode.pdf', compact('product', 'barcodeSvg'));
        return $pdf->download("barcode-{$product->internal_code}.pdf");
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
