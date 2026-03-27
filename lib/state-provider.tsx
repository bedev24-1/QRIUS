'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  Order,
  OrderStatus,
  Table,
  StaffNotification,
  AppContextType,
} from './types';
import { INITIAL_TABLES, MOCK_ORDERS, INITIAL_NOTIFICATIONS } from './mock-data';

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [tables, setTables] = useState<Table[]>(INITIAL_TABLES);
  const [notifications, setNotifications] = useState<StaffNotification[]>(
    INITIAL_NOTIFICATIONS
  );

  const addOrder = useCallback((order: Order) => {
    setOrders((prev) => [...prev, order]);
    // Update table status to occupied
    setTables((prev) =>
      prev.map((t) =>
        t.number === order.tableNumber ? { ...t, status: 'occupée' as const } : t
      )
    );
  }, []);

  const updateOrderStatus = useCallback((orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          const updatedOrder = { ...order, status };
          // Track status transitions
          if (status === 'en_préparation' && !order.startedAt) {
            updatedOrder.startedAt = new Date();
          } else if (status === 'prête' && !order.readyAt) {
            updatedOrder.readyAt = new Date();
          } else if (status === 'servie' && !order.servedAt) {
            updatedOrder.servedAt = new Date();
          }
          return updatedOrder;
        }
        return order;
      })
    );
  }, []);

  const updateTableStatus = useCallback((tableNumber: number, newStatus: Table['status']) => {
    setTables((prev) =>
      prev.map((t) => (t.number === tableNumber ? { ...t, status: newStatus } : t))
    );
  }, []);

  const addNotification = useCallback(
    (notification: Omit<StaffNotification, 'id' | 'createdAt' | 'resolved'>) => {
      const newNotification: StaffNotification = {
        id: `notif-${Date.now()}`,
        ...notification,
        createdAt: new Date(),
        resolved: false,
      };
      setNotifications((prev) => [newNotification, ...prev]);

      // Update table status based on notification type
      if (notification.type === 'assistance') {
        updateTableStatus(notification.tableNumber, 'demande_assistance');
      } else if (notification.type === 'addition') {
        updateTableStatus(notification.tableNumber, 'addition_demandée');
      }
    },
    [updateTableStatus]
  );

  const dismissNotification = useCallback((notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, resolved: true } : notif
      )
    );
  }, []);

  const value: AppContextType = {
    orders,
    addOrder,
    updateOrderStatus,
    tables,
    updateTableStatus,
    notifications,
    addNotification,
    dismissNotification,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
