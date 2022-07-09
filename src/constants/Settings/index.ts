export const SET_SELLER_AMAZON_MWS_AUTH = 'SET_SELLER_AMAZON_MWS_AUTH';
export const UPDATE_SELLER_AMAZON_MWS_AUTH = 'UPDATE_SELLER_AMAZON_MWS_AUTH';
export const SET_SELLER_PROFILE_IMAGE = 'SET_SELLER_PROFILE_IMAGE';
export const SET_SELLER_INFO = 'SET_SELLER_INFO';
export const UPDATE_SELLER_INFO = 'UPDATE_SELLER_INFO';
export const DELETE_SELLER_AMAZON_MWS_AUTH = 'DELETE_SELLER_AMAZON_MWS_AUTH';
export const SET_PRICING_SUBSCRIPTIONS = 'SET_PRICING_SUBSCRIPTIONS';
export const SET_SUCCESS_PAYMENT = 'SET_SUCCESS_PAYMENT';
export const SET_STRIPE_ERROR = 'SET_STRIPE_ERROR';
export const SET_STRIPE_LOADING = 'SET_STRIPE_LOADING';
export const SET_SELLER_SUBSCRIPTION = 'SET_SELLER_SUBSCRIPTION';
export const SET_AMAZON_MWS_AUTHORIZED = 'SET_AMAZON_MWS_AUTHORIZED';
export const SET_SELLER_QUOTA = 'SET_SELLER_QUOTA';
export const SET_COUPON_APPLIED = 'SET_COUPON_APPLIED';
export const SET_PROMO_CODE = 'SET_PROMO_CODE';
export const SET_PROMO_LOADING = 'SET_PROMO_LOADING';
export const SET_PROMO_ERROR_MESSAGE = 'SET_PROMO_ERROR_MESSAGE';

export const defaultMarketplaces = [
  {
    name: 'United States',
    code: 'US',
    link: 'amazon.com',
    id: 'ATVPDKIKX0DER',
    disabled: false,
    currency: '$',
  },
  {
    name: 'UK',
    code: 'GB',
    link: 'amazon.uk',
    id: 'A1F83G8C2ARO7P',
    disabled: true,
    currency: '£',
  },
  {
    name: 'Canada',
    code: 'CA',
    link: 'amazon.ca',
    id: 'A2EUQ1WTGCTBG2',
    disabled: true,
    currency: '$',
  },
  { name: 'Brazil', code: 'BR', link: 'amazon.com', id: 'A2Q3Y263D00KWC', disabled: true },
  {
    name: 'Mexico',
    code: 'MX',
    link: 'amazon.com.mx',
    id: 'A1AM78C64UM0Y8',
    disabled: true,
    currency: 'Mex$',
  },
  {
    name: 'United Arab Emirates',
    code: 'AE',
    link: 'amazon.ae',
    id: 'A2VIGQ35RCS4UG',
    disabled: true,
  },
  { name: 'Germany', code: 'DE', link: 'amazon.de', id: 'A1PA6795UKMFR9', disabled: true },
  { name: 'Spain', code: 'ES', link: 'amazon.com', id: 'A1RKKUPIHCS9HS', disabled: true },
  { name: 'France', code: 'FR', link: 'amazon.com', id: 'A13V1IB3VIYZZH', disabled: true },

  { name: 'India', code: 'IN', link: 'amazon.in', id: 'A21TJRUUN4KGV', disabled: true },
  {
    name: 'Italy',
    code: 'IT',
    link: 'amazon.com',
    id: 'APJ6JRA9NG5V4',
    disabled: true,
    currency: '€',
  },
  { name: 'Turkey', code: 'TR', link: 'amazon.com', id: 'A33AVAJ2PDY3EV', disabled: true },
  {
    name: 'Singapore',
    code: 'SG',
    link: 'amazon.com',
    id: 'A19VAU5U5O7RUS',
    disabled: true,
  },
  {
    name: 'Australia',
    code: 'AU',
    link: 'amazon.com.au',
    id: 'A39IBJ37TRP1C6',
    disabled: true,
  },
  { name: 'Japan', code: 'JP', link: 'amazon.com', id: 'A1VC38T7YXB528', disabled: true },
  { name: 'China', code: 'CN', link: 'amazon.com', id: 'AAHKV2X7AFYLW', disabled: true },
];

export const countryList = [
  { name: 'Australia', code: 'AU', id: 'AU' },
  { name: 'Austria', code: 'AT', id: 'AT' },
  { name: 'Belgium', code: 'BE', id: 'BE' },
  { name: 'Brazil', code: 'BR', id: 'BR' },
  { name: 'Bulgaria', code: 'BG', id: 'BG' },
  { name: 'Canada', code: 'CA', id: 'CA' },
  { name: 'Cyprus', code: 'CY', id: 'CY' },
  { name: 'Czech Republic', code: 'CZ', id: 'CZ' },
  { name: 'Denmark', code: 'DK', id: 'DK' },
  { name: 'Estonia', code: 'EE', id: 'EE' },
  { name: 'Finland', code: 'FI', id: 'FI' },
  { name: 'France', code: 'FR', id: 'FR' },
  { name: 'Germany', code: 'DE', id: 'DE' },
  { name: 'Greece', code: 'GR', id: 'GR' },
  { name: 'Hong Kong', code: 'HK', id: 'HK' },
  { name: 'India', code: 'IN', id: 'IN' },
  { name: 'Ireland', code: 'IE', id: 'IE' },
  { name: 'Italy', code: 'IT', id: 'IT' },
  { name: 'Japan', code: 'JP', id: 'JP' },
  { name: 'Latvia', code: 'LV', id: 'LV' },
  { name: 'Lithuania', code: 'LT', id: 'LT' },
  { name: 'Luxembourg', code: 'LU', id: 'LU' },
  { name: 'Malaysia', code: 'MY', id: 'MY' },
  { name: 'Malta', code: 'MT', id: 'MT' },
  { name: 'Mexico', code: 'MX', id: 'MX' },
  { name: 'Netherlands', code: 'NL', id: 'NL' },
  { name: 'New Zealand', code: 'NZ', id: 'NZ' },
  { name: 'Norway', code: 'NO', id: 'NO' },
  { name: 'Poland', code: 'PL', id: 'PL' },
  { name: 'Portugal', code: 'PT', id: 'PT' },
  { name: 'Romania', code: 'RO', id: 'RO' },
  { name: 'Singapore', code: 'SG', id: 'SG' },
  { name: 'Slovakia', code: 'SK', id: 'SK' },
  { name: 'Slovenia', code: 'SI', id: 'SI' },
  { name: 'Spain', code: 'ES', id: 'ES' },
  { name: 'Sweden', code: 'SE', id: 'SE' },
  { name: 'Switzerland', code: 'CH', id: 'CH' },
  { name: 'Kingdom', code: 'GB', id: 'GB' },
  { name: 'United States', code: 'US', id: 'US' },
];

export const MARKETPLACE_DROPDOWN_OPTIONS = defaultMarketplaces.map((marketplace: any) => {
  return {
    ...marketplace,
    key: marketplace.code,
    text: marketplace.name,
    value: marketplace.id,
    flag: marketplace.code.toLowerCase(),
  };
});

export const DEFAULT_US_MARKETPLACE = MARKETPLACE_DROPDOWN_OPTIONS.find(
  (marketplace: any) => marketplace.code === 'US'
);

export const marketplaceflagMapper: any = {
  ATVPDKIKX0DER: require('../../assets/flags/US.png'),
  A1F83G8C2ARO7P: require('../../assets/flags/GB.png'),
  APJ6JRA9NG5V4: require('../../assets/flags/IT.png'),
  A1AM78C64UM0Y8: require('../../assets/flags/MX.png'),
  A2EUQ1WTGCTBG2: require('../../assets/flags/CA.png'),
};

/* Get flags based on marketplace */
export const getMarketplaceFlag = (marketplaceId: string) => {
  const flagUrl = marketplaceflagMapper[marketplaceId];

  if (!flagUrl) {
    return marketplaceflagMapper.ATVPDKIKX0DER;
  }

  return flagUrl;
};

export const SETTINGS_PAGES = [
  {
    name: 'My Profile',
    disabled: false,
    url: '/settings/profile',
    showInSellgo: true,
    showInAistock: true,
    subPages: [],
  },
  {
    name: 'Subscription',
    disabled: false,
    url: '/settings/pricing',
    showInSellgo: true,
    showInAistock: true,
    subPages: [],
  },
  {
    name: 'My Billing',
    disabled: false,
    url: '/settings/billing',
    showInSellgo: true,
    showInAistock: true,
    subPages: [],
  },

  {
    name: 'API Keys',
    disabled: false,
    url: '/settings/api-keys',
    showInSellgo: true,
    showInAistock: false,
    subPages: [],
  },
  {
    name: 'Global',
    disabled: false,
    url: '/settings/aistock/lead-time',
    showInSellgo: false,
    showInAistock: true,
    subPages: [
      {
        name: 'Connectivity',
        disabled: false,
        url: '/settings/sp-connectivity',
      },
      {
        name: 'Lead Time',
        disabled: false,
        url: '/settings/aistock/lead-time',
      },
      {
        name: 'SKU settings',
        disabled: false,
        url: '/settings/aistock/sku-settings',
      },
      {
        name: 'User Management',
        disabled: false,
        url: '/settings/aistock/global-user-management',
      },
      {
        name: 'Alerts',
        disabled: false,
        url: '/settings/aistock/global-alerts-management',
      },
    ],
  },
  {
    name: 'Sales Forecasting',
    disabled: false,
    url: '/settings/aistock/sales-seasonality-adjustor',
    showInSellgo: false,
    showInAistock: true,
    subPages: [
      {
        name: 'Seasonality Adjustor',
        disabled: false,
        url: '/settings/aistock/sales-seasonality-adjustor',
      },
      {
        name: 'Weighted Average Sales',
        disabled: false,
        url: '/settings/aistock/sales-weighted-average-sales',
      },
      {
        name: 'Inventory History',
        disabled: false,
        url: '/settings/aistock/sales-inventory-history',
      },
      {
        name: 'Deals',
        disabled: false,
        url: '/settings/aistock/sales-deals',
      },
      {
        name: 'Chart Settings',
        disabled: false,
        url: '/settings/aistock/sales-chart-settings',
      },
    ],
  },
  {
    name: 'Order Planning',
    disabled: false,
    url: '/settings/aistock/inventory-days-of-inventory-settings',
    showInSellgo: false,
    showInAistock: true,
    subPages: [
      {
        name: 'Lead Time2',
        disabled: true,
        url: '/settings/aistock/lead-time2',
      },
      {
        name: 'Days of Inventory',
        disabled: true,
        url: '/settings/aistock/inventory-days-of-inventory-settings',
      },
      {
        name: 'Container',
        disabled: true,
        url: '/settings/aistock/inventory-containers',
      },
      {
        name: 'Duty Tax',
        disabled: true,
        url: '/settings/aistock/duty-settings',
      },
      {
        name: 'Payment Terms',
        disabled: true,
        url: '/settings/aistock/payment-terms-settings',
      },
    ],
  },
  {
    name: '3PL Manager',
    disabled: false,
    url: '/settings/aistock/tpl-manager',
    showInSellgo: false,
    showInAistock: true,
    subPages: [],
  },
  {
    name: 'Cash Flow',
    disabled: false,
    url: '/settings/aistock/cash-flow',
    showInSellgo: false,
    showInAistock: true,
    subPages: [],
  },
];

/* Get currency based on marketplace */
export const getMarketplaceCurrency = (marketplaceId: string) => {
  const marketplace = defaultMarketplaces.find((marketplace: any) => {
    return marketplace.id === marketplaceId;
  });

  if (marketplace && marketplace.currency) {
    return marketplace.currency;
  } else {
    return '$';
  }
};
