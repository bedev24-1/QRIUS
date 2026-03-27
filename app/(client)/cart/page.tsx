'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ClientNav } from '@/components/qrius/ClientNav';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CartItem, MenuItem } from '@/lib/types';
import { MENU_ITEMS } from '@/lib/mock-data';
import { Plus, Minus, Trash2, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([
    {
      menuItem: MENU_ITEMS[0],
      quantity: 1,
    },
    {
      menuItem: MENU_ITEMS[4],
      quantity: 2,
    },
  ]);

  const updateQuantity = (menuItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.menuItem.id === menuItemId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (menuItemId: string) => {
    setCart((prev) => prev.filter((item) => item.menuItem.id !== menuItemId));
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);

  return (
    <div className="flex h-screen flex-col md:flex-row">
      <ClientNav />

      <main className="flex-1 flex flex-col pb-24 md:pb-0 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-4 z-10 flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-foreground">Your Cart</h1>
        </div>

        {/* Cart Content */}
        <div className="flex-1 p-4 md:p-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Empty Cart</h2>
              <p className="text-muted-foreground mb-6">Add items from the menu to get started</p>
              <Button
                className="bg-primary hover:bg-primary/90"
                onClick={() => router.push('/client/menu')}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-4 mb-8">
                {cart.map((item) => (
                  <Card key={item.menuItem.id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{item.menuItem.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.menuItem.price.toLocaleString()} F each
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.menuItem.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.menuItem.id, -1)}
                          className="p-1 hover:bg-background rounded transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-3 font-semibold min-w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.menuItem.id, 1)}
                          className="p-1 hover:bg-background rounded transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="font-bold text-primary text-lg">
                        {(item.menuItem.price * item.quantity).toLocaleString()} F
                      </span>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Summary */}
              <div className="bg-muted/30 rounded-lg p-4 space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">{totalAmount.toLocaleString()} F</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (5%)</span>
                  <span className="font-semibold">{Math.round(totalAmount * 0.05).toLocaleString()} F</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between">
                  <span className="font-bold text-foreground">Total</span>
                  <span className="font-bold text-lg text-primary">
                    {Math.round(totalAmount * 1.05).toLocaleString()} F
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <Button
                  className="w-full bg-primary hover:bg-primary/90 py-6"
                  onClick={() => router.push('/client/checkout')}
                >
                  Proceed to Checkout
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => router.push('/client/menu')}
                >
                  Continue Shopping
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
