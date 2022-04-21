const DEV_URLS = {
  BASE_URL: 'https://app.sellgo-dev.com',
  BASE_URL_AUTH: 'sellgo-dev.auth0.com',
  BASE_URL_API: 'https://api.sellgo-dev.com/api/',
  CHANGE_PASS_API_URL: 'https://sellgo-dev.auth0.com/dbconnections/change_password',
  WEB_URL: 'https://sellgo-dev.com',
  WEBSOCKET_URL: 'wss://api.sellgo-dev.com/ws',
};

const PROD_URLS = {
  BASE_URL: 'https://app.sellgo.com',
  BASE_URL_AUTH: 'sellgo.auth0.com',
  BASE_URL_API: 'https://api.sellgo.com/api/',
  CHANGE_PASS_API_URL: 'https://sellgo.auth0.com/dbconnections/change_password',
  WEB_URL: 'https://sellgo.com',
  WEBSOCKET_URL: 'wss://api.sellgo.com/ws',
};

const DEV_KEYS = {
  STRIPE_API_KEY: 'pk_test_thMkxDX66HmQoec5jcK34bAc0083aPonvE',
  PIXEL_ID: '990701281388485',
  ELEVIO_ID: '5f21ef059e2e7',
  CHROME_EXT_ID: 'akkneemdhjpifmcbpcdanajpihknagbf',
  CHURNFLOW_SURVEY_ID: 'Lb8og4j8',
  QUICK_WIN_SURVEY_ID: 'IjxdqPK3',
  BETA_FORM_ID: 'pvnHf0f6',
  AISTOCK_ONBOARDING_SURVEY: 'aJnr8gje',
  AISTOCK_SURVEY: 'H1yQNE6a',
  ELEVIO_KEY: '6228edc3bb20d',
};

const PROD_KEYS = {
  STRIPE_API_KEY: 'pk_live_6iiX5s4PCakcnwTP3Gf81UyV00XSgjLLmU',
  PIXEL_ID: '990701281388485',
  ELEVIO_ID: '5f21ef059e2e7',
  CHROME_EXT_ID: 'gldmigoakdolonchebfnmcfbjihelcec',
  CHURNFLOW_SURVEY_ID: 'Lb8og4j8',
  QUICK_WIN_SURVEY_ID: 'IjxdqPK3',
  BETA_FORM_ID: 'pvnHf0f6',
  AISTOCK_ONBOARDING_SURVEY: 'aJnr8gje',
  AISTOCK_SURVEY: 'H1yQNE6a',
  ELEVIO_KEY: '6228edc3bb20d',
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

const DEV_ANALYTICS = {
  // gaTrackingId: 'UA-154653584-1',
  gaTrackingId: 'G-1SKP5HZZJT',
  fullStoryOrgId: 'Q36Y3',
  googleTagManagerContainerId: 'GTM-5CNH6MV',
};

const PROD_ANALYTICS = {
  gaTrackingId: 'UA-154653584-2',
  fullStoryOrgId: '18JTF6',
  googleTagManagerContainerId: 'GTM-5CNH6MV',
};

const DEV_MWS = {
  DEVELOPER_ID: '0138-2430-7717', // Sellgo
};

const PROD_MWS = {
  DEVELOPER_ID: '4294-2444-1812', // Denverton
};

const prod = {
  ...PROD_AUTH_CONFIG,
  ...PROD_URLS,
  ...PROD_KEYS,
  ...PROD_ANALYTICS,
  ...PROD_MWS,
  callbackUrl: 'https://app.sellgo.com/callback',
};

const dev = {
  ...DEV_AUTH_CONFIG,
  ...DEV_URLS,
  ...DEV_KEYS,
  ...DEV_ANALYTICS,
  ...DEV_MWS,
  callbackUrl: 'https://app.sellgo-dev.com/callback',
};

const local = {
  ...DEV_AUTH_CONFIG,
  ...DEV_URLS,
  ...DEV_KEYS,
  ...DEV_ANALYTICS,
  ...DEV_MWS,
  callbackUrl: 'http://localhost:3000/callback',
};

function getAppConfig() {
  if (process.env.REACT_APP_ENV === 'production') {
    return prod;
  } else if (process.env.REACT_APP_ENV === 'development') {
    return dev;
  }

  return local;
}

export const AppConfig = getAppConfig();
