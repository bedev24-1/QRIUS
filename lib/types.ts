// Menu and Food Types
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number; // in FCFA
  category: 'entrées' | 'grillades' | 'boissons' | 'desserts';
  image: string;
  available: boolean;
  preparationTime: number; // in minutes
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  options?: Record<string, string>; // e.g., { "piment": "oui", "sauce": "sauce_rouge" }
}

// Order Types
export type OrderStatus = 'reçue' | 'en_préparation' | 'prête' | 'servie';

export interface OrderItem {
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
  options?: Record<string, string>;
}

export interface Order {
  id: string;
  tableNumber: number;
  items: OrderItem[];
  status: OrderStatus;
  createdAt: Date;
  startedAt?: Date;
  readyAt?: Date;
  servedAt?: Date;
  totalAmount: number;
  paymentMethod?: 'mtn' | 'orange_money';
  customerPhoneNumber?: string;
}

// Table Types
export type TableStatus = 'libre' | 'occupée' | 'demande_assistance' | 'addition_demandée';

export interface Table {
  number: number;
  status: TableStatus;
  currentOrderId?: string;
  capacity: number;
}

// Staff Notification Types
export interface StaffNotification {
  id: string;
  tableNumber: number;
  type: 'assistance' | 'addition' | 'call';
  message: string;
  createdAt: Date;
  resolved: boolean;
}

// Analytics Types
export interface AnalyticsData {
  totalRevenue: number;
  totalOrders: number;
  averagePrepTime: number;
  topItems: Array<{
    name: string;
    count: number;
    revenue: number;
  }>;
  revenueByHour: Array<{
    hour: string;
    revenue: number;
  }>;
  prepTimeByHour: Array<{
    hour: string;
    avgTime: number;
  }>;
}

// App State Types
export interface AppContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  tables: Table[];
  updateTableStatus: (tableNumber: number, status: TableStatus) => void;
  notifications: StaffNotification[];
  addNotification: (notification: Omit<StaffNotification, 'id' | 'createdAt' | 'resolved'>) => void;
  dismissNotification: (notificationId: string) => void;
}
