export const SET_TOS = 'SET_TOS';
export const SET_PP = 'SET_PP';
export const SET_NOTIFY_ID = 'SET_NOTIFY_ID';

/* Action types for onboarding */
export const actionTypes = {
  SET_USER_ONBOARDING: 'SET_USER_ONBOARDING',
  SET_USER_ONBOARDING_RESOURCES: 'TOGGLE_USER_BOARDING',
};

export const userOnboarding = [
  {
    title: 'Supplier Management Tutorial',
    description: 'How to use Supplier Management',
    url: 'https://www.youtube.com/embed/-CpCzUP0AVQ',
  },
  {
    title: 'Profit Finder Tutorial',
    description: 'How to use Profit Finder',
    url: 'https://www.youtube.com/embed/C-bpxF0c-24',
  },
  {
    title: 'Product Tracker Tutorial',
    description: 'How to use Product Tracker',
    url: 'https://www.youtube.com/embed/WNAVfz7Ss-A',
  },
];

export const onboardingVideos = [
  {
    category: 'Supplier Management',
    path: [
      {
        id: '-CpCzUP0AVQ',
        title: 'Supplier Management Tutorial',
        description: 'How to use Supplier Management',
        url: 'https://www.youtube.com/embed/-CpCzUP0AVQ?rel=0&autoplay=1&modestbranding=1',
      },
    ],
  },
  {
    category: 'Profit Finder',
    path: [
      {
        id: 'C-bpxF0c-24',
        title: 'Profit Finder Tutorial',
        description: 'How to use Profit Finder',
        url: 'https://www.youtube.com/embed/C-bpxF0c-24?rel=0&autoplay=1&modestbranding=1',
      },
    ],
  },
  {
    category: 'Product Tracker',
    path: [
      {
        id: 'WNAVfz7Ss-A',
        title: 'Product Tracker Tutorial',
        description: 'How to use Product Tracker',
        url: 'https://www.youtube.com/embed/WNAVfz7Ss-A?rel=0&autoplay=1&modestbranding=1',
      },
    ],
  },
];
