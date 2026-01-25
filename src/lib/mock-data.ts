import { Order, SalesData, ProductSalesData, FlavorSalesData, HourlySalesData } from '@/types/order';

// Mock orders for production kanban
export const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 1001,
    status: 'novo',
    paymentStatus: 'pago',
    items: [
      { id: '1a', name: 'Açaí 500ml', quantity: 1, flavors: ['Tradicional'], accompaniments: ['Granola', 'Banana', 'Leite condensado'], price: 22.00 },
      { id: '1b', name: 'Açaí 300ml', quantity: 2, flavors: ['Morango'], accompaniments: ['Leite em pó'], price: 16.00 },
    ],
    total: 54.00,
    customerName: 'João Silva',
    createdAt: new Date(Date.now() - 5 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 60 * 1000),
  },
  {
    id: '2',
    orderNumber: 1002,
    status: 'novo',
    paymentStatus: 'pendente',
    items: [
      { id: '2a', name: 'Açaí 700ml', quantity: 1, flavors: ['Cupuaçu'], accompaniments: ['Paçoca', 'Nutella'], price: 28.00 },
    ],
    total: 28.00,
    customerName: 'Maria Santos',
    createdAt: new Date(Date.now() - 3 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 60 * 1000),
  },
  {
    id: '3',
    orderNumber: 1003,
    status: 'producao',
    paymentStatus: 'pago',
    items: [
      { id: '3a', name: 'Açaí 500ml', quantity: 3, flavors: ['Tradicional', 'Morango'], accompaniments: ['Granola', 'Mel'], price: 22.00 },
    ],
    total: 66.00,
    customerName: 'Pedro Costa',
    createdAt: new Date(Date.now() - 15 * 60 * 1000),
    updatedAt: new Date(Date.now() - 10 * 60 * 1000),
  },
  {
    id: '4',
    orderNumber: 1004,
    status: 'producao',
    paymentStatus: 'pago',
    items: [
      { id: '4a', name: 'Açaí 300ml', quantity: 1, flavors: ['Tradicional'], accompaniments: ['Banana'], price: 16.00 },
      { id: '4b', name: 'Suco Natural', quantity: 2, flavors: ['Laranja'], price: 8.00 },
    ],
    total: 32.00,
    customerName: 'Ana Lima',
    createdAt: new Date(Date.now() - 20 * 60 * 1000),
    updatedAt: new Date(Date.now() - 12 * 60 * 1000),
  },
  {
    id: '5',
    orderNumber: 1005,
    status: 'pronto',
    paymentStatus: 'pago',
    items: [
      { id: '5a', name: 'Açaí 500ml', quantity: 2, flavors: ['Cupuaçu'], accompaniments: ['Leite condensado', 'Granola'], price: 22.00 },
    ],
    total: 44.00,
    customerName: 'Carlos Mendes',
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 60 * 1000),
  },
  {
    id: '6',
    orderNumber: 1006,
    status: 'pronto',
    paymentStatus: 'pendente',
    items: [
      { id: '6a', name: 'Açaí 700ml', quantity: 1, flavors: ['Morango'], accompaniments: ['Nutella', 'Morango'], price: 28.00 },
    ],
    total: 28.00,
    customerName: 'Fernanda Alves',
    createdAt: new Date(Date.now() - 25 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 60 * 1000),
  },
  {
    id: '7',
    orderNumber: 1000,
    status: 'entregue',
    paymentStatus: 'pago',
    items: [
      { id: '7a', name: 'Açaí 500ml', quantity: 1, flavors: ['Tradicional'], accompaniments: ['Granola'], price: 22.00 },
    ],
    total: 22.00,
    customerName: 'Roberto Dias',
    createdAt: new Date(Date.now() - 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 45 * 60 * 1000),
  },
];

// Mock sales data for charts
export const mockSalesData: SalesData[] = [
  { date: '2024-01-20', total: 1250.00, orders: 45 },
  { date: '2024-01-21', total: 1480.00, orders: 52 },
  { date: '2024-01-22', total: 1120.00, orders: 38 },
  { date: '2024-01-23', total: 1650.00, orders: 58 },
  { date: '2024-01-24', total: 1890.00, orders: 67 },
  { date: '2024-01-25', total: 2100.00, orders: 74 },
  { date: '2024-01-26', total: 1950.00, orders: 69 },
];

export const mockProductSales: ProductSalesData[] = [
  { name: 'Açaí 500ml', sales: 156, revenue: 3432 },
  { name: 'Açaí 300ml', sales: 98, revenue: 1568 },
  { name: 'Açaí 700ml', sales: 67, revenue: 1876 },
  { name: 'Suco Natural', sales: 45, revenue: 360 },
  { name: 'Açaí 1L', sales: 34, revenue: 1360 },
];

export const mockFlavorSales: FlavorSalesData[] = [
  { name: 'Tradicional', sales: 245 },
  { name: 'Morango', sales: 178 },
  { name: 'Cupuaçu', sales: 89 },
  { name: 'Banana', sales: 67 },
  { name: 'Chocolate', sales: 45 },
];

export const mockHourlySales: HourlySalesData[] = [
  { hour: '10h', orders: 8, revenue: 180 },
  { hour: '11h', orders: 15, revenue: 340 },
  { hour: '12h', orders: 28, revenue: 620 },
  { hour: '13h', orders: 35, revenue: 780 },
  { hour: '14h', orders: 22, revenue: 490 },
  { hour: '15h', orders: 18, revenue: 400 },
  { hour: '16h', orders: 25, revenue: 560 },
  { hour: '17h', orders: 32, revenue: 710 },
  { hour: '18h', orders: 40, revenue: 890 },
  { hour: '19h', orders: 38, revenue: 850 },
  { hour: '20h', orders: 28, revenue: 620 },
  { hour: '21h', orders: 15, revenue: 340 },
];

// KPI calculations
export const calculateKPIs = () => {
  const today = mockSalesData[mockSalesData.length - 1];
  const yesterday = mockSalesData[mockSalesData.length - 2];
  
  const weekTotal = mockSalesData.reduce((acc, day) => acc + day.total, 0);
  const weekOrders = mockSalesData.reduce((acc, day) => acc + day.orders, 0);
  
  const ticketMedio = weekTotal / weekOrders;
  
  const changePercent = ((today.total - yesterday.total) / yesterday.total) * 100;
  
  return {
    totalHoje: today.total,
    totalSemana: weekTotal,
    ticketMedio: ticketMedio,
    pedidosHoje: today.orders,
    pedidosSemana: weekOrders,
    changePercent: changePercent,
  };
};
