/**
 * Gráficos do Dashboard
 * Linha (vendas), barras (produtos) e área (horário)
 * Otimizados para mobile com verde oliva primário
 */

import { 
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { SalesData, ProductSalesData, HourlySalesData } from '@/types/order';
import { useIsMobile } from '@/hooks/use-mobile';

// Estilo comum dos tooltips
const tooltipStyle = (isMobile: boolean) => ({
  contentStyle: {
    backgroundColor: 'hsl(var(--card))',
    border: '1px solid hsl(var(--border))',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    fontSize: isMobile ? 12 : 14,
  },
  labelStyle: { color: 'hsl(var(--foreground))', fontWeight: 600 },
});

// Gráfico de Linha: Vendas da Semana
export function SalesChart({ data }: { data: SalesData[] }) {
  const isMobile = useIsMobile();
  
  const formatted = data.map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit' }),
  }));

  return (
    <div className="kpi-card">
      <h3 className="font-semibold mb-4 text-sm sm:text-base">Vendas da Semana</h3>
      <div className="h-[220px] sm:h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formatted} margin={{ top: 5, right: isMobile ? 5 : 20, left: isMobile ? -15 : 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis dataKey="date" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: isMobile ? 10 : 12 }} axisLine={{ stroke: 'hsl(var(--border))' }} tickLine={false} interval={isMobile ? 1 : 0} />
            <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: isMobile ? 10 : 12 }} axisLine={false} tickLine={false} tickFormatter={v => isMobile ? `${(v/1000).toFixed(0)}k` : `R$${v}`} width={isMobile ? 35 : 60} />
            <Tooltip {...tooltipStyle(isMobile)} formatter={(v: number) => [`R$ ${v.toFixed(2)}`, 'Total']} />
            <Line type="monotone" dataKey="total" stroke="hsl(var(--primary))" strokeWidth={isMobile ? 2 : 3} dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: isMobile ? 3 : 4 }} activeDot={{ r: isMobile ? 5 : 6, fill: 'hsl(var(--primary))' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Gráfico de Barras: Produtos Mais Vendidos
export function ProductsChart({ data }: { data: ProductSalesData[] }) {
  const isMobile = useIsMobile();
  
  const formatted = data.map(item => ({
    ...item,
    displayName: isMobile && item.name.length > 10 ? item.name.substring(0, 10) + '...' : item.name,
  }));

  return (
    <div className="kpi-card">
      <h3 className="font-semibold mb-4 text-sm sm:text-base">Produtos Mais Vendidos</h3>
      <div className="h-[220px] sm:h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={formatted} layout="vertical" margin={{ top: 5, right: isMobile ? 10 : 20, left: isMobile ? 0 : 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
            <XAxis type="number" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: isMobile ? 10 : 12 }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="displayName" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: isMobile ? 10 : 12 }} axisLine={false} tickLine={false} width={isMobile ? 70 : 90} />
            <Tooltip {...tooltipStyle(isMobile)} formatter={(v: number) => [v, 'Vendas']} labelFormatter={label => data.find(d => d.name.startsWith(String(label).replace('...', '')))?.name || label} />
            <Bar dataKey="sales" radius={[0, 6, 6, 0]} maxBarSize={isMobile ? 24 : 32}>
              {formatted.map((_, i) => <Cell key={i} fill={`hsl(var(--primary) / ${1 - i * 0.2})`} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Gráfico de Área: Vendas por Horário
export function HourlyChart({ data }: { data: HourlySalesData[] }) {
  const isMobile = useIsMobile();

  return (
    <div className="kpi-card">
      <h3 className="font-semibold mb-4 text-sm sm:text-base">Vendas por Horário</h3>
      <div className="h-[220px] sm:h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: isMobile ? 5 : 20, left: isMobile ? -20 : 10, bottom: 5 }}>
            <defs>
              <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis dataKey="hour" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: isMobile ? 9 : 12 }} axisLine={false} tickLine={false} interval={isMobile ? 2 : 0} />
            <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: isMobile ? 10 : 12 }} axisLine={false} tickLine={false} width={isMobile ? 30 : 40} />
            <Tooltip {...tooltipStyle(isMobile)} formatter={(v: number) => [v, 'Pedidos']} />
            <Area type="monotone" dataKey="orders" stroke="hsl(var(--primary))" strokeWidth={isMobile ? 2 : 3} fillOpacity={1} fill="url(#colorOrders)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
