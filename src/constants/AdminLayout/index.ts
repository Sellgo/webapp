import { NavOptions } from '../../interfaces/Admin';

/* New products following design */
export const NEW_PRODUCT_DESIGN_PATH_NAMES = [
  /* Seller Research */
  '/seller-research',
  '/seller-research/database',
  '/seller-research/map',
  '/seller-research/finder',

  /* Keyword Research */
  '/keyword-research',
  '/keyword-research/finder',
  '/keyword-research/database',
  '/keyword-research/tracker',
  '/keyword-research/zapier',

  /* Product Research */
  '/product-research',
  '/product-research/database',

  /* Perfect Stock */
  '/perfect-stock',
  '/perfect-stock/order-planning',
  '/perfect-stock/catalogue-planning',
  '/perfect-stock/sales-estimation',

  '/account-setup',
];

export const HIDE_NAV_BAR_PATH_NAMES = [
  '/account-setup',
  '/settings/connectivity?first-time-logged-in=true',
  '/settings/api-keys?first-time-logged-in=true',
];

export const NAV_ICONS = {
  HOME: 'homeIcon.svg',
  WHOLESALE_BULK_ANALYSIS: 'wholesaleIcon.svg',
  SEARCH_MANAGEMENT: 'searchManagementIcon.svg',
  PROFIT_FINDER: 'profitFinderIcon.svg',
  LEADS_TRACKER: 'leadsTrackerIcon.svg',
  PRODUCT_RESEARCH: 'productResearchIcon.svg',
  PRODUCT_DATABASE: 'productDatabaseIcon.svg',
  PRODUCT_TRACKER: 'productTrackerIcon.svg',
  SELLER_RESEARCH: 'sellerResearchIcon.svg',
  SELLER_DATABASE: 'sellerDatabaseIcon.svg',
  SELLER_MAP: 'sellerMapIcon.svg',
  SELLER_INVENTORY: 'sellerFinder.svg',
  KEYWORD_RESEARCH: 'keywordResearchIcon.svg',
  KEYWORD_REVERSE: 'keywordReverseIcon.svg',
  KEYWORD_DATABASE: 'keywordDatabaseIcon.svg',
  KEYWORD_TRACKER: 'keywordTrackerIcon.svg',
  ZAPIER: 'zapierIcon.svg',
};

export const OPTIONS: NavOptions = [
  {
    label: 'Home',
    icon: require(`../../assets/images/${NAV_ICONS.HOME}`),
    path: '/',
    disabled: false,
    isBeta: false,
    subOptions: [],
  },
  {
    label: 'Wholesale Bulk Analysis',
    icon: require(`../../assets/images/${NAV_ICONS.WHOLESALE_BULK_ANALYSIS}`),
    path: '/',
    disabled: false,
    isBeta: false,
    subOptions: [
      {
        label: 'Search Management',
        description: 'The 1st Step to Wholesale Sourcing',
        icon: require(`../../assets/images/${NAV_ICONS.SEARCH_MANAGEMENT}`),
        path: '/synthesis',
        disabled: false,
        isBeta: false,
      },
      {
        label: 'Profit Finder',
        description: 'Wholesale Bulk Calculation',
        icon: require(`../../assets/images/${NAV_ICONS.PROFIT_FINDER}`),
        path: '/profit-finder',
        disabled: false,
        isBeta: false,
      },
      {
        label: 'Leads Tracker',
        description: 'Intelligent Leads Tracking',
        icon: require(`../../assets/images/${NAV_ICONS.LEADS_TRACKER}`),
        path: '/leads-tracker',
        disabled: false,
        isBeta: false,
      },
    ],
  },
  {
    label: 'Seller Research',
    icon: require(`../../assets/images/${NAV_ICONS.SELLER_RESEARCH}`),
    path: '/seller-research',
    disabled: false,
    isBeta: false,
    subOptions: [
      {
        label: 'Seller Database',
        description: 'Discover >1M of Amazon Sellers',
        icon: require(`../../assets/images/${NAV_ICONS.SELLER_DATABASE}`),
        path: '/seller-research/database',
        disabled: false,
        isBeta: false,
      },
      {
        label: 'Seller Map',
        description: 'Interactive Map of Amazon Sellers',
        icon: require(`../../assets/images/${NAV_ICONS.SELLER_MAP}`),
        path: '/seller-research/map',
        disabled: false,
        isBeta: false,
      },
      {
        label: 'Seller Finder',
        description: 'Find More Sellers from Inventories ',
        icon: require(`../../assets/images/${NAV_ICONS.SELLER_INVENTORY}`),
        path: '/seller-research/finder',
        disabled: false,
        isBeta: true,
      },
    ],
  },
  {
    label: 'Keyword Research',
    icon: require(`../../assets/images/${NAV_ICONS.KEYWORD_RESEARCH}`),
    path: '/keyword-research',
    isComingSoon: false,
    disabled: false,
    isBeta: false,
    subOptions: [
      {
        label: 'Keyword Finder',
        description: 'Reveal Competitor Keywords',
        icon: require(`../../assets/images/${NAV_ICONS.KEYWORD_REVERSE}`),
        path: '/keyword-research/finder',
        disabled: false,
        isBeta: true,
      },
      {
        label: 'Keyword Database',
        description: 'Check High-Volume Keywords',
        icon: require(`../../assets/images/${NAV_ICONS.KEYWORD_DATABASE}`),
        path: '/keyword-research/database',
        disabled: false,
        isBeta: true,
      },
      {
        label: 'Keyword Tracker',
        description: 'Get to #1 Search Results',
        icon: require(`../../assets/images/${NAV_ICONS.KEYWORD_TRACKER}`),
        path: '/keyword-research/tracker',
        disabled: false,
        isBeta: true,
      },
      {
        label: 'Zapier',
        description: 'Zapier Integration',
        icon: require(`../../assets/images/${NAV_ICONS.ZAPIER}`),
        path: '/keyword-research/zapier',
        disabled: false,
        isBeta: true,
      },
    ],
  },
  {
    label: 'Product Research',
    icon: require(`../../assets/images/${NAV_ICONS.PRODUCT_RESEARCH}`),
    path: '/product-research',
    isComingSoon: false,
    disabled: false,
    isBeta: false,
    subOptions: [
      {
        label: 'Product Database',
        description: 'Amazon Product Catalogue',
        icon: require(`../../assets/images/${NAV_ICONS.PRODUCT_DATABASE}`),
        path: '/product-research/database',
        disabled: false,
        isBeta: true,
      },
    ],
  },
];

export const getActiveIndex: (currentPath: string) => number = (currentPath: string) => {
  return OPTIONS.findIndex(option => {
    return (
      option.subOptions &&
      option.subOptions.find((subOption: any) => {
        /* Path matching for profit finder should be matched to /profit-finder/{supplier_id} */
        if (subOption.path.includes('/profit-finder')) {
          return currentPath.includes('/profit-finder');
        } else {
          return subOption.path === currentPath;
        }
      })
    );
  });
};
