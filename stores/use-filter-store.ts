import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { ProductFilters } from '@/types/product';

interface FilterState {
  filters: ProductFilters;
  isFilterOpen: boolean;

  setFilter: <K extends keyof ProductFilters>(
    key: K,
    value: ProductFilters[K],
  ) => void;
  toggleArrayFilter: <K extends keyof ProductFilters>(
    key: K,
    value: ProductFilters[K] extends (infer U)[] ? U : never,
  ) => void;
  clearFilters: () => void;
  setIsFilterOpen: (open: boolean) => void;
  resetPagination: () => void;
}

const initialFilters: ProductFilters = {
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
};

export const useFilterStore = create<FilterState>()(
  devtools(
    persist(
      (set, get) => ({
        filters: initialFilters,
        isFilterOpen: false,

        setFilter: (key, value) =>
          set(
            (state) => ({
              filters: {
                ...state.filters,
                [key]: value,
                page: key !== 'page' ? 1 : value, // Reset page when other filters change
              },
            }),
            false,
            `setFilter/${key}`,
          ),

        toggleArrayFilter: (key, value) =>
          set(
            (state) => {
              const currentArray = (state.filters[key] as any[]) || [];
              const newArray = currentArray.includes(value)
                ? currentArray.filter((item) => item !== value)
                : [...currentArray, value];

              return {
                filters: {
                  ...state.filters,
                  [key]: newArray,
                  page: 1, // Reset page when filters change
                },
              };
            },
            false,
            `toggleArrayFilter/${key}`,
          ),

        clearFilters: () =>
          set(
            {
              filters: { ...initialFilters },
            },
            false,
            'clearFilters',
          ),

        setIsFilterOpen: (open) =>
          set({ isFilterOpen: open }, false, 'setIsFilterOpen'),

        resetPagination: () =>
          set(
            (state) => ({
              filters: {
                ...state.filters,
                page: 1,
              },
            }),
            false,
            'resetPagination',
          ),
      }),
      {
        name: 'product-filters',
        partialize: (state) => ({ filters: state.filters }),
      },
    ),
    {
      name: 'FilterStore',
    },
  ),
);
