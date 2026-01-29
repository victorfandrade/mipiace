/**
 * Gráfico de área - Vendas por horário
 * Otimizado para mobile com intervalo de horas e gradiente verde
 */

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { HourlySalesData } from '@/types/order';
import { useIsMobile } from '@/hooks/use-mobile';

interface HourlyChartProps {
  data: HourlySalesData[];
}

export function HourlyChart({ data }: HourlyChartProps) {
  const isMobile = useIsMobile();

  return (
    <div className="kpi-card">
      <h3 className="font-semibold mb-4 text-sm sm:text-base">Vendas por Horário</h3>
      <div className="h-[220px] sm:h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart 
            data={data} 
            margin={{ 
              top: 5, 
              right: isMobile ? 5 : 20, 
              left: isMobile ? -20 : 10, 
              bottom: 5 
            }}
          >
            <defs>
              <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis 
              dataKey="hour" 
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: isMobile ? 9 : 12 }}
              axisLine={false}
              tickLine={false}
              interval={isMobile ? 2 : 0}
            />
            <YAxis 
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: isMobile ? 10 : 12 }}
              axisLine={false}
              tickLine={false}
              width={isMobile ? 30 : 40}
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
              formatter={(value: number) => [value, 'Pedidos']}
            />
            <Area
              type="monotone"
              dataKey="orders"
              stroke="hsl(var(--primary))"
              strokeWidth={isMobile ? 2 : 3}
              fillOpacity={1}
              fill="url(#colorOrders)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
