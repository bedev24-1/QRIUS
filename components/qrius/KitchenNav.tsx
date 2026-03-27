'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UtensilsCrossed, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/kitchen', label: 'Home', icon: Home },
  { href: '/kitchen/kds-dashboard', label: 'Orders', icon: UtensilsCrossed },
];

export function KitchenNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-card border-r border-border px-4 py-6 flex flex-col gap-2">
      <div className="text-center mb-4">
        <h2 className="text-sm font-bold text-foreground">Kitchen</h2>
        <p className="text-xs text-muted-foreground">Display System</p>
      </div>
      
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            )}
          >
            <Icon className="w-5 h-5" />
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
