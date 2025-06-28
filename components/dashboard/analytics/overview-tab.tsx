'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { OverviewCards } from '@/components/dashboard/analytics/overview-cards';
import { RevenueChart } from '@/components/dashboard/analytics/revenue-chart';
import { RecentTransactions } from '@/components/dashboard/analytics/recent-transactions';
import { AccountGrowth } from '@/components/dashboard/analytics/account-growth';
import { TopProducts } from '@/components/dashboard/analytics/top-products';
import { UserActivity } from '@/components/dashboard/analytics/user-activity';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function OverviewTab() {
  const [comparisonPeriod, setComparisonPeriod] = useState('previous_month');

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-2xl font-semibold">Dashboard Overview</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Compare to:</span>
          <Select value={comparisonPeriod} onValueChange={setComparisonPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="previous_month">Previous Month</SelectItem>
              <SelectItem value="previous_quarter">Previous Quarter</SelectItem>
              <SelectItem value="previous_year">Previous Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <OverviewCards comparisonPeriod={comparisonPeriod} />
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Revenue</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <RevenueChart comparisonPeriod={comparisonPeriod} />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RecentTransactions />
          </CardContent>
        </Card>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Account Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AccountGrowth comparisonPeriod={comparisonPeriod} />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Top Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TopProducts />
          </CardContent>
        </Card>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              User Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <UserActivity />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
