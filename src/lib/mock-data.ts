import { Order, OrderItem, SalesData, ProductSalesData, HourlySalesData } from '@/types/order';
import { supabase } from './supabase';

export const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 1001,
    status: 'novo',
    paymentStatus: 'pago',
    items: [],
    total: 0,
    customerName: 'Pedido de Teste',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

export async function getRealOrders(): Promise<Order[]> {
  try {
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

    if (error || !data || data.length === 0) return mockOrders;

    return data.map((p: any): Order => ({
      id: p.id,
      orderNumber: p.id ? parseInt(p.id.split('-')[0], 16) % 10000 : 0,
      customerName: p.cliente_nome || 'Cliente',
      total: Number(p.valor_total || 0),
      status: p.status_prod || 'novo',
      paymentStatus: p.status_pag === 'pago' ? 'pago' : 'pendente',
      createdAt: new Date(p.created_at || Date.now()),
      updatedAt: new Date(p.created_at || Date.now()),
      items: (p.pedido_itens || []).map((item: any): OrderItem => ({
        id: item.id,
        name: item.products?.nome || 'Produto',
        quantity: item.quantidade || 0,
        price: Number(item.valor_unit || 0),
        flavors: (item.item_sabores || []).map((s: any) => s.sabores?.nome).filter(Boolean),
        accompaniments: (item.item_acompanhamentos || []).map((a: any) => a.products?.nome).filter(Boolean)
      }))
    }));
  } catch (e) {
    console.error("Erro ao carregar dados:", e);
    return mockOrders;
  }
}

// Garanta que essas constantes existam para não dar undefined no Admin.tsx
export const mockSalesData: SalesData[] = [];
export const mockProductSales: ProductSalesData[] = [];
export const mockHourlySales: HourlySalesData[] = [];

export function calculateKPIs() {
  return {
    totalHoje: 0,
    totalSemana: 0,
    ticketMedio: 0,
    pedidosHoje: 0,
    changePercent: 0,
  };
}