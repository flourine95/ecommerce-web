'use client';

import * as React from 'react';
import { Plus, Edit, Trash2, MapPin, Phone, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

const addresses = [
  {
    id: 1,
    type: 'Nhà riêng',
    name: 'Nguyễn Văn An',
    phone: '0123 456 789',
    address: '123 Đường Nguyễn Huệ, Phường Bến Nghé',
    district: 'Quận 1, TP.HCM',
    isDefault: true,
  },
  {
    id: 2,
    type: 'Văn phòng',
    name: 'Nguyễn Văn An',
    phone: '0123 456 789',
    address: '456 Đường Lê Lợi, Phường Bến Thành',
    district: 'Quận 1, TP.HCM',
    isDefault: false,
  },
];

export default function AddressesPage() {
  const [addressList, setAddressList] = React.useState(addresses);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const setDefaultAddress = (id: number) => {
    setAddressList(
      addressList.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      })),
    );
  };

  const deleteAddress = (id: number) => {
    setAddressList(addressList.filter((addr) => addr.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Địa chỉ giao hàng
          </h1>
          <p className="text-gray-600">Quản lý địa chỉ giao hàng của bạn</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Thêm địa chỉ mới
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Thêm địa chỉ mới</DialogTitle>
              <DialogDescription>
                Nhập thông tin địa chỉ giao hàng mới
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Họ và tên</Label>
                  <Input id="name" placeholder="Nhập họ tên" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input id="phone" placeholder="Nhập số điện thoại" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Địa chỉ chi tiết</Label>
                <Textarea
                  id="address"
                  placeholder="Số nhà, tên đường, phường/xã"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="district">Quận/Huyện, Tỉnh/Thành phố</Label>
                <Input
                  id="district"
                  placeholder="Chọn quận/huyện, tỉnh/thành phố"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Loại địa chỉ</Label>
                <Input id="type" placeholder="Nhà riêng, Văn phòng..." />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="default" />
                <Label htmlFor="default">Đặt làm địa chỉ mặc định</Label>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button className="flex-1">Lưu địa chỉ</Button>
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Hủy
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {addressList.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="py-12 text-center">
              <MapPin className="mx-auto mb-4 h-12 w-12 text-gray-400" />
              <h3 className="mb-2 text-lg font-medium text-gray-900">
                Chưa có địa chỉ giao hàng
              </h3>
              <p className="mb-4 text-gray-600">
                Thêm địa chỉ để thuận tiện cho việc giao hàng.
              </p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Thêm địa chỉ đầu tiên
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {addressList.map((address) => (
            <Card
              key={address.id}
              className={address.isDefault ? 'ring-2 ring-blue-500' : ''}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <CardTitle className="text-lg">{address.type}</CardTitle>
                    {address.isDefault && (
                      <Badge className="bg-blue-100 text-blue-800">
                        Mặc định
                      </Badge>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteAddress(address.id)}
                      disabled={address.isDefault}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2 text-gray-700">
                  <User className="h-4 w-4" />
                  <span>{address.name}</span>
                </div>

                <div className="flex items-center space-x-2 text-gray-700">
                  <Phone className="h-4 w-4" />
                  <span>{address.phone}</span>
                </div>

                <div className="flex items-start space-x-2 text-gray-700">
                  <MapPin className="mt-0.5 h-4 w-4" />
                  <div>
                    <p>{address.address}</p>
                    <p>{address.district}</p>
                  </div>
                </div>

                {!address.isDefault && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 w-full"
                    onClick={() => setDefaultAddress(address.id)}
                  >
                    Đặt làm mặc định
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
