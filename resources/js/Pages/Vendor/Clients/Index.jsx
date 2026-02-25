import styled from 'styled-components'
import { Head, Link, useForm } from '@inertiajs/react'
import { useState } from 'react'
import AppLayout from '../../../Layouts/AppLayout'
import Badge from '../../../Components/Badge'
import Modal from '../../../Components/Modal'
import Pagination from '../../../Components/Pagination'

const statusMap = { good: 'success', late: 'danger' }
const statusLabel = { good: 'OK', late: 'En retard' }

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

const PrimaryBtn = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 6px;
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

const ClientAvatar = styled.div`
    width: 30px;
    height: 30px;
    background: #EEF2FF;
    border: 1px solid #C7D2FE;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 600;
    color: #6366F1;
    flex-shrink: 0;
`

const ClientNameRow = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

const ClientName = styled.span`
    font-weight: 500;
    color: #111827;
`

const MutedText = styled.span`
    color: #9CA3AF;
`

const SalesCount = styled.span`
    color: #374151;
`

const ActionGroup = styled.div`
    display: flex;
    justify-content: flex-end;
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
        border-color: #6366F1;
        box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
    }
`

const Textarea = styled.textarea`
    width: 100%;
    box-sizing: border-box;
    background: #FFFFFF;
    border: 1.5px solid #E5E7EB;
    border-radius: 8px;
    padding: 10px 14px;
    font-size: 14px;
    color: #111827;
    outline: none;
    resize: none;
    font-family: inherit;
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

const BtnRow = styled.div`
    display: flex;
    gap: 10px;
    padding-top: 4px;
`

const SubmitBtn = styled.button`
    padding: 10px 20px;
    background: #6366F1;
    color: #FFFFFF;
    font-size: 14px;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.15s;
    &:hover:not(:disabled) { background: #4F46E5; }
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

export default function ClientsIndex({ clients }) {
    const [showModal, setShowModal] = useState(false)
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '', phone: '', email: '', address: '',
    })

    const submit = (e) => {
        e.preventDefault()
        post('/clients', { onSuccess: () => { reset(); setShowModal(false) } })
    }

    return (
        <>
            <Head title="Clients" />
            <AppLayout title="Clients">
                <PageWrapper>
                    <PageHeader>
                        <HeaderLeft>
                            <PageTitle>Clients</PageTitle>
                            <PageSubtitle>{clients.total} clients enregistrés</PageSubtitle>
                        </HeaderLeft>
                        <PrimaryBtn onClick={() => setShowModal(true)}>
                            <span>+</span> Nouveau client
                        </PrimaryBtn>
                    </PageHeader>

                    <TableContainer>
                        <Table>
                            <thead>
                                <THeadRow>
                                    <TH>Nom</TH>
                                    <TH>Téléphone</TH>
                                    <TH>Email</TH>
                                    <TH>Ventes</TH>
                                    <TH>Statut</TH>
                                    <TH style={{ textAlign: 'right' }}>Actions</TH>
                                </THeadRow>
                            </thead>
                            <tbody>
                                {clients.data.map((c) => (
                                    <TR key={c.id}>
                                        <TD>
                                            <ClientNameRow>
                                                <ClientAvatar>{c.name[0]?.toUpperCase()}</ClientAvatar>
                                                <ClientName>{c.name}</ClientName>
                                            </ClientNameRow>
                                        </TD>
                                        <TD><MutedText>{c.phone ?? '—'}</MutedText></TD>
                                        <TD><MutedText>{c.email ?? '—'}</MutedText></TD>
                                        <TD><SalesCount>{c.sales_count}</SalesCount></TD>
                                        <TD>
                                            <Badge variant={statusMap[c.status] ?? 'default'}>
                                                {statusLabel[c.status] ?? c.status}
                                            </Badge>
                                        </TD>
                                        <TD>
                                            <ActionGroup>
                                                <ActionLink href={`/clients/${c.id}`}>Voir</ActionLink>
                                            </ActionGroup>
                                        </TD>
                                    </TR>
                                ))}
                                {clients.data.length === 0 && (
                                    <tr><EmptyCell colSpan={6}>Aucun client</EmptyCell></tr>
                                )}
                            </tbody>
                        </Table>
                        <PaginationWrap>
                            <Pagination links={clients.links} />
                        </PaginationWrap>
                    </TableContainer>
                </PageWrapper>

                <Modal show={showModal} onClose={() => setShowModal(false)} title="Nouveau client">
                    <form onSubmit={submit}>
                        <FormStack>
                            <Field label="Nom *" error={errors.name}>
                                <Input
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Jean Dupont"
                                    autoFocus
                                />
                            </Field>
                            <Grid2>
                                <Field label="Téléphone" error={errors.phone}>
                                    <Input
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        placeholder="+33 6 00 00 00 00"
                                    />
                                </Field>
                                <Field label="Email" error={errors.email}>
                                    <Input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="jean@exemple.com"
                                    />
                                </Field>
                            </Grid2>
                            <Field label="Adresse" error={errors.address}>
                                <Textarea
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    rows={2}
                                    placeholder="Adresse complète..."
                                />
                            </Field>
                            <BtnRow>
                                <SubmitBtn type="submit" disabled={processing}>
                                    {processing ? 'Ajout...' : 'Ajouter'}
                                </SubmitBtn>
                                <CancelBtn type="button" onClick={() => setShowModal(false)}>
                                    Annuler
                                </CancelBtn>
                            </BtnRow>
                        </FormStack>
                    </form>
                </Modal>
            </AppLayout>
        </>
    )
}
