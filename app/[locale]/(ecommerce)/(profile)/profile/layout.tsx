'use client';

import type * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Lock, MapPin, Package, Settings, User } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const navigationItems = [
  {
    title: 'Hồ sơ cá nhân',
    href: '/profile',
    icon: User,
  },
  {
    title: 'Đơn hàng của tôi',
    href: '/profile/orders',
    icon: Package,
  },
  {
    title: 'Danh sách yêu thích',
    href: '/profile/wishlist',
    icon: Heart,
  },
  {
    title: 'Địa chỉ giao hàng',
    href: '/profile/addresses',
    icon: MapPin,
  },
  {
    title: 'Cài đặt tài khoản',
    href: '/profile/settings',
    icon: Settings,
  },
  {
    title: 'Đổi mật khẩu',
    href: '/profile/change-password',
    icon: Lock,
  },
];

const userData = {
  name: 'Nguyễn Văn An',
  email: 'nguyenvanan@example.com',
  avatar: '/public/placeholder.svg?height=120&width=120',
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <Card className="mb-6 p-6">
              <div className="mb-6 flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={userData.avatar || '/placeholder.svg'}
                    alt={userData.name}
                  />
                  <AvatarFallback className="text-lg">
                    {userData.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {userData.name}
                  </h2>
                  <p className="text-sm text-gray-600">{userData.email}</p>
                </div>
              </div>

              <nav className="space-y-1">
                {navigationItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                        isActive
                          ? 'border-r-2 border-blue-700 bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
                      )}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.title}
                    </Link>
                  );
                })}
              </nav>
            </Card>

            {/* Mobile Navigation */}
            <div className="mb-6 lg:hidden">
              <div className="flex space-x-1 overflow-x-auto pb-2">
                {navigationItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex items-center rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors',
                        isActive
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-white text-gray-700 hover:bg-gray-50',
                      )}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">{children}</div>
        </div>
      </div>
    </div>
  );
}
