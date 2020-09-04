import _ from 'lodash';
import { FilterData } from '../../interfaces/Filters';
export const SET_PRODUCT_TRACKER_DETAILS = 'SET_PRODUCT_TRACKER_DETAILS';
export const IS_LOADING_TRACKER_PRODUCTS = 'IS_LOADING_TRACKER_PRODUCTS';
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
export const IS_PRODUCT_TRACKED = 'IS_PRODUCT_TRACKED';
export const VERIFYING_PRODUCT = 'VERIFYING_PRODUCT';
export const RESET_FILTER = 'RESET_FILTER';

/*
  IMPORTANT: USE ONLY THE GIVEN VALUE BELOW IF CHANGING DEFAULT PERIOD 

  Today: “1”
  From last week: “7”
  From last month: “30”
  From last 3 months: “90”
  From last year: “365”

*/
export const DEFAULT_PERIOD = 30;

export const filterPeriods: FilterData = {
  label: 'Period Reference',
  dataKey: 'period-reference',
  radio: true,
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
  'avg_roi',
  'avg_rank',
  'customer_reviews',
];

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

export const customFilterOperation = (
  operation: string,
  prodValue: number,
  filterValue: number
) => {
  console.log('prodValue PT: ', prodValue, filterValue);
  switch (operation) {
    case '≤':
      return prodValue <= filterValue;
    case '≥':
      return prodValue >= filterValue;
    case '=':
      return Number(prodValue) === Number(filterValue);
    default:
      return false;
  }
};

export const listingGeneratesCustomizableFilter = (product: any, customizableFilter: any) => {
  const generatesValue = product.avg_price * product.avg_daily_sales;
  let result = true;
  _.filter(customizableFilter, filter => {
    if (filter.dataKey === 'listing-monthly' && filter.active) {
      if (!filter.active) return result;
      else {
        result = customFilterOperation(filter.operation, generatesValue, filter.value);
      }
    }
  });
  return result;
};

export const reviewsCustomizableFilter = (product: any, customizableFilter: any) => {
  console.log('customizableFilter PT: ', customizableFilter);
  let result = true;
  _.filter(customizableFilter, filter => {
    if (filter.dataKey === 'customer_reviews' && filter.active) {
      if (!filter.active) return result;
      else {
        if (product.customer_reviews === null) return result;
        else {
          result = customFilterOperation(filter.operation, product.customer_reviews, filter.value);
        }
      }
    }
  });
  return result;
};

export const findFilteredProducts = (products: any, filterData: any) => {
  console.log('products PT: ', products);
  const updatedFilterProducts = _.filter(products, product => {
    return filterData !== undefined
      ? /*
          show amazon choice products if checked, if not, show all
        */
        (filterData.amazonChoice.indexOf('amazon-choice-products') === -1 ||
          (filterData.amazonChoice.indexOf('amazon-choice-products') !== -1 &&
            !_.isEmpty(product.amazon_choice))) &&
          /*
          show NOT selling products if checked, if not, show all
        */
          (filterData.amazonChoice.indexOf('not-amazon-products') === -1 ||
            (filterData.amazonChoice.indexOf('not-amazon-products') !== -1 &&
              !product.is_amazon_selling)) &&
          (filterData.reviews.length === 5 ||
            filterData.reviews.indexOf(JSON.stringify(Math.trunc(product.rating))) !== -1) &&
          listingGeneratesCustomizableFilter(product, filterData.customizable) &&
          reviewsCustomizableFilter(product, filterData.customizable) &&
          filterKeys.every(
            (dataKey: any) =>
              Number(product[dataKey]) >= Number(filterData[dataKey].min) &&
              Number(product[dataKey]) <= Number(filterData[dataKey].max)
          )
      : products;
  });
  return updatedFilterProducts;
};

export const searchFilteredProduct = (products: any, value: string) => {
  const updatedFilterProducts = _.filter(products, product => {
    return (
      (product.title && product.title.toLowerCase().indexOf(value.toLowerCase()) !== -1) ||
      (product.asin && product.asin.toLowerCase().indexOf(value.toLowerCase()) !== -1) ||
      (product.upc && product.upc.toLowerCase().indexOf(value.toLowerCase()) !== -1) ||
      (product.ean && product.ean.toLowerCase().indexOf(value.toLowerCase()) !== -1)
    );
  });
  return updatedFilterProducts;
};
