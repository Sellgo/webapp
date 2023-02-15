import { isSellgoSession } from './utils/session';

/* ============================================================ */
/* ====================== SELLGO CONFIGS ====================== */
/* ============================================================ */
const SELLGO_DEV_URLS = {
  BASE_URL: 'https://app.sellgo-dev.com',
  BASE_URL_AUTH: 'sellgo-dev.auth0.com',
  BASE_URL_API: 'http://localhost:8000/api/',
  CHANGE_PASS_API_URL: 'https://sellgo-dev.auth0.com/dbconnections/change_password',
  WEB_URL: 'https://sellgo-dev.com',
  WEBSOCKET_URL: 'wss://api.sellgo-dev.com/ws',
};

const SELLGO_PROD_URLS = {
  BASE_URL: 'https://app.sellgo.com',
  BASE_URL_AUTH: 'sellgo.auth0.com',
  BASE_URL_API: 'https://api.sellgo.com/api/',
  CHANGE_PASS_API_URL: 'https://sellgo.auth0.com/dbconnections/change_password',
  WEB_URL: 'https://sellgo.com',
  WEBSOCKET_URL: 'wss://api.sellgo.com/ws',
};

const SELLGO_DEV_KEYS = {
  STRIPE_API_KEY: 'pk_test_thMkxDX66HmQoec5jcK34bAc0083aPonvE',
  PIXEL_ID: '990701281388485',
  ELEVIO_ID: '5f21ef059e2e7',
  CHROME_EXT_ID: 'akkneemdhjpifmcbpcdanajpihknagbf',
  CHURNFLOW_SURVEY_ID: 'Lb8og4j8',
  QUICK_WIN_SURVEY_ID: 'IjxdqPK3',
  BETA_FORM_ID: 'pvnHf0f6',
  AISTOCK_ONBOARDING_SURVEY: 'uBopgqgO',
  AISTOCK_SURVEY: 'leapkRMa',
  AISTOCK_TESTIMONIAL_SURVEY: 'OD9eU4V7',
  AISTOCK_PROMOTER_SURVEY: 'D9bDxuUA',
  ELEVIO_KEY: '6228edc3bb20d',
  ONBOARDING_VIDEO: '',
};

const SELLGO_PROD_KEYS = {
  STRIPE_API_KEY: 'pk_live_6iiX5s4PCakcnwTP3Gf81UyV00XSgjLLmU',
  PIXEL_ID: '990701281388485',
  ELEVIO_ID: '5f21ef059e2e7',
  CHROME_EXT_ID: 'gldmigoakdolonchebfnmcfbjihelcec',
  CHURNFLOW_SURVEY_ID: 'Lb8og4j8',
  QUICK_WIN_SURVEY_ID: 'IjxdqPK3',
  BETA_FORM_ID: 'pvnHf0f6',
  AISTOCK_ONBOARDING_SURVEY: 'uBopgqgO',
  AISTOCK_SURVEY: 'leapkRMa',
  AISTOCK_TESTIMONIAL_SURVEY: 'OD9eU4V7',
  AISTOCK_PROMOTER_SURVEY: 'D9bDxuUA',
  ELEVIO_KEY: '6228edc3bb20d',
  ONBOARDING_VIDEO: '',
};

/* ============================================================ */
/* ===================== AISTOCK CONFIGS ====================== */
/* ============================================================ */
const AISTOCK_DEV_URLS = {
  BASE_URL: 'https://app.predicts.co',
  BASE_URL_AUTH: 'sellgo-dev.auth0.com',
  BASE_URL_API: 'https://api.sellgo-dev.com/api/',
  CHANGE_PASS_API_URL: 'https://sellgo-dev.auth0.com/dbconnections/change_password',
  WEB_URL: 'https://predicts.co',
  WEBSOCKET_URL: 'wss://api.sellgo-dev.com/ws',
};

const AISTOCK_PROD_URLS = {
  BASE_URL: 'https://app.aistock.co',
  BASE_URL_AUTH: 'sellgo.auth0.com',
  BASE_URL_API: 'https://api.sellgo.com/api/',
  CHANGE_PASS_API_URL: 'https://sellgo.auth0.com/dbconnections/change_password',
  WEB_URL: 'https://aistock.co',
  WEBSOCKET_URL: 'wss://api.sellgo.com/ws',
};

const AISTOCK_DEV_KEYS = {
  STRIPE_API_KEY:
    'pk_test_51KyWdDB9r8idhGpi4FucpUjlDoA2F9NnHDqOlvfZpGvC202JeFR0RcHJYsto8Ho6IWuBKzudR16kL24egrSnApDt00PrZJrw6G',
  PIXEL_ID: '391690402953069',
  ELEVIO_ID: '5f21ef059e2e7',
  CHROME_EXT_ID: 'akkneemdhjpifmcbpcdanajpihknagbf',
  CHURNFLOW_SURVEY_ID: 'Lb8og4j8',
  QUICK_WIN_SURVEY_ID: 'IjxdqPK3',
  BETA_FORM_ID: 'pvnHf0f6',
  AISTOCK_ONBOARDING_SURVEY: 'uBopgqgO',
  AISTOCK_SURVEY: 'leapkRMa',
  AISTOCK_TESTIMONIAL_SURVEY: 'OD9eU4V7',
  AISTOCK_PROMOTER_SURVEY: 'D9bDxuUA',
  ELEVIO_KEY: '6228edc3bb20d',
  ONBOARDING_VIDEO: '',
};

const AISTOCK_PROD_KEYS = {
  STRIPE_API_KEY:
    'pk_live_51KyVnxB27BJWvSTtNE7FrqZ5DnLyA3dtQ2bLzzAHckkXCFxzJayiGxyfio3qBfV8WGLqUyYh69lQdxsaPA1yHs0900lbQSzWuP',
  PIXEL_ID: '391690402953069',
  ELEVIO_ID: '5f21ef059e2e7',
  CHROME_EXT_ID: 'gldmigoakdolonchebfnmcfbjihelcec',
  CHURNFLOW_SURVEY_ID: 'Lb8og4j8',
  QUICK_WIN_SURVEY_ID: 'IjxdqPK3',
  BETA_FORM_ID: 'pvnHf0f6',
  AISTOCK_ONBOARDING_SURVEY: 'uBopgqgO',
  AISTOCK_SURVEY: 'leapkRMa',
  AISTOCK_TESTIMONIAL_SURVEY: 'OD9eU4V7',
  AISTOCK_PROMOTER_SURVEY: 'D9bDxuUA',
  ELEVIO_KEY: '6228edc3bb20d',
  ONBOARDING_VIDEO: '',
};

const DEV_AUTH_CONFIG = {
  domain: 'sellgo-dev.auth0.com',
  clientID: '75GLWPGkejOnogr8iuCkGSwmmgYJVnuW',
  connection: 'Username-Password-Authentication',
};

const PROD_AUTH_CONFIG = {
  domain: 'sellgo.auth0.com',
  clientID: 'yIcAMqhFc1M8K3EmToO8p0kTmJsLy1uW',
  connection: 'Username-Password-Authentication',
};

const SELLGO_DEV_ANALYTICS = {
  gaTrackingId: 'UA-154653584-1',
  fullStoryOrgId: 'Q36Y3',
  googleTagManagerContainerId: 'GTM-5CNH6MV',
};

const SELLGO_PROD_ANALYTICS = {
  gaTrackingId: 'UA-154653584-5',
  fullStoryOrgId: '18JTF6',
  googleTagManagerContainerId: 'GTM-KZN2GBV',
};

const AISTOCK_DEV_ANALYTICS = {
  gaTrackingId: 'UA-235653036-2',
  fullStoryOrgId: 'Q36Y3',
  googleTagManagerContainerId: 'GTM-5C5R9R4',
};

const AISTOCK_PROD_ANALYTICS = {
  gaTrackingId: 'UA-235653036-1',
  fullStoryOrgId: 'o-1E5S0S-na1', //fullstory_22ww37.2
  googleTagManagerContainerId: 'GTM-TCBV6PN',
};

const DEV_MWS = {
  DEVELOPER_ID: '0138-2430-7717', // Sellgo
};

const PROD_MWS = {
  DEVELOPER_ID: '4294-2444-1812', // Denverton
};

const sellgoProd = {
  ...PROD_AUTH_CONFIG,
  ...SELLGO_PROD_URLS,
  ...SELLGO_PROD_KEYS,
  ...SELLGO_PROD_ANALYTICS,
  ...PROD_MWS,
  callbackUrl: 'https://app.sellgo.com/callback',
  sellgoUrls: { ...SELLGO_PROD_URLS },
  aistockUrls: { ...AISTOCK_PROD_URLS },
};

const aistockProd = {
  ...PROD_AUTH_CONFIG,
  ...AISTOCK_PROD_URLS,
  ...AISTOCK_PROD_KEYS,
  ...AISTOCK_PROD_ANALYTICS,
  ...PROD_MWS,
  callbackUrl: 'https://app.aistock.co/callback',
  sellgoUrls: { ...SELLGO_PROD_URLS },
  aistockUrls: { ...AISTOCK_PROD_URLS },
};

const sellgoDev = {
  ...DEV_AUTH_CONFIG,
  ...SELLGO_DEV_URLS,
  ...SELLGO_DEV_KEYS,
  ...SELLGO_DEV_ANALYTICS,
  ...DEV_MWS,
  callbackUrl: 'https://app.sellgo-dev.com/callback',
  sellgoUrls: { ...SELLGO_DEV_URLS },
  aistockUrls: { ...AISTOCK_DEV_URLS },
};

const aistockDev = {
  ...DEV_AUTH_CONFIG,
  ...AISTOCK_DEV_URLS,
  ...AISTOCK_DEV_KEYS,
  ...AISTOCK_DEV_ANALYTICS,
  ...DEV_MWS,
  callbackUrl: 'https://app.predicts.co/callback',
  sellgoUrls: { ...SELLGO_DEV_URLS },
  aistockUrls: { ...AISTOCK_DEV_URLS },
};

const sellgoLocal = {
  ...DEV_AUTH_CONFIG,
  ...SELLGO_DEV_URLS,
  ...SELLGO_DEV_KEYS,
  ...SELLGO_DEV_ANALYTICS,
  ...DEV_MWS,
  callbackUrl: 'http://localhost:3000/callback',
  sellgoUrls: { ...SELLGO_DEV_URLS },
  aistockUrls: { ...AISTOCK_DEV_URLS },
};

const aistockLocal = {
  ...DEV_AUTH_CONFIG,
  ...AISTOCK_DEV_URLS,
  ...AISTOCK_DEV_KEYS,
  ...AISTOCK_DEV_ANALYTICS,
  ...DEV_MWS,
  callbackUrl: 'http://localhost:3000/callback',
  sellgoUrls: { ...SELLGO_DEV_URLS },
  aistockUrls: { ...AISTOCK_DEV_URLS },
};

function getAppConfig() {
  if (process.env.REACT_APP_ENV === 'production') {
    if (isSellgoSession()) {
      return sellgoProd;
    } else {
      return aistockProd;
    }
  } else if (process.env.REACT_APP_ENV === 'development') {
    if (isSellgoSession()) {
      return sellgoDev;
    } else {
      return aistockDev;
    }
  } else {
    if (isSellgoSession()) {
      return sellgoLocal;
    } else {
      return aistockLocal;
    }
  }
}

export const AppConfig = getAppConfig();
