import { Order, OrderItem, SalesData, ProductSalesData, HourlySalesData } from '@/types/order';
import { supabase } from './supabase';

/**
 * MAPEADOR: Transforma o retorno do Supabase no formato da nossa Interface
 */
export const mapSupabaseToOrder = (p: any): Order => ({
  id: p.id,
  orderNumber: parseInt(p.id.split('-')[0], 16) % 10000, 
  customerName: p.cliente_nome || 'Cliente',
  total: Number(p.valor_total),
  status: p.status_prod,
  paymentStatus: p.status_pag === 'pago' ? 'pago' : 'pendente',
  createdAt: new Date(p.created_at),
  updatedAt: new Date(p.created_at),
  items: p.pedido_itens?.map((item: any): OrderItem => ({
    id: item.id,
    name: item.products?.nome || 'Produto',
    quantity: item.quantidade,
    price: Number(item.valor_unit),
    flavors: item.item_sabores?.map((s: any) => s.sabores?.nome).filter(Boolean) || [],
    accompaniments: item.item_acompanhamentos?.map((a: any) => a.products?.nome).filter(Boolean) || []
  })) || []
});

/**
 * BUSCA PEDIDOS REAIS
 */
export async function getRealOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from('pedidos')
    .select(`
      *,
      pedido_itens (
        id, quantidade, valor_unit,
        products (nome),
        item_sabores (sabores (nome)),
        item_acompanhamentos (products (nome))
      )
    `)
    .order('created_at', { ascending: false });

  if (error || !data) return mockOrders;
  return data.map(mapSupabaseToOrder);
}

// --- Mantenha seus Mocks e KPIs abaixo para o Admin ---
export const mockOrders: Order[] = [ /* Seus mocks originais aqui */ ];
export const mockSalesData: SalesData[] = [ /* Seus dados de gráfico */ ];
export const mockProductSales: ProductSalesData[] = [ /* Seus dados de gráfico */ ];
export const mockHourlySales: HourlySalesData[] = [ /* Seus dados de gráfico */ ];

export function calculateKPIs() {
  const today = mockSalesData[mockSalesData.length - 1];
  const yesterday = mockSalesData[mockSalesData.length - 2];
  const weekTotal = mockSalesData.reduce((acc, day) => acc + day.total, 0);
  const weekOrders = mockSalesData.reduce((acc, day) => acc + day.orders, 0);
  
  return {
    totalHoje: today.total,
    totalSemana: weekTotal,
    ticketMedio: weekTotal / weekOrders,
    pedidosHoje: today.orders,
    changePercent: ((today.total - yesterday.total) / yesterday.total) * 100,
  };
}

