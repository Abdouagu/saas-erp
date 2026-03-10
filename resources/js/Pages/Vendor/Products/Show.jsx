import { fmt } from '../../../utils/fmt'
import { Head, Link, router } from '@inertiajs/react'
import { ArrowLeft, Pencil, Trash2, FileText, Package } from 'lucide-react'
import AppLayout from '../../../Layouts/AppLayout'
import Badge from '../../../Components/Badge'

const conditionMap   = { new: 'success', used: 'warning' }
const statusMap      = { available: 'info', sold: 'danger' }
const conditionLabel = { new: 'Neuf', used: 'Occasion' }
const statusLabel    = { available: 'Disponible', sold: 'Vendu' }

const Row = ({ label, value }) => (
    <div className="flex justify-between items-center py-2.5 border-b border-gray-50 last:border-b-0">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">{label}</span>
        {value != null && value !== ''
            ? <span className="text-sm text-gray-900 font-medium text-right">{value}</span>
            : <span className="text-sm text-gray-300">—</span>
        }
    </div>
)

export default function ProductShow({ product }) {
    const profit         = parseFloat(product.selling_price) - parseFloat(product.purchase_price)
    const profitPositive = profit >= 0

    const handleDelete = () => {
        if (confirm('Supprimer ce produit définitivement ?')) {
            router.delete(`/products/${product.id}`)
        }
    }

    return (
        <>
            <Head title={product.name} />
            <AppLayout title={product.name}>
                <div className="max-w-5xl flex flex-col gap-5">

                    {/* Header actions */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-1.5 text-sm text-gray-400 no-underline hover:text-brand-500 transition-colors mr-2"
                        >
                            <ArrowLeft size={15} />
                            Retour
                        </Link>
                        <Link
                            href={`/products/${product.id}/edit`}
                            className="inline-flex items-center gap-1.5 bg-brand-500 text-white px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-brand-600 transition-colors no-underline"
                        >
                            <Pencil size={13} />
                            Modifier
                        </Link>
                        <a
                            href={`/products/${product.id}/barcode/pdf`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors no-underline"
                        >
                            <FileText size={13} />
                            PDF Barcode
                        </a>
                        <button
                            onClick={handleDelete}
                            className="inline-flex items-center gap-1.5 bg-white border border-error-200 text-error-500 px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-error-50 transition-colors cursor-pointer"
                        >
                            <Trash2 size={13} />
                            Supprimer
                        </button>
                    </div>

                    {/* Main 2-column layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                        {/* Left — Photo + title */}
                        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-theme-xs">
                            <div className="relative w-full h-80 bg-gray-100 overflow-hidden">
                                {product.photo_url ? (
                                    <img src={product.photo_url} alt={product.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                                        <Package size={80} className="text-gray-300 opacity-50" />
                                    </div>
                                )}
                            </div>
                            <div className="px-5 py-4">
                                {product.brand && (
                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                                        {product.brand}
                                    </p>
                                )}
                                <h2 className="text-xl font-bold text-gray-900 mb-3">{product.name}</h2>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <Badge variant={conditionMap[product.condition]}>{conditionLabel[product.condition]}</Badge>
                                    <Badge variant={statusMap[product.status]}>{statusLabel[product.status]}</Badge>
                                </div>
                                {product.internal_code && (
                                    <p className="font-mono text-xs text-gray-400 mt-3 mb-0">{product.internal_code}</p>
                                )}
                            </div>
                        </div>

                        {/* Right — Info + pricing */}
                        <div className="flex flex-col gap-4">
                            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-theme-xs">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3.5 pb-2.5 border-b border-gray-100">
                                    Informations
                                </h3>
                                <Row label="Catégorie" value={<span className="capitalize">{product.category === 'phone' ? 'Téléphone' : 'PC / Laptop'}</span>} />
                                {product.brand && <Row label="Marque" value={product.brand} />}
                                <Row label="Modèle"   value={product.name} />
                                <Row label="N° Série" value={product.serial_number} />
                                <Row label="Couleur"  value={product.color} />
                                <Row label="Stockage" value={product.storage} />
                                {product.category === 'phone' && (
                                    <Row label="Batterie" value={product.battery_percentage ? `${product.battery_percentage}%` : null} />
                                )}
                            </div>

                            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-theme-xs">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3.5 pb-2.5 border-b border-gray-100">
                                    Tarification
                                </h3>
                                <div className="flex justify-between items-center py-2.5 border-b border-gray-50">
                                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">Prix d'achat</span>
                                    <span className="text-base font-semibold text-gray-500 tabular-nums">{fmt(product.purchase_price)}</span>
                                </div>
                                <div className="flex justify-between items-center py-2.5 border-b border-gray-50">
                                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">Prix de vente</span>
                                    <span className="text-lg font-bold text-gray-900 tabular-nums">{fmt(product.selling_price)}</span>
                                </div>
                                <div className="flex justify-between items-center py-2.5">
                                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">Profit</span>
                                    <span className={`text-base font-bold tabular-nums ${profitPositive ? 'text-success-600' : 'text-error-500'}`}>
                                        {profitPositive ? '+' : ''}{fmt(profit)}
                                    </span>
                                </div>
                                {product.barcode && (
                                    <div className="mt-3.5 px-3.5 py-3 bg-gray-50 rounded-xl border border-gray-200">
                                        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Code-barres</p>
                                        <p className="font-mono text-sm text-gray-700 m-0">{product.barcode}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Stock movements */}
                    {product.stock_movements?.length > 0 && (
                        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-theme-xs">
                            <div className="px-5 py-4 border-b border-gray-100">
                                <h3 className="text-sm font-semibold text-gray-900 m-0">Mouvements de stock</h3>
                            </div>
                            <div>
                                {product.stock_movements.map((m) => (
                                    <div key={m.id} className="flex items-center justify-between px-5 py-3 border-b border-gray-100 last:border-b-0">
                                        <div>
                                            <p className="text-sm text-gray-900 capitalize m-0">{m.type}</p>
                                            {m.notes && <p className="text-xs text-gray-400 mt-0.5 mb-0">{m.notes}</p>}
                                        </div>
                                        <span className={`text-sm font-semibold tabular-nums ${m.quantity > 0 ? 'text-success-600' : 'text-error-500'}`}>
                                            {m.quantity > 0 ? `+${m.quantity}` : m.quantity}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </AppLayout>
        </>
    )
}
