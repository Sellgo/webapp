export const dataKeys: any = [
  // Basic KPI
  'avg_profit',
  'avg_margin',
  'avg_unit_monthly',
  'avg_roi',
];

export const dataKeyMapping: any = {
  // Basic KPI
  avg_profit: {
    text: 'Avg Profit ($)',
    presetText: 'Max Profit ($)',
    showSlider: true,
    showInputs: true,
    groupId: 'basic',
  },
  avg_margin: {
    text: 'Avg Margin (%)',
    presetText: 'Max Profit Margin (%)',
    showSlider: true,
    showInputs: true,
    groupId: 'basic',
  },
  avg_unit_monthly: {
    text: 'Avg Unit Sales Per Month',
    presetText: 'Max Unit Sales Per Month',
    showSlider: true,
    showInputs: true,
    groupId: 'basic',
  },
  avg_roi: {
    text: ' Avg ROI Inventory',
    presetText: 'Max ROI Inventory',
    showSlider: true,
    showInputs: false,
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
