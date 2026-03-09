import { useState } from 'react'
import { Head, useForm } from '@inertiajs/react'
import { Plus } from 'lucide-react'
import AdminLayout from '../../../Layouts/AdminLayout'
import Badge from '../../../Components/Badge'
import Modal from '../../../Components/Modal'
import Pagination from '../../../Components/Pagination'

const fmt = (n) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n)

const statusMap   = { active: 'success', expired: 'danger', suspended: 'warning' }
const statusLabel = { active: 'Actif', expired: 'Expiré', suspended: 'Suspendu' }

const labelCls  = 'block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5'
const inputCls  = 'w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-300 transition-colors'
const thCls     = 'px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400'
const tdCls     = 'px-4 py-3.5 text-sm text-gray-700 align-middle'

const Field = ({ label, error, children }) => (
    <div>
        <label className={labelCls}>{label}</label>
        {children}
        {error && <p className="text-xs text-error-500 mt-1.5">{error}</p>}
    </div>
)

export default function SubscriptionsIndex({ subscriptions, vendors }) {
    const [showModal, setShowModal] = useState(false)

    const { data, setData, post, processing, errors, reset } = useForm({
        vendor_id: '',
        plan_name: '',
        start_date: '',
        end_date: '',
        amount: '',
        status: 'active',
    })

    const submit = (e) => {
        e.preventDefault()
        post('/superadmin/subscriptions', {
            onSuccess: () => { reset(); setShowModal(false) },
        })
    }

    return (
        <>
            <Head title="Abonnements" />
            <AdminLayout title="Abonnements">
                <div className="max-w-5xl flex flex-col gap-6">
                    {/* Header */}
                    <div className="flex items-center justify-between flex-wrap gap-3">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Abonnements</h2>
                            <p className="text-sm text-gray-500 mt-1">{subscriptions.total} abonnements enregistrés</p>
                        </div>
                        <button
                            onClick={() => setShowModal(true)}
                            className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors cursor-pointer"
                        >
                            <Plus size={15} />
                            Nouvel abonnement
                        </button>
                    </div>

                    {/* Table */}
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-theme-xs overflow-hidden">
                        <table className="w-full border-collapse text-sm">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className={thCls}>Vendeur</th>
                                    <th className={thCls}>Plan</th>
                                    <th className={thCls}>Début</th>
                                    <th className={thCls}>Fin</th>
                                    <th className={thCls}>Montant</th>
                                    <th className={thCls}>Statut</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subscriptions.data.map((s) => (
                                    <tr key={s.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
                                        <td className={tdCls}>
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-8 h-8 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-xs font-semibold text-orange-700 flex-shrink-0">
                                                    {s.vendor?.name?.[0]?.toUpperCase()}
                                                </div>
                                                <span className="font-medium text-gray-900">{s.vendor?.name}</span>
                                            </div>
                                        </td>
                                        <td className={tdCls}>{s.plan_name}</td>
                                        <td className={tdCls}><span className="text-gray-500">{s.start_date}</span></td>
                                        <td className={tdCls}><span className="text-gray-500">{s.end_date}</span></td>
                                        <td className={tdCls}>
                                            <span className="font-semibold tabular-nums">{fmt(s.amount)}</span>
                                        </td>
                                        <td className={tdCls}>
                                            <Badge variant={statusMap[s.status] ?? 'default'}>
                                                {statusLabel[s.status] ?? s.status}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                                {subscriptions.data.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-4 py-12 text-center text-sm text-gray-400">
                                            Aucun abonnement
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div className="px-4 py-3 border-t border-gray-100">
                            <Pagination links={subscriptions.links} />
                        </div>
                    </div>
                </div>

                {/* Modal */}
                <Modal open={showModal} onClose={() => setShowModal(false)} title="Nouvel abonnement">
                    <form onSubmit={submit}>
                        <div className="flex flex-col gap-4">
                            <Field label="Vendeur" error={errors.vendor_id}>
                                <select value={data.vendor_id} onChange={(e) => setData('vendor_id', e.target.value)} className={inputCls}>
                                    <option value="">Sélectionner un vendeur...</option>
                                    {vendors.map((v) => (
                                        <option key={v.id} value={v.id}>{v.name}</option>
                                    ))}
                                </select>
                            </Field>

                            <Field label="Nom du plan" error={errors.plan_name}>
                                <input
                                    value={data.plan_name}
                                    onChange={(e) => setData('plan_name', e.target.value)}
                                    placeholder="Pro, Premium..."
                                    className={inputCls}
                                />
                            </Field>

                            <div className="grid grid-cols-2 gap-3">
                                <Field label="Début" error={errors.start_date}>
                                    <input type="date" value={data.start_date} onChange={(e) => setData('start_date', e.target.value)} className={inputCls} />
                                </Field>
                                <Field label="Fin" error={errors.end_date}>
                                    <input type="date" value={data.end_date} onChange={(e) => setData('end_date', e.target.value)} className={inputCls} />
                                </Field>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <Field label="Montant (€)" error={errors.amount}>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={data.amount}
                                        onChange={(e) => setData('amount', e.target.value)}
                                        placeholder="0.00"
                                        className={inputCls}
                                    />
                                </Field>
                                <Field label="Statut" error={errors.status}>
                                    <select value={data.status} onChange={(e) => setData('status', e.target.value)} className={inputCls}>
                                        <option value="active">Actif</option>
                                        <option value="expired">Expiré</option>
                                        <option value="suspended">Suspendu</option>
                                    </select>
                                </Field>
                            </div>

                            <div className="flex gap-2.5 pt-1">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-5 py-2.5 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 cursor-pointer"
                                >
                                    {processing ? 'Enregistrement...' : 'Enregistrer'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-5 py-2.5 bg-gray-100 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                                >
                                    Annuler
                                </button>
                            </div>
                        </div>
                    </form>
                </Modal>
            </AdminLayout>
        </>
    )
}
