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
