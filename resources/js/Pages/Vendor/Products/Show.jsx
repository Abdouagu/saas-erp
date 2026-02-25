import styled from 'styled-components'
import { Head, Link, router } from '@inertiajs/react'
import AppLayout from '../../../Layouts/AppLayout'
import Badge from '../../../Components/Badge'

const fmt = (n) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n)
const conditionMap   = { new: 'success', used: 'warning' }
const statusMap      = { available: 'info', sold: 'danger' }
const conditionLabel = { new: 'Neuf', used: 'Occasion' }
const statusLabel    = { available: 'Disponible', sold: 'Vendu' }

/* ── Styled Components ────────────────────────────────────────────────────── */
const PageWrapper = styled.div`
    max-width: 1024px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const HeaderActions = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
`

const BackLink = styled(Link)`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 13px;
    color: #9CA3AF;
    text-decoration: none;
    margin-right: 8px;
    transition: color 0.15s;
    &:hover { color: #6366F1; }
`

const EditBtn = styled(Link)`
    background: #6366F1;
    color: #FFFFFF;
    border-radius: 8px;
    padding: 8px 16px;
    font-size: 13px;
    font-weight: 600;
    text-decoration: none;
    box-shadow: 0 1px 2px rgba(99,102,241,0.3);
    transition: background 0.15s;
    &:hover { background: #4F46E5; }
`

const SecondaryBtn = styled.a`
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    padding: 8px 16px;
    font-size: 13px;
    font-weight: 600;
    color: #374151;
    text-decoration: none;
    transition: background 0.15s;
    &:hover { background: #F9FAFB; }
`

const DangerBtn = styled.button`
    background: #FFFFFF;
    border: 1px solid #FECACA;
    border-radius: 8px;
    padding: 8px 16px;
    font-size: 13px;
    font-weight: 600;
    color: #EF4444;
    cursor: pointer;
    transition: background 0.15s;
    &:hover { background: #FEF2F2; }
`

/* ── Main layout ─────────────────────────────────────────────────────────── */
const TwoCol = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    @media (min-width: 768px) {
        grid-template-columns: 340px 1fr;
    }
`

/* Left column — photo + title */
const PhotoCard = styled.div`
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
`

const PhotoContainer = styled.div`
    width: 100%;
    height: 280px;
    background: #F3F4F6;
    position: relative;
    overflow: hidden;
`

const ProductImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const PhotoPlaceholder = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%);
    font-size: 80px;
    opacity: 0.25;
`

const PhotoMeta = styled.div`
    padding: 16px 20px;
`

const ProductBrand = styled.p`
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: #9CA3AF;
    margin: 0 0 4px;
`

const ProductName = styled.h2`
    font-size: 20px;
    font-weight: 700;
    color: #111827;
    margin: 0 0 12px;
`

const BadgeGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
`

const ProductCode = styled.p`
    font-family: ui-monospace, monospace;
    font-size: 12px;
    color: #9CA3AF;
    margin: 12px 0 0;
`

/* Right column — info cards */
const RightCol = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

const Card = styled.div`
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
`

const CardTitle = styled.h3`
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: #9CA3AF;
    margin: 0 0 14px;
    padding-bottom: 10px;
    border-bottom: 1px solid #F3F4F6;
`

const RowItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 9px 0;
    border-bottom: 1px solid #F9FAFB;
    &:last-child { border-bottom: none; }
`

const RowLabel = styled.span`
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #9CA3AF;
`

const RowValue = styled.span`
    font-size: 14px;
    color: #111827;
    font-weight: 500;
    text-align: right;
`

const RowEmpty = styled.span`
    font-size: 14px;
    color: #D1D5DB;
`

/* Pricing rows */
const PriceRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #F9FAFB;
    &:last-child { border-bottom: none; }
`

const PriceLabel = styled.span`
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #9CA3AF;
`

const PriceValue = styled.span`
    font-size: 18px;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    color: #111827;
`

const PriceMuted = styled.span`
    font-size: 15px;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    color: #6B7280;
`

const ProfitPositive = styled.span`
    font-size: 15px;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    color: #059669;
`

const ProfitNegative = styled.span`
    font-size: 15px;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    color: #EF4444;
`

const BarcodeBox = styled.div`
    margin-top: 14px;
    padding: 12px 14px;
    background: #F9FAFB;
    border-radius: 8px;
    border: 1px solid #E5E7EB;
`

const BarcodeLabel = styled.p`
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: #9CA3AF;
    margin: 0 0 4px;
`

const BarcodeValue = styled.p`
    font-family: ui-monospace, monospace;
    font-size: 14px;
    color: #374151;
    margin: 0;
`

/* ── Stock movements ─────────────────────────────────────────────────────── */
const MovementsCard = styled.div`
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
`

const MovementsHeader = styled.div`
    padding: 16px 20px;
    border-bottom: 1px solid #E5E7EB;
`

const MovementsTitle = styled.h3`
    font-size: 14px;
    font-weight: 600;
    color: #111827;
    margin: 0;
`

const MovementRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
    border-bottom: 1px solid #F3F4F6;
    &:last-child { border-bottom: none; }
`

const MovementType = styled.p`
    font-size: 14px;
    color: #111827;
    text-transform: capitalize;
    margin: 0;
`

const MovementNotes = styled.p`
    font-size: 12px;
    color: #9CA3AF;
    margin: 2px 0 0;
`

const QtyPositive = styled.span`
    font-size: 14px;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    color: #059669;
`

const QtyNegative = styled.span`
    font-size: 14px;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    color: #EF4444;
`

/* ── Helper ───────────────────────────────────────────────────────────────── */
const Row = ({ label, value }) => (
    <RowItem>
        <RowLabel>{label}</RowLabel>
        {value != null && value !== '' ? <RowValue>{value}</RowValue> : <RowEmpty>—</RowEmpty>}
    </RowItem>
)

/* ── Component ────────────────────────────────────────────────────────────── */
export default function ProductShow({ product }) {
    const profit = parseFloat(product.selling_price) - parseFloat(product.purchase_price)
    const profitPositive = profit >= 0

    const handleDelete = () => {
        if (confirm('Supprimer ce produit définitivement ?')) {
            router.delete(`/products/${product.id}`)
        }
    }

    return (
        <>
            <Head title={product.name} />
            <AppLayout title={product.name}>
                <PageWrapper>
                    {/* Header actions */}
                    <HeaderActions>
                        <BackLink href="/products">← Retour</BackLink>
                        <EditBtn href={`/products/${product.id}/edit`}>Modifier</EditBtn>
                        <SecondaryBtn href={`/products/${product.id}/barcode/pdf`} target="_blank">
                            PDF Barcode
                        </SecondaryBtn>
                        <DangerBtn onClick={handleDelete}>Supprimer</DangerBtn>
                    </HeaderActions>

                    {/* Main 2-column layout */}
                    <TwoCol>
                        {/* Left — Photo + title */}
                        <PhotoCard>
                            <PhotoContainer>
                                {product.photo_url
                                    ? <ProductImg src={product.photo_url} alt={product.name} />
                                    : (
                                        <PhotoPlaceholder>
                                            {product.category === 'phone' ? '📱' : '💻'}
                                        </PhotoPlaceholder>
                                    )
                                }
                            </PhotoContainer>
                            <PhotoMeta>
                                {product.brand && <ProductBrand>{product.brand}</ProductBrand>}
                                <ProductName>{product.name}</ProductName>
                                <BadgeGroup>
                                    <Badge variant={conditionMap[product.condition]}>
                                        {conditionLabel[product.condition]}
                                    </Badge>
                                    <Badge variant={statusMap[product.status]}>
                                        {statusLabel[product.status]}
                                    </Badge>
                                </BadgeGroup>
                                <ProductCode>{product.internal_code}</ProductCode>
                            </PhotoMeta>
                        </PhotoCard>

                        {/* Right — Info + pricing */}
                        <RightCol>
                            <Card>
                                <CardTitle>Informations</CardTitle>
                                <Row label="Catégorie"  value={<span style={{ textTransform: 'capitalize' }}>{product.category === 'phone' ? 'Téléphone' : 'PC / Laptop'}</span>} />
                                {product.brand && <Row label="Marque" value={product.brand} />}
                                <Row label="Modèle"    value={product.name} />
                                <Row label="N° Série"  value={product.serial_number} />
                                <Row label="Couleur"   value={product.color} />
                                <Row label="Stockage"  value={product.storage} />
                                {product.category === 'phone' && (
                                    <Row label="Batterie" value={product.battery_percentage ? `${product.battery_percentage}%` : null} />
                                )}
                            </Card>

                            <Card>
                                <CardTitle>Tarification</CardTitle>
                                <PriceRow>
                                    <PriceLabel>Prix d'achat</PriceLabel>
                                    <PriceMuted>{fmt(product.purchase_price)}</PriceMuted>
                                </PriceRow>
                                <PriceRow>
                                    <PriceLabel>Prix de vente</PriceLabel>
                                    <PriceValue>{fmt(product.selling_price)}</PriceValue>
                                </PriceRow>
                                <PriceRow>
                                    <PriceLabel>Profit</PriceLabel>
                                    {profitPositive
                                        ? <ProfitPositive>+{fmt(profit)}</ProfitPositive>
                                        : <ProfitNegative>{fmt(profit)}</ProfitNegative>
                                    }
                                </PriceRow>
                                <BarcodeBox>
                                    <BarcodeLabel>Code-barres</BarcodeLabel>
                                    <BarcodeValue>{product.barcode}</BarcodeValue>
                                </BarcodeBox>
                            </Card>
                        </RightCol>
                    </TwoCol>

                    {/* Stock movements */}
                    {product.stock_movements?.length > 0 && (
                        <MovementsCard>
                            <MovementsHeader>
                                <MovementsTitle>Mouvements de stock</MovementsTitle>
                            </MovementsHeader>
                            <div>
                                {product.stock_movements.map((m) => (
                                    <MovementRow key={m.id}>
                                        <div>
                                            <MovementType>{m.type}</MovementType>
                                            {m.notes && <MovementNotes>{m.notes}</MovementNotes>}
                                        </div>
                                        {m.quantity > 0
                                            ? <QtyPositive>+{m.quantity}</QtyPositive>
                                            : <QtyNegative>{m.quantity}</QtyNegative>
                                        }
                                    </MovementRow>
                                ))}
                            </div>
                        </MovementsCard>
                    )}
                </PageWrapper>
            </AppLayout>
        </>
    )
}
