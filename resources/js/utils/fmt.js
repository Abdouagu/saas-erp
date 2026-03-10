export const fmt = (n, decimals = 0) =>
    new Intl.NumberFormat('fr-FR', { maximumFractionDigits: decimals }).format(n ?? 0) + ' DH'
