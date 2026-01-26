import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type Period = 'today' | 'week' | 'month' | 'custom';

interface DateFilterProps {
  onPeriodChange?: (period: Period) => void;
  onExport?: () => void;
}

export function DateFilter({ onPeriodChange, onExport }: DateFilterProps) {
  const [period, setPeriod] = useState<Period>('week');
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handlePeriodChange = (newPeriod: Period) => {
    setPeriod(newPeriod);
    onPeriodChange?.(newPeriod);
  };

  const periods: { value: Period; label: string }[] = [
    { value: 'today', label: 'Hoje' },
    { value: 'week', label: 'Semana' },
    { value: 'month', label: 'Mês' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Period Buttons */}
      <div className="flex items-center bg-secondary rounded-lg p-1">
        {periods.map((p) => (
          <Button
            key={p.value}
            variant="ghost"
            size="sm"
            onClick={() => handlePeriodChange(p.value)}
            className={cn(
              'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
              period === p.value
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {p.label}
          </Button>
        ))}
      </div>

      {/* Custom Date Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              'gap-2',
              period === 'custom' && 'bg-secondary'
            )}
          >
            <CalendarIcon className="h-4 w-4" />
            {period === 'custom' && date
              ? format(date, 'dd MMM yyyy', { locale: ptBR })
              : 'Personalizado'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => {
              setDate(newDate);
              handlePeriodChange('custom');
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>

    </div>
  );
}
