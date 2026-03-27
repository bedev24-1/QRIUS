'use client';

import { KitchenNav } from '@/components/qrius/KitchenNav';
import { useAppContext } from '@/lib/state-provider';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function KitchenHome() {
  const { orders } = useAppContext();
  const activeOrders = orders.filter((o) => o.status !== 'servie').length;
  const readyOrders = orders.filter((o) => o.status === 'prête').length;
  const preparingOrders = orders.filter((o) => o.status === 'en_préparation').length;

  return (
    <div className="flex h-screen">
      <KitchenNav />

      <main className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-background via-primary/5 to-accent/5">
        <div className="max-w-md text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-6 animate-pulse">
            <span className="text-5xl">👨‍🍳</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Kitchen Display</h1>
          <p className="text-muted-foreground mb-8">Manage orders and prepare meals efficiently</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-card rounded-lg p-4 border border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Active</p>
              <p className="text-3xl font-bold text-foreground">{activeOrders}</p>
            </div>
            <div className="bg-card rounded-lg p-4 border border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Preparing</p>
              <p className="text-3xl font-bold text-blue-600">{preparingOrders}</p>
            </div>
            <div className="bg-card rounded-lg p-4 border border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Ready</p>
              <p className="text-3xl font-bold text-green-600">{readyOrders}</p>
            </div>
          </div>

          <Link href="/kitchen/kds-dashboard" className="block">
            <Button className="w-full bg-primary hover:bg-primary/90 py-6 text-base">
              View Dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>

          {/* Info */}
          <p className="text-xs text-muted-foreground mt-6">
            Full-screen display recommended for kitchen use
          </p>
        </div>
      </main>
    </div>
  );
}
