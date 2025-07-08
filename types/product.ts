export interface Color {
  id: number;
  name: string;
  hex_code: string;
}

export interface Size {
  id: number;
  name: string;
  display_name: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  parent_id?: number;
}

export interface ProductImage {
  url: string;
  alt: string;
}

export interface ProductPrice {
  original: number | null;
  final: string;
  discount_percent: number;
  formatted: {
    original: string | null;
    final: string;
  };
}

export interface ProductRating {
  average: string;
  total_reviews: number;
  formatted_average: string;
}

export interface ProductBadges {
  is_featured: boolean;
  is_new: boolean;
  on_sale: boolean;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  short_description: string;
  sku: string;
  price: ProductPrice;
  stock_info: {
    in_stock: boolean;
    stock_quantity: number;
    manage_stock: boolean;
  };
  image: ProductImage;
  colors: Color[];
  sizes: Size[];
  categories: Category[];
  rating: ProductRating;
  badges: ProductBadges;
  created_at: string;
  updated_at: string;
}

export interface CategoryFilter {
  id: number;
  name: string;
  slug: string;
  product_count: number;
  children: CategoryFilter[];
}

export interface FilterOptions {
  categories: CategoryFilter[];
  sizes: Size[];
  colors: Color[];
  price_range: {
    min: string;
    max: string;
    formatted: {
      min: string;
      max: string;
    };
  };
  sort_options: Array<{
    value: string;
    label: string;
  }>;
}

export interface ProductsResponse {
  success: boolean;
  code: number;
  message: string;
  data: {
    products: Product[];
    pagination: {
      current_page: number;
      last_page: number;
      per_page: number;
      total: number;
      from: number;
      to: number;
    };
    filters: FilterOptions;
    applied_filters: any[];
  };
}

export interface ProductFilters {
  search?: string;
  category_ids?: number[];
  size_ids?: number[];
  color_ids?: number[];
  min_price?: number;
  max_price?: number;
  is_featured?: boolean;
  sort?: string;
  page?: number;
  per_page?: number;
}
