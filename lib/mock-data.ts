import { MenuItem, Order, Table } from './types';

export const RESTAURANT_NAME = 'Le Gourmet Douala';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'DG Poulet',
    description: 'Poulet grillé servi avec épinards sautés et sauce arachide',
    price: 3500,
    category: 'grillades',
    image: '/menu/dg-poulet.jpg',
    available: true,
    preparationTime: 15,
  },
  {
    id: '2',
    name: 'Poisson Braisé',
    description: 'Poisson frais braisé avec tomates, oignons et épices camerounaises',
    price: 4500,
    category: 'grillades',
    image: '/menu/poisson-braise.jpg',
    available: true,
    preparationTime: 18,
  },
  {
    id: '3',
    name: 'Ndolé',
    description: 'Légumes traditionnels avec cacahuètes et poisson fumé',
    price: 2500,
    category: 'entrées',
    image: '/menu/ndole.jpg',
    available: true,
    preparationTime: 12,
  },
  {
    id: '4',
    name: 'Bobolo',
    description: 'Pâte fermentée servie avec sauce arachide et viande',
    price: 2000,
    category: 'entrées',
    image: '/menu/bobolo.jpg',
    available: true,
    preparationTime: 10,
  },
  {
    id: '5',
    name: 'Jus de Foléré',
    description: 'Boisson traditionnelle à base de fruits tropicaux frais',
    price: 800,
    category: 'boissons',
    image: '/menu/jus-folere.jpg',
    available: true,
    preparationTime: 2,
  },
  {
    id: '6',
    name: 'Limonade Maison',
    description: 'Citrons frais pressés avec eau minérale et glaçons',
    price: 600,
    category: 'boissons',
    image: '/menu/limonade.jpg',
    available: true,
    preparationTime: 3,
  },
  {
    id: '7',
    name: 'Ngomdu (Gâteau Maïs)',
    description: 'Dessert traditionnel à base de maïs et cacahuètes grillées',
    price: 1200,
    category: 'desserts',
    image: '/menu/ngomdu.jpg',
    available: true,
    preparationTime: 5,
  },
  {
    id: '8',
    name: 'Beignet Sucré',
    description: 'Beignets croustillants saupoudrés de sucre, servis chauds',
    price: 1500,
    category: 'desserts',
    image: '/menu/beignet.jpg',
    available: true,
    preparationTime: 8,
  },
];

export const INITIAL_TABLES: Table[] = Array.from({ length: 12 }, (_, i) => ({
  number: i + 1,
  status: 'libre' as const,
  capacity: i < 6 ? 2 : 4,
}));

export const MOCK_ORDERS: Order[] = [
  {
    id: 'order-1',
    tableNumber: 1,
    items: [
      { menuItemId: '1', name: 'DG Poulet', quantity: 1, price: 3500 },
      { menuItemId: '5', name: 'Jus de Foléré', quantity: 2, price: 800 },
    ],
    status: 'en_préparation',
    createdAt: new Date(Date.now() - 10 * 60000),
    startedAt: new Date(Date.now() - 8 * 60000),
    totalAmount: 5100,
  },
  {
    id: 'order-2',
    tableNumber: 3,
    items: [
      { menuItemId: '2', name: 'Poisson Braisé', quantity: 1, price: 4500 },
      { menuItemId: '6', name: 'Limonade Maison', quantity: 1, price: 600 },
    ],
    status: 'prête',
    createdAt: new Date(Date.now() - 25 * 60000),
    startedAt: new Date(Date.now() - 23 * 60000),
    readyAt: new Date(Date.now() - 5 * 60000),
    totalAmount: 5100,
  },
  {
    id: 'order-3',
    tableNumber: 5,
    items: [
      { menuItemId: '3', name: 'Ndolé', quantity: 2, price: 2500 },
      { menuItemId: '7', name: 'Ngomdu (Gâteau Maïs)', quantity: 2, price: 1200 },
    ],
    status: 'reçue',
    createdAt: new Date(Date.now() - 2 * 60000),
    totalAmount: 7400,
  },
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    tableNumber: 2,
    type: 'assistance' as const,
    message: 'Besoin de serviettes supplémentaires',
    createdAt: new Date(Date.now() - 5 * 60000),
    resolved: false,
  },
];
