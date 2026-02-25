import { useState } from 'react'
import styled from 'styled-components'
import { Head, useForm, Link } from '@inertiajs/react'
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

/* ── Styled Components ────────────────────────────────────────────────────── */
const PageWrapper = styled.div`
    max-width: 680px;
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
    display: flex;
    flex-direction: column;
    gap: 16px;
`

const SectionTitle = styled.p`
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: #9CA3AF;
    margin: 0 0 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid #F3F4F6;
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

/* Photo upload zone */
const PhotoZone = styled.label`
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    border: 2px dashed #E5E7EB;
    border-radius: 10px;
    cursor: pointer;
    transition: border-color 0.15s, background 0.15s;
    &:hover { border-color: #6366F1; background: #F5F3FF; }
`

const PhotoPreview = styled.img`
    width: 72px;
    height: 72px;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid #E5E7EB;
    flex-shrink: 0;
`

const PhotoPlaceholder = styled.div`
    width: 72px;
    height: 72px;
    background: #F3F4F6;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: #9CA3AF;
    font-size: 28px;
`

const PhotoMeta = styled.div`
    flex: 1;
`

const PhotoTitle = styled.p`
    font-size: 14px;
    font-weight: 500;
    color: #374151;
    margin: 0 0 2px;
`

const PhotoHint = styled.p`
    font-size: 12px;
    color: #9CA3AF;
    margin: 0;
`

/* Profit indicator */
const ProfitBadge = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin-top: 8px;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 600;
    background: ${({ $pos }) => $pos ? '#ECFDF5' : '#FEF2F2'};
    color: ${({ $pos }) => $pos ? '#059669' : '#EF4444'};
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

/* ── Component ────────────────────────────────────────────────────────────── */
export default function ProductCreate({ product }) {
    const isEdit = !!product

    const { data, setData, post, put, processing, errors } = useForm({
        category: product?.category ?? 'phone',
        brand:    product?.brand ?? '',
        name:     product?.name ?? '',
        serial_number:      product?.serial_number ?? '',
        battery_percentage: product?.battery_percentage ?? '',
        storage:  product?.storage ?? '',
        color:    product?.color ?? '',
        condition: product?.condition ?? 'used',
        purchase_price: product?.purchase_price ?? '',
        selling_price:  product?.selling_price ?? '',
        photo: null,
    })

    const [preview, setPreview] = useState(product?.photo_url ?? null)
    const [customModel, setCustomModel] = useState(false)

    /* Derived data */
    const BRANDS = data.category === 'phone' ? PHONE_BRANDS : PC_BRANDS
    const brandList = Object.keys(BRANDS)
    const modelList = data.brand && BRANDS[data.brand] ? [...BRANDS[data.brand], 'Autre'] : []
    const storageList = data.category === 'phone' ? PHONE_STORAGE : PC_STORAGE

    /* Handlers */
    const handleCategory = (val) => {
        setData(d => ({ ...d, category: val, brand: '', name: '' }))
        setCustomModel(false)
    }

    const handleBrand = (val) => {
        setData(d => ({ ...d, brand: val, name: '' }))
        setCustomModel(false)
    }

    const handleModel = (val) => {
        if (val === 'Autre') {
            setCustomModel(true)
            setData('name', '')
        } else {
            setCustomModel(false)
            setData('name', val)
        }
    }

    const handlePhoto = (e) => {
        const file = e.target.files[0]
        if (!file) return
        setData('photo', file)
        setPreview(URL.createObjectURL(file))
    }

    const profit = (parseFloat(data.selling_price) || 0) - (parseFloat(data.purchase_price) || 0)
    const showProfit = data.purchase_price !== '' && data.selling_price !== ''

    const submit = (e) => {
        e.preventDefault()
        if (isEdit) {
            // Inertia v2 auto-uses FormData when photo (File) is present
            put(`/products/${product.id}`)
        } else {
            post('/products')
        }
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

                    <form onSubmit={submit} encType="multipart/form-data">
                        {/* Section 1 — Identification */}
                        <Card>
                            <div>
                                <SectionTitle>1 — Identification</SectionTitle>
                                <FormGrid2>
                                    <Field label="Catégorie" error={errors.category}>
                                        <Select value={data.category} onChange={(e) => handleCategory(e.target.value)}>
                                            <option value="phone">Téléphone</option>
                                            <option value="pc">PC / Laptop</option>
                                        </Select>
                                    </Field>
                                    <Field label="État" error={errors.condition}>
                                        <Select value={data.condition} onChange={(e) => setData('condition', e.target.value)}>
                                            <option value="used">Occasion</option>
                                            <option value="new">Neuf</option>
                                        </Select>
                                    </Field>
                                </FormGrid2>
                            </div>
                        </Card>

                        {/* Section 2 — Appareil */}
                        <Card style={{ marginTop: 16 }}>
                            <div>
                                <SectionTitle>2 — Appareil</SectionTitle>
                                <FormGrid2>
                                    <Field label="Marque" error={errors.brand}>
                                        <Select value={data.brand} onChange={(e) => handleBrand(e.target.value)}>
                                            <option value="">-- Choisir une marque --</option>
                                            {brandList.map(b => (
                                                <option key={b} value={b}>{b}</option>
                                            ))}
                                        </Select>
                                    </Field>
                                    <Field label="Modèle" error={errors.name}>
                                        {(!data.brand || customModel) ? (
                                            <Input
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                placeholder={data.brand ? 'Saisir le modèle...' : 'Choisir d\'abord une marque'}
                                                autoComplete="off"
                                            />
                                        ) : (
                                            <Select
                                                value={modelList.includes(data.name) ? data.name : (data.name ? 'Autre' : '')}
                                                onChange={(e) => handleModel(e.target.value)}
                                            >
                                                <option value="">-- Choisir un modèle --</option>
                                                {modelList.map(m => (
                                                    <option key={m} value={m}>{m}</option>
                                                ))}
                                            </Select>
                                        )}
                                    </Field>
                                </FormGrid2>
                            </div>
                        </Card>

                        {/* Section 3 — Caractéristiques */}
                        <Card style={{ marginTop: 16 }}>
                            <div>
                                <SectionTitle>3 — Caractéristiques</SectionTitle>
                                <FormGrid2>
                                    <Field label={data.category === 'phone' ? 'IMEI / N° Série' : 'N° Série'} error={errors.serial_number}>
                                        <Input
                                            value={data.serial_number}
                                            onChange={(e) => setData('serial_number', e.target.value)}
                                            placeholder="Ex: 359876543210987"
                                        />
                                    </Field>
                                    <Field label="Couleur" error={errors.color}>
                                        <Select value={data.color} onChange={(e) => setData('color', e.target.value)}>
                                            <option value="">-- Couleur --</option>
                                            {COLORS.map(c => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </Select>
                                    </Field>
                                </FormGrid2>
                                <div style={{ marginTop: 16 }}>
                                    <FormGrid2>
                                        <Field label="Stockage" error={errors.storage}>
                                            <Select value={data.storage} onChange={(e) => setData('storage', e.target.value)}>
                                                <option value="">-- Stockage --</option>
                                                {storageList.map(s => (
                                                    <option key={s} value={s}>{s}</option>
                                                ))}
                                            </Select>
                                        </Field>
                                        {data.category === 'phone' && (
                                            <Field label="Batterie (%)" error={errors.battery_percentage}>
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    value={data.battery_percentage}
                                                    onChange={(e) => setData('battery_percentage', e.target.value)}
                                                    placeholder="Ex: 85"
                                                />
                                            </Field>
                                        )}
                                    </FormGrid2>
                                </div>
                            </div>
                        </Card>

                        {/* Section 4 — Photo */}
                        <Card style={{ marginTop: 16 }}>
                            <div>
                                <SectionTitle>4 — Photo</SectionTitle>
                                <PhotoZone htmlFor="photo-upload">
                                    {preview
                                        ? <PhotoPreview src={preview} alt="preview" />
                                        : <PhotoPlaceholder>📷</PhotoPlaceholder>
                                    }
                                    <PhotoMeta>
                                        <PhotoTitle>{preview ? 'Changer la photo' : 'Ajouter une photo'}</PhotoTitle>
                                        <PhotoHint>JPG, PNG — max 2 Mo. Cliquez pour sélectionner.</PhotoHint>
                                    </PhotoMeta>
                                    <input
                                        id="photo-upload"
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={handlePhoto}
                                    />
                                </PhotoZone>
                                {errors.photo && <ErrorMsg>{errors.photo}</ErrorMsg>}
                            </div>
                        </Card>

                        {/* Section 5 — Prix */}
                        <Card style={{ marginTop: 16 }}>
                            <div>
                                <SectionTitle>5 — Prix</SectionTitle>
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
                                {showProfit && (
                                    <ProfitBadge $pos={profit >= 0}>
                                        {profit >= 0 ? '▲' : '▼'} Profit : {profit >= 0 ? '+' : ''}{profit.toFixed(2)} €
                                    </ProfitBadge>
                                )}
                            </div>
                        </Card>

                        {/* Actions */}
                        <BtnGroup style={{ marginTop: 8 }}>
                            <PrimaryBtn type="submit" disabled={processing}>
                                {processing ? 'Enregistrement...' : (isEdit ? 'Sauvegarder' : 'Ajouter le produit')}
                            </PrimaryBtn>
                            <CancelBtn href="/products">Annuler</CancelBtn>
                        </BtnGroup>
                    </form>
                </PageWrapper>
            </AppLayout>
        </>
    )
}
