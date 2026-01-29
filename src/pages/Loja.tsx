/**
 * Página de Produção
 * Quadro Kanban para gerenciar o fluxo de pedidos
 */

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { KanbanColumn } from '@/components/production/KanbanColumn';
import { Order, OrderStatus } from '@/types/order';
import { mockOrders } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Labels para cada status (usado no toast)
const STATUS_LABELS: Record<OrderStatus, string> = {
  novo: 'Novo',
  producao: 'Em Produção',
  pronto: 'Pronto',
  entregue: 'Entregue',
};

// Ordem das colunas no Kanban
const KANBAN_STATUSES: OrderStatus[] = ['novo', 'producao', 'pronto', 'entregue'];

const Loja = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const { toast } = useToast();

  // Atualiza o status de um pedido
  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId
          ? { ...order, status: newStatus, updatedAt: new Date() }
          : order
      )
    );
    toast({ title: 'Status atualizado', description: `Pedido movido para ${STATUS_LABELS[newStatus]}` });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header hideOnScroll />
      
      <main className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Produção</h1>
            <p className="text-muted-foreground">Gerencie o fluxo de pedidos</p>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Atualizar
          </Button>
        </div>

        {/* Quadro Kanban */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {KANBAN_STATUSES.map(status => (
            <KanbanColumn
              key={status}
              status={status}
              orders={orders.filter(o => o.status === status)}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Loja;
