/**
 * Header da aplicação
 * Navegação principal com opção de esconder ao rolar
 */

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Store, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoMiPiace from '@/assets/logo-mipiace.png';

const NAV = [
  { path: '/', label: 'Produção', icon: Store },
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
];

export function Header({ hideOnScroll = false }: { hideOnScroll?: boolean }) {
  const location = useLocation();
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    if (!hideOnScroll) return;

    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y < lastY || y < 10);
      setLastY(y);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [hideOnScroll, lastY]);

  return (
    <header className={cn(
      'sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-sm transition-transform duration-300',
      !visible && '-translate-y-full'
    )}>
      <div className="container flex h-16 items-center justify-between">
        <Link to="/"><img src={logoMiPiace} alt="Mi Piace" className="h-10" /></Link>

        <nav className="flex items-center gap-1">
          {NAV.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                location.pathname === path
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}
        </nav>

        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
