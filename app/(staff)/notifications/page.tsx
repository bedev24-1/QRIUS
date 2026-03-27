'use client';

import { StaffNav } from '@/components/qrius/StaffNav';
import { useAppContext } from '@/lib/state-provider';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { HelpCircle, DollarSign, X } from 'lucide-react';

export default function NotificationsPage() {
  const { notifications, dismissNotification } = useAppContext();

  const activeNotifications = notifications.filter((n) => !n.resolved);

  const getNotificationIcon = (type: string) => {
    if (type === 'assistance') return <HelpCircle className="w-6 h-6" />;
    if (type === 'addition') return <DollarSign className="w-6 h-6" />;
    return null;
  };

  const getNotificationColor = (type: string) => {
    if (type === 'assistance')
      return 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800';
    if (type === 'addition')
      return 'bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800';
    return 'bg-card border-border';
  };

  return (
    <div className="flex h-screen flex-col md:flex-row">
      <StaffNav />

      <main className="flex-1 flex flex-col pb-24 md:pb-0 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-4 z-10">
          <h1 className="text-xl font-bold text-foreground">Alerts & Notifications</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {activeNotifications.length} active alert{activeNotifications.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Notifications List */}
        <div className="flex-1 p-4 md:p-6">
          {activeNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-xl font-semibold text-foreground mb-2">All Clear</h2>
              <p className="text-muted-foreground">No active alerts</p>
            </div>
          ) : (
            <div className="space-y-3 max-w-2xl mx-auto">
              {activeNotifications.map((notif) => (
                <Card
                  key={notif.id}
                  className={`p-4 flex items-start justify-between gap-4 ${getNotificationColor(
                    notif.type
                  )}`}
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className="mt-1 text-foreground">
                      {getNotificationIcon(notif.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">
                        Table {notif.tableNumber}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notif.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {Math.floor(
                          (Date.now() - notif.createdAt.getTime()) / 1000
                        )}s ago
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => dismissNotification(notif.id)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
