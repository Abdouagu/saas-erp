import { fmt } from '../../../utils/fmt'
import { Head, Link } from '@inertiajs/react'
import AppLayout from '../../../Layouts/AppLayout'
import Pagination from '../../../Components/Pagination'


const thCls = 'px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400'
const tdCls = 'px-4 py-3.5 text-sm text-gray-700 align-middle'

export default function PaymentsIndex({ payments }) {
    return (
        <>
            <Head title="Paiements" />
            <AppLayout title="Paiements">
                <div className="max-w-5xl flex flex-col gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Paiements</h2>
                        <p className="text-sm text-gray-500 mt-1">{payments.total} paiements enregistrés</p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl shadow-theme-xs overflow-hidden">
                        <table className="w-full border-collapse text-sm">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className={thCls}>#</th>
                                    <th className={thCls}>Client</th>
                                    <th className={thCls}>Vente</th>
                                    <th className={thCls}>Montant</th>
                                    <th className={thCls}>Date</th>
                                    <th className={thCls}>Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.data.map((p) => (
                                    <tr key={p.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
                                        <td className={tdCls}>
                                            <span className="font-mono text-xs text-gray-400">#{p.id}</span>
                                        </td>
                                        <td className={tdCls}>
                                            {p.client?.name
                                                ? <span className="font-medium text-gray-900">{p.client.name}</span>
                                                : <span className="text-gray-400">—</span>
                                            }
                                        </td>
                                        <td className={tdCls}>
                                            <Link href={`/sales/${p.sale_id}`} className="text-gray-500 hover:text-brand-500 transition-colors">
                                                Vente #{p.sale_id}
                                            </Link>
                                        </td>
                                        <td className={tdCls}>
                                            <span className="font-semibold text-success-600 tabular-nums">{fmt(p.amount)}</span>
                                        </td>
                                        <td className={tdCls}>
                                            <span className="text-gray-500">{p.payment_date}</span>
                                        </td>
                                        <td className={tdCls}>
                                            <span className="text-gray-400">{p.notes ?? '—'}</span>
                                        </td>
                                    </tr>
                                ))}
                                {payments.data.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-4 py-12 text-center text-sm text-gray-400">Aucun paiement</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div className="px-4 py-3 border-t border-gray-100">
                            <Pagination links={payments.links} />
                        </div>
                    </div>
                </div>
            </AppLayout>
        </>
    )
}
