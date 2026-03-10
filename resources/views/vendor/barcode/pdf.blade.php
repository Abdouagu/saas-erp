<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Ticket - {{ $product->internal_code }}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; background: #fff; width: 226pt; }

        .ticket { width: 226pt; padding: 12pt 14pt; border: 1pt solid #e5e7eb; border-radius: 6pt; }

        .header { display: flex; align-items: center; gap: 8pt; padding-bottom: 10pt; border-bottom: 1pt solid #f3f4f6; margin-bottom: 10pt; }

        .logo-box { width: 36pt; height: 36pt; background: #f3f4f6; border-radius: 6pt; display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0; }
        .logo-box img { width: 100%; height: 100%; object-fit: contain; }
        .logo-initial { font-size: 16pt; font-weight: bold; color: #465fff; }

        .shop-name { font-size: 9pt; font-weight: bold; color: #111827; }
        .shop-contact { font-size: 7pt; color: #9ca3af; margin-top: 1pt; }

        .product-name { font-size: 10pt; font-weight: bold; color: #111827; margin-bottom: 3pt; }
        .product-meta { font-size: 7.5pt; color: #6b7280; margin-bottom: 10pt; line-height: 1.4; }

        .badge { display: inline-block; padding: 1pt 5pt; border-radius: 3pt; font-size: 6.5pt; font-weight: bold; text-transform: uppercase; letter-spacing: 0.3pt; margin-right: 3pt; }
        .badge-new  { background: #d1fae5; color: #065f46; }
        .badge-used { background: #fef3c7; color: #92400e; }

        .barcode-section { text-align: center; background: #fff; padding: 8pt 4pt 6pt; border: 1pt solid #f3f4f6; border-radius: 4pt; margin-bottom: 8pt; }
        .barcode-section svg { display: block; margin: 0 auto; }
        .barcode-number { font-family: 'Courier New', monospace; font-size: 7.5pt; color: #374151; letter-spacing: 1.5pt; margin-top: 4pt; }
        .internal-code { font-size: 6.5pt; color: #9ca3af; margin-top: 1pt; }

        .price-row { display: flex; align-items: center; justify-content: space-between; padding-top: 8pt; border-top: 1pt solid #f3f4f6; }
        .price-label { font-size: 7pt; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5pt; }
        .price-value { font-size: 16pt; font-weight: bold; color: #111827; }
        .price-currency { font-size: 9pt; color: #6b7280; margin-left: 2pt; }

        .footer { text-align: center; margin-top: 8pt; font-size: 6pt; color: #d1d5db; }
    </style>
</head>
<body>
<div class="ticket">

    {{-- Header: Logo + Boutique --}}
    <div class="header">
        <div class="logo-box">
            @if($logoBase64)
                <img src="{{ $logoBase64 }}" alt="Logo">
            @else
                <span class="logo-initial">{{ strtoupper(substr($vendor->shop_name ?: $vendor->name, 0, 1)) }}</span>
            @endif
        </div>
        <div>
            <div class="shop-name">{{ $vendor->shop_name ?: $vendor->name }}</div>
            @if($vendor->phone)<div class="shop-contact">{{ $vendor->phone }}</div>@endif
            @if($vendor->address)<div class="shop-contact">{{ $vendor->address }}</div>@endif
        </div>
    </div>

    {{-- Produit --}}
    <div class="product-name">{{ $product->name }}</div>
    <div class="product-meta">
        <span class="badge {{ $product->condition === 'new' ? 'badge-new' : 'badge-used' }}">{{ $product->condition === 'new' ? 'Neuf' : 'Occasion' }}</span>
        {{ $product->category === 'phone' ? 'Téléphone' : 'PC' }}
        @if($product->storage) · {{ $product->storage }} @endif
        @if($product->color) · {{ $product->color }} @endif
        @if($product->battery_percentage !== null) · Batterie {{ $product->battery_percentage }}% @endif
    </div>

    {{-- Code-barres --}}
    <div class="barcode-section">
        {!! $barcodeSvg !!}
        <div class="barcode-number">{{ $product->barcode ?: $product->internal_code }}</div>
        @if($product->barcode && $product->internal_code)
            <div class="internal-code">Réf: {{ $product->internal_code }}</div>
        @endif
    </div>

    {{-- Prix --}}
    <div class="price-row">
        <span class="price-label">Prix de vente</span>
        <span>
            <span class="price-value">{{ number_format($product->selling_price, 0, ',', ' ') }}</span>
            <span class="price-currency">DH</span>
        </span>
    </div>

    <div class="footer">Ticket généré automatiquement</div>
</div>
</body>
</html>
