import styled from 'styled-components'
import { Head, Link } from '@inertiajs/react'
import AppLayout from '../../Layouts/AppLayout'
import StatCard from '../../Components/StatCard'
import Badge from '../../Components/Badge'
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

const fmt = (n) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n ?? 0)
const saleBadge = { paid: 'success', partial: 'warning', pending: 'danger' }
const saleLabel = { paid: 'Payée', partial: 'Partielle', pending: 'En attente' }

/* ── Styled Components ── */
const PageWrapper = styled.div`
    max-width: 1024px;
    display: flex;
    flex-direction: column;
    gap: 24px;
`

const PageHeader = styled.div``

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

const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    @media (min-width: 1024px) {
        grid-template-columns: repeat(4, 1fr);
    }
`

const ChartCard = styled.div`
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
`

const ChartTitle = styled.h3`
    font-size: 13px;
    font-weight: 600;
    color: #111827;
    margin: 0 0 16px;
`

const ChartWrap = styled.div`
    height: 192px;
`

const TwoColGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    @media (min-width: 1024px) {
        grid-template-columns: 1fr 1fr;
    }
`

const TableCard = styled.div`
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
`

const TableCardHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    border-bottom: 1px solid #E5E7EB;
`

const TableCardTitle = styled.h3`
    font-size: 13px;
    font-weight: 600;
    color: #111827;
    margin: 0;
`

const SeeAllLink = styled(Link)`
    font-size: 12px;
    color: #9CA3AF;
    text-decoration: none;
    transition: color 0.15s;
    &:hover { color: #6366F1; }
`

const ListRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
    border-bottom: 1px solid #F3F4F6;
    transition: background 0.15s;
    &:last-child { border-bottom: none; }
    &:hover { background: #FAFAFA; }
`

const ListRowName = styled.p`
    font-size: 14px;
    color: #111827;
    font-weight: 500;
    margin: 0;
`

const ListRowSub = styled.p`
    font-size: 12px;
    color: #9CA3AF;
    margin: 2px 0 0;
    font-variant-numeric: tabular-nums;
`

const EmptyState = styled.p`
    padding: 24px 20px;
    font-size: 14px;
    color: #9CA3AF;
    text-align: center;
    margin: 0;
`

const AmountEmerald = styled.span`
    font-size: 14px;
    font-weight: 600;
    color: #6366F1;
    font-variant-numeric: tabular-nums;
`

export default function VendorDashboard({
    totalProducts, availableProducts, soldProducts,
    totalClients, totalSales, totalRevenue, totalProfit,
    recentSales, lowStockProducts, monthlyRevenue,
}) {
    return (
        <>
            <Head title="Tableau de bord" />
            <AppLayout title="Tableau de bord">
                <PageWrapper>
                    <PageHeader>
                        <PageTitle>Tableau de bord</PageTitle>
                        <PageSubtitle>Vue d'ensemble de votre activité</PageSubtitle>
                    </PageHeader>

                    <StatsGrid>
                        <StatCard title="Chiffre d'affaires" value={fmt(totalRevenue)} subtitle={`${totalSales} ventes`} icon="€" />
                        <StatCard title="Profit net" value={fmt(totalProfit)} subtitle={`${soldProducts} produits vendus`} icon="↑" />
                        <StatCard title="Clients" value={totalClients} subtitle="enregistrés" icon="👤" />
                        <StatCard title="Produits dispo" value={availableProducts} subtitle={`${totalProducts} au total`} icon="□" />
                    </StatsGrid>

                    <ChartCard>
                        <ChartTitle>Revenus — 6 derniers mois</ChartTitle>
                        <ChartWrap>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={monthlyRevenue} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366F1" stopOpacity={0.12} />
                                            <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                                    <XAxis dataKey="month" tick={{ fill: '#9CA3AF', fontSize: 11 }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fill: '#9CA3AF', fontSize: 11 }} tickFormatter={(v) => `${v}€`} axisLine={false} tickLine={false} width={48} />
                                    <Tooltip
                                        contentStyle={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', color: '#111827', fontSize: 12 }}
                                        formatter={(v) => [fmt(v), 'Revenu']}
                                        cursor={{ stroke: '#E5E7EB' }}
                                    />
                                    <Area type="monotone" dataKey="revenue" stroke="#6366F1" strokeWidth={2} fill="url(#revenueGrad)" dot={false} activeDot={{ r: 4, fill: '#6366F1', strokeWidth: 0 }} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </ChartWrap>
                    </ChartCard>

                    <TwoColGrid>
                        <TableCard>
                            <TableCardHeader>
                                <TableCardTitle>Ventes récentes</TableCardTitle>
                                <SeeAllLink href="/sales">Voir tout →</SeeAllLink>
                            </TableCardHeader>
                            <div>
                                {recentSales.map((s) => (
                                    <ListRow key={s.id}>
                                        <div>
                                            <ListRowName>{s.client?.name ?? 'Client anonyme'}</ListRowName>
                                            <ListRowSub>{fmt(s.final_amount)}</ListRowSub>
                                        </div>
                                        <Badge variant={saleBadge[s.status]}>{saleLabel[s.status]}</Badge>
                                    </ListRow>
                                ))}
                                {recentSales.length === 0 && <EmptyState>Aucune vente</EmptyState>}
                            </div>
                        </TableCard>

                        <TableCard>
                            <TableCardHeader>
                                <TableCardTitle>Produits disponibles</TableCardTitle>
                                <SeeAllLink href="/products">Voir tout →</SeeAllLink>
                            </TableCardHeader>
                            <div>
                                {lowStockProducts.map((p) => (
                                    <ListRow key={p.id}>
                                        <div>
                                            <ListRowName>{p.name}</ListRowName>
                                            <ListRowSub style={{ textTransform: 'capitalize' }}>{p.category} — {p.condition === 'new' ? 'Neuf' : 'Occasion'}</ListRowSub>
                                        </div>
                                        <AmountEmerald>{fmt(p.selling_price)}</AmountEmerald>
                                    </ListRow>
                                ))}
                                {lowStockProducts.length === 0 && <EmptyState>Aucun produit</EmptyState>}
                            </div>
                        </TableCard>
                    </TwoColGrid>
                </PageWrapper>
            </AppLayout>
        </>
    )
}
