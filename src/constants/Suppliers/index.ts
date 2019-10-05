export const SET_SUPPLIERS = 'SET_SUPPLIERS';
export const RESET_SUPPLIERS = 'RESET_SUPPLIERS';
export const SET_TIME_EFFICIENCY = '/SYN/GET_TIME_EFFICIENCY';
export const SET_SAVE_SUPPLIER_NAME_AND_DESCRIPTION = '/SYN/SET_SAVE_SUPPLIER_NAME_AND_DESCRIPTION';
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
export const UPDATE_SUPPLIER_PRODUCT = 'UPDATE_SUPPLIER_PRODUCT';
export const UPDATE_SUPPLIER_FILTER_RANGES = 'UPDATE_SUPPLIER_FILTER_RANGES';
export const SET_SUPPLIER_SINGLE_PAGE_ITEMS_COUNT = 'SET_SUPPLIER_SINGLE_PAGE_ITEMS_COUNT';

// Two types of settings:
// - Display features
// - Filters
// --- Range
// --- Checklist

// dataKeys is for:
// - getting meta data from dataKeyMapping
// - looking up min/max range values for a given setting (give the list of products)
// - storing and looking up current setting value in component's local state
// TODO: Rename to filterSettingKeys (?)
export const dataKeys: any = [
  // Basic KPI
  'profit',
  'margin',
  'sales_monthly',
  'profit_monthly',
  // Revenue
  //'monthly_revenue',
  //'roi_inventory',
];

// Meta data for each dataKeys above
export const dataKeyMapping: any = {
  // Basic KPI
  profit: {
    text: 'Unit Profit',
    presetText: 'Max Profit',
    showSlider: true,
    showInputs: true,
    groupId: 'basic',
  },
  margin: {
    text: 'Margin',
    presetText: 'Max Margin',
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
    text: 'Profit Per Month',
    presetText: 'Max Profit Per Month',
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
  if (!fr[dk]) fr[dk] = initalRange;
  return fr;
}, {});

// Returns an array of groups, each containing an array of filters
// under the group.filters property.
export const findFiltersGrouped = () => {
  let groups: any = {};

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
  //console.log('[findMinMaxRange] products', products);

  const updatedFilterRanges = dataKeys.reduce((fr: any, dk: string) => {
    if (!fr[dk]) {
      const dkArray = products.map((p: any) => Number(p[dk]));
      const minDK = Math.floor(Math.min(...dkArray));
      const maxDk = Math.ceil(Math.max(...dkArray));
      const updatedDkRange = { min: minDK, max: maxDk };
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

// Add hardcoded data to products that new design expects
export const addTempDataToProducts = (products: any) => {
  return products.map((product: any) => {
    return {
      ...product,
      price: 23.99,
      categoryRank: 421,
      countryImg: '/static/media/flag_icon.30aeec5a.svg',
      ratings: 9.3,
      // We have product.amazon_category_name but new design needs a breadcrumb
      sections: [
        { key: 'Toys & Games', content: 'Toys & Games', link: true },
        { key: 'Learning & Education', content: 'Learning & Education', link: true },
      ],
      seller: 'Top Bright',
      starRatings: 4,
      totalReviews: 500,
      // TODO: Merge this into one object
      // which is needed for column render method
      // or pass full product object to render method and don't require a dataKey (do we do this already?)
      unitSoldPerDay: 192,
      unitSoldPerMonth: 5777,
      // Fields expected by new filters design
      // Give it some random variation so filters have a range
      monthly_revenue: Math.floor(Math.random() * 1000) + 1,
      roi_inventory: Math.floor(Math.random() * 100) + 1,
    };
  });
};
