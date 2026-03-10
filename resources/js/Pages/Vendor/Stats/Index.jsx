import { fmt } from '../../../utils/fmt'
import { Head } from '@inertiajs/react'
import AppLayout from '../../../Layouts/AppLayout'
import StatCard from '../../../Components/StatCard'
import { TrendingUp, ArrowUpRight, AlertTriangle, Calendar } from 'lucide-react'
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend,
} from 'recharts'

const PIE_COLORS = ['#465fff', '#12b76a']

export default function StatsIndex({
    totalRevenue, totalProfit, thisMonthRevenue,
    pendingSales, totalDebt, topProducts, topClients,
    monthlyRevenue, phonesSold, pcsSold,
}) {
    const pieData = [
        { name: 'Téléphones', value: phonesSold },
        { name: 'PCs', value: pcsSold },
    ]

    return (
        <>
            <Head title="Statistiques" />
            <AppLayout title="Statistiques">
                <div className="max-w-5xl flex flex-col gap-6">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Statistiques</h2>
                        <p className="text-sm text-gray-500 mt-1">Analyse de votre activité</p>
                    </div>

                    {/* Stat cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        <StatCard title="Revenus totaux" value={fmt(totalRevenue)} icon={<TrendingUp size={18} />} index={0} />
                        <StatCard title="Profit net" value={fmt(totalProfit)} icon={<ArrowUpRight size={18} />} iconBg="bg-success-50" iconColor="text-success-500" index={1} />
                        <StatCard title="Ce mois" value={fmt(thisMonthRevenue)} icon={<Calendar size={18} />} iconBg="bg-warning-50" iconColor="text-warning-500" index={2} />
                        <StatCard title="Dettes" value={fmt(totalDebt)} subtitle={`${pendingSales} ventes impayées`} icon={<AlertTriangle size={18} />} iconBg="bg-error-50" iconColor="text-error-500" index={3} />
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl shadow-theme-xs p-5">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">Revenus — 12 derniers mois</h3>
                            <div className="h-48">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={monthlyRevenue} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="statsGrad" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#465fff" stopOpacity={0.12} />
                                                <stop offset="95%" stopColor="#465fff" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#F2F4F7" />
                                        <XAxis dataKey="month" tick={{ fill: '#98A2B3', fontSize: 11 }} axisLine={false} tickLine={false} />
                                        <YAxis tick={{ fill: '#98A2B3', fontSize: 11 }} tickFormatter={(v) => `${v} DH`} axisLine={false} tickLine={false} width={48} />
                                        <Tooltip
                                            contentStyle={{ background: '#fff', border: '1px solid #E4E7EC', borderRadius: '10px', fontSize: 12 }}
                                            formatter={(v) => [fmt(v), 'Revenu']}
                                            cursor={{ stroke: '#E4E7EC' }}
                                        />
                                        <Area type="monotone" dataKey="revenue" stroke="#465fff" strokeWidth={2} fill="url(#statsGrad)" dot={false} activeDot={{ r: 4, fill: '#465fff', strokeWidth: 0 }} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-2xl shadow-theme-xs p-5">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">Répartition</h3>
                            <div className="h-48">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={72} dataKey="value" strokeWidth={0}>
                                            {pieData.map((_, i) => (
                                                <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Legend wrapperStyle={{ fontSize: 12 }} formatter={(value) => <span style={{ color: '#667085' }}>{value}</span>} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Rankings */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Top products */}
                        <div className="bg-white border border-gray-200 rounded-2xl shadow-theme-xs overflow-hidden">
                            <div className="px-5 py-4 border-b border-gray-100">
                                <h3 className="text-sm font-semibold text-gray-900">Top produits vendus</h3>
                            </div>
                            <div>
                                {topProducts.map((item, i) => (
                                    <div key={item.product_id} className="flex items-center gap-3 px-5 py-3 border-b border-gray-100 last:border-0">
                                        <span className="text-xs text-gray-300 w-[18px] tabular-nums flex-shrink-0">{i + 1}.</span>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">{item.product?.name}</p>
                                            <p className="text-xs text-gray-400 mt-0.5 capitalize">{item.product?.category}</p>
                                        </div>
                                        <span className="text-sm font-semibold text-brand-500 tabular-nums flex-shrink-0">{item.total_sold}</span>
                                    </div>
                                ))}
                                {topProducts.length === 0 && (
                                    <p className="px-5 py-6 text-center text-sm text-gray-400">Aucune donnée</p>
                                )}
                            </div>
                        </div>

                        {/* Top clients */}
                        <div className="bg-white border border-gray-200 rounded-2xl shadow-theme-xs overflow-hidden">
                            <div className="px-5 py-4 border-b border-gray-100">
                                <h3 className="text-sm font-semibold text-gray-900">Top clients</h3>
                            </div>
                            <div>
                                {topClients.map((c, i) => (
                                    <div key={c.id} className="flex items-center gap-3 px-5 py-3 border-b border-gray-100 last:border-0">
                                        <span className="text-xs text-gray-300 w-[18px] tabular-nums flex-shrink-0">{i + 1}.</span>
                                        <div className="w-7 h-7 rounded-full bg-brand-50 flex items-center justify-center text-[11px] font-semibold text-brand-600 flex-shrink-0">
                                            {c.name[0]?.toUpperCase()}
                                        </div>
                                        <p className="flex-1 text-sm font-medium text-gray-900 truncate">{c.name}</p>
                                        <span className="text-sm font-semibold text-success-600 tabular-nums flex-shrink-0">
                                            {c.sales_count} achat(s)
                                        </span>
                                    </div>
                                ))}
                                {topClients.length === 0 && (
                                    <p className="px-5 py-6 text-center text-sm text-gray-400">Aucune donnée</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </AppLayout>
        </>
    )
}
