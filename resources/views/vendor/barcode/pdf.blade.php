<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Barcode - {{ $product->internal_code }}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .container { text-align: center; padding: 20px; border: 1px solid #ddd; border-radius: 8px; max-width: 400px; margin: 0 auto; }
        .product-name { font-size: 18px; font-weight: bold; margin-bottom: 5px; }
        .product-info { font-size: 12px; color: #666; margin-bottom: 15px; }
        .barcode-svg { margin: 10px auto; }
        .code { font-family: monospace; font-size: 14px; margin-top: 8px; }
        .price { font-size: 20px; font-weight: bold; color: #333; margin-top: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="product-name">{{ $product->name }}</div>
        <div class="product-info">
            {{ $product->category === 'phone' ? 'Téléphone' : 'PC' }} ·
            {{ $product->condition === 'new' ? 'Neuf' : 'Occasion' }}
            @if($product->storage) · {{ $product->storage }} @endif
            @if($product->color) · {{ $product->color }} @endif
        </div>
        <div class="barcode-svg">{!! $barcodeSvg !!}</div>
        <div class="code">{{ $product->barcode }}</div>
        <div class="code" style="font-size:12px; color:#888;">{{ $product->internal_code }}</div>
        <div class="price">{{ number_format($product->selling_price, 0, ',', ' ') }} DZD</div>
    </div>
</body>
</html>
