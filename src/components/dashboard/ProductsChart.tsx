/**
 * Gráfico de barras horizontais mostrando produtos mais vendidos
 * Usa verde oliva como cor principal - Otimizado para mobile
 */

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ProductSalesData } from '@/types/order';

interface ProductsChartProps {
  data: ProductSalesData[];
}

export function ProductsChart({ data }: ProductsChartProps) {
  // Limita a 5 produtos no mobile para melhor visualização
  const displayData = data.slice(0, 5);

  return (
    <div className="kpi-card">
      <h3 className="font-semibold mb-4">Produtos Mais Vendidos</h3>
      {/* Altura menor no mobile */}
      <div className="h-[220px] sm:h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={displayData} 
            layout="vertical" 
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <XAxis 
              type="number"
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              type="category"
              dataKey="name"
              tick={{ fill: 'hsl(var(--foreground))', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={80}
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
              formatter={(value: number) => [value, 'Vendas']}
              cursor={{ fill: 'hsl(var(--muted))', opacity: 0.3 }}
            />
            <Bar 
              dataKey="sales" 
              radius={[0, 6, 6, 0]}
              barSize={24}
            >
              {displayData.map((_, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={`hsl(84 ${30 - index * 4}% ${35 + index * 5}%)`}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
