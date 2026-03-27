'use client';

import { ClientNav } from '@/components/qrius/ClientNav';
import { Card } from '@/components/ui/card';
import { useAppContext } from '@/lib/state-provider';
import { Clock, CheckCircle, Utensils, Truck } from 'lucide-react';

const STATUSES = [
  { key: 'reçue', label: 'Reçue', icon: CheckCircle },
  { key: 'en_préparation', label: 'En préparation', icon: Utensils },
  { key: 'prête', label: 'Prête', icon: CheckCircle },
  { key: 'servie', label: 'Servie', icon: Truck },
];

export default function OrderTrackingPage() {
  const { orders } = useAppContext();
  const tableNumber = 12;
  
  // Get orders for this table
  const tableOrders = orders.filter((o) => o.tableNumber === tableNumber);
  const currentOrder = tableOrders[tableOrders.length - 1] || null;

  const getStatusIndex = (status: string) => {
    return STATUSES.findIndex((s) => s.key === status);
  };

  const getElapsedTime = (createdAt: Date): string => {
    const elapsed = Math.floor((Date.now() - createdAt.getTime()) / 1000);
    if (elapsed < 60) return `${elapsed}s`;
    return `${Math.floor(elapsed / 60)}m`;
  };

  return (
    <div className="flex h-screen flex-col md:flex-row">
      <ClientNav />

      <main className="flex-1 flex flex-col pb-24 md:pb-0 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-4 z-10">
          <h1 className="text-xl font-bold text-foreground">Order Tracking</h1>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 md:p-6 max-w-2xl mx-auto w-full">
          {!currentOrder ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-6xl mb-4">📦</div>
              <h2 className="text-xl font-semibold text-foreground mb-2">No Active Orders</h2>
              <p className="text-muted-foreground">
                You don&apos;t have any active orders at the moment
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Order Header */}
              <Card className="p-4 bg-primary/5 border-primary">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      Table {currentOrder.tableNumber}
                    </p>
                    <h2 className="text-2xl font-bold text-foreground">Order #{currentOrder.id.slice(-6)}</h2>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Elapsed</p>
                    <p className="text-lg font-bold text-primary flex items-center justify-end gap-1">
                      <Clock className="w-5 h-5" />
                      {getElapsedTime(currentOrder.createdAt)}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Status Timeline */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground text-sm uppercase">Status Progress</h3>
                <div className="space-y-3">
                  {STATUSES.map((status, index) => {
                    const Icon = status.icon;
                    const currentStatusIndex = getStatusIndex(currentOrder.status);
                    const isCompleted = index < currentStatusIndex;
                    const isCurrent = index === currentStatusIndex;
                    const isUpcoming = index > currentStatusIndex;

                    return (
                      <div key={status.key} className="flex items-start gap-4">
                        {/* Timeline Node */}
                        <div className="flex flex-col items-center mt-1">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                              isCompleted || isCurrent
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-muted-foreground'
                            } ${isCurrent ? 'ring-4 ring-primary/30' : ''}`}
                          >
                            {isCompleted || isCurrent ? (
                              <Icon className="w-5 h-5" />
                            ) : (
                              <span>{index + 1}</span>
                            )}
                          </div>
                          {index < STATUSES.length - 1 && (
                            <div
                              className={`w-1 h-8 mt-2 ${
                                index < currentStatusIndex ? 'bg-primary' : 'bg-muted'
                              }`}
                            />
                          )}
                        </div>

                        {/* Status Info */}
                        <div className="flex-1 pt-2">
                          <p
                            className={`font-semibold ${
                              isCurrent ? 'text-primary text-lg' : 'text-foreground'
                            }`}
                          >
                            {status.label}
                          </p>
                          {isCurrent && (
                            <p className="text-sm text-muted-foreground mt-1">
                              Your order is being {status.label.toLowerCase()}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Items */}
              <Card className="p-4">
                <h3 className="font-semibold text-foreground mb-3">Order Items</h3>
                <div className="space-y-2">
                  {currentOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.name} x {item.quantity}
                      </span>
                      <span className="font-semibold text-foreground">
                        {(item.price * item.quantity).toLocaleString()} F
                      </span>
                    </div>
                  ))}
                  <div className="border-t border-border pt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-primary">{currentOrder.totalAmount.toLocaleString()} F</span>
                  </div>
                </div>
              </Card>

              {/* Estimated Time */}
              {currentOrder.status !== 'servie' && (
                <Card className="p-4 bg-accent/5 border-accent">
                  <p className="text-sm text-muted-foreground mb-1">Estimated Ready Time</p>
                  <p className="text-2xl font-bold text-foreground">~15-20 minutes</p>
                </Card>
              )}

              {/* Completion Message */}
              {currentOrder.status === 'servie' && (
                <Card className="p-4 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                  <p className="text-sm font-semibold text-green-700 dark:text-green-200">
                    ✓ Your order has been served. Enjoy your meal!
                  </p>
                </Card>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
