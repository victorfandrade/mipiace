import { Order, SalesData, ProductSalesData, HourlySalesData } from '@/types/order';
import { supabase } from './supabase';

/**
 * DADOS DE EXEMPLO (MOCK)
 * Use estes dados enquanto o banco não tem registros.
 */
export const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 1001,
    status: 'novo',
    paymentStatus: 'pago',
    items: [
      { id: '1a', name: 'Pote 500ml', quantity: 1, flavors: ['Pistache', 'Doce de Leite'], accompaniments: ['Cascão Artesanal'], price: 50 },
    ],
    total: 116,
    customerName: 'João Silva',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  // ... outros mocks que você já tem
];

/**
 * FUNÇÕES DE INTEGRAÇÃO REAL (Para usar nos componentes)
 * * Exemplo de uso no Loja.tsx:
 * const orders = await getRealOrders();
 */

export async function getRealOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from('pedidos')
    .select(`
      id,
      cliente_nome,
      valor_total,
      status_pag,
      status_prod,
      created_at,
      pedido_itens (
        quantidade,
        products (nome, preco),
        item_sabores (sabores (nome)),
        item_acompanhamentos (products (nome))
      )
    `);

  if (error) {
    console.error("Erro ao buscar pedidos:", error);
    return mockOrders; // Retorna mock se der erro para não quebrar a UI
  }

  // Aqui você faria o "map" para transformar o snake_case do banco
  // no camelCase da sua interface TypeScript Order.
  return data.map((p: any) => ({
    id: p.id,
    orderNumber: p.id.slice(0, 4), // Exemplo simples
    status: p.status_prod,
    paymentStatus: p.status_pag === 'pago' ? 'pago' : 'pendente',
    customerName: p.cliente_nome,
    total: p.valor_total,
    items: [], // Aqui você mapearia os itens complexos
    createdAt: new Date(p.created_at),
    updatedAt: new Date(p.created_at),
  }));
}

// Mantenha seus dados de gráfico abaixo como estão para o Dashboard não ficar vazio
export const mockSalesData: SalesData[] = [ /* Seus dados originais */ ];
export const mockProductSales: ProductSalesData[] = [ /* Seus dados originais */ ];
export const mockHourlySales: HourlySalesData[] = [ /* Seus dados originais */ ];

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