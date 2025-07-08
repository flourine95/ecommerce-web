import {
  useQueryStates,
  parseAsInteger,
  parseAsString,
  parseAsArrayOf,
  parseAsBoolean,
} from 'nuqs';
import { useCallback } from 'react';
import { ProductFilters } from '@/types/product';

export const useProductParams = () => {
  const [params, setParams] = useQueryStates({
    search: parseAsString.withDefault(''),
    category_ids: parseAsArrayOf(parseAsInteger).withDefault([]),
    size_ids: parseAsArrayOf(parseAsInteger).withDefault([]),
    color_ids: parseAsArrayOf(parseAsInteger).withDefault([]),
    min_price: parseAsInteger,
    max_price: parseAsInteger,
    is_featured: parseAsBoolean,
    sort: parseAsString.withDefault('created_at_desc'),
    page: parseAsInteger.withDefault(1),
    per_page: parseAsInteger.withDefault(20),
  });

  const updateFilters = useCallback(
    (newFilters: Partial<ProductFilters>) => {
      setParams({
        ...newFilters,
        page: newFilters.page ?? 1, // Reset page when other filters change
      });
    },
    [setParams],
  );

  const clearFilters = useCallback(() => {
    setParams({
      search: '',
      category_ids: [],
      size_ids: [],
      color_ids: [],
      min_price: undefined,
      max_price: undefined,
      is_featured: undefined,
      sort: 'created_at_desc',
      page: 1,
      per_page: 20,
    });
  }, [setParams]);

  const toggleArrayFilter = useCallback(
    (key: 'category_ids' | 'size_ids' | 'color_ids', value: number) => {
      const currentArray = params[key] || [];
      const newArray = currentArray.includes(value)
        ? currentArray.filter((item) => item !== value)
        : [...currentArray, value];

      setParams({
        [key]: newArray,
        page: 1,
      });
    },
    [params, setParams],
  );

  return {
    filters: params as ProductFilters,
    updateFilters,
    clearFilters,
    toggleArrayFilter,
  };
};
