/**
 * Gráfico de linha - Vendas da semana
 * Otimizado para mobile com fontes e margens responsivas
 */

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SalesData } from '@/types/order';
import { useIsMobile } from '@/hooks/use-mobile';

interface SalesChartProps {
  data: SalesData[];
}

export function SalesChart({ data }: SalesChartProps) {
  const isMobile = useIsMobile();
  
  const formattedData = data.map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('pt-BR', { 
      weekday: 'short', 
      day: '2-digit' 
    }),
  }));

  return (
    <div className="kpi-card">
      <h3 className="font-semibold mb-4 text-sm sm:text-base">Vendas da Semana</h3>
      <div className="h-[220px] sm:h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={formattedData} 
            margin={{ 
              top: 5, 
              right: isMobile ? 5 : 20, 
              left: isMobile ? -15 : 10, 
              bottom: 5 
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis 
              dataKey="date" 
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: isMobile ? 10 : 12 }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tickLine={false}
              interval={isMobile ? 1 : 0}
            />
            <YAxis 
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: isMobile ? 10 : 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => isMobile ? `${(value/1000).toFixed(0)}k` : `R$${value}`}
              width={isMobile ? 35 : 60}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                fontSize: isMobile ? 12 : 14,
              }}
              labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}
              formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Total']}
            />
            <Line
              type="monotone"
              dataKey="total"
              stroke="hsl(var(--primary))"
              strokeWidth={isMobile ? 2 : 3}
              dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: isMobile ? 3 : 4 }}
              activeDot={{ r: isMobile ? 5 : 6, fill: 'hsl(var(--primary))' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
