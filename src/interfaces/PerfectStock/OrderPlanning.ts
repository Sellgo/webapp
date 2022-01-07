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
}

/* Gantt chart purchase orders are used in the gantt chart, and requires start/end to be in the Date format */
export interface GanttChartPurchaseOrder {
  id: number;
  start: Date;
  end: Date;
  name: string;
  color?: string;
  subTasks?: GanttChartPurchaseOrder[];
}

export interface UpdatePurchaseOrderPayload {
  id: number;
  date: string;
}

export interface CreateOrderPayload {
  date: string;
  number: string;
  lead_time_group_id: number;
  merchant_listing_ids: { id: number; quantity: number }[];
}
