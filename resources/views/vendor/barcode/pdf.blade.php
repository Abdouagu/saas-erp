<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: Arial, sans-serif;
            background: #fff;
            width: 204pt;
        }
        .ticket {
            width: 204pt;
            padding: 16pt;
            text-align: center;
        }

        /* Logo */
        .logo-wrap {
            margin-bottom: 14pt;
        }
        .logo-wrap img {
            max-width: 80pt;
            max-height: 50pt;
            object-fit: contain;
        }
        .logo-initial {
            display: inline-block;
            width: 50pt;
            height: 50pt;
            background: #f3f4f6;
            border-radius: 8pt;
            font-size: 22pt;
            font-weight: bold;
            color: #465fff;
            line-height: 50pt;
            text-align: center;
        }

        /* Barcode */
        .barcode-wrap {
            margin-bottom: 6pt;
        }
        .barcode-wrap img {
            width: 172pt;
            height: 70pt;
            image-rendering: pixelated;
        }
        .barcode-code {
            font-family: 'Courier New', monospace;
            font-size: 7pt;
            color: #374151;
            letter-spacing: 2pt;
            margin-top: 3pt;
        }

        /* Divider */
        .divider {
            border: none;
            border-top: 1pt solid #e5e7eb;
            margin: 12pt 0;
        }

        /* Price */
        .price {
            font-size: 26pt;
            font-weight: bold;
            color: #111827;
            letter-spacing: -0.5pt;
        }
        .price-currency {
            font-size: 14pt;
            color: #6b7280;
            margin-left: 2pt;
        }
    </style>
</head>
<body>
<div class="ticket">

    {{-- Logo --}}
    <div class="logo-wrap">
        @if($logoBase64)
            <img src="{{ $logoBase64 }}" alt="Logo">
        @else
            <span class="logo-initial">{{ strtoupper(substr($vendor->shop_name ?: $vendor->name, 0, 1)) }}</span>
        @endif
    </div>

    {{-- Barcode (vraies lignes verticales) --}}
    <div class="barcode-wrap">
        <img src="{{ $barcodeBase64 }}" alt="Barcode">
        <div class="barcode-code">{{ $code }}</div>
    </div>

    <hr class="divider">

    {{-- Prix --}}
    <div>
        <span class="price">{{ number_format($product->selling_price, 0, ',', ' ') }}</span>
        <span class="price-currency">DH</span>
    </div>

</div>
</body>
</html>
