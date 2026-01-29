/**
 * Header principal da aplicação
 * Contém logo, navegação e esconde ao rolar (opcional)
 */

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Store, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoMiPiace from '@/assets/logo-mipiace.png';

const NAV_ITEMS = [
  { path: '/', label: 'Produção', icon: Store },
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
];

interface HeaderProps {
  hideOnScroll?: boolean;
}

export function Header({ hideOnScroll = false }: HeaderProps) {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (!hideOnScroll) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Mostra header ao rolar para cima ou no topo
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hideOnScroll, lastScrollY]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-sm transition-transform duration-300',
        !isVisible && '-translate-y-full'
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoMiPiace} alt="Mi Piace Gelato" className="h-10 object-contain" />
        </Link>

        <nav className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
