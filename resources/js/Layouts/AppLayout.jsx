import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  LayoutDashboard, Package, ScanLine, ShoppingCart,
  Users, CreditCard, BarChart2, LogOut, CheckCircle,
  XCircle, ChevronLeft, ChevronRight, Menu, Settings,
} from 'lucide-react';

/* ── Navigation items ─────────────────────────────────── */
const NAV = [
  { href: '/dashboard',  label: 'Tableau de bord', icon: LayoutDashboard, match: '/dashboard' },
  { href: '/products',   label: 'Produits',         icon: Package,         match: '/products' },
  { href: '/scan',       label: 'Scanner',          icon: ScanLine,        match: '/scan' },
  { href: '/sales',      label: 'Ventes',           icon: ShoppingCart,    match: '/sales' },
  { href: '/clients',    label: 'Clients',          icon: Users,           match: '/clients' },
  { href: '/payments',   label: 'Paiements',        icon: CreditCard,      match: '/payments' },
  { href: '/stats',      label: 'Statistiques',     icon: BarChart2,       match: '/stats' },
  { href: '/settings',   label: 'Paramètres',       icon: Settings,        match: '/settings' },
];

/* ── Single nav link ──────────────────────────────────── */
function NavItem({ href, label, icon: Icon, active, showLabel }) {
  return (
    <Link
      href={href}
      className={`menu-item group ${active ? 'menu-item-active' : 'menu-item-inactive'} ${!showLabel ? 'justify-center px-0' : ''}`}
    >
      <span className={`flex-shrink-0 transition-colors ${active ? 'menu-item-icon-active' : 'menu-item-icon-inactive'}`}>
        <Icon size={18} strokeWidth={1.8} />
      </span>
      {showLabel && <span className="truncate">{label}</span>}
    </Link>
  );
}

/* ── Main layout ──────────────────────────────────────── */
export default function AppLayout({ title, children }) {
  const { auth, flash } = usePage().props;
  const { url } = usePage();

  // Desktop sidebar toggle (expanded ↔ icon-only)
  const [expanded, setExpanded] = useState(true);
  // Hover-expand when collapsed
  const [hovered, setHovered] = useState(false);
  // Mobile slide-in
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (match) =>
    url === match || (match !== '/dashboard' && url.startsWith(match));

  // Whether sidebar shows labels (expanded or hover-expanded or mobile open)
  const showLabel = expanded || hovered || mobileOpen;
  // Sidebar visual width
  const sidebarExpanded = expanded || hovered;

  return (
    <div className="flex min-h-screen bg-gray-50 font-outfit">

      {/* ── Mobile backdrop ──────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-[998] bg-gray-900/50 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* ── Sidebar ───────────────────────────────────── */}
      <aside
        onMouseEnter={() => !expanded && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={[
          'fixed top-0 left-0 bottom-0 z-[999] flex flex-col',
          'bg-white border-r border-gray-200',
          'transition-all duration-300 ease-in-out',
          // Desktop width
          sidebarExpanded ? 'lg:w-[290px]' : 'lg:w-[90px]',
          // Mobile: full width when open, hidden when closed
          mobileOpen ? 'w-[290px] translate-x-0' : 'w-[290px] -translate-x-full',
          'lg:translate-x-0',
        ].join(' ')}
      >
        {/* Logo / Brand */}
        <div className={`flex items-center h-16 border-b border-gray-200 flex-shrink-0 overflow-hidden px-4 ${!showLabel ? 'lg:justify-center lg:px-0' : 'gap-3'}`}>
          <div className="w-8 h-8 bg-brand-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-theme-sm">
            <span className="text-white text-sm font-bold">E</span>
          </div>
          {showLabel && (
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-gray-900 truncate">ERP SaaS</span>
              <span className="text-xs text-brand-500 font-medium">Vendeur</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto no-scrollbar py-5">
          {showLabel && (
            <p className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Menu
            </p>
          )}
          <nav className={`flex flex-col gap-0.5 ${showLabel ? 'px-3' : 'px-2'}`}>
            {NAV.map((item) => (
              <NavItem
                key={item.href}
                {...item}
                active={isActive(item.match)}
                showLabel={showLabel}
              />
            ))}
          </nav>
        </div>

        {/* User footer */}
        <div className="border-t border-gray-200 p-3 flex-shrink-0">
          {showLabel ? (
            <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-gray-50 transition-colors mb-1">
              <div className="w-8 h-8 bg-brand-50 border border-brand-200 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-semibold text-brand-600">
                  {auth.user?.name?.[0]?.toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{auth.user?.name}</p>
                <p className="text-xs text-gray-400 truncate">{auth.user?.email}</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center mb-1">
              <div className="w-8 h-8 bg-brand-50 border border-brand-200 rounded-full flex items-center justify-center">
                <span className="text-xs font-semibold text-brand-600">
                  {auth.user?.name?.[0]?.toUpperCase()}
                </span>
              </div>
            </div>
          )}
          <Link
            href="/logout"
            method="post"
            as="button"
            className={`flex items-center gap-2 w-full px-2 py-1.5 rounded-lg text-xs text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors ${!showLabel ? 'justify-center' : ''}`}
          >
            <LogOut size={14} />
            {showLabel && 'Déconnexion'}
          </Link>
        </div>
      </aside>

      {/* ── Main content ──────────────────────────────── */}
      {/*
        On desktop: push content right by sidebar width.
        Hover-expand is overlay (no layout shift).
        On mobile: no margin (sidebar overlays).
      */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${expanded ? 'lg:ml-[290px]' : 'lg:ml-[90px]'}`}>

        {/* Top header */}
        <header className="sticky top-0 z-[99] flex items-center gap-3 h-16 px-4 lg:px-6 bg-white border-b border-gray-200 flex-shrink-0 shadow-theme-xs">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <Menu size={18} />
          </button>

          {/* Desktop sidebar toggle */}
          <button
            onClick={() => { setExpanded((v) => !v); setHovered(false); }}
            className="hidden lg:flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
          >
            {expanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>

          {/* Page title */}
          <h1 className="text-sm font-semibold text-gray-800 flex-1 truncate">{title}</h1>

          {/* User info */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end leading-tight">
              <span className="text-xs font-medium text-gray-700">{auth.user?.name}</span>
              <span className="text-xs text-brand-500">Vendeur</span>
            </div>
            <div className="w-8 h-8 bg-brand-50 border border-brand-200 rounded-full flex items-center justify-center">
              <span className="text-xs font-semibold text-brand-600">
                {auth.user?.name?.[0]?.toUpperCase()}
              </span>
            </div>
          </div>
        </header>

        {/* Flash messages */}
        <AnimatePresence>
          {(flash?.success || flash?.error) && (
            <motion.div
              key="flash"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="px-4 lg:px-6 pt-4 flex flex-col gap-2"
            >
              {flash.success && (
                <div className="flex items-center gap-2.5 px-4 py-3 bg-success-50 border border-success-200 rounded-xl text-sm text-success-700">
                  <CheckCircle size={15} className="text-success-500 flex-shrink-0" />
                  {flash.success}
                </div>
              )}
              {flash.error && (
                <div className="flex items-center gap-2.5 px-4 py-3 bg-error-50 border border-error-200 rounded-xl text-sm text-error-700">
                  <XCircle size={15} className="text-error-500 flex-shrink-0" />
                  {flash.error}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
