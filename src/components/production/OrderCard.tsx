/**
 * Card de pedido no Kanban
 * Exibe detalhes e botão para avançar status
 */

import { Order, OrderStatus } from '@/types/order';
import { PaymentBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Clock, ChefHat, Check, Truck } from 'lucide-react';

interface Props {
  order: Order;
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
}

// Próximo status no fluxo
const NEXT: Record<OrderStatus, OrderStatus | null> = {
  novo: 'producao',
  producao: 'pronto',
  pronto: 'entregue',
  entregue: null,
};

// Config dos botões de ação
const ACTIONS: Record<string, { label: string; icon: typeof ChefHat; className: string }> = {
  producao: { label: 'Iniciar', icon: ChefHat, className: 'action-btn-warning' },
  pronto: { label: 'Concluir', icon: Check, className: 'action-btn-success' },
  entregue: { label: 'Entregar', icon: Truck, className: 'action-btn-secondary' },
};

// Helpers
const formatTime = (date: Date) => date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
const getMinutesAgo = (date: Date) => Math.floor((Date.now() - date.getTime()) / 60000);

export function OrderCard({ order, onStatusChange }: Props) {
  const minutesAgo = getMinutesAgo(order.createdAt);
  const isUrgent = minutesAgo > 15 && order.status !== 'entregue';
  const nextStatus = NEXT[order.status];
  const action = nextStatus ? ACTIONS[nextStatus] : null;

  return (
    <div className={cn(
      'order-card group',
      order.status === 'novo' && 'animate-pulse-subtle ring-2 ring-status-new/20',
      isUrgent && 'ring-2 ring-destructive/30'
    )}>
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <span className="text-lg font-bold text-foreground">#{order.orderNumber}</span>
          <PaymentBadge status={order.paymentStatus} />
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary/60 px-2 py-1 rounded-lg">
          <Clock className="h-3 w-3" />
          <span className="font-medium">{formatTime(order.createdAt)}</span>
          <span className="text-muted-foreground/70">• {minutesAgo}min</span>
        </div>
      </div>

      {/* Cliente */}
      {order.customerName && (
        <p className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
            {order.customerName.charAt(0).toUpperCase()}
          </span>
          {order.customerName}
        </p>
      )}

      {/* Itens */}
      <div className="space-y-2.5 mb-4 bg-secondary/30 rounded-lg p-3 -mx-1">
        {order.items.map(item => (
          <div key={item.id} className="text-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <span className="font-semibold text-foreground">{item.quantity}x {item.name}</span>
                {item.flavors.length > 0 && (
                  <p className="text-muted-foreground text-xs mt-0.5 italic">{item.flavors.join(', ')}</p>
                )}
                {item.accompaniments && item.accompaniments.length > 0 && (
                  <p className="text-muted-foreground/80 text-xs">+ {item.accompaniments.join(', ')}</p>
                )}
              </div>
              <span className="text-sm font-medium text-muted-foreground">R$ {(item.price * item.quantity).toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="flex items-center justify-between py-3 border-t border-border/50">
        <span className="font-medium text-muted-foreground">Total</span>
        <span className="text-xl font-bold text-primary">R$ {order.total.toFixed(2)}</span>
      </div>

      {/* Botão de ação */}
      {nextStatus && action && (
        <div className="mt-4">
          <Button
            onClick={() => onStatusChange(order.id, nextStatus)}
            className={cn('w-full gap-2 h-11', action.className)}
          >
            <action.icon className="h-4 w-4" />
            {action.label}
          </Button>
        </div>
      )}
    </div>
  );
}
