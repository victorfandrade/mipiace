import { Order, SalesData, ProductSalesData, FlavorSalesData, HourlySalesData } from '@/types/order';

// Mock orders for production kanban
export const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 1001,
    status: 'novo',
    paymentStatus: 'pago',
    items: [
      { id: '1a', name: 'Pote 500ml', quantity: 1, flavors: ['Pistache', 'Romeu e Julieta'], accompaniments: ['Cascão Artesanal'], price: 50.00 },
      { id: '1b', name: 'Pote 240ml', quantity: 2, flavors: ['Ninho com Nutella'], accompaniments: [], price: 30.00 },
    ],
    total: 116.00,
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
      { id: '2a', name: 'Pote 500ml', quantity: 1, flavors: ['Doce de Leite', 'Café Robusta'], accompaniments: ['Cascão Artesanal', 'Cascão Artesanal'], price: 50.00 },
    ],
    total: 56.00,
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
      { id: '3a', name: 'Pote 500ml', quantity: 2, flavors: ['Limão Siciliano', 'Morango Zero Lactose'], accompaniments: [], price: 50.00 },
      { id: '3b', name: 'Pote 240ml', quantity: 1, flavors: ['Pavlova'], accompaniments: ['Cascão Artesanal'], price: 30.00 },
    ],
    total: 133.00,
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
      { id: '4a', name: 'Pote 240ml', quantity: 1, flavors: ['Iogurte com Amarena'], accompaniments: [], price: 30.00 },
      { id: '4b', name: 'Pote 240ml', quantity: 1, flavors: ['Coco Branco'], accompaniments: [], price: 30.00 },
    ],
    total: 60.00,
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
      { id: '5a', name: 'Pote 500ml', quantity: 2, flavors: ['Cupuaçu', 'Fior di Latte Zero Açúcar'], accompaniments: ['Cascão Artesanal'], price: 50.00 },
    ],
    total: 103.00,
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
      { id: '6a', name: 'Pote 500ml', quantity: 1, flavors: ['Chocolate Zero Açúcar', 'Maracujá'], accompaniments: [], price: 50.00 },
    ],
    total: 50.00,
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
      { id: '7a', name: 'Pote 240ml', quantity: 1, flavors: ['Paçoquinha'], accompaniments: ['Cascão Artesanal'], price: 30.00 },
    ],
    total: 33.00,
    customerName: 'Roberto Dias',
    createdAt: new Date(Date.now() - 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 45 * 60 * 1000),
  },
];

// Mock sales data for charts
export const mockSalesData: SalesData[] = [
  { date: '2024-01-20', total: 1250.00, orders: 32 },
  { date: '2024-01-21', total: 1480.00, orders: 38 },
  { date: '2024-01-22', total: 1120.00, orders: 28 },
  { date: '2024-01-23', total: 1650.00, orders: 42 },
  { date: '2024-01-24', total: 1890.00, orders: 48 },
  { date: '2024-01-25', total: 2100.00, orders: 54 },
  { date: '2024-01-26', total: 1950.00, orders: 50 },
];

export const mockProductSales: ProductSalesData[] = [
  { name: 'Pote 500ml', sales: 156, revenue: 7800 },
  { name: 'Pote 240ml', sales: 98, revenue: 2940 },
  { name: 'Cascão Artesanal', sales: 187, revenue: 561 },
];

export const mockFlavorSales: FlavorSalesData[] = [
  { name: 'Pistache', sales: 89 },
  { name: 'Ninho com Nutella', sales: 78 },
  { name: 'Doce de Leite', sales: 67 },
  { name: 'Romeu e Julieta', sales: 56 },
  { name: 'Morango Zero Lactose', sales: 52 },
  { name: 'Café Robusta', sales: 48 },
  { name: 'Limão Siciliano', sales: 45 },
  { name: 'Pavlova', sales: 42 },
  { name: 'Cupuaçu', sales: 38 },
  { name: 'Coco Branco', sales: 35 },
];

export const mockHourlySales: HourlySalesData[] = [
  { hour: '10h', orders: 5, revenue: 180 },
  { hour: '11h', orders: 8, revenue: 340 },
  { hour: '12h', orders: 12, revenue: 520 },
  { hour: '13h', orders: 15, revenue: 680 },
  { hour: '14h', orders: 18, revenue: 790 },
  { hour: '15h', orders: 22, revenue: 960 },
  { hour: '16h', orders: 28, revenue: 1240 },
  { hour: '17h', orders: 32, revenue: 1410 },
  { hour: '18h', orders: 35, revenue: 1540 },
  { hour: '19h', orders: 30, revenue: 1320 },
  { hour: '20h', orders: 22, revenue: 970 },
  { hour: '21h', orders: 12, revenue: 530 },
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
