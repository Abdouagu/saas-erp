import { Head, Link, useForm } from '@inertiajs/react'
import { ArrowLeft } from 'lucide-react'
import AdminLayout from '../../../Layouts/AdminLayout'

const labelCls = 'block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5'

const Field = ({ label, error, children }) => (
    <div className="flex flex-col">
        <label className={labelCls}>{label}</label>
        {children}
        {error && <p className="text-xs text-error-500 mt-1.5">{error}</p>}
    </div>
)

export default function VendorEdit({ vendor }) {
    const { data, setData, put, processing, errors } = useForm({
        name: vendor.name,
        email: vendor.email,
        password: '',
        password_confirmation: '',
        phone: vendor.phone ?? '',
        address: vendor.address ?? '',
    })

    const submit = (e) => {
        e.preventDefault()
        put(`/superadmin/vendors/${vendor.id}`)
    }

    const inputCls = (hasError) =>
        `w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-300 transition-colors ${
            hasError ? 'border-error-400' : 'border-gray-200'
        }`

    return (
        <>
            <Head title={`Modifier ${vendor.name}`} />
            <AdminLayout title="Modifier un vendeur">
                <div className="max-w-xl flex flex-col gap-5">
                    <div>
                        <Link
                            href="/superadmin/vendors"
                            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-orange-500 transition-colors mb-3"
                        >
                            <ArrowLeft size={14} />
                            Retour aux vendeurs
                        </Link>
                        <div className="flex items-center gap-3.5">
                            <div className="w-11 h-11 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-lg font-bold text-orange-700 flex-shrink-0">
                                {vendor.name[0]?.toUpperCase()}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 leading-tight">{vendor.name}</h2>
                                <p className="text-sm text-gray-500">{vendor.email}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl shadow-theme-xs p-6">
                        <form onSubmit={submit}>
                            <div className="flex flex-col gap-4">
                                <Field label="Nom complet" error={errors.name}>
                                    <input
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className={inputCls(!!errors.name)}
                                    />
                                </Field>

                                <Field label="Email" error={errors.email}>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className={inputCls(!!errors.email)}
                                    />
                                </Field>

                                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col gap-3.5">
                                    <p className="text-xs text-gray-400">
                                        Laisser vide pour conserver le mot de passe actuel
                                    </p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Field label="Nouveau mot de passe" error={errors.password}>
                                            <input
                                                type="password"
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                placeholder="••••••••"
                                                className={inputCls(!!errors.password)}
                                            />
                                        </Field>
                                        <Field label="Confirmer" error={errors.password_confirmation}>
                                            <input
                                                type="password"
                                                value={data.password_confirmation}
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                placeholder="••••••••"
                                                className={inputCls(!!errors.password_confirmation)}
                                            />
                                        </Field>
                                    </div>
                                </div>

                                <Field label="Téléphone" error={errors.phone}>
                                    <input
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className={inputCls(!!errors.phone)}
                                    />
                                </Field>

                                <Field label="Adresse" error={errors.address}>
                                    <textarea
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        rows={3}
                                        className={`${inputCls(!!errors.address)} resize-none`}
                                    />
                                </Field>

                                <div className="flex items-center gap-3 pt-1">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-5 py-2.5 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 cursor-pointer"
                                    >
                                        {processing ? 'Sauvegarde...' : 'Sauvegarder'}
                                    </button>
                                    <Link
                                        href="/superadmin/vendors"
                                        className="px-5 py-2.5 bg-gray-100 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                                    >
                                        Annuler
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </AdminLayout>
        </>
    )
}
