# Documentação - Mi Piace Gelateria

> **Princípio de Pareto aplicado**: Esta documentação foca nos 20% essenciais que explicam 80% do sistema.

---

## 📁 Estrutura do Projeto

```
src/
├── pages/           → Páginas principais (rotas)
├── components/      → Componentes reutilizáveis
│   ├── auth/        → Autenticação (PasswordGate)
│   ├── dashboard/   → Gráficos e KPIs
│   ├── layout/      → Header
│   ├── production/  → Kanban (OrderCard, KanbanColumn)
│   └── ui/          → Componentes base (shadcn/ui)
├── hooks/           → Hooks customizados
├── lib/             → Utilitários e dados mock
└── types/           → Tipos TypeScript
```

---

## 🚀 Rotas

| Rota | Página | Descrição |
|------|--------|-----------|
| `/` | `Loja.tsx` | Quadro Kanban de produção |
| `/admin` | `Admin.tsx` | Dashboard com KPIs e gráficos |

---

## 🎯 Fluxo Principal: Pedidos

### Ciclo de Vida do Pedido

```
novo → producao → pronto → entregue
```

### Tipo Order (src/types/order.ts)

```typescript
interface Order {
  id: string;
  orderNumber: number;
  status: 'novo' | 'producao' | 'pronto' | 'entregue';
  paymentStatus: 'pago' | 'pendente';
  items: OrderItem[];
  total: number;
  customerName?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 🧩 Componentes Principais

### 1. KanbanColumn + OrderCard

**Onde**: `src/components/production/`

**Função**: Exibe pedidos organizados por status em colunas arrastáveis.

```tsx
// Uso em Loja.tsx
<KanbanColumn
  status="novo"
  orders={orders.filter(o => o.status === 'novo')}
  onStatusChange={handleStatusChange}
/>
```

**Fluxo de atualização**:
1. Usuário clica no botão de ação do card
2. `onStatusChange(orderId, novoStatus)` é chamado
3. Estado local atualiza → UI re-renderiza

### 2. PasswordGate

**Onde**: `src/components/auth/PasswordGate.tsx`

**Função**: Protege o dashboard admin com senha simples.

```tsx
// Uso em Admin.tsx
<PasswordGate>
  <DashboardContent />
</PasswordGate>
```

**Como funciona**:
- Senha hardcoded: `gabriel0419`
- Salva autenticação em `sessionStorage`
- Limpa ao fechar o navegador

### 3. Charts (SalesChart, ProductsChart, HourlyChart)

**Onde**: `src/components/dashboard/Charts.tsx`

**Função**: Três gráficos consolidados em um arquivo usando Recharts.

| Componente | Tipo | Dados |
|------------|------|-------|
| SalesChart | LineChart | Vendas por dia |
| ProductsChart | BarChart | Vendas por produto |
| HourlyChart | AreaChart | Vendas por hora |

### 4. Header

**Onde**: `src/components/layout/Header.tsx`

**Comportamento especial**: Esconde ao rolar para baixo (prop `hideOnScroll`).

---

## 🎨 Sistema de Design

### Cores de Status (index.css)

```css
--status-new: 142 76% 36%;        /* Verde */
--status-production: 45 93% 47%;  /* Amarelo */
--status-ready: 217 91% 60%;      /* Azul */
--status-delivered: 215 14% 45%;  /* Cinza */
```

### Classes Tailwind Customizadas

```css
.kpi-card      → Card com sombra suave
.kanban-column → Coluna do Kanban com scroll
.chart-card    → Container de gráficos
```

### Uso de Cores

```tsx
// ✅ Correto - usa tokens semânticos
<div className="bg-status-new text-status-new-foreground" />

// ❌ Errado - cor hardcoded
<div className="bg-green-500" />
```

---

## 📊 Dados Mock

**Onde**: `src/lib/mock-data.ts`

**Exports principais**:

| Export | Tipo | Uso |
|--------|------|-----|
| `mockOrders` | `Order[]` | Lista de pedidos |
| `mockSalesData` | `SalesData[]` | Gráfico de vendas |
| `mockProductSales` | `ProductSalesData[]` | Gráfico de produtos |
| `mockHourlySales` | `HourlySalesData[]` | Gráfico por hora |
| `calculateKPIs()` | `function` | Calcula métricas do dashboard |

---

## 🔧 Hooks Importantes

### useIsMobile

```tsx
const isMobile = useIsMobile();
// true se largura < 768px
```

### useToast

```tsx
const { toast } = useToast();
toast({ title: 'Sucesso', description: 'Ação realizada' });
```

---

## 📱 Responsividade

- **Mobile**: < 768px (1 coluna Kanban, gráficos adaptados)
- **Tablet**: 768px-1024px (2 colunas)
- **Desktop**: > 1024px (4 colunas)

---

## 🔄 Padrões de Código

### Configuração via Objeto

```tsx
// Em vez de múltiplos if/else, use objetos de configuração
const STATUS_CONFIG = {
  novo: { label: 'Novo', color: 'green' },
  producao: { label: 'Em Produção', color: 'yellow' },
};

// Uso
const config = STATUS_CONFIG[status];
```

### Componentes Funcionais

```tsx
// Estrutura padrão
export function MeuComponente({ prop1, prop2 }: Props) {
  // 1. Hooks
  const [state, setState] = useState();
  
  // 2. Handlers
  const handleClick = () => {};
  
  // 3. Render
  return <div />;
}
```

---

## 🚧 Próximos Passos (Evolução)

1. **Backend**: Ativar Lovable Cloud para persistir dados
2. **Auth**: Substituir PasswordGate por autenticação real
3. **Realtime**: Sincronizar pedidos entre dispositivos
4. **Notificações**: Alertas sonoros para novos pedidos

---

## 📚 Tecnologias

| Tech | Versão | Uso |
|------|--------|-----|
| React | 18.3 | UI |
| TypeScript | - | Tipagem |
| Tailwind CSS | - | Estilização |
| shadcn/ui | - | Componentes base |
| Recharts | 2.15 | Gráficos |
| React Router | 6.30 | Roteamento |
| TanStack Query | 5.83 | Cache/fetch (preparado) |

---

*Documentação atualizada em Janeiro/2026*
