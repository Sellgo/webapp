export interface ReplenishmentFBA {
  id: number;
  name: string;
  vendor_id: number;
  status: string;
  marketplace_id: string;
  fulfillment: string;
  method: string;
  carrier_type: string;
  carrier_name: string;
  isNew?: boolean;
}
