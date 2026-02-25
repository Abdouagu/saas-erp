import styled from 'styled-components'
import { Head, Link } from '@inertiajs/react'
import AppLayout from '../../../Layouts/AppLayout'
import Badge from '../../../Components/Badge'
import Pagination from '../../../Components/Pagination'

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

const PageHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
`

const HeaderLeft = styled.div``

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

const PrimaryBtn = styled(Link)`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #6366F1;
    color: #FFFFFF;
    border-radius: 8px;
    padding: 10px 18px;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    box-shadow: 0 1px 2px rgba(99,102,241,0.3);
    transition: background 0.15s;
    &:hover { background: #4F46E5; }
`

const TableContainer = styled.div`
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
`

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
`

const THead = styled.thead``

const THeadRow = styled.tr`
    background: #F9FAFB;
    border-bottom: 2px solid #E5E7EB;
`

const TH = styled.th`
    padding: 12px 20px;
    text-align: left;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #9CA3AF;
    white-space: nowrap;
`

const TBody = styled.tbody``

const TR = styled.tr`
    border-bottom: 1px solid #F3F4F6;
    transition: background 0.15s;
    &:last-child { border-bottom: none; }
    &:hover { background: #FAFAFA; }
`

const TD = styled.td`
    padding: 14px 20px;
    vertical-align: middle;
`

const IdCell = styled.span`
    font-family: ui-monospace, monospace;
    font-size: 12px;
    color: #9CA3AF;
`

const ClientName = styled.span`
    font-weight: 500;
    color: #111827;
`

const AnonClient = styled.span`
    color: #9CA3AF;
`

const TotalAmount = styled.span`
    font-weight: 600;
    color: #111827;
    font-variant-numeric: tabular-nums;
`

const PaidAmount = styled.span`
    font-weight: 500;
    color: #059669;
    font-variant-numeric: tabular-nums;
`

const RemainingAmount = styled.span`
    font-weight: 500;
    color: #D97706;
    font-variant-numeric: tabular-nums;
`

const NoRemaining = styled.span`
    color: #D1D5DB;
`

const DateText = styled.span`
    color: #6B7280;
`

const ActionGroup = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 4px;
`

const ActionLink = styled(Link)`
    padding: 6px 10px;
    font-size: 12px;
    color: #6B7280;
    border-radius: 6px;
    text-decoration: none;
    transition: background 0.15s, color 0.15s;
    &:hover { background: #F3F4F6; color: #111827; }
`

const ActionA = styled.a`
    padding: 6px 10px;
    font-size: 12px;
    color: #6B7280;
    border-radius: 6px;
    text-decoration: none;
    transition: background 0.15s, color 0.15s;
    &:hover { background: #F3F4F6; color: #111827; }
`

const EmptyRow = styled.tr``
const EmptyCell = styled.td`
    padding: 48px 20px;
    text-align: center;
    color: #9CA3AF;
    font-size: 14px;
`

const PaginationWrap = styled.div`
    padding: 12px 20px;
    border-top: 1px solid #E5E7EB;
`

export default function SalesIndex({ sales }) {
    return (
        <>
            <Head title="Ventes" />
            <AppLayout title="Ventes">
                <PageWrapper>
                    <PageHeader>
                        <HeaderLeft>
                            <PageTitle>Ventes</PageTitle>
                            <PageSubtitle>{sales.total} ventes enregistrées</PageSubtitle>
                        </HeaderLeft>
                        <PrimaryBtn href="/sales/create">
                            <span>+</span> Nouvelle vente
                        </PrimaryBtn>
                    </PageHeader>

                    <TableContainer>
                        <Table>
                            <THead>
                                <THeadRow>
                                    <TH>#</TH>
                                    <TH>Client</TH>
                                    <TH>Total</TH>
                                    <TH>Payé</TH>
                                    <TH>Restant</TH>
                                    <TH>Statut</TH>
                                    <TH>Date</TH>
                                    <TH style={{ textAlign: 'right' }}>Actions</TH>
                                </THeadRow>
                            </THead>
                            <TBody>
                                {sales.data.map((s) => (
                                    <TR key={s.id}>
                                        <TD><IdCell>#{s.id}</IdCell></TD>
                                        <TD>
                                            {s.client?.name
                                                ? <ClientName>{s.client.name}</ClientName>
                                                : <AnonClient>Anonyme</AnonClient>
                                            }
                                        </TD>
                                        <TD><TotalAmount>{fmt(s.final_amount)}</TotalAmount></TD>
                                        <TD><PaidAmount>{fmt(s.paid_amount)}</PaidAmount></TD>
                                        <TD>
                                            {s.final_amount - s.paid_amount > 0
                                                ? <RemainingAmount>{fmt(s.final_amount - s.paid_amount)}</RemainingAmount>
                                                : <NoRemaining>—</NoRemaining>
                                            }
                                        </TD>
                                        <TD>
                                            <Badge variant={statusMap[s.status]}>{statusLabel[s.status]}</Badge>
                                        </TD>
                                        <TD><DateText>{new Date(s.created_at).toLocaleDateString('fr-FR')}</DateText></TD>
                                        <TD>
                                            <ActionGroup>
                                                <ActionLink href={`/sales/${s.id}`}>Voir</ActionLink>
                                                <ActionA href={`/sales/${s.id}/invoice/pdf`} target="_blank">PDF</ActionA>
                                            </ActionGroup>
                                        </TD>
                                    </TR>
                                ))}
                                {sales.data.length === 0 && (
                                    <EmptyRow>
                                        <EmptyCell colSpan={8}>Aucune vente</EmptyCell>
                                    </EmptyRow>
                                )}
                            </TBody>
                        </Table>
                        <PaginationWrap>
                            <Pagination links={sales.links} />
                        </PaginationWrap>
                    </TableContainer>
                </PageWrapper>
            </AppLayout>
        </>
    )
}
