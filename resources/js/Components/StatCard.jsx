import { motion } from 'framer-motion';

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  iconBg = 'bg-brand-50',
  iconColor = 'text-brand-500',
  index = 0,
  trend,
  trendUp,
}) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.25, delay: index * 0.07 }}
      className="bg-white border border-gray-200 rounded-2xl p-5 shadow-theme-xs hover:shadow-theme-md transition-shadow"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5">{title}</p>
          <p className="text-2xl font-bold text-gray-900 tabular-nums mb-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
          {trend !== undefined && (
            <p className={`text-xs font-medium mt-1 ${trendUp ? 'text-success-600' : 'text-error-500'}`}>
              {trendUp ? '↑' : '↓'} {trend}
            </p>
          )}
        </div>
        {icon && (
          <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0 ${iconColor}`}>
            {icon}
          </div>
        )}
      </div>
    </motion.div>
  );
}
