export interface TplVendor {
  /* Id is number for saved backend vendors, id is string for new vendors */
  id: number;
  name: string;
  status: string;
  marketplace_id: string;
  account_number: string;
  address: string;
  city: string;
  state: string;
  zip_code: number | null;
  country: string;
  monthly_cost_q1: number | string | null;
  monthly_cost_q2: number | string | null;
  monthly_cost_q3: number | string | null;
  monthly_cost_q4: number | string | null;
  isNew?: boolean;
}

export interface UpdateTplSkuPayload {
  id: number;
  interval?: number;
  days_of_inventory?: number;
  status?: string;
}

export interface DefaultMarket {
  text: string;
  code: string;
  value: string;
  disabled: boolean;
  key: string;
  currency: string;
}
