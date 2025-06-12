
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/context/AuthContext';
import { Lock, User, AlertCircle } from 'lucide-react';

const LoginForm = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = login(username, password);
      if (!success) {
        setError('Usuário ou senha inválidos');
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const demoUsers = [
    { username: 'gestor', password: '123', role: 'Gestor de Produção' },
    { username: 'operador', password: '123', role: 'Operador de Fábrica' },
    { username: 'comprador', password: '123', role: 'Comprador' },
    { username: 'admin', password: '123', role: 'Administrador do Sistema' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">Sistema MRP</h1>
          <p className="text-muted-foreground mt-2">Empresa Y - Bicicletas BK-2</p>
          <p className="text-sm text-muted-foreground">Planejamento de Necessidades de Materiais</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Acesso ao Sistema
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Restringe acesso conforme perfil (gestor, operador, comprador, administrador)
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Usuário</label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Digite seu usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10"
                    required
                  />
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Senha</label>
                <div className="relative">
                  <Input
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Entrando...' : 'Entrar no Sistema'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Usuários Demo</CardTitle>
            <p className="text-sm text-muted-foreground">
              Use as credenciais abaixo para testar diferentes níveis de acesso
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {demoUsers.map((user) => (
                <div 
                  key={user.username}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors"
                  onClick={() => {
                    setUsername(user.username);
                    setPassword(user.password);
                  }}
                >
                  <div>
                    <div className="font-medium">{user.username}</div>
                    <div className="text-sm text-muted-foreground">{user.role}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">Senha: {user.password}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <p>Sistema desenvolvido conforme especificações RF1-RF6</p>
          <p>Interface web responsiva com HTTPS e banco MySQL</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
