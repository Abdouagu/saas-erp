<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: Arial, sans-serif;
            background: #fff;
            width: 252pt;
        }
        .ticket {
            width: 252pt;
            padding: 10pt 10pt 8pt 10pt;
            background: #fff;
        }

        /* ── Top row: product name (left) + logo (right) ── */
        .top-row {
            width: 100%;
            overflow: hidden;
            margin-bottom: 7pt;
        }
        .product-name {
            float: left;
            font-size: 11pt;
            font-weight: bold;
            color: #111827;
            max-width: 155pt;
            line-height: 1.2;
        }
        .logo-area {
            float: right;
            text-align: right;
        }
        .logo-area img {
            max-width: 65pt;
            max-height: 38pt;
            object-fit: contain;
        }
        .logo-initial {
            display: inline-block;
            font-size: 18pt;
            font-weight: bold;
            color: #111827;
            font-style: italic;
            font-family: Georgia, serif;
        }

        /* ── Product specs ── */
        .details {
            margin-bottom: 8pt;
            clear: both;
        }
        .detail-row {
            font-size: 8.5pt;
            color: #1f2937;
            line-height: 1.65;
        }

        /* ── Barcode ── */
        .barcode-section {
            text-align: center;
            border-top: 0.5pt solid #d1d5db;
            padding-top: 6pt;
        }
        .barcode-section img {
            width: 232pt;
            height: 52pt;
            image-rendering: pixelated;
        }
        .barcode-code {
            font-family: 'Courier New', monospace;
            font-size: 7pt;
            color: #374151;
            letter-spacing: 1.5pt;
            margin-top: 2pt;
        }
    </style>
</head>
<body>
<div class="ticket">

    {{-- Top row --}}
    <div class="top-row">
        <div class="product-name">{{ $product->name }}</div>
        <div class="logo-area">
            @if($logoBase64)
                <img src="{{ $logoBase64 }}" alt="Logo">
            @else
                <span class="logo-initial">{{ $vendor->shop_name ?: $vendor->name }}</span>
            @endif
        </div>
    </div>

    {{-- Product specs --}}
    <div class="details">
        @if($product->storage)
            <div class="detail-row">Capacity : {{ $product->storage }}</div>
        @endif
        @if($product->battery_percentage !== null)
            <div class="detail-row">Battery : {{ $product->battery_percentage }}%</div>
        @endif
        @if($product->color)
            <div class="detail-row">Color : {{ $product->color }}</div>
        @endif
        @if($product->serial_number)
            <div class="detail-row">IMEI : {{ $product->serial_number }}</div>
        @endif
    </div>

    {{-- Barcode --}}
    <div class="barcode-section">
        <img src="{{ $barcodeBase64 }}" alt="Barcode">
        <div class="barcode-code">{{ $code }}</div>
    </div>

</div>
</body>
</html>
