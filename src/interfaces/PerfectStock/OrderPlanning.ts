export interface DateRange {
  startDate: string;
  endDate: string;
}

/* Purchase order from backend */
export interface PurchaseOrder {
  date: string;
  id: number;
  lead_time_group: any;
  lead_time_group_id: number;
  merchant_listings: any[];
  number: string;
  status: string;
  is_included: boolean;
}

export interface DraftOrderTemplate {
  approach: string;
  auto_generate_orders_days: number;
  date: string;
  id: number;
  lead_time_group_id: number;
  status: string;
}

/* Gantt chart purchase orders are used in the gantt chart, and requires start/end to be in the Date format */
export interface GanttChartPurchaseOrder {
  id: number;
  start: Date;
  end: Date;
  name: string;
  color?: string;
  subTasks?: GanttChartPurchaseOrder[];
  is_included?: boolean;
}

export interface UpdatePurchaseOrderPayload {
  id: number;
  date?: string;
  status?: 'active' | 'inactive';
  is_included?: boolean;
}

export interface CreateOrderPayload {
  date: string;
  lead_time_group_id: number;
  approach: 'inventory';
  auto_generate_orders_days: number;
}

export interface DraftOrderInformation {
  date: string;
  id: number;
  is_included: boolean;
  lead_time_group: any;
  merchant_listings: any[];
  number: string;
  purchase_order_template_id: 2;
  status: string;
}
