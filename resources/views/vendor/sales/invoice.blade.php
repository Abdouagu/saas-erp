<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Facture #{{ $sale->id }}</title>
    <style>
        body { font-family: Arial, sans-serif; font-size: 13px; color: #333; margin: 30px; }
        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; }
        .company { font-size: 22px; font-weight: bold; color: #4f46e5; }
        .invoice-title { font-size: 28px; font-weight: bold; color: #111; text-align: right; }
        .invoice-meta { text-align: right; color: #666; margin-top: 5px; }
        .divider { border: none; border-top: 2px solid #e5e7eb; margin: 20px 0; }
        .client-box { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px; margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th { background: #4f46e5; color: white; padding: 10px; text-align: left; }
        td { padding: 10px; border-bottom: 1px solid #f3f4f6; }
        tr:nth-child(even) td { background: #f9fafb; }
        .totals { width: 300px; margin-left: auto; }
        .totals tr td { border-bottom: none; }
        .totals .grand-total { font-weight: bold; font-size: 16px; border-top: 2px solid #4f46e5; color: #4f46e5; }
        .status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }
        .status-paid { background: #d1fae5; color: #065f46; }
        .status-partial { background: #fef3c7; color: #92400e; }
        .status-pending { background: #fee2e2; color: #991b1b; }
        .footer { text-align: center; color: #999; font-size: 11px; margin-top: 40px; }
    </style>
</head>
<body>
    <div class="header">
        <div>
            <div class="company">{{ $sale->vendor->name }}</div>
            <div style="color:#666; margin-top:5px;">{{ $sale->vendor->phone }}</div>
            <div style="color:#666;">{{ $sale->vendor->address }}</div>
        </div>
        <div>
            <div class="invoice-title">FACTURE</div>
            <div class="invoice-meta">N° {{ str_pad($sale->id, 6, '0', STR_PAD_LEFT) }}</div>
            <div class="invoice-meta">{{ $sale->created_at->format('d/m/Y') }}</div>
        </div>
    </div>

    <hr class="divider">

    @if($sale->client)
    <div class="client-box">
        <strong>Facturé à :</strong><br>
        {{ $sale->client->name }}<br>
        @if($sale->client->phone) Tél: {{ $sale->client->phone }}<br> @endif
        @if($sale->client->email) Email: {{ $sale->client->email }}<br> @endif
        @if($sale->client->address) Adresse: {{ $sale->client->address }} @endif
    </div>
    @endif

    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Produit</th>
                <th>Code</th>
                <th style="text-align:right;">Prix</th>
            </tr>
        </thead>
        <tbody>
            @foreach($sale->items as $idx => $item)
            <tr>
                <td>{{ $idx + 1 }}</td>
                <td>{{ $item->product->name }}
                    @if($item->product->color) <br><small style="color:#888;">{{ $item->product->color }} · {{ $item->product->storage }}</small> @endif
                </td>
                <td><small>{{ $item->product->internal_code }}</small></td>
                <td style="text-align:right;">{{ number_format($item->price, 0, ',', ' ') }} DH</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <table class="totals">
        <tr>
            <td>Sous-total</td>
            <td style="text-align:right;">{{ number_format($sale->total_amount, 0, ',', ' ') }} DH</td>
        </tr>
        @if($sale->discount_percentage > 0)
        <tr>
            <td>Remise ({{ $sale->discount_percentage }}%)</td>
            <td style="text-align:right; color:#ef4444;">- {{ number_format($sale->total_amount * $sale->discount_percentage / 100, 0, ',', ' ') }} DH</td>
        </tr>
        @endif
        <tr class="grand-total">
            <td>Total</td>
            <td style="text-align:right;">{{ number_format($sale->final_amount, 0, ',', ' ') }} DH</td>
        </tr>
        <tr>
            <td>Payé</td>
            <td style="text-align:right; color:#059669;">{{ number_format($sale->paid_amount, 0, ',', ' ') }} DH</td>
        </tr>
        @if($sale->remainingAmount() > 0)
        <tr>
            <td>Reste</td>
            <td style="text-align:right; color:#ef4444;">{{ number_format($sale->remainingAmount(), 0, ',', ' ') }} DH</td>
        </tr>
        @endif
    </table>

    <div style="margin-top:20px;">
        <span class="status {{ 'status-' . $sale->status }}">
            {{ $sale->status === 'paid' ? 'PAYÉ' : ($sale->status === 'partial' ? 'PAIEMENT PARTIEL' : 'EN ATTENTE') }}
        </span>
        <span style="margin-left:15px; color:#666;">Mode: {{ ucfirst($sale->payment_method) }}</span>
    </div>

    @if($sale->notes)
    <div style="margin-top:20px; padding:10px; background:#f9fafb; border-radius:6px; color:#666; font-size:12px;">
        <strong>Notes:</strong> {{ $sale->notes }}
    </div>
    @endif

    <div class="footer">
        Merci pour votre confiance • ERP SaaS - Gestion Téléphones & PC
    </div>
</body>
</html>
