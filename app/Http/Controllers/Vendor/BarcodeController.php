<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Barryvdh\DomPDF\Facade\Pdf;
use chillerlan\QRCode\QRCode;
use chillerlan\QRCode\QROptions;
use chillerlan\QRCode\Output\QRGdImagePNG;
use Inertia\Inertia;
use Picqer\Barcode\BarcodeGeneratorPNG;

class BarcodeController extends Controller
{
    public function downloadPDF(Product $product)
    {
        $code = $product->barcode ?: $product->internal_code;
        $imei = $product->serial_number ?: $code;

        // CODE128 barcode as base64 PNG
        $generator  = new BarcodeGeneratorPNG();
        $barcodePng = $generator->getBarcode($code, $generator::TYPE_CODE_128, 2, 60);
        $barcodeBase64 = 'data:image/png;base64,' . base64_encode($barcodePng);

        // QR code (IMEI / serial) as base64 PNG
        $qrOptions = new QROptions;
        $qrOptions->outputType     = QRGdImagePNG::class;
        $qrOptions->scale          = 4;
        $qrOptions->imageTransparent = false;
        $qrBase64 = (new QRCode($qrOptions))->render($imei);

        // Vendor logo as base64
        $vendor    = auth()->user();
        $logoBase64 = null;
        if ($vendor->logo && file_exists(storage_path("app/public/{$vendor->logo}"))) {
            $logoData   = base64_encode(file_get_contents(storage_path("app/public/{$vendor->logo}")));
            $logoMime   = mime_content_type(storage_path("app/public/{$vendor->logo}"));
            $logoBase64 = "data:{$logoMime};base64,{$logoData}";
        }

        $pdf = Pdf::loadView('vendor.barcode.pdf', compact(
            'product', 'barcodeBase64', 'qrBase64', 'code', 'imei', 'vendor', 'logoBase64'
        ));
        // 60mm × 40mm in points (1mm = 2.8346pt)
        $pdf->setPaper([0, 0, 170, 113], 'portrait');

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
