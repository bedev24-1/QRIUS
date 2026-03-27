'use client';

import { ClientNav } from '@/components/qrius/ClientNav';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { QrCode, ArrowRight } from 'lucide-react';
import { RESTAURANT_NAME } from '@/lib/mock-data';

export default function ClientLanding() {
  const tableNumber = 12; // Mock table number

  return (
    <div className="flex h-screen flex-col md:flex-row">
      <ClientNav />
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 pb-24 md:pb-0 bg-gradient-to-br from-background via-primary/5 to-accent/5">
        <div className="max-w-md text-center">
          {/* Welcome Animation */}
          <div className="mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-6 animate-pulse">
              <span className="text-5xl">🍽️</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Bienvenue!</h1>
            <p className="text-lg text-primary font-semibold mb-1">{RESTAURANT_NAME}</p>
            <p className="text-muted-foreground">Table {tableNumber}</p>
          </div>

          {/* Main Content */}
          <div className="bg-card rounded-lg border border-border p-8 shadow-lg mb-8">
            <div className="bg-primary/5 rounded-lg p-6 mb-6">
              <QrCode className="w-16 h-16 mx-auto text-primary mb-4" />
              <p className="text-sm text-muted-foreground mb-2">QR Code Scan</p>
              <p className="text-2xl font-bold text-foreground">{tableNumber}</p>
            </div>

            <p className="text-muted-foreground text-sm mb-6">
              Welcome to our digital ordering system. Browse our menu, place your order, and track it in real-time.
            </p>

            <div className="space-y-3">
              <Link href="/client/menu" className="block">
                <Button className="w-full bg-primary hover:bg-primary/90 text-base py-6">
                  View Menu
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>

              <Link href="/client/order-tracking" className="block">
                <Button variant="outline" className="w-full py-6">
                  Track Order
                </Button>
              </Link>
            </div>
          </div>

          {/* Instructions */}
          <div className="text-left bg-muted/30 rounded-lg p-4 text-xs text-muted-foreground space-y-2">
            <p>✓ Browse our delicious menu</p>
            <p>✓ Add items to your cart</p>
            <p>✓ Complete payment</p>
            <p>✓ Track your order</p>
          </div>
        </div>
      </main>
    </div>
  );
}
