import styled from 'styled-components'
import { Head, Link, router } from '@inertiajs/react'
import { useState } from 'react'
import AppLayout from '../../../Layouts/AppLayout'
import Badge from '../../../Components/Badge'
import Pagination from '../../../Components/Pagination'

const fmt = (n) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n)
const conditionMap = { new: 'success', used: 'warning' }
const statusMap = { available: 'info', sold: 'danger' }

/* ── Styled Components ── */
const PageWrapper = styled.div`
    max-width: 1024px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`

const FilterBar = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
`

const FilterForm = styled.form`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    flex: 1;
`

const SearchInput = styled.input`
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

const SelectInput = styled.select`
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
        border-color: #6366F1;
        box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
    }
`

const FilterBtn = styled.button`
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    padding: 10px 18px;
    font-size: 14px;
    font-weight: 600;
    color: #374151;
    cursor: pointer;
    transition: background 0.15s;
    &:hover { background: #F9FAFB; }
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
    margin-left: auto;
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
    color: #374151;
    vertical-align: middle;
`

const ProductName = styled(Link)`
    font-weight: 500;
    color: #111827;
    text-decoration: none;
    transition: color 0.15s;
    display: block;
    &:hover { color: #6366F1; }
`

const ProductCode = styled.p`
    font-family: ui-monospace, monospace;
    font-size: 12px;
    color: #9CA3AF;
    margin: 2px 0 0;
`

const CategoryText = styled.span`
    color: #6B7280;
    text-transform: capitalize;
`

const AmountText = styled.span`
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    color: #111827;
`

const AmountMuted = styled.span`
    color: #9CA3AF;
    font-variant-numeric: tabular-nums;
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

const ActionBtn = styled.button`
    padding: 6px 10px;
    font-size: 12px;
    color: #EF4444;
    border-radius: 6px;
    background: none;
    border: none;
    cursor: pointer;
    transition: background 0.15s;
    &:hover { background: #FEF2F2; }
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

export default function ProductsIndex({ products, filters }) {
    const [search, setSearch] = useState(filters?.search ?? '')
    const [category, setCategory] = useState(filters?.category ?? '')
    const [status, setStatus] = useState(filters?.status ?? '')

    const applyFilters = (e) => {
        e.preventDefault()
        router.get('/products', { search, category, status }, { preserveState: true, replace: true })
    }

    const destroy = (id) => {
        if (confirm('Supprimer ce produit définitivement ?')) router.delete(`/products/${id}`)
    }

    return (
        <>
            <Head title="Produits" />
            <AppLayout title="Produits">
                <PageWrapper>
                    <FilterBar>
                        <FilterForm onSubmit={applyFilters}>
                            <SearchInput
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Rechercher..."
                            />
                            <SelectInput value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Toutes catégories</option>
                                <option value="phone">Téléphone</option>
                                <option value="pc">PC</option>
                            </SelectInput>
                            <SelectInput value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="">Tous statuts</option>
                                <option value="available">Disponible</option>
                                <option value="sold">Vendu</option>
                            </SelectInput>
                            <FilterBtn type="submit">Filtrer</FilterBtn>
                        </FilterForm>
                        <PrimaryBtn href="/products/create">
                            <span>+</span> Ajouter produit
                        </PrimaryBtn>
                    </FilterBar>

                    <TableContainer>
                        <Table>
                            <THead>
                                <THeadRow>
                                    <TH>Produit</TH>
                                    <TH>Catégorie</TH>
                                    <TH>État</TH>
                                    <TH>Achat</TH>
                                    <TH>Vente</TH>
                                    <TH>Statut</TH>
                                    <TH style={{ textAlign: 'right' }}>Actions</TH>
                                </THeadRow>
                            </THead>
                            <TBody>
                                {products.data.map((p) => (
                                    <TR key={p.id}>
                                        <TD>
                                            <ProductName href={`/products/${p.id}`}>{p.name}</ProductName>
                                            <ProductCode>{p.internal_code}</ProductCode>
                                        </TD>
                                        <TD><CategoryText>{p.category}</CategoryText></TD>
                                        <TD>
                                            <Badge variant={conditionMap[p.condition]}>{p.condition === 'new' ? 'Neuf' : 'Occasion'}</Badge>
                                        </TD>
                                        <TD><AmountMuted>{fmt(p.purchase_price)}</AmountMuted></TD>
                                        <TD><AmountText>{fmt(p.selling_price)}</AmountText></TD>
                                        <TD>
                                            <Badge variant={statusMap[p.status]}>{p.status === 'available' ? 'Disponible' : 'Vendu'}</Badge>
                                        </TD>
                                        <TD>
                                            <ActionGroup>
                                                <ActionLink href={`/products/${p.id}`}>Voir</ActionLink>
                                                <ActionLink href={`/products/${p.id}/edit`}>Modifier</ActionLink>
                                                <ActionBtn onClick={() => destroy(p.id)}>Supprimer</ActionBtn>
                                            </ActionGroup>
                                        </TD>
                                    </TR>
                                ))}
                                {products.data.length === 0 && (
                                    <EmptyRow>
                                        <EmptyCell colSpan={7}>Aucun produit trouvé</EmptyCell>
                                    </EmptyRow>
                                )}
                            </TBody>
                        </Table>
                        <PaginationWrap>
                            <Pagination links={products.links} />
                        </PaginationWrap>
                    </TableContainer>
                </PageWrapper>
            </AppLayout>
        </>
    )
}
