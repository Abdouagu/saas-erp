import { Head, useForm, router } from '@inertiajs/react'
import { useState, useRef } from 'react'
import { Camera, Trash2, Settings } from 'lucide-react'
import AppLayout from '../../../Layouts/AppLayout'

const labelCls = 'block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5'
const inputCls = 'w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-300 transition-colors'

export default function SettingsIndex({ vendor }) {
    const fileRef = useRef(null)
    const [preview, setPreview] = useState(
        vendor.logo ? `/storage/${vendor.logo}` : null
    )

    const { data, setData, post, processing, errors } = useForm({
        shop_name: vendor.shop_name ?? '',
        phone:     vendor.phone ?? '',
        address:   vendor.address ?? '',
        logo:      null,
        _method:   'POST',
    })

    const handleLogo = (e) => {
        const file = e.target.files[0]
        if (!file) return
        setData('logo', file)
        setPreview(URL.createObjectURL(file))
    }

    const submit = (e) => {
        e.preventDefault()
        post('/settings', { forceFormData: true })
    }

    const deleteLogo = () => {
        if (!confirm('Supprimer le logo ?')) return
        router.delete('/settings/logo', {
            onSuccess: () => setPreview(null),
        })
    }

    return (
        <>
            <Head title="Paramètres" />
            <AppLayout title="Paramètres">
                <div className="max-w-xl flex flex-col gap-6">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Paramètres</h2>
                        <p className="text-sm text-gray-500 mt-1">Personnalisez votre boutique</p>
                    </div>

                    <form onSubmit={submit} encType="multipart/form-data">
                        <div className="flex flex-col gap-5">

                            {/* Logo */}
                            <div className="bg-white border border-gray-200 rounded-2xl shadow-theme-xs p-6">
                                <h3 className="text-sm font-semibold text-gray-900 mb-4">Logo de la boutique</h3>
                                <div className="flex items-center gap-5">
                                    <div className="relative w-24 h-24 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                                        {preview ? (
                                            <img src={preview} alt="Logo" className="w-full h-full object-contain p-1" />
                                        ) : (
                                            <Camera size={28} className="text-gray-300" />
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <button
                                            type="button"
                                            onClick={() => fileRef.current?.click()}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500 text-white text-sm font-semibold rounded-lg hover:bg-brand-600 transition-colors cursor-pointer"
                                        >
                                            <Camera size={14} />
                                            {preview ? 'Changer' : 'Ajouter un logo'}
                                        </button>
                                        {preview && vendor.logo && (
                                            <button
                                                type="button"
                                                onClick={deleteLogo}
                                                className="inline-flex items-center gap-2 px-4 py-2 text-sm text-error-500 border border-error-200 rounded-lg hover:bg-error-50 transition-colors cursor-pointer"
                                            >
                                                <Trash2 size={13} />
                                                Supprimer
                                            </button>
                                        )}
                                        <p className="text-xs text-gray-400">PNG, JPG, WEBP — max 2 Mo</p>
                                    </div>
                                    <input
                                        ref={fileRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleLogo}
                                        className="hidden"
                                    />
                                </div>
                                {errors.logo && <p className="text-xs text-error-500 mt-2">{errors.logo}</p>}
                            </div>

                            {/* Infos boutique */}
                            <div className="bg-white border border-gray-200 rounded-2xl shadow-theme-xs p-6">
                                <h3 className="text-sm font-semibold text-gray-900 mb-4">Informations boutique</h3>
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <label className={labelCls}>Nom de la boutique</label>
                                        <input
                                            value={data.shop_name}
                                            onChange={(e) => setData('shop_name', e.target.value)}
                                            placeholder="Ma Boutique Tech"
                                            className={inputCls}
                                        />
                                        {errors.shop_name && <p className="text-xs text-error-500 mt-1">{errors.shop_name}</p>}
                                    </div>
                                    <div>
                                        <label className={labelCls}>Téléphone</label>
                                        <input
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            placeholder="+212 6 00 00 00 00"
                                            className={inputCls}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelCls}>Adresse</label>
                                        <textarea
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                            rows={2}
                                            placeholder="Adresse de la boutique..."
                                            className={`${inputCls} resize-none`}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-2.5 bg-brand-500 text-white text-sm font-semibold rounded-xl hover:bg-brand-600 transition-colors disabled:opacity-50 cursor-pointer"
                            >
                                {processing ? 'Sauvegarde...' : 'Sauvegarder les paramètres'}
                            </button>
                        </div>
                    </form>
                </div>
            </AppLayout>
        </>
    )
}
