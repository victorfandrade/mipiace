/**
 * Card de pedido exibido no Kanban
 * Mostra detalhes do pedido e botão para avançar status
 * Layout compacto otimizado para mobile
 */

import { Order, OrderStatus } from '@/types/order';
import { PaymentBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Clock, ChefHat, Check, Truck } from 'lucide-react';

interface OrderCardProps {
  order: Order;
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
}

// Formata hora no padrão brasileiro (ex: 14:30)
function formatTime(date: Date): string {
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

// Calcula quantos minutos se passaram desde a criação
function getMinutesAgo(date: Date): number {
  const diff = Date.now() - date.getTime();
  return Math.floor(diff / 60000);
}

// Configuração dos botões de ação por status
const ACTION_CONFIG: Record<OrderStatus, { label: string; icon: React.ReactNode; className: string } | null> = {
  novo: null,
  producao: { label: 'Iniciar', icon: <ChefHat className="h-4 w-4" />, className: 'action-btn-warning' },
  pronto: { label: 'Concluir', icon: <Check className="h-4 w-4" />, className: 'action-btn-success' },
  entregue: { label: 'Entregar', icon: <Truck className="h-4 w-4" />, className: 'action-btn-secondary' },
};

// Qual é o próximo status na sequência do fluxo
function getNextStatus(currentStatus: OrderStatus): OrderStatus | null {
  const flow: Record<OrderStatus, OrderStatus | null> = {
    novo: 'producao',
    producao: 'pronto',
    pronto: 'entregue',
    entregue: null,
  };
  return flow[currentStatus];
}

export function OrderCard({ order, onStatusChange }: OrderCardProps) {
  const minutesAgo = getMinutesAgo(order.createdAt);
  const isUrgent = minutesAgo > 15 && order.status !== 'entregue';
  const nextStatus = getNextStatus(order.status);
  const actionConfig = nextStatus ? ACTION_CONFIG[nextStatus] : null;

  return (
    <div
      className={cn(
        'order-card p-3 sm:p-4',
        order.status === 'novo' && 'animate-pulse-subtle border-status-new/30',
        isUrgent && 'border-destructive/50'
      )}
    >
      {/* Cabeçalho: número do pedido e tempo */}
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <div className="flex items-center gap-2">
          <span className="text-base sm:text-lg font-semibold">#{order.orderNumber}</span>
          <PaymentBadge status={order.paymentStatus} />
        </div>
        <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
          <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          <span>{formatTime(order.createdAt)}</span>
          <span className="text-xs">({minutesAgo}m)</span>
        </div>
      </div>

      {/* Nome do cliente */}
      {order.customerName && (
        <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">{order.customerName}</p>
      )}

      {/* Lista de itens - compacta no mobile */}
      <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
        {order.items.map((item) => (
          <div key={item.id} className="text-xs sm:text-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <span className="font-medium">{item.quantity}x {item.name}</span>
                {item.flavors.length > 0 && (
                  <p className="text-muted-foreground text-xs truncate">
                    {item.flavors.join(', ')}
                  </p>
                )}
                {item.accompaniments && item.accompaniments.length > 0 && (
                  <p className="text-muted-foreground text-xs truncate">
                    + {item.accompaniments.join(', ')}
                  </p>
                )}
              </div>
              <span className="text-muted-foreground flex-shrink-0">
                R$ {(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="flex items-center justify-between py-2 sm:py-3 border-t border-border">
        <span className="text-sm font-medium">Total</span>
        <span className="text-base sm:text-lg font-semibold">R$ {order.total.toFixed(2)}</span>
      </div>

      {/* Botão de ação (se houver próximo status) */}
      {nextStatus && actionConfig && (
        <div className="mt-2 sm:mt-3">
          <Button
            onClick={() => onStatusChange(order.id, nextStatus)}
            className={cn('w-full gap-2 text-sm', actionConfig.className)}
            size="sm"
          >
            {actionConfig.icon}
            {actionConfig.label}
          </Button>
        </div>
      )}
    </div>
  );
}
