
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types/mrp';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  { id: '1', username: 'gestor', role: 'gestor', name: 'João Silva - Gestor de Produção' },
  { id: '2', username: 'operador', role: 'operador', name: 'Maria Santos - Operador de Fábrica' },
  { id: '3', username: 'comprador', role: 'comprador', name: 'Carlos Lima - Comprador' },
  { id: '4', username: 'admin', role: 'administrador', name: 'Ana Costa - Administrador do Sistema' }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string): boolean => {
    // Simple mock authentication
    const foundUser = mockUsers.find(u => u.username === username);
    if (foundUser && password === '123') {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
