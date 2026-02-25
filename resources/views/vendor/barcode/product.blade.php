<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $product->name }} - Fiche Produit</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 min-h-screen flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div class="text-center mb-6">
            <p class="text-sm text-indigo-500 font-medium">ERP SaaS - Fiche Produit</p>
            <h1 class="text-2xl font-bold text-gray-800 mt-1">{{ $product->name }}</h1>
        </div>

        @if($product->photo)
            <img src="{{ asset('storage/' . $product->photo) }}" class="w-48 h-48 rounded-xl object-cover mx-auto mb-6">
        @endif

        <div class="space-y-3">
            <div class="flex justify-between py-2 border-b">
                <span class="text-gray-500">Catégorie</span>
                <span class="font-medium">{{ $product->category === 'phone' ? 'Téléphone' : 'PC' }}</span>
            </div>
            <div class="flex justify-between py-2 border-b">
                <span class="text-gray-500">État</span>
                <span class="font-medium">{{ $product->condition === 'new' ? 'Neuf' : 'Occasion' }}</span>
            </div>
            @if($product->color)
            <div class="flex justify-between py-2 border-b">
                <span class="text-gray-500">Couleur</span>
                <span class="font-medium">{{ $product->color }}</span>
            </div>
            @endif
            @if($product->storage)
            <div class="flex justify-between py-2 border-b">
                <span class="text-gray-500">Stockage</span>
                <span class="font-medium">{{ $product->storage }}</span>
            </div>
            @endif
            @if($product->battery_percentage !== null)
            <div class="flex justify-between py-2 border-b">
                <span class="text-gray-500">Batterie</span>
                <span class="font-medium">{{ $product->battery_percentage }}%</span>
            </div>
            @endif
            <div class="flex justify-between py-2 border-b">
                <span class="text-gray-500">Statut</span>
                <span class="font-medium {{ $product->status === 'available' ? 'text-green-600' : 'text-gray-500' }}">
                    {{ $product->status === 'available' ? 'Disponible' : 'Vendu' }}
                </span>
            </div>
            <div class="flex justify-between py-2 border-b">
                <span class="text-gray-500">Prix de vente</span>
                <span class="font-bold text-indigo-600 text-lg">{{ number_format($product->selling_price, 0, ',', ' ') }} DZD</span>
            </div>
            <div class="flex justify-between py-2">
                <span class="text-gray-500">Code interne</span>
                <span class="font-mono text-sm">{{ $product->internal_code }}</span>
            </div>
        </div>
    </div>
</body>
</html>
