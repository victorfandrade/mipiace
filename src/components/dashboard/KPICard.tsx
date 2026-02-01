/**
 * Card de KPI (Indicador Chave)
 * Design premium com ícone destacado e animações suaves
 */

import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface Props {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  className?: string;
  valuePrefix?: string;
  valueSuffix?: string;
}

export function KPICard({ title, value, change, changeLabel, icon, className, valuePrefix = '', valueSuffix = '' }: Props) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <div className={cn('kpi-card animate-fade-in group', className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1.5 flex-1">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{title}</p>
          <p className="text-3xl font-bold tracking-tight text-foreground">
            {valuePrefix}{typeof value === 'number' ? value.toLocaleString('pt-BR') : value}{valueSuffix}
          </p>
        </div>
        {icon && (
          <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
            {icon}
          </div>
        )}
      </div>
      
      {change !== undefined && (
        <div className="mt-4 pt-4 border-t border-border/50 flex items-center gap-2">
          <div className={cn(
            'flex items-center gap-1.5 text-sm font-semibold px-2 py-1 rounded-lg',
            isPositive && 'text-status-ready bg-status-ready-bg',
            isNegative && 'text-destructive bg-destructive/10',
            !isPositive && !isNegative && 'text-muted-foreground'
          )}>
            {isPositive && <TrendingUp className="h-4 w-4" />}
            {isNegative && <TrendingDown className="h-4 w-4" />}
            <span>{isPositive && '+'}{change.toFixed(1)}%</span>
          </div>
          {changeLabel && <span className="text-sm text-muted-foreground">{changeLabel}</span>}
        </div>
      )}
    </div>
  );
}
