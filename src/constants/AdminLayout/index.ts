import { NavOptions, NavIcons } from '../../interfaces/Admin';

export const NAV_ICONS: NavIcons = {
  HOME: 'HOME',
  WHOLESALE_BULK_ANALYSIS: 'WHOLESALE_BULK_ANALYSIS',
  SEARCH_MANAGEMENT: 'SEARCH_MANAGEMENT',
  PROFIT_FINDER: 'PROFIT_FINDER',
  LEADS_TRACKER: 'LEADS_TRACKER',
  PRODUCT_RESEARCH: 'PRODUCT_RESEARCH',
  PRODUCT_DATABASE: 'PRODUCT_DATABASE',
  PRODUCT_TRACKER: 'PRODUCT_TRACKER',
  SELLER_RESEARCH: 'SELLER_RESEARCH',
  SELLER_DATABASE: 'SELLER_DATABASE',
  SELLER_MAP: 'SELLER_MAP',
  SELLER_INVENTORY: 'SELLER_INVENTORY',
  KEYWORD_RESEARCH: 'KEYWORD_RESEARCH',
  KEYWORD_REVERSE: 'KEYWORD_REVERSE',
  KEYWORD_DATABASE: 'KEYWORD_DATABASE',
  KEYWORD_TRACKER: 'KEYWORD_TRACKER',
};

export const OPTIONS: NavOptions = [
  {
    label: 'Home',
    icon: NAV_ICONS.HOME,
    path: '/',
    disabled: false,
    isBeta: false,
    subOptions: [],
  },
  {
    label: 'Wholesale Bulk Analysis',
    icon: NAV_ICONS.WHOLESALE_BULK_ANALYSIS,
    path: '/',
    disabled: false,
    isBeta: false,
    subOptions: [
      {
        label: 'Search Management',
        description: 'The 1st Step to Wholesale Sourcing',
        icon: NAV_ICONS.SEARCH_MANAGEMENT,
        path: '/synthesis',
        disabled: false,
        isBeta: false,
      },
      {
        label: 'Profit Finder',
        description: 'Wholesale Bulk Calculation',
        icon: NAV_ICONS.PROFIT_FINDER,
        path: '/profit-finder',
        disabled: false,
        isBeta: false,
      },
      {
        label: 'Leads Tracker',
        description: 'Intelligent Leads Tracking',
        icon: NAV_ICONS.LEADS_TRACKER,
        path: '/leads-tracker',
        disabled: false,
        isBeta: false,
      },
    ],
  },
  {
    label: 'Product Research',
    icon: NAV_ICONS.PRODUCT_RESEARCH,
    path: '/product-research',
    disabled: false,
    isBeta: false,
    subOptions: [
      {
        label: 'Product Database',
        description: 'Amazon Product Catalogue',
        icon: NAV_ICONS.PRODUCT_DATABASE,
        path: '/product-research/database',
        disabled: false,
        isBeta: false,
      },
      {
        label: 'Product Tracker',
        description: 'Track Favorite Products',
        icon: NAV_ICONS.PRODUCT_TRACKER,
        path: '/product-tracker',
        disabled: false,
        isBeta: false,
      },
    ],
  },
  {
    label: 'Seller Research',
    icon: NAV_ICONS.SELLER_RESEARCH,
    path: '/seller-research',
    disabled: false,
    isBeta: false,
    subOptions: [
      {
        label: 'Seller Database',
        description: 'Seller Database',
        icon: NAV_ICONS.SELLER_DATABASE,
        path: '/seller-research/database',
        disabled: false,
        isBeta: false,
      },
      {
        label: 'Seller Map',
        description: 'Seller Map',
        icon: NAV_ICONS.SELLER_MAP,
        path: '/seller-research/map',
        disabled: false,
        isBeta: false,
      },
      {
        label: 'Seller Inventory',
        description: 'Seller Inventory',
        icon: NAV_ICONS.SELLER_INVENTORY,
        path: '/seller-finder',
        disabled: false,
        isBeta: false,
      },
    ],
  },
  {
    label: 'Keyword Research',
    icon: NAV_ICONS.KEYWORD_RESEARCH,
    path: '/keyword-research',
    disabled: false,
    isBeta: false,
    subOptions: [
      {
        label: 'Keyword Reverse',
        description: 'Reveal Competitor Keywords',
        icon: NAV_ICONS.KEYWORD_REVERSE,
        path: '/keyword-research/reverse',
        disabled: false,
        isBeta: false,
      },
      {
        label: 'Keyword Database',
        description: 'Check High-Volume Keywords',
        icon: NAV_ICONS.KEYWORD_DATABASE,
        path: '/keyword-research/database',
        disabled: false,
        isBeta: false,
      },
      {
        label: 'Keyword Tracker',
        description: 'Get to #1 Search Results',
        icon: NAV_ICONS.KEYWORD_TRACKER,
        path: '/keyword-research/tracker',
        disabled: false,
        isBeta: false,
      },
    ],
  },
];

export const getActiveIndex: (currentPath: string) => number = (currentPath: string) => {
  return OPTIONS.findIndex(option => {
    return option.subOptions.find((subOption: any) => subOption.path === currentPath);
  });
};
