/* eslint-disable @typescript-eslint/no-var-requires */

import { Location, Country, USState } from '../../interfaces/SellerResearch/SellerMap';
import { defaultMarketplaces } from '../Settings';

const allCountriesList = require('../../assets/countriesList.json');
const allUsStatesList = require('../../assets/usStatesList.json');

/* Actions */
export const actionTypes = {
  LOADING_SELLERS_FOR_MAP: 'LOADING_SELLERS_FOR_MAP',
  SET_SELLERS_FOR_MAP: 'SET_SELLERS_FOR_MAP',

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

/* Filter Types */
export const DEFAULT_MIN_MAX_FILTER = {
  min: '',
  max: '',
};

// Seller Limit Options
export const DEFAULLT_SELLER_LIMIT_OPTIONS = [
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
  {
    key: '50000',
    value: '50000',
    text: 'Top 50,000',
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

export const DONT_DISABLE = ['US'];

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

/* Default US Marketplace */
export const DEFAULT_US_MARKET = {
  text: 'United States',
  code: 'US',
  value: 'ATVPDKIKX0DER',
  disabled: false,
  key: 'US',
  currency: '$',
};

/* Launched Durations for filters */
export const LAUNCHED_FILTER_OPTIONS = [
  { label: 'Longer than a year', value: '>1Y' },
  { label: '90D - 1 year', value: '90D-1Y' },
];

/* Seller Type filter options */
export const SELLER_TYPE_FILTER_OPTIONS = [
  { label: 'Private Label Seller', value: 'private_label' },
  { label: 'Wholesale Reseller', value: 'wholesale' },
];
