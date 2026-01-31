/**
 * Coluna do Kanban
 * Agrupa pedidos por status
 */

import { Order, OrderStatus } from '@/types/order';
import { OrderCard } from './OrderCard';
import { cn } from '@/lib/utils';

interface Props {
  status: OrderStatus;
  orders: Order[];
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
}

const CONFIG: Record<OrderStatus, { title: string; border: string }> = {
  novo: { title: 'Novos', border: 'border-b-status-new' },
  producao: { title: 'Em Produção', border: 'border-b-status-production' },
  pronto: { title: 'Prontos', border: 'border-b-status-ready' },
  entregue: { title: 'Entregues', border: 'border-b-status-delivered' },
};

export function KanbanColumn({ status, orders, onStatusChange }: Props) {
  const { title, border } = CONFIG[status];

  return (
    <div className="kanban-column flex flex-col">
      {/* Cabeçalho */}
      <div className={cn('pb-3 mb-4 border-b-2', border)}>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{title}</h3>
          <span className="flex items-center justify-center h-6 w-6 rounded-full bg-card text-sm font-medium shadow-sm">
            {orders.length}
          </span>
        </div>
      </div>

      {/* Cards */}
      <div className="flex-1 space-y-3 overflow-y-auto scrollbar-thin pr-1">
        {orders.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
            Nenhum pedido
          </div>
        ) : (
          orders.map(order => (
            <OrderCard key={order.id} order={order} onStatusChange={onStatusChange} />
          ))
        )}
      </div>
    </div>
  );
}
