
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { PurchaseOrder } from '@/types/mrp';
import { ShoppingCart, Mail, Edit, Check, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const PurchaseOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<PurchaseOrder[]>([
    {
      id: 'PO-001',
      item: 'Selim Sa-1',
      quantity: 13,
      supplier: 'Fornecedor A',
      orderDate: '2024-06-20',
      deliveryDate: '2024-06-23',
      status: 'pending',
      unitPrice: 45.90
    },
    {
      id: 'PO-002',
      item: 'Pneu TR-1',
      quantity: 8,
      supplier: 'Fornecedor B',
      orderDate: '2024-06-21',
      deliveryDate: '2024-06-24',
      status: 'sent',
      unitPrice: 89.50
    },
    {
      id: 'PO-003',
      item: 'Aro RM-1',
      quantity: 11,
      supplier: 'Fornecedor C',
      orderDate: '2024-06-19',
      deliveryDate: '2024-06-22',
      status: 'approved',
      unitPrice: 125.00
    }
  ]);

  const [editingOrder, setEditingOrder] = useState<PurchaseOrder | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'sent': return 'bg-purple-100 text-purple-800';
      case 'received': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'pending': return 'Pendente';
      case 'approved': return 'Aprovada';
      case 'sent': return 'Enviada';
      case 'received': return 'Recebida';
      default: return status;
    }
  };

  const approveOrder = (orderId: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: 'approved' as const }
        : order
    ));
  };

  const sendEmailNotification = (order: PurchaseOrder) => {
    // Simulate sending email
    alert(`E-mail enviado para ${order.supplier} sobre a ordem ${order.id}`);
    setOrders(prev => prev.map(o => 
      o.id === order.id 
        ? { ...o, status: 'sent' as const }
        : o
    ));
  };

  const updateOrder = () => {
    if (editingOrder) {
      setOrders(prev => prev.map(order => 
        order.id === editingOrder.id ? editingOrder : order
      ));
      setShowEditDialog(false);
      setEditingOrder(null);
    }
  };

  const canEditOrders = user?.role === 'comprador' || user?.role === 'gestor' || user?.role === 'administrador';
  const canApproveOrders = user?.role === 'gestor' || user?.role === 'administrador';

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Ordens de Compra
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Gerar ordens automáticas, permitir edição manual e enviar notificações (RF3)
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ordem</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Quantidade</TableHead>
                  <TableHead>Fornecedor</TableHead>
                  <TableHead>Data Pedido</TableHead>
                  <TableHead>Data Entrega</TableHead>
                  <TableHead>Valor Unit.</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.item}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{order.quantity}</Badge>
                    </TableCell>
                    <TableCell>{order.supplier}</TableCell>
                    <TableCell>{new Date(order.orderDate).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>{new Date(order.deliveryDate).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>R$ {order.unitPrice.toFixed(2)}</TableCell>
                    <TableCell>R$ {(order.quantity * order.unitPrice).toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusText(order.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {canEditOrders && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setEditingOrder(order);
                              setShowEditDialog(true);
                            }}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                        )}
                        {canApproveOrders && order.status === 'pending' && (
                          <Button 
                            size="sm" 
                            variant="default"
                            onClick={() => approveOrder(order.id)}
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                        )}
                        {(canEditOrders || canApproveOrders) && order.status === 'approved' && (
                          <Button 
                            size="sm" 
                            variant="secondary"
                            onClick={() => sendEmailNotification(order)}
                          >
                            <Mail className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Exemplo de Processo</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• <strong>Selim Sa-1:</strong> 13 unidades necessárias, entrega dia 23/06 (Lead time: 3 dias)</li>
              <li>• <strong>Sistema automático:</strong> Gera ordens baseadas no MRP</li>
              <li>• <strong>Edição manual:</strong> Comprador pode ajustar quantidades e datas</li>
              <li>• <strong>Aprovação:</strong> Gestor aprova antes do envio</li>
              <li>• <strong>Notificação:</strong> E-mail automático para fornecedor</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Ordem de Compra</DialogTitle>
          </DialogHeader>
          {editingOrder && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Quantidade</label>
                <Input 
                  type="number"
                  value={editingOrder.quantity}
                  onChange={(e) => setEditingOrder({
                    ...editingOrder,
                    quantity: parseInt(e.target.value)
                  })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Data de Entrega</label>
                <Input 
                  type="date"
                  value={editingOrder.deliveryDate}
                  onChange={(e) => setEditingOrder({
                    ...editingOrder,
                    deliveryDate: e.target.value
                  })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Valor Unitário</label>
                <Input 
                  type="number"
                  step="0.01"
                  value={editingOrder.unitPrice}
                  onChange={(e) => setEditingOrder({
                    ...editingOrder,
                    unitPrice: parseFloat(e.target.value)
                  })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={updateOrder}>
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PurchaseOrders;
