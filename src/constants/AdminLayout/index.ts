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
  '/aistock',
  '/aistock/create-order',
  '/aistock/sales',
  '/aistock/order',
  '/aistock/3pl',

  '/account-setup',
];

export const HIDE_NAV_BAR_PATH_NAMES = [
  '/account-setup',
  '/settings/sp-connectivity?first-time-logged-in=true',
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
  PERFECT_STOCK: 'perfectStock.svg',
  ORDER_PLANNING: 'orderPlanning.svg',
  SALES_ESTIMATION: 'salesProjection.svg',
  PERFECT_STOCK_HOME: 'perfectStockHome.svg',
  TPL: 'tpl.svg',
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
      // {
      //   label: 'Leads Tracker',
      //   description: 'Intelligent Leads Tracking',
      //   icon: require(`../../assets/images/${NAV_ICONS.LEADS_TRACKER}`),
      //   path: '/leads-tracker',
      //   disabled: false,
      //   isBeta: false,
      // },
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
    isBeta: true,
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
  {
    label: 'Ai Stock',
    icon: require(`../../assets/images/${NAV_ICONS.PERFECT_STOCK}`),
    path: '/aistock',
    isComingSoon: false,
    disabled: false,
    isBeta: true,
    subOptions: [
      {
        label: 'Home',
        description: 'Cash Flow Analysis',
        icon: require(`../../assets/images/${NAV_ICONS.PERFECT_STOCK_HOME}`),
        path: '/aistock/home',
        disabled: true,
        isBeta: false,
        isComingSoon: true,
      },
      {
        label: 'Sales Forecasting',
        description: 'Future Sales Projection',
        icon: require(`../../assets/images/${NAV_ICONS.SALES_ESTIMATION}`),
        path: '/aistock/sales',
        disabled: false,
        isBeta: true,
      },
      {
        label: 'Order Planning',
        description: 'Avoid Stockout & Overstock',
        icon: require(`../../assets/images/${NAV_ICONS.ORDER_PLANNING}`),
        path: '/aistock/order',
        disabled: false,
        isBeta: true,
      },
      {
        label: '3PL Manager',
        description: 'Storage & Inbound Manager',
        icon: require(`../../assets/images/${NAV_ICONS.TPL}`),
        path: '/aistock/tpl',
        disabled: true,
        isBeta: false,
        isComingSoon: true,
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
