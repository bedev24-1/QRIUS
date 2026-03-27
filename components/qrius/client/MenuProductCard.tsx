'use client';

import { MenuItem, CartItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import Image from 'next/image';

interface MenuProductCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

export function MenuProductCard({ item, onAddToCart }: MenuProductCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      {/* Image Placeholder */}
      <div className="w-full h-40 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative overflow-hidden">
        <div className="text-4xl">🍽️</div>
        {!item.available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold">Indisponible</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-foreground mb-1 line-clamp-2">{item.name}</h3>
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{item.description}</p>

        {/* Meta Info */}
        <div className="flex items-center justify-between mb-4 text-xs text-muted-foreground">
          <span>⏱️ {item.preparationTime} min</span>
          {item.available && <span className="text-green-600">✓ En stock</span>}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold text-primary">{item.price.toLocaleString()} F</span>
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90"
            onClick={() => onAddToCart(item)}
            disabled={!item.available}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
