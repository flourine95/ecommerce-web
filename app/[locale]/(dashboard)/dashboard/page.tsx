'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RoleGate } from '@/components/auth/role-gate';
import { useAuth } from '@/hooks/use-auth';
import {
  BarChart3,
  Package,
  Users,
  DollarSign,
  TrendingUp,
  Eye,
} from 'lucide-react';

export default function DashboardPage() {
  const { user, hasRole, hasPermission } = useAuth();

  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,231.89',
      description: '+20.1% from last month',
      icon: DollarSign,
      roles: ['admin', 'editor'],
    },
    {
      title: 'Total Products',
      value: '2,350',
      description: '+180.1% from last month',
      icon: Package,
      roles: ['admin', 'editor'],
    },
    {
      title: 'Active Users',
      value: '12,234',
      description: '+19% from last month',
      icon: Users,
      roles: ['admin'],
    },
    {
      title: 'Sales',
      value: '+12,234',
      description: '+19% from last month',
      icon: TrendingUp,
      roles: ['admin', 'editor'],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name}! Here's what's happening with your store
          today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <RoleGate key={stat.title} allowedRoles={stat.roles}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-muted-foreground text-xs">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          </RoleGate>
        ))}
      </div>

      {/* Role-based Content */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Admin Only Section */}
        <RoleGate allowedRoles={['admin']}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Management
              </CardTitle>
              <CardDescription>
                Manage users, roles, and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  As an admin, you have full access to manage all users and
                  their permissions.
                </p>
                <Button>Manage Users</Button>
              </div>
            </CardContent>
          </Card>
        </RoleGate>

        {/* Editor and Admin Section */}
        <RoleGate allowedRoles={['admin', 'editor']}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Product Management
              </CardTitle>
              <CardDescription>Manage products and inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  You can view and edit products in the store.
                </p>
                <div className="flex gap-2">
                  <Button>View Products</Button>
                  {hasPermission('create products') && (
                    <Button variant="outline">Add Product</Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </RoleGate>

        {/* Viewer Section */}
        <RoleGate allowedRoles={['viewer']}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Read Only Access
              </CardTitle>
              <CardDescription>
                You have view-only access to the dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  As a viewer, you can only view information but cannot make
                  changes.
                </p>
                <Button variant="outline">View Reports</Button>
              </div>
            </CardContent>
          </Card>
        </RoleGate>
      </div>

      {/* User Info */}
      <Card>
        <CardHeader>
          <CardTitle>Your Account Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">Name: {user?.name}</p>
              <p className="text-muted-foreground text-sm">
                Email: {user?.email}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Roles:</p>
              <div className="mt-1 flex gap-2">
                {user?.roles?.map((role) => (
                  <span
                    key={role}
                    className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Permissions:</p>
              <div className="mt-1 flex flex-wrap gap-2">
                {user?.permissions?.map((permission) => (
                  <span
                    key={permission}
                    className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800"
                  >
                    {permission}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
