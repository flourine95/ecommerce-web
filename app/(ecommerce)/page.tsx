import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FeaturedProducts } from '@/components/ecommerce/featured-products';
import { HeroSection } from '@/components/ecommerce/hero-section';
import { CategorySection } from '@/components/ecommerce/category-section';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <HeroSection />
      <div className="container mx-auto space-y-16 px-4 py-12">
        <CategorySection />
        <FeaturedProducts />
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Ready to upgrade your style?
          </h2>
          <p className="text-muted-foreground max-w-[600px]">
            Discover our latest collections and find your perfect fit.
          </p>
          <Button asChild size="lg">
            <Link href="/products">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Shop Now
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
