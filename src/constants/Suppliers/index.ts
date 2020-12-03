import _ from 'lodash';
import { NewFilterModel } from '../../interfaces/Filters';
import { filterKeys } from '../Tracker';
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

export const productCategories: any = [
  'Amazon Launchpad',
  'Appliances',
  'Apps & Games',
  'Arts,Crafts & Sewing',
  'Audio & Video Connectors & Adapters',
  'Automotive',
  'Baby',
  'Beauty & Personal Care',
  'Books',
  'Camera & Photo',
  'CDs & Vinyl',
  'Cell Phones & Accessories',
  'Clothing,Shoes & Jewelry',
  'Collectible & Fine Arts',
  'Computers & Accessories',
  'Earbud & In-Ear Headphones',
  'Electronics',
  'Grocery & Gourmet Food',
  'Handmade Products',
  'Health & Household',
  'Home & Kitchen',
  'Industrial & Scientific',
  'Kindle store',
  'Kitchen & Dining',
  'Lock Picking & Theft Devices',
  'Luggage & Travel',
  'Magazine Subscription',
  'Medical Devices & Accessories',
  'Movies & TV',
  'Musical Instruments',
  'Office Products',
  'Outdoors',
  'Patio,Lawn & Garden',
  'Pet Supplies',
  'Software',
  'Sports & Outdoors',
  'Tools & Home Improvement',
  'Toys & Games',
  'Video Games',
  'Others',
];

export const sizeTiers: any = [
  'Small standard-size',
  'Large standard-size',
  'Small oversize',
  'Medium oversize',
  'Large oversize',
  'Special oversize',
  'Others',
];

export const ratings: any = ['1-star', '2-star', '3-star', '4-star', '5-star'];

export const amazonSelling: any = ['True', 'False'];

export const getProfitFinderCheckBoxData = (dk: any) => {
  if (dk === 'amazon_category_name') {
    return productCategories;
  } else if (dk === 'size_tier') {
    return sizeTiers;
  } else if (dk === 'rating') {
    return ratings;
  } else if (dk === 'is_amazon_selling') {
    return amazonSelling;
  }
};

export const customizablePresetData: any = [
  {
    label: 'Listing generates',
    dataKey: 'monthly_revenue',
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
    dataKey: 'multipack_margin',
    defaultOperation: '≥',
    defaultValue: 15,
    targetValue: '%',
    isActive: false,
    type: 'preset',
  },
  {
    label: 'Amazon price is',
    dataKey: 'price',
    defaultOperation: '≥',
    defaultValue: 25,
    currency: '$',
    isActive: false,
    type: 'preset',
  },
  {
    label: 'Estimated Sales Volume is',
    dataKey: 'sales_monthly',
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
];

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

export const supplierDataKeys: any = [
  'price',
  'product_cost',
  'fees',
  'multipack_profit',
  'multipack_margin',
  'monthly_revenue',
  'fba_fee',
  'referral_fee',
  'variable_closing_fee',
  'num_fba_new_offers',
  'num_fbm_new_offers',
  'low_new_fba_price',
  'low_new_fbm_price',
  'multipack_roi',
  'rank',
  'sales_monthly',
  'customer_reviews',
];

// Meta data for each dataKeys above used for filers
export const supplierDataKeysMapping: any = {
  // Basic KPI
  price: {
    filter: true,
    filterLabel: 'Buy Box Price',
    filterSign: '$',
    filterType: 'range',
    filterNegativeCheckbox: true,
  },
  product_cost: {
    filter: true,
    filterLabel: 'Cost',
    filterSign: '$',
    filterType: 'range',
  },
  fees: {
    filter: true,
    filterLabel: 'Total Fees',
    filterSign: '$',
    filterType: 'range',
  },
  multipack_profit: {
    filter: true,
    filterLabel: 'Profit',
    filterSign: '$',
    filterType: 'range',
    filterNegativeCheckbox: true,
  },
  multipack_margin: {
    filter: true,
    filterLabel: 'Profit Margin',
    filterSign: '%',
    filterType: 'range',
    filterNegativeCheckbox: true,
  },
  monthly_revenue: {
    filter: true,
    filterLabel: 'Monthly Revenue',
    filterSign: '$',
    filterType: 'range',
  },
  fba_fee: {
    filter: true,
    filterLabel: 'FBA fee',
    filterSign: '$',
    filterType: 'range',
  },
  referral_fee: {
    filter: true,
    filterLabel: 'Referral fee',
    filterSign: '$',
    filterType: 'range',
  },
  variable_closing_fee: {
    filter: true,
    filterLabel: 'Variable Closing Fee',
    filterSign: '',
    filterType: 'range',
  },
  num_fba_new_offers: {
    filter: true,
    filterLabel: 'Num New FBA Offers',
    filterSign: '',
    filterType: 'range',
  },
  num_fbm_new_offers: {
    filter: true,
    filterLabel: 'Num New FBM Offers',
    filterSign: '',
    filterType: 'range',
  },
  low_new_fba_price: {
    filter: true,
    filterLabel: 'Low New FBA Offers',
    filterSign: '$',
    filterType: 'range',
  },
  low_new_fbm_price: {
    filter: true,
    filterLabel: 'Low New FBM Offers',
    filterSign: '$',
    filterType: 'range',
  },
  multipack_quantity: {
    filter: true,
    filterLabel: 'Package Quantity',
    filterSign: '',
    filterType: 'range',
  },
  multipack_roi: {
    filter: true,
    filterLabel: 'ROI',
    filterSign: '%',
    filterType: 'range',
  },
  rank: {
    filter: true,
    filterLabel: 'Rank',
    filterSign: '',
    filterType: 'range',
  },
  sales_monthly: {
    filter: true,
    filterLabel: 'Monthly Sales Estimate',
    filterSign: '',
    filterType: 'range',
  },
  amazon_category_name: {
    filter: true,
    filterLabel: 'Product Category',
    filterSign: '',
    filterType: 'checkbox',
    filterBoxSize: 'lg',
    filterCheckboxWithSelectAll: true,
  },
  size_tier: {
    filter: true,
    filterLabel: 'Product Size Tiers',
    filterSign: '',
    filterType: 'checkbox',
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
  is_amazon_selling: {
    filter: true,
    filterLabel: 'Is Amazon Selling',
    filterSign: '',
    filterType: 'checkbox',
  },
};

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
  multipack_margin: {
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

export const getCustomizableFilteredProducts = (product: any, customizableFilter: any) => {
  let result = true;
  _.filter(customizableFilter, filter => {
    if (result) {
      // for keys with computation that doesn't exist in filter slider
      if (filter.dataKey === 'profit-monthly') {
        const profitMonthly = product.profit * product.sales_monthly;
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

export const findNonProfitableProducts = (product: any, profitabilityFilter: any) => {
  if (!profitabilityFilter.active || profitabilityFilter.value !== 'Non-Profitable Products')
    return true;
  else {
    return profitabilityFilter.value === 'Non-Profitable Products' && Number(product.profit) !== 0;
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

const getCheckboxFilteredProducts = (product: any, checkboxFilter: any) => {
  return checkboxFilter.every(
    (filter: any) =>
      // Default checkbox filter like size tier
      filter.value.includes(product[filter.dataKey]) ||
      (_.isEmpty(product[filter.dataKey]) && filter.value.includes('Others')) ||
      //only for is amazon selling checkbox filter
      filter.value.toLowerCase().includes(product[filter.dataKey]) ||
      //only for amazon-category checkbox filter
      (filter.dataKey === 'amazon_category_name' &&
        productCategories.indexOf(product.amazon_category_name) === -1 &&
        filter.value.includes('Others')) ||
      //only for rating checkbox filter
      (filter.dataKey === 'rating' &&
        filter.value.includes(JSON.stringify(Math.trunc(product.rating))))
  );
};

const getNotFoundOnAmazon = (product: any, notFoundOnAmazonFilter: any) => {
  if (!_.isEmpty(notFoundOnAmazonFilter)) {
    return notFoundOnAmazonFilter[0].value === product.title;
  } else {
    return true;
  }
};

export const findFilteredProducts = (products: any, filterData: NewFilterModel[]) => {
  if (_.isEmpty(filterData)) return products;
  else {
    const rangeFilter = _.filter(filterData, filter => filter.isActive && filter.type === 'range');
    const checkboxFilter = _.filter(
      filterData,
      filter => filter.isActive && filter.type === 'checkbox'
    );
    const presetFilter = _.filter(filterData, filter => filter.type === 'preset');
    const notFoundOnAmazonFilter = _.filter(
      filterData,
      filter => filter.type === 'profitability-preset' && filter.value === 'Not found on Amazon'
    );
    const filteredProducts = _.filter(products, (product: any) => {
      return (
        getNotFoundOnAmazon(product, notFoundOnAmazonFilter) &&
        getRangedFilteredProducts(product, rangeFilter) &&
        getCheckboxFilteredProducts(product, checkboxFilter) &&
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
