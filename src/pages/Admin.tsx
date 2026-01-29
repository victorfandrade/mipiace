/**
 * Página de Dashboard (Admin)
 * Exibe KPIs, gráficos e pedidos recentes
 * Protegida por senha simples
 */

import { Header } from '@/components/layout/Header';
import { PasswordGate } from '@/components/auth/PasswordGate';
import { KPICard } from '@/components/dashboard/KPICard';
import { SalesChart, ProductsChart, HourlyChart } from '@/components/dashboard/Charts';
import { DateFilter } from '@/components/dashboard/DateFilter';
import { RecentOrders } from '@/components/dashboard/RecentOrders';
import { mockSalesData, mockProductSales, mockHourlySales, mockOrders, calculateKPIs } from '@/lib/mock-data';
import { DollarSign, ShoppingCart, TrendingUp, Package } from 'lucide-react';

// Conta pedidos por status
function countByStatus(orders: typeof mockOrders) {
  return {
    novo: orders.filter(o => o.status === 'novo').length,
    producao: orders.filter(o => o.status === 'producao').length,
    pronto: orders.filter(o => o.status === 'pronto').length,
    entregue: orders.filter(o => o.status === 'entregue').length,
  };
}

const Admin = () => {
  const kpis = calculateKPIs();
  const ordersByStatus = countByStatus(mockOrders);

  return (
    <PasswordGate>
      <div className="min-h-screen bg-background">
        <Header />
      
        <main className="container py-6 space-y-6">
          {/* Cabeçalho */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">Acompanhe o desempenho da sua gelateria</p>
            </div>
            <DateFilter />
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              title="Vendas Hoje"
              value={kpis.totalHoje}
              valuePrefix="R$ "
              change={kpis.changePercent}
              changeLabel="vs ontem"
              icon={<DollarSign className="h-5 w-5 text-muted-foreground" />}
            />
            <KPICard
              title="Pedidos Hoje"
              value={kpis.pedidosHoje}
              change={8.5}
              changeLabel="vs ontem"
              icon={<ShoppingCart className="h-5 w-5 text-muted-foreground" />}
            />
            <KPICard
              title="Ticket Médio"
              value={kpis.ticketMedio.toFixed(2)}
              valuePrefix="R$ "
              change={3.2}
              changeLabel="vs semana passada"
              icon={<TrendingUp className="h-5 w-5 text-muted-foreground" />}
            />
            <KPICard
              title="Vendas Semana"
              value={kpis.totalSemana}
              valuePrefix="R$ "
              change={12.4}
              changeLabel="vs semana passada"
              icon={<Package className="h-5 w-5 text-muted-foreground" />}
            />
          </div>

          {/* Gráficos - Linha 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <SalesChart data={mockSalesData} />
            <ProductsChart data={mockProductSales} />
          </div>

          {/* Gráficos - Linha 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <HourlyChart data={mockHourlySales} />
            
            {/* Painel de Status */}
            <div className="kpi-card">
              <h3 className="font-semibold mb-4">Status de Produção</h3>
              <div className="grid grid-cols-2 gap-4">
                <StatusCard count={ordersByStatus.novo} label="Novos" variant="new" />
                <StatusCard count={ordersByStatus.producao} label="Em Produção" variant="production" />
                <StatusCard count={ordersByStatus.pronto} label="Prontos" variant="ready" />
                <StatusCard count={ordersByStatus.entregue} label="Entregues" variant="delivered" />
              </div>
            </div>
          </div>

          {/* Tabela */}
          <RecentOrders orders={mockOrders} />
        </main>
      </div>
    </PasswordGate>
  );
};

// Componente auxiliar para cards de status
function StatusCard({ count, label, variant }: { count: number; label: string; variant: string }) {
  return (
    <div className={`p-4 rounded-lg bg-status-${variant}-bg`}>
      <p className={`text-3xl font-bold text-status-${variant}`}>{count}</p>
      <p className={`text-sm text-status-${variant}/80 mt-1`}>{label}</p>
    </div>
  );
}

export default Admin;