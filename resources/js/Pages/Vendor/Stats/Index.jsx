import styled from 'styled-components'
import { Head } from '@inertiajs/react'
import AppLayout from '../../../Layouts/AppLayout'
import StatCard from '../../../Components/StatCard'
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend,
} from 'recharts'

const fmt = (n) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n ?? 0)
const PIE_COLORS = ['#6366F1', '#06B6D4']

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

const ChartsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    @media (min-width: 1024px) {
        grid-template-columns: 2fr 1fr;
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

const TablesGrid = styled.div`
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
    padding: 16px 20px;
    border-bottom: 1px solid #E5E7EB;
`

const TableCardTitle = styled.h3`
    font-size: 14px;
    font-weight: 600;
    color: #111827;
    margin: 0;
`

const RankRow = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 20px;
    border-bottom: 1px solid #F3F4F6;
    &:last-child { border-bottom: none; }
`

const RankNum = styled.span`
    font-size: 12px;
    color: #D1D5DB;
    width: 18px;
    font-variant-numeric: tabular-nums;
    flex-shrink: 0;
`

const RankInfo = styled.div`
    flex: 1;
    min-width: 0;
`

const RankName = styled.p`
    font-size: 14px;
    font-weight: 500;
    color: #111827;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const RankSub = styled.p`
    font-size: 12px;
    color: #9CA3AF;
    margin: 2px 0 0;
    text-transform: capitalize;
`

const RankValue = styled.span`
    font-size: 14px;
    font-weight: 600;
    color: #6366F1;
    font-variant-numeric: tabular-nums;
    flex-shrink: 0;
`

const ClientAvatar = styled.div`
    width: 28px;
    height: 28px;
    background: #EEF2FF;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 600;
    color: #6366F1;
    flex-shrink: 0;
`

const SalesCount = styled.span`
    font-size: 14px;
    font-weight: 600;
    color: #059669;
    font-variant-numeric: tabular-nums;
    flex-shrink: 0;
`

const EmptyState = styled.p`
    padding: 24px 20px;
    text-align: center;
    font-size: 14px;
    color: #9CA3AF;
    margin: 0;
`

export default function StatsIndex({
    totalRevenue, totalProfit, thisMonthRevenue,
    pendingSales, totalDebt, topProducts, topClients,
    monthlyRevenue, phonesSold, pcsSold,
}) {
    const pieData = [
        { name: 'Téléphones', value: phonesSold },
        { name: 'PCs', value: pcsSold },
    ]

    return (
        <>
            <Head title="Statistiques" />
            <AppLayout title="Statistiques">
                <PageWrapper>
                    <PageHeader>
                        <PageTitle>Statistiques</PageTitle>
                        <PageSubtitle>Analyse de votre activité</PageSubtitle>
                    </PageHeader>

                    <StatsGrid>
                        <StatCard title="Revenus totaux" value={fmt(totalRevenue)} icon="€" />
                        <StatCard title="Profit net" value={fmt(totalProfit)} icon="↑" />
                        <StatCard title="Ce mois" value={fmt(thisMonthRevenue)} icon="📅" />
                        <StatCard title="Dettes" value={fmt(totalDebt)} subtitle={`${pendingSales} ventes impayées`} icon="!" />
                    </StatsGrid>

                    <ChartsGrid>
                        <ChartCard>
                            <ChartTitle>Revenus — 12 derniers mois</ChartTitle>
                            <ChartWrap>
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={monthlyRevenue} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="statsGrad" x1="0" y1="0" x2="0" y2="1">
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
                                        <Area type="monotone" dataKey="revenue" stroke="#6366F1" strokeWidth={2} fill="url(#statsGrad)" dot={false} activeDot={{ r: 4, fill: '#6366F1', strokeWidth: 0 }} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </ChartWrap>
                        </ChartCard>

                        <ChartCard>
                            <ChartTitle>Répartition</ChartTitle>
                            <ChartWrap>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={50}
                                            outerRadius={72}
                                            dataKey="value"
                                            strokeWidth={0}
                                        >
                                            {pieData.map((_, i) => (
                                                <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Legend
                                            wrapperStyle={{ fontSize: 12 }}
                                            formatter={(value) => <span style={{ color: '#6B7280' }}>{value}</span>}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </ChartWrap>
                        </ChartCard>
                    </ChartsGrid>

                    <TablesGrid>
                        <TableCard>
                            <TableCardHeader>
                                <TableCardTitle>Top produits vendus</TableCardTitle>
                            </TableCardHeader>
                            <div>
                                {topProducts.map((item, i) => (
                                    <RankRow key={item.product_id}>
                                        <RankNum>{i + 1}.</RankNum>
                                        <RankInfo>
                                            <RankName>{item.product?.name}</RankName>
                                            <RankSub>{item.product?.category}</RankSub>
                                        </RankInfo>
                                        <RankValue>{item.total_sold}</RankValue>
                                    </RankRow>
                                ))}
                                {topProducts.length === 0 && <EmptyState>Aucune donnée</EmptyState>}
                            </div>
                        </TableCard>

                        <TableCard>
                            <TableCardHeader>
                                <TableCardTitle>Top clients</TableCardTitle>
                            </TableCardHeader>
                            <div>
                                {topClients.map((c, i) => (
                                    <RankRow key={c.id}>
                                        <RankNum>{i + 1}.</RankNum>
                                        <ClientAvatar>{c.name[0]?.toUpperCase()}</ClientAvatar>
                                        <RankName style={{ flex: 1 }}>{c.name}</RankName>
                                        <SalesCount>{c.sales_count} achat(s)</SalesCount>
                                    </RankRow>
                                ))}
                                {topClients.length === 0 && <EmptyState>Aucune donnée</EmptyState>}
                            </div>
                        </TableCard>
                    </TablesGrid>
                </PageWrapper>
            </AppLayout>
        </>
    )
}
