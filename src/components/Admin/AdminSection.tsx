
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Users, Package, Clock, Edit, Trash2, Plus } from 'lucide-react';

interface SystemParameter {
  id: string;
  name: string;
  value: string;
  description: string;
  category: string;
}

interface SystemUser {
  id: string;
  username: string;
  name: string;
  role: string;
  active: boolean;
  lastLogin: string;
}

const AdminSection = () => {
  const [parameters, setParameters] = useState<SystemParameter[]>([
    { id: '1', name: 'Lead Time Padrão', value: '2', description: 'Lead time padrão em dias', category: 'Produção' },
    { id: '2', name: 'Estoque Segurança BK-2', value: '50', description: 'Estoque de segurança para BK-2', category: 'Estoque' },
    { id: '3', name: 'Lote Mínimo Compra', value: '10', description: 'Quantidade mínima para ordens de compra', category: 'Compras' },
    { id: '4', name: 'Horizonte Planejamento', value: '12', description: 'Períodos para planejamento MRP', category: 'Planejamento' },
  ]);

  const [users, setUsers] = useState<SystemUser[]>([
    { id: '1', username: 'gestor', name: 'João Silva', role: 'gestor', active: true, lastLogin: '2024-06-20' },
    { id: '2', username: 'operador', name: 'Maria Santos', role: 'operador', active: true, lastLogin: '2024-06-19' },
    { id: '3', username: 'comprador', name: 'Carlos Lima', role: 'comprador', active: true, lastLogin: '2024-06-20' },
    { id: '4', username: 'admin', name: 'Ana Costa', role: 'administrador', active: true, lastLogin: '2024-06-20' },
  ]);

  const [showUserDialog, setShowUserDialog] = useState(false);
  const [showParameterDialog, setShowParameterDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<SystemUser | null>(null);
  const [editingParameter, setEditingParameter] = useState<SystemParameter | null>(null);

  const getRoleColor = (role: string) => {
    switch(role) {
      case 'administrador': return 'bg-red-100 text-red-800';
      case 'gestor': return 'bg-blue-100 text-blue-800';
      case 'comprador': return 'bg-green-100 text-green-800';
      case 'operador': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleText = (role: string) => {
    switch(role) {
      case 'administrador': return 'Administrador';
      case 'gestor': return 'Gestor de Produção';
      case 'comprador': return 'Comprador';
      case 'operador': return 'Operador de Fábrica';
      default: return role;
    }
  };

  const saveUser = () => {
    if (editingUser) {
      if (editingUser.id === 'new') {
        const newUser = { ...editingUser, id: Date.now().toString() };
        setUsers(prev => [...prev, newUser]);
      } else {
        setUsers(prev => prev.map(user => user.id === editingUser.id ? editingUser : user));
      }
      setShowUserDialog(false);
      setEditingUser(null);
    }
  };

  const saveParameter = () => {
    if (editingParameter) {
      if (editingParameter.id === 'new') {
        const newParam = { ...editingParameter, id: Date.now().toString() };
        setParameters(prev => [...prev, newParam]);
      } else {
        setParameters(prev => prev.map(param => param.id === editingParameter.id ? editingParameter : param));
      }
      setShowParameterDialog(false);
      setEditingParameter(null);
    }
  };

  const deleteUser = (userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  const deleteParameter = (paramId: string) => {
    setParameters(prev => prev.filter(param => param.id !== paramId));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Administração do Sistema
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Configurar parâmetros, gerenciar usuários e acessar todos os módulos (RF5)
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="users" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="users">Usuários</TabsTrigger>
              <TabsTrigger value="parameters">Parâmetros</TabsTrigger>
              <TabsTrigger value="system">Sistema</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Gestão de Usuários
                    </div>
                    <Button 
                      onClick={() => {
                        setEditingUser({
                          id: 'new',
                          username: '',
                          name: '',
                          role: 'operador',
                          active: true,
                          lastLogin: ''
                        });
                        setShowUserDialog(true);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Novo Usuário
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Usuário</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Perfil</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Último Acesso</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.username}</TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>
                            <Badge className={getRoleColor(user.role)}>
                              {getRoleText(user.role)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={user.active ? "default" : "secondary"}>
                              {user.active ? 'Ativo' : 'Inativo'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('pt-BR') : 'Nunca'}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => {
                                  setEditingUser(user);
                                  setShowUserDialog(true);
                                }}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => deleteUser(user.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="parameters" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      Parâmetros do Sistema
                    </div>
                    <Button 
                      onClick={() => {
                        setEditingParameter({
                          id: 'new',
                          name: '',
                          value: '',
                          description: '',
                          category: 'Produção'
                        });
                        setShowParameterDialog(true);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Novo Parâmetro
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Parâmetro</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {parameters.map((param) => (
                        <TableRow key={param.id}>
                          <TableCell className="font-medium">{param.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{param.value}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{param.category}</Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {param.description}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => {
                                  setEditingParameter(param);
                                  setShowParameterDialog(true);
                                }}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => deleteParameter(param.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="system" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Configurações de Tempo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Horizonte de Planejamento</label>
                      <Input value="12 períodos" readOnly />
                      <p className="text-xs text-muted-foreground">Número de períodos para cálculo MRP</p>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Periodicidade</label>
                      <Input value="Diário" readOnly />
                      <p className="text-xs text-muted-foreground">Unidade de tempo para planejamento</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Informações do Sistema</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Versão:</span>
                      <Badge variant="outline">1.0.0</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Última Atualização:</span>
                      <span className="text-sm text-muted-foreground">20/06/2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Banco de Dados:</span>
                      <Badge variant="default">MySQL</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Usuários Ativos:</span>
                      <Badge variant="secondary">{users.filter(u => u.active).length}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Acesso Total aos Módulos</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Como administrador, você tem acesso completo a todos os módulos do sistema
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      'MPS - Plano Mestre',
                      'MRP - Necessidades',
                      'Ordens de Compra',
                      'Ordens de Fabricação',
                      'Relatórios',
                      'Administração'
                    ].map((module) => (
                      <div key={module} className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span className="text-sm font-medium text-green-800">{module}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* User Dialog */}
      <Dialog open={showUserDialog} onOpenChange={setShowUserDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingUser?.id === 'new' ? 'Novo Usuário' : 'Editar Usuário'}
            </DialogTitle>
          </DialogHeader>
          {editingUser && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Nome de Usuário</label>
                <Input 
                  value={editingUser.username}
                  onChange={(e) => setEditingUser({...editingUser, username: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Nome Completo</label>
                <Input 
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Perfil</label>
                <Select 
                  value={editingUser.role} 
                  onValueChange={(value) => setEditingUser({...editingUser, role: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="administrador">Administrador</SelectItem>
                    <SelectItem value="gestor">Gestor de Produção</SelectItem>
                    <SelectItem value="comprador">Comprador</SelectItem>
                    <SelectItem value="operador">Operador de Fábrica</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUserDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={saveUser}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Parameter Dialog */}
      <Dialog open={showParameterDialog} onOpenChange={setShowParameterDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingParameter?.id === 'new' ? 'Novo Parâmetro' : 'Editar Parâmetro'}
            </DialogTitle>
          </DialogHeader>
          {editingParameter && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Nome</label>
                <Input 
                  value={editingParameter.name}
                  onChange={(e) => setEditingParameter({...editingParameter, name: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Valor</label>
                <Input 
                  value={editingParameter.value}
                  onChange={(e) => setEditingParameter({...editingParameter, value: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Categoria</label>
                <Select 
                  value={editingParameter.category} 
                  onValueChange={(value) => setEditingParameter({...editingParameter, category: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Produção">Produção</SelectItem>
                    <SelectItem value="Estoque">Estoque</SelectItem>
                    <SelectItem value="Compras">Compras</SelectItem>
                    <SelectItem value="Planejamento">Planejamento</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Descrição</label>
                <Input 
                  value={editingParameter.description}
                  onChange={(e) => setEditingParameter({...editingParameter, description: e.target.value})}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowParameterDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={saveParameter}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSection;
