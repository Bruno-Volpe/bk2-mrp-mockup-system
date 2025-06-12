
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MPSEntry } from '@/types/mrp';
import { Plus, Save } from 'lucide-react';

const MPSTable = () => {
  const [mpsData, setMpsData] = useState<MPSEntry[]>([
    { period: 1, demand: 0, production: 0, inventory: 50, date: '2024-06-13' },
    { period: 2, demand: 0, production: 0, inventory: 50, date: '2024-06-14' },
    { period: 3, demand: 0, production: 0, inventory: 50, date: '2024-06-15' },
    { period: 4, demand: 0, production: 0, inventory: 50, date: '2024-06-16' },
    { period: 5, demand: 0, production: 0, inventory: 50, date: '2024-06-17' },
    { period: 6, demand: 0, production: 0, inventory: 50, date: '2024-06-18' },
    { period: 7, demand: 0, production: 0, inventory: 50, date: '2024-06-19' },
    { period: 8, demand: 0, production: 0, inventory: 50, date: '2024-06-20' },
    { period: 9, demand: 0, production: 0, inventory: 50, date: '2024-06-21' },
    { period: 10, demand: 0, production: 0, inventory: 50, date: '2024-06-22' },
    { period: 11, demand: 18, production: 18, inventory: 50, date: '2024-06-23' },
    { period: 12, demand: 0, production: 0, inventory: 50, date: '2024-06-24' },
  ]);

  const [newDemand, setNewDemand] = useState({ period: 11, demand: 18 });

  const updateDemand = (period: number, demand: number) => {
    setMpsData(prev => prev.map(entry => 
      entry.period === period 
        ? { ...entry, demand, production: demand, inventory: entry.inventory - demand + entry.production }
        : entry
    ));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Plano Mestre de Produção - Bicicleta BK-2
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Inserir demanda prevista e visualizar cronograma de produção (RF1)
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6 p-4 bg-muted rounded-lg">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Período</label>
              <Input 
                type="number" 
                value={newDemand.period}
                onChange={(e) => setNewDemand({...newDemand, period: parseInt(e.target.value)})}
                className="w-20"
                min="1"
                max="12"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Demanda (unidades)</label>
              <Input 
                type="number" 
                value={newDemand.demand}
                onChange={(e) => setNewDemand({...newDemand, demand: parseInt(e.target.value)})}
                className="w-32"
                min="0"
                placeholder="Ex: 18"
              />
            </div>
            <div className="flex items-end">
              <Button 
                onClick={() => updateDemand(newDemand.period, newDemand.demand)}
                className="gap-2"
              >
                <Save className="h-4 w-4" />
                Atualizar Demanda
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Período</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Demanda Bruta</TableHead>
                  <TableHead>Produção Planejada</TableHead>
                  <TableHead>Estoque Projetado</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mpsData.map((entry) => (
                  <TableRow key={entry.period}>
                    <TableCell className="font-medium">{entry.period}</TableCell>
                    <TableCell>{new Date(entry.date).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>
                      {entry.demand > 0 && (
                        <Badge variant="destructive">{entry.demand}</Badge>
                      )}
                      {entry.demand === 0 && <span className="text-muted-foreground">0</span>}
                    </TableCell>
                    <TableCell>
                      {entry.production > 0 && (
                        <Badge variant="default">{entry.production}</Badge>
                      )}
                      {entry.production === 0 && <span className="text-muted-foreground">0</span>}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{entry.inventory}</Badge>
                    </TableCell>
                    <TableCell>
                      {entry.demand > 0 ? (
                        <Badge variant="secondary">Produção Necessária</Badge>
                      ) : (
                        <Badge variant="outline">Normal</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Exemplo:</strong> Demanda de 18 unidades de BK-2 no período 11 (23/06/2024).
              O sistema calcula automaticamente a produção necessária e o impacto no estoque.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MPSTable;
