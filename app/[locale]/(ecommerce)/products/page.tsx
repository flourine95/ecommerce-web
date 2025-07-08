'use client';

import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import ProductListingContent from './_components/product-listing-content';

export default function ProductListing() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </div>
      }
    >
      <ProductListingContent />
    </Suspense>
  );
}
