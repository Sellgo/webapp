const URLS = {
  BASE_URL: 'https://app.sellgo-dev.com',
  BASE_URL_AUTH: 'sellgo-dev.auth0.com',
  BASE_URL_API: ' https://api.sellgo-dev.com/api/',
  CHANGE_PASS_API_URL: 'https://sellgo-dev.auth0.com/dbconnections/change_password',
};

export const API_ENDPOINTS = {
  login: URLS.BASE_URL_API + 'login/',
};

const KEYS = {
  STRIPE_API_KEY: 'pk_test_0b42zSvCRLMKaWgSCF637yub008211ZJ6J',
};

const AUTH_CONFIG = {
  domain: 'sellgo-dev.auth0.com',
  clientID: '75GLWPGkejOnogr8iuCkGSwmmgYJVnuW',
  connection: 'Username-Password-Authentication',
};

const prod = {
  ...AUTH_CONFIG,
  ...URLS,
  ...KEYS,
  callbackUrl: 'https://app.sellgo-dev.com/callback',
};

const dev = {
  ...AUTH_CONFIG,
  ...URLS,
  ...KEYS,
  callbackUrl: 'http://localhost:3000/callback',
};

export const AppConfig = process.env.NODE_ENV === 'development' ? dev : prod;
