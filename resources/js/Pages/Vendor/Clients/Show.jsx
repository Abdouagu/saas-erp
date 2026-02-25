import styled from 'styled-components'
import { Head, Link } from '@inertiajs/react'
import AppLayout from '../../../Layouts/AppLayout'
import Badge from '../../../Components/Badge'

const fmt = (n) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n)
const saleBadge = { paid: 'success', partial: 'warning', pending: 'danger' }
const saleLabel = { paid: 'Payée', partial: 'Partielle', pending: 'En attente' }

/* ── Styled Components ── */
const PageWrapper = styled.div`
    max-width: 1024px;
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
    transition: color 0.15s;
    &:hover { color: #6366F1; }
`

const Grid3 = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    @media (min-width: 1024px) {
        grid-template-columns: 1fr 2fr;
    }
`

const InfoCard = styled.div`
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
`

const ClientAvatar = styled.div`
    width: 48px;
    height: 48px;
    background: #EEF2FF;
    border: 1px solid #C7D2FE;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 700;
    color: #6366F1;
`

const AvatarRow = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
`

const ClientName = styled.h2`
    font-size: 16px;
    font-weight: 600;
    color: #111827;
    margin: 0 0 4px;
`

const InfoList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`

const InfoRow = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 8px;
    font-size: 14px;
`

const InfoLabel = styled.span`
    font-size: 12px;
    color: #9CA3AF;
    min-width: 48px;
    flex-shrink: 0;
    padding-top: 1px;
`

const InfoValue = styled.span`
    color: #374151;
`

const DebtBox = styled.div`
    margin-top: 16px;
    padding: 12px 14px;
    background: #FFFBEB;
    border: 1px solid #FDE68A;
    border-radius: 8px;
`

const DebtLabel = styled.p`
    font-size: 12px;
    color: #9CA3AF;
    margin: 0 0 4px;
`

const DebtAmount = styled.p`
    font-size: 20px;
    font-weight: 700;
    color: #D97706;
    margin: 0;
    font-variant-numeric: tabular-nums;
`

const SalesCard = styled.div`
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
`

const SalesHeader = styled.div`
    padding: 16px 20px;
    border-bottom: 1px solid #E5E7EB;
`

const SalesTitle = styled.h3`
    font-size: 14px;
    font-weight: 600;
    color: #111827;
    margin: 0;
`

const SalesCount = styled.span`
    color: #9CA3AF;
    font-weight: 400;
    margin-left: 6px;
`

const SaleRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 20px;
    border-bottom: 1px solid #F3F4F6;
    transition: background 0.15s;
    &:last-child { border-bottom: none; }
    &:hover { background: #FAFAFA; }
`

const SaleInfo = styled.div``

const SaleTitle = styled.p`
    font-size: 14px;
    font-weight: 500;
    color: #111827;
    margin: 0;
`

const SaleSub = styled.p`
    font-size: 12px;
    color: #9CA3AF;
    margin: 2px 0 0;
`

const SaleRight = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`

const SaleAmount = styled.div`
    text-align: right;
`

const SaleTotal = styled.p`
    font-size: 14px;
    font-weight: 600;
    color: #111827;
    margin: 0;
    font-variant-numeric: tabular-nums;
`

const SaleRemaining = styled.p`
    font-size: 12px;
    color: #D97706;
    margin: 2px 0 0;
    font-variant-numeric: tabular-nums;
`

const SaleLink = styled(Link)`
    padding: 6px 10px;
    font-size: 12px;
    color: #6B7280;
    border-radius: 6px;
    text-decoration: none;
    transition: background 0.15s, color 0.15s;
    &:hover { background: #F3F4F6; color: #111827; }
`

const EmptyState = styled.p`
    padding: 32px 20px;
    text-align: center;
    font-size: 14px;
    color: #9CA3AF;
    margin: 0;
`

export default function ClientShow({ client, totalDebt }) {
    return (
        <>
            <Head title={client.name} />
            <AppLayout title={client.name}>
                <PageWrapper>
                    <BackLink href="/clients">← Retour aux clients</BackLink>

                    <Grid3>
                        <InfoCard>
                            <AvatarRow>
                                <ClientAvatar>{client.name[0]?.toUpperCase()}</ClientAvatar>
                                <div>
                                    <ClientName>{client.name}</ClientName>
                                    <Badge variant={client.status === 'good' ? 'success' : 'danger'}>
                                        {client.status === 'good' ? 'Bon payeur' : 'En retard'}
                                    </Badge>
                                </div>
                            </AvatarRow>

                            <InfoList>
                                {client.phone && (
                                    <InfoRow>
                                        <InfoLabel>Tél</InfoLabel>
                                        <InfoValue>{client.phone}</InfoValue>
                                    </InfoRow>
                                )}
                                {client.email && (
                                    <InfoRow>
                                        <InfoLabel>Email</InfoLabel>
                                        <InfoValue>{client.email}</InfoValue>
                                    </InfoRow>
                                )}
                                {client.address && (
                                    <InfoRow>
                                        <InfoLabel>Adresse</InfoLabel>
                                        <InfoValue>{client.address}</InfoValue>
                                    </InfoRow>
                                )}
                            </InfoList>

                            {totalDebt > 0 && (
                                <DebtBox>
                                    <DebtLabel>Dette totale</DebtLabel>
                                    <DebtAmount>{fmt(totalDebt)}</DebtAmount>
                                </DebtBox>
                            )}
                        </InfoCard>

                        <SalesCard>
                            <SalesHeader>
                                <SalesTitle>
                                    Historique des ventes
                                    <SalesCount>({client.sales?.length ?? 0})</SalesCount>
                                </SalesTitle>
                            </SalesHeader>
                            <div>
                                {client.sales?.map((s) => (
                                    <SaleRow key={s.id}>
                                        <SaleInfo>
                                            <SaleTitle>
                                                Vente #{s.id}
                                                <span style={{ color: '#9CA3AF', fontWeight: 400, marginLeft: 6 }}>
                                                    · {s.items?.length} article(s)
                                                </span>
                                            </SaleTitle>
                                            <SaleSub>
                                                {new Date(s.created_at).toLocaleDateString('fr-FR')}
                                            </SaleSub>
                                        </SaleInfo>
                                        <SaleRight>
                                            <SaleAmount>
                                                <SaleTotal>{fmt(s.final_amount)}</SaleTotal>
                                                {s.final_amount - s.paid_amount > 0 && (
                                                    <SaleRemaining>
                                                        Reste: {fmt(s.final_amount - s.paid_amount)}
                                                    </SaleRemaining>
                                                )}
                                            </SaleAmount>
                                            <Badge variant={saleBadge[s.status]}>{saleLabel[s.status]}</Badge>
                                            <SaleLink href={`/sales/${s.id}`}>Voir</SaleLink>
                                        </SaleRight>
                                    </SaleRow>
                                ))}
                                {client.sales?.length === 0 && (
                                    <EmptyState>Aucune vente</EmptyState>
                                )}
                            </div>
                        </SalesCard>
                    </Grid3>
                </PageWrapper>
            </AppLayout>
        </>
    )
}
