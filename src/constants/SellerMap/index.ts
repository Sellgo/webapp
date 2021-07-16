/* eslint-disable @typescript-eslint/no-var-requires */

import { Location, Country, USState } from '../../interfaces/SellerMap';

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

export const INITIAL_CENTER: Location = [37.09024, -95.712891];
export const INITIAL_ZOOM = 4.6;
export const MIN_ZOOM = 2.5;
export const MAX_ZOOM = 18;
export const WORLD_MAP_BOUNDS: Location[] = [
  [-90, -180],
  [90, 180],
];

export const DEFAULT_SELLER_INFO = {
  business_name: '',
  city: '',
  id: '',
  merchant_id: '',
  seller_link: '',
  seller_name: '',
  state: '',
  zip_code: '',
};

// Seller Limit Options
export const SELLER_LIMIT_OPTIONS = [
  {
    key: '1000',
    value: 1000,
    text: 'Top 1,000',
  },
  {
    key: '2000',
    value: 2000,
    text: 'Top 2,000',
  },
  {
    key: '5000',
    value: 5000,
    text: 'Top 5,000',
  },
  {
    key: '10000',
    value: 10000,
    text: 'Top 10,000',
  },
  {
    key: '20000',
    value: 20000,
    text: 'Top 20,000',
  },
  {
    key: '50000',
    value: 50000,
    text: 'Top 50,000',
  },
];

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
    code: 'US',
    flag: 'us',
    text: 'United States',
    key: 'US',
    value: 'US',
    center: INITIAL_CENTER,
  },
  ...INCLUDED_COUNTRY_LIST,
  {
    code: 'All Countries',
    text: 'All Countries',
    key: 'All Countries',
    value: 'All Countries',
    center: [0, 0],
  },
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
  { code: '', center: INITIAL_CENTER, key: 'All States', text: 'All States', value: '' },
  ...ALL_US_STATES,
];
