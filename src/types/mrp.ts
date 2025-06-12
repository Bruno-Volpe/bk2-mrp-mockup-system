
export interface User {
  id: string;
  username: string;
  role: 'gestor' | 'operador' | 'comprador' | 'administrador';
  name: string;
}

export interface Product {
  id: string;
  name: string;
  level: number;
  quantity: number;
  unit: string;
}

export interface MPSEntry {
  period: number;
  demand: number;
  production: number;
  inventory: number;
  date: string;
}

export interface MRPItem {
  id: string;
  name: string;
  level: number;
  grossRequirement: number;
  scheduledReceipts: number;
  projectedInventory: number;
  netRequirement: number;
  plannedOrderReleases: number;
  leadTime: number;
}

export interface PurchaseOrder {
  id: string;
  item: string;
  quantity: number;
  supplier: string;
  orderDate: string;
  deliveryDate: string;
  status: 'pending' | 'approved' | 'sent' | 'received';
  unitPrice: number;
}

export interface ProductionOrder {
  id: string;
  item: string;
  quantity: number;
  startDate: string;
  endDate: string;
  status: 'planned' | 'in_progress' | 'completed';
  operations: Operation[];
}

export interface Operation {
  id: string;
  name: string;
  status: 'pending' | 'in_progress' | 'completed';
  startDate: string;
  endDate: string;
  duration: number;
}
