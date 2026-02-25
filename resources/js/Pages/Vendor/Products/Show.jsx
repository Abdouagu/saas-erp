import styled from 'styled-components'
import { Head, Link } from '@inertiajs/react'
import AppLayout from '../../../Layouts/AppLayout'
import Badge from '../../../Components/Badge'

const fmt = (n) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n)
const conditionMap = { new: 'success', used: 'warning' }
const statusMap = { available: 'info', sold: 'danger' }

/* ── Styled Components ── */
const PageWrapper = styled.div`
    max-width: 896px;
    display: flex;
    flex-direction: column;
    gap: 16px;
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
    padding: 8px 14px;
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
    padding: 8px 14px;
    font-size: 13px;
    font-weight: 600;
    color: #374151;
    text-decoration: none;
    transition: background 0.15s;
    &:hover { background: #F9FAFB; }
`

const ProductHeader = styled.div`
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
`

const ProductName = styled.h2`
    font-size: 22px;
    font-weight: 700;
    color: #111827;
    margin: 0;
`

const ProductCode = styled.p`
    font-family: ui-monospace, monospace;
    font-size: 12px;
    color: #9CA3AF;
    margin: 4px 0 0;
`

const BadgeGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`

const TwoColGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    @media (min-width: 1024px) {
        grid-template-columns: 1fr 1fr;
    }
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
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #9CA3AF;
    margin: 0 0 12px;
`

const RowItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #F3F4F6;
    &:last-child { border-bottom: none; }
`

const RowLabel = styled.span`
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #9CA3AF;
`

const RowValue = styled.span`
    font-size: 14px;
    color: #111827;
    font-weight: 500;
`

const RowEmpty = styled.span`
    font-size: 14px;
    color: #D1D5DB;
`

const BarcodeBox = styled.div`
    margin-top: 16px;
    padding: 12px 16px;
    background: #F9FAFB;
    border-radius: 8px;
    border: 1px solid #E5E7EB;
`

const BarcodeLabel = styled.p`
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #9CA3AF;
    margin: 0 0 4px;
`

const BarcodeValue = styled.p`
    font-family: ui-monospace, monospace;
    font-size: 14px;
    color: #374151;
    margin: 0;
`

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

const ProfitPositive = styled.span`
    color: #059669;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
`

const ProfitNegative = styled.span`
    color: #EF4444;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
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

const Row = ({ label, value }) => (
    <RowItem>
        <RowLabel>{label}</RowLabel>
        {value != null ? <RowValue>{value}</RowValue> : <RowEmpty>—</RowEmpty>}
    </RowItem>
)

export default function ProductShow({ product }) {
    const profit = (product.selling_price - product.purchase_price).toFixed(2)
    const profitPositive = parseFloat(profit) >= 0

    return (
        <>
            <Head title={product.name} />
            <AppLayout title={product.name}>
                <PageWrapper>
                    <HeaderActions>
                        <BackLink href="/products">← Retour</BackLink>
                        <EditBtn href={`/products/${product.id}/edit`}>Modifier</EditBtn>
                        <SecondaryBtn href={`/products/${product.id}/barcode/pdf`} target="_blank">
                            PDF Barcode
                        </SecondaryBtn>
                    </HeaderActions>

                    <ProductHeader>
                        <div>
                            <ProductName>{product.name}</ProductName>
                            <ProductCode>{product.internal_code}</ProductCode>
                        </div>
                        <BadgeGroup>
                            <Badge variant={conditionMap[product.condition]}>{product.condition === 'new' ? 'Neuf' : 'Occasion'}</Badge>
                            <Badge variant={statusMap[product.status]}>{product.status === 'available' ? 'Disponible' : 'Vendu'}</Badge>
                        </BadgeGroup>
                    </ProductHeader>

                    <TwoColGrid>
                        <Card>
                            <CardTitle>Informations</CardTitle>
                            <Row label="Catégorie" value={<span style={{ textTransform: 'capitalize' }}>{product.category}</span>} />
                            <Row label="N° Série" value={product.serial_number} />
                            <Row label="Stockage" value={product.storage} />
                            <Row label="Couleur" value={product.color} />
                            {product.category === 'phone' && (
                                <Row label="Batterie" value={product.battery_percentage ? `${product.battery_percentage}%` : null} />
                            )}
                        </Card>

                        <Card>
                            <CardTitle>Tarification</CardTitle>
                            <Row label="Prix d'achat" value={fmt(product.purchase_price)} />
                            <Row label="Prix de vente" value={fmt(product.selling_price)} />
                            <Row
                                label="Profit"
                                value={
                                    profitPositive
                                        ? <ProfitPositive>+{fmt(profit)}</ProfitPositive>
                                        : <ProfitNegative>{fmt(profit)}</ProfitNegative>
                                }
                            />
                            <BarcodeBox>
                                <BarcodeLabel>Code-barres</BarcodeLabel>
                                <BarcodeValue>{product.barcode}</BarcodeValue>
                            </BarcodeBox>
                        </Card>
                    </TwoColGrid>

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
