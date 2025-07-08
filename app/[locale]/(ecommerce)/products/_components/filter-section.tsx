import { useTranslations } from 'next-intl';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { useProductParams } from '@/hooks/use-product-params';
import { useFilters } from '@/services/product-service';
import { CategoryFilter } from '@/types/product';
import { FilterLoading } from '@/app/[locale]/(ecommerce)/products/_components/filter-loading';
import { useState } from 'react';

function shortenColorName(name: string) {
  const words = name.trim().split(' ');
  if (words.length >= 2) {
    return `${words[0][0]}.${words.slice(1).join(' ')}`;
  }
  return name;
}

function getSelectedChildrenCount(
  category: CategoryFilter,
  selectedCategoryIds: number[],
): number {
  return category.children.filter((child) =>
    selectedCategoryIds.includes(child.id),
  ).length;
}

export default function FilterSection() {
  const t = useTranslations('filters');
  const { filters, toggleArrayFilter, updateFilters, clearFilters } =
    useProductParams();
  const { data: filterOptions, isLoading: filtersLoading } = useFilters();
  const [priceRange, setPriceRange] = useState([
    filters.min_price || parseInt(filterOptions?.price_range.min || '0'),
    filters.max_price || parseInt(filterOptions?.price_range.max || '10000000'),
  ]);
  if (filtersLoading || !filterOptions) {
    return <FilterLoading />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{t('title')}</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          {t('clearAll')}
        </Button>
      </div>

      {/* Search */}
      <div className="space-y-3">
        <h4 className="font-medium">{t('search')}</h4>
        <Input
          placeholder={t('searchPlaceholder')}
          value={filters.search || ''}
          onChange={(e) => updateFilters({ search: e.target.value })}
        />
      </div>

      <Separator />

      {/* Categories */}
      <div className="space-y-3">
        <h4 className="font-medium">{t('categories')}</h4>
        <Accordion type="multiple" className="w-full">
          {filterOptions.categories.map((category: CategoryFilter) => {
            const selectedCount = getSelectedChildrenCount(
              category,
              filters.category_ids || [],
            );
            return (
              <AccordionItem
                key={category.id}
                value={category.id.toString()}
                className="border-b-0"
              >
                <AccordionTrigger className="py-2 text-sm font-medium hover:no-underline">
                  {category.name} ({selectedCount})
                </AccordionTrigger>
                <AccordionContent className="pb-2">
                  <div className="space-y-2 pl-4">
                    {category.children.map((child) => (
                      <div
                        key={child.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`category-${child.id}`}
                          checked={
                            filters.category_ids?.includes(child.id) || false
                          }
                          onCheckedChange={() =>
                            toggleArrayFilter('category_ids', child.id)
                          }
                        />
                        <Label
                          htmlFor={`category-${child.id}`}
                          className="text-sm font-normal"
                        >
                          {child.name} ({child.product_count})
                        </Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>

      <Separator />

      {/* Sizes */}
      <div className="space-y-3">
        <h4 className="font-medium">{t('sizes')}</h4>
        <div className="grid grid-cols-3 gap-2">
          {filterOptions.sizes.map((size) => (
            <div key={size.id} className="flex items-center space-x-2">
              <Checkbox
                id={`size-${size.id}`}
                checked={filters.size_ids?.includes(size.id) || false}
                onCheckedChange={() => toggleArrayFilter('size_ids', size.id)}
              />
              <Label
                htmlFor={`size-${size.id}`}
                className="text-sm font-normal"
              >
                {size.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Colors */}
      <div className="space-y-3">
        <h4 className="font-medium">{t('colors')}</h4>
        <div className="grid grid-cols-3 gap-2">
          {filterOptions.colors.map((color) => (
            <div key={color.id} className="flex items-center space-x-2">
              <Checkbox
                id={`color-${color.id}`}
                checked={filters.color_ids?.includes(color.id) || false}
                onCheckedChange={() => toggleArrayFilter('color_ids', color.id)}
              />
              <div className="flex items-center gap-2">
                <div
                  className="h-4 w-4 rounded-full border border-gray-200"
                  style={{ backgroundColor: color.hex_code }}
                />
                <Label
                  htmlFor={`color-${color.id}`}
                  className="text-xs font-normal"
                >
                  {shortenColorName(color.name)}
                </Label>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-3">
        <h4 className="font-medium">{t('priceRange')}</h4>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={(val) => setPriceRange(val)}
            onValueCommit={([min, max]) => {
              updateFilters({
                min_price: min,
                max_price: max,
              });
            }}
            max={parseInt(filterOptions.price_range.max)}
            min={parseInt(filterOptions.price_range.min)}
            step={50000}
            className="w-full"
          />
          <div className="text-muted-foreground mt-2 flex justify-between text-sm">
            <span>
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(
                filters.min_price || parseInt(filterOptions.price_range.min),
              )}
            </span>
            <span>
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(
                filters.max_price || parseInt(filterOptions.price_range.max),
              )}
            </span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Featured Toggle */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="featured"
            checked={filters.is_featured || false}
            onCheckedChange={(checked) =>
              updateFilters({ is_featured: checked ? true : undefined })
            }
          />
          <Label htmlFor="featured" className="text-sm font-medium">
            {t('featuredOnly')}
          </Label>
        </div>
      </div>
    </div>
  );
}
