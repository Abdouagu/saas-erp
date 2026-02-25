import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import styled from 'styled-components';
import AdminLayout from '../../../Layouts/AdminLayout';

// ─── Layout ───────────────────────────────────────────────────────────────────
const PageContainer = styled.div`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 500;
  color: #6B7280;
  text-decoration: none;
  margin-bottom: 10px;
  transition: color 0.15s;

  &:hover { color: #111827; }
`;

// ─── Header with avatar ───────────────────────────────────────────────────────
const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const Avatar = styled.div`
  width: 44px;
  height: 44px;
  background: #EEF2FF;
  color: #4F46E5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  flex-shrink: 0;
`;

const HeaderMeta = styled.div``;

const PageTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 2px 0;
`;

const PageSubtitle = styled.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0;
`;

// ─── Form card ────────────────────────────────────────────────────────────────
const FormCard = styled.div`
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  padding: 28px;
`;

const FormStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Grid2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

// ─── Password section ─────────────────────────────────────────────────────────
const PasswordSection = styled.div`
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const PasswordInfo = styled.p`
  font-size: 12px;
  color: #9CA3AF;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;

  &::before {
    content: 'ℹ';
    color: #6366F1;
    font-size: 13px;
  }
`;

// ─── Field ────────────────────────────────────────────────────────────────────
const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #9CA3AF;
  margin-bottom: 6px;
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  background: #FFFFFF;
  border: 1.5px solid ${({ $err }) => ($err ? '#EF4444' : '#E5E7EB')};
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 14px;
  color: #111827;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;

  &::placeholder { color: #9CA3AF; }

  &:focus {
    border-color: ${({ $err }) => ($err ? '#EF4444' : '#6366F1')};
    box-shadow: 0 0 0 3px ${({ $err }) =>
      $err ? 'rgba(239,68,68,0.1)' : 'rgba(99,102,241,0.1)'};
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  background: #FFFFFF;
  border: 1.5px solid ${({ $err }) => ($err ? '#EF4444' : '#E5E7EB')};
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 14px;
  color: #111827;
  outline: none;
  resize: none;
  font-family: inherit;
  transition: border-color 0.15s, box-shadow 0.15s;

  &::placeholder { color: #9CA3AF; }

  &:focus {
    border-color: ${({ $err }) => ($err ? '#EF4444' : '#6366F1')};
    box-shadow: 0 0 0 3px ${({ $err }) =>
      $err ? 'rgba(239,68,68,0.1)' : 'rgba(99,102,241,0.1)'};
  }
`;

const ErrMsg = styled.p`
  font-size: 12px;
  color: #EF4444;
  margin: 5px 0 0 0;
`;

// ─── Buttons ──────────────────────────────────────────────────────────────────
const BtnRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 4px;
`;

const AmberBtn = styled.button`
  padding: 10px 20px;
  background: #F59E0B;
  color: #FFFFFF;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s, transform 0.1s, box-shadow 0.15s;
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.25);

  &:hover:not(:disabled) {
    background: #D97706;
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(245, 158, 11, 0.35);
  }

  &:active:not(:disabled) { transform: translateY(0); }
  &:disabled { opacity: 0.6; cursor: not-allowed; box-shadow: none; }
`;

const CancelLink = styled(Link)`
  padding: 10px 20px;
  background: #F3F4F6;
  color: #6B7280;
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: #E5E7EB;
    color: #111827;
  }
`;

// ─── Field component ──────────────────────────────────────────────────────────
const Field = ({ label, error, children }) => (
  <FieldWrapper>
    <Label>{label}</Label>
    {children}
    {error && <ErrMsg>{error}</ErrMsg>}
  </FieldWrapper>
);

// ─── Component ────────────────────────────────────────────────────────────────
export default function VendorEdit({ vendor }) {
  const { data, setData, put, processing, errors } = useForm({
    name: vendor.name,
    email: vendor.email,
    password: '',
    password_confirmation: '',
    phone: vendor.phone ?? '',
    address: vendor.address ?? '',
  });

  const submit = (e) => {
    e.preventDefault();
    put(`/superadmin/vendors/${vendor.id}`);
  };

  return (
    <>
      <Head title={`Modifier ${vendor.name}`} />
      <AdminLayout title="Modifier un vendeur">
        <PageContainer>
          <div>
            <BackLink href="/superadmin/vendors">← Retour aux vendeurs</BackLink>
            <HeaderRow>
              <Avatar>{vendor.name[0]?.toUpperCase()}</Avatar>
              <HeaderMeta>
                <PageTitle>{vendor.name}</PageTitle>
                <PageSubtitle>{vendor.email}</PageSubtitle>
              </HeaderMeta>
            </HeaderRow>
          </div>

          <FormCard>
            <form onSubmit={submit}>
              <FormStack>
                <Field label="Nom complet" error={errors.name}>
                  <Input
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    $err={!!errors.name}
                  />
                </Field>

                <Field label="Email" error={errors.email}>
                  <Input
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    $err={!!errors.email}
                  />
                </Field>

                <PasswordSection>
                  <PasswordInfo>
                    Laisser vide pour conserver le mot de passe actuel
                  </PasswordInfo>
                  <Grid2>
                    <Field label="Nouveau mot de passe" error={errors.password}>
                      <Input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        $err={!!errors.password}
                        placeholder="••••••••"
                      />
                    </Field>
                    <Field label="Confirmer" error={errors.password_confirmation}>
                      <Input
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        $err={!!errors.password_confirmation}
                        placeholder="••••••••"
                      />
                    </Field>
                  </Grid2>
                </PasswordSection>

                <Field label="Téléphone" error={errors.phone}>
                  <Input
                    value={data.phone}
                    onChange={(e) => setData('phone', e.target.value)}
                    $err={!!errors.phone}
                  />
                </Field>

                <Field label="Adresse" error={errors.address}>
                  <Textarea
                    value={data.address}
                    onChange={(e) => setData('address', e.target.value)}
                    $err={!!errors.address}
                    rows={3}
                  />
                </Field>

                <BtnRow>
                  <AmberBtn type="submit" disabled={processing}>
                    {processing ? 'Sauvegarde...' : 'Sauvegarder'}
                  </AmberBtn>
                  <CancelLink href="/superadmin/vendors">Annuler</CancelLink>
                </BtnRow>
              </FormStack>
            </form>
          </FormCard>
        </PageContainer>
      </AdminLayout>
    </>
  );
}
