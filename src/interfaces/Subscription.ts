export interface SellerSubscriptionLimits {
  sellerMapDropdownLimit: number;
}

export interface PromoCode {
  code: string;
  percent_off: number;
  amount_off: number;
  message: string;
  duration: string;
}

export interface SummaryDetails {
  name: string;
  subDescription: string;
  idWithLegacyPlans: number[];
  benefits: string[];
  id: number;
  monthlyPrice: number;
  annualPrice: number;
  dailyPrice: number;
  monthlyLookups?: number;
  annualLookups?: number;
  annualSavingPercentage?: number;
}

export interface SubscriptionPlan {
  isLegacy?: boolean;
  subscriptionId: number;
  name: string;
  dailyPrice: number;
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
