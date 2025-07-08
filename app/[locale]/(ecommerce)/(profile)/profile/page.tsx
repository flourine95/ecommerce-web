'use client';

import * as React from 'react';
import { Camera, Edit, Mail, MapPin, Package, Heart } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const userData = {
  name: 'Nguyễn Văn An',
  email: 'nguyenvanan@example.com',
  phone: '0123 456 789',
  dateOfBirth: '15/03/1990',
  gender: 'Nam',
  address: '123 Đường ABC, Quận 1, TP.HCM',
  bio: 'Yêu thích mua sắm trực tuyến và khám phá những sản phẩm mới.',
  joinDate: 'Tham gia từ tháng 3/2023',
  avatar: '/placeholder.svg?height=120&width=120',
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = React.useState(false);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-start space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-6">
            <div className="relative">
              <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
                <AvatarImage
                  src={userData.avatar || '/placeholder.svg'}
                  alt={userData.name}
                />
                <AvatarFallback className="text-2xl">
                  {userData.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                variant="outline"
                className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full p-0"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {userData.name}
                  </h1>
                  <p className="text-gray-600">{userData.joinDate}</p>
                </div>
                <Button
                  variant={isEditing ? 'outline' : 'default'}
                  onClick={() => setIsEditing(!isEditing)}
                  className="mt-2 sm:mt-0"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  {isEditing ? 'Hủy' : 'Chỉnh sửa'}
                </Button>
              </div>

              {userData.bio && (
                <p className="max-w-2xl text-gray-700">{userData.bio}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Mail className="mr-2 h-5 w-5" />
            Thông tin cá nhân
          </CardTitle>
          <CardDescription>Quản lý thông tin cá nhân của bạn</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Họ và tên</Label>
              <Input
                id="fullName"
                defaultValue={userData.name}
                disabled={!isEditing}
                className={!isEditing ? 'bg-gray-50' : ''}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue={userData.email}
                disabled={!isEditing}
                className={!isEditing ? 'bg-gray-50' : ''}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                defaultValue={userData.phone}
                disabled={!isEditing}
                className={!isEditing ? 'bg-gray-50' : ''}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Ngày sinh</Label>
              <Input
                id="dateOfBirth"
                defaultValue={userData.dateOfBirth}
                disabled={!isEditing}
                className={!isEditing ? 'bg-gray-50' : ''}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Địa chỉ</Label>
            <Input
              id="address"
              defaultValue={userData.address}
              disabled={!isEditing}
              className={!isEditing ? 'bg-gray-50' : ''}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Giới thiệu bản thân</Label>
            <Textarea
              id="bio"
              defaultValue={userData.bio}
              disabled={!isEditing}
              className={!isEditing ? 'bg-gray-50' : ''}
              rows={3}
            />
          </div>

          {isEditing && (
            <div className="flex space-x-4">
              <Button>Lưu thay đổi</Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Hủy
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="rounded-lg bg-blue-100 p-2">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-gray-600">Đơn hàng</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="rounded-lg bg-red-100 p-2">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-gray-600">Yêu thích</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="rounded-lg bg-green-100 p-2">
                <MapPin className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-gray-600">Địa chỉ</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
