import { Product } from '@/types/product';
import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Star } from 'lucide-react';
function formatImageUrl(url?: string): string | undefined {
  if (!url) return undefined;

  return url === 'placeholder.svg' ? '/' + url : url;
}

export default function ProductCard({ product }: { product: Product }) {
  const t = useTranslations('products');

  return (
    <Card className="group overflow-hidden border-0 shadow-sm transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Image
            src={formatImageUrl(product.image?.url) || '/placeholder.svg'}
            alt={product.image?.alt || product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.badges.is_new && (
              <Badge className="bg-green-500 hover:bg-green-600">
                {t('badges.new')}
              </Badge>
            )}
            {product.badges.on_sale && (
              <Badge className="bg-red-500 hover:bg-red-600">
                {t('badges.sale')}
              </Badge>
            )}
            {product.badges.is_featured && (
              <Badge className="bg-orange-500 hover:bg-orange-600">
                {t('badges.featured')}
              </Badge>
            )}
          </div>

          <Button
            size="icon"
            variant="ghost"
            className="absolute top-3 right-3 bg-white/80 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white"
          >
            <Heart className="h-4 w-4" />
          </Button>

          <div className="absolute right-3 bottom-3 left-3 opacity-0 transition-opacity group-hover:opacity-100">
            <Button className="w-full" size="sm">
              <ShoppingCart className="mr-2 h-4 w-4" />
              {t('actions.addToCart')}
            </Button>
          </div>
        </div>

        <div className="space-y-3 p-4">
          <h3 className="line-clamp-2 text-sm leading-tight font-medium">
            {product.name}
          </h3>

          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(parseFloat(product.rating.average))
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-muted-foreground text-xs">
              ({product.rating.total_reviews})
            </span>
          </div>

          <div className="flex items-center gap-1">
            {product.colors.slice(0, 4).map((color) => (
              <div
                key={color.id}
                className="h-4 w-4 rounded-full border border-gray-200"
                style={{ backgroundColor: color.hex_code }}
                title={color.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-muted-foreground ml-1 text-xs">
                +{product.colors.length - 4}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1">
            {product.sizes.slice(0, 4).map((size) => (
              <Badge
                key={size.id}
                variant="outline"
                className="px-2 py-0 text-xs"
              >
                {size.name}
              </Badge>
            ))}
            {product.sizes.length > 4 && (
              <span className="text-muted-foreground text-xs">
                +{product.sizes.length - 4}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">
              {product.price.formatted.final}
            </span>
            {product.price.discount_percent > 0 && (
              <Badge variant="destructive" className="text-xs">
                -{product.price.discount_percent}%
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
