import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { PasswordGate } from '@/components/auth/PasswordGate';
import { KPICard } from '@/components/dashboard/KPICard';
import { SalesChart, ProductsChart, HourlyChart } from '@/components/dashboard/Charts';
import { RecentOrders } from '@/components/dashboard/RecentOrders';
import { mockSalesData, mockProductSales, mockHourlySales, calculateKPIs, getRealOrders } from '@/lib/mock-data';
import { Order } from '@/types/order';
import { DollarSign, ShoppingCart, TrendingUp, Package } from 'lucide-react';

const Admin = () => {
  const [realOrders, setRealOrders] = useState<Order[]>([]);
  const kpis = calculateKPIs();

  useEffect(() => {
    getRealOrders().then(setRealOrders);
  }, []);

  const ordersByStatus = {
    novo: realOrders.filter(o => o.status === 'novo').length,
    producao: realOrders.filter(o => o.status === 'producao').length,
    pronto: realOrders.filter(o => o.status === 'pronto').length,
    entregue: realOrders.filter(o => o.status === 'entregue').length,
  };

  return (
    <PasswordGate>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-2xl font-bold tracking-tight">Dashboard Admin</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard title="Vendas Hoje" value={kpis.totalHoje} valuePrefix="R$ " icon={<DollarSign className="h-5 w-5" />} />
            <KPICard title="Pedidos Reais" value={realOrders.length} icon={<ShoppingCart className="h-5 w-5" />} />
            <KPICard title="Ticket Médio" value={kpis.ticketMedio.toFixed(2)} valuePrefix="R$ " icon={<TrendingUp className="h-5 w-5" />} />
            <KPICard title="Faturamento Sem." value={kpis.totalSemana} valuePrefix="R$ " icon={<Package className="h-5 w-5" />} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <SalesChart data={mockSalesData} />
            <ProductsChart data={mockProductSales} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <HourlyChart data={mockHourlySales} />
            <div className="kpi-card bg-card p-6 rounded-xl border">
              <h3 className="font-semibold mb-4">Status em Tempo Real</h3>
              <div className="grid grid-cols-2 gap-4">
                <StatusCard count={ordersByStatus.novo} label="Novos" variant="new" />
                <StatusCard count={ordersByStatus.producao} label="Produção" variant="production" />
                <StatusCard count={ordersByStatus.pronto} label="Prontos" variant="ready" />
                <StatusCard count={ordersByStatus.entregue} label="Entregues" variant="delivered" />
              </div>
            </div>
          </div>

          <RecentOrders orders={realOrders} />
        </main>
      </div>
    </PasswordGate>
  );
};

function StatusCard({ count, label, variant }: { count: number; label: string; variant: string }) {
  return (
    <div className={`p-4 rounded-lg bg-status-${variant}-bg/10 border border-status-${variant}/20`}>
      <p className={`text-3xl font-bold text-status-${variant}`}>{count}</p>
      <p className="text-xs font-medium text-muted-foreground uppercase mt-1">{label}</p>
    </div>
  );
}

export default Admin;