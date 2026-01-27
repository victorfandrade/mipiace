/**
 * Lista de pedidos recentes
 * Versão mobile usa cards; desktop usa tabela
 */

import { Order } from '@/types/order';
import { StatusBadge, PaymentBadge } from '@/components/ui/status-badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface RecentOrdersProps {
  orders: Order[];
}

// Card mobile para cada pedido
function OrderCard({ order }: { order: Order }) {
  return (
    <div className="p-4 border border-border rounded-lg space-y-3">
      {/* Header: número e hora */}
      <div className="flex items-center justify-between">
        <span className="font-semibold text-foreground">#{order.orderNumber}</span>
        <span className="text-xs text-muted-foreground">
          {order.createdAt.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      
      {/* Cliente */}
      {order.customerName && (
        <p className="text-sm text-muted-foreground">{order.customerName}</p>
      )}
      
      {/* Itens */}
      <p className="text-sm text-foreground line-clamp-2">
        {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
      </p>
      
      {/* Footer: total e badges */}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <span className="font-semibold text-foreground">
          R$ {order.total.toFixed(2)}
        </span>
        <div className="flex items-center gap-2">
          <PaymentBadge status={order.paymentStatus} />
          <StatusBadge status={order.status} />
        </div>
      </div>
    </div>
  );
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  const isEmpty = orders.length === 0;

  return (
    <div className="kpi-card">
      <h3 className="font-semibold mb-4">Pedidos Recentes</h3>
      
      {isEmpty ? (
        <p className="text-center text-muted-foreground py-8">
          Nenhum pedido encontrado
        </p>
      ) : (
        <>
          {/* Mobile: Cards */}
          <div className="space-y-3 md:hidden">
            {orders.slice(0, 5).map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>

          {/* Desktop: Tabela */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Pedido</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Itens</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Pagamento</TableHead>
                  <TableHead>Hora</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id} className="animate-fade-in">
                    <TableCell className="font-medium">#{order.orderNumber}</TableCell>
                    <TableCell>{order.customerName || '-'}</TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      R$ {order.total.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={order.status} />
                    </TableCell>
                    <TableCell>
                      <PaymentBadge status={order.paymentStatus} />
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {order.createdAt.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
}
