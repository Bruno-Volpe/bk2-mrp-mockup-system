
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ProductionOrder, Operation } from '@/types/mrp';
import { Wrench, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const ProductionOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<ProductionOrder[]>([
    {
      id: 'PF-001',
      item: 'Quadro FR-2',
      quantity: 8,
      startDate: '2024-06-13',
      endDate: '2024-06-20',
      status: 'in_progress',
      operations: [
        { id: 'OP-001', name: 'Corte', status: 'completed', startDate: '2024-06-13', endDate: '2024-06-14', duration: 1 },
        { id: 'OP-002', name: 'Solda', status: 'in_progress', startDate: '2024-06-14', endDate: '2024-06-16', duration: 2 },
        { id: 'OP-003', name: 'Pintura', status: 'pending', startDate: '2024-06-16', endDate: '2024-06-18', duration: 2 },
        { id: 'OP-004', name: 'Cura', status: 'pending', startDate: '2024-06-18', endDate: '2024-06-19', duration: 1 },
        { id: 'OP-005', name: 'Montagem', status: 'pending', startDate: '2024-06-19', endDate: '2024-06-20', duration: 1 },
        { id: 'OP-006', name: 'Teste', status: 'pending', startDate: '2024-06-20', endDate: '2024-06-20', duration: 0.5 }
      ]
    },
    {
      id: 'PF-002',
      item: 'Roda WH-1',
      quantity: 16,
      startDate: '2024-06-18',
      endDate: '2024-06-20',
      status: 'planned',
      operations: [
        { id: 'OP-007', name: 'Montagem do Aro', status: 'pending', startDate: '2024-06-18', endDate: '2024-06-19', duration: 1 },
        { id: 'OP-008', name: 'Instalação dos Raios', status: 'pending', startDate: '2024-06-19', endDate: '2024-06-19', duration: 0.5 },
        { id: 'OP-009', name: 'Balanceamento', status: 'pending', startDate: '2024-06-19', endDate: '2024-06-20', duration: 1 },
        { id: 'OP-010', name: 'Teste Final', status: 'pending', startDate: '2024-06-20', endDate: '2024-06-20', duration: 0.5 }
      ]
    }
  ]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'planned': return 'bg-gray-100 text-gray-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOperationStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'planned': return 'Planejada';
      case 'in_progress': return 'Em Andamento';
      case 'completed': return 'Concluída';
      default: return status;
    }
  };

  const getOperationStatusText = (status: string) => {
    switch(status) {
      case 'pending': return 'Pendente';
      case 'in_progress': return 'Em Andamento';
      case 'completed': return 'Concluída';
      default: return status;
    }
  };

  const calculateProgress = (operations: Operation[]) => {
    const completed = operations.filter(op => op.status === 'completed').length;
    return (completed / operations.length) * 100;
  };

  const updateOperationStatus = (orderId: string, operationId: string, newStatus: 'pending' | 'in_progress' | 'completed') => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const updatedOperations = order.operations.map(op => 
          op.id === operationId ? { ...op, status: newStatus } : op
        );
        
        // Update order status based on operations
        let orderStatus: 'planned' | 'in_progress' | 'completed' = 'planned';
        const completedOps = updatedOperations.filter(op => op.status === 'completed').length;
        const inProgressOps = updatedOperations.filter(op => op.status === 'in_progress').length;
        
        if (completedOps === updatedOperations.length) {
          orderStatus = 'completed';
        } else if (completedOps > 0 || inProgressOps > 0) {
          orderStatus = 'in_progress';
        }
        
        return { ...order, operations: updatedOperations, status: orderStatus };
      }
      return order;
    }));
  };

  const canUpdateStatus = user?.role === 'operador' || user?.role === 'gestor' || user?.role === 'administrador';

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            Ordens de Fabricação
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Gerar ordens para componentes internos, exibir datas de operações e atualizar status (RF4)
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{order.id} - {order.item}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Quantidade: {order.quantity} | {new Date(order.startDate).toLocaleDateString('pt-BR')} - {new Date(order.endDate).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusText(order.status)}
                      </Badge>
                      <div className="mt-2">
                        <Progress value={calculateProgress(order.operations)} className="w-32" />
                        <p className="text-xs text-muted-foreground mt-1">
                          {calculateProgress(order.operations).toFixed(0)}% concluído
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Operação</TableHead>
                        <TableHead>Data Início</TableHead>
                        <TableHead>Data Fim</TableHead>
                        <TableHead>Duração</TableHead>
                        <TableHead>Status</TableHead>
                        {canUpdateStatus && <TableHead>Ações</TableHead>}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {order.operations.map((operation) => (
                        <TableRow key={operation.id}>
                          <TableCell className="font-medium">{operation.name}</TableCell>
                          <TableCell>{new Date(operation.startDate).toLocaleDateString('pt-BR')}</TableCell>
                          <TableCell>{new Date(operation.endDate).toLocaleDateString('pt-BR')}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {operation.duration} dia{operation.duration !== 1 ? 's' : ''}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getOperationStatusColor(operation.status)}>
                              {getOperationStatusText(operation.status)}
                            </Badge>
                          </TableCell>
                          {canUpdateStatus && (
                            <TableCell>
                              <div className="flex gap-1">
                                {operation.status === 'pending' && (
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => updateOperationStatus(order.id, operation.id, 'in_progress')}
                                  >
                                    Iniciar
                                  </Button>
                                )}
                                {operation.status === 'in_progress' && (
                                  <Button 
                                    size="sm" 
                                    variant="default"
                                    onClick={() => updateOperationStatus(order.id, operation.id, 'completed')}
                                  >
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Concluir
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">Exemplo de Processo de Fabricação</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• <strong>Quadro FR-2:</strong> 8 unidades, fabricação de 13/06 a 20/06</li>
              <li>• <strong>Operações:</strong> Corte → Solda → Pintura → Cura → Montagem → Teste</li>
              <li>• <strong>Controle:</strong> Operador atualiza status de cada operação</li>
              <li>• <strong>Progresso:</strong> Visualização em tempo real do andamento</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductionOrders;
