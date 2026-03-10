<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: Arial, Helvetica, sans-serif;
            width: 170pt;
            background: #fff;
            color: #111;
        }

        .ticket {
            width: 170pt;
            padding: 5pt 5pt 4pt 5pt;
            background: #fff;
        }

        /* ── Top section: 2-column table ── */
        .top-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 4pt;
        }
        .col-info {
            width: 103pt;
            vertical-align: top;
            padding-right: 4pt;
        }
        .col-side {
            width: 52pt;
            vertical-align: top;
            text-align: center;
        }

        /* Product name */
        .product-name {
            font-size: 7.5pt;
            font-weight: bold;
            color: #000;
            line-height: 1.3;
            margin-bottom: 3pt;
        }

        /* Spec rows */
        .spec {
            font-size: 5.5pt;
            color: #222;
            line-height: 1.7;
        }

        /* Logo */
        .logo-wrap {
            margin-bottom: 3pt;
        }
        .logo-wrap img {
            max-width: 50pt;
            max-height: 16pt;
            object-fit: contain;
        }
        .logo-text {
            font-size: 8pt;
            font-weight: bold;
            font-style: italic;
            font-family: Georgia, serif;
            color: #111;
        }

        /* QR code */
        .qr-wrap img {
            width: 46pt;
            height: 46pt;
            image-rendering: pixelated;
        }

        /* Divider */
        .divider {
            border: none;
            border-top: 0.5pt solid #bbb;
            margin: 3pt 0;
        }

        /* Barcode */
        .barcode-wrap {
            text-align: center;
        }
        .barcode-wrap img {
            width: 158pt;
            height: 22pt;
            image-rendering: pixelated;
        }
        .barcode-num {
            font-family: 'Courier New', monospace;
            font-size: 5pt;
            color: #333;
            letter-spacing: 1pt;
            margin-top: 1.5pt;
        }
    </style>
</head>
<body>
<div class="ticket">

    {{-- ── Top: info (left) + logo/QR (right) ── --}}
    <table class="top-table">
        <tr>
            <td class="col-info">
                <div class="product-name">{{ $product->name }}</div>
                @if($product->storage)
                    <div class="spec">Capacity : {{ $product->storage }}</div>
                @endif
                @if($product->battery_percentage !== null)
                    <div class="spec">Battery : {{ $product->battery_percentage }}%</div>
                @endif
                @if($product->color)
                    <div class="spec">Color : {{ $product->color }}</div>
                @endif
                @if($product->serial_number)
                    <div class="spec">IMEI : {{ $product->serial_number }}</div>
                @endif
            </td>
            <td class="col-side">
                {{-- Logo --}}
                <div class="logo-wrap">
                    @if($logoBase64)
                        <img src="{{ $logoBase64 }}" alt="Logo">
                    @else
                        <span class="logo-text">{{ $vendor->shop_name ?: $vendor->name }}</span>
                    @endif
                </div>
                {{-- QR Code --}}
                <div class="qr-wrap">
                    <img src="{{ $qrBase64 }}" alt="QR">
                </div>
            </td>
        </tr>
    </table>

    {{-- ── Divider ── --}}
    <hr class="divider">

    {{-- ── Barcode + IMEI number ── --}}
    <div class="barcode-wrap">
        <img src="{{ $barcodeBase64 }}" alt="Barcode">
        <div class="barcode-num">{{ $code }}</div>
    </div>

</div>
</body>
</html>
