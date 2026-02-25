import styled from 'styled-components'
import { Head, useForm } from '@inertiajs/react'
import { useState } from 'react'
import AdminLayout from '../../../Layouts/AdminLayout'
import Badge from '../../../Components/Badge'
import Modal from '../../../Components/Modal'
import Pagination from '../../../Components/Pagination'

const fmt = (n) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n)
const statusMap = { active: 'success', expired: 'danger', suspended: 'warning' }
const statusLabel = { active: 'Actif', expired: 'Expiré', suspended: 'Suspendu' }

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

const AmberBtn = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #F59E0B;
    color: #FFFFFF;
    border: none;
    border-radius: 8px;
    padding: 10px 18px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 1px 2px rgba(245,158,11,0.3);
    transition: background 0.15s;
    &:hover { background: #D97706; }
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

const VendorAvatar = styled.div`
    width: 30px;
    height: 30px;
    background: #FEF3C7;
    border: 1px solid #FDE68A;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 600;
    color: #D97706;
    flex-shrink: 0;
`

const VendorRow = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

const VendorName = styled.span`
    font-weight: 500;
    color: #111827;
`

const PlanText = styled.span`
    color: #374151;
`

const DateText = styled.span`
    color: #9CA3AF;
`

const AmountText = styled.span`
    font-weight: 600;
    color: #111827;
    font-variant-numeric: tabular-nums;
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

/* ── Modal Form ── */
const FormStack = styled.div`
    display: flex;
    flex-direction: column;
    gap: 14px;
`

const Grid2 = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
`

const FieldWrap = styled.div``

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
        border-color: #F59E0B;
        box-shadow: 0 0 0 3px rgba(245,158,11,0.1);
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
        border-color: #F59E0B;
        box-shadow: 0 0 0 3px rgba(245,158,11,0.1);
    }
`

const ErrorMsg = styled.p`
    font-size: 12px;
    color: #EF4444;
    margin: 4px 0 0;
`

const BtnRow = styled.div`
    display: flex;
    gap: 10px;
    padding-top: 4px;
`

const SubmitBtn = styled.button`
    padding: 10px 20px;
    background: #F59E0B;
    color: #FFFFFF;
    font-size: 14px;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.15s;
    &:hover:not(:disabled) { background: #D97706; }
    &:disabled { opacity: 0.5; cursor: not-allowed; }
`

const CancelBtn = styled.button`
    padding: 10px 20px;
    background: #F3F4F6;
    color: #6B7280;
    font-size: 14px;
    font-weight: 500;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
    &:hover { background: #E5E7EB; color: #111827; }
`

const Field = ({ label, error, children }) => (
    <FieldWrap>
        <Label>{label}</Label>
        {children}
        {error && <ErrorMsg>{error}</ErrorMsg>}
    </FieldWrap>
)

export default function SubscriptionsIndex({ subscriptions, vendors }) {
    const [showModal, setShowModal] = useState(false)
    const { data, setData, post, processing, errors, reset } = useForm({
        vendor_id: '', plan_name: '', start_date: '', end_date: '', amount: '', status: 'active',
    })

    const submit = (e) => {
        e.preventDefault()
        post('/superadmin/subscriptions', { onSuccess: () => { reset(); setShowModal(false) } })
    }

    return (
        <>
            <Head title="Abonnements" />
            <AdminLayout title="Abonnements">
                <PageWrapper>
                    <PageHeader>
                        <HeaderLeft>
                            <PageTitle>Abonnements</PageTitle>
                            <PageSubtitle>{subscriptions.total} abonnements enregistrés</PageSubtitle>
                        </HeaderLeft>
                        <AmberBtn onClick={() => setShowModal(true)}>
                            <span>+</span> Nouvel abonnement
                        </AmberBtn>
                    </PageHeader>

                    <TableContainer>
                        <Table>
                            <thead>
                                <THeadRow>
                                    <TH>Vendeur</TH>
                                    <TH>Plan</TH>
                                    <TH>Début</TH>
                                    <TH>Fin</TH>
                                    <TH>Montant</TH>
                                    <TH>Statut</TH>
                                </THeadRow>
                            </thead>
                            <tbody>
                                {subscriptions.data.map((s) => (
                                    <TR key={s.id}>
                                        <TD>
                                            <VendorRow>
                                                <VendorAvatar>
                                                    {s.vendor?.name?.[0]?.toUpperCase()}
                                                </VendorAvatar>
                                                <VendorName>{s.vendor?.name}</VendorName>
                                            </VendorRow>
                                        </TD>
                                        <TD><PlanText>{s.plan_name}</PlanText></TD>
                                        <TD><DateText>{s.start_date}</DateText></TD>
                                        <TD><DateText>{s.end_date}</DateText></TD>
                                        <TD><AmountText>{fmt(s.amount)}</AmountText></TD>
                                        <TD>
                                            <Badge variant={statusMap[s.status] ?? 'default'}>
                                                {statusLabel[s.status] ?? s.status}
                                            </Badge>
                                        </TD>
                                    </TR>
                                ))}
                                {subscriptions.data.length === 0 && (
                                    <tr><EmptyCell colSpan={6}>Aucun abonnement</EmptyCell></tr>
                                )}
                            </tbody>
                        </Table>
                        <PaginationWrap>
                            <Pagination links={subscriptions.links} />
                        </PaginationWrap>
                    </TableContainer>
                </PageWrapper>

                <Modal show={showModal} onClose={() => setShowModal(false)} title="Nouvel abonnement">
                    <form onSubmit={submit}>
                        <FormStack>
                            <Field label="Vendeur" error={errors.vendor_id}>
                                <Select value={data.vendor_id} onChange={(e) => setData('vendor_id', e.target.value)}>
                                    <option value="">Sélectionner un vendeur...</option>
                                    {vendors.map((v) => (
                                        <option key={v.id} value={v.id}>{v.name}</option>
                                    ))}
                                </Select>
                            </Field>
                            <Field label="Nom du plan" error={errors.plan_name}>
                                <Input
                                    value={data.plan_name}
                                    onChange={(e) => setData('plan_name', e.target.value)}
                                    placeholder="Pro, Premium..."
                                />
                            </Field>
                            <Grid2>
                                <Field label="Début" error={errors.start_date}>
                                    <Input
                                        type="date"
                                        value={data.start_date}
                                        onChange={(e) => setData('start_date', e.target.value)}
                                    />
                                </Field>
                                <Field label="Fin" error={errors.end_date}>
                                    <Input
                                        type="date"
                                        value={data.end_date}
                                        onChange={(e) => setData('end_date', e.target.value)}
                                    />
                                </Field>
                            </Grid2>
                            <Grid2>
                                <Field label="Montant (€)" error={errors.amount}>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        value={data.amount}
                                        onChange={(e) => setData('amount', e.target.value)}
                                        placeholder="0.00"
                                    />
                                </Field>
                                <Field label="Statut" error={errors.status}>
                                    <Select value={data.status} onChange={(e) => setData('status', e.target.value)}>
                                        <option value="active">Actif</option>
                                        <option value="expired">Expiré</option>
                                        <option value="suspended">Suspendu</option>
                                    </Select>
                                </Field>
                            </Grid2>
                            <BtnRow>
                                <SubmitBtn type="submit" disabled={processing}>
                                    {processing ? 'Enregistrement...' : 'Enregistrer'}
                                </SubmitBtn>
                                <CancelBtn type="button" onClick={() => setShowModal(false)}>
                                    Annuler
                                </CancelBtn>
                            </BtnRow>
                        </FormStack>
                    </form>
                </Modal>
            </AdminLayout>
        </>
    )
}
