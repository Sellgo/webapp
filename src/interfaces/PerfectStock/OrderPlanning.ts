import { SingleLeadTimeGroup } from './SalesProjection';

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
  payment_term?: any;
  order_payment_term_id: number;
  merchant_listings: any[];
  number: string;
  status: string;
  is_included: boolean;
  purchase_order_template_id: number;
  vendor_id: number | null;
  deposit_amount?: number;
  deposit_date?: string;
  mid_pay_amount?: number;
  mid_pay_date?: string;
  paid_full_amount?: number;
  paid_full_date?: string;
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
  vendorId: number | null;
  color?: string;
  subTasks?: GanttChartPurchaseOrder[];
  prioritySku?: string;
  is_included?: boolean;
  order_payment_term_id?: number | null;
}

export interface UpdatePurchaseOrderPayload {
  id?: number;
  date?: string;
  status?: 'active' | 'inactive';
  is_included?: boolean;
  po_sku_id?: number;
  order_payment_term_id?: number | null;
  quantity?: number;
  manual_quantity?: number;
  quantity_mode?: string;
  is_priority?: boolean;
  purchase_order_ids?: number[];
  total_shipping_cost?: number;
  estimate_shipping_cost?: boolean;
  vendor_id?: number | null;
}

export interface AlignPurchaseOrderPayload {
  id: number;
  priority_merchant_listing_id: number;
  stockout_buffer_days?: number | null;
  stockout_buffer_perc?: number | null;
  is_moq: boolean;
  vendor_id?: number | null;
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
  weight_unit?: string | null;
  length?: number;
  length_unit?: string;
  width?: number;
  width_unit?: string;
  shipping_cost?: number;
  is_active?: boolean;
}

export interface CreateOrderPayload {
  creation_type: string; // 'single' | 'multiple';

  /* All Orders */
  start_date?: string | null;
  end_date?: string | null;
  lead_time_group_id: number;
  order_payment_term_id: number;
  payment_term?: PaymentTerm;
  lead_time_group?: SingleLeadTimeGroup;
  merchant_listings: any[];
  vendor_id?: number;

  /* Smart Order */
  approach?: string; //'timebound' | 'moq' | 'inventory'
  auto_generate_orders_days?: number | null;
  interval?: number;
  priority_merchant_listing_id?: number;
  stockout_buffer_days?: number;
  stockout_buffer_perc?: number;
  n_days_limit?: number;
  honor_moq?: boolean;
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

export interface InventoryTableFilters {
  active: string;
  fba: string;
}

export interface PaymentTerm {
  name: string;
  indexIdentifier: string;
  id?: number;
  deposit_perc?: number;
  mid_pay_perc?: number;
  paid_full_perc?: number;
  deposite_due?: string;
  mid_pay_due?: string;
  paid_full_due?: string;
  status: 'active' | 'inactive' | 'pending';
  is_default?: boolean;
}
