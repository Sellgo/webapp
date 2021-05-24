const formatPlansStats = (stat: number) => {
  if (!stat) {
    return 0;
  }

  return stat.toLocaleString();
};

const periodToDisplayMapper: { [key: string]: string } = {
  monthly: '/mo',
  daily: '/day',
};

export const formatPlanPeriod = (period: string, appendString = '') => {
  if (!period) {
    return '/day';
  }

  const periodFormatter = periodToDisplayMapper[period] || '/day';

  return `${appendString}${periodFormatter}`;
};

export const generateHybridTable = (comparisonStats: any) => {
  const { starter, suite, professional } = comparisonStats;

  return [
    {
      header: ['Basic', 'Starter', 'Suite', 'Professional'],
      body: [
        ['Money-back guarantee help', '✓', '✓', '✓'],
        ['Cancel any time help', '✓', '✓', '✓'],
        ['Included users', '1', '1', '7'],
        ['Eligible for additional users', '-', '✓', '✓'],
        ['Additional user cost', '-', '$29/mo', '$29/mo'],
      ],
    },
    {
      header: ['Seller Type', 'Starter', 'Suite', 'Professional'],
      body: [
        ['Private Label', '✓', '✓', '✓'],
        ['Wholesale', '-', '✓', '✓'],
        ['Advanced Seller', '-', '-', '✓'],
      ],
    },
    {
      header: ['Product Research', 'Starter', 'Suite', 'Professional'],
      body: [
        ['Chrome Extension', '✓', '✓', '✓'],
        [
          'Product Tracker',
          `${formatPlansStats(starter && starter.productTracker)} products`,
          `${formatPlansStats(suite && suite.productTracker)} products`,
          `${formatPlansStats(professional && professional.productTracker)} products`,
        ],
        [
          'Amazon Best Sales Estimator',
          `${formatPlansStats(starter && starter.salesEstimateLimit)} 
					${formatPlanPeriod(starter && starter.salesEstimatePeriod, 'estimates')}`,

          `${formatPlansStats(suite && suite.salesEstimateLimit)}
					${formatPlanPeriod(suite && suite.salesEstimatePeriod, 'estimates')}`,

          `${formatPlansStats(professional && professional.salesEstimateLimit)} 	${formatPlanPeriod(
            professional && professional.salesEstimatePeriod,
            'estimates'
          )}`,
        ],
        ['Inventory Insight', '-', '✓', '✓'],
        ['Market share insight', '-', '✓', '✓'],
      ],
    },
    {
      header: ['Bulk Profit Research', 'Starter', 'Suite', 'Professional'],
      body: [
        [
          'Profit Finder',

          `${formatPlansStats(starter && starter.profitFinder)} ${formatPlanPeriod(
            starter && starter.profitFinderPeriod,
            'products'
          )}`,
          `${formatPlansStats(suite && suite.profitFinder)} ${formatPlanPeriod(
            suite && suite.profitFinderPeriod,
            'products'
          )}`,

          `${formatPlansStats(professional && professional.profitFinder)} ${formatPlanPeriod(
            professional && professional.profitFinderPeriod,
            'products'
          )}`,
        ],
        ['Additional bulk processing', '-', '-', '-'],
        ['Data input (UPC, EAN, ASIN, ISBN)', '✓', '✓', '✓'],
        ['Data Buster', '-', '✓', '✓'],
        ['Smart Filter', '-', '✓', '✓'],
        ['Bulk + Filtered Data Export', '✓', '✓', '✓'],
        ['Variation Analysis', '✓', '✓', '✓'],
        ['Multipack Analysis', '✓', '✓', '✓'],
        [
          'Leads Tracker',
          `${formatPlansStats(starter && starter.leadsTracker)} products`,
          `${formatPlansStats(suite && suite.leadsTracker)} products`,
          `${formatPlansStats(professional && professional.leadsTracker)} products`,
        ],
      ],
    },
    {
      header: ['Seller Research', 'Starter', 'Suite', 'Professional'],
      body: [
        [
          'Seller Finder',
          `${formatPlansStats(starter && starter.sellerFinderLimit)} ${formatPlanPeriod(
            starter && starter.sellerFinderPeriod,
            'sellers'
          )}`,

          `${formatPlansStats(suite && suite.sellerFinderLimit)} ${formatPlanPeriod(
            suite && suite.sellerFinderPeriod,
            'sellers'
          )}`,

          `${formatPlansStats(professional && professional.sellerFinderLimit)} ${formatPlanPeriod(
            professional && professional.sellerFinderPeriod,
            'sellers'
          )}`,
        ],

        ['Export Seller Data', '-', 'Annual plan', 'Annual plan'],
        ['Check Seller Inventory', '-', '✓', '✓'],
        ['Brand Finder', '-', '✓', '✓'],
      ],
    },
    {
      header: ['Data Analytics', 'Starter', 'Suite', 'Professional'],
      body: [
        ['True Sales Estimates', '✓', '✓', '✓'],
        [
          'Historical Product Tracking Data',
          `${starter && starter.trackHistory} month`,
          `${suite && suite.trackHistory} month`,
          `${professional && professional.trackHistory === 12 ? '1 year' : ''}`,
        ],
      ],
    },
  ];
};
