import { Head, Link, router } from '@inertiajs/react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import AdminLayout from '../../../Layouts/AdminLayout'
import Badge from '../../../Components/Badge'
import Pagination from '../../../Components/Pagination'

const thCls = 'px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400'
const tdCls = 'px-4 py-3.5 text-sm text-gray-700 align-middle'

export default function VendorsIndex({ vendors }) {
    const toggleBlock = (id) =>
        router.post(`/superadmin/vendors/${id}/toggle`, {}, { preserveScroll: true })

    const destroy = (id) =>
        confirm('Supprimer ce vendeur définitivement ?') &&
        router.delete(`/superadmin/vendors/${id}`)

    return (
        <>
            <Head title="Vendeurs" />
            <AdminLayout title="Vendeurs">
                <div className="max-w-5xl flex flex-col gap-6">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Vendeurs</h2>
                            <p className="text-sm text-gray-500 mt-1">{vendors.total} comptes enregistrés</p>
                        </div>
                        <Link
                            href="/superadmin/vendors/create"
                            className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors whitespace-nowrap cursor-pointer"
                        >
                            <Plus size={15} />
                            Nouveau vendeur
                        </Link>
                    </div>

                    {/* Table card */}
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-theme-xs overflow-hidden">
                        <table className="w-full border-collapse text-sm">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className={thCls}>Vendeur</th>
                                    <th className={thCls}>Téléphone</th>
                                    <th className={thCls}>Plan</th>
                                    <th className={thCls}>Statut</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vendors.data.map((v) => (
                                    <tr key={v.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
                                        <td className={tdCls}>
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-8 h-8 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-xs font-semibold text-orange-700 flex-shrink-0">
                                                    {v.name[0]?.toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900 leading-tight">{v.name}</p>
                                                    <p className="text-xs text-gray-400">{v.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={tdCls}>
                                            {v.phone ? v.phone : <span className="text-gray-400">—</span>}
                                        </td>
                                        <td className={tdCls}>
                                            {v.subscription?.plan_name
                                                ? v.subscription.plan_name
                                                : <span className="text-gray-400">Aucun</span>
                                            }
                                        </td>
                                        <td className={tdCls}>
                                            <Badge variant={v.is_active ? 'success' : 'danger'}>
                                                {v.is_active ? 'Actif' : 'Bloqué'}
                                            </Badge>
                                        </td>
                                        <td className={tdCls}>
                                            <div className="flex items-center justify-end gap-1">
                                                <Link
                                                    href={`/superadmin/vendors/${v.id}/edit`}
                                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
                                                >
                                                    <Pencil size={13} />
                                                    Modifier
                                                </Link>
                                                <button
                                                    onClick={() => toggleBlock(v.id)}
                                                    className={`inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                                                        v.is_active
                                                            ? 'text-warning-600 hover:bg-warning-50'
                                                            : 'text-success-600 hover:bg-success-50'
                                                    }`}
                                                >
                                                    {v.is_active ? 'Bloquer' : 'Activer'}
                                                </button>
                                                <button
                                                    onClick={() => destroy(v.id)}
                                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-error-500 rounded-lg hover:bg-error-50 transition-colors cursor-pointer"
                                                >
                                                    <Trash2 size={13} />
                                                    Supprimer
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {vendors.data.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-12 text-center text-sm text-gray-400">
                                            Aucun vendeur trouvé
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div className="px-4 py-3 border-t border-gray-100">
                            <Pagination links={vendors.links} />
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    )
}
