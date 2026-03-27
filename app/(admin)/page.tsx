'use client';

import { AdminNav } from '@/components/qrius/AdminNav';
import { useAppContext } from '@/lib/state-provider';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BarChart3, Menu, TrendingUp } from 'lucide-react';

export default function AdminHome() {
  const { orders, tables } = useAppContext();

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const completedOrders = orders.filter((o) => o.status === 'servie').length;
  const occupiedTables = tables.filter((t) => t.status === 'occupée').length;

  return (
    <div className="flex h-screen bg-background">
      <AdminNav />

      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="bg-card border-b border-border p-6 sticky top-0 z-10">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Restaurant management overview</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-6">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                Total Orders
              </p>
              <p className="text-4xl font-bold text-foreground">{totalOrders}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {completedOrders} completed today
              </p>
            </Card>

            <Card className="p-6">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                Total Revenue
              </p>
              <p className="text-3xl font-bold text-primary">
                {Math.round(totalRevenue / 1000)}K F
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Avg {Math.round(totalRevenue / Math.max(totalOrders, 1))} F/order
              </p>
            </Card>

            <Card className="p-6">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                Occupied Tables
              </p>
              <p className="text-4xl font-bold text-blue-600">{occupiedTables}</p>
              <p className="text-xs text-muted-foreground mt-2">
                of {tables.length} tables
              </p>
            </Card>

            <Card className="p-6">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                Completion Rate
              </p>
              <p className="text-4xl font-bold text-green-600">
                {totalOrders > 0 ? Math.round((completedOrders / totalOrders) * 100) : 0}%
              </p>
              <p className="text-xs text-muted-foreground mt-2">Orders completed</p>
            </Card>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/admin/analytics" className="group">
              <Card className="p-6 hover:border-primary hover:shadow-lg transition-all cursor-pointer h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <BarChart3 className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">Analytics</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      View revenue, orders, and metrics
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  View Dashboard →
                </Button>
              </Card>
            </Link>

            <Link href="/admin/menu-management" className="group">
              <Card className="p-6 hover:border-primary hover:shadow-lg transition-all cursor-pointer h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <Menu className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">Menu Management</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Add, edit, or remove menu items
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Manage Menu →
                </Button>
              </Card>
            </Link>
          </div>

          {/* Summary Stats */}
          <Card className="p-6">
            <h3 className="font-semibold text-foreground mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Performance Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Orders by Status</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Received</span>
                    <span className="font-semibold">
                      {orders.filter((o) => o.status === 'reçue').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Preparing</span>
                    <span className="font-semibold">
                      {orders.filter((o) => o.status === 'en_préparation').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Ready</span>
                    <span className="font-semibold">
                      {orders.filter((o) => o.status === 'prête').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Served</span>
                    <span className="font-semibold">{completedOrders}</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Table Status</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Available</span>
                    <span className="font-semibold">
                      {tables.filter((t) => t.status === 'libre').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Occupied</span>
                    <span className="font-semibold">{occupiedTables}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Assistance Needed</span>
                    <span className="font-semibold">
                      {tables.filter((t) => t.status === 'demande_assistance').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Bill Pending</span>
                    <span className="font-semibold">
                      {tables.filter((t) => t.status === 'addition_demandée').length}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">System Health</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Kitchen Orders</span>
                    <span className="font-semibold">
                      {orders.filter((o) => o.status !== 'servie').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Active Tables</span>
                    <span className="font-semibold">
                      {tables.filter((t) => t.status !== 'libre').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Menu Items</span>
                    <span className="font-semibold">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Uptime</span>
                    <span className="font-semibold">100%</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
