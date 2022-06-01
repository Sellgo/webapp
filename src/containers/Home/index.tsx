import * as React from 'react';
import queryString from 'query-string';
import history from '../../history';
import { success } from '../../utils/notifications';
import Auth from '../../components/Auth/Auth';
import { decodeBase64, encodeBase64 } from '../../utils/format';
import { isSellgoSession, isAiStockSession } from '../../utils/session';
import { AppConfig } from '../../config';
import SellgoLogin from '../../containers/NewSellgoSubscription/SellgoLogin';
import AistockLogin from '../../containers/NewAistockSubscription/AistockLogin';

const auth = new Auth();
// export default class Home extends React.Component<any> {
class Home extends React.Component<any> {
  redirectToAlternativeApp = (newAppUrl: string) => {
    /* Get entire local storage */
    const localStorageData: any = {};
    Object.keys(localStorage).forEach((key: any) => {
      localStorageData[key] = localStorage.getItem(key);
    });

    /* Clear all local storage */
    localStorage.clear();
    const encodedStorage = encodeBase64(JSON.stringify(localStorageData));
    window.location.replace(`${newAppUrl}?store=${encodedStorage}`);
  };

  componentDidMount() {
    const { location } = this.props;
    /* Get url params */
    const params = queryString.parse(location.search);

    if (params.store) {
      try {
        const { store } = params;
        //@ts-ignore
        const jsonStore = JSON.parse(decodeBase64(store));

        /* Store each key from jsonStore into local storage */
        Object.keys(jsonStore).forEach(key => {
          localStorage.setItem(key, jsonStore[key]);
        });
      } catch (e) {
        console.error(e);
      }
    }

    let redirectPath = localStorage.getItem('loginRedirectPath');

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    // If logging in from chrome extension, and user is already logged into webapp
    if (location.search.includes('?res=') && isLoggedIn) {
      localStorage.setItem('chromeRedirectURL', location.search.split('?res=')[1]);
      auth.authenticateChromeExtension();

      // If logging in from chrome extension, but user is not logged in from webapp
    } else if (location.search.includes('?res=')) {
      localStorage.setItem('chromeRedirectURL', location.search.split('?res=')[1]);

      // User is not logging in from chrome extension
    } else {
      localStorage.setItem('chromeRedirectURL', '');
    }

    if (redirectPath && redirectPath !== '/') {
      history.replace(redirectPath);
    } else if (isLoggedIn) {
      const isAiStock = localStorage.getItem('isAiStock') === 'true';
      /* Account is AiStock account, but webapp is sellgo webapp */
      if (isAiStock && isSellgoSession()) {
        this.redirectToAlternativeApp(AppConfig.aistockUrls.BASE_URL);
        /* Account is Sellgo account, but webapp is aistock webapp */
      } else if (!isAiStock && isAiStockSession()) {
        this.redirectToAlternativeApp(AppConfig.sellgoUrls.BASE_URL);
      } else if (isAiStockSession()) {
        history.replace('/aistock/sales');
      } else {
        history.replace('/seller-research/database');
      }
    }

    if (location.state && redirectPath && redirectPath.indexOf('/subscription') !== -1) {
      if (
        location.state.options &&
        location.state.options.flashMessage.text === 'Please verify your email before logging in.'
      ) {
        redirectPath = '/subscription' + window.location.search + '-unverified';
        localStorage.setItem('loginRedirectPath', redirectPath);
        history.replace(redirectPath);
      }
    }
    // Show email verification success message if "verified" param
    // This URL is configured in Auth0 settings
    if (location.search) {
      const urlParams = queryString.parse(location.search);
      if (urlParams.verified) {
        success(`You've verified your email address. You may now login.`);
      }
    }
  }

  render() {
    const { auth, location } = this.props;
    return localStorage.getItem('isLoggedIn') !== 'true' ? (
      isSellgoSession() ? (
        <SellgoLogin auth={auth} location={location} />
      ) : (
        <AistockLogin auth={auth} location={location} />
      )
    ) : null;
  }
}

export default Home;
