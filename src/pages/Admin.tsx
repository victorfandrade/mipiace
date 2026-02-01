/**
 * Dashboard Administrativo
 * KPIs, gráficos e pedidos recentes
 */

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { PasswordGate } from '@/components/auth/PasswordGate';
import { KPICard } from '@/components/dashboard/KPICard';
import { SalesChart, ProductsChart, HourlyChart } from '@/components/dashboard/Charts';
import { RecentOrders } from '@/components/dashboard/RecentOrders';
import { mockSalesData, mockProductSales, mockHourlySales, calculateKPIs, getRealOrders } from '@/lib/mock-data';
import { Order } from '@/types/order';
import { DollarSign, ShoppingCart, TrendingUp, Package } from 'lucide-react';

export default function Admin() {
  const [orders, setOrders] = useState<Order[]>([]);
  const kpis = calculateKPIs();

  useEffect(() => {
    getRealOrders().then(setOrders);
  }, []);

  // Contagem de pedidos por status
  const countByStatus = (status: string) => orders.filter(o => o.status === status).length;

  return (
    <PasswordGate>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container py-8 space-y-8">
          {/* Título com descrição */}
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Visão geral do desempenho da sua loja</p>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <KPICard title="Vendas Hoje" value={kpis.totalHoje} valuePrefix="R$ " icon={<DollarSign className="h-5 w-5" />} />
            <KPICard title="Pedidos Reais" value={orders.length} icon={<ShoppingCart className="h-5 w-5" />} />
            <KPICard title="Ticket Médio" value={kpis.ticketMedio.toFixed(2)} valuePrefix="R$ " icon={<TrendingUp className="h-5 w-5" />} />
            <KPICard title="Faturamento Sem." value={kpis.totalSemana} valuePrefix="R$ " icon={<Package className="h-5 w-5" />} />
          </div>

          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <SalesChart data={mockSalesData} />
            <ProductsChart data={mockProductSales} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <HourlyChart data={mockHourlySales} />
            
            {/* Status em Tempo Real */}
            <div className="kpi-card">
              <h3 className="font-semibold mb-5 text-foreground">Status em Tempo Real</h3>
              <div className="grid grid-cols-2 gap-4">
                <StatusCard count={countByStatus('novo')} label="Novos" status="new" />
                <StatusCard count={countByStatus('producao')} label="Produção" status="production" />
                <StatusCard count={countByStatus('pronto')} label="Prontos" status="ready" />
                <StatusCard count={countByStatus('entregue')} label="Entregues" status="delivered" />
              </div>
            </div>
          </div>

          <RecentOrders orders={orders} />
        </main>
      </div>
    </PasswordGate>
  );
}

// Cards de status com design premium
const STATUS_COLORS = {
  new: { bg: 'bg-status-new-bg', text: 'text-status-new', ring: 'ring-status-new/20' },
  production: { bg: 'bg-status-production-bg', text: 'text-status-production', ring: 'ring-status-production/20' },
  ready: { bg: 'bg-status-ready-bg', text: 'text-status-ready', ring: 'ring-status-ready/20' },
  delivered: { bg: 'bg-status-delivered-bg', text: 'text-status-delivered', ring: 'ring-status-delivered/20' },
};

function StatusCard({ count, label, status }: { count: number; label: string; status: keyof typeof STATUS_COLORS }) {
  const colors = STATUS_COLORS[status];
  return (
    <div className={`p-5 rounded-xl ${colors.bg} ring-1 ${colors.ring} transition-all hover:scale-[1.02]`}>
      <p className={`text-4xl font-bold ${colors.text}`}>{count}</p>
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mt-1">{label}</p>
    </div>
  );
}
