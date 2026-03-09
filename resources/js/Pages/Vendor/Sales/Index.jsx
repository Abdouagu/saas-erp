import { Head, Link } from '@inertiajs/react'
import { Plus, Eye, FileText } from 'lucide-react'
import AppLayout from '../../../Layouts/AppLayout'
import Badge from '../../../Components/Badge'
import Pagination from '../../../Components/Pagination'

const fmt = (n) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n)
const statusMap = { paid: 'success', partial: 'warning', pending: 'danger' }
const statusLabel = { paid: 'Payée', partial: 'Partielle', pending: 'En attente' }

const thCls = 'px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400'
const tdCls = 'px-4 py-3.5 text-sm text-gray-700 align-middle'

export default function SalesIndex({ sales }) {
    return (
        <>
            <Head title="Ventes" />
            <AppLayout title="Ventes">
                <div className="max-w-5xl flex flex-col gap-4">
                    {/* Header */}
                    <div className="flex items-center justify-between flex-wrap gap-3">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Ventes</h2>
                            <p className="text-sm text-gray-500 mt-1">{sales.total} ventes enregistrées</p>
                        </div>
                        <Link
                            href="/sales/create"
                            className="inline-flex items-center gap-2 bg-brand-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-brand-600 transition-colors cursor-pointer no-underline"
                        >
                            <Plus size={15} />
                            Nouvelle vente
                        </Link>
                    </div>

                    {/* Table */}
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-theme-xs overflow-hidden">
                        <table className="w-full border-collapse text-sm">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className={thCls}>#</th>
                                    <th className={thCls}>Client</th>
                                    <th className={thCls}>Total</th>
                                    <th className={thCls}>Payé</th>
                                    <th className={thCls}>Restant</th>
                                    <th className={thCls}>Statut</th>
                                    <th className={thCls}>Date</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sales.data.map((s) => (
                                    <tr key={s.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
                                        <td className={tdCls}>
                                            <span className="font-mono text-xs text-gray-400">#{s.id}</span>
                                        </td>
                                        <td className={tdCls}>
                                            {s.client?.name
                                                ? <span className="font-medium text-gray-900">{s.client.name}</span>
                                                : <span className="text-gray-400">Anonyme</span>
                                            }
                                        </td>
                                        <td className={tdCls}>
                                            <span className="font-semibold text-gray-900 tabular-nums">{fmt(s.final_amount)}</span>
                                        </td>
                                        <td className={tdCls}>
                                            <span className="font-medium text-success-600 tabular-nums">{fmt(s.paid_amount)}</span>
                                        </td>
                                        <td className={tdCls}>
                                            {s.final_amount - s.paid_amount > 0
                                                ? <span className="font-medium text-warning-600 tabular-nums">{fmt(s.final_amount - s.paid_amount)}</span>
                                                : <span className="text-gray-300">—</span>
                                            }
                                        </td>
                                        <td className={tdCls}>
                                            <Badge variant={statusMap[s.status]}>{statusLabel[s.status]}</Badge>
                                        </td>
                                        <td className={tdCls}>
                                            <span className="text-gray-500">{new Date(s.created_at).toLocaleDateString('fr-FR')}</span>
                                        </td>
                                        <td className={tdCls}>
                                            <div className="flex items-center justify-end gap-1">
                                                <Link
                                                    href={`/sales/${s.id}`}
                                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
                                                >
                                                    <Eye size={12} /> Voir
                                                </Link>
                                                <a
                                                    href={`/sales/${s.id}/invoice/pdf`}
                                                    target="_blank"
                                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
                                                >
                                                    <FileText size={12} /> PDF
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {sales.data.length === 0 && (
                                    <tr>
                                        <td colSpan={8} className="px-4 py-12 text-center text-sm text-gray-400">
                                            Aucune vente
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div className="px-4 py-3 border-t border-gray-100">
                            <Pagination links={sales.links} />
                        </div>
                    </div>
                </div>
            </AppLayout>
        </>
    )
}
