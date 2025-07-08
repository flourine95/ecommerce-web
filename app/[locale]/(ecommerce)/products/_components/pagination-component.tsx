import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

export default function PaginationComponent({
  pagination,
  updateFilters,
}: any) {
  const t = useTranslations('pagination');

  if (!pagination || pagination.last_page <= 1) return null;

  const getVisiblePages = () => {
    const current = pagination.current_page;
    const total = pagination.last_page;
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, current - delta);
      i <= Math.min(total - 1, current + delta);
      i++
    ) {
      range.push(i);
    }

    if (current - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (current + delta < total - 1) {
      rangeWithDots.push('...', total);
    } else {
      rangeWithDots.push(total);
    }

    return rangeWithDots;
  };

  return (
    <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
      <div className="text-muted-foreground text-sm">
        {t('showing', {
          from: pagination.from,
          to: pagination.to,
          total: pagination.total,
        })}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={pagination.current_page === 1}
          onClick={() => updateFilters({ page: pagination.current_page - 1 })}
        >
          {t('previous')}
        </Button>

        <div className="flex items-center gap-1">
          {getVisiblePages().map((page, index) => (
            <div key={index}>
              {page === '...' ? (
                <span className="px-3 py-2 text-sm">...</span>
              ) : (
                <Button
                  variant={
                    page === pagination.current_page ? 'default' : 'outline'
                  }
                  size="sm"
                  onClick={() => updateFilters({ page })}
                  className="min-w-[40px]"
                >
                  {page}
                </Button>
              )}
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          disabled={pagination.current_page === pagination.last_page}
          onClick={() => updateFilters({ page: pagination.current_page + 1 })}
        >
          {t('next')}
        </Button>
      </div>
    </div>
  );
}
