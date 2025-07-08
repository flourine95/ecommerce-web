import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  ProductsResponse,
  ProductFilters,
  FilterOptions,
} from '@/types/product';
import api from '@/lib/api';

export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: ProductFilters) => [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
  filters: () => [...productKeys.all, 'filters'] as const,
};

// Fetch filters
export const fetchFilters = async (): Promise<FilterOptions> => {
  const { data } = await api.get<{ success: boolean; data: FilterOptions }>(
    '/products/filters',
  );
  return data.data;
};

// Fetch products with filters
export const fetchProducts = async (
  filters: ProductFilters = {},
): Promise<ProductsResponse> => {
  const params = new URLSearchParams();

  // Add filters to params
  if (filters.search) params.append('search', filters.search);
  if (filters.category_ids?.length) {
    filters.category_ids.forEach((id) =>
      params.append('category_ids[]', id.toString()),
    );
  }
  if (filters.size_ids?.length) {
    filters.size_ids.forEach((id) =>
      params.append('size_ids[]', id.toString()),
    );
  }
  if (filters.color_ids?.length) {
    filters.color_ids.forEach((id) =>
      params.append('color_ids[]', id.toString()),
    );
  }
  if (filters.min_price !== undefined && filters.min_price !== null)
    params.append('min_price', filters.min_price.toString());
  if (filters.max_price !== undefined && filters.max_price !== null)
    params.append('max_price', filters.max_price.toString());
  if (filters.is_featured !== undefined && filters.is_featured !== null)
    params.append('is_featured', filters.is_featured ? '1' : '0');
  if (filters.sort) params.append('sort', filters.sort);
  if (filters.page !== undefined && filters.page !== null)
    params.append('page', filters.page.toString());
  if (filters.per_page !== undefined && filters.per_page !== null)
    params.append('per_page', filters.per_page.toString());

  const { data } = await api.get<ProductsResponse>(
    `/products?${params.toString()}`,
  );
  return data;
};

// Custom hook for products
export const useProducts = (
  filters: ProductFilters = {},
  options?: Omit<UseQueryOptions<ProductsResponse>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery({
    queryKey: productKeys.list(filters),
    queryFn: () => fetchProducts(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    ...options,
  });
};

// Custom hook for filters
export const useFilters = (
  options?: Omit<UseQueryOptions<FilterOptions>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery({
    queryKey: productKeys.filters(),
    queryFn: () => fetchFilters(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    ...options,
  });
};

// Prefetch products (useful for SSR or preloading)
export const prefetchProducts = async (
  queryClient: any,
  filters: ProductFilters = {},
) => {
  await queryClient.prefetchQuery({
    queryKey: productKeys.list(filters),
    queryFn: () => fetchProducts(filters),
    staleTime: 5 * 60 * 1000,
  });
};
