export const plansAndProductsDetails = {
  planName: 'Monthly and Annual Pricing Plans',
  summary: 'Try Our Premium Tools and Access Real-Data for $1!',
  infoAlertMessage: {
    monthly: {
      head: `Start selling on Amazon today with Sellgo's free tools.`,
      desc: `Want to try our advanced Amazon tools? Review our FBA tools and pricing packages.
			Our premium tools empower you to track and research more products to optimize your Amazon business.`,
      navigateTo: '/pricing?type=free-trial',
      navigateLabel: 'Free Trial',
    },
    yearly: {
      head: `Start selling on Amazon today with Sellgo's free tools.`,
      desc: `Want to try our advanced Amazon tools? Review our FBA tools and pricing packages.
			Our premium tools empower you to track and research more products to optimize your Amazon business.`,
      navigateTo: '/pricing?type=free-trial',
      navigateLabel: 'Free Trial',
    },
  },
  productsIncluded: [
    {
      id: 6, // subscriptionID if needed
      name: 'Starter',
      productsDatabase: 0,
      salesEstimateCount: 1000,
      monthlyPrice: 49,
      annualPrice: 348,
      desc: `The toolbox for beginner sellers. \n Get access to our tools and chrome extension!`,
      featureSubName: 'Start with',
      featuresLists: [
        {
          title: 'Discover Best Selling',
          featuresIncluded: [
            'Full access to the Chrome extension',
            'Profit Finder FBA bulk calculation',
            'Data input as UPC, EAN, ASIN, ISBN',
          ],
        },
        {
          title: 'Understand Your Leads',
          featuresIncluded: ['Supplier analytics', 'Product Tracker', 'Historical Data'],
        },
      ],
    },
    {
      id: 1,
      name: 'Suite',
      productsDatabase: 0,
      salesEstimateCount: 1500,
      monthlyPrice: 69,
      annualPrice: 588,
      featureSubName: 'Starter Plan Plus',
      desc: `For experienced sellers looking to grow \n their businesses and maximize their earnings.`,
      featuresLists: [
        {
          title: 'Advanced profit scout',
          featuresIncluded: [
            'Full access to Profit Finder Web App',
            'Instant analytics with Data Buster',
            'Advanced filter preset',
            'Bulk product error analysis',
            'Bulk filtered data export',
          ],
        },
        {
          title: 'Optimize your leads',
          featuresIncluded: [
            'Product analysis',
            'Bulk variation analysis',
            'Competitive seller analysis',
            'Inventory insight',
            'Market share insight',
          ],
        },
      ],
    },
    {
      id: 2,
      name: 'Professional',
      productsDatabase: 0,
      salesEstimateCount: 2500,
      monthlyPrice: 129,
      annualPrice: 996,
      featureSubName: 'Suite Plan Plus',
      desc: `For professional sellers and businesses who need \nthe best tools. 
				Track more products, obtain more data, \nand optimize your entire Amazon business.`,
      featuresLists: [
        {
          title: 'Advance your leads',
          featuresIncluded: [
            'Full access to Leads Tracker',
            'Bulk multipack analysis',
            'Process up to 1,000,000 ASINs monthly',
            'Track up to 1,000 ASINs daily',
          ],
        },
        {
          title: 'Seller Reverse Research',
          featuresIncluded: ['Seller Finder', 'Check sellers inventory', 'Brand finder'],
        },
        {
          title: 'Advanced access',
          featuresIncluded: ['7 users included', 'Priority onboarding'],
        },
      ],
    },
  ],
};
