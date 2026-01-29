/**
 * Tipos do sistema de pedidos
 */

// Status do pedido no fluxo: novo → produção → pronto → entregue
export type OrderStatus = 'novo' | 'producao' | 'pronto' | 'entregue';

// Status de pagamento
export type PaymentStatus = 'pago' | 'pendente';

// Item de um pedido
export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  flavors: string[];
  accompaniments?: string[];
  price: number;
}

// Pedido completo
export interface Order {
  id: string;
  orderNumber: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  items: OrderItem[];
  total: number;
  customerName?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Tipos para gráficos do Dashboard
export interface SalesData {
  date: string;
  total: number;
  orders: number;
}

export interface ProductSalesData {
  name: string;
  sales: number;
  revenue: number;
}

export interface HourlySalesData {
  hour: string;
  orders: number;
  revenue: number;
}