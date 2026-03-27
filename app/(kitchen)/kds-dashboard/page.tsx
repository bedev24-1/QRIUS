'use client';

import { useEffect, useState } from 'react';
import { KitchenNav } from '@/components/qrius/KitchenNav';
import { OrderCard } from '@/components/qrius/kitchen/OrderCard';
import { useAppContext } from '@/lib/state-provider';
import { Order } from '@/lib/types';

export default function KDSDashboardPage() {
  const { orders } = useAppContext();
  const [sortedOrders, setSortedOrders] = useState<Order[]>([]);
  const [newOrderAlert, setNewOrderAlert] = useState<string | null>(null);

  useEffect(() => {
    // Sort orders by status priority and wait time
    const sorted = [...orders]
      .filter((o) => o.status !== 'servie')
      .sort((a, b) => {
        const statusOrder = { reçue: 0, en_préparation: 1, prête: 2, servie: 3 };
        const statusDiff = statusOrder[a.status] - statusOrder[b.status];
        if (statusDiff !== 0) return statusDiff;
        return a.createdAt.getTime() - b.createdAt.getTime();
      });

    setSortedOrders(sorted);

    // Show alert for new orders
    if (sorted.length > 0 && sorted[0].status === 'reçue') {
      setNewOrderAlert(sorted[0].id);
      const timer = setTimeout(() => setNewOrderAlert(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [orders]);

  const activeOrdersCount = orders.filter((o) => o.status !== 'servie').length;
  const readyOrdersCount = orders.filter((o) => o.status === 'prête').length;

  return (
    <div className="flex h-screen bg-background">
      <KitchenNav />

      <main className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-card border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Kitchen Display System</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {activeOrdersCount} active orders • {readyOrdersCount} ready
              </p>
            </div>
            <div className="flex gap-4">
              <div className="text-center">
                <p className="text-xs text-muted-foreground uppercase">Active</p>
                <p className="text-3xl font-bold text-foreground">{activeOrdersCount}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground uppercase">Ready</p>
                <p className="text-3xl font-bold text-green-600">{readyOrdersCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* New Order Alert */}
        {newOrderAlert && (
          <div className="bg-yellow-100 dark:bg-yellow-950 border-b-2 border-yellow-400 dark:border-yellow-600 px-6 py-4 animate-pulse">
            <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">
              🔔 New Order Received! Order #{newOrderAlert.slice(-6)}
            </p>
          </div>
        )}

        {/* Orders Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {sortedOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-6xl mb-4">👨‍🍳</div>
              <h2 className="text-xl font-semibold text-foreground mb-2">No Orders</h2>
              <p className="text-muted-foreground">Waiting for new orders...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedOrders.map((order) => (
                <div
                  key={order.id}
                  className={newOrderAlert === order.id ? 'animate-pulse' : ''}
                >
                  <OrderCard order={order} />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
