import { useTranslations } from 'next-intl';
import { useProductParams } from '@/hooks/use-product-params';
import { useFilters } from '@/services/product-service';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function AppliedFilters() {
  const t = useTranslations('filters');
  const { filters, updateFilters, clearFilters, toggleArrayFilter } =
    useProductParams();
  const { data: filterOptions } = useFilters();

  const appliedFilters = [];

  // Search filter
  if (filters.search) {
    appliedFilters.push({
      key: 'search',
      label: `${t('search')}: "${filters.search}"`,
      onRemove: () => updateFilters({ search: '' }),
    });
  }

  // Category filters
  if (filters.category_ids?.length && filterOptions) {
    filters.category_ids.forEach((categoryId) => {
      const category = filterOptions.categories
        .flatMap((c) => [c, ...c.children])
        .find((c) => c.id === categoryId);

      if (category) {
        appliedFilters.push({
          key: `category-${categoryId}`,
          label: category.name,
          onRemove: () => toggleArrayFilter('category_ids', categoryId),
        });
      }
    });
  }

  // Size filters
  if (filters.size_ids?.length && filterOptions) {
    filters.size_ids.forEach((sizeId) => {
      const size = filterOptions.sizes.find((s) => s.id === sizeId);
      if (size) {
        appliedFilters.push({
          key: `size-${sizeId}`,
          label: `${t('size')}: ${size.display_name}`,
          onRemove: () => toggleArrayFilter('size_ids', sizeId),
        });
      }
    });
  }

  // Color filters
  if (filters.color_ids?.length && filterOptions) {
    filters.color_ids.forEach((colorId) => {
      const color = filterOptions.colors.find((c) => c.id === colorId);
      if (color) {
        appliedFilters.push({
          key: `color-${colorId}`,
          label: `${t('color')}: ${color.name}`,
          onRemove: () => toggleArrayFilter('color_ids', colorId),
        });
      }
    });
  }

  // Price range filter
  if (filters.min_price || filters.max_price) {
    const minPrice =
      filters.min_price ||
      (filterOptions ? parseInt(filterOptions.price_range.min) : 0);
    const maxPrice =
      filters.max_price ||
      (filterOptions ? parseInt(filterOptions.price_range.max) : 0);

    appliedFilters.push({
      key: 'price',
      label: `${t('priceRange')}: ${new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(minPrice)} - ${new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(maxPrice)}`,
      onRemove: () =>
        updateFilters({ min_price: undefined, max_price: undefined }),
    });
  }

  // Featured filter
  if (filters.is_featured) {
    appliedFilters.push({
      key: 'featured',
      label: t('featuredOnly'),
      onRemove: () => updateFilters({ is_featured: undefined }),
    });
  }

  if (appliedFilters.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium">{t('applied')}:</span>
        {appliedFilters.map((filter) => (
          <Badge
            key={filter.key}
            variant="secondary"
            className="hover:bg-destructive hover:text-destructive-foreground cursor-pointer"
            onClick={filter.onRemove}
          >
            {filter.label} ×
          </Badge>
        ))}
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-xs"
        >
          {t('clearAll')}
        </Button>
      </div>
    </div>
  );
}
