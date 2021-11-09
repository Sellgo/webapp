/* eslint-disable @typescript-eslint/no-var-requires */

import {
  F_TYPES,
  DEFAULT_TEXT_FILTER,
  DEFAULT_MIN_MAX_FILTER,
  DEFAULT_MIN_MAX_PERIOD_REVIEW,
  DEFAULT_US_MARKET,
  DEFAULT_INCLUDE_EXCLUDE_FILTER,
  DEFAULT_MIN_MAX_PERIOD_FILTER,
} from '.';

import { defaultMarketplaces } from '../Settings';

import { Location, Country, USState } from '../../interfaces/SellerResearch/SellerMap';

const allCountriesList = require('../../assets/countriesList.json');
const allUsStatesList = require('../../assets/usStatesList.json');

/* Actions */
export const actionTypes = {
  // Main Sellers Map
  LOADING_SELLERS_FOR_MAP: 'LOADING_SELLERS_FOR_MAP',
  SET_SELLERS_FOR_MAP: 'SET_SELLERS_FOR_MAP',

  // Sellers List for map
  IS_LOADING_SELLERS_LIST_FOR_MAP: 'IS_LOADING_SELLERS_LIST_FOR_MAP',
  SET_SELLERS_LIST_FOR_MAP: 'SET_SELLERS_LIST_FOR_MAP',
  SET_SELLERS_LIST_FOR_MAP_PAGINATION_INFO: 'SET_SELLERS_LIST_FOR_MAP_PAGINATION_INFO',

  // Seller map filters
  UPDATE_SELLER_MAP_FILTERS_DATA: 'UPDATE_SELLER_MAP_FILTERS_DATA',
  RESET_SELLER_MAP_FILTERS_DATA: 'RESET_SELLER_MAP_FILTERS_DATA',
  SET_SELLER_MAP_FILTERS_DATA: 'SET_SELLER_MAP_FILTERS_DATA',

  // Sellers details for cards
  LOADING_SELLER_DETAILS_FOR_MAP: 'LOADING_SELLER_DETAILS_FOR_MAP',
  SET_SELLER_DETAILS_FOR_MAP: 'SET_SELLER_DETAILS_FOR_MAP',
  SHOW_SELLER_DETAILS_CARD: 'SHOW_SELLER_DETAILS_CARD',

  // Centering of map
  SET_COUNTRY_CENTER: 'SET_COUNTRY_CENTER',
  // Bound the apn state for map
  SET_MAP_BOUNDS: 'SET_MAP_BOUNDS',
  // Set zoom for map
  SET_ZOOM_FOR_MAP: 'SET_ZOOM_FOR_MAP',

  SET_MAP_MARKETPLACE: 'SET_MAP_MARKETPLACE',
};

/* Map defaults */
export const INITIAL_CENTER: Location = [37.09024, -95.712891];
export const INITIAL_ZOOM = 4.6;
export const MIN_ZOOM = 2.5;
export const MAX_ZOOM = 18;
export const WORLD_MAP_BOUNDS: Location[] = [
  [-90, -180],
  [90, 180],
];

// Seller Limit Options
export const DEFAULLT_SELLER_LIMIT_OPTIONS = [
  {
    key: '3',
    value: '3',
    text: 'Top 3',
  },
  {
    key: '10',
    value: '10',
    text: 'Top 10',
  },
  {
    key: '100',
    value: '100',
    text: 'Top 100',
  },
  {
    key: '1000',
    value: '1000',
    text: 'Top 1,000',
  },
  {
    key: '2000',
    value: '2000',
    text: 'Top 2,000',
  },
  {
    key: '5000',
    value: '5000',
    text: 'Top 5,000',
  },
  {
    key: '10000',
    value: '10000',
    text: 'Top 10,000',
  },
  {
    key: '20000',
    value: '20000',
    text: 'Top 20,000',
  },
];

// Get the seller map option list
export const getMapLimitOptions = (maxLimitCount: number) => {
  return DEFAULLT_SELLER_LIMIT_OPTIONS.map((option: any) => {
    return {
      ...option,
      disabled: option.value > maxLimitCount,
    };
  });
};

// Exclude countries based on https://sellercentral.amazon.com/gp/help/external/G201575280?language=en_US
// filter us so we we can add it on top
export const EXCLUDE_COUNTRY_CODE = ['US', 'CU', 'IR', 'KP', 'SY', 'SD'];

export const INCLUDED_COUNTRY_LIST = allCountriesList
  .filter((countryDetails: Country) => {
    return !EXCLUDE_COUNTRY_CODE.includes(countryDetails.country);
  })
  .map((includedCountries: Country) => {
    return {
      code: includedCountries.country,
      flag: includedCountries.country.toLocaleLowerCase(),
      text: includedCountries.name,
      key: includedCountries.country,
      value: includedCountries.country,
      center: [includedCountries.latitude, includedCountries.longitude],
    };
  });

export const COUNTRY_DROPDOWN_LIST = [
  {
    code: 'All Countries',
    text: 'All Countries',
    key: 'All Countries',
    value: 'All Countries',
    center: [0, 0],
  },
  {
    code: 'US',
    flag: 'us',
    text: 'United States',
    key: 'US',
    value: 'US',
    center: INITIAL_CENTER,
  },
  ...INCLUDED_COUNTRY_LIST,
];

export const ALL_US_STATES = allUsStatesList.map((usState: USState) => {
  return {
    code: usState.state,
    center: [usState.latitude, usState.longitude],
    key: usState.state,
    text: usState.name,
    value: usState.state,
  };
});

export const STATES_DROPDOWN_LIST = [
  {
    code: 'All States',
    center: INITIAL_CENTER,
    key: 'All States',
    text: 'All States',
    value: 'All States',
  },
  ...ALL_US_STATES,
];

export const DONT_DISABLE = ['US', 'GB', 'IT', 'MX', 'CA'];

/* Marketplace options for seller DB */
export const SELLER_MAP_MARKETPLACE = defaultMarketplaces
  .filter(m => DONT_DISABLE.includes(m.code))
  .map((marketplace: any) => {
    return {
      text: marketplace.name,
      code: marketplace.code,
      key: marketplace.code,
      value: marketplace.id,
      disabled: !DONT_DISABLE.includes(marketplace.code),
      currency: marketplace.currency,
    };
  });

/* Sellers List sorting details */
export const SELLERS_LIST_SORTING_OPTIONS = [
  {
    key: 'number_brands?desc',
    value: 'number_brands?desc',
    text: '# of Brands (High to Low)',
  },
  {
    key: 'number_brands?asc',
    value: 'number_brands?asc',
    text: '# of Brands (Low to High)',
  },
  {
    key: 'inventory_count?desc',
    value: 'inventory_count?desc',
    text: '# of ASINS (High to Low)',
  },
  {
    key: 'inventory_count?asc',
    value: 'inventory_count?asc',
    text: '# of ASINS (Low to High)',
  },
  {
    key: 'sales_estimate?desc',
    value: 'sales_estimate?desc',
    text: 'Revenue (High to Low)',
  },
  {
    key: 'sales_estimate?asc',
    value: 'sales_estimate?asc',
    text: 'Revenue (Low to High)',
  },
  {
    key: 'growth_percent?desc',
    value: 'growth_percent?desc',
    text: 'Growth % (High to Low)',
  },
  {
    key: 'growth_percent?asc',
    value: 'growth_percent?asc',
    text: 'Growth % (Low to High)',
  },
  {
    key: 'growth_count?desc',
    value: 'growth_count?desc',
    text: 'Growth # (High to Low)',
  },
  {
    key: 'growth_count?asc',
    value: 'growth_count?asc',
    text: 'Growth # (Low to High)',
  },
  {
    key: 'review?desc',
    value: 'review?desc',
    text: 'Review # (High to Low)',
  },
  {
    key: 'review?asc',
    value: 'review?asc',
    text: 'Review # (Low to High)',
  },
  {
    key: 'seller_rating?desc',
    value: 'seller_rating?desc',
    text: 'Rating (High to Low)',
  },
  {
    key: 'seller_rating?asc',
    value: 'seller_rating?asc',
    text: 'Rating (Low to High)',
  },
  {
    key: 'launched?desc',
    value: 'launched?desc',
    text: 'Launched (High to Low)',
  },
  {
    key: 'launched?asc',
    value: 'launched?asc',
    text: 'Launched (Low to High)',
  },
  {
    key: 'count?desc',
    value: 'count?desc',
    text: 'FBA % (High to Low)',
  },
  {
    key: 'count?asc',
    value: 'count?asc',
    text: 'FBA % (Low to High)',
  },
];

export const SELLER_MAP_DEFAULT_FILTER = [
  // Global filters
  {
    keyName: 'marketplace',
    type: F_TYPES.MARKETPLACE,
    value: DEFAULT_US_MARKET,
  },

  {
    keyName: 'country',
    type: F_TYPES.COUNTRY,
    value: DEFAULT_US_MARKET.code,
  },

  {
    keyName: 'state',
    type: F_TYPES.STATE,
    value: '',
  },
  {
    keyName: 'max_count',
    type: F_TYPES.TEXT,
    value: '1000',
  },

  // Other filters
  { keyName: 'categories', type: F_TYPES.CATEGORIES, value: [] },
  { keyName: 'sales_estimate', type: F_TYPES.MIN_MAX, value: DEFAULT_MIN_MAX_FILTER }, // not added d
  { keyName: 'merchant_name', type: F_TYPES.TEXT, value: DEFAULT_TEXT_FILTER },
  { keyName: 'business_name', type: F_TYPES.TEXT, value: DEFAULT_TEXT_FILTER }, // not added d
  // validated
  { keyName: 'brands', type: F_TYPES.INPUT_INCLUDE_EXCLUDE, value: DEFAULT_INCLUDE_EXCLUDE_FILTER }, // dnot added v
  { keyName: 'asin', type: F_TYPES.INPUT_INCLUDE_EXCLUDE, value: DEFAULT_INCLUDE_EXCLUDE_FILTER }, // dnot added v
  { keyName: 'fba_percent', type: F_TYPES.MIN_MAX, value: DEFAULT_MIN_MAX_FILTER }, // dnot added validated
  { keyName: 'inventory_count', type: F_TYPES.MIN_MAX, value: DEFAULT_MIN_MAX_FILTER }, //d not added
  { keyName: 'number_brands', type: F_TYPES.MIN_MAX, value: DEFAULT_MIN_MAX_FILTER }, // dnot added
  {
    keyName: 'growth_percent', // not added dvalidated
    type: F_TYPES.MIN_MAX_PERIOD,
    value: DEFAULT_MIN_MAX_PERIOD_FILTER,
  },
  {
    keyName: 'growth_count', // not added dvalidated
    type: F_TYPES.MIN_MAX_PERIOD,
    value: DEFAULT_MIN_MAX_PERIOD_FILTER,
  },
  {
    keyName: 'review_ratings',
    type: F_TYPES.MIN_MAX_PERIOD_REVIEW,
    value: DEFAULT_MIN_MAX_PERIOD_REVIEW,
  },
  { keyName: 'launched', type: F_TYPES.TEXT, value: DEFAULT_TEXT_FILTER },
  { keyName: 'seller_rating', type: F_TYPES.MIN_MAX, value: DEFAULT_MIN_MAX_FILTER },
];
