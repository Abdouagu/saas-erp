import styled from 'styled-components'
import { Head, useForm, Link } from '@inertiajs/react'
import { useState } from 'react'
import AppLayout from '../../../Layouts/AppLayout'

const fmt = (n) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n)

/* ── Styled Components ── */
const PageWrapper = styled.div`
    max-width: 1024px;
`

const BackLink = styled(Link)`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 13px;
    color: #9CA3AF;
    text-decoration: none;
    margin-bottom: 8px;
    transition: color 0.15s;
    &:hover { color: #6366F1; }
`

const PageTitle = styled.h2`
    font-size: 20px;
    font-weight: 700;
    color: #111827;
    margin: 0 0 16px;
`

const GridLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    @media (min-width: 1024px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
`

const LeftCol = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    @media (min-width: 1024px) {
        grid-column: span 2;
    }
`

const RightCol = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

const Card = styled.div`
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
`

const CardTitle = styled.h3`
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #9CA3AF;
    margin: 0 0 12px;
`

const SearchInput = styled.input`
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

const Dropdown = styled.div`
    margin-top: 8px;
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    max-height: 200px;
    overflow-y: auto;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
`

const DropdownItem = styled.button`
    width: 100%;
    text-align: left;
    padding: 10px 14px;
    background: none;
    border: none;
    border-bottom: 1px solid #F3F4F6;
    cursor: pointer;
    transition: background 0.15s;
    &:last-child { border-bottom: none; }
    &:hover { background: #F9FAFB; }
`

const DropdownItemName = styled.p`
    font-size: 14px;
    color: #111827;
    font-weight: 500;
    margin: 0;
`

const DropdownItemSub = styled.p`
    font-size: 12px;
    color: #9CA3AF;
    margin: 2px 0 0;
`

const DropdownEmpty = styled.p`
    padding: 12px 14px;
    font-size: 14px;
    color: #9CA3AF;
    margin: 0;
`

const ErrorMsg = styled.p`
    font-size: 12px;
    color: #EF4444;
    margin: 6px 0 0;
`

const SelectedCard = styled.div`
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
`

const SelectedHeader = styled.div`
    padding: 12px 16px;
    border-bottom: 1px solid #E5E7EB;
`

const SelectedTitle = styled.h3`
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #9CA3AF;
    margin: 0;
`

const SelectedItem = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border-bottom: 1px solid #F3F4F6;
    &:last-child { border-bottom: none; }
`

const ItemInfo = styled.div`
    flex: 1;
    min-width: 0;
`

const ItemName = styled.p`
    font-size: 14px;
    color: #111827;
    font-weight: 500;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const ItemCode = styled.p`
    font-size: 12px;
    color: #9CA3AF;
    margin: 2px 0 0;
`

const PriceInput = styled.input`
    width: 100px;
    background: #F9FAFB;
    border: 1.5px solid #E5E7EB;
    border-radius: 6px;
    padding: 6px 10px;
    font-size: 14px;
    color: #111827;
    text-align: right;
    outline: none;
    &:focus { border-color: #6366F1; }
`

const CurrencyLabel = styled.span`
    font-size: 12px;
    color: #9CA3AF;
`

const RemoveBtn = styled.button`
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    color: #9CA3AF;
    border-radius: 6px;
    font-size: 18px;
    transition: background 0.15s, color 0.15s;
    margin-left: 4px;
    &:hover { background: #FEF2F2; color: #EF4444; }
`

const SummaryRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
`

const SummaryLabel = styled.span`
    color: #6B7280;
`

const SummaryValue = styled.span`
    color: #374151;
    font-variant-numeric: tabular-nums;
`

const SummaryTotal = styled.div`
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

const DiscountInput = styled.input`
    width: 72px;
    background: #F9FAFB;
    border: 1.5px solid #E5E7EB;
    border-radius: 6px;
    padding: 6px 10px;
    font-size: 14px;
    color: #111827;
    text-align: right;
    outline: none;
    &:focus { border-color: #6366F1; }
`

const Space = styled.div`
    height: ${props => props.$h ?? 10}px;
`

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

const Select = styled.select`
    width: 100%;
    box-sizing: border-box;
    background: #FFFFFF;
    border: 1.5px solid #E5E7EB;
    border-radius: 8px;
    padding: 10px 14px;
    font-size: 14px;
    color: #111827;
    outline: none;
    cursor: pointer;
    transition: border-color 0.15s, box-shadow 0.15s;
    &:focus {
        border-color: #6366F1;
        box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
    }
`

const Textarea = styled.textarea`
    width: 100%;
    box-sizing: border-box;
    background: #FFFFFF;
    border: 1.5px solid #E5E7EB;
    border-radius: 8px;
    padding: 10px 14px;
    font-size: 14px;
    color: #111827;
    outline: none;
    resize: none;
    transition: border-color 0.15s, box-shadow 0.15s;
    &:focus {
        border-color: #6366F1;
        box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
    }
`

const RemainingBox = styled.div`
    padding: 10px 14px;
    background: #FFFBEB;
    border: 1px solid #FDE68A;
    border-radius: 8px;
`

const RemainingText = styled.p`
    font-size: 13px;
    color: #D97706;
    margin: 0;
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
    box-shadow: 0 1px 2px rgba(99,102,241,0.3);
    transition: background 0.15s;
    &:hover:not(:disabled) { background: #4F46E5; }
    &:disabled { opacity: 0.5; cursor: not-allowed; }
`

export default function SaleCreate({ clients, products }) {
    const [selectedItems, setSelectedItems] = useState([])
    const [productSearch, setProductSearch] = useState('')

    const { data, setData, post, processing, errors } = useForm({
        client_id: '',
        discount_percentage: 0,
        paid_amount: '',
        payment_method: 'cash',
        notes: '',
        products: [],
        prices: [],
    })

    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.internal_code.toLowerCase().includes(productSearch.toLowerCase())
    )

    const addProduct = (product) => {
        if (selectedItems.find((i) => i.id === product.id)) return
        const newItem = { ...product, customPrice: product.selling_price }
        const newItems = [...selectedItems, newItem]
        setSelectedItems(newItems)
        setData({ ...data, products: newItems.map((i) => i.id), prices: newItems.map((i) => i.customPrice) })
        setProductSearch('')
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

    const total = selectedItems.reduce((sum, i) => sum + (i.customPrice || 0), 0)
    const discount = parseFloat(data.discount_percentage) || 0
    const finalAmount = total * (1 - discount / 100)
    const remaining = Math.max(0, finalAmount - (parseFloat(data.paid_amount) || 0))

    const submit = (e) => {
        e.preventDefault()
        post('/sales')
    }

    return (
        <>
            <Head title="Nouvelle vente" />
            <AppLayout title="Nouvelle vente">
                <PageWrapper>
                    <BackLink href="/sales">← Retour aux ventes</BackLink>
                    <PageTitle>Nouvelle vente</PageTitle>

                    <form onSubmit={submit}>
                        <GridLayout>
                            <LeftCol>
                                <Card>
                                    <CardTitle>Ajouter des produits</CardTitle>
                                    <SearchInput
                                        value={productSearch}
                                        onChange={(e) => setProductSearch(e.target.value)}
                                        placeholder="Rechercher un produit disponible..."
                                    />
                                    {productSearch && (
                                        <Dropdown>
                                            {filteredProducts.slice(0, 10).map((p) => (
                                                <DropdownItem key={p.id} type="button" onClick={() => addProduct(p)}>
                                                    <DropdownItemName>{p.name}</DropdownItemName>
                                                    <DropdownItemSub>{p.internal_code} — {fmt(p.selling_price)}</DropdownItemSub>
                                                </DropdownItem>
                                            ))}
                                            {filteredProducts.length === 0 && (
                                                <DropdownEmpty>Aucun résultat</DropdownEmpty>
                                            )}
                                        </Dropdown>
                                    )}
                                    {errors.products && <ErrorMsg>{errors.products}</ErrorMsg>}
                                </Card>

                                {selectedItems.length > 0 && (
                                    <SelectedCard>
                                        <SelectedHeader>
                                            <SelectedTitle>Produits sélectionnés ({selectedItems.length})</SelectedTitle>
                                        </SelectedHeader>
                                        <div>
                                            {selectedItems.map((item) => (
                                                <SelectedItem key={item.id}>
                                                    <ItemInfo>
                                                        <ItemName>{item.name}</ItemName>
                                                        <ItemCode>{item.internal_code}</ItemCode>
                                                    </ItemInfo>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                        <PriceInput
                                                            type="number"
                                                            step="0.01"
                                                            value={item.customPrice}
                                                            onChange={(e) => updatePrice(item.id, e.target.value)}
                                                        />
                                                        <CurrencyLabel>€</CurrencyLabel>
                                                        <RemoveBtn type="button" onClick={() => removeItem(item.id)}>×</RemoveBtn>
                                                    </div>
                                                </SelectedItem>
                                            ))}
                                        </div>
                                    </SelectedCard>
                                )}
                            </LeftCol>

                            <RightCol>
                                <Card>
                                    <CardTitle>Récapitulatif</CardTitle>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                        <SummaryRow>
                                            <SummaryLabel>Sous-total</SummaryLabel>
                                            <SummaryValue>{fmt(total)}</SummaryValue>
                                        </SummaryRow>
                                        <SummaryRow>
                                            <SummaryLabel>Remise (%)</SummaryLabel>
                                            <DiscountInput
                                                type="number"
                                                min="0"
                                                max="100"
                                                value={data.discount_percentage}
                                                onChange={(e) => setData('discount_percentage', e.target.value)}
                                            />
                                        </SummaryRow>
                                        <SummaryTotal>
                                            <span>Total</span>
                                            <span>{fmt(finalAmount)}</span>
                                        </SummaryTotal>
                                    </div>
                                </Card>

                                <Card>
                                    <CardTitle>Paiement</CardTitle>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                        <div>
                                            <Label>Client (optionnel)</Label>
                                            <Select value={data.client_id} onChange={(e) => setData('client_id', e.target.value)}>
                                                <option value="">Client anonyme</option>
                                                {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                                            </Select>
                                        </div>

                                        <div>
                                            <Label>Méthode de paiement</Label>
                                            <Select value={data.payment_method} onChange={(e) => setData('payment_method', e.target.value)}>
                                                <option value="cash">Espèces</option>
                                                <option value="card">Carte</option>
                                                <option value="transfer">Virement</option>
                                                <option value="installment">Versements</option>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label>Montant payé (€)</Label>
                                            <Input
                                                type="number"
                                                step="0.01"
                                                value={data.paid_amount}
                                                onChange={(e) => setData('paid_amount', e.target.value)}
                                                placeholder={fmt(finalAmount)}
                                            />
                                            {errors.paid_amount && <ErrorMsg>{errors.paid_amount}</ErrorMsg>}
                                        </div>

                                        {remaining > 0 && (
                                            <RemainingBox>
                                                <RemainingText>
                                                    Reste à payer : <strong style={{ fontVariantNumeric: 'tabular-nums' }}>{fmt(remaining)}</strong>
                                                </RemainingText>
                                            </RemainingBox>
                                        )}

                                        <div>
                                            <Label>Notes</Label>
                                            <Textarea
                                                value={data.notes}
                                                onChange={(e) => setData('notes', e.target.value)}
                                                rows={2}
                                            />
                                        </div>

                                        <SubmitBtn
                                            type="submit"
                                            disabled={processing || selectedItems.length === 0}
                                        >
                                            {processing ? 'Enregistrement...' : 'Créer la vente'}
                                        </SubmitBtn>
                                    </div>
                                </Card>
                            </RightCol>
                        </GridLayout>
                    </form>
                </PageWrapper>
            </AppLayout>
        </>
    )
}
