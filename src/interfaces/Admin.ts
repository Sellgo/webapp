export type NavIconType =
  | 'HOME'
  | 'WHOLESALE_BULK_ANALYSIS'
  | 'SEARCH_MANAGEMENT'
  | 'PROFIT_FINDER'
  | 'LEADS_TRACKER'
  | 'PRODUCT_RESEARCH'
  | 'PRODUCT_DATABASE'
  | 'PRODUCT_TRACKER'
  | 'SELLER_RESEARCH'
  | 'SELLER_DATABASE'
  | 'SELLER_MAP'
  | 'SELLER_INVENTORY'
  | 'KEYWORD_RESEARCH'
  | 'KEYWORD_REVERSE'
  | 'KEYWORD_DATABASE'
  | 'KEYWORD_TRACKER';

export type NavIcons = {
  HOME: NavIconType;
  WHOLESALE_BULK_ANALYSIS: NavIconType;
  SEARCH_MANAGEMENT: NavIconType;
  PROFIT_FINDER: NavIconType;
  LEADS_TRACKER: NavIconType;
  PRODUCT_RESEARCH: NavIconType;
  PRODUCT_DATABASE: NavIconType;
  PRODUCT_TRACKER: NavIconType;
  SELLER_RESEARCH: NavIconType;
  SELLER_DATABASE: NavIconType;
  SELLER_MAP: NavIconType;
  SELLER_INVENTORY: NavIconType;
  KEYWORD_RESEARCH: NavIconType;
  KEYWORD_REVERSE: NavIconType;
  KEYWORD_DATABASE: NavIconType;
  KEYWORD_TRACKER: NavIconType;
};

export type SubNavOption = {
  label: string;
  description: string;
  icon: NavIconType;
  path: string;
  disabled: boolean;
  isBeta: boolean;
};

export type MainNavOption = {
  label: string;
  icon: NavIconType;
  path: string;
  disabled: boolean;
  isBeta: boolean;
  subOptions: SubNavOption[];
};

export type NavOptions = MainNavOption[];
