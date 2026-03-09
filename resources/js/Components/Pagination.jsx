import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ links }) {
  if (!links || links.length <= 3) return null;

  return (
    <div className="flex items-center justify-center gap-1 mt-6">
      {links.map((link, i) => {
        const isPrev = i === 0;
        const isNext = i === links.length - 1;

        if (!link.url) {
          if (link.label === '...') {
            return (
              <span key={i} className="px-3 py-1.5 text-sm text-gray-400">…</span>
            );
          }
          return (
            <span
              key={i}
              className="inline-flex items-center justify-center min-w-[34px] h-[34px] rounded-lg px-2 text-sm text-gray-300 cursor-not-allowed"
            >
              {isPrev ? <ChevronLeft size={14} /> : isNext ? <ChevronRight size={14} /> : null}
              {!isPrev && !isNext && <span dangerouslySetInnerHTML={{ __html: link.label }} />}
            </span>
          );
        }

        return (
          <Link
            key={i}
            href={link.url}
            className={`inline-flex items-center justify-center min-w-[34px] h-[34px] rounded-lg px-2 text-sm font-medium transition-colors ${
              link.active
                ? 'bg-brand-500 text-white shadow-theme-xs'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {isPrev
              ? <ChevronLeft size={14} />
              : isNext
              ? <ChevronRight size={14} />
              : <span dangerouslySetInnerHTML={{ __html: link.label }} />
            }
          </Link>
        );
      })}
    </div>
  );
}
