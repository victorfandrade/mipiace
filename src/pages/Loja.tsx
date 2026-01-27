/**
 * Página de Produção (Loja)
 * Quadro Kanban para gerenciar o fluxo de pedidos
 * Otimizado para mobile com scroll horizontal
 */

import { useState, useCallback } from 'react';
import { Header } from '@/components/layout/Header';
import { KanbanColumn } from '@/components/production/KanbanColumn';
import { Order, OrderStatus } from '@/types/order';
import { mockOrders } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Labels amigáveis para cada status (usado no toast)
const STATUS_LABELS: Record<OrderStatus, string> = {
  novo: 'Novo',
  producao: 'Em Produção',
  pronto: 'Pronto',
  entregue: 'Entregue',
};

// Sequência de colunas no Kanban
const KANBAN_STATUSES: OrderStatus[] = ['novo', 'producao', 'pronto', 'entregue'];

const Loja = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const { toast } = useToast();

  // Atualiza o status de um pedido
  const handleStatusChange = useCallback((orderId: string, newStatus: OrderStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId
          ? { ...order, status: newStatus, updatedAt: new Date() }
          : order
      )
    );

    toast({
      title: 'Status atualizado',
      description: `Pedido movido para ${STATUS_LABELS[newStatus]}`,
    });
  }, [toast]);

  // Filtra pedidos por status
  const getOrdersByStatus = (status: OrderStatus) =>
    orders.filter(order => order.status === status);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-4 sm:py-6">
        {/* Cabeçalho da página */}
        <div className="container flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Produção</h1>
            <p className="text-sm text-muted-foreground">Gerencie o fluxo de pedidos</p>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            <span className="hidden sm:inline">Atualizar</span>
          </Button>
        </div>

        {/* Quadro Kanban - Scroll horizontal no mobile */}
        <div className="overflow-x-auto scrollbar-thin pb-4">
          <div className="flex gap-4 px-4 sm:px-6 lg:px-8 min-w-max xl:min-w-0 xl:grid xl:grid-cols-4">
            {KANBAN_STATUSES.map(status => (
              <div key={status} className="w-72 sm:w-80 xl:w-auto flex-shrink-0 xl:flex-shrink">
                <KanbanColumn
                  status={status}
                  orders={getOrdersByStatus(status)}
                  onStatusChange={handleStatusChange}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Loja;
