import styled from 'styled-components'
import { Head } from '@inertiajs/react'
import { useState, useEffect, useRef } from 'react'
import AppLayout from '../../../Layouts/AppLayout'

/* ── Styled Components ── */
const PageCenter = styled.div`
    max-width: 420px;
    margin: 32px auto 0;
`

const Card = styled.div`
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    padding: 32px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
`

const IconWrap = styled.div`
    width: 56px;
    height: 56px;
    background: #EEF2FF;
    border: 1px solid #C7D2FE;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
`

const CardTitle = styled.h2`
    font-size: 16px;
    font-weight: 700;
    color: #111827;
    text-align: center;
    margin: 0 0 8px;
`

const CardDesc = styled.p`
    font-size: 14px;
    color: #6B7280;
    text-align: center;
    margin: 0 0 24px;
    line-height: 1.5;
`

const ScanInput = styled.input`
    width: 100%;
    box-sizing: border-box;
    background: #FFFFFF;
    border: 1.5px solid #E5E7EB;
    border-radius: 8px;
    padding: 12px 14px;
    font-size: 14px;
    color: #111827;
    text-align: center;
    letter-spacing: 0.08em;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
    &::placeholder { color: #9CA3AF; letter-spacing: 0.02em; }
    &:focus {
        border-color: #6366F1;
        box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
    }
`

const SubmitBtn = styled.button`
    width: 100%;
    background: #6366F1;
    color: #FFFFFF;
    border: none;
    border-radius: 8px;
    padding: 12px 18px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 10px;
    box-shadow: 0 1px 2px rgba(99,102,241,0.3);
    transition: background 0.15s;
    &:hover { background: #4F46E5; }
`

const HintText = styled.p`
    margin-top: 16px;
    font-size: 12px;
    color: #9CA3AF;
    text-align: center;
`

export default function BarcodeScan() {
    const [code, setCode] = useState('')
    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    const search = (e) => {
        e.preventDefault()
        if (!code.trim()) return
        window.location.href = `/barcode/${encodeURIComponent(code.trim())}`
    }

    return (
        <>
            <Head title="Scanner un produit" />
            <AppLayout title="Scanner un produit">
                <PageCenter>
                    <Card>
                        <IconWrap>
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5z" />
                                <path d="M3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5z" />
                                <path d="M13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                                <path d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
                            </svg>
                        </IconWrap>
                        <CardTitle>Scanner un code-barres</CardTitle>
                        <CardDesc>
                            Scannez ou saisissez manuellement un code interne ou code-barres
                        </CardDesc>
                        <form onSubmit={search}>
                            <ScanInput
                                ref={inputRef}
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="Code-barres ou code interne..."
                                autoComplete="off"
                            />
                            <SubmitBtn type="submit">Rechercher</SubmitBtn>
                        </form>
                        <HintText>Appuyez sur Entrée après le scan pour rechercher automatiquement</HintText>
                    </Card>
                </PageCenter>
            </AppLayout>
        </>
    )
}
