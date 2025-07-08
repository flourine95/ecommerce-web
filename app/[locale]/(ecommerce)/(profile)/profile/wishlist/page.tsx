'use client';

import * as React from 'react';
import { Heart, ShoppingCart, Trash2, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

const wishlistItems = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    price: '1.299.000đ',
    originalPrice: '1.499.000đ',
    image: '/placeholder.svg?height=200&width=200',
    inStock: true,
    discount: 13,
  },
  {
    id: 2,
    name: 'MacBook Air M2',
    price: '899.000đ',
    originalPrice: null,
    image: '/placeholder.svg?height=200&width=200',
    inStock: true,
    discount: 0,
  },
  {
    id: 3,
    name: 'AirPods Pro',
    price: '299.000đ',
    originalPrice: '349.000đ',
    image: '/placeholder.svg?height=200&width=200',
    inStock: false,
    discount: 14,
  },
  {
    id: 4,
    name: 'iPad Air',
    price: '699.000đ',
    originalPrice: null,
    image: '/placeholder.svg?height=200&width=200',
    inStock: true,
    discount: 0,
  },
];

export default function WishlistPage() {
  const [items, setItems] = React.useState(wishlistItems);

  const removeFromWishlist = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Danh sách yêu thích
          </h1>
          <p className="text-gray-600">
            {items.length} sản phẩm trong danh sách của bạn
          </p>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <Input
              placeholder="Tìm kiếm sản phẩm yêu thích..."
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Wishlist Items */}
      {items.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="py-12 text-center">
              <Heart className="mx-auto mb-4 h-12 w-12 text-gray-400" />
              <h3 className="mb-2 text-lg font-medium text-gray-900">
                Danh sách yêu thích trống
              </h3>
              <p className="mb-4 text-gray-600">
                Bạn chưa có sản phẩm yêu thích nào.
              </p>
              <Button>Khám phá sản phẩm</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <Card
              key={item.id}
              className="group overflow-hidden transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-square">
                <Image
                  src={item.image || '/placeholder.svg'}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
                {item.discount > 0 && (
                  <Badge className="absolute top-2 left-2 bg-red-500">
                    -{item.discount}%
                  </Badge>
                )}
                {!item.inStock && (
                  <div className="bg-opacity-50 absolute inset-0 flex items-center justify-center bg-black">
                    <Badge variant="secondary">Hết hàng</Badge>
                  </div>
                )}
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-2 right-2 bg-white hover:bg-red-50 hover:text-red-600"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                </Button>
              </div>

              <CardContent className="p-4">
                <h3 className="mb-2 line-clamp-2 font-medium text-gray-900">
                  {item.name}
                </h3>

                <div className="mb-3 flex items-center space-x-2">
                  <span className="text-lg font-bold text-blue-600">
                    {item.price}
                  </span>
                  {item.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      {item.originalPrice}
                    </span>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Button className="flex-1" disabled={!item.inStock}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {item.inStock ? 'Thêm vào giỏ' : 'Hết hàng'}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
