export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface InventoryTablePayload {
  page?: number;
  sort?: string;
  sortDir?: 'asc' | 'desc';
  isExport?: boolean;
  fileFormat?: 'csv' | 'xlsx';
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
  purchase_order_template_id: number;
}

export interface DraftOrderTemplate {
  approach: string;
  auto_generate_orders_days: number;
  date: string;
  id: number;
  lead_time_group_id: number;
  status: string;
  merchant_listings: any[];
}

/* Gantt chart purchase orders are used in the gantt chart, and requires start/end to be in the Date format */
export interface GanttChartPurchaseOrder {
  id: number;
  start: Date;
  end: Date;
  name: string;
  color?: string;
  subTasks?: GanttChartPurchaseOrder[];
  prioritySku?: string;
  is_included?: boolean;
}

export interface UpdatePurchaseOrderPayload {
  id: number;
  date?: string;
  status?: 'active' | 'inactive';
  is_included?: boolean;
  po_sku_id?: number;
  quantity?: number;
  manual_quantity?: number;
  quantity_mode?: string;
  is_priority?: boolean;
}

export interface AutoGeneratePurchaseOrderPayload {
  id: number;
  merchant_listing_id: number | null;
  next_n_days: number | null;
  stockout_buffer_perc?: number;
  stockout_buffer_days?: number;
}

export interface InventorySkuUpdatePayload {
  id: number;
  product_cost?: number;
  moq?: number;
  carton_count?: number;
  cbm?: number;
  height?: number;
  height_unit?: string;
  weight?: number;
  weight_unit?: string;
  length?: number;
  length_unit?: string;
  width?: number;
  width_unit?: string;
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

export interface ProductConfig {
  id: number;
  carton_count: number;
  height: number;
  height_unit: string;
  length: number;
  length_unit: string;
  moq: number;
  product_cost: number;
  round_up_to_nearest_carton: boolean;
  shipping_cost: number;
  weight: number;
  weight_unit: string;
  width: number;
  width_unit: string;
}
