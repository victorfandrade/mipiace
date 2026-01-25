export type OrderStatus = 'novo' | 'producao' | 'pronto' | 'entregue';

export type PaymentStatus = 'pago' | 'pendente';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  flavors: string[];
  accompaniments?: string[];
  price: number;
}

export interface Order {
  id: string;
  orderNumber: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  items: OrderItem[];
  total: number;
  customerName?: string;
  customerId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface KPIData {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
}

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

export interface FlavorSalesData {
  name: string;
  sales: number;
}

export interface HourlySalesData {
  hour: string;
  orders: number;
  revenue: number;
}
