import styled from 'styled-components'
import { Head, useForm, Link } from '@inertiajs/react'
import AppLayout from '../../../Layouts/AppLayout'

/* ── Styled Components ── */
const PageWrapper = styled.div`
    max-width: 640px;
    display: flex;
    flex-direction: column;
    gap: 16px;
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
    margin: 0;
`

const PageSubtitle = styled.p`
    font-size: 14px;
    color: #6B7280;
    margin: 4px 0 0;
`

const Card = styled.div`
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
`

const FormGrid2 = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
`

const FieldWrap = styled.div`
    display: flex;
    flex-direction: column;
`

const Label = styled.label`
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #9CA3AF;
    margin-bottom: 6px;
`

const Input = styled.input`
    background: #FFFFFF;
    border: 1.5px solid #E5E7EB;
    border-radius: 8px;
    padding: 10px 14px;
    font-size: 14px;
    color: #111827;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    transition: border-color 0.15s, box-shadow 0.15s;
    &::placeholder { color: #9CA3AF; }
    &:focus {
        border-color: #6366F1;
        box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
    }
`

const Select = styled.select`
    background: #FFFFFF;
    border: 1.5px solid #E5E7EB;
    border-radius: 8px;
    padding: 10px 14px;
    font-size: 14px;
    color: #111827;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    cursor: pointer;
    transition: border-color 0.15s, box-shadow 0.15s;
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

const Spacer = styled.div`
    height: 16px;
`

const BtnGroup = styled.div`
    display: flex;
    gap: 10px;
    padding-top: 8px;
`

const PrimaryBtn = styled.button`
    background: #6366F1;
    color: #FFFFFF;
    border: none;
    border-radius: 8px;
    padding: 10px 18px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 1px 2px rgba(99,102,241,0.3);
    transition: background 0.15s;
    &:hover:not(:disabled) { background: #4F46E5; }
    &:disabled { opacity: 0.5; cursor: not-allowed; }
`

const CancelBtn = styled(Link)`
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    padding: 10px 18px;
    font-size: 14px;
    font-weight: 600;
    color: #374151;
    text-decoration: none;
    transition: background 0.15s;
    &:hover { background: #F9FAFB; }
`

const Field = ({ label, error, children }) => (
    <FieldWrap>
        <Label>{label}</Label>
        {children}
        {error && <ErrorMsg>{error}</ErrorMsg>}
    </FieldWrap>
)

export default function ProductCreate({ product }) {
    const isEdit = !!product
    const { data, setData, post, put, processing, errors } = useForm({
        category: product?.category ?? 'phone',
        name: product?.name ?? '',
        serial_number: product?.serial_number ?? '',
        battery_percentage: product?.battery_percentage ?? '',
        storage: product?.storage ?? '',
        color: product?.color ?? '',
        condition: product?.condition ?? 'used',
        purchase_price: product?.purchase_price ?? '',
        selling_price: product?.selling_price ?? '',
    })

    const submit = (e) => {
        e.preventDefault()
        isEdit ? put(`/products/${product.id}`) : post('/products')
    }

    return (
        <>
            <Head title={isEdit ? 'Modifier produit' : 'Nouveau produit'} />
            <AppLayout title={isEdit ? `Modifier : ${product.name}` : 'Nouveau produit'}>
                <PageWrapper>
                    <div>
                        <BackLink href="/products">← Retour aux produits</BackLink>
                        <PageTitle>{isEdit ? `Modifier : ${product.name}` : 'Ajouter un produit'}</PageTitle>
                        <PageSubtitle>
                            {isEdit ? 'Modifiez les informations du produit' : 'Remplissez les informations du nouveau produit'}
                        </PageSubtitle>
                    </div>

                    <Card>
                        <form onSubmit={submit}>
                            <FormGrid2>
                                <Field label="Catégorie" error={errors.category}>
                                    <Select value={data.category} onChange={(e) => setData('category', e.target.value)}>
                                        <option value="phone">Téléphone</option>
                                        <option value="pc">PC</option>
                                    </Select>
                                </Field>
                                <Field label="État" error={errors.condition}>
                                    <Select value={data.condition} onChange={(e) => setData('condition', e.target.value)}>
                                        <option value="used">Occasion</option>
                                        <option value="new">Neuf</option>
                                    </Select>
                                </Field>
                            </FormGrid2>

                            <Spacer />

                            <Field label="Nom du produit" error={errors.name}>
                                <Input
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Ex: iPhone 13 Pro"
                                    autoFocus
                                />
                            </Field>

                            <Spacer />

                            <FormGrid2>
                                <Field label="Numéro de série" error={errors.serial_number}>
                                    <Input
                                        value={data.serial_number}
                                        onChange={(e) => setData('serial_number', e.target.value)}
                                        placeholder="IMEI / SN"
                                    />
                                </Field>
                                <Field label="Couleur" error={errors.color}>
                                    <Input
                                        value={data.color}
                                        onChange={(e) => setData('color', e.target.value)}
                                        placeholder="Noir, Blanc..."
                                    />
                                </Field>
                            </FormGrid2>

                            <Spacer />

                            <FormGrid2>
                                <Field label="Stockage" error={errors.storage}>
                                    <Input
                                        value={data.storage}
                                        onChange={(e) => setData('storage', e.target.value)}
                                        placeholder="128GB, 256GB..."
                                    />
                                </Field>
                                {data.category === 'phone' && (
                                    <Field label="Batterie (%)" error={errors.battery_percentage}>
                                        <Input
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={data.battery_percentage}
                                            onChange={(e) => setData('battery_percentage', e.target.value)}
                                            placeholder="85"
                                        />
                                    </Field>
                                )}
                            </FormGrid2>

                            <Spacer />

                            <FormGrid2>
                                <Field label="Prix d'achat (€)" error={errors.purchase_price}>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        value={data.purchase_price}
                                        onChange={(e) => setData('purchase_price', e.target.value)}
                                        placeholder="0.00"
                                    />
                                </Field>
                                <Field label="Prix de vente (€)" error={errors.selling_price}>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        value={data.selling_price}
                                        onChange={(e) => setData('selling_price', e.target.value)}
                                        placeholder="0.00"
                                    />
                                </Field>
                            </FormGrid2>

                            <BtnGroup>
                                <PrimaryBtn type="submit" disabled={processing}>
                                    {processing ? 'Enregistrement...' : (isEdit ? 'Sauvegarder' : 'Ajouter le produit')}
                                </PrimaryBtn>
                                <CancelBtn href="/products">Annuler</CancelBtn>
                            </BtnGroup>
                        </form>
                    </Card>
                </PageWrapper>
            </AppLayout>
        </>
    )
}
