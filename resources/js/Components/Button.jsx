import { motion } from 'framer-motion';

const VARIANTS = {
  primary:   'bg-brand-500 text-white hover:bg-brand-600 shadow-theme-xs',
  admin:     'bg-orange-500 text-white hover:bg-orange-600 shadow-theme-xs',
  secondary: 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-theme-xs',
  danger:    'bg-white border border-error-200 text-error-600 hover:bg-error-50',
  ghost:     'bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700',
  success:   'bg-success-500 text-white hover:bg-success-600 shadow-theme-xs',
};

const SIZES = {
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-5 py-2.5 text-sm gap-2',
};

export default function Button({
  variant = 'secondary',
  size = 'md',
  children,
  disabled,
  className = '',
  ...props
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-lg font-semibold transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${VARIANTS[variant] ?? VARIANTS.secondary} ${SIZES[size] ?? SIZES.md} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
