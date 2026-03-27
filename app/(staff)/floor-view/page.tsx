'use client';

import { StaffNav } from '@/components/qrius/StaffNav';
import { TableIndicator } from '@/components/qrius/staff/TableIndicator';
import { useAppContext } from '@/lib/state-provider';

export default function FloorViewPage() {
  const { tables } = useAppContext();

  const occupiedTables = tables.filter((t) => t.status === 'occupée').length;
  const needsAssistance = tables.filter((t) => t.status === 'demande_assistance').length;
  const billRequests = tables.filter((t) => t.status === 'addition_demandée').length;

  return (
    <div className="flex h-screen flex-col md:flex-row">
      <StaffNav />

      <main className="flex-1 flex flex-col pb-24 md:pb-0 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-4 z-10">
          <h1 className="text-xl font-bold text-foreground mb-2">Floor View</h1>
          <div className="flex gap-4 text-xs">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              {occupiedTables} Occupied
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              {needsAssistance} Help
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              {billRequests} Bills
            </span>
          </div>
        </div>

        {/* Floor Grid */}
        <div className="flex-1 p-4 md:p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {tables.map((table) => (
              <TableIndicator key={table.number} table={table} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
