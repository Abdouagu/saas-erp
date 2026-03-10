import { fmt } from '../../utils/fmt'
import { Head, Link } from '@inertiajs/react'
import { Store, Users, Ban, Euro } from 'lucide-react'
import AdminLayout from '../../Layouts/AdminLayout'
import StatCard from '../../Components/StatCard'
import Badge from '../../Components/Badge'

const thCls = 'px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400'
const tdCls = 'px-4 py-3.5 text-sm text-gray-700 align-middle'

export default function Dashboard({ totalVendors, activeVendors, blockedVendors, activeSubscriptions, totalRevenue, recentVendors }) {
    return (
        <>
            <Head title="Vue d'ensemble" />
            <AdminLayout title="Vue d'ensemble">
                <div className="max-w-5xl flex flex-col gap-6">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Tableau de bord</h2>
                        <p className="text-sm text-gray-500 mt-1">Supervision de la plateforme</p>
                    </div>

                    {/* Stats grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <StatCard
                            title="Vendeurs"
                            value={totalVendors}
                            subtitle="inscrits"
                            icon={<Store size={18} />}
                            iconBg="bg-orange-50"
                            iconColor="text-orange-500"
                            index={0}
                        />
                        <StatCard
                            title="Actifs"
                            value={activeVendors}
                            subtitle="connectables"
                            icon={<Users size={18} />}
                            iconBg="bg-success-50"
                            iconColor="text-success-500"
                            index={1}
                        />
                        <StatCard
                            title="Bloqués"
                            value={blockedVendors}
                            subtitle="comptes"
                            icon={<Ban size={18} />}
                            iconBg="bg-error-50"
                            iconColor="text-error-500"
                            index={2}
                        />
                        <StatCard
                            title="Revenus"
                            value={fmt(totalRevenue)}
                            subtitle={`${activeSubscriptions} abonnements actifs`}
                            icon={<Euro size={18} />}
                            iconBg="bg-warning-50"
                            iconColor="text-warning-500"
                            index={3}
                        />
                    </div>

                    {/* Recent vendors */}
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-theme-xs overflow-hidden">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900">Vendeurs récents</h3>
                                <p className="text-xs text-gray-400 mt-0.5">{totalVendors} au total</p>
                            </div>
                            <Link href="/superadmin/vendors" className="text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors">
                                Voir tous →
                            </Link>
                        </div>

                        <table className="w-full border-collapse text-sm">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className={thCls}>Vendeur</th>
                                    <th className={thCls}>Plan</th>
                                    <th className={thCls}>Statut</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-400">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentVendors.map((v) => (
                                    <tr key={v.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
                                        <td className={tdCls}>
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-8 h-8 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-xs font-semibold text-orange-700 flex-shrink-0">
                                                    {v.name[0]?.toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{v.name}</p>
                                                    <p className="text-xs text-gray-400">{v.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={tdCls}>
                                            {v.subscription?.plan_name
                                                ? <span>{v.subscription.plan_name}</span>
                                                : <span className="text-gray-400 italic">—</span>
                                            }
                                        </td>
                                        <td className={tdCls}>
                                            <Badge variant={v.is_active ? 'success' : 'danger'}>
                                                {v.is_active ? 'Actif' : 'Bloqué'}
                                            </Badge>
                                        </td>
                                        <td className={tdCls + ' text-right'}>
                                            <Link href={`/superadmin/vendors/${v.id}/edit`} className="text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors">
                                                Modifier
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                {recentVendors.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-4 py-10 text-center text-sm text-gray-400">
                                            Aucun vendeur enregistré
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </AdminLayout>
        </>
    )
}
