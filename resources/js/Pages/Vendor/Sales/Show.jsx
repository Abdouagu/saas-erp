import styled from 'styled-components'
import { Head, Link, useForm } from '@inertiajs/react'
import { useState } from 'react'
import AppLayout from '../../../Layouts/AppLayout'
import Badge from '../../../Components/Badge'
import Modal from '../../../Components/Modal'

const fmt = (n) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n)
const statusMap = { paid: 'success', partial: 'warning', pending: 'danger' }
const statusLabel = { paid: 'Payée', partial: 'Partielle', pending: 'En attente' }

/* ── Styled Components ── */
const PageWrapper = styled.div`
    max-width: 1024px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`

const HeaderRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
`

const BackLink = styled(Link)`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 13px;
    color: #9CA3AF;
    text-decoration: none;
    margin-right: 4px;
    transition: color 0.15s;
    &:hover { color: #6366F1; }
`

const PayBtn = styled.button`
    padding: 7px 14px;
    background: #059669;
    color: #FFFFFF;
    font-size: 13px;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.15s;
    &:hover { background: #047857; }
`

const PdfLink = styled.a`
    margin-left: auto;
    padding: 7px 14px;
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
    color: #374151;
    font-size: 13px;
    font-weight: 500;
    border-radius: 8px;
    text-decoration: none;
    transition: background 0.15s;
    &:hover { background: #F9FAFB; }
`

const Grid3 = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    @media (min-width: 1024px) {
        grid-template-columns: 2fr 1fr;
    }
`

const Card = styled.div`
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
`

const CardHeader = styled.div`
    padding: 16px 20px;
    border-bottom: 1px solid #E5E7EB;
`

const CardTitle = styled.h3`
    font-size: 14px;
    font-weight: 600;
    color: #111827;
    margin: 0;
`

const ItemRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 20px;
    border-bottom: 1px solid #F3F4F6;
    &:last-child { border-bottom: none; }
`

const ItemName = styled.p`
    font-size: 14px;
    font-weight: 500;
    color: #111827;
    margin: 0;
`

const ItemSub = styled.p`
    font-size: 12px;
    color: #9CA3AF;
    margin: 2px 0 0;
`

const ItemPrice = styled.span`
    font-size: 14px;
    font-weight: 600;
    color: #111827;
    font-variant-numeric: tabular-nums;
`

const RightCol = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`

const SummaryCard = styled.div`
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
`

const SummaryCardTitle = styled.h3`
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #9CA3AF;
    margin: 0 0 12px;
`

const SummaryRows = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`

const SRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
`

const SLabel = styled.span`
    color: #6B7280;
`

const SValue = styled.span`
    color: #374151;
    font-variant-numeric: tabular-nums;
`

const STotalRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    font-weight: 700;
    color: #111827;
    border-top: 1px solid #E5E7EB;
    padding-top: 10px;
    margin-top: 4px;
    font-variant-numeric: tabular-nums;
`

const SPaidRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #059669;
    font-variant-numeric: tabular-nums;
`

const SRemainingRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    color: #D97706;
    font-variant-numeric: tabular-nums;
`

const DiscountRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #D97706;
    font-variant-numeric: tabular-nums;
`

const PaymentsCard = styled.div`
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
`

const PaymentRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 16px;
    border-bottom: 1px solid #F3F4F6;
    &:last-child { border-bottom: none; }
`

const PaymentDate = styled.span`
    font-size: 12px;
    color: #9CA3AF;
`

const PaymentAmount = styled.span`
    font-size: 14px;
    font-weight: 600;
    color: #059669;
    font-variant-numeric: tabular-nums;
`

/* ── Modal Form ── */
const FormStack = styled.div`
    display: flex;
    flex-direction: column;
    gap: 14px;
`

const FieldWrap = styled.div``

const Label = styled.label`
    display: block;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #9CA3AF;
    margin-bottom: 6px;
`

const Input = styled.input`
    width: 100%;
    box-sizing: border-box;
    background: #FFFFFF;
    border: 1.5px solid #E5E7EB;
    border-radius: 8px;
    padding: 10px 14px;
    font-size: 14px;
    color: #111827;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
    &::placeholder { color: #9CA3AF; }
    &:focus {
        border-color: #6366F1;
        box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
    }
`

const ErrorMsg = styled.p`
    font-size: 12px;
    color: #EF4444;
    margin: 4px 0 0;
`

const BtnRow = styled.div`
    display: flex;
    gap: 10px;
    padding-top: 4px;
`

const SubmitBtn = styled.button`
    padding: 10px 20px;
    background: #059669;
    color: #FFFFFF;
    font-size: 14px;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.15s;
    &:hover:not(:disabled) { background: #047857; }
    &:disabled { opacity: 0.5; cursor: not-allowed; }
`

const CancelBtn = styled.button`
    padding: 10px 20px;
    background: #F3F4F6;
    color: #6B7280;
    font-size: 14px;
    font-weight: 500;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
    &:hover { background: #E5E7EB; color: #111827; }
`

const Field = ({ label, error, children }) => (
    <FieldWrap>
        <Label>{label}</Label>
        {children}
        {error && <ErrorMsg>{error}</ErrorMsg>}
    </FieldWrap>
)

export default function SaleShow({ sale }) {
    const [showPayment, setShowPayment] = useState(false)
    const { data, setData, post, processing, errors, reset } = useForm({
        sale_id: sale.id,
        amount: '',
        payment_date: new Date().toISOString().split('T')[0],
        notes: '',
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
                <PageWrapper>
                    <HeaderRow>
                        <BackLink href="/sales">← Retour</BackLink>
                        <Badge variant={statusMap[sale.status]}>{statusLabel[sale.status]}</Badge>
                        {sale.status !== 'paid' && (
                            <PayBtn onClick={() => setShowPayment(true)}>
                                + Enregistrer paiement
                            </PayBtn>
                        )}
                        <PdfLink href={`/sales/${sale.id}/invoice/pdf`} target="_blank">
                            Facture PDF
                        </PdfLink>
                    </HeaderRow>

                    <Grid3>
                        <Card>
                            <CardHeader>
                                <CardTitle>Articles ({sale.items?.length ?? 0})</CardTitle>
                            </CardHeader>
                            <div>
                                {sale.items?.map((item) => (
                                    <ItemRow key={item.id}>
                                        <div>
                                            <ItemName>{item.product?.name}</ItemName>
                                            <ItemSub>{item.product?.internal_code} · {item.product?.category}</ItemSub>
                                        </div>
                                        <ItemPrice>{fmt(item.price)}</ItemPrice>
                                    </ItemRow>
                                ))}
                            </div>
                        </Card>

                        <RightCol>
                            <SummaryCard>
                                <SummaryCardTitle>Résumé</SummaryCardTitle>
                                <SummaryRows>
                                    <SRow>
                                        <SLabel>Client</SLabel>
                                        <SValue style={{ fontWeight: 500, color: '#111827' }}>
                                            {sale.client?.name ?? 'Anonyme'}
                                        </SValue>
                                    </SRow>
                                    <SRow>
                                        <SLabel>Sous-total</SLabel>
                                        <SValue>{fmt(sale.total_amount)}</SValue>
                                    </SRow>
                                    {sale.discount_percentage > 0 && (
                                        <DiscountRow>
                                            <span>Remise ({sale.discount_percentage}%)</span>
                                            <span>-{fmt(sale.total_amount * sale.discount_percentage / 100)}</span>
                                        </DiscountRow>
                                    )}
                                    <STotalRow>
                                        <span>Total</span>
                                        <span>{fmt(sale.final_amount)}</span>
                                    </STotalRow>
                                    <SPaidRow>
                                        <span>Payé</span>
                                        <span>{fmt(sale.paid_amount)}</span>
                                    </SPaidRow>
                                    {remaining > 0 && (
                                        <SRemainingRow>
                                            <span>Restant</span>
                                            <span>{fmt(remaining)}</span>
                                        </SRemainingRow>
                                    )}
                                </SummaryRows>
                            </SummaryCard>

                            {sale.payments?.length > 0 && (
                                <PaymentsCard>
                                    <CardHeader>
                                        <SummaryCardTitle style={{ margin: 0 }}>Paiements</SummaryCardTitle>
                                    </CardHeader>
                                    <div>
                                        {sale.payments.map((p) => (
                                            <PaymentRow key={p.id}>
                                                <PaymentDate>{p.payment_date}</PaymentDate>
                                                <PaymentAmount>{fmt(p.amount)}</PaymentAmount>
                                            </PaymentRow>
                                        ))}
                                    </div>
                                </PaymentsCard>
                            )}
                        </RightCol>
                    </Grid3>
                </PageWrapper>

                <Modal show={showPayment} onClose={() => setShowPayment(false)} title="Enregistrer un paiement">
                    <form onSubmit={submitPayment}>
                        <FormStack>
                            <Field label={`Montant (max: ${fmt(remaining)})`} error={errors.amount}>
                                <Input
                                    type="number"
                                    step="0.01"
                                    max={remaining}
                                    value={data.amount}
                                    onChange={(e) => setData('amount', e.target.value)}
                                    placeholder="0.00"
                                />
                            </Field>
                            <Field label="Date de paiement" error={errors.payment_date}>
                                <Input
                                    type="date"
                                    value={data.payment_date}
                                    onChange={(e) => setData('payment_date', e.target.value)}
                                />
                            </Field>
                            <Field label="Notes" error={errors.notes}>
                                <Input
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    placeholder="Optionnel..."
                                />
                            </Field>
                            <BtnRow>
                                <SubmitBtn type="submit" disabled={processing}>
                                    {processing ? 'Enregistrement...' : 'Enregistrer'}
                                </SubmitBtn>
                                <CancelBtn type="button" onClick={() => setShowPayment(false)}>
                                    Annuler
                                </CancelBtn>
                            </BtnRow>
                        </FormStack>
                    </form>
                </Modal>
            </AppLayout>
        </>
    )
}
