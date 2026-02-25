import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import styled, { keyframes } from 'styled-components';

// ─── Animations ───────────────────────────────────────────────────────────────
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

// ─── Layout ───────────────────────────────────────────────────────────────────
const PageWrapper = styled.div`
  min-height: 100vh;
  background: #F8FAFC;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  position: relative;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
`;

const BgCircle = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
  ${({ size, top, left, right, bottom, bg }) => `
    width: ${size};
    height: ${size};
    background: ${bg};
    ${top    !== undefined ? `top: ${top};`       : ''}
    ${left   !== undefined ? `left: ${left};`     : ''}
    ${right  !== undefined ? `right: ${right};`   : ''}
    ${bottom !== undefined ? `bottom: ${bottom};` : ''}
  `}
`;

// ─── Card ─────────────────────────────────────────────────────────────────────
const Card = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 400px;
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 4px 24px rgba(99, 102, 241, 0.07), 0 1px 3px rgba(0,0,0,0.05);
  animation: ${fadeUp} 0.4s ease both;
`;

// ─── Logo ─────────────────────────────────────────────────────────────────────
const LogoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
`;

const LogoBox = styled.div`
  width: 44px;
  height: 44px;
  background: #6366F1;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  font-size: 22px;
  font-weight: 700;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
`;

const LogoMeta = styled.div``;

const LogoTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #111827;
  line-height: 1.2;
`;

const LogoSub = styled.div`
  font-size: 12px;
  color: #9CA3AF;
  margin-top: 1px;
`;

// ─── Headings ─────────────────────────────────────────────────────────────────
const Heading = styled.h1`
  font-size: 22px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 4px 0;
`;

const SubHeading = styled.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 28px 0;
`;

// ─── Form elements ────────────────────────────────────────────────────────────
const FormGroup = styled.div`
  margin-bottom: 18px;
`;

const Label = styled.label`
  display: block;
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

const ErrMsg = styled.p`
  font-size: 12px;
  color: #EF4444;
  margin: 5px 0 0 0;
`;

const CheckRow = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  cursor: pointer;
  font-size: 14px;
  color: #6B7280;
  user-select: none;
`;

const CheckInput = styled.input`
  width: 16px;
  height: 16px;
  accent-color: #6366F1;
  cursor: pointer;
  flex-shrink: 0;
`;

// ─── Submit button ────────────────────────────────────────────────────────────
const SubmitBtn = styled.button`
  width: 100%;
  background: #6366F1;
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  padding: 11px 18px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background 0.15s, transform 0.1s, box-shadow 0.15s;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.25);

  &:hover:not(:disabled) {
    background: #4F46E5;
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);
  }

  &:active:not(:disabled) { transform: translateY(0); }

  &:disabled {
    background: #A5B4FC;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const SpinSvg = styled.svg`
  animation: ${spin} 0.7s linear infinite;
  flex-shrink: 0;
`;

// ─── Component ────────────────────────────────────────────────────────────────
export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const submit = (e) => {
    e.preventDefault();
    post('/login');
  };

  return (
    <>
      <Head title="Connexion" />
      <PageWrapper>
        {/* Decorative background circles */}
        <BgCircle size="500px" top="-150px" left="-130px" bg="rgba(99,102,241,0.07)" />
        <BgCircle size="380px" bottom="-100px" right="-90px"  bg="rgba(139,92,246,0.06)" />

        <Card>
          <LogoRow>
            <LogoBox>E</LogoBox>
            <LogoMeta>
              <LogoTitle>ERP SaaS</LogoTitle>
              <LogoSub>Gestion d'entreprise</LogoSub>
            </LogoMeta>
          </LogoRow>

          <Heading>Connexion</Heading>
          <SubHeading>Bienvenue, entrez vos identifiants</SubHeading>

          <form onSubmit={submit} noValidate>
            <FormGroup>
              <Label htmlFor="email">Adresse e-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="vous@exemple.com"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                $err={!!errors.email}
                autoFocus
                autoComplete="email"
              />
              {errors.email && <ErrMsg>{errors.email}</ErrMsg>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                $err={!!errors.password}
                autoComplete="current-password"
              />
              {errors.password && <ErrMsg>{errors.password}</ErrMsg>}
            </FormGroup>

            <CheckRow>
              <CheckInput
                type="checkbox"
                checked={data.remember}
                onChange={(e) => setData('remember', e.target.checked)}
              />
              Se souvenir de moi
            </CheckRow>

            <SubmitBtn type="submit" disabled={processing}>
              {processing && (
                <SpinSvg
                  width="16" height="16" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2.5"
                >
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                  <path d="M12 2a10 10 0 0 1 10 10" />
                </SpinSvg>
              )}
              {processing ? 'Connexion...' : 'Se connecter'}
            </SubmitBtn>
          </form>
        </Card>
      </PageWrapper>
    </>
  );
}
