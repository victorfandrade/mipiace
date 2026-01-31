/**
 * Página de Produção (Kanban)
 * Exibe pedidos organizados por status
 */

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { KanbanColumn } from '@/components/production/KanbanColumn';
import { Order, OrderStatus } from '@/types/order';
import { getRealOrders } from '@/lib/mock-data';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const STATUSES: OrderStatus[] = ['novo', 'producao', 'pronto', 'entregue'];

export default function Loja() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Carrega pedidos do banco
  const fetchOrders = async () => {
    setLoading(true);
    const data = await getRealOrders();
    setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();

    // Escuta mudanças no banco em tempo real
    const channel = supabase
      .channel('pedidos-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'pedidos' }, fetchOrders)
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  // Muda status do pedido com atualização otimista
  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    const previous = [...orders];
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));

    try {
      const { error } = await supabase
        .from('pedidos')
        .update({ status_prod: newStatus })
        .eq('id', orderId);

      if (error) throw error;
      toast({ title: 'Sucesso', description: `Pedido movido para ${newStatus}` });
    } catch {
      setOrders(previous); // Reverte se der erro
      toast({ variant: "destructive", title: "Erro", description: "Verifique sua conexão." });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header hideOnScroll />
      
      <main className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Produção</h1>
            <p className="text-muted-foreground">Monitorando em tempo real</p>
          </div>
          <Button variant="outline" size="sm" onClick={fetchOrders} disabled={loading} className="gap-2">
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {STATUSES.map(status => (
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
}
