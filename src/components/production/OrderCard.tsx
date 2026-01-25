import { Order, OrderStatus } from '@/types/order';
import { StatusBadge, PaymentBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Clock, ChefHat, Check, Truck } from 'lucide-react';

interface OrderCardProps {
  order: Order;
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
}

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
};

const getMinutesAgo = (date: Date) => {
  const diff = Date.now() - date.getTime();
  return Math.floor(diff / 60000);
};

export function OrderCard({ order, onStatusChange }: OrderCardProps) {
  const minutesAgo = getMinutesAgo(order.createdAt);
  const isUrgent = minutesAgo > 15 && order.status !== 'entregue';
  
  const getNextStatus = (): OrderStatus | null => {
    switch (order.status) {
      case 'novo': return 'producao';
      case 'producao': return 'pronto';
      case 'pronto': return 'entregue';
      default: return null;
    }
  };

  const getActionButton = () => {
    const nextStatus = getNextStatus();
    if (!nextStatus) return null;

    const buttonConfig: Record<OrderStatus, { label: string; icon: React.ReactNode; className: string }> = {
      producao: { label: 'Iniciar', icon: <ChefHat className="h-4 w-4" />, className: 'action-btn-warning' },
      pronto: { label: 'Concluir', icon: <Check className="h-4 w-4" />, className: 'action-btn-success' },
      entregue: { label: 'Entregar', icon: <Truck className="h-4 w-4" />, className: 'action-btn-secondary' },
      novo: { label: '', icon: null, className: '' },
    };

    const config = buttonConfig[nextStatus];
    
    return (
      <Button
        onClick={() => onStatusChange(order.id, nextStatus)}
        className={cn('w-full gap-2', config.className)}
        size="sm"
      >
        {config.icon}
        {config.label}
      </Button>
    );
  };

  return (
    <div
      className={cn(
        'order-card',
        order.status === 'novo' && 'animate-pulse-subtle border-status-new/30',
        isUrgent && 'border-destructive/50'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">#{order.orderNumber}</span>
          <PaymentBadge status={order.paymentStatus} />
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span>{formatTime(order.createdAt)}</span>
          <span className="text-xs">({minutesAgo}min)</span>
        </div>
      </div>

      {/* Customer */}
      {order.customerName && (
        <p className="text-sm text-muted-foreground mb-3">{order.customerName}</p>
      )}

      {/* Items */}
      <div className="space-y-2 mb-4">
        {order.items.map((item) => (
          <div key={item.id} className="text-sm">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-medium">{item.quantity}x {item.name}</span>
                {item.flavors.length > 0 && (
                  <p className="text-muted-foreground text-xs mt-0.5">
                    {item.flavors.join(', ')}
                  </p>
                )}
                {item.accompaniments && item.accompaniments.length > 0 && (
                  <p className="text-muted-foreground text-xs">
                    + {item.accompaniments.join(', ')}
                  </p>
                )}
              </div>
              <span className="text-muted-foreground">
                R$ {(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="flex items-center justify-between py-3 border-t border-border">
        <span className="font-medium">Total</span>
        <span className="text-lg font-semibold">
          R$ {order.total.toFixed(2)}
        </span>
      </div>

      {/* Action Button */}
      {getActionButton() && (
        <div className="mt-3">
          {getActionButton()}
        </div>
      )}
    </div>
  );
}
