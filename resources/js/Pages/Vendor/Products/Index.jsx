import styled from 'styled-components'
import { Head, Link, router } from '@inertiajs/react'
import { useState } from 'react'
import AppLayout from '../../../Layouts/AppLayout'
import Badge from '../../../Components/Badge'
import Pagination from '../../../Components/Pagination'

const fmt = (n) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n)
const conditionMap = { new: 'success', used: 'warning' }
const statusMap    = { available: 'info', sold: 'danger' }
const conditionLabel = { new: 'Neuf', used: 'Occasion' }
const statusLabel    = { available: 'Disponible', sold: 'Vendu' }

/* ── Styled Components ────────────────────────────────────────────────────── */
const PageWrapper = styled.div`
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    gap: 20px;
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
    min-width: 180px;
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

const AddBtn = styled(Link)`
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
    white-space: nowrap;
    &:hover { background: #4F46E5; }
`

const CountText = styled.p`
    font-size: 13px;
    color: #9CA3AF;
    margin: 0;
`

/* ── Card Grid ────────────────────────────────────────────────────────────── */
const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 16px;
`

const Card = styled.div`
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    transition: box-shadow 0.15s, transform 0.15s;
    position: relative;
    &:hover {
        box-shadow: 0 4px 16px rgba(0,0,0,0.1);
        transform: translateY(-2px);
    }
`

const CardPhoto = styled.div`
    position: relative;
    width: 100%;
    height: 160px;
    background: #F9FAFB;
    overflow: hidden;
`

const CardImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const CardPhotoPlaceholder = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%);
`

const PlaceholderIcon = styled.div`
    font-size: 48px;
    opacity: 0.3;
`

const StatusBadgeOverlay = styled.div`
    position: absolute;
    top: 8px;
    right: 8px;
`

const CardBody = styled.div`
    padding: 14px;
`

const CardBrand = styled.p`
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #9CA3AF;
    margin: 0 0 2px;
`

const CardName = styled.p`
    font-size: 14px;
    font-weight: 600;
    color: #111827;
    margin: 0 0 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const ChipsRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-bottom: 10px;
`

const Chip = styled.span`
    font-size: 11px;
    background: #F3F4F6;
    color: #6B7280;
    padding: 2px 8px;
    border-radius: 20px;
`

const CardFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const CardPrice = styled.p`
    font-size: 16px;
    font-weight: 700;
    color: #111827;
    margin: 0;
    font-variant-numeric: tabular-nums;
`

/* Hover actions */
const CardActions = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(255,255,255,0.95);
    border-top: 1px solid #E5E7EB;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 8px;
    opacity: 0;
    transition: opacity 0.15s;

    ${Card}:hover & { opacity: 1; }
`

const ActionLink = styled(Link)`
    font-size: 12px;
    font-weight: 500;
    color: #6B7280;
    text-decoration: none;
    padding: 4px 8px;
    border-radius: 6px;
    transition: background 0.15s, color 0.15s;
    &:hover { background: #F3F4F6; color: #111827; }
`

const ActionBtn = styled.button`
    font-size: 12px;
    font-weight: 500;
    color: #EF4444;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 6px;
    transition: background 0.15s;
    &:hover { background: #FEF2F2; }
`

const EmptyState = styled.div`
    text-align: center;
    padding: 64px 24px;
    color: #9CA3AF;
    font-size: 14px;
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
    border-radius: 12px;
`

const EmptyIcon = styled.div`
    font-size: 48px;
    margin-bottom: 12px;
    opacity: 0.4;
`

const PaginationWrap = styled.div`
    padding: 8px 0;
`

/* ── Component ────────────────────────────────────────────────────────────── */
export default function ProductsIndex({ products, filters }) {
    const [search, setSearch]   = useState(filters?.search ?? '')
    const [category, setCategory] = useState(filters?.category ?? '')
    const [status, setStatus]   = useState(filters?.status ?? '')

    const applyFilters = (e) => {
        e.preventDefault()
        router.get('/products', { search, category, status }, { preserveState: true, replace: true })
    }

    const destroy = (id) => {
        if (confirm('Supprimer ce produit définitivement ?')) router.delete(`/products/${id}`)
    }

    const total = products.total ?? products.data.length

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
                                placeholder="Rechercher nom, marque, code..."
                            />
                            <SelectInput value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Toutes catégories</option>
                                <option value="phone">Téléphone</option>
                                <option value="pc">PC / Laptop</option>
                            </SelectInput>
                            <SelectInput value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="">Tous statuts</option>
                                <option value="available">Disponible</option>
                                <option value="sold">Vendu</option>
                            </SelectInput>
                            <FilterBtn type="submit">Filtrer</FilterBtn>
                        </FilterForm>
                        <AddBtn href="/products/create">
                            <span>+</span> Ajouter
                        </AddBtn>
                    </FilterBar>

                    <CountText>{total} produit{total > 1 ? 's' : ''}</CountText>

                    {products.data.length === 0 ? (
                        <EmptyState>
                            <EmptyIcon>📦</EmptyIcon>
                            <p>Aucun produit trouvé</p>
                        </EmptyState>
                    ) : (
                        <Grid>
                            {products.data.map((p) => (
                                <Card key={p.id}>
                                    <CardPhoto>
                                        {p.photo_url
                                            ? <CardImg src={p.photo_url} alt={p.name} />
                                            : (
                                                <CardPhotoPlaceholder>
                                                    <PlaceholderIcon>
                                                        {p.category === 'phone' ? '📱' : '💻'}
                                                    </PlaceholderIcon>
                                                </CardPhotoPlaceholder>
                                            )
                                        }
                                        <StatusBadgeOverlay>
                                            <Badge variant={statusMap[p.status]}>{statusLabel[p.status]}</Badge>
                                        </StatusBadgeOverlay>
                                    </CardPhoto>

                                    <CardBody>
                                        {p.brand && <CardBrand>{p.brand}</CardBrand>}
                                        <CardName title={p.name}>{p.name}</CardName>
                                        <ChipsRow>
                                            {p.storage && <Chip>{p.storage}</Chip>}
                                            {p.color   && <Chip>{p.color}</Chip>}
                                            <Chip>{conditionLabel[p.condition]}</Chip>
                                        </ChipsRow>
                                        <CardFooter>
                                            <CardPrice>{fmt(p.selling_price)}</CardPrice>
                                        </CardFooter>
                                    </CardBody>

                                    <CardActions>
                                        <ActionLink href={`/products/${p.id}`}>Voir</ActionLink>
                                        <ActionLink href={`/products/${p.id}/edit`}>Modifier</ActionLink>
                                        <ActionBtn onClick={() => destroy(p.id)}>Suppr.</ActionBtn>
                                    </CardActions>
                                </Card>
                            ))}
                        </Grid>
                    )}

                    {products.links && (
                        <PaginationWrap>
                            <Pagination links={products.links} />
                        </PaginationWrap>
                    )}
                </PageWrapper>
            </AppLayout>
        </>
    )
}
