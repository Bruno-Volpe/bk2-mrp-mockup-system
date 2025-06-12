
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { FileText, Download, Printer, FileSpreadsheet } from 'lucide-react';

const ReportsSection = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('12-days');

  // Mock data for charts
  const mpsData = [
    { period: 1, demand: 0, production: 0, inventory: 50 },
    { period: 2, demand: 0, production: 0, inventory: 50 },
    { period: 3, demand: 0, production: 0, inventory: 50 },
    { period: 4, demand: 0, production: 0, inventory: 50 },
    { period: 5, demand: 0, production: 0, inventory: 50 },
    { period: 6, demand: 0, production: 0, inventory: 50 },
    { period: 7, demand: 0, production: 0, inventory: 50 },
    { period: 8, demand: 0, production: 0, inventory: 50 },
    { period: 9, demand: 0, production: 0, inventory: 50 },
    { period: 10, demand: 0, production: 0, inventory: 50 },
    { period: 11, demand: 18, production: 18, inventory: 50 },
    { period: 12, demand: 0, production: 0, inventory: 50 },
  ];

  const inventoryData = [
    { name: 'BK-2', value: 50, color: '#4682B4' },
    { name: 'FR-2', value: 10, color: '#87CEEB' },
    { name: 'Sa-1', value: 5, color: '#B0C4DE' },
    { name: 'WH-1', value: 20, color: '#ADD8E6' },
    { name: 'TU-1', value: 100, color: '#E0F6FF' },
  ];

  const ordersData = [
    { type: 'Compra', pending: 1, approved: 1, sent: 1, completed: 0 },
    { type: 'Fabricação', pending: 0, approved: 1, sent: 0, completed: 1 },
  ];

  const exportToPDF = (reportType: string) => {
    alert(`Exportando relatório ${reportType} para PDF...`);
  };

  const exportToExcel = (reportType: string) => {
    alert(`Exportando relatório ${reportType} para Excel...`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Relatórios e Análises
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Printer className="h-4 w-4 mr-2" />
                Imprimir
              </Button>
            </div>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Exibir tabelas/gráficos de MPS, MRP, ordens e estoques com exportação (RF6)
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="mps" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="mps">MPS</TabsTrigger>
              <TabsTrigger value="inventory">Estoques</TabsTrigger>
              <TabsTrigger value="orders">Ordens</TabsTrigger>
              <TabsTrigger value="summary">Resumo</TabsTrigger>
            </TabsList>

            <TabsContent value="mps" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Plano Mestre de Produção
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => exportToPDF('MPS')}>
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => exportToExcel('MPS')}>
                        <FileSpreadsheet className="h-4 w-4 mr-2" />
                        Excel
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={mpsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="period" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value, name) => [
                            value, 
                            name === 'demand' ? 'Demanda' : 
                            name === 'production' ? 'Produção' : 'Estoque'
                          ]}
                        />
                        <Bar dataKey="demand" fill="#ef4444" name="demand" />
                        <Bar dataKey="production" fill="#3b82f6" name="production" />
                        <Bar dataKey="inventory" fill="#10b981" name="inventory" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Período</TableHead>
                        <TableHead>Demanda</TableHead>
                        <TableHead>Produção</TableHead>
                        <TableHead>Estoque</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mpsData.slice(10, 12).map((entry) => (
                        <TableRow key={entry.period}>
                          <TableCell>{entry.period}</TableCell>
                          <TableCell>
                            {entry.demand > 0 && <Badge variant="destructive">{entry.demand}</Badge>}
                            {entry.demand === 0 && <span className="text-muted-foreground">0</span>}
                          </TableCell>
                          <TableCell>
                            {entry.production > 0 && <Badge variant="default">{entry.production}</Badge>}
                            {entry.production === 0 && <span className="text-muted-foreground">0</span>}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{entry.inventory}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inventory" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Níveis de Estoque
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => exportToPDF('Estoque')}>
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => exportToExcel('Estoque')}>
                        <FileSpreadsheet className="h-4 w-4 mr-2" />
                        Excel
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={inventoryData}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {inventoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="space-y-3">
                      {inventoryData.map((item) => (
                        <div key={item.name} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-4 h-4 rounded-full" 
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="font-medium">{item.name}</span>
                          </div>
                          <Badge variant="outline">{item.value} unidades</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Status das Ordens
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => exportToPDF('Ordens')}>
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => exportToExcel('Ordens')}>
                        <FileSpreadsheet className="h-4 w-4 mr-2" />
                        Excel
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={ordersData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="type" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="pending" fill="#f59e0b" name="Pendente" />
                        <Bar dataKey="approved" fill="#3b82f6" name="Aprovada" />
                        <Bar dataKey="sent" fill="#8b5cf6" name="Enviada" />
                        <Bar dataKey="completed" fill="#10b981" name="Concluída" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Ordens de Compra</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Pendentes:</span>
                            <Badge variant="secondary">1</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Aprovadas:</span>
                            <Badge variant="default">1</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Enviadas:</span>
                            <Badge variant="outline">1</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Ordens de Fabricação</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Em Andamento:</span>
                            <Badge variant="default">1</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Planejadas:</span>
                            <Badge variant="secondary">1</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Concluídas:</span>
                            <Badge variant="outline">0</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="summary" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Resumo Executivo
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => exportToPDF('Resumo')}>
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => exportToExcel('Resumo')}>
                        <FileSpreadsheet className="h-4 w-4 mr-2" />
                        Excel
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-blue-600">18</div>
                        <div className="text-sm text-muted-foreground">Demanda Total (Período 11)</div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-green-600">185</div>
                        <div className="text-sm text-muted-foreground">Estoque Total</div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-purple-600">3</div>
                        <div className="text-sm text-muted-foreground">Ordens de Compra</div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-orange-600">2</div>
                        <div className="text-sm text-muted-foreground">Ordens de Fabricação</div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Análise do Período</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• <strong>Demanda Crítica:</strong> 18 unidades de BK-2 no período 11</li>
                      <li>• <strong>Componentes Críticos:</strong> Sa-1 (necessário comprar 13), TR-1 (necessário comprar 8)</li>
                      <li>• <strong>Fabricação:</strong> FR-2 em andamento (8 unidades), WH-1 planejada (16 unidades)</li>
                      <li>• <strong>Lead Times:</strong> Respeitados para entrega no prazo</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsSection;
