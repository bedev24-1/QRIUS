'use client';

import { StaffNav } from '@/components/qrius/StaffNav';
import { useAppContext } from '@/lib/state-provider';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function StaffHome() {
  const { tables, notifications } = useAppContext();

  const occupiedTables = tables.filter((t) => t.status === 'occupée').length;
  const needsAssistance = tables.filter((t) => t.status === 'demande_assistance').length;
  const billRequests = tables.filter((t) => t.status === 'addition_demandée').length;
  const activeAlerts = notifications.filter((n) => !n.resolved).length;

  return (
    <div className="flex h-screen flex-col md:flex-row">
      <StaffNav />

      <main className="flex-1 flex flex-col items-center justify-center p-6 pb-24 md:pb-0 bg-gradient-to-br from-background via-primary/5 to-accent/5">
        <div className="max-w-md text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-6 animate-pulse">
            <span className="text-5xl">👔</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Staff Dashboard</h1>
          <p className="text-muted-foreground mb-8">Manage tables and customer requests</p>

          {/* Quick Stats */}
          <div className="space-y-3 mb-8">
            <div className="bg-card rounded-lg p-4 border border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                Occupied Tables
              </p>
              <p className="text-3xl font-bold text-blue-600">{occupiedTables}</p>
            </div>

            {needsAssistance > 0 && (
              <div className="bg-red-50 dark:bg-red-950 rounded-lg p-4 border border-red-200 dark:border-red-800">
                <p className="text-xs text-red-700 dark:text-red-200 uppercase tracking-wider font-semibold mb-1">
                  Need Assistance
                </p>
                <p className="text-3xl font-bold text-red-600 dark:text-red-400">{needsAssistance}</p>
              </div>
            )}

            {billRequests > 0 && (
              <div className="bg-orange-50 dark:bg-orange-950 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
                <p className="text-xs text-orange-700 dark:text-orange-200 uppercase tracking-wider font-semibold mb-1">
                  Bills Requested
                </p>
                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{billRequests}</p>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <Link href="/staff/floor-view" className="block">
              <Button className="w-full bg-primary hover:bg-primary/90 py-6 text-base">
                View Floor Plan
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>

            {activeAlerts > 0 && (
              <Link href="/staff/notifications" className="block">
                <Button variant="outline" className="w-full py-6">
                  View {activeAlerts} Alert{activeAlerts !== 1 ? 's' : ''}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
