import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import styled from 'styled-components';
import AdminLayout from '../../../Layouts/AdminLayout';
import Badge from '../../../Components/Badge';
import Pagination from '../../../Components/Pagination';

// ─── Layout ───────────────────────────────────────────────────────────────────
const PageContainer = styled.div`
  max-width: 960px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const PageHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
`;

const HeaderLeft = styled.div``;

const PageTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 4px 0;
`;

const PageSubtitle = styled.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0;
`;

// ─── Amber primary button (admin accent) ──────────────────────────────────────
const AmberLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  background: #F59E0B;
  color: #FFFFFF;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  text-decoration: none;
  white-space: nowrap;
  transition: background 0.15s, transform 0.1s, box-shadow 0.15s;
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.25);

  &:hover {
    background: #D97706;
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(245, 158, 11, 0.35);
  }

  &:active { transform: translateY(0); }
`;

// ─── Table card ───────────────────────────────────────────────────────────────
const TableCard = styled.div`
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
`;

const Thead = styled.thead`
  background: #F9FAFB;
`;

const Th = styled.th`
  padding: 12px 20px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #9CA3AF;
  text-align: ${({ $right }) => ($right ? 'right' : 'left')};
  white-space: nowrap;
`;

const Tr = styled.tr`
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.12s;

  &:last-child { border-bottom: none; }
  &:hover { background: #F9FAFB; }
`;

const Td = styled.td`
  padding: 14px 20px;
  color: #111827;
  vertical-align: middle;
  text-align: ${({ $right }) => ($right ? 'right' : 'left')};
`;

// ─── Avatar ───────────────────────────────────────────────────────────────────
const CellRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  background: #EEF2FF;
  color: #4F46E5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  flex-shrink: 0;
`;

const VendorName = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #111827;
  margin: 0 0 1px 0;
`;

const VendorEmail = styled.p`
  font-size: 12px;
  color: #9CA3AF;
  margin: 0;
`;

const MutedText = styled.span`
  color: #9CA3AF;
`;

// ─── Action buttons ───────────────────────────────────────────────────────────
const ActionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
`;

const ActionLink = styled(Link)`
  padding: 5px 10px;
  font-size: 12px;
  font-weight: 500;
  color: #6B7280;
  text-decoration: none;
  border-radius: 6px;
  transition: background 0.12s, color 0.12s;

  &:hover {
    background: #F3F4F6;
    color: #111827;
  }
`;

const ActionBtn = styled.button`
  padding: 5px 10px;
  font-size: 12px;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.12s, color 0.12s;
  ${({ $variant }) => {
    if ($variant === 'block')   return 'color: #F59E0B; background: transparent; &:hover { background: #FEF3C7; }';
    if ($variant === 'unblock') return 'color: #10B981; background: transparent; &:hover { background: #D1FAE5; }';
    if ($variant === 'danger')  return 'color: #EF4444; background: transparent; &:hover { background: #FEE2E2; }';
    return '';
  }}
`;

// ─── Empty / pagination ───────────────────────────────────────────────────────
const EmptyCell = styled.td`
  padding: 48px 20px;
  text-align: center;
  font-size: 14px;
  color: #9CA3AF;
`;

const PaginationWrapper = styled.div`
  padding: 14px 20px;
  border-top: 1px solid #F3F4F6;
`;

// ─── Component ────────────────────────────────────────────────────────────────
export default function VendorsIndex({ vendors }) {
  const toggleBlock = (id) =>
    router.post(`/superadmin/vendors/${id}/toggle`, {}, { preserveScroll: true });

  const destroy = (id) =>
    confirm('Supprimer ce vendeur définitivement ?') &&
    router.delete(`/superadmin/vendors/${id}`);

  return (
    <>
      <Head title="Vendeurs" />
      <AdminLayout title="Vendeurs">
        <PageContainer>
          <PageHeader>
            <HeaderLeft>
              <PageTitle>Vendeurs</PageTitle>
              <PageSubtitle>{vendors.total} comptes enregistrés</PageSubtitle>
            </HeaderLeft>
            <AmberLink href="/superadmin/vendors/create">
              + Nouveau vendeur
            </AmberLink>
          </PageHeader>

          <TableCard>
            <Table>
              <Thead>
                <tr>
                  <Th>Vendeur</Th>
                  <Th>Téléphone</Th>
                  <Th>Plan</Th>
                  <Th>Statut</Th>
                  <Th $right>Actions</Th>
                </tr>
              </Thead>
              <tbody>
                {vendors.data.map((v) => (
                  <Tr key={v.id}>
                    <Td>
                      <CellRow>
                        <Avatar>{v.name[0]?.toUpperCase()}</Avatar>
                        <div>
                          <VendorName>{v.name}</VendorName>
                          <VendorEmail>{v.email}</VendorEmail>
                        </div>
                      </CellRow>
                    </Td>
                    <Td>
                      {v.phone ? v.phone : <MutedText>—</MutedText>}
                    </Td>
                    <Td>
                      {v.subscription?.plan_name
                        ? v.subscription.plan_name
                        : <MutedText>Aucun</MutedText>
                      }
                    </Td>
                    <Td>
                      <Badge variant={v.is_active ? 'success' : 'danger'}>
                        {v.is_active ? 'Actif' : 'Bloqué'}
                      </Badge>
                    </Td>
                    <Td $right>
                      <ActionRow>
                        <ActionLink href={`/superadmin/vendors/${v.id}/edit`}>
                          Modifier
                        </ActionLink>
                        <ActionBtn
                          $variant={v.is_active ? 'block' : 'unblock'}
                          onClick={() => toggleBlock(v.id)}
                        >
                          {v.is_active ? 'Bloquer' : 'Activer'}
                        </ActionBtn>
                        <ActionBtn $variant="danger" onClick={() => destroy(v.id)}>
                          Supprimer
                        </ActionBtn>
                      </ActionRow>
                    </Td>
                  </Tr>
                ))}
                {vendors.data.length === 0 && (
                  <tr>
                    <EmptyCell colSpan={5}>Aucun vendeur trouvé</EmptyCell>
                  </tr>
                )}
              </tbody>
            </Table>
            <PaginationWrapper>
              <Pagination links={vendors.links} />
            </PaginationWrapper>
          </TableCard>
        </PageContainer>
      </AdminLayout>
    </>
  );
}
