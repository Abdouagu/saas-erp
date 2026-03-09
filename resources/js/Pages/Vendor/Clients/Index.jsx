import { Head, Link, useForm } from '@inertiajs/react'
import { useState } from 'react'
import { Plus } from 'lucide-react'
import AppLayout from '../../../Layouts/AppLayout'
import Badge from '../../../Components/Badge'
import Modal from '../../../Components/Modal'
import Pagination from '../../../Components/Pagination'

const statusMap   = { good: 'success', late: 'danger' }
const statusLabel = { good: 'OK', late: 'En retard' }

const inputCls = 'w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-300'
const labelCls = 'block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5'
const thCls    = 'px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400'
const tdCls    = 'px-4 py-3.5 text-sm text-gray-700 align-middle'

export default function ClientsIndex({ clients }) {
    const [showModal, setShowModal] = useState(false)
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '', phone: '', email: '', address: '',
    })

    const submit = (e) => {
        e.preventDefault()
        post('/clients', { onSuccess: () => { reset(); setShowModal(false) } })
    }

    return (
        <>
            <Head title="Clients" />
            <AppLayout title="Clients">
                <div className="max-w-5xl flex flex-col gap-4">
                    {/* Header */}
                    <div className="flex items-center justify-between flex-wrap gap-3">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Clients</h2>
                            <p className="text-sm text-gray-500 mt-1">{clients.total} clients enregistrés</p>
                        </div>
                        <button
                            onClick={() => setShowModal(true)}
                            className="inline-flex items-center gap-2 bg-brand-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-brand-600 transition-colors cursor-pointer"
                        >
                            <Plus size={15} /> Nouveau client
                        </button>
                    </div>

                    {/* Table */}
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-theme-xs overflow-hidden">
                        <table className="w-full border-collapse text-sm">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className={thCls}>Nom</th>
                                    <th className={thCls}>Téléphone</th>
                                    <th className={thCls}>Email</th>
                                    <th className={thCls}>Ventes</th>
                                    <th className={thCls}>Statut</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clients.data.map((c) => (
                                    <tr key={c.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
                                        <td className={tdCls}>
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-7 h-7 rounded-full bg-brand-50 border border-brand-200 flex items-center justify-center text-xs font-semibold text-brand-600 flex-shrink-0">
                                                    {c.name[0]?.toUpperCase()}
                                                </div>
                                                <span className="font-medium text-gray-900">{c.name}</span>
                                            </div>
                                        </td>
                                        <td className={tdCls}><span className="text-gray-400">{c.phone ?? '—'}</span></td>
                                        <td className={tdCls}><span className="text-gray-400">{c.email ?? '—'}</span></td>
                                        <td className={tdCls}><span className="text-gray-700">{c.sales_count}</span></td>
                                        <td className={tdCls}>
                                            <Badge variant={statusMap[c.status] ?? 'default'}>{statusLabel[c.status] ?? c.status}</Badge>
                                        </td>
                                        <td className={tdCls}>
                                            <div className="flex justify-end">
                                                <Link href={`/clients/${c.id}`} className="px-2.5 py-1.5 text-xs text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors">
                                                    Voir
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {clients.data.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-4 py-12 text-center text-sm text-gray-400">Aucun client</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div className="px-4 py-3 border-t border-gray-100">
                            <Pagination links={clients.links} />
                        </div>
                    </div>
                </div>

                {/* New client modal */}
                <Modal open={showModal} onClose={() => setShowModal(false)} title="Nouveau client">
                    <form onSubmit={submit}>
                        <div className="flex flex-col gap-3.5">
                            <div>
                                <label className={labelCls}>Nom *</label>
                                <input value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Jean Dupont" autoFocus className={inputCls} />
                                {errors.name && <p className="text-xs text-error-500 mt-1">{errors.name}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className={labelCls}>Téléphone</label>
                                    <input value={data.phone} onChange={(e) => setData('phone', e.target.value)} placeholder="+33 6 00 00 00 00" className={inputCls} />
                                    {errors.phone && <p className="text-xs text-error-500 mt-1">{errors.phone}</p>}
                                </div>
                                <div>
                                    <label className={labelCls}>Email</label>
                                    <input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} placeholder="jean@exemple.com" className={inputCls} />
                                    {errors.email && <p className="text-xs text-error-500 mt-1">{errors.email}</p>}
                                </div>
                            </div>
                            <div>
                                <label className={labelCls}>Adresse</label>
                                <textarea value={data.address} onChange={(e) => setData('address', e.target.value)} rows={2} placeholder="Adresse complète..." className={`${inputCls} resize-none`} />
                                {errors.address && <p className="text-xs text-error-500 mt-1">{errors.address}</p>}
                            </div>
                            <div className="flex gap-2.5 pt-1">
                                <button type="submit" disabled={processing} className="px-5 py-2.5 bg-brand-500 text-white text-sm font-semibold rounded-lg hover:bg-brand-600 transition-colors disabled:opacity-50 cursor-pointer">
                                    {processing ? 'Ajout...' : 'Ajouter'}
                                </button>
                                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 bg-gray-100 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
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
