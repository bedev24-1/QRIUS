'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, Menu, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: Home },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/menu-management', label: 'Menu', icon: Menu },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-card border-r border-border w-64 flex flex-col h-screen p-6">
      <div className="mb-8">
        <h2 className="text-lg font-bold text-foreground">Admin Panel</h2>
        <p className="text-xs text-muted-foreground mt-1">QRIUS Management</p>
      </div>

      <div className="flex flex-col gap-2 flex-1">
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
      </div>

      <div className="pt-4 border-t border-border text-xs text-muted-foreground">
        <p>QRIUS v1.0</p>
      </div>
    </nav>
  );
}
