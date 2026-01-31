/**
 * Badges de status para pedidos e pagamentos
 */

import { OrderStatus, PaymentStatus } from '@/types/order';
import { cn } from '@/lib/utils';

const STATUS: Record<OrderStatus, { label: string; className: string }> = {
  novo: { label: 'Novo', className: 'status-new' },
  producao: { label: 'Produção', className: 'status-production' },
  pronto: { label: 'Pronto', className: 'status-ready' },
  entregue: { label: 'Entregue', className: 'status-delivered' },
};

export function StatusBadge({ status, className }: { status: OrderStatus; className?: string }) {
  const { label, className: statusClass } = STATUS[status];
  return (
    <span className={cn('inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium', statusClass, className)}>
      {label}
    </span>
  );
}

export function PaymentBadge({ status, className }: { status: PaymentStatus; className?: string }) {
  const isPaid = status === 'pago';
  return (
    <span className={cn(
      'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
      isPaid ? 'bg-status-ready-bg text-status-ready' : 'bg-status-production-bg text-status-production',
      className
    )}>
      {isPaid ? 'Pago' : 'Pendente'}
    </span>
  );
}
