/**
 * Gráfico de barras horizontais - Produtos mais vendidos
 * Otimizado para mobile com labels truncados e margens ajustadas
 */

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ProductSalesData } from '@/types/order';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProductsChartProps {
  data: ProductSalesData[];
}

export function ProductsChart({ data }: ProductsChartProps) {
  const isMobile = useIsMobile();
  
  // Trunca nomes longos no mobile
  const formattedData = data.map(item => ({
    ...item,
    displayName: isMobile && item.name.length > 10 
      ? item.name.substring(0, 10) + '...' 
      : item.name,
  }));

  return (
    <div className="kpi-card">
      <h3 className="font-semibold mb-4 text-sm sm:text-base">Produtos Mais Vendidos</h3>
      <div className="h-[220px] sm:h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={formattedData} 
            layout="vertical" 
            margin={{ 
              top: 5, 
              right: isMobile ? 10 : 20, 
              left: isMobile ? 0 : 10, 
              bottom: 5 
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
            <XAxis 
              type="number"
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: isMobile ? 10 : 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              type="category"
              dataKey="displayName"
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: isMobile ? 10 : 12 }}
              axisLine={false}
              tickLine={false}
              width={isMobile ? 70 : 90}
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
              formatter={(value: number) => [value, 'Vendas']}
              labelFormatter={(label) => data.find(d => d.name.startsWith(String(label).replace('...', '')))?.name || label}
            />
            <Bar 
              dataKey="sales" 
              radius={[0, 6, 6, 0]}
              maxBarSize={isMobile ? 24 : 32}
            >
              {formattedData.map((_, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={`hsl(var(--primary) / ${1 - index * 0.2})`} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
