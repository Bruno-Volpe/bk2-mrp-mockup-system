
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  Wrench, 
  FileText, 
  Settings, 
  LogOut,
  Home
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  const { user, logout } = useAuth();

  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
    ];

    switch (user?.role) {
      case 'gestor':
        return [
          ...baseItems,
          { id: 'mps', label: 'Plano Mestre (MPS)', icon: BarChart3 },
          { id: 'mrp', label: 'Necessidades (MRP)', icon: Package },
          { id: 'purchase-orders', label: 'Ordens de Compra', icon: ShoppingCart },
          { id: 'production-orders', label: 'Ordens de Fabricação', icon: Wrench },
          { id: 'reports', label: 'Relatórios', icon: FileText },
        ];
      case 'operador':
        return [
          ...baseItems,
          { id: 'production-orders', label: 'Ordens de Fabricação', icon: Wrench },
        ];
      case 'comprador':
        return [
          ...baseItems,
          { id: 'purchase-orders', label: 'Ordens de Compra', icon: ShoppingCart },
        ];
      case 'administrador':
        return [
          ...baseItems,
          { id: 'mps', label: 'Plano Mestre (MPS)', icon: BarChart3 },
          { id: 'mrp', label: 'Necessidades (MRP)', icon: Package },
          { id: 'purchase-orders', label: 'Ordens de Compra', icon: ShoppingCart },
          { id: 'production-orders', label: 'Ordens de Fabricação', icon: Wrench },
          { id: 'reports', label: 'Relatórios', icon: FileText },
          { id: 'admin', label: 'Administração', icon: Settings },
        ];
      default:
        return baseItems;
    }
  };

  return (
    <div className="w-64 bg-card border-r border-border h-full flex flex-col">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-bold text-primary">Sistema MRP</h2>
        <p className="text-sm text-muted-foreground mt-1">Empresa Y - Bicicletas BK-2</p>
      </div>
      
      <div className="p-4 border-b border-border">
        <div className="text-sm text-muted-foreground">Logado como:</div>
        <div className="font-medium text-foreground">{user?.name}</div>
        <div className="text-xs text-muted-foreground capitalize">{user?.role}</div>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {getMenuItems().map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  activeSection === item.id && "bg-primary text-primary-foreground"
                )}
                onClick={() => onSectionChange(item.id)}
              >
                <Icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-border">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
