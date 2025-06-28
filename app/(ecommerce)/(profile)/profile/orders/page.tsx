'use client';

import * as React from 'react';
import { Search, Eye, Package, Truck, CheckCircle, Clock } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const orders = [
  {
    id: 'DH001',
    date: '15/01/2024',
    total: '1.299.000đ',
    status: 'delivered',
    statusText: 'Đã giao hàng',
    items: [
      {
        name: 'iPhone 15 Pro Max',
        image: '/placeholder.svg?height=60&width=60',
        quantity: 1,
        price: '1.299.000đ',
      },
    ],
  },
  {
    id: 'DH002',
    date: '10/01/2024',
    total: '899.000đ',
    status: 'shipping',
    statusText: 'Đang giao hàng',
    items: [
      {
        name: 'MacBook Air M2',
        image: '/placeholder.svg?height=60&width=60',
        quantity: 1,
        price: '899.000đ',
      },
    ],
  },
  {
    id: 'DH003',
    date: '05/01/2024',
    total: '450.000đ',
    status: 'processing',
    statusText: 'Đang xử lý',
    items: [
      {
        name: 'AirPods Pro',
        image: '/placeholder.svg?height=60&width=60',
        quantity: 1,
        price: '299.000đ',
      },
      {
        name: 'Ốp lưng iPhone',
        image: '/placeholder.svg?height=60&width=60',
        quantity: 1,
        price: '151.000đ',
      },
    ],
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'delivered':
      return <CheckCircle className="h-4 w-4" />;
    case 'shipping':
      return <Truck className="h-4 w-4" />;
    case 'processing':
      return <Clock className="h-4 w-4" />;
    default:
      return <Package className="h-4 w-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'shipping':
      return 'bg-blue-100 text-blue-800';
    case 'processing':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function OrdersPage() {
  const [activeTab, setActiveTab] = React.useState('all');

  const filteredOrders = orders.filter((order) => {
    if (activeTab === 'all') return true;
    return order.status === activeTab;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Đơn hàng của tôi</h1>
          <p className="text-gray-600">Theo dõi và quản lý đơn hàng của bạn</p>
        </div>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              <Input placeholder="Tìm kiếm đơn hàng..." className="pl-10" />
            </div>
            <Select>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Lọc theo trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="processing">Đang xử lý</SelectItem>
                <SelectItem value="shipping">Đang giao hàng</SelectItem>
                <SelectItem value="delivered">Đã giao hàng</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Order Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Tất cả ({orders.length})</TabsTrigger>
          <TabsTrigger value="processing">Đang xử lý</TabsTrigger>
          <TabsTrigger value="shipping">Đang giao</TabsTrigger>
          <TabsTrigger value="delivered">Đã giao</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6 space-y-4">
          {filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="py-12 text-center">
                  <Package className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                  <h3 className="mb-2 text-lg font-medium text-gray-900">
                    Không có đơn hàng
                  </h3>
                  <p className="text-gray-600">
                    Bạn chưa có đơn hàng nào trong danh mục này.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            filteredOrders.map((order) => (
              <Card key={order.id}>
                <CardHeader className="pb-4">
                  <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div className="flex items-center space-x-4">
                      <div>
                        <CardTitle className="text-lg">
                          Đơn hàng #{order.id}
                        </CardTitle>
                        <p className="text-sm text-gray-600">
                          Đặt ngày {order.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1">{order.statusText}</span>
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        Chi tiết
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <Image
                          src={item.image || '/placeholder.svg'}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="h-16 w-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Số lượng: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">
                            {item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-medium">Tổng cộng:</span>
                        <span className="text-lg font-bold text-blue-600">
                          {order.total}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
