import React from 'react';
import { Head, Link } from '@inertiajs/react';
import styled from 'styled-components';
import AdminLayout from '../../Layouts/AdminLayout';
import StatCard from '../../Components/StatCard';
import Badge from '../../Components/Badge';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (n) =>
  new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n ?? 0);

// ─── Styled components ────────────────────────────────────────────────────────
const PageContainer = styled.div`
  max-width: 960px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const PageHeader = styled.div``;

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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

// ─── Vendors card ─────────────────────────────────────────────────────────────
const SectionCard = styled.div`
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  overflow: hidden;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px;
  border-bottom: 1px solid #F3F4F6;
`;

const SectionTitle = styled.h3`
  font-size: 15px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 2px 0;
`;

const SectionMeta = styled.p`
  font-size: 12px;
  color: #9CA3AF;
  margin: 0;
`;

const ViewAllLink = styled(Link)`
  font-size: 13px;
  font-weight: 500;
  color: #6366F1;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: color 0.15s;

  &:hover { color: #4F46E5; }
`;

// ─── Table ────────────────────────────────────────────────────────────────────
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
const AvatarRow = styled.div`
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

const PlanCell = styled.span`
  font-size: 14px;
  color: ${({ $empty }) => ($empty ? '#9CA3AF' : '#6B7280')};
  font-style: ${({ $empty }) => ($empty ? 'italic' : 'normal')};
`;

const EditLink = styled(Link)`
  font-size: 13px;
  font-weight: 500;
  color: #6366F1;
  text-decoration: none;
  transition: color 0.15s;

  &:hover { color: #4F46E5; }
`;

const EmptyRow = styled.td`
  padding: 40px 20px;
  text-align: center;
  font-size: 14px;
  color: #9CA3AF;
`;

// ─── Component ────────────────────────────────────────────────────────────────
export default function Dashboard({
  totalVendors,
  activeVendors,
  blockedVendors,
  activeSubscriptions,
  totalRevenue,
  recentVendors,
}) {
  return (
    <>
      <Head title="Vue d'ensemble" />
      <AdminLayout title="Vue d'ensemble">
        <PageContainer>
          <PageHeader>
            <PageTitle>Tableau de bord</PageTitle>
            <PageSubtitle>Supervision de la plateforme</PageSubtitle>
          </PageHeader>

          <StatsGrid>
            <StatCard title="Vendeurs"   value={totalVendors}       subtitle="inscrits"    icon="🏪" />
            <StatCard title="Actifs"     value={activeVendors}      subtitle="connectables" icon="✓" />
            <StatCard title="Bloqués"    value={blockedVendors}     subtitle="comptes"      icon="⊘" />
            <StatCard
              title="Revenus"
              value={fmt(totalRevenue)}
              subtitle={`${activeSubscriptions} abonnements actifs`}
              icon="€"
            />
          </StatsGrid>

          <SectionCard>
            <SectionHeader>
              <div>
                <SectionTitle>Vendeurs récents</SectionTitle>
                <SectionMeta>{totalVendors} au total</SectionMeta>
              </div>
              <ViewAllLink href="/superadmin/vendors">
                Voir tous →
              </ViewAllLink>
            </SectionHeader>

            <Table>
              <Thead>
                <tr>
                  <Th>Vendeur</Th>
                  <Th>Plan</Th>
                  <Th>Statut</Th>
                  <Th $right>Action</Th>
                </tr>
              </Thead>
              <tbody>
                {recentVendors.map((v) => (
                  <Tr key={v.id}>
                    <Td>
                      <AvatarRow>
                        <Avatar>{v.name[0]?.toUpperCase()}</Avatar>
                        <div>
                          <VendorName>{v.name}</VendorName>
                          <VendorEmail>{v.email}</VendorEmail>
                        </div>
                      </AvatarRow>
                    </Td>
                    <Td>
                      {v.subscription?.plan_name
                        ? <PlanCell>{v.subscription.plan_name}</PlanCell>
                        : <PlanCell $empty>—</PlanCell>
                      }
                    </Td>
                    <Td>
                      <Badge variant={v.is_active ? 'success' : 'danger'}>
                        {v.is_active ? 'Actif' : 'Bloqué'}
                      </Badge>
                    </Td>
                    <Td $right>
                      <EditLink href={`/superadmin/vendors/${v.id}/edit`}>
                        Modifier
                      </EditLink>
                    </Td>
                  </Tr>
                ))}
                {recentVendors.length === 0 && (
                  <tr>
                    <EmptyRow colSpan={4}>Aucun vendeur enregistré</EmptyRow>
                  </tr>
                )}
              </tbody>
            </Table>
          </SectionCard>
        </PageContainer>
      </AdminLayout>
    </>
  );
}
