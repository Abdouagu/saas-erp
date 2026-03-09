import { useState } from 'react'
import { Head, useForm, Link } from '@inertiajs/react'
import { Camera } from 'lucide-react'
import AppLayout from '../../../Layouts/AppLayout'

/* ── Static data ──────────────────────────────────────────────────────────── */
const PHONE_BRANDS = {
    Apple:    ['iPhone 11','iPhone 12','iPhone 12 Pro','iPhone 12 Pro Max','iPhone 13','iPhone 13 Pro','iPhone 13 Pro Max','iPhone 14','iPhone 14 Plus','iPhone 14 Pro','iPhone 14 Pro Max','iPhone 15','iPhone 15 Plus','iPhone 15 Pro','iPhone 15 Pro Max','iPhone 16','iPhone 16 Plus','iPhone 16 Pro','iPhone 16 Pro Max'],
    Samsung:  ['Galaxy S21','Galaxy S21+','Galaxy S21 Ultra','Galaxy S22','Galaxy S22 Ultra','Galaxy S23','Galaxy S23 Ultra','Galaxy S24','Galaxy S24 Ultra','Galaxy A14','Galaxy A24','Galaxy A34','Galaxy A54','Galaxy A15','Galaxy A25','Galaxy A35','Galaxy A55','Galaxy M14','Galaxy M34'],
    Xiaomi:   ['Xiaomi 12','Xiaomi 13','Xiaomi 14','Redmi Note 10','Redmi Note 11','Redmi Note 12','Redmi Note 13','Redmi 12','POCO X5','POCO X6','POCO F5','POCO M5'],
    Oppo:     ['Oppo A57','Oppo A77','Oppo A96','Oppo Reno8','Oppo Reno10','Oppo Find X5','Oppo Find X6'],
    Huawei:   ['P30','P40','P50','Mate 40','Mate 50','Nova 9','Nova 10','Nova 11'],
    Infinix:  ['Hot 20','Hot 30','Hot 40','Note 30','Smart 7','Zero 30'],
    Tecno:    ['Spark 10','Spark 20','Camon 20','Pova 5','Pop 7'],
    Google:   ['Pixel 6','Pixel 6a','Pixel 7','Pixel 7a','Pixel 8','Pixel 8a','Pixel 9'],
    OnePlus:  ['OnePlus 10','OnePlus 11','OnePlus 12','OnePlus Nord 3','OnePlus Nord CE 3'],
    Nokia:    ['Nokia G21','Nokia G42','Nokia XR21','Nokia C32'],
    Motorola: ['Moto G52','Moto G62','Moto G73','Moto G84','Edge 30','Edge 40'],
    Sony:     ['Xperia 1 IV','Xperia 5 IV','Xperia 10 IV','Xperia 1 V','Xperia 5 V'],
}

const PC_BRANDS = {
    Apple:     ['MacBook Air M1','MacBook Air M2','MacBook Air M3','MacBook Pro 13"','MacBook Pro 14"','MacBook Pro 16"'],
    Dell:      ['XPS 13','XPS 15','Inspiron 15','Latitude 5420','Latitude 7420'],
    HP:        ['EliteBook 840','ProBook 450','Pavilion 15','Spectre x360','Envy x360'],
    Lenovo:    ['ThinkPad X1 Carbon','ThinkPad T14','IdeaPad 5','Yoga 7','Legion 5'],
    Asus:      ['ZenBook 14','VivoBook 15','ROG Zephyrus G14','ProArt Studiobook'],
    Acer:      ['Swift 3','Aspire 5','Predator Helios 300','Nitro 5'],
    Microsoft: ['Surface Laptop 5','Surface Pro 9','Surface Book 3'],
    MSI:       ['Titan GT77','Vector GP66','Stealth 15'],
}

const COLORS = ['Noir','Blanc','Bleu','Rouge','Vert','Gris','Or','Argent','Violet','Rose','Jaune','Orange','Bordeaux']
const PHONE_STORAGE = ['32GB','64GB','128GB','256GB','512GB','1TB']
const PC_STORAGE    = ['128GB SSD','256GB SSD','512GB SSD','1TB SSD','2TB SSD','512GB HDD','1TB HDD','2TB HDD']

/* ── Shared class strings ──────────────────────────────────────────────────── */
const inputCls   = 'w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-300 bg-white text-gray-900 placeholder:text-gray-400'
const labelCls   = 'block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5'
const cardCls    = 'bg-white border border-gray-200 rounded-2xl p-6 shadow-theme-xs'
const sectionCls = 'text-xs font-semibold uppercase tracking-wide text-gray-400 mb-4 pb-2 border-b border-gray-100'

/* ── Field helper ─────────────────────────────────────────────────────────── */
const Field = ({ label, error, children }) => (
    <div className="flex flex-col">
        <label className={labelCls}>{label}</label>
        {children}
        {error && <p className="text-xs text-error-500 mt-1">{error}</p>}
    </div>
)

/* ── Component ────────────────────────────────────────────────────────────── */
export default function ProductCreate({ product }) {
    const isEdit = !!product

    const { data, setData, post, put, processing, errors } = useForm({
        category:           product?.category ?? 'phone',
        brand:              product?.brand ?? '',
        name:               product?.name ?? '',
        serial_number:      product?.serial_number ?? '',
        battery_percentage: product?.battery_percentage ?? '',
        storage:            product?.storage ?? '',
        color:              product?.color ?? '',
        condition:          product?.condition ?? 'used',
        purchase_price:     product?.purchase_price ?? '',
        selling_price:      product?.selling_price ?? '',
        photo:              null,
    })

    const [preview, setPreview]         = useState(product?.photo_url ?? null)
    const [customModel, setCustomModel] = useState(false)

    const BRANDS     = data.category === 'phone' ? PHONE_BRANDS : PC_BRANDS
    const brandList  = Object.keys(BRANDS)
    const modelList  = data.brand && BRANDS[data.brand] ? [...BRANDS[data.brand], 'Autre'] : []
    const storageList = data.category === 'phone' ? PHONE_STORAGE : PC_STORAGE

    const handleCategory = (val) => {
        setData(d => ({ ...d, category: val, brand: '', name: '' }))
        setCustomModel(false)
    }
    const handleBrand = (val) => {
        setData(d => ({ ...d, brand: val, name: '' }))
        setCustomModel(false)
    }
    const handleModel = (val) => {
        if (val === 'Autre') { setCustomModel(true); setData('name', '') }
        else { setCustomModel(false); setData('name', val) }
    }
    const handlePhoto = (e) => {
        const file = e.target.files[0]
        if (!file) return
        setData('photo', file)
        setPreview(URL.createObjectURL(file))
    }

    const profit     = (parseFloat(data.selling_price) || 0) - (parseFloat(data.purchase_price) || 0)
    const showProfit = data.purchase_price !== '' && data.selling_price !== ''

    const submit = (e) => {
        e.preventDefault()
        isEdit ? put(`/products/${product.id}`) : post('/products')
    }

    return (
        <>
            <Head title={isEdit ? 'Modifier produit' : 'Nouveau produit'} />
            <AppLayout title={isEdit ? `Modifier : ${product.name}` : 'Nouveau produit'}>
                <div className="max-w-2xl flex flex-col gap-4">

                    {/* Page header */}
                    <div>
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-1 text-sm text-gray-400 no-underline mb-2 hover:text-brand-500 transition-colors"
                        >
                            ← Retour aux produits
                        </Link>
                        <h2 className="text-xl font-bold text-gray-900 m-0">
                            {isEdit ? `Modifier : ${product.name}` : 'Ajouter un produit'}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1 mb-0">
                            {isEdit ? 'Modifiez les informations du produit' : 'Remplissez les informations du nouveau produit'}
                        </p>
                    </div>

                    <form onSubmit={submit} encType="multipart/form-data" className="flex flex-col gap-4">

                        {/* Section 1 — Identification */}
                        <div className={cardCls}>
                            <p className={sectionCls}>1 — Identification</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Field label="Catégorie" error={errors.category}>
                                    <select value={data.category} onChange={(e) => handleCategory(e.target.value)} className={inputCls}>
                                        <option value="phone">Téléphone</option>
                                        <option value="pc">PC / Laptop</option>
                                    </select>
                                </Field>
                                <Field label="État" error={errors.condition}>
                                    <select value={data.condition} onChange={(e) => setData('condition', e.target.value)} className={inputCls}>
                                        <option value="used">Occasion</option>
                                        <option value="new">Neuf</option>
                                    </select>
                                </Field>
                            </div>
                        </div>

                        {/* Section 2 — Appareil */}
                        <div className={cardCls}>
                            <p className={sectionCls}>2 — Appareil</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Field label="Marque" error={errors.brand}>
                                    <select value={data.brand} onChange={(e) => handleBrand(e.target.value)} className={inputCls}>
                                        <option value="">-- Choisir une marque --</option>
                                        {brandList.map(b => <option key={b} value={b}>{b}</option>)}
                                    </select>
                                </Field>
                                <Field label="Modèle" error={errors.name}>
                                    {(!data.brand || customModel) ? (
                                        <input
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder={data.brand ? 'Saisir le modèle...' : "Choisir d'abord une marque"}
                                            autoComplete="off"
                                            className={inputCls}
                                        />
                                    ) : (
                                        <select
                                            value={modelList.includes(data.name) ? data.name : (data.name ? 'Autre' : '')}
                                            onChange={(e) => handleModel(e.target.value)}
                                            className={inputCls}
                                        >
                                            <option value="">-- Choisir un modèle --</option>
                                            {modelList.map(m => <option key={m} value={m}>{m}</option>)}
                                        </select>
                                    )}
                                </Field>
                            </div>
                        </div>

                        {/* Section 3 — Caractéristiques */}
                        <div className={cardCls}>
                            <p className={sectionCls}>3 — Caractéristiques</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Field label={data.category === 'phone' ? 'IMEI / N° Série' : 'N° Série'} error={errors.serial_number}>
                                    <input value={data.serial_number} onChange={(e) => setData('serial_number', e.target.value)} placeholder="Ex: 359876543210987" className={inputCls} />
                                </Field>
                                <Field label="Couleur" error={errors.color}>
                                    <select value={data.color} onChange={(e) => setData('color', e.target.value)} className={inputCls}>
                                        <option value="">-- Couleur --</option>
                                        {COLORS.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </Field>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                <Field label="Stockage" error={errors.storage}>
                                    <select value={data.storage} onChange={(e) => setData('storage', e.target.value)} className={inputCls}>
                                        <option value="">-- Stockage --</option>
                                        {storageList.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </Field>
                                {data.category === 'phone' && (
                                    <Field label="Batterie (%)" error={errors.battery_percentage}>
                                        <input type="number" min="0" max="100" value={data.battery_percentage} onChange={(e) => setData('battery_percentage', e.target.value)} placeholder="Ex: 85" className={inputCls} />
                                    </Field>
                                )}
                            </div>
                        </div>

                        {/* Section 4 — Photo */}
                        <div className={cardCls}>
                            <p className={sectionCls}>4 — Photo</p>
                            {preview ? (
                                <label className="block cursor-pointer">
                                    <img src={preview} alt="preview" className="object-cover rounded-xl h-40 w-full" />
                                    <p className="text-xs text-gray-400 text-center mt-2">Cliquer pour changer la photo</p>
                                    <input type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
                                </label>
                            ) : (
                                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-brand-400 hover:bg-brand-50/30 transition-colors">
                                    <Camera size={24} className="text-gray-400 mb-2" />
                                    <span className="text-sm text-gray-500">Cliquer pour télécharger</span>
                                    <input type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
                                </label>
                            )}
                            {errors.photo && <p className="text-xs text-error-500 mt-1">{errors.photo}</p>}
                        </div>

                        {/* Section 5 — Prix */}
                        <div className={cardCls}>
                            <p className={sectionCls}>5 — Prix</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Field label="Prix d'achat (€)" error={errors.purchase_price}>
                                    <input type="number" step="0.01" value={data.purchase_price} onChange={(e) => setData('purchase_price', e.target.value)} placeholder="0.00" className={inputCls} />
                                </Field>
                                <Field label="Prix de vente (€)" error={errors.selling_price}>
                                    <input type="number" step="0.01" value={data.selling_price} onChange={(e) => setData('selling_price', e.target.value)} placeholder="0.00" className={inputCls} />
                                </Field>
                            </div>
                            {showProfit && (
                                <div className={`inline-flex items-center gap-1 mt-3 px-3 py-1.5 rounded-full text-sm font-semibold ${profit >= 0 ? 'bg-success-50 text-success-700' : 'bg-error-50 text-error-600'}`}>
                                    {profit >= 0 ? '▲' : '▼'} Profit : {profit >= 0 ? '+' : ''}{profit.toFixed(2)} €
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2.5 pt-1">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 bg-brand-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-brand-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Enregistrement...' : (isEdit ? 'Sauvegarder' : 'Ajouter le produit')}
                            </button>
                            <Link
                                href="/products"
                                className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors no-underline"
                            >
                                Annuler
                            </Link>
                        </div>
                    </form>
                </div>
            </AppLayout>
        </>
    )
}
