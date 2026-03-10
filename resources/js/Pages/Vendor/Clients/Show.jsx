import { fmt } from '../../../utils/fmt'
import { Head, Link } from '@inertiajs/react'
import { ArrowLeft } from 'lucide-react'
import AppLayout from '../../../Layouts/AppLayout'
import Badge from '../../../Components/Badge'

const saleBadge = { paid: 'success', partial: 'warning', pending: 'danger' }
const saleLabel = { paid: 'Payée', partial: 'Partielle', pending: 'En attente' }

export default function ClientShow({ client, totalDebt }) {
    return (
        <>
            <Head title={client.name} />
            <AppLayout title={client.name}>
                <div className="max-w-5xl flex flex-col gap-4">
                    <Link href="/clients" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-brand-500 transition-colors">
                        <ArrowLeft size={14} /> Retour aux clients
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        {/* Info card */}
                        <div className="bg-white border border-gray-200 rounded-2xl shadow-theme-xs p-5">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full bg-brand-50 border border-brand-200 flex items-center justify-center text-xl font-bold text-brand-600 flex-shrink-0">
                                    {client.name[0]?.toUpperCase()}
                                </div>
                                <div>
                                    <h2 className="text-base font-semibold text-gray-900">{client.name}</h2>
                                    <Badge variant={client.status === 'good' ? 'success' : 'danger'}>
                                        {client.status === 'good' ? 'Bon payeur' : 'En retard'}
                                    </Badge>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                {client.phone && (
                                    <div className="flex items-start gap-2 text-sm">
                                        <span className="text-xs text-gray-400 min-w-[48px] flex-shrink-0 pt-px">Tél</span>
                                        <span className="text-gray-700">{client.phone}</span>
                                    </div>
                                )}
                                {client.email && (
                                    <div className="flex items-start gap-2 text-sm">
                                        <span className="text-xs text-gray-400 min-w-[48px] flex-shrink-0 pt-px">Email</span>
                                        <span className="text-gray-700">{client.email}</span>
                                    </div>
                                )}
                                {client.address && (
                                    <div className="flex items-start gap-2 text-sm">
                                        <span className="text-xs text-gray-400 min-w-[48px] flex-shrink-0 pt-px">Adresse</span>
                                        <span className="text-gray-700">{client.address}</span>
                                    </div>
                                )}
                            </div>

                            {totalDebt > 0 && (
                                <div className="mt-4 px-3.5 py-3 bg-warning-50 border border-warning-200 rounded-xl">
                                    <p className="text-xs text-gray-400 mb-1">Dette totale</p>
                                    <p className="text-xl font-bold text-warning-700 tabular-nums">{fmt(totalDebt)}</p>
                                </div>
                            )}
                        </div>

                        {/* Sales history */}
                        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl shadow-theme-xs overflow-hidden">
                            <div className="px-5 py-4 border-b border-gray-100">
                                <h3 className="text-sm font-semibold text-gray-900">
                                    Historique des ventes
                                    <span className="text-gray-400 font-normal ml-1.5">({client.sales?.length ?? 0})</span>
                                </h3>
                            </div>
                            <div>
                                {client.sales?.map((s) => (
                                    <div
                                        key={s.id}
                                        className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors"
                                    >
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                Vente #{s.id}
                                                <span className="text-gray-400 font-normal ml-1.5">· {s.items?.length} article(s)</span>
                                            </p>
                                            <p className="text-xs text-gray-400 mt-0.5">
                                                {new Date(s.created_at).toLocaleDateString('fr-FR')}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="text-right">
                                                <p className="text-sm font-semibold text-gray-900 tabular-nums">{fmt(s.final_amount)}</p>
                                                {s.final_amount - s.paid_amount > 0 && (
                                                    <p className="text-xs text-warning-600 tabular-nums mt-0.5">
                                                        Reste: {fmt(s.final_amount - s.paid_amount)}
                                                    </p>
                                                )}
                                            </div>
                                            <Badge variant={saleBadge[s.status]}>{saleLabel[s.status]}</Badge>
                                            <Link
                                                href={`/sales/${s.id}`}
                                                className="px-2.5 py-1.5 text-xs text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
                                            >
                                                Voir
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                                {client.sales?.length === 0 && (
                                    <p className="px-5 py-8 text-center text-sm text-gray-400">Aucune vente</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </AppLayout>
        </>
    )
}
