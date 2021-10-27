export interface SellerSubscriptionLimits {
  sellerMapDropdownLimit: number;
}

export interface PromoCode {
  percent_off: number;
  amount_off: number;
  message: string;
  duration: string;
}

export interface SummaryDetails {
  name: string;
  subDescription: string;
  benefits: string[];
  id: number;
  monthlyPrice: number;
  annualPrice: number;
  dailyPrice: number;
}

export interface SubscriptionPlan {
  subscriptionId: number;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  isDailyPlan: boolean;
}

export interface SubscriptionDetailsWithQuota {
  id: number;
  type: string;
  name: string;

  seller_database_limit: number;
  seller_database_display_limit: number;

  seller_map_overview_display_limit: number;

  seller_finder_inventory_limit: number;
  seller_finder_inventory_display_limit: number;

  seller_finder_seller_limit: number;
  seller_finder_seller_display_limit: number;
}
