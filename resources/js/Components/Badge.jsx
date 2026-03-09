const VARIANTS = {
  success: 'bg-success-50 text-success-700 ring-success-600/20',
  warning: 'bg-warning-50 text-warning-700 ring-warning-500/20',
  danger:  'bg-error-50 text-error-600 ring-error-500/20',
  info:    'bg-brand-50 text-brand-600 ring-brand-500/20',
  default: 'bg-gray-100 text-gray-600 ring-gray-400/20',
};

const DOT_COLORS = {
  success: 'bg-success-500',
  warning: 'bg-warning-500',
  danger:  'bg-error-500',
  info:    'bg-brand-500',
  default: 'bg-gray-400',
};

export default function Badge({ variant = 'default', dot = true, children }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${VARIANTS[variant] ?? VARIANTS.default}`}>
      {dot && (
        <span className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${DOT_COLORS[variant] ?? DOT_COLORS.default}`} />
      )}
      {children}
    </span>
  );
}
