import { Head, Link, useForm } from '@inertiajs/react'
import { useState } from 'react'
import { ArrowLeft, FileText, Plus } from 'lucide-react'
import AppLayout from '../../../Layouts/AppLayout'
import Badge from '../../../Components/Badge'
import Modal from '../../../Components/Modal'

const fmt = (n) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n)
const statusMap   = { paid: 'success', partial: 'warning', pending: 'danger' }
const statusLabel = { paid: 'Payée', partial: 'Partielle', pending: 'En attente' }

const inputCls = 'w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-300'
const labelCls = 'block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5'

export default function SaleShow({ sale }) {
    const [showPayment, setShowPayment] = useState(false)
    const { data, setData, post, processing, errors, reset } = useForm({
        sale_id: sale.id, amount: '', payment_date: new Date().toISOString().split('T')[0], notes: '',
    })

    const remaining = sale.final_amount - sale.paid_amount

    const submitPayment = (e) => {
        e.preventDefault()
        post('/payments', { onSuccess: () => { reset(); setShowPayment(false) } })
    }

    return (
        <>
            <Head title={`Vente #${sale.id}`} />
            <AppLayout title={`Vente #${sale.id}`}>
                <div className="max-w-5xl flex flex-col gap-4">
                    {/* Header */}
                    <div className="flex flex-wrap items-center gap-2">
                        <Link href="/sales" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-brand-500 transition-colors mr-1">
                            <ArrowLeft size={14} /> Retour
                        </Link>
                        <Badge variant={statusMap[sale.status]}>{statusLabel[sale.status]}</Badge>
                        {sale.status !== 'paid' && (
                            <button
                                onClick={() => setShowPayment(true)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-success-500 text-white text-sm font-semibold rounded-lg hover:bg-success-600 transition-colors cursor-pointer"
                            >
                                <Plus size={14} /> Enregistrer paiement
                            </button>
                        )}
                        <a
                            href={`/sales/${sale.id}/invoice/pdf`}
                            target="_blank"
                            className="inline-flex items-center gap-1.5 ml-auto px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <FileText size={14} /> Facture PDF
                        </a>
                    </div>

                    {/* Main grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        {/* Articles */}
                        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl shadow-theme-xs overflow-hidden">
                            <div className="px-5 py-4 border-b border-gray-100">
                                <h3 className="text-sm font-semibold text-gray-900">Articles ({sale.items?.length ?? 0})</h3>
                            </div>
                            <div>
                                {sale.items?.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 last:border-0">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{item.product?.name}</p>
                                            <p className="text-xs text-gray-400 mt-0.5">{item.product?.internal_code} · {item.product?.category}</p>
                                        </div>
                                        <span className="text-sm font-semibold text-gray-900 tabular-nums">{fmt(item.price)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right col */}
                        <div className="flex flex-col gap-3">
                            {/* Summary */}
                            <div className="bg-white border border-gray-200 rounded-2xl shadow-theme-xs p-4">
                                <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Résumé</h3>
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500">Client</span>
                                        <span className="font-medium text-gray-900">{sale.client?.name ?? 'Anonyme'}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500">Sous-total</span>
                                        <span className="text-gray-700 tabular-nums">{fmt(sale.total_amount)}</span>
                                    </div>
                                    {sale.discount_percentage > 0 && (
                                        <div className="flex justify-between items-center text-sm text-warning-600 tabular-nums">
                                            <span>Remise ({sale.discount_percentage}%)</span>
                                            <span>-{fmt(sale.total_amount * sale.discount_percentage / 100)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center text-[15px] font-bold text-gray-900 border-t border-gray-100 pt-2.5 mt-1 tabular-nums">
                                        <span>Total</span>
                                        <span>{fmt(sale.final_amount)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm text-success-600 tabular-nums">
                                        <span>Payé</span>
                                        <span>{fmt(sale.paid_amount)}</span>
                                    </div>
                                    {remaining > 0 && (
                                        <div className="flex justify-between items-center text-sm font-semibold text-warning-600 tabular-nums">
                                            <span>Restant</span>
                                            <span>{fmt(remaining)}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Payments history */}
                            {sale.payments?.length > 0 && (
                                <div className="bg-white border border-gray-200 rounded-2xl shadow-theme-xs overflow-hidden">
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400">Paiements</h3>
                                    </div>
                                    <div>
                                        {sale.payments.map((p) => (
                                            <div key={p.id} className="flex justify-between items-center px-4 py-2.5 border-b border-gray-100 last:border-0">
                                                <span className="text-xs text-gray-400">{p.payment_date}</span>
                                                <span className="text-sm font-semibold text-success-600 tabular-nums">{fmt(p.amount)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Payment Modal */}
                <Modal open={showPayment} onClose={() => setShowPayment(false)} title="Enregistrer un paiement">
                    <form onSubmit={submitPayment}>
                        <div className="flex flex-col gap-3.5">
                            <div>
                                <label className={labelCls}>Montant (max: {fmt(remaining)})</label>
                                <input type="number" step="0.01" max={remaining} value={data.amount} onChange={(e) => setData('amount', e.target.value)} placeholder="0.00" className={inputCls} />
                                {errors.amount && <p className="text-xs text-error-500 mt-1">{errors.amount}</p>}
                            </div>
                            <div>
                                <label className={labelCls}>Date de paiement</label>
                                <input type="date" value={data.payment_date} onChange={(e) => setData('payment_date', e.target.value)} className={inputCls} />
                                {errors.payment_date && <p className="text-xs text-error-500 mt-1">{errors.payment_date}</p>}
                            </div>
                            <div>
                                <label className={labelCls}>Notes</label>
                                <input value={data.notes} onChange={(e) => setData('notes', e.target.value)} placeholder="Optionnel..." className={inputCls} />
                            </div>
                            <div className="flex gap-2.5 pt-1">
                                <button type="submit" disabled={processing} className="px-5 py-2.5 bg-success-500 text-white text-sm font-semibold rounded-lg hover:bg-success-600 transition-colors disabled:opacity-50 cursor-pointer">
                                    {processing ? 'Enregistrement...' : 'Enregistrer'}
                                </button>
                                <button type="button" onClick={() => setShowPayment(false)} className="px-5 py-2.5 bg-gray-100 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
                                    Annuler
                                </button>
                            </div>
                        </div>
                    </form>
                </Modal>
            </AppLayout>
        </>
    )
}
