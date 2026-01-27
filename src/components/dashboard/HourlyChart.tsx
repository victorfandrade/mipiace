/**
 * Gráfico de área mostrando vendas por horário do dia
 * Otimizado para mobile com cores terrosas
 */

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { HourlySalesData } from '@/types/order';

interface HourlyChartProps {
  data: HourlySalesData[];
}

export function HourlyChart({ data }: HourlyChartProps) {
  return (
    <div className="kpi-card">
      <h3 className="font-semibold mb-4">Vendas por Horário</h3>
      {/* Altura menor no mobile */}
      <div className="h-[220px] sm:h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart 
            data={data} 
            margin={{ top: 5, right: 10, left: -15, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(35 55% 48%)" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="hsl(35 55% 48%)" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="hour" 
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              interval={1}
            />
            <YAxis 
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              width={25}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                fontSize: '12px',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}
              formatter={(value: number) => [value, 'Pedidos']}
            />
            <Area
              type="monotone"
              dataKey="orders"
              stroke="hsl(35 55% 48%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorOrders)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
