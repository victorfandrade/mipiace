/**
 * Card de KPI (Indicador Chave de Performance)
 * Exibe uma métrica importante com variação percentual
 * Layout compacto otimizado para mobile
 */

import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  className?: string;
  valuePrefix?: string;
  valueSuffix?: string;
}

export function KPICard({
  title,
  value,
  change,
  changeLabel,
  icon,
  className,
  valuePrefix = '',
  valueSuffix = '',
}: KPICardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <div className={cn('kpi-card animate-fade-in p-4 sm:p-6', className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-1 sm:space-y-2">
          <p className="text-xs sm:text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl sm:text-3xl font-semibold tracking-tight">
            {valuePrefix}
            {typeof value === 'number' ? value.toLocaleString('pt-BR') : value}
            {valueSuffix}
          </p>
        </div>
        {icon && (
          <div className="p-1.5 sm:p-2 rounded-lg bg-secondary flex-shrink-0">
            {icon}
          </div>
        )}
      </div>
      
      {/* Indicador de variação */}
      {change !== undefined && (
        <div className="mt-3 sm:mt-4 flex items-center gap-1 sm:gap-2">
          <div
            className={cn(
              'flex items-center gap-1 text-xs sm:text-sm font-medium',
              isPositive && 'text-status-ready',
              isNegative && 'text-destructive',
              !isPositive && !isNegative && 'text-muted-foreground'
            )}
          >
            {isPositive && <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />}
            {isNegative && <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4" />}
            <span>
              {isPositive && '+'}
              {change.toFixed(1)}%
            </span>
          </div>
          {changeLabel && (
            <span className="text-xs text-muted-foreground hidden sm:inline">{changeLabel}</span>
          )}
        </div>
      )}
    </div>
  );
}
