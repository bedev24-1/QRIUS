'use client';

import { Table } from '@/lib/types';
import { useAppContext } from '@/lib/state-provider';
import { AlertCircle, HelpCircle, DollarSign } from 'lucide-react';

interface TableIndicatorProps {
  table: Table;
}

export function TableIndicator({ table }: TableIndicatorProps) {
  const { addNotification } = useAppContext();

  const getStatusDisplay = () => {
    switch (table.status) {
      case 'libre':
        return {
          label: 'Libre',
          color: 'bg-green-500',
          textColor: 'text-green-700 dark:text-green-200',
        };
      case 'occupée':
        return {
          label: 'Occupée',
          color: 'bg-blue-500',
          textColor: 'text-blue-700 dark:text-blue-200',
        };
      case 'demande_assistance':
        return {
          label: 'Assistance',
          color: 'bg-red-500',
          textColor: 'text-red-700 dark:text-red-200',
        };
      case 'addition_demandée':
        return {
          label: 'Addition',
          color: 'bg-orange-500',
          textColor: 'text-orange-700 dark:text-orange-200',
        };
    }
  };

  const handleRequest = (type: 'assistance' | 'addition') => {
    addNotification({
      tableNumber: table.number,
      type,
      message:
        type === 'assistance'
          ? 'Demande d\'assistance'
          : 'Addition demandée',
    });
  };

  const display = getStatusDisplay();

  return (
    <div className="space-y-2">
      {/* Table Card */}
      <div className="border border-border rounded-lg p-4 bg-card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-foreground">Table {table.number}</h3>
          <div className={`w-3 h-3 rounded-full ${display.color}`} />
        </div>
        <p className={`text-sm font-semibold ${display.textColor} mb-4`}>{display.label}</p>

        {/* Quick Action Buttons */}
        {table.status === 'occupée' && (
          <div className="space-y-2 text-xs">
            <button
              onClick={() => handleRequest('assistance')}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800 transition-colors font-medium"
            >
              <HelpCircle className="w-4 h-4" />
              Need Help
            </button>
            <button
              onClick={() => handleRequest('addition')}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200 hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors font-medium"
            >
              <DollarSign className="w-4 h-4" />
              Bill
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
