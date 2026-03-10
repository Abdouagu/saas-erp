import { fmt } from '../../../utils/fmt'
import { Head, useForm, Link } from '@inertiajs/react'
import { useState } from 'react'
import { Combobox, ComboboxInput, ComboboxOptions, ComboboxOption } from '@headlessui/react'
import { ArrowLeft, X } from 'lucide-react'
import AppLayout from '../../../Layouts/AppLayout'


const inputCls  = 'w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-300 bg-white text-gray-900 placeholder:text-gray-400'
const labelCls  = 'block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5'
const cardCls   = 'bg-white border border-gray-200 rounded-2xl shadow-theme-xs p-4'
const sectionTitleCls = 'text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3'

export default function SaleCreate({ clients, products }) {
    const [selectedItems, setSelectedItems] = useState([])
    const [comboQuery, setComboQuery]       = useState('')
    const [comboValue, setComboValue]       = useState(null)

    const { data, setData, post, processing, errors } = useForm({
        client_id: '', discount_percentage: 0, paid_amount: '',
        payment_method: 'cash', notes: '', products: [], prices: [],
    })

    const filteredProducts = comboQuery === ''
        ? products.slice(0, 10)
        : products.filter((p) =>
            p.name.toLowerCase().includes(comboQuery.toLowerCase()) ||
            (p.brand ?? '').toLowerCase().includes(comboQuery.toLowerCase()) ||
            p.internal_code.toLowerCase().includes(comboQuery.toLowerCase())
        ).slice(0, 10)

    const addProduct = (product) => {
        if (!product) return
        if (selectedItems.find((i) => i.id === product.id)) { setComboValue(null); setComboQuery(''); return }
        const newItem  = { ...product, customPrice: product.selling_price }
        const newItems = [...selectedItems, newItem]
        setSelectedItems(newItems)
        setData({ ...data, products: newItems.map((i) => i.id), prices: newItems.map((i) => i.customPrice) })
        setComboValue(null); setComboQuery('')
    }

    const removeItem = (id) => {
        const newItems = selectedItems.filter((i) => i.id !== id)
        setSelectedItems(newItems)
        setData({ ...data, products: newItems.map((i) => i.id), prices: newItems.map((i) => i.customPrice) })
    }

    const updatePrice = (id, price) => {
        const newItems = selectedItems.map((i) => i.id === id ? { ...i, customPrice: parseFloat(price) || 0 } : i)
        setSelectedItems(newItems)
        setData({ ...data, prices: newItems.map((i) => i.customPrice) })
    }

    const total       = selectedItems.reduce((sum, i) => sum + (i.customPrice || 0), 0)
    const discount    = parseFloat(data.discount_percentage) || 0
    const finalAmount = total * (1 - discount / 100)
    const remaining   = Math.max(0, finalAmount - (parseFloat(data.paid_amount) || 0))

    const submit = (e) => { e.preventDefault(); post('/sales') }

    return (
        <>
            <Head title="Nouvelle vente" />
            <AppLayout title="Nouvelle vente">
                <div className="max-w-5xl">
                    <Link href="/sales" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-brand-500 transition-colors mb-2">
                        <ArrowLeft size={14} /> Retour aux ventes
                    </Link>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Nouvelle vente</h2>

                    <form onSubmit={submit}>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            {/* Left — product search + cart */}
                            <div className="lg:col-span-2 flex flex-col gap-4">
                                {/* Product search */}
                                <div className={cardCls}>
                                    <h3 className={sectionTitleCls}>Ajouter des produits</h3>
                                    <div className="relative">
                                        <Combobox value={comboValue} onChange={addProduct}>
                                            <ComboboxInput
                                                className={inputCls}
                                                placeholder="Rechercher un produit disponible..."
                                                displayValue={() => comboQuery}
                                                onChange={(e) => setComboQuery(e.target.value)}
                                            />
                                            {comboQuery && (
                                                <ComboboxOptions className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-theme-lg max-h-52 overflow-y-auto">
                                                    {filteredProducts.length === 0 ? (
                                                        <div className="px-3.5 py-3 text-sm text-gray-400">Aucun résultat</div>
                                                    ) : filteredProducts.map((p) => (
                                                        <ComboboxOption
                                                            key={p.id}
                                                            value={p}
                                                            className="px-3.5 py-2.5 cursor-pointer border-b border-gray-50 last:border-0 data-[focus]:bg-gray-50"
                                                        >
                                                            <p className="text-sm font-medium text-gray-900">{p.name}</p>
                                                            <p className="text-xs text-gray-400 mt-0.5">{p.internal_code} — {fmt(p.selling_price)}</p>
                                                        </ComboboxOption>
                                                    ))}
                                                </ComboboxOptions>
                                            )}
                                        </Combobox>
                                    </div>
                                    {errors.products && <p className="text-xs text-error-500 mt-1.5">{errors.products}</p>}
                                </div>

                                {/* Cart */}
                                {selectedItems.length > 0 && (
                                    <div className="bg-white border border-gray-200 rounded-2xl shadow-theme-xs overflow-hidden">
                                        <div className="px-4 py-3 border-b border-gray-100">
                                            <h3 className={sectionTitleCls}>
                                                Produits sélectionnés ({selectedItems.length})
                                            </h3>
                                        </div>
                                        <div>
                                            {selectedItems.map((item) => (
                                                <div key={item.id} className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 last:border-0">
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                                                        <p className="text-xs text-gray-400 mt-0.5">{item.internal_code}</p>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <input
                                                            type="number"
                                                            step="0.01"
                                                            value={item.customPrice}
                                                            onChange={(e) => updatePrice(item.id, e.target.value)}
                                                            className="w-24 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm text-gray-900 text-right focus:outline-none focus:border-brand-300"
                                                        />
                                                        <span className="text-xs text-gray-400">€</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeItem(item.id)}
                                                            className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-error-50 hover:text-error-500 transition-colors"
                                                        >
                                                            <X size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Right col */}
                            <div className="flex flex-col gap-4">
                                {/* Summary */}
                                <div className={cardCls}>
                                    <h3 className={sectionTitleCls}>Récapitulatif</h3>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-500">Sous-total</span>
                                            <span className="text-gray-700 tabular-nums">{fmt(total)}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-500">Remise (%)</span>
                                            <input
                                                type="number" min="0" max="100"
                                                value={data.discount_percentage}
                                                onChange={(e) => setData('discount_percentage', e.target.value)}
                                                className="w-16 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-sm text-gray-900 text-right focus:outline-none focus:border-brand-300"
                                            />
                                        </div>
                                        <div className="flex justify-between items-center text-[15px] font-bold text-gray-900 border-t border-gray-100 pt-2.5 mt-1 tabular-nums">
                                            <span>Total</span>
                                            <span>{fmt(finalAmount)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment */}
                                <div className={cardCls}>
                                    <h3 className={sectionTitleCls}>Paiement</h3>
                                    <div className="flex flex-col gap-3">
                                        <div>
                                            <label className={labelCls}>Client (optionnel)</label>
                                            <select value={data.client_id} onChange={(e) => setData('client_id', e.target.value)} className={inputCls}>
                                                <option value="">Client anonyme</option>
                                                {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className={labelCls}>Méthode de paiement</label>
                                            <select value={data.payment_method} onChange={(e) => setData('payment_method', e.target.value)} className={inputCls}>
                                                <option value="cash">Espèces</option>
                                                <option value="card">Carte</option>
                                                <option value="transfer">Virement</option>
                                                <option value="installment">Versements</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className={labelCls}>Montant payé (€)</label>
                                            <input
                                                type="number" step="0.01"
                                                value={data.paid_amount}
                                                onChange={(e) => setData('paid_amount', e.target.value)}
                                                placeholder={fmt(finalAmount)}
                                                className={inputCls}
                                            />
                                            {errors.paid_amount && <p className="text-xs text-error-500 mt-1">{errors.paid_amount}</p>}
                                        </div>
                                        {remaining > 0 && (
                                            <div className="px-3.5 py-2.5 bg-warning-50 border border-warning-200 rounded-xl">
                                                <p className="text-sm text-warning-700">
                                                    Reste à payer : <strong className="tabular-nums">{fmt(remaining)}</strong>
                                                </p>
                                            </div>
                                        )}
                                        <div>
                                            <label className={labelCls}>Notes</label>
                                            <textarea
                                                value={data.notes}
                                                onChange={(e) => setData('notes', e.target.value)}
                                                rows={2}
                                                className={`${inputCls} resize-none`}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={processing || selectedItems.length === 0}
                                            className="w-full bg-brand-500 text-white rounded-xl py-3 text-sm font-semibold hover:bg-brand-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                        >
                                            {processing ? 'Enregistrement...' : 'Créer la vente'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </AppLayout>
        </>
    )
}
