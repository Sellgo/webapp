export const SET_PRODUCT_TRACKER_DETAILS = 'SET_PRODUCT_TRACKER_DETAILS';
export const IS_LOADING_TRACKER_PRODUCTS = 'IS_LOADING_TRACKER_PRODUCTS';
export const UPDATE_TRACKER_FILTER_RANGES = 'UPDATE_TRACKER_FILTER_RANGES';
export const SET_TRACKER_SINGLE_PAGE_ITEMS_COUNT = 'SET_TRACKER_SINGLE_PAGE_ITEMS_COUNT';
export const SET_PRODUCT_TRACKER_PAGE_NUMBER = 'SET_PRODUCT_TRACKER_PAGE_NUMBER';
export const SET_RETRIEVE_PRODUCT_TRACK_GROUP = 'SET_RETRIEVE_PRODUCT_TRACK_GROUP';
export const SET_MENU_ITEM = 'SET_MENU_ITEM';
export const ADD_PRODUCT_TRACK_GROUP = 'ADD_PRODUCT_TRACK_GROUP';
export const UPDATE_PRODUCT_TRACK_GROUP = 'UPDATE_PRODUCT_TRACK_GROUP';
export const REMOVE_PRODUCT_TRACK_GROUP = 'REMOVE_PRODUCT_TRACK_GROUP';
export const UPDATE_TRACKED_PRODUCT = 'UPDATE_TRACKED_PRODUCT';
export const REMOVE_TRACKED_PRODUCT = 'REMOVE_TRACKED_PRODUCT';

export const dataKeys: any = [
  // Basic KPI
  'avg_profit',
  'avg_margin',
  'avg_daily_sales',
  'avg_roi',
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
  const updatedFilterRanges = dataKeys.reduce((fr: any, dk: string) => {
    if (!fr[dk]) {
      const dkArray = products.map((p: any) => {
        return Number(p[dk]);
      });
      const minDk = Math.floor((Math.min(...dkArray) * 100) / 100);
      const maxDk = Math.ceil((Math.max(...dkArray) * 100) / 100);
      const min = minDk === Number.POSITIVE_INFINITY ? '' : minDk;
      const max = maxDk === Number.NEGATIVE_INFINITY ? '' : maxDk;
      const updatedDkRange = { min, max };
      fr[dk] = updatedDkRange;
    }
    return fr;
  }, {});
  return updatedFilterRanges;
};

export const parseMinMaxRange = (minMaxes: any) => {
  let parsedMinMaxes = dataKeys.reduce(
    (a: any, key: any) =>
      Object.assign(a, { [key]: { min: Number.MIN_SAFE_INTEGER, max: Number.MAX_SAFE_INTEGER } }),
    {}
  );
  dataKeys.map((kpi: any) => {
    parsedMinMaxes[kpi]['min'] = Math.floor(minMaxes[`min_${kpi}`] * 100) / 100;
    parsedMinMaxes[kpi]['max'] = Math.ceil(minMaxes[`max_${kpi}`] * 100) / 100;
  });
  return parsedMinMaxes;
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

export const filterProductsByGroupId = (products: any, productTrackGroupId: any) => {
  const filteredProducts =
    productTrackGroupId !== null
      ? productTrackGroupId !== -1
        ? products.filter(
            (product: any) => productTrackGroupId === product['product_track_group_id']
          )
        : products.filter((product: any) => null === product['product_track_group_id'])
      : products;
  return filteredProducts;
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
      //unitSoldPerDay: 192,
      //unitSoldPerMonth: 5777,
      // Give these some random variation
      monthly_revenue: Math.floor(Math.random() * 1000),
      roi_inventory: Math.floor(Math.random() * 100),
      topSeller: Math.floor(Math.random() * 2) === 1,
      prime: Math.floor(Math.random() * 2) === 1,
      amazonChoice: Math.floor(Math.random() * 2) === 1,
    };
  });
};
