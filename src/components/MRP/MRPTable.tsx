
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MRPItem } from '@/types/mrp';
import { Calculator, Download } from 'lucide-react';

const MRPTable = () => {
  const mrpData: MRPItem[] = [
    // Nível 0
    { id: 'BK-2', name: 'Bicicleta BK-2', level: 0, grossRequirement: 18, scheduledReceipts: 0, projectedInventory: 50, netRequirement: 0, plannedOrderReleases: 18, leadTime: 0 },
    
    // Nível 1
    { id: 'FR-2', name: 'Quadro FR-2', level: 1, grossRequirement: 18, scheduledReceipts: 0, projectedInventory: 10, netRequirement: 8, plannedOrderReleases: 8, leadTime: 2 },
    { id: 'Sa-1', name: 'Selim Sa-1', level: 1, grossRequirement: 18, scheduledReceipts: 0, projectedInventory: 5, netRequirement: 13, plannedOrderReleases: 13, leadTime: 3 },
    { id: 'WH-1', name: 'Roda WH-1', level: 1, grossRequirement: 36, scheduledReceipts: 0, projectedInventory: 20, netRequirement: 16, plannedOrderReleases: 16, leadTime: 1 },
    
    // Nível 2
    { id: 'TU-1', name: 'Tubo TU-1', level: 2, grossRequirement: 48, scheduledReceipts: 0, projectedInventory: 100, netRequirement: 0, plannedOrderReleases: 0, leadTime: 1 },
    { id: 'TR-1', name: 'Pneu TR-1', level: 2, grossRequirement: 16, scheduledReceipts: 0, projectedInventory: 8, netRequirement: 8, plannedOrderReleases: 8, leadTime: 2 },
    { id: 'RM-1', name: 'Aro RM-1', level: 2, grossRequirement: 16, scheduledReceipts: 0, projectedInventory: 5, netRequirement: 11, plannedOrderReleases: 11, leadTime: 1 },
    { id: 'HB-1', name: 'Cubo HB-1', level: 2, grossRequirement: 16, scheduledReceipts: 0, projectedInventory: 12, netRequirement: 4, plannedOrderReleases: 4, leadTime: 1 },
    { id: 'SP-1', name: 'Raio SP-1', level: 2, grossRequirement: 512, scheduledReceipts: 0, projectedInventory: 200, netRequirement: 312, plannedOrderReleases: 312, leadTime: 1 },
  ];

  const getLevelColor = (level: number) => {
    switch(level) {
      case 0: return 'bg-red-100 text-red-800';
      case 1: return 'bg-blue-100 text-blue-800';
      case 2: return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Planejamento de Necessidades de Materiais (MRP)
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Calcular necessidades brutas/líquidas e plano de liberação de ordens (RF2)
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Nível</TableHead>
                  <TableHead>Necessidade Bruta</TableHead>
                  <TableHead>Recebimentos Programados</TableHead>
                  <TableHead>Estoque Projetado</TableHead>
                  <TableHead>Necessidade Líquida</TableHead>
                  <TableHead>Liberação de Ordens</TableHead>
                  <TableHead>Lead Time (dias)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mrpData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{item.id}</span>
                        <span className="text-sm text-muted-foreground">{item.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getLevelColor(item.level)}>
                        Nível {item.level}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="destructive">{item.grossRequirement}</Badge>
                    </TableCell>
                    <TableCell>
                      {item.scheduledReceipts > 0 ? (
                        <Badge variant="secondary">{item.scheduledReceipts}</Badge>
                      ) : (
                        <span className="text-muted-foreground">0</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.projectedInventory}</Badge>
                    </TableCell>
                    <TableCell>
                      {item.netRequirement > 0 ? (
                        <Badge variant="destructive">{item.netRequirement}</Badge>
                      ) : (
                        <span className="text-muted-foreground">0</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {item.plannedOrderReleases > 0 ? (
                        <Badge variant="default">{item.plannedOrderReleases}</Badge>
                      ) : (
                        <span className="text-muted-foreground">0</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.leadTime}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-red-50 rounded-lg">
              <h4 className="font-medium text-red-800 mb-2">Estrutura do Produto BK-2</h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Nível 0: BK-2 (bicicleta)</li>
                <li>• Nível 1: FR-2, Sa-1, WH-1</li>
                <li>• Nível 2: TU-1, TR-1, RM-1, HB-1, SP-1</li>
              </ul>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Cálculo MRP</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Necessidade Líquida = Bruta - Estoque</li>
                <li>• Ordens consideram Lead Time</li>
                <li>• Explosão por níveis hierárquicos</li>
              </ul>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">Exemplo de Cálculo</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• 18 BK-2 → 18 Quadros FR-2</li>
                <li>• Estoque FR-2: 10 → Necessidade: 8</li>
                <li>• Lead Time: 2 dias</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MRPTable;
