'use client';

import { Order, OrderStatus } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAppContext } from '@/lib/state-provider';
import { Play, CheckCircle, Clock } from 'lucide-react';

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  const { updateOrderStatus } = useAppContext();
  
  const getElapsedTime = (): string => {
    const elapsed = Math.floor((Date.now() - order.createdAt.getTime()) / 1000);
    if (elapsed < 60) return `${elapsed}s ago`;
    return `${Math.floor(elapsed / 60)}m ago`;
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'reçue':
        return 'bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800';
      case 'en_préparation':
        return 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800';
      case 'prête':
        return 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800';
      case 'servie':
        return 'bg-gray-50 dark:bg-gray-950 border-gray-200 dark:border-gray-800';
    }
  };

  const getStatusLabel = (status: OrderStatus) => {
    switch (status) {
      case 'reçue':
        return 'New Order';
      case 'en_préparation':
        return 'Preparing';
      case 'prête':
        return 'Ready';
      case 'servie':
        return 'Served';
    }
  };

  const getNextStatus = (status: OrderStatus): OrderStatus | null => {
    const statuses: OrderStatus[] = ['reçue', 'en_préparation', 'prête', 'servie'];
    const currentIndex = statuses.indexOf(status);
    return currentIndex < statuses.length - 1 ? statuses[currentIndex + 1] : null;
  };

  const nextStatus = getNextStatus(order.status);

  return (
    <Card className={`p-4 ${getStatusColor(order.status)}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
            #{order.id.slice(-6)} • Table {order.tableNumber}
          </p>
          <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {getElapsedTime()}
          </p>
        </div>
        <div className="text-right">
          <div className={`text-xs font-bold px-2 py-1 rounded ${
            order.status === 'reçue' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
            order.status === 'en_préparation' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
            order.status === 'prête' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
            'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200'
          }`}>
            {getStatusLabel(order.status)}
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="bg-background/50 rounded-lg p-3 mb-4 space-y-1">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex justify-between text-sm">
            <span className="font-medium">{item.name}</span>
            <span className="text-muted-foreground">×{item.quantity}</span>
          </div>
        ))}
      </div>

      {/* Actions */}
      {order.status !== 'servie' && (
        <div className="space-y-2">
          {order.status === 'reçue' && nextStatus && (
            <Button
              className="w-full bg-primary hover:bg-primary/90"
              onClick={() => updateOrderStatus(order.id, nextStatus)}
            >
              <Play className="w-4 h-4 mr-2" />
              Start Preparing
            </Button>
          )}
          {order.status === 'en_préparation' && nextStatus && (
            <Button
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={() => updateOrderStatus(order.id, nextStatus)}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark Ready
            </Button>
          )}
          {order.status === 'prête' && nextStatus && (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => updateOrderStatus(order.id, nextStatus)}
            >
              Mark Served
            </Button>
          )}
        </div>
      )}
    </Card>
  );
}
