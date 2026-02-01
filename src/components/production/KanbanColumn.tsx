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

const CONFIG: Record<OrderStatus, { title: string; color: string; bg: string }> = {
  novo: { title: 'Novos', color: 'bg-status-new', bg: 'bg-status-new-bg' },
  producao: { title: 'Em Produção', color: 'bg-status-production', bg: 'bg-status-production-bg' },
  pronto: { title: 'Prontos', color: 'bg-status-ready', bg: 'bg-status-ready-bg' },
  entregue: { title: 'Entregues', color: 'bg-status-delivered', bg: 'bg-status-delivered-bg' },
};

export function KanbanColumn({ status, orders, onStatusChange }: Props) {
  const { title, color, bg } = CONFIG[status];

  return (
    <div className="kanban-column flex flex-col">
      {/* Cabeçalho com indicador de cor */}
      <div className="pb-4 mb-4 border-b border-border/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn('w-3 h-3 rounded-full', color)} />
            <h3 className="font-semibold text-foreground">{title}</h3>
          </div>
          <span className={cn(
            'flex items-center justify-center h-7 w-7 rounded-full text-sm font-bold',
            bg, 'text-foreground shadow-sm'
          )}>
            {orders.length}
          </span>
        </div>
      </div>

      {/* Cards */}
      <div className="flex-1 space-y-3 overflow-y-auto scrollbar-thin pr-1">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
            <div className="w-12 h-12 rounded-full bg-secondary/80 flex items-center justify-center mb-2">
              <span className="text-xl">📋</span>
            </div>
            <span className="text-sm">Nenhum pedido</span>
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
