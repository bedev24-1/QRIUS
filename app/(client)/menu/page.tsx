'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ClientNav } from '@/components/qrius/ClientNav';
import { MenuProductCard } from '@/components/qrius/client/MenuProductCard';
import { Button } from '@/components/ui/button';
import { MenuItem, CartItem } from '@/lib/types';
import { MENU_ITEMS } from '@/lib/mock-data';
import { ShoppingCart, ArrowLeft } from 'lucide-react';

const CATEGORIES = ['entrées', 'grillades', 'boissons', 'desserts'] as const;

export default function MenuPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<typeof CATEGORIES[number]>('grillades');

  const filteredItems = MENU_ITEMS.filter((item) => item.category === selectedCategory);

  const handleAddToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.menuItem.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.menuItem.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { menuItem: item, quantity: 1 }];
    });
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex h-screen flex-col md:flex-row">
      <ClientNav />

      <main className="flex-1 flex flex-col pb-24 md:pb-0 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-4 z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-foreground">Menu</h1>
          </div>
          {cartCount > 0 && (
            <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
              {cartCount}
            </div>
          )}
        </div>

        {/* Category Filter */}
        <div className="bg-card p-4 border-b border-border overflow-x-auto flex gap-2 md:gap-3">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="flex-1 p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {filteredItems.map((item) => (
              <MenuProductCard
                key={item.id}
                item={item}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          {cartCount > 0 && (
            <div className="fixed bottom-24 left-4 right-4 md:bottom-4 md:left-auto md:right-4 md:w-auto">
              <Button
                className="w-full bg-primary hover:bg-primary/90 py-6 text-base"
                onClick={() => router.push('/client/cart')}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                View Cart ({cartCount} items)
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
