import styled from 'styled-components'
import { Head, Link } from '@inertiajs/react'
import AppLayout from '../../../Layouts/AppLayout'
import Pagination from '../../../Components/Pagination'

const fmt = (n) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n)

/* ── Styled Components ── */
const PageWrapper = styled.div`
    max-width: 1024px;
    display: flex;
    flex-direction: column;
    gap: 16px;
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

const SaleLink = styled(Link)`
    color: #6B7280;
    text-decoration: none;
    transition: color 0.15s;
    &:hover { color: #6366F1; }
`

const AmountText = styled.span`
    font-weight: 600;
    color: #059669;
    font-variant-numeric: tabular-nums;
`

const DateText = styled.span`
    color: #6B7280;
`

const NoteText = styled.span`
    color: #9CA3AF;
`

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

export default function PaymentsIndex({ payments }) {
    return (
        <>
            <Head title="Paiements" />
            <AppLayout title="Paiements">
                <PageWrapper>
                    <PageHeader>
                        <PageTitle>Paiements</PageTitle>
                        <PageSubtitle>{payments.total} paiements enregistrés</PageSubtitle>
                    </PageHeader>

                    <TableContainer>
                        <Table>
                            <thead>
                                <THeadRow>
                                    <TH>#</TH>
                                    <TH>Client</TH>
                                    <TH>Vente</TH>
                                    <TH>Montant</TH>
                                    <TH>Date</TH>
                                    <TH>Notes</TH>
                                </THeadRow>
                            </thead>
                            <tbody>
                                {payments.data.map((p) => (
                                    <TR key={p.id}>
                                        <TD><IdCell>#{p.id}</IdCell></TD>
                                        <TD>
                                            {p.client?.name
                                                ? <ClientName>{p.client.name}</ClientName>
                                                : <NoteText>—</NoteText>
                                            }
                                        </TD>
                                        <TD>
                                            <SaleLink href={`/sales/${p.sale_id}`}>
                                                Vente #{p.sale_id}
                                            </SaleLink>
                                        </TD>
                                        <TD><AmountText>{fmt(p.amount)}</AmountText></TD>
                                        <TD><DateText>{p.payment_date}</DateText></TD>
                                        <TD><NoteText>{p.notes ?? '—'}</NoteText></TD>
                                    </TR>
                                ))}
                                {payments.data.length === 0 && (
                                    <tr><EmptyCell colSpan={6}>Aucun paiement</EmptyCell></tr>
                                )}
                            </tbody>
                        </Table>
                        <PaginationWrap>
                            <Pagination links={payments.links} />
                        </PaginationWrap>
                    </TableContainer>
                </PageWrapper>
            </AppLayout>
        </>
    )
}
