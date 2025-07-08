'use client';

import * as React from 'react';
import { Bell, MessageSquare, Shield, Globe } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [smsNotifications, setSmsNotifications] = React.useState(false);
  const [pushNotifications, setPushNotifications] = React.useState(true);
  const [orderUpdates, setOrderUpdates] = React.useState(true);
  const [promotions, setPromotions] = React.useState(false);
  const [newsletter, setNewsletter] = React.useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Cài đặt tài khoản</h1>
        <p className="text-gray-600">Quản lý tùy chọn và thông báo của bạn</p>
      </div>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="mr-2 h-5 w-5" />
            Cài đặt thông báo
          </CardTitle>
          <CardDescription>
            Chọn cách bạn muốn nhận thông báo từ chúng tôi
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Thông báo qua Email</Label>
                <p className="text-sm text-gray-600">
                  Nhận thông báo qua địa chỉ email của bạn
                </p>
              </div>
              <Switch
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Thông báo qua SMS</Label>
                <p className="text-sm text-gray-600">
                  Nhận tin nhắn SMS về đơn hàng và khuyến mãi
                </p>
              </div>
              <Switch
                checked={smsNotifications}
                onCheckedChange={setSmsNotifications}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Thông báo đẩy</Label>
                <p className="text-sm text-gray-600">
                  Nhận thông báo trên trình duyệt và ứng dụng
                </p>
              </div>
              <Switch
                checked={pushNotifications}
                onCheckedChange={setPushNotifications}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="mr-2 h-5 w-5" />
            Tùy chọn nội dung
          </CardTitle>
          <CardDescription>Chọn loại thông báo bạn muốn nhận</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Cập nhật đơn hàng</Label>
                <p className="text-sm text-gray-600">
                  Thông báo về trạng thái đơn hàng và giao hàng
                </p>
              </div>
              <Switch
                checked={orderUpdates}
                onCheckedChange={setOrderUpdates}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Khuyến mãi và ưu đãi</Label>
                <p className="text-sm text-gray-600">
                  Nhận thông tin về các chương trình khuyến mãi
                </p>
              </div>
              <Switch checked={promotions} onCheckedChange={setPromotions} />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Bản tin</Label>
                <p className="text-sm text-gray-600">
                  Nhận bản tin hàng tuần về sản phẩm mới
                </p>
              </div>
              <Switch checked={newsletter} onCheckedChange={setNewsletter} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Language and Region */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="mr-2 h-5 w-5" />
            Ngôn ngữ và khu vực
          </CardTitle>
          <CardDescription>Tùy chỉnh ngôn ngữ và múi giờ</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Ngôn ngữ</Label>
              <Select defaultValue="vi">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vi">Tiếng Việt</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Múi giờ</Label>
              <Select defaultValue="asia-ho-chi-minh">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asia-ho-chi-minh">
                    GMT+7 (Hồ Chí Minh)
                  </SelectItem>
                  <SelectItem value="asia-bangkok">GMT+7 (Bangkok)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            Quyền riêng tư
          </CardTitle>
          <CardDescription>Kiểm soát thông tin cá nhân của bạn</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Hiển thị hồ sơ công khai</Label>
                <p className="text-sm text-gray-600">
                  Cho phép người khác xem hồ sơ cơ bản của bạn
                </p>
              </div>
              <Switch />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Chia sẻ dữ liệu phân tích</Label>
                <p className="text-sm text-gray-600">
                  Giúp cải thiện dịch vụ bằng cách chia sẻ dữ liệu ẩn danh
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Vùng nguy hiểm</CardTitle>
          <CardDescription>Các hành động không thể hoàn tác</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div>
              <h4 className="font-medium">Xóa tài khoản</h4>
              <p className="text-sm text-gray-600">
                Xóa vĩnh viễn tài khoản và toàn bộ dữ liệu
              </p>
            </div>
            <Button variant="destructive">Xóa tài khoản</Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button size="lg">Lưu thay đổi</Button>
      </div>
    </div>
  );
}
