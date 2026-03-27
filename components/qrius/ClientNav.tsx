'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Home, Utensils, CreditCard, Truck } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/client', label: 'Home', icon: Home },
  { href: '/client/menu', label: 'Menu', icon: Utensils },
  { href: '/client/cart', label: 'Cart', icon: ShoppingCart },
  { href: '/client/checkout', label: 'Checkout', icon: CreditCard },
  { href: '/client/order-tracking', label: 'Track', icon: Truck },
];

export function ClientNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border md:relative md:border-r md:border-t-0 md:w-64 md:flex md:flex-col md:h-screen md:bottom-auto md:right-auto md:left-auto">
      <div className="flex md:flex-col md:py-6">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex-1 md:flex-none flex flex-col items-center justify-center md:justify-start md:flex-row md:px-4 md:py-2 md:rounded-lg md:mx-2 md:mb-2 transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground md:bg-primary'
                  : 'text-muted-foreground hover:text-foreground md:hover:bg-muted'
              )}
            >
              <Icon className="w-6 h-6 md:mr-3" />
              <span className="text-xs md:text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
