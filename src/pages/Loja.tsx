import { useState, useCallback } from 'react';
import { Header } from '@/components/layout/Header';
import { KanbanColumn } from '@/components/production/KanbanColumn';
import { Order, OrderStatus } from '@/types/order';
import { mockOrders } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Loja = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const { toast } = useToast();

  const handleStatusChange = useCallback((orderId: string, newStatus: OrderStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId
          ? { ...order, status: newStatus, updatedAt: new Date() }
          : order
      )
    );

    const statusLabels: Record<OrderStatus, string> = {
      novo: 'Novo',
      producao: 'Em Produção',
      pronto: 'Pronto',
      entregue: 'Entregue',
    };

    toast({
      title: 'Status atualizado',
      description: `Pedido movido para ${statusLabels[newStatus]}`,
    });
  }, [toast]);

  const getOrdersByStatus = (status: OrderStatus) =>
    orders.filter(order => order.status === status);

  const statuses: OrderStatus[] = ['novo', 'producao', 'pronto', 'entregue'];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-6">
        {/* Page Header */}
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

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {statuses.map(status => (
            <KanbanColumn
              key={status}
              status={status}
              orders={getOrdersByStatus(status)}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Loja;
