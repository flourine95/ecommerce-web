import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

export function CategorySection() {
  const categories = [
    {
      name: "Men's Collection",
      image: '/placeholder.svg?height=600&width=400',
      href: '/products/men',
    },
    {
      name: "Women's Collection",
      image: '/placeholder.svg?height=600&width=400',
      href: '/products/women',
    },
    {
      name: 'Accessories',
      image: '/placeholder.svg?height=600&width=400',
      href: '/products/accessories',
    },
  ];

  return (
    <section className="space-y-6">
      <div className="flex flex-col items-center space-y-2 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Shop by Category</h2>
        <p className="text-muted-foreground max-w-[600px]">
          Browse our collections and find your perfect style
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.name} href={category.href}>
            <Card className="h-[300px] overflow-hidden transition-all hover:shadow-lg">
              <CardContent className="relative h-full p-0">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 hover:scale-105"
                  style={{ backgroundImage: `url(${category.image})` }}
                />
                <div className="absolute inset-0 bg-black/30 transition-colors hover:bg-black/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">
                    {category.name}
                  </h3>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
