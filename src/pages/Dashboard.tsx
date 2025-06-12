
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Sidebar from '@/components/Layout/Sidebar';
import DashboardCard from '@/components/Dashboard/DashboardCard';
import MPSTable from '@/components/MPS/MPSTable';
import MRPTable from '@/components/MRP/MRPTable';
import PurchaseOrders from '@/components/Orders/PurchaseOrders';
import ProductionOrders from '@/components/Orders/ProductionOrders';
import ReportsSection from '@/components/Reports/ReportsSection';
import AdminSection from '@/components/Admin/AdminSection';
import { 
  Package, 
  ShoppingCart, 
  Wrench, 
  FileText, 
  TrendingUp,
  AlertTriangle,
  Clock,
  CheckCircle
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'mps':
        return <MPSTable />;
      case 'mrp':
        return <MRPTable />;
      case 'purchase-orders':
        return <PurchaseOrders />;
      case 'production-orders':
        return <ProductionOrders />;
      case 'reports':
        return <ReportsSection />;
      case 'admin':
        return <AdminSection />;
      default:
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Dashboard - Sistema MRP</h1>
              <p className="text-muted-foreground">
                Bem-vindo, {user?.name}. Visão geral do sistema de planejamento.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <DashboardCard
                title="Demanda Crítica"
                value="18"
                description="Unidades BK-2 (Período 11)"
                icon={AlertTriangle}
                trend={{ value: "Próximo período", isPositive: false }}
              />
              
              <DashboardCard
                title="Ordens Pendentes"
                value="4"
                description="3 compra + 1 fabricação"
                icon={Clock}
                trend={{ value: "2 aprovadas", isPositive: true }}
              />
              
              <DashboardCard
                title="Estoque Total"
                value="185"
                description="Unidades em estoque"
                icon={Package}
                trend={{ value: "Estável", isPositive: true }}
              />
              
              <DashboardCard
                title="Eficiência"
                value="94%"
                description="Entregas no prazo"
                icon={TrendingUp}
                trend={{ value: "+2% vs mês anterior", isPositive: true }}
              />
            </div>

            {/* Quick Actions based on user role */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(user?.role === 'gestor' || user?.role === 'administrador') && (
                <div 
                  className="p-6 bg-card border border-border rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setActiveSection('mps')}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-semibold">Plano Mestre (MPS)</h3>
                      <p className="text-sm text-muted-foreground">Definir demanda e cronograma</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Clique para acessar o módulo de planejamento mestre
                  </div>
                </div>
              )}

              {(user?.role === 'comprador' || user?.role === 'gestor' || user?.role === 'administrador') && (
                <div 
                  className="p-6 bg-card border border-border rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setActiveSection('purchase-orders')}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <ShoppingCart className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-semibold">Ordens de Compra</h3>
                      <p className="text-sm text-muted-foreground">Gerenciar aquisições</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    3 ordens pendentes de aprovação/envio
                  </div>
                </div>
              )}

              {(user?.role === 'operador' || user?.role === 'gestor' || user?.role === 'administrador') && (
                <div 
                  className="p-6 bg-card border border-border rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setActiveSection('production-orders')}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Wrench className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-semibold">Ordens de Fabricação</h3>
                      <p className="text-sm text-muted-foreground">Controlar produção</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    1 ordem em andamento, 1 planejada
                  </div>
                </div>
              )}
            </div>

            {/* Recent Activity */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Atividades Recentes
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">Demanda atualizada para BK-2</div>
                    <div className="text-xs text-muted-foreground">18 unidades no período 11 - há 2 horas</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">Ordem de compra PO-003 aprovada</div>
                    <div className="text-xs text-muted-foreground">Aro RM-1 - há 3 horas</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">Operação de solda concluída</div>
                    <div className="text-xs text-muted-foreground">Quadro FR-2 - há 4 horas</div>
                  </div>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-800 mb-2">Status do Sistema</h3>
              <p className="text-sm text-blue-700 mb-3">
                Sistema operando normalmente. Próxima análise MRP programada para amanhã às 08:00.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="font-medium text-blue-800">Banco de Dados</div>
                  <div className="text-blue-600">✓ Online</div>
                </div>
                <div>
                  <div className="font-medium text-blue-800">Backup</div>
                  <div className="text-blue-600">✓ Atualizado</div>
                </div>
                <div>
                  <div className="font-medium text-blue-800">Usuários Ativos</div>
                  <div className="text-blue-600">4 conectados</div>
                </div>
                <div>
                  <div className="font-medium text-blue-800">Última Sincronização</div>
                  <div className="text-blue-600">há 15 min</div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 p-6 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
