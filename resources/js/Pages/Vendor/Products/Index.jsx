import { Head, Link, router } from '@inertiajs/react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Package } from 'lucide-react'
import AppLayout from '../../../Layouts/AppLayout'
import Badge from '../../../Components/Badge'
import Pagination from '../../../Components/Pagination'

const fmt = (n) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n)
const conditionMap   = { new: 'success', used: 'warning' }
const statusMap      = { available: 'info', sold: 'danger' }
const conditionLabel = { new: 'Neuf', used: 'Occasion' }
const statusLabel    = { available: 'Disponible', sold: 'Vendu' }

const inputCls = 'px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-300 bg-white text-gray-900 placeholder:text-gray-400'

export default function ProductsIndex({ products, filters }) {
    const [search, setSearch]     = useState(filters?.search ?? '')
    const [category, setCategory] = useState(filters?.category ?? '')
    const [status, setStatus]     = useState(filters?.status ?? '')

    const applyFilters = (e) => {
        e.preventDefault()
        router.get('/products', { search, category, status }, { preserveState: true, replace: true })
    }

    const destroy = (id) => {
        if (confirm('Supprimer ce produit définitivement ?')) router.delete(`/products/${id}`)
    }

    const total = products.total ?? products.data.length

    return (
        <>
            <Head title="Produits" />
            <AppLayout title="Produits">
                <div className="max-w-screen-xl flex flex-col gap-5">

                    {/* Filter bar */}
                    <div className="flex flex-wrap gap-2 items-center">
                        <form onSubmit={applyFilters} className="flex flex-wrap items-center gap-2 flex-1">
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Rechercher nom, marque, code..."
                                className={`${inputCls} min-w-44 w-auto`}
                            />
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className={`${inputCls} w-auto`}
                            >
                                <option value="">Toutes catégories</option>
                                <option value="phone">Téléphone</option>
                                <option value="pc">PC / Laptop</option>
                            </select>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className={`${inputCls} w-auto`}
                            >
                                <option value="">Tous statuts</option>
                                <option value="available">Disponible</option>
                                <option value="sold">Vendu</option>
                            </select>
                            <button
                                type="submit"
                                className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                            >
                                Filtrer
                            </button>
                        </form>
                        <Link
                            href="/products/create"
                            className="inline-flex items-center gap-2 bg-brand-500 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-brand-600 transition-colors whitespace-nowrap no-underline ml-auto"
                        >
                            <Plus size={15} />
                            Ajouter
                        </Link>
                    </div>

                    {/* Count */}
                    <p className="text-sm text-gray-400 m-0">
                        {total} produit{total > 1 ? 's' : ''}
                    </p>

                    {/* Grid or empty */}
                    {products.data.length === 0 ? (
                        <div className="text-center py-16 px-6 bg-white border border-gray-200 rounded-2xl">
                            <Package size={48} className="mx-auto text-gray-300 mb-3" />
                            <p className="text-sm text-gray-400 m-0">Aucun produit trouvé</p>
                        </div>
                    ) : (
                        <div
                            className="grid gap-4"
                            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}
                        >
                            {products.data.map((p) => (
                                <motion.div
                                    key={p.id}
                                    whileHover={{ y: -2 }}
                                    transition={{ duration: 0.15 }}
                                    className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-theme-xs hover:shadow-theme-md transition-shadow"
                                >
                                    {/* Photo */}
                                    <div className="relative h-40 bg-gray-50 overflow-hidden">
                                        {p.photo_url ? (
                                            <img src={p.photo_url} alt={p.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                                                <Package size={40} className="text-gray-300" />
                                            </div>
                                        )}
                                        <div className="absolute top-2 right-2">
                                            <Badge variant={statusMap[p.status]}>{statusLabel[p.status]}</Badge>
                                        </div>
                                    </div>

                                    {/* Body */}
                                    <div className="p-3.5">
                                        {p.brand && (
                                            <p className="text-xs uppercase tracking-wide text-gray-400 mb-0.5">
                                                {p.brand}
                                            </p>
                                        )}
                                        <p className="text-sm font-semibold text-gray-900 truncate mb-0" title={p.name}>
                                            {p.name}
                                        </p>
                                        <div className="flex flex-wrap gap-1 my-2">
                                            {p.storage && (
                                                <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full">
                                                    {p.storage}
                                                </span>
                                            )}
                                            {p.color && (
                                                <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full">
                                                    {p.color}
                                                </span>
                                            )}
                                            <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full">
                                                {conditionLabel[p.condition]}
                                            </span>
                                        </div>
                                        <p className="text-base font-bold text-gray-900 m-0 tabular-nums">
                                            {fmt(p.selling_price)}
                                        </p>
                                    </div>

                                    {/* Hover actions */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-white/95 border-t border-gray-100 flex justify-around p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Link
                                            href={`/products/${p.id}`}
                                            className="text-xs font-medium text-gray-600 no-underline px-2 py-1 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
                                        >
                                            Voir
                                        </Link>
                                        <Link
                                            href={`/products/${p.id}/edit`}
                                            className="text-xs font-medium text-gray-600 no-underline px-2 py-1 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
                                        >
                                            Modifier
                                        </Link>
                                        <button
                                            onClick={() => destroy(p.id)}
                                            className="text-xs font-medium text-error-500 bg-transparent border-0 cursor-pointer px-2 py-1 rounded-md hover:bg-error-50 transition-colors"
                                        >
                                            Suppr.
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {products.links && (
                        <div className="py-2">
                            <Pagination links={products.links} />
                        </div>
                    )}
                </div>
            </AppLayout>
        </>
    )
}
