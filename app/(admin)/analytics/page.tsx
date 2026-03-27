'use client';

import { AdminNav } from '@/components/qrius/AdminNav';
import { Card } from '@/components/ui/card';
import { useAppContext } from '@/lib/state-provider';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { DollarSign, ShoppingCart, Clock } from 'lucide-react';

export default function AnalyticsPage() {
  const { orders } = useAppContext();

  // Calculate analytics
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const completedOrders = orders.filter((o) => o.status === 'servie').length;

  // Calculate average prep time
  const prepTimes = orders
    .filter((o) => o.startedAt && o.readyAt)
    .map((o) => {
      const time = (o.readyAt!.getTime() - o.startedAt!.getTime()) / 60000;
      return Math.round(time);
    });
  const averagePrepTime = prepTimes.length > 0
    ? Math.round(prepTimes.reduce((a, b) => a + b, 0) / prepTimes.length)
    : 0;

  // Revenue by hour
  const revenueByHour = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    const hourRevenue = orders
      .filter((o) => {
        const orderHour = o.createdAt.getHours().toString().padStart(2, '0');
        return orderHour === hour;
      })
      .reduce((sum, o) => sum + o.totalAmount, 0);
    return { hour: `${hour}:00`, revenue: hourRevenue };
  }).filter((item) => item.revenue > 0);

  // Top items
  const itemCounts: Record<string, { name: string; count: number; revenue: number }> = {};
  orders.forEach((order) => {
    order.items.forEach((item) => {
      if (!itemCounts[item.menuItemId]) {
        itemCounts[item.menuItemId] = { name: item.name, count: 0, revenue: 0 };
      }
      itemCounts[item.menuItemId].count += item.quantity;
      itemCounts[item.menuItemId].revenue += item.price * item.quantity;
    });
  });

  const topItems = Object.values(itemCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Prep time trend
  const prepTimeTrend = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    const hourPrepTimes = orders
      .filter((o) => {
        const orderHour = o.createdAt.getHours().toString().padStart(2, '0');
        return orderHour === hour && o.startedAt && o.readyAt;
      })
      .map((o) => (o.readyAt!.getTime() - o.startedAt!.getTime()) / 60000);

    const avgTime =
      hourPrepTimes.length > 0
        ? Math.round(hourPrepTimes.reduce((a, b) => a + b, 0) / hourPrepTimes.length)
        : 0;

    return { hour: `${hour}:00`, avgTime };
  }).filter((item) => item.avgTime > 0);

  return (
    <div className="flex h-screen bg-background">
      <AdminNav />

      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="bg-card border-b border-border p-6 sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-foreground">Analytics Dashboard</h1>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6 flex items-start gap-4">
              <div className="bg-primary/10 rounded-lg p-3">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground uppercase">Total Revenue</p>
                <p className="text-3xl font-bold text-foreground mt-1">
                  {totalRevenue.toLocaleString()} F
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {completedOrders} completed orders
                </p>
              </div>
            </Card>

            <Card className="p-6 flex items-start gap-4">
              <div className="bg-primary/10 rounded-lg p-3">
                <ShoppingCart className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground uppercase">Total Orders</p>
                <p className="text-3xl font-bold text-foreground mt-1">{totalOrders}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Average {(totalRevenue / Math.max(totalOrders, 1)).toLocaleString()} F per order
                </p>
              </div>
            </Card>

            <Card className="p-6 flex items-start gap-4">
              <div className="bg-primary/10 rounded-lg p-3">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground uppercase">Avg Prep Time</p>
                <p className="text-3xl font-bold text-foreground mt-1">{averagePrepTime} min</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {prepTimes.length} orders measured
                </p>
              </div>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue by Hour */}
            {revenueByHour.length > 0 && (
              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Revenue by Hour</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueByHour}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="var(--color-primary)" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            )}

            {/* Top Items */}
            {topItems.length > 0 && (
              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Top Selling Items</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={topItems} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={150} />
                    <Tooltip />
                    <Bar dataKey="count" fill="var(--color-primary)" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            )}

            {/* Prep Time Trend */}
            {prepTimeTrend.length > 0 && (
              <Card className="p-6 lg:col-span-2">
                <h3 className="font-semibold text-foreground mb-4">Average Prep Time by Hour</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={prepTimeTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="avgTime"
                      stroke="var(--color-primary)"
                      name="Avg Time (min)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            )}
          </div>

          {/* Recent Orders Table */}
          <Card className="p-6">
            <h3 className="font-semibold text-foreground mb-4">Recent Orders</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                      Order
                    </th>
                    <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                      Table
                    </th>
                    <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                      Items
                    </th>
                    <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                      Revenue
                    </th>
                    <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(-10).map((order) => (
                    <tr key={order.id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-3">#{order.id.slice(-6)}</td>
                      <td className="py-3 px-3">{order.tableNumber}</td>
                      <td className="py-3 px-3">{order.items.reduce((sum, i) => sum + i.quantity, 0)}</td>
                      <td className="py-3 px-3 font-semibold text-primary">
                        {order.totalAmount.toLocaleString()} F
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            order.status === 'servie'
                              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                              : order.status === 'prête'
                                ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                                : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                          }`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
