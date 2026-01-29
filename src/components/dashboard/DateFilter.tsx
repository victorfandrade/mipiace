/**
 * Filtro de período para o dashboard
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type Period = 'today' | 'week' | 'month' | 'custom';

const PERIODS = [
  { value: 'today' as Period, label: 'Hoje' },
  { value: 'week' as Period, label: 'Semana' },
  { value: 'month' as Period, label: 'Mês' },
];

export function DateFilter({ onPeriodChange }: { onPeriodChange?: (period: Period) => void }) {
  const [period, setPeriod] = useState<Period>('week');
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleChange = (newPeriod: Period) => {
    setPeriod(newPeriod);
    onPeriodChange?.(newPeriod);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center bg-secondary rounded-lg p-1">
        {PERIODS.map((opt) => (
          <Button
            key={opt.value}
            variant="ghost"
            size="sm"
            onClick={() => handleChange(opt.value)}
            className={cn(
              'rounded-md px-3 py-1.5 text-sm font-medium',
              period === opt.value ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'
            )}
          >
            {opt.label}
          </Button>
        ))}
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className={cn('gap-2', period === 'custom' && 'bg-secondary')}>
            <CalendarIcon className="h-4 w-4" />
            {period === 'custom' && date ? format(date, 'dd MMM yyyy', { locale: ptBR }) : 'Personalizado'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => { setDate(newDate); handleChange('custom'); }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}