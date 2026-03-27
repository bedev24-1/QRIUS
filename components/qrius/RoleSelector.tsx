'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UtensilsCrossed, ChefHat, Users, BarChart3 } from 'lucide-react';
import { RESTAURANT_NAME } from '@/lib/mock-data';

export function RoleSelector() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5 p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <UtensilsCrossed className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-2 text-foreground">QRIUS</h1>
          <p className="text-lg text-muted-foreground">{RESTAURANT_NAME}</p>
          <p className="text-sm text-muted-foreground mt-2">Restaurant Management Platform</p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Client Role */}
          <Link href="/client" className="group">
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 rounded-lg p-3 mr-4">
                  <UtensilsCrossed className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Client</h2>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Browse menu, place orders, track your meal preparation
              </p>
              <Button className="w-full bg-primary hover:bg-primary/90">
                Order Now
              </Button>
            </div>
          </Link>

          {/* Kitchen Role */}
          <Link href="/kitchen" className="group">
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 rounded-lg p-3 mr-4">
                  <ChefHat className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Kitchen</h2>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Manage orders, track preparation time, mark dishes ready
              </p>
              <Button className="w-full bg-primary hover:bg-primary/90">
                Kitchen Display
              </Button>
            </div>
          </Link>

          {/* Staff Role */}
          <Link href="/staff" className="group">
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 rounded-lg p-3 mr-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Staff</h2>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                View table status, manage customer requests and assistance
              </p>
              <Button className="w-full bg-primary hover:bg-primary/90">
                Floor View
              </Button>
            </div>
          </Link>

          {/* Admin Role */}
          <Link href="/admin" className="group">
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 rounded-lg p-3 mr-4">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Admin</h2>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Manage menu, view analytics, track business performance
              </p>
              <Button className="w-full bg-primary hover:bg-primary/90">
                Dashboard
              </Button>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          <p>Select your role to continue &rarr;</p>
        </div>
      </div>
    </div>
  );
}
