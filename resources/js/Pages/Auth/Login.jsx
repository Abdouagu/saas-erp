import { Head, useForm } from '@inertiajs/react'
import { motion } from 'framer-motion'

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    })

    const submit = (e) => {
        e.preventDefault()
        post('/login')
    }

    const inputCls = (hasError) =>
        `w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-300 transition-colors ${
            hasError ? 'border-error-400' : 'border-gray-200'
        }`

    return (
        <>
            <Head title="Connexion" />
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 relative overflow-hidden">
                {/* Decorative background glow */}
                <div
                    className="absolute rounded-full pointer-events-none"
                    style={{ width: '500px', height: '500px', top: '-150px', left: '-130px', background: 'rgba(70,95,255,0.06)', filter: 'blur(80px)' }}
                />
                <div
                    className="absolute rounded-full pointer-events-none"
                    style={{ width: '380px', height: '380px', bottom: '-100px', right: '-90px', background: 'rgba(70,95,255,0.04)', filter: 'blur(80px)' }}
                />

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative z-10 w-full max-w-sm bg-white border border-gray-200 rounded-2xl shadow-theme-xl p-10"
                >
                    {/* Logo */}
                    <div className="flex items-center gap-3 mb-7">
                        <div className="w-11 h-11 bg-brand-500 rounded-xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0 shadow-lg shadow-brand-500/20">
                            E
                        </div>
                        <div>
                            <div className="text-base font-bold text-gray-900 leading-tight">ERP SaaS</div>
                            <div className="text-xs text-gray-400 mt-0.5">Gestion d'entreprise</div>
                        </div>
                    </div>

                    <h1 className="text-xl font-bold text-gray-900 mb-1">Connexion</h1>
                    <p className="text-sm text-gray-500 mb-7">Bienvenue, entrez vos identifiants</p>

                    <form onSubmit={submit} noValidate>
                        {/* Email */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5">
                                Adresse e-mail
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="vous@exemple.com"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                autoFocus
                                autoComplete="email"
                                className={inputCls(!!errors.email)}
                            />
                            {errors.email && <p className="text-xs text-error-500 mt-1.5">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5">
                                Mot de passe
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                autoComplete="current-password"
                                className={inputCls(!!errors.password)}
                            />
                            {errors.password && <p className="text-xs text-error-500 mt-1.5">{errors.password}</p>}
                        </div>

                        {/* Remember me */}
                        <label className="flex items-center gap-2 mb-6 cursor-pointer select-none text-sm text-gray-500">
                            <input
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="w-4 h-4 accent-brand-500 cursor-pointer flex-shrink-0 rounded"
                            />
                            Se souvenir de moi
                        </label>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full inline-flex items-center justify-center gap-2 bg-brand-500 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-brand-600 transition-colors shadow-md shadow-brand-500/20 disabled:opacity-50 cursor-pointer"
                        >
                            {processing && (
                                <svg className="animate-spin w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                                    <path d="M12 2a10 10 0 0 1 10 10" />
                                </svg>
                            )}
                            {processing ? 'Connexion...' : 'Se connecter'}
                        </button>
                    </form>
                </motion.div>
            </div>
        </>
    )
}
