import { Head } from '@inertiajs/react'
import { useState, useEffect, useRef } from 'react'
import { ScanLine } from 'lucide-react'
import AppLayout from '../../../Layouts/AppLayout'

export default function BarcodeScan() {
    const [code, setCode] = useState('')
    const inputRef = useRef(null)

    useEffect(() => { inputRef.current?.focus() }, [])

    const search = (e) => {
        e.preventDefault()
        if (!code.trim()) return
        window.location.href = `/barcode/${encodeURIComponent(code.trim())}`
    }

    return (
        <>
            <Head title="Scanner un produit" />
            <AppLayout title="Scanner un produit">
                <div className="max-w-sm mx-auto mt-8">
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-theme-xs p-8">
                        {/* Icon */}
                        <div className="w-14 h-14 bg-brand-50 border border-brand-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <ScanLine size={28} className="text-brand-500" strokeWidth={1.5} />
                        </div>

                        {/* Title */}
                        <h2 className="text-base font-bold text-gray-900 text-center mb-2">
                            Scanner un code-barres
                        </h2>
                        <p className="text-sm text-gray-500 text-center mb-6 leading-relaxed">
                            Scannez ou saisissez manuellement un code interne ou code-barres
                        </p>

                        {/* Form */}
                        <form onSubmit={search}>
                            <input
                                ref={inputRef}
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="Code-barres ou code interne..."
                                autoComplete="off"
                                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-300 placeholder:tracking-normal placeholder:text-gray-400"
                            />
                            <button
                                type="submit"
                                className="w-full mt-2.5 bg-brand-500 text-white rounded-xl py-3 text-sm font-semibold hover:bg-brand-600 transition-colors cursor-pointer"
                            >
                                Rechercher
                            </button>
                        </form>

                        <p className="mt-4 text-xs text-gray-400 text-center">
                            Appuyez sur Entrée après le scan pour rechercher automatiquement
                        </p>
                    </div>
                </div>
            </AppLayout>
        </>
    )
}
