import _ from 'lodash';
import { PRODUCT_ID_TYPES } from '../UploadSupplier';

export const SET_SUPPLIERS = 'SET_SUPPLIERS';
export const RESET_SUPPLIERS = 'RESET_SUPPLIERS';
export const SET_TIME_EFFICIENCY = '/SYN/GET_TIME_EFFICIENCY';
export const SET_SUPPLIER_NAME = '/SYN/SET_SUPPLIER_NAME';
export const SELECT_SUPPLIER = 'SELECT_SUPPLIER';
export const UPDATE_SUPPLIER = 'UPDATE_SUPPLIER';
export const ADD_SUPPLIER = 'ADD_SUPPLIER';
export const SET_SUPPLIERS_TABLE_COLUMNS = 'SET_SUPPLIERS_TABLE_COLUMNS';
export const SET_SUPPLIERS_TABLE_TAB = 'SET_SUPPLIERS_TABLE_TAB';
export const SET_SUPPLIER_DETAILS = 'SET_SUPPLIER_DETAILS';
export const IS_LOADING_SUPPLIER_PRODUCTS = 'IS_LOADING_SUPPLIER_PRODUCTS';
export const SET_SUPPLIER_PRODUCTS = 'SET_SUPPLIER_PRODUCTS';
export const RESET_SUPPLIER_PRODUCTS = 'RESET_SUPPLIER_PRODUCTS';
export const SET_SUPPLIER_PRODUCTS_TRACK_DATA = 'SET_SUPPLIER_PRODUCTS_TRACK_DATA';
export const RESET_SUPPLIER = 'RESET_SUPPLIER';
export const SET_SUPPLIER_PRODUCT_TRACKER_GROUP = 'SET_SUPPLIER_PRODUCT_TRACKER_GROUP';
export const UPDATE_SUPPLIER_PRODUCT_TRACK = 'UPDATE_SUPPLIER_PRODUCT_TRACK';
export const UPDATE_SUPPLIER_PRODUCT_TRACKS = 'UPDATE_SUPPLIER_PRODUCT_TRACKS';
export const UPDATE_SUPPLIER_FILTER_RANGES = 'UPDATE_SUPPLIER_FILTER_RANGES';
export const SET_SUPPLIER_SINGLE_PAGE_ITEMS_COUNT = 'SET_SUPPLIER_SINGLE_PAGE_ITEMS_COUNT';
export const SUPPLIER_QUOTA = 'SUPPLIER_QUOTA';
export const FILTER_SUPPLIER_PRODUCTS = 'FILTER_SUPPLIER_PRODUCTS';
export const SEARCH_SUPPLIER_PRODUCTS = 'SEARCH_SUPPLIER_PRODUCTS';
export const UPDATE_PROFIT_FINDER_PRODUCTS = 'UPDATE_PROFIT_FINDER_PRODUCTS';
export const SET_SUPPLIER_PAGE_NUMBER = 'SET_SUPPLIER_PAGE_NUMBER';
export const SET_STICKY_CHART = 'SET_STICKY_CHART';
export const SET_CONTEXT_SCROLL = 'SET_CONTEXT_SCROLL';
export const SET_SCROLL_TOP = 'SET_SCROLL_TOP';
export const SET_IS_SCROLL = 'SET_IS_SCROLL';
export const SET_ACTIVE_COLUMN = 'SET_ACTIVE_COLUMN';
export const SET_SORT_COLUMN = 'SET_SORT_COLUMN';
export const SET_PRODUCTS_LOADING_DATA_BUSTER = 'SET_PRODUCTS_LOADING_DATA_BUSTER';
export const UPDATE_SUPPLIER_PRODUCT = 'UPDATE_SUPPLIER_PRODUCT';
export const GET_ACTIVE_EXPORT_FILES = 'GET_ACTIVE_EXPORT_FILES';
export const SET_PF_PAGE_NO = 'SET_PF_PAGE_NO';
export const SET_PF_PAGE_SIZE = 'SET_PF_PAGE_SIZE';
export const SET_PF_PAGE_COUNT = 'SET_PF_PAGE_COUNT';

export const dataKeys: any = [
  // Basic KPI
  'profit',
  'margin',
  'sales_monthly',
  'profit_monthly',

  // Revenue
  // 'monthly_revenue',
  // 'roi_inventory',
];

export const supplierDataKeys: any = ['price', 'profit', 'roi', 'sales_monthly', 'margin', 'rank'];
// Meta data for each dataKeys above
export const dataKeyMapping: any = {
  // Basic KPI
  profit: {
    text: 'Unit Profit ($)',
    presetText: 'Max Profit ($)',
    showSlider: true,
    showInputs: true,
    groupId: 'basic',
  },
  margin: {
    text: 'Profit Margin (%)',
    presetText: 'Max Profit Margin (%)',
    showSlider: true,
    showInputs: true,
    groupId: 'basic',
  },
  sales_monthly: {
    text: 'Unit Sales Per Month',
    presetText: 'Max Unit Sales Per Month',
    showSlider: true,
    showInputs: true,
    groupId: 'basic',
  },
  profit_monthly: {
    text: 'Profit Per Month ($)',
    presetText: 'Max Profit Per Month ($)',
    showSlider: true,
    showInputs: true,
    groupId: 'basic',
  },
  // Revenue
  monthly_revenue: {
    text: 'Avg Monthly Revenue',
    presetText: 'Max vg Monthly Revenue',
    showSlider: false,
    showInputs: true,
    groupId: 'revenue',
  },
  roi_inventory: {
    text: 'ROI Inventory',
    presetText: 'Max ROI Inventory',
    showSlider: true,
    showInputs: false,
    groupId: 'revenue',
  },
};

export const groupKeyMapping: any = {
  basic: {
    text: 'Basic KPI',
  },
  revenue: {
    text: 'Revenue',
  },
};

export const initalRange = { min: Number.MIN_SAFE_INTEGER, max: Number.MAX_SAFE_INTEGER };

export const initialFilterRanges = dataKeys.reduce((fr: any, dk: string) => {
  if (!fr[dk]) {
    fr[dk] = initalRange;
  }
  return fr;
}, {});

// Returns an array of groups, each containing an array of filters
// under the group.filters property.
export const findFiltersGrouped = () => {
  const groups: any = {};

  // Iterate through dataKeys and sort into groups
  // along with extended data from dataKeyMapping
  dataKeys.forEach((dk: string) => {
    const data = dataKeyMapping[dk];
    const groupId: string = data.groupId;
    if (!groups[groupId]) {
      groups[groupId] = {
        ...groupKeyMapping[groupId],
        filters: [],
      };
    }

    // Push data into group.filters with key as id
    groups[groupId].filters.push({ id: dk, ...data });
  });

  // Convert object to array and add key as id
  const groupsArray = Object.keys(groups).map(key => {
    return {
      id: key,
      ...groups[key],
    };
  });

  return groupsArray;
};

export const findMinMaxRange = (products: any) => {
  const updatedFilterRanges = dataKeys.reduce((fr: any, dk: string) => {
    if (!fr[dk]) {
      const dkArray = products.map((p: any) => Number(p[dk]));
      const minDk = Math.floor(Math.min(...dkArray));
      const maxDk = Math.ceil(Math.max(...dkArray));
      const min = minDk === Number.POSITIVE_INFINITY ? '' : minDk;
      const max = maxDk === Number.NEGATIVE_INFINITY ? '' : maxDk;
      const updatedDkRange = { min, max };
      fr[dk] = updatedDkRange;
    }
    return fr;
  }, {});
  return updatedFilterRanges;
};

export const findMinMax = (products: any) => {
  const updatedFilterRanges = supplierDataKeys.reduce((fr: any, dk: string) => {
    if (!fr[dk]) {
      const dkArray = products.map((p: any) => Number(p[dk]));
      const minDk = Math.floor(Math.min(...dkArray));
      const maxDk = Math.ceil(Math.max(...dkArray));
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
    dataKeys.every(
      (dataKey: any) =>
        Number(product[dataKey]) >= Number(filterRanges[dataKey].min) &&
        Number(product[dataKey]) <= Number(filterRanges[dataKey].max)
    );
  const updatedFilterProducts = products.filter(filterRange);
  return updatedFilterProducts;
};

export const customFilterOperation = (
  operation: string,
  prodValue: number,
  filterValue: number
) => {
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

export const customizableFilter = (product: any, customizableFilter: any) => {
  let result = true;
  _.filter(customizableFilter, filter => {
    if (result) {
      // for keys with computation that doesn't exist in filter slider
      if (filter.dataKey === 'listing-monthly' && filter.active) {
        const generatesValue = product.price * product.sales_monthly;
        if (!filter.active) result = true;
        else {
          result = customFilterOperation(filter.operation, generatesValue, filter.value);
        }
      }
      if (filter.dataKey === 'profit-monthly' && filter.active) {
        const profitMonthly = product.profit * product.sales_monthly;
        if (!filter.active) result = true;
        else {
          result = customFilterOperation(filter.operation, profitMonthly, filter.value);
        }
      }
      if (filter.dataKey === 'customer_reviews' && filter.active) {
        if (!filter.active) result = true;
        else {
          if (product.customer_reviews === null) result = true;
          else {
            result = customFilterOperation(
              filter.operation,
              product.customer_reviews,
              filter.value
            );
          }
        }
      }
      // for sliders with keys same with customize filter for ex. price
      for (const keys of supplierDataKeys) {
        if (keys === filter.dataKey && filter.active && filter.operation === '=') {
          result = Number(product[filter.dataKey]) === Number(filter.value);
        }
      }
    }
  });
  return result;
};

export const findNonProfitableProducts = (product: any, profitabilityFilter: any) => {
  if (!profitabilityFilter.active || profitabilityFilter.value !== 'Non-Profitable Products')
    return true;
  else {
    return profitabilityFilter.value === 'Non-Profitable Products' && Number(product.profit) !== 0;
  }
};

export const findFilteredProducts = (products: any, filterData: any) => {
  const updatedFilterProducts = _.filter(products, product => {
    return !_.isEmpty(filterData) || !_.isEmpty(filterData.allFilter)
      ? // show if product's category matched one of filter's categories
        (filterData.allFilter.indexOf(product.amazon_category_name) !== -1 ||
          //show if product's category is empty & other's filter is active
          (_.isEmpty(product.amazon_category_name) &&
            filterData.allFilter.indexOf('Others') !== -1) ||
          //show if product's category doesn't exist in filter's categories if other's filter is active
          (filterData.categories.indexOf(product.amazon_category_name) === -1 &&
            filterData.allFilter.indexOf('Others') !== -1)) &&
          //show product size tier is empty and others is checked
          ((_.isEmpty(product.size_tier) && filterData.sizeTierFilter.indexOf('Others') !== -1) ||
            //show product size tier is matched by one of size tiers
            filterData.sizeTierFilter.indexOf(product.size_tier) !== -1) &&
          //customizable filters
          customizableFilter(product, filterData.customizable) &&
          //NonProfitable filters
          findNonProfitableProducts(product, filterData.profitabilityFilter) &&
          //Product's Min and Max must be valid from filter's min & max
          supplierDataKeys.every(
            (dataKey: any) =>
              Number(product[dataKey]) >= Number(filterData[dataKey].min) &&
              Number(product[dataKey]) <= Number(filterData[dataKey].max)
          )
      : null;
  });
  return updatedFilterProducts;
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
// Add temporary data to products during development
export const addTempDataToProducts = (products: any) => {
  return products.map((product: any) => {
    return {
      ...product,
      categoryRank: 421,
      countryImg: '/static/media/flag_icon.30aeec5a.svg',
      ratings: 9.3,
      sections: [
        { key: 'Toys & Games', content: 'Toys & Games', link: true },
        { key: 'Learning & Education', content: 'Learning & Education', link: true },
      ],
      starRatings: 4,
      totalReviews: 500,
      // unitSoldPerDay: 192,
      // unitSoldPerMonth: 5777,
      // Give these some random variation
      monthly_revenue: Math.floor(Math.random() * 1000),
      roi_inventory: Math.floor(Math.random() * 100),
      topSeller: Math.floor(Math.random() * 2) === 1,
      prime: Math.floor(Math.random() * 2) === 1,
      amazonChoice: Math.floor(Math.random() * 2) === 1,
    };
  });
};

export const EXPORT_FORMATS = [
  { key: 'csv', value: 'csv', text: '.CSV' },
  { key: 'xlsx', value: 'xlsx', text: '.XLSX' },
];

export const EXPORT_DATA = [{ key: 'all', value: 'all', text: 'All Results' }];
