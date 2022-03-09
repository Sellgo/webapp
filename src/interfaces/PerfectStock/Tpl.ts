export interface TplVendor {
  id?: number;
  name: string;
  status: string;
  marketplace_id: string;
  account_number: string;
  address: string;
  city: string;
  state: string;
  zip_code: number | null;
  country: string;
  monthly_cost: number | null;
}
