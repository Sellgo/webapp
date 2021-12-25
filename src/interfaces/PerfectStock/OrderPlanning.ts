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
