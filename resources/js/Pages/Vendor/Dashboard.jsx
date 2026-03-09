import { Head, Link } from '@inertiajs/react'
import { motion } from 'framer-motion'
import { TrendingUp, ArrowUpRight, Users, Package } from 'lucide-react'
import AppLayout from '../../Layouts/AppLayout'
import StatCard from '../../Components/StatCard'
import Badge from '../../Components/Badge'
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

const fmt = (n) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n ?? 0)
const saleBadge = { paid: 'success', partial: 'warning', pending: 'danger' }
const saleLabel = { paid: 'Payée', partial: 'Partielle', pending: 'En attente' }

export default function VendorDashboard({
    totalProducts, availableProducts, soldProducts,
    totalClients, totalSales, totalRevenue, totalProfit,
    recentSales, lowStockProducts, monthlyRevenue,
}) {
    return (
        <>
            <Head title="Tableau de bord" />
            <AppLayout title="Tableau de bord">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="max-w-5xl flex flex-col gap-6"
                >
                    {/* Header */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 m-0">Tableau de bord</h2>
                        <p className="text-sm text-gray-500 mt-1 mb-0">Vue d'ensemble de votre activité</p>
                    </div>

                    {/* Stats grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        <StatCard
                            title="Chiffre d'affaires"
                            value={fmt(totalRevenue)}
                            subtitle={`${totalSales} ventes`}
                            icon={<TrendingUp size={18} />}
                            index={0}
                        />
                        <StatCard
                            title="Profit net"
                            value={fmt(totalProfit)}
                            subtitle={`${soldProducts} produits vendus`}
                            icon={<ArrowUpRight size={18} />}
                            iconBg="bg-success-50"
                            iconColor="text-success-500"
                            index={1}
                        />
                        <StatCard
                            title="Clients"
                            value={totalClients}
                            subtitle="enregistrés"
                            icon={<Users size={18} />}
                            iconBg="bg-warning-50"
                            iconColor="text-warning-500"
                            index={2}
                        />
                        <StatCard
                            title="Produits dispo"
                            value={availableProducts}
                            subtitle={`${totalProducts} au total`}
                            icon={<Package size={18} />}
                            iconBg="bg-gray-100"
                            iconColor="text-gray-500"
                            index={3}
                        />
                    </div>

                    {/* Chart */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-theme-xs">
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">Revenus — 6 derniers mois</h3>
                        <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={monthlyRevenue} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#465fff" stopOpacity={0.12} />
                                            <stop offset="95%" stopColor="#465fff" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#F2F4F7" />
                                    <XAxis dataKey="month" tick={{ fill: '#98A2B3', fontSize: 11 }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fill: '#98A2B3', fontSize: 11 }} tickFormatter={(v) => `${v}€`} axisLine={false} tickLine={false} width={48} />
                                    <Tooltip
                                        contentStyle={{ background: '#FFFFFF', border: '1px solid #E4E7EC', borderRadius: '10px', color: '#101828', fontSize: 12 }}
                                        formatter={(v) => [fmt(v), 'Revenu']}
                                        cursor={{ stroke: '#E4E7EC' }}
                                    />
                                    <Area type="monotone" dataKey="revenue" stroke="#465fff" strokeWidth={2} fill="url(#revenueGrad)" dot={false} activeDot={{ r: 4, fill: '#465fff', strokeWidth: 0 }} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Bottom 2-col */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Recent sales */}
                        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-theme-xs">
                            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                                <h3 className="text-sm font-semibold text-gray-900">Ventes récentes</h3>
                                <Link
                                    href="/sales"
                                    className="text-xs text-gray-400 no-underline hover:text-brand-500 transition-colors"
                                >
                                    Voir tout →
                                </Link>
                            </div>
                            <div>
                                {recentSales.map((s) => (
                                    <div
                                        key={s.id}
                                        className="flex items-center justify-between px-5 py-3 border-b border-gray-50 last:border-b-0 hover:bg-gray-50/60 transition-colors"
                                    >
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 m-0">
                                                {s.client?.name ?? 'Client anonyme'}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-0.5 mb-0 tabular-nums">
                                                {fmt(s.final_amount)}
                                            </p>
                                        </div>
                                        <Badge variant={saleBadge[s.status]}>{saleLabel[s.status]}</Badge>
                                    </div>
                                ))}
                                {recentSales.length === 0 && (
                                    <p className="text-center text-sm text-gray-400 py-6 m-0">Aucune vente</p>
                                )}
                            </div>
                        </div>

                        {/* Available products */}
                        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-theme-xs">
                            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                                <h3 className="text-sm font-semibold text-gray-900">Produits disponibles</h3>
                                <Link
                                    href="/products"
                                    className="text-xs text-gray-400 no-underline hover:text-brand-500 transition-colors"
                                >
                                    Voir tout →
                                </Link>
                            </div>
                            <div>
                                {lowStockProducts.map((p) => (
                                    <div
                                        key={p.id}
                                        className="flex items-center justify-between px-5 py-3 border-b border-gray-50 last:border-b-0 hover:bg-gray-50/60 transition-colors"
                                    >
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 m-0">{p.name}</p>
                                            <p className="text-xs text-gray-400 mt-0.5 mb-0 capitalize">
                                                {p.category} — {p.condition === 'new' ? 'Neuf' : 'Occasion'}
                                            </p>
                                        </div>
                                        <span className="text-sm font-semibold text-brand-600 tabular-nums">
                                            {fmt(p.selling_price)}
                                        </span>
                                    </div>
                                ))}
                                {lowStockProducts.length === 0 && (
                                    <p className="text-center text-sm text-gray-400 py-6 m-0">Aucun produit</p>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AppLayout>
        </>
    )
}
