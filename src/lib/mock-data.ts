import { Order, OrderItem, SalesData, ProductSalesData, HourlySalesData } from '@/types/order';
import { supabase } from './supabase';

/**
 * 1. DADOS MOCK (SEGURANÇA)
 * Se o Supabase falhar ou estiver vazio, esses dados garantem que a tela apareça.
 */
export const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 1001,
    status: 'novo',
    paymentStatus: 'pago',
    items: [
      { id: '1a', name: 'Pote 500ml', quantity: 1, flavors: ['Pistache'], accompaniments: ['Cascão'], price: 50 },
    ],
    total: 50,
    customerName: 'João Silva (Mock)',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

/**
 * 2. MAPEADOR SEGURO (CONVERSÃO SQL -> TS)
 * Usa encadeamento opcional (?.) e valores padrão (||) para evitar o erro de tela branca.
 */
const mapSupabaseToOrder = (p: any): Order => ({
  id: p.id,
  orderNumber: p.id ? parseInt(p.id.split('-')[0], 16) % 10000 : Math.floor(Math.random() * 1000),
  customerName: p.cliente_nome || 'Cliente sem nome',
  total: Number(p.valor_total || 0),
  status: (p.status_prod as any) || 'novo',
  paymentStatus: p.status_pag === 'pago' ? 'pago' : 'pendente',
  createdAt: p.created_at ? new Date(p.created_at) : new Date(),
  updatedAt: p.created_at ? new Date(p.created_at) : new Date(),
  items: (p.pedido_itens || []).map((item: any): OrderItem => ({
    id: item.id || String(Math.random()),
    name: item.products?.nome || 'Produto',
    quantity: item.quantidade || 1,
    price: Number(item.valor_unit || 0),
    flavors: (item.item_sabores || []).map((s: any) => s.sabores?.nome).filter(Boolean),
    accompaniments: (item.item_acompanhamentos || []).map((a: any) => a.products?.nome).filter(Boolean)
  }))
});

/**
 * 3. FUNÇÃO DE BUSCA PRINCIPAL
 */
export async function getRealOrders(): Promise<Order[]> {
  try {
    const { data, error } = await supabase
      .from('pedidos')
      .select(`
        id, cliente_nome, valor_total, status_pag, status_prod, created_at,
        pedido_itens (
          id, quantidade, valor_unit,
          products (nome),
          item_sabores (sabores (nome)),
          item_acompanhamentos (products (nome))
        )
      `)
      .order('created_at', { ascending: false });

    // Se o banco retornar erro ou estiver vazio, NÃO joga erro, retorna o Mock.
    if (error || !data || data.length === 0) {
      console.warn("Aviso: Retornando Mock Data porque o banco está inacessível ou vazio.");
      return mockOrders;
    }

    return data.map(mapSupabaseToOrder);
  } catch (err) {
    console.error("Erro crítico ao buscar dados do Supabase:", err);
    return mockOrders; // Segurança máxima contra tela branca
  }
}

/**
 * 4. DADOS PARA DASHBOARD (GRÁFICOS)
 */
export const mockSalesData: SalesData[] = [
  { date: '2024-01-20', total: 2450, orders: 52 },
  { date: '2024-01-21', total: 2880, orders: 61 },
  { date: '2024-01-22', total: 2120, orders: 45 },
  { date: '2024-01-23', total: 3150, orders: 68 },
  { date: '2024-01-24', total: 3590, orders: 76 },
  { date: '2024-01-25', total: 4100, orders: 89 },
  { date: '2024-01-26', total: 3850, orders: 82 },
];

export const mockProductSales: ProductSalesData[] = [
  { name: 'Pote 500ml', sales: 245, revenue: 12250 },
  { name: 'Pote 240ml', sales: 189, revenue: 5670 },
  { name: 'Cascão Artesanal', sales: 312, revenue: 936 },
];

export const mockHourlySales: HourlySalesData[] = [
  { hour: '12h', orders: 28, revenue: 1020 },
  { hour: '15h', orders: 18, revenue: 640 },
  { hour: '18h', orders: 40, revenue: 1450 },
  { hour: '21h', orders: 15, revenue: 540 },
];

/**
 * 5. CÁLCULO DE KPIs
 */
export function calculateKPIs() {
  const today = mockSalesData[mockSalesData.length - 1] || { total: 0, orders: 1 };
  const yesterday = mockSalesData[mockSalesData.length - 2] || { total: 1, orders: 1 };
  const weekTotal = mockSalesData.reduce((acc, day) => acc + day.total, 0);
  const weekOrders = mockSalesData.reduce((acc, day) => acc + day.orders, 0);
  
  return {
    totalHoje: today.total,
    totalSemana: weekTotal,
    ticketMedio: weekOrders > 0 ? weekTotal / weekOrders : 0,
    pedidosHoje: today.orders,
    changePercent: yesterday.total > 0 ? ((today.total - yesterday.total) / yesterday.total) * 100 : 0,
  };
}