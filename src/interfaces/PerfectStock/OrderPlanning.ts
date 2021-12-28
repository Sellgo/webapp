export interface DateRange {
  startDate: string;
  endDate: string;
}

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
