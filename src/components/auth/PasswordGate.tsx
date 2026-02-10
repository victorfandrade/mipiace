/**
 * Componente de bloqueio por senha
 * Exibe um formulário de senha antes de liberar o conteúdo protegido
 * 
 * NOTA: Esta é uma proteção simples, não substitui autenticação real.
 * Para segurança de produção, use Lovable Cloud com autenticação.
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Eye, EyeOff } from 'lucide-react';
import logoMiPiace from '@/assets/logo-mipiace.png';

// Senha de acesso (em produção, use autenticação real via Lovable Cloud)
const ACCESS_PASSWORD = 'gabriel0419';
const STORAGE_KEY = 'mipiace_dashboard_access';

interface PasswordGateProps {
  children: React.ReactNode;
}

export function PasswordGate({ children }: PasswordGateProps) {
  // Verifica se já está autenticado na sessão atual
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem(STORAGE_KEY) === 'true';
  });
  
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === ACCESS_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Senha incorreta');
      setPassword('');
    }
  };

  // Se já está autenticado, mostra o conteúdo
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Tela de login
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="bg-card rounded-2xl border border-border p-8 shadow-soft">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img 
              src={logoMiPiace} 
              alt="Mi Piace Gelato" 
              className="h-16 object-contain" 
            />
          </div>

          {/* Título */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-xl font-semibold text-foreground">
              Área Restrita
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Digite a senha para acessar o dashboard
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite a senha"
                  className="pr-10"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Mensagem de erro */}
            {error && (
              <p className="text-sm text-destructive text-center">
                {error}
              </p>
            )}

            <Button type="submit" className="w-full">
              Acessar Dashboard
            </Button>
          </form>
        </div>

        {/* Nota de segurança */}
        <p className="text-xs text-muted-foreground text-center mt-4">
          Acesso restrito a funcionários autorizados
        </p>
      </div>
    </div>
  );
}
