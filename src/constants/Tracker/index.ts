import _ from 'lodash';
import { NewFilterModel } from '../../interfaces/Filters';
import { PRODUCT_ID_TYPES } from '../UploadSupplier';
export const SET_PRODUCT_TRACKER_DETAILS = 'SET_PRODUCT_TRACKER_DETAILS';
export const IS_LOADING_TRACKER_PRODUCTS = 'IS_LOADING_TRACKER_PRODUCTS';
export const IS_TRACKER_FILTER_LOADING = 'IS_TRACKER_FILTER_LOADING';
export const SET_TRACKER_SINGLE_PAGE_ITEMS_COUNT = 'SET_TRACKER_SINGLE_PAGE_ITEMS_COUNT';
export const SET_PRODUCT_TRACKER_PAGE_NUMBER = 'SET_PRODUCT_TRACKER_PAGE_NUMBER';
export const SET_RETRIEVE_PRODUCT_TRACK_GROUP = 'SET_RETRIEVE_PRODUCT_TRACK_GROUP';
export const SET_MENU_ITEM = 'SET_MENU_ITEM';
export const ADD_PRODUCT_TRACK_GROUP = 'ADD_PRODUCT_TRACK_GROUP';
export const UPDATE_PRODUCT_TRACK_GROUP = 'UPDATE_PRODUCT_TRACK_GROUP';
export const REMOVE_PRODUCT_TRACK_GROUP = 'REMOVE_PRODUCT_TRACK_GROUP';
export const UPDATE_TRACKED_PRODUCT = 'UPDATE_TRACKED_PRODUCT';
export const REMOVE_TRACKED_PRODUCT = 'REMOVE_TRACKED_PRODUCT';
export const REMOVE_PRODUCTS_IN_GROUP = 'REMOVE_PRODUCTS_IN_GROUP';
export const FILTER_TRACKED_PRODUCTS = 'FILTER_TRACKED_PRODUCTS';
export const SET_FILTER_SEARCH = 'SET_FILTER_SEARCH';
export const CHECKED_PRODUCTS_DATA = 'CHECKED_PRODUCTS_DATA';
export const VERIFYING_PRODUCT = 'VERIFYING_PRODUCT';
export const RESET_FILTER = 'RESET_FILTER';
export const SET_COST_DETAILS = 'SET_COST_DETAILS';

/*
  IMPORTANT: USE ONLY THE GIVEN VALUE BELOW IF CHANGING DEFAULT PERIOD 

  Today: “1”
  From last week: “7”
  From last month: “30”
  From last 3 months: “90”
  From last year: “365”

*/
export const DEFAULT_PERIOD = 30;

export const filterPeriods = {
  label: 'Period Reference',
  dataKey: 'period-reference',
  data: [
    {
      label: '7D',
      dataKey: 'week',
      value: 7,
    },
    {
      label: '30D',
      dataKey: 'month',
      value: 30,
    },
    {
      label: '90D',
      dataKey: '3-Month',
      value: 90,
    },
    {
      label: '365D',
      dataKey: 'year',
      value: 365,
    },
  ],
};

export const filterKeys: any = [
  // Basic KPI
  'avg_price',
  'avg_profit',
  'avg_margin',
  'avg_daily_sales',
  'avg_monthly_sales',
  'avg_roi',
  'avg_rank',
  'customer_reviews',
  'weight',
  'avg_daily_revenue',
  'avg_inventory',
  'avg_amazon_inventory',
];
// Meta data for each dataKeys above used for filers
export const trackerDataKeysMapping: any = {
  // Basic KPI
  avg_price: {
    filter: true,
    filterLabel: 'Buy Box Price',
    filterSign: '$',
    filterType: 'range',
    filterNegativeCheckbox: true,
  },
  avg_profit: {
    filter: true,
    filterLabel: 'Profit',
    filterSign: '$',
    filterType: 'range',
    filterNegativeCheckbox: true,
  },
  avg_margin: {
    filter: true,
    filterLabel: 'Profit Margin',
    filterSign: '%',
    filterType: 'range',
    filterNegativeCheckbox: true,
  },
  avg_daily_sales: {
    filter: true,
    filterLabel: 'Avg Daily Unit Sold',
    filterSign: '',
    filterType: 'range',
  },
  avg_monthly_sales: {
    filter: true,
    filterLabel: 'Avg Monthly Sales',
    filterSign: '',
    filterType: 'range',
  },
  avg_daily_revenue: {
    filter: true,
    filterLabel: 'Avg Daily Revenue',
    filterSign: '',
    filterType: 'range',
  },
  avg_roi: {
    filter: true,
    filterLabel: 'ROI',
    filterSign: '%',
    filterType: 'range',
  },
  avg_rank: {
    filter: true,
    filterLabel: 'Rank',
    filterSign: '',
    filterType: 'range',
  },
  weight: {
    filter: true,
    filterLabel: 'Rank',
    filterSign: '',
    filterType: 'range',
  },
  customer_reviews: {
    filter: true,
    filterLabel: 'Customer Reviews',
    filterSign: '',
    filterType: 'range',
  },
  rating: {
    filter: true,
    filterLabel: 'Rating',
    filterSign: '',
    filterType: 'checkbox',
    filterCheckboxWithSelectAll: true,
  },
  avg_inventory: {
    filter: true,
    filterLabel: 'Avg Inventory',
    filterSign: '',
    filterType: 'range',
  },
  avg_amazon_inventory: {
    filter: true,
    filterLabel: 'Avg Amazon Inventory',
    filterSign: '',
    filterType: 'range',
  },
  is_amazon_selling: {
    filter: true,
    filterLabel: 'Is Amazon Selling',
    filterSign: '',
    filterType: 'checkbox',
  },
};

export const dataKeyMapping: any = {
  // Basic KPI
  avg_profit: {
    text: 'Avg Unit Profit $',
    presetText: 'Max Unit Profit $',
    showSlider: true,
    showInputs: true,
    groupId: 'basic',
  },
  avg_margin: {
    text: 'Avg Margin %',
    presetText: 'Max Profit Margin %',
    showSlider: true,
    showInputs: true,
    groupId: 'basic',
  },
  avg_daily_sales: {
    text: 'Avg Units Per Month',
    presetText: 'Max Units Per Month',
    showSlider: true,
    showInputs: true,
    groupId: 'basic',
  },
  avg_roi: {
    text: ' Avg ROI',
    presetText: 'Max ROI',
    showSlider: true,
    showInputs: true,
    groupId: 'basic',
  },
};

export const presetsFilterData: any = {
  amazon: {
    label: 'Amazon',
    dataKey: 'amazon-choice-preset',
    data: [
      {
        label: 'Amazon Choice Products',
        dataKey: 'amazon-choice-products',
        isActive: false,
        type: 'preset',
      },
      {
        label: 'Amazon is NOT a seller',
        dataKey: 'not-amazon-products',
        isActive: false,
        type: 'preset',
      },
    ],
  },
  customizable: {
    label: 'Customizable',
    dataKey: 'customizable-preset',
    data: [
      {
        label: 'Listing generates',
        dataKey: 'avg_monthly_revenue',
        defaultOperation: '≥', //≤
        currency: '$',
        defaultValue: 1300,
        targetValue: '/month',
        isActive: false,
        type: 'preset',
      },
      {
        label: 'Profit is',
        dataKey: 'profit-monthly',
        defaultOperation: '≥',
        defaultValue: 300,
        currency: '$',
        targetValue: '/month',
        isActive: false,
        type: 'preset',
      },
      {
        label: 'Profit Margin is',
        dataKey: 'avg_margin',
        defaultOperation: '≥',
        defaultValue: 15,
        targetValue: '%',
        isActive: false,
        type: 'preset',
      },
      {
        label: 'Amazon price is',
        dataKey: 'avg_price',
        defaultOperation: '≥',
        defaultValue: 25,
        currency: '$',
        isActive: false,
        type: 'preset',
      },
      {
        label: 'Estimated Sales Volume is',
        dataKey: 'avg_monthly_sales',
        defaultOperation: '≥',
        defaultValue: 100,
        targetValue: '/month',
        isActive: false,
        type: 'preset',
      },
      {
        label: 'Product review is',
        dataKey: 'customer_reviews',
        defaultOperation: '≥',
        defaultValue: 20,
        targetValue: 'reviews',
        isActive: false,
        type: 'preset',
      },
    ],
  },
};

export const ratingDataMapping: any = ['1-star', '2-star', '3-star', '4-star', '5-star'];

export const amazonSelling: any = ['True', 'False'];

export const getProductTrackerCheckBoxData = (dk: any) => {
  if (dk === 'rating') {
    return ratingDataMapping;
  } else if (dk === 'is_amazon_selling') {
    return amazonSelling;
  }
};

export const groupKeyMapping: any = {
  basic: {
    text: 'Basic KPI',
  },
};

export const initalRange = { min: Number.MIN_SAFE_INTEGER, max: Number.MAX_SAFE_INTEGER };

export const initialFilterRanges = filterKeys.reduce((fr: any, dk: string) => {
  if (!fr[dk]) {
    fr[dk] = initalRange;
  }
  return fr;
}, {});

export const columnFilter = [
  {
    value: true,
    key: 'Select All',
    visible: true,
  },
  {
    value: true,
    key: 'Source',
    dataKey: 'source',
    visible: true,
  },
  {
    value: true,
    key: 'Avg Price',
    dataKey: 'avg_price',
    visible: true,
  },
  {
    value: true,
    key: 'Avg Profit',
    dataKey: 'avg_profit',
    visible: true,
  },
  {
    value: true,
    key: 'Avg Margin',
    dataKey: 'avg_margin',
    visible: true,
  },
  {
    value: true,
    key: 'Avg Daily Unit Sold',
    dataKey: 'avg_daily_sales',
    visible: true,
  },
  {
    value: true,
    key: 'Avg Daily Revenue',
    dataKey: 'avg_daily_revenue',
    visible: true,
  },
  {
    value: true,
    key: 'Avg ROI',
    dataKey: 'avg_roi',
    visible: true,
  },
  {
    value: true,
    key: 'Avg Daily Rank',
    dataKey: 'avg_rank',
    visible: true,
  },
  {
    value: true,
    key: 'Dimensions',
    dataKey: 'dimension',
    visible: true,
  },
  {
    value: true,
    key: 'Weight',
    dataKey: 'weight',
    visible: true,
  },
  {
    value: true,
    key: 'Reviews',
    dataKey: 'customer_reviews',
    visible: true,
  },
  {
    value: true,
    key: 'Rating',
    dataKey: 'rating',
    visible: true,
  },
  {
    key: 'Avg Inventory',
    dataKey: 'avg_inventory',
    value: true,
    visible: true,
  },
  {
    key: 'Is Amazon Selling',
    dataKey: 'is_amazon_selling',
    value: true,
    visible: true,
  },
  {
    key: 'Avg Amazon Inventory',
    dataKey: 'avg_amazon_inventory',
    value: true,
  },
  {
    value: true,
    key: '',
    dataKey: 'actions',
    visible: false,
  },
];

export const findMinMax = (products: any) => {
  const updatedFilterRanges = filterKeys.reduce((fr: any, dk: string) => {
    if (!fr[dk]) {
      const dkArray = products.map((p: any) => {
        return Number(p[dk]);
      });
      const minDk = Math.floor(Math.min(...dkArray) * 100) / 100;
      const maxDk = Math.ceil(Math.max(...dkArray) * 100) / 100;
      const min = minDk === Number.POSITIVE_INFINITY ? '' : minDk;
      const max = maxDk === Number.NEGATIVE_INFINITY ? '' : maxDk;
      const updatedDkRange = { min, max };
      fr[dk] = updatedDkRange;
    }
    return fr;
  }, {});
  return updatedFilterRanges;
};

export const findFilterProducts = (products: any, filterRanges: any) => {
  const filterRange = (product: any) =>
    filterKeys.every(
      (dataKey: any) =>
        Number(product[dataKey]) >= Number(filterRanges[dataKey].min) &&
        Number(product[dataKey]) <= Number(filterRanges[dataKey].max)
    );
  const updatedFilterProducts = products.filter(filterRange);
  return updatedFilterProducts;
};

export const filterProductsByGroupId = (products: any, productTrackGroupId: any) => {
  const filteredProducts =
    productTrackGroupId !== null
      ? productTrackGroupId !== -1
        ? products.filter((product: any) => productTrackGroupId === product.product_track_group_id)
        : products.filter((product: any) => null === product.product_track_group_id)
      : products;
  return filteredProducts;
};

export const customFilterOperation = (operation: string, prodValue: any, filterValue: any) => {
  switch (operation) {
    case '≤':
      return Number(prodValue) <= Number(filterValue);
    case '≥':
      return Number(prodValue) >= Number(filterValue);
    case '=':
      return Number(prodValue) === Number(filterValue);
    default:
      return false;
  }
};

const getRangedFilteredProducts = (product: any, rangeFilter: any) => {
  return rangeFilter.every(
    (filter: any) =>
      filter.range !== undefined &&
      Number(product[filter.dataKey]) >= Number(filter.range.min) &&
      Number(product[filter.dataKey]) <= Number(filter.range.max)
  );
};

export const getCustomizableFilteredProducts = (product: any, customizableFilter: any) => {
  let result = true;
  _.filter(customizableFilter, filter => {
    if (result) {
      /*
      show amazon choice products if checked, if not, show all
      */
      if (filter.dataKey === 'amazon-choice-products') {
        result = !_.isEmpty(product.amazon_choice);
      }
      /*
      show NOT selling products if checked, if not, show all
      */
      if (filter.dataKey === 'not-amazon-products') {
        result = !product.is_amazon_selling;
      }

      // for keys with computation that doesn't exist in filter slider
      if (filter.dataKey === 'avg_monthly_revenue') {
        const monthly_revenue = product.avg_daily_revenue * 30;
        if (!filter.isActive) result = true;
        else {
          result = customFilterOperation(filter.operation, monthly_revenue, filter.value);
        }
      }
      if (filter.dataKey === 'profit-monthly') {
        const profitMonthly = product.avg_profit * product.avg_monthly_sales;
        if (!filter.isActive) result = true;
        else {
          result = customFilterOperation(filter.operation, profitMonthly, filter.value);
        }
      }

      // for sliders with keys same with customize filter for ex. price
      for (const key of filterKeys) {
        if (filter.dataKey === key) {
          if (!filter.isActive) result = true;
          else {
            if (product[key] === null) result = true;
            else {
              result = customFilterOperation(filter.operation, product[key], filter.value);
            }
          }
        }
      }
    }
  });
  return result;
};

const getCheckboxFilteredProducts = (product: any, checkboxFilter: any) => {
  return checkboxFilter.every(
    (filter: any) =>
      filter.value.includes(product[filter.dataKey]) ||
      (_.isEmpty(product[filter.dataKey]) && filter.value.includes('Others')) ||
      //only for is amazon selling checkbox filter
      filter.value.toLowerCase().includes(product[filter.dataKey]) ||
      //only for rating checkbox filter
      (filter.dataKey === 'rating' &&
        filter.value.includes(JSON.stringify(Math.trunc(product.rating))))
  );
};

export const findFilteredProducts = (products: any, filterData: NewFilterModel[]) => {
  if (_.isEmpty(filterData)) return products;
  else {
    const rangeFilter = _.filter(filterData, filter => filter.isActive && filter.type === 'range');
    const presetFilter = _.filter(filterData, filter => filter.type === 'preset');
    const checkboxFilter = _.filter(
      filterData,
      filter => filter.isActive && filter.type === 'checkbox'
    );
    const filteredProducts = _.filter(products, (product: any) => {
      return (
        getCheckboxFilteredProducts(product, checkboxFilter) &&
        getRangedFilteredProducts(product, rangeFilter) &&
        getCustomizableFilteredProducts(product, presetFilter)
      );
    });
    return filteredProducts;
  }
};

export const searchFilteredProduct = (products: any, value: string) => {
  const updatedFilterProducts = _.filter(products, product => {
    return (
      (product.title && product.title.toLowerCase().indexOf(value.toLowerCase()) !== -1) ||
      PRODUCT_ID_TYPES.map(
        pidType =>
          product[pidType.toLowerCase()] &&
          product[pidType.toLowerCase()].toLowerCase().indexOf(value.toLowerCase()) !== -1
      ).includes(true)
    );
  });
  return updatedFilterProducts;
};
