import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { KanbanColumn } from '@/components/production/KanbanColumn';
import { Order, OrderStatus } from '@/types/order';
import { getRealOrders } from '@/lib/mock-data';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const KANBAN_STATUSES: OrderStatus[] = ['novo', 'producao', 'pronto', 'entregue'];

const Loja = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchOrders = async () => {
    setLoading(true);
    const data = await getRealOrders();
    setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();

    // REALTIME: Escuta novas inserções e atualizações no banco
    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'pedidos' }, () => {
        fetchOrders(); // Recarrega ao detectar mudança
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    // 1. Atualiza no Banco
    const { error } = await supabase
      .from('pedidos')
      .update({ status_prod: newStatus })
      .eq('id', orderId);

    if (error) {
      toast({ variant: "destructive", title: "Erro", description: "Não foi possível atualizar o status." });
      return;
    }

    // 2. Atualiza Localmente para UI ser instantânea
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    toast({ title: 'Sucesso', description: `Pedido movido para ${newStatus}` });
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