import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

// ─── Palette ────────────────────────────────────────────────────────────────
const C = {
    pageBg:        '#F8FAFC',
    sidebarBg:     '#FFFFFF',
    sidebarBorder: '#E8EBF0',
    cardBg:        '#FFFFFF',
    accent:        '#F59E0B',
    accentDeep:    '#D97706',
    textPrimary:   '#111827',
    textSecondary: '#6B7280',
    textMuted:     '#9CA3AF',
    border:        '#E5E7EB',
    activeNavBg:   '#FEF3C7',
    activeNavText: '#D97706',
    activeNavBar:  '#F59E0B',
    hoverNav:      '#F9FAFB',
    flashSuccessBg:'#ECFDF5',
    flashSuccessBd:'#A7F3D0',
    flashSuccessTx:'#065F46',
    flashErrorBg:  '#FEF2F2',
    flashErrorBd:  '#FECACA',
    flashErrorTx:  '#991B1B',
    headerBg:      '#FFFFFF',
    headerBorder:  '#E5E7EB',
};

// ─── Nav items ───────────────────────────────────────────────────────────────
const NAV = [
    { href: '/superadmin/dashboard',     label: "Vue d'ensemble", icon: '⬡', match: '/superadmin/dashboard' },
    { href: '/superadmin/vendors',       label: 'Vendeurs',       icon: '◫', match: '/superadmin/vendors' },
    { href: '/superadmin/subscriptions', label: 'Abonnements',    icon: '◈', match: '/superadmin/subscriptions' },
];

// ─── Styled components ───────────────────────────────────────────────────────
const GlobalStyle = createGlobalStyle`
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif; }
`;

const Shell = styled.div`
    display: flex;
    height: 100vh;
    background: ${C.pageBg};
    overflow: hidden;
`;

const MobileOverlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
    z-index: 20;
    display: none;

    @media (max-width: 1023px) {
        display: block;
    }
`;

const Sidebar = styled.aside`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 30;
    width: 224px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    background: ${C.sidebarBg};
    border-right: 1px solid ${C.sidebarBorder};
    transition: transform 200ms ease;

    @media (min-width: 1024px) {
        position: static;
        transform: translateX(0) !important;
    }

    transform: ${({ $open }) => ($open ? 'translateX(0)' : 'translateX(-100%)')};
`;

const LogoArea = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 16px;
    height: 56px;
    border-bottom: 1px solid ${C.sidebarBorder};
    flex-shrink: 0;
`;

const LogoSquare = styled.div`
    width: 26px;
    height: 26px;
    background: ${C.accent};
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    span {
        color: #fff;
        font-size: 13px;
        font-weight: 700;
        line-height: 1;
    }
`;

const LogoTextWrap = styled.div`
    display: flex;
    align-items: baseline;
    gap: 6px;
`;

const LogoText = styled.span`
    font-size: 14px;
    font-weight: 600;
    color: ${C.textPrimary};
    letter-spacing: -0.3px;
`;

const LogoBadge = styled.span`
    font-size: 10px;
    font-weight: 600;
    color: ${C.accentDeep};
    letter-spacing: 0.2px;
`;

const Nav = styled.nav`
    flex: 1;
    padding: 12px 10px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    overflow-y: auto;
`;

const NavLink = styled(Link)`
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 10px;
    border-radius: 7px;
    font-size: 13.5px;
    font-weight: ${({ $active }) => ($active ? '500' : '400')};
    color: ${({ $active }) => ($active ? C.activeNavText : C.textSecondary)};
    background: ${({ $active }) => ($active ? C.activeNavBg : 'transparent')};
    text-decoration: none;
    transition: background 120ms ease, color 120ms ease;
    cursor: pointer;

    &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 3px;
        height: 18px;
        background: ${C.activeNavBar};
        border-radius: 0 3px 3px 0;
        opacity: ${({ $active }) => ($active ? 1 : 0)};
        transition: opacity 120ms ease;
    }

    &:hover {
        background: ${({ $active }) => ($active ? C.activeNavBg : C.hoverNav)};
        color: ${({ $active }) => ($active ? C.activeNavText : C.textPrimary)};
    }
`;

const NavIcon = styled.span`
    font-size: 15px;
    line-height: 1;
    color: ${({ $active }) => ($active ? C.accentDeep : C.textMuted)};
    flex-shrink: 0;
`;

const UserSection = styled.div`
    border-top: 1px solid ${C.sidebarBorder};
    padding: 12px 10px;
    flex-shrink: 0;
`;

const UserRow = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 10px;
    border-radius: 7px;
`;

const Avatar = styled.div`
    width: 30px;
    height: 30px;
    background: #FEF3C7;
    border: 1px solid #FDE68A;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    span {
        font-size: 12px;
        font-weight: 600;
        color: ${C.accentDeep};
    }
`;

const UserInfo = styled.div`
    flex: 1;
    min-width: 0;
`;

const UserName = styled.p`
    font-size: 12.5px;
    font-weight: 500;
    color: ${C.textPrimary};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const UserRole = styled.p`
    font-size: 11px;
    color: ${C.accentDeep};
    opacity: 0.75;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const LogoutBtn = styled(Link)`
    display: flex;
    align-items: center;
    gap: 6px;
    width: 100%;
    margin-top: 4px;
    padding: 7px 10px;
    border-radius: 7px;
    font-size: 12.5px;
    color: ${C.textMuted};
    text-decoration: none;
    transition: background 120ms ease, color 120ms ease;
    cursor: pointer;
    background: transparent;
    border: none;
    text-align: left;

    &:hover {
        background: ${C.hoverNav};
        color: ${C.textSecondary};
    }
`;

const MainCol = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
    overflow: hidden;
`;

const Topbar = styled.header`
    display: flex;
    align-items: center;
    gap: 14px;
    height: 56px;
    padding: 0 24px;
    background: ${C.headerBg};
    border-bottom: 1px solid ${C.headerBorder};
    flex-shrink: 0;
`;

const HamburgerBtn = styled.button`
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    color: ${C.textMuted};
    padding: 4px;
    border-radius: 6px;
    transition: color 120ms ease, background 120ms ease;

    &:hover {
        color: ${C.textPrimary};
        background: ${C.hoverNav};
    }

    @media (max-width: 1023px) {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

const PageTitle = styled.h1`
    font-size: 14px;
    font-weight: 500;
    color: ${C.textPrimary};
`;

const AlertsWrap = styled.div`
    padding: 16px 24px 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Alert = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    border-radius: 10px;
    font-size: 13.5px;
    font-weight: 450;
    background: ${({ $type }) => ($type === 'success' ? C.flashSuccessBg : C.flashErrorBg)};
    border: 1px solid ${({ $type }) => ($type === 'success' ? C.flashSuccessBd : C.flashErrorBd)};
    color: ${({ $type }) => ($type === 'success' ? C.flashSuccessTx : C.flashErrorTx)};
`;

const AlertDot = styled.span`
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: ${({ $type }) => ($type === 'success' ? '#A7F3D0' : '#FECACA')};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 11px;
`;

const Main = styled.main`
    flex: 1;
    overflow-y: auto;
    padding: 24px;
`;

// ─── NavItem component ────────────────────────────────────────────────────────
function NavItem({ href, label, icon, active }) {
    return (
        <NavLink href={href} $active={active}>
            <NavIcon $active={active}>{icon}</NavIcon>
            {label}
        </NavLink>
    );
}

// ─── Layout ───────────────────────────────────────────────────────────────────
export default function AdminLayout({ title, children }) {
    const { auth, flash } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { url } = usePage();

    const isActive = (match) =>
        url === match || (match !== '/superadmin/dashboard' && url.startsWith(match));

    return (
        <>
            <GlobalStyle />
            <Shell>
                {/* Mobile overlay */}
                {sidebarOpen && (
                    <MobileOverlay onClick={() => setSidebarOpen(false)} />
                )}

                {/* Sidebar */}
                <Sidebar $open={sidebarOpen}>
                    <LogoArea>
                        <LogoSquare><span>A</span></LogoSquare>
                        <LogoTextWrap>
                            <LogoText>ERP SaaS</LogoText>
                            <LogoBadge>Admin</LogoBadge>
                        </LogoTextWrap>
                    </LogoArea>

                    <Nav>
                        {NAV.map((item) => (
                            <NavItem
                                key={item.href}
                                {...item}
                                active={isActive(item.match)}
                            />
                        ))}
                    </Nav>

                    <UserSection>
                        <UserRow>
                            <Avatar>
                                <span>{auth.user?.name?.[0]?.toUpperCase()}</span>
                            </Avatar>
                            <UserInfo>
                                <UserName>{auth.user?.name}</UserName>
                                <UserRole>Super Admin</UserRole>
                            </UserInfo>
                        </UserRow>
                        <LogoutBtn href="/logout" method="post" as="button">
                            <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Déconnexion
                        </LogoutBtn>
                    </UserSection>
                </Sidebar>

                {/* Main column */}
                <MainCol>
                    <Topbar>
                        <HamburgerBtn onClick={() => setSidebarOpen(true)}>
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </HamburgerBtn>
                        <PageTitle>{title}</PageTitle>
                    </Topbar>

                    {(flash?.success || flash?.error) && (
                        <AlertsWrap>
                            {flash.success && (
                                <Alert $type="success">
                                    <AlertDot $type="success">✓</AlertDot>
                                    {flash.success}
                                </Alert>
                            )}
                            {flash.error && (
                                <Alert $type="error">
                                    <AlertDot $type="error">✕</AlertDot>
                                    {flash.error}
                                </Alert>
                            )}
                        </AlertsWrap>
                    )}

                    <Main>{children}</Main>
                </MainCol>
            </Shell>
        </>
    );
}
