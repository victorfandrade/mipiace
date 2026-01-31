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
        
        <main className="container py-6 space-y-6">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard Admin</h1>

          {/* KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard title="Vendas Hoje" value={kpis.totalHoje} valuePrefix="R$ " icon={<DollarSign className="h-5 w-5" />} />
            <KPICard title="Pedidos Reais" value={orders.length} icon={<ShoppingCart className="h-5 w-5" />} />
            <KPICard title="Ticket Médio" value={kpis.ticketMedio.toFixed(2)} valuePrefix="R$ " icon={<TrendingUp className="h-5 w-5" />} />
            <KPICard title="Faturamento Sem." value={kpis.totalSemana} valuePrefix="R$ " icon={<Package className="h-5 w-5" />} />
          </div>

          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <SalesChart data={mockSalesData} />
            <ProductsChart data={mockProductSales} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <HourlyChart data={mockHourlySales} />
            
            {/* Status em Tempo Real */}
            <div className="kpi-card">
              <h3 className="font-semibold mb-4">Status em Tempo Real</h3>
              <div className="grid grid-cols-2 gap-4">
                <StatusCard count={countByStatus('novo')} label="Novos" color="status-new" />
                <StatusCard count={countByStatus('producao')} label="Produção" color="status-production" />
                <StatusCard count={countByStatus('pronto')} label="Prontos" color="status-ready" />
                <StatusCard count={countByStatus('entregue')} label="Entregues" color="status-delivered" />
              </div>
            </div>
          </div>

          <RecentOrders orders={orders} />
        </main>
      </div>
    </PasswordGate>
  );
}

// Componente auxiliar para cards de status
function StatusCard({ count, label, color }: { count: number; label: string; color: string }) {
  return (
    <div className={`p-4 rounded-lg bg-${color}-bg/10 border border-${color}/20`}>
      <p className={`text-3xl font-bold text-${color}`}>{count}</p>
      <p className="text-xs font-medium text-muted-foreground uppercase mt-1">{label}</p>
    </div>
  );
}
