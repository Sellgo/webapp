const DEV_URLS = {
  BASE_URL: 'https://app.sellgo-dev.com',
  BASE_URL_AUTH: 'sellgo-dev.auth0.com',
  BASE_URL_API: ' https://api.sellgo-dev.com/api/',
  CHANGE_PASS_API_URL: 'https://sellgo-dev.auth0.com/dbconnections/change_password',
};

const PROD_URLS = {
  BASE_URL: 'https://app.sellgo.com',
  BASE_URL_AUTH: 'sellgo.auth0.com',
  BASE_URL_API: ' https://api.sellgo.com/api/',
  CHANGE_PASS_API_URL: 'https://sellgo.auth0.com/dbconnections/change_password',
};

export const API_ENDPOINTS = {
  login: URLS.BASE_URL_API + 'login/',
};

const DEV_KEYS = {
  STRIPE_API_KEY: 'pk_test_0b42zSvCRLMKaWgSCF637yub008211ZJ6J',
};

const PROD_KEYS = {
  STRIPE_API_KEY: 'sk_test_wTCFHhf2EqI755kHp1UNyYes00PePscgM8',
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

const prod = {
  ...PROD_AUTH_CONFIG,
  ...PROD_URLS,
  ...PROD_KEYS,
  callbackUrl: 'https://app.sellgo.com/callback',
};

const dev = {
  ...DEV_AUTH_CONFIG,
  ...DEV_URLS,
  ...DEV_KEYS,
  callbackUrl: 'https://app.sellgo-dev.com/callback',
};

const local = {
  ...DEV_AUTH_CONFIG,
  ...DEV_URLS,
  ...DEV_KEYS,
  callbackUrl: 'http://localhost:3000/callback',
};

export const AppConfig = process.env.NODE_ENV === 'development' ? local : dev;
