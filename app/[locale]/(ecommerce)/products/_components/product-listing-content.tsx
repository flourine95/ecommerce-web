import { useTranslations } from 'next-intl';
import { useProductParams } from '@/hooks/use-product-params';
import { useFilterStore } from '@/stores/use-filter-store';
import { useFilters, useProducts } from '@/services/product-service';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Filter, ShoppingCart } from 'lucide-react';
import FilterSection from './filter-section';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import AppliedFilters from './applied-filters';
import ProductsLoading from './product-loading';
import { Product } from '@/types/product';
import ProductCard from './product-card';
import PaginationComponent from './pagination-component';

export default function ProductListingContent() {
  const t = useTranslations('products');
  const { filters, updateFilters, clearFilters } = useProductParams();
  const { isFilterOpen, setIsFilterOpen } = useFilterStore();

  const {
    data: productsData,
    isLoading,
    error,
    refetch,
  } = useProducts(filters);
  const { data: filterOptions } = useFilters();

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="py-12 text-center">
          <p className="mb-4 text-red-500">{t('errors.loadFailed')}</p>
          <p className="text-muted-foreground mb-4 text-sm">
            {error.message || 'Unknown error occurred'}
          </p>
          <Button onClick={() => refetch()}>{t('actions.retry')}</Button>
        </div>
      </div>
    );
  }

  const products = productsData?.data.products || [];
  const pagination = productsData?.data.pagination;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">{t('title')}</h1>
          <p className="text-muted-foreground mt-1">
            {t('foundProducts', { count: pagination?.total || 0 })}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Mobile Filter Button */}
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden">
                <Filter className="mr-2 h-4 w-4" />
                {t('filters.title')}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto">
              <SheetHeader>
                <SheetTitle>{t('filters.title')}</SheetTitle>
                <SheetDescription>{t('filters.description')}</SheetDescription>
              </SheetHeader>
              <div className="mt-6">
                <FilterSection />
              </div>
            </SheetContent>
          </Sheet>

          {/* Sort Dropdown */}
          <Select
            value={filters.sort || 'created_at_desc'}
            onValueChange={(value) => updateFilters({ sort: value })}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder={t('sorting.placeholder')} />
            </SelectTrigger>
            <SelectContent>
              {filterOptions?.sort_options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Applied Filters */}
      <AppliedFilters />

      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden w-80 shrink-0 md:block">
          <div className="sticky top-4">
            <FilterSection />
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {isLoading ? (
            <ProductsLoading />
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              <PaginationComponent
                pagination={pagination}
                updateFilters={updateFilters}
              />
            </>
          ) : (
            <div className="py-12 text-center">
              <div className="mx-auto max-w-md">
                <div className="mb-4">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                    <ShoppingCart className="h-8 w-8 text-gray-400" />
                  </div>
                </div>
                <h3 className="mb-2 text-lg font-semibold">
                  {t('noProducts')}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {t('noProductsDescription')}
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  {t('actions.clearFilters')}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
