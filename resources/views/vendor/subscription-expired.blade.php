<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Abonnement Expiré</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="text-center bg-white rounded-2xl shadow-xl p-12 max-w-md">
        <div class="text-6xl mb-4">🔒</div>
        <h1 class="text-2xl font-bold text-gray-800 mb-2">Abonnement Expiré</h1>
        <p class="text-gray-500 mb-6">Votre abonnement a expiré ou a été suspendu. Veuillez contacter l'administrateur pour renouveler votre accès.</p>
        <form method="POST" action="{{ route('logout') }}" class="inline">
            @csrf
            <button type="submit" class="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700">
                Se déconnecter
            </button>
        </form>
    </div>
</body>
</html>
