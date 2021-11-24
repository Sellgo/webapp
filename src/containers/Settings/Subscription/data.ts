export const plansAndProductsDetails = [
  {
    planName: 'Monthly and Annual Pricing Plans',
    summary: `Invest on a research tool that's dependable, powerful and can scale up your 
			business with 7-day money back guarantee.`,
    infoAlertMessage: {
      monthly: {
        head: `Pay only $1.99 for the entire first month of starter membership`,
        desc: ``,
        navigateTo: '/pricing?type=free-trial',
        navigateLabel: 'Learn More',
      },
      yearly: {
        head: `Pay only $1.99 for the entire first month of starter membership`,
        desc: ``,
        navigateTo: '/pricing?type=free-trial',
        navigateLabel: 'Learn More',
      },
    },
    productsIncluded: [
      {
        id: 10, // subscriptionID if needed
        name: 'Starter',
        productsDatabase: 0,
        salesEstimateCount: 1000,
        monthlyPrice: 37,
        annualPrice: 324,
        desc: `The toolbox for beginner sellers. \n Get access to our tools and chrome extension!`,
        featureSubName: 'Start with',
        featuresLists: [
          {
            title: 'Discover Best Selling',
            featuresIncluded: [
              'Full access to the Chrome Extension',
              'Limited access to the rest of Sellgo All-In-One tool',
            ],
          },
        ],
      },
      {
        id: 11,
        name: 'Professional',
        productsDatabase: 0,
        salesEstimateCount: 2000,
        monthlyPrice: 97,
        annualPrice: 924,
        featureSubName: 'Full Single-user Access, Plus',
        desc: `For experienced sellers looking to grow \n their businesses and maximize their earnings.`,
        isNew: true,
        featuresLists: [
          {
            title: 'Optimize Wholesale leads',
            featuresIncluded: [
              'Full access to Profit Finder',
              'Variation and Multipack analysis',
              'Leads Tracker',
            ],
          },
          {
            title: 'Seller Research',
            featuresIncluded: [
              'Locate Amazon sellers with Seller Database/ Map',
              'Check sellers inventory',
              'Brand level category filter',
            ],
          },
          {
            title: 'Keyword Research',
            featuresIncluded: [
              'Reveal competitor keywords with Keyword Finder',
              'Keyword tracking with Product Rank Tracker',
              'Rank drop/ raise index',
            ],
          },
        ],
      },
      {
        id: 12,
        name: 'Team',
        productsDatabase: 0,
        salesEstimateCount: 3000,
        monthlyPrice: 177,
        annualPrice: 1764,
        featureSubName: 'Everything in Professional Plan, Plus',
        desc: `For top sellers who need the best tools. 
				Track more products, obtain more data \nand optimize your entire Amazon business.`,
        featuresLists: [
          {
            title: 'Product Research',
            featuresIncluded: [
              'Full access to Chrome Extension Sales Estimation',
              'Full access to Product Research (incoming soon)',
              'Historical Data up to 1-year',
            ],
          },
          {
            title: 'Seller Research',
            featuresIncluded: [
              'Full use of Seller Database/ Map',
              'Seller Map Top View 20,000 Sellers*',
            ],
          },
          {
            title: 'Keyword Research',
            featuresIncluded: [
              'Full Access to Keyword Finder/ Database',
              'True Rank Performance index',
              'PPC Recampaign with Zapier integration*',
            ],
          },
          {
            title: 'Advanced access',
            featuresIncluded: ['Multi-user login', 'Priority onboarding'],
          },
        ],
      },
    ],
  },
];
