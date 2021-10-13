import Auth0Lock from 'auth0-lock';
import history from '../../history';
import analytics from '../../analytics';
import Axios from 'axios';
import { AppConfig } from '../../config';
import auth0 from 'auth0-js';
import { removeProfitFinderFilters } from '../../constants/Products';
import { isURL } from 'validator';

const chromeID = AppConfig.CHROME_EXT_ID;

export default class Auth {
  accessToken: any;
  idToken: any;
  expiresAt: any;
  userProfile: any;

  public webAuth = new auth0.WebAuth({
    domain: AppConfig.domain,
    clientID: AppConfig.clientID,
    redirectUri: AppConfig.callbackUrl,
  });

  public authenticateChromeExtension = () => {
    const chromeRedirectURL = localStorage.getItem('chromeRedirectURL') || '';
    const decodedRedirectURL = atob(chromeRedirectURL);
    const userData = {
      name: localStorage.getItem('userName'),
      email: localStorage.getItem('userEmail'),
      idToken: localStorage.getItem('idToken'),
      expiresAt: localStorage.getItem('idTokenExpires'),
      sellerID: localStorage.getItem('userId'),
    };

    // If chrome extension requires redirect then:
    if (
      navigator.userAgent.indexOf('Chrome') !== -1 &&
      decodedRedirectURL.length > 0 &&
      isURL(decodedRedirectURL)
    ) {
      if (chrome && chrome.runtime) {
        chrome.runtime.sendMessage(chromeID, {
          status: 'login',
          payload: userData,
        });
        window.location.href = decodedRedirectURL;
        localStorage.setItem('chromeRedirectURL', '');
        return;
      }
      // If chrome extension is open, but no redirect notice was issued, so just send login signal
    } else if (navigator.userAgent.indexOf('Chrome') !== -1) {
      if (chrome && chrome.runtime) {
        chrome.runtime.sendMessage(chromeID, { status: 'loginWithoutRedirect', payload: userData });
      }
    }
    history.replace('/');
  };

  public auth0Lock = new Auth0Lock(AppConfig.clientID, AppConfig.domain, {
    auth: {
      redirectUrl: AppConfig.callbackUrl,
      responseType: 'token id_token',
      params: {
        scope: 'openid profile email',
      },
    },
  });

  registerSeller = () => {
    const headers = { Authorization: `Bearer ${this.idToken}`, 'Content-Type': 'application/json' };
    const formData = new FormData();

    formData.append('email', this.userProfile.email);
    formData.append('name', `${this.userProfile.name}`);
    formData.append('first_name', `${this.userProfile.first_name}`);
    formData.append('last_name', `${this.userProfile.last_name}`);
    formData.append('auth0_user_id', this.userProfile.sub);

    Axios.post(AppConfig.BASE_URL_API + 'sellers', formData, { headers })
      .then((response: any) => {
        const data = response.data[0] ? response.data[0] : response.data;
        if (data) {
          localStorage.setItem('userId', data.id);
          localStorage.setItem('cDate', data.cdate);

          // We're calling identify here because it's currently the only
          // way to get the user id after login/signup.
          // We can find a better place for this if auth is refactored.
          analytics.identify(data.id.toString(), {
            displayName: data.name,
            email: data.email,
          });

          if (navigator.userAgent.indexOf('Chrome') !== -1) {
            this.authenticateChromeExtension();
            return;
          }

          // normal app workflow
          history.replace('/');
        }
      })
      .catch(err => {
        alert(`Error: ${err.message}. Check with Sellgo Support Team for further details.`);
        this.logout();
      });
  };

  public getSellerID(data: any, type = 'subscription') {
    const origin = localStorage.getItem('origin') || '';
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('name', data.name);
    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    formData.append('origin', origin);
    if (
      data.stripe_subscription_id &&
      data.activation_code &&
      data.subscription_id &&
      data.payment_mode
    ) {
      formData.append('stripe_subscription_id', data.stripe_subscription_id);
      formData.append('activation_code', data.activation_code);
      formData.append('subscription_id', data.subscription_id);
      formData.append('payment_mode', data.payment_mode);
    }

    if (data.referral) {
      formData.append('referral', data.referral);
    }

    Axios.post(AppConfig.BASE_URL_API + 'sellers/register', formData)
      .then((response: any) => {
        const data = response.data[0] ? response.data[0] : response.data;
        if (data) {
          localStorage.setItem('userId', data.id);
          localStorage.setItem('cDate', data.cdate);
        }
        if (type === 'subscription') {
          history.push('/subscription/payment');
        } else if (type === 'newSubscription') {
          history.push('/subscription/success');
        }
      })
      .catch(err => {
        alert(`Error: ${err.message}. Check with Sellgo Support Team for further details.`);
        this.logout();
      });
  }

  public handleAuthentication = () => {
    this.auth0Lock.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        if (err.code === 'unauthorized') {
          history.replace({
            pathname: '/',
            state: {
              options: { flashMessage: { type: 'error', text: err.description || '' } },
            },
          });
        } else if (err.code === 'login_required') {
          history.replace('/');
          // Temporary solution for 3rd party cookies issue
          // Need to setup an Auth0 custom domain to fix
          alert(
            // eslint-disable-next-line max-len
            `Sellgo does not currently support browsers with 3rd party cookies disabled. Please enable 3rd party cookies or in Safari un-check "prevent cross-site tracking" in your browser's settings.`
          );
        } else {
          history.replace('/');
          alert(`Error: ${err.error}. Check with Sellgo Support Team for further details.`);
        }
      }
    });
  };

  public getAccessToken = () => {
    return this.accessToken;
  };

  public getIdToken = () => {
    return this.idToken;
  };

  public setSession = (authResult: any) => {
    // Set isLoggedIn flag in localStorage
    // Set the time in ms that idToken (the JWT token) expires
    this.expiresAt = authResult.idTokenPayload.exp * 1000;
    this.idToken = authResult.idToken;
    this.accessToken = authResult.accessToken;
    localStorage.setItem('idToken', this.idToken);
    localStorage.setItem('idTokenExpires', String(this.expiresAt));
    localStorage.setItem('isLoggedIn', 'true');
    this.removeFilters();
    this.getProfile(() => {
      this.registerSeller();
    });
  };

  getProfile(cb: any) {
    this.auth0Lock.getUserInfo(this.accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
        localStorage.setItem('userName', this.userProfile.name);
        localStorage.setItem('userEmail', this.userProfile.email);
        localStorage.setItem('userPicture', this.userProfile.picture);
      }
      cb(err, profile);
    });
  }

  public removeStoredItems = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    localStorage.removeItem('idToken');
    localStorage.removeItem('idTokenExpires');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userPicture');
    localStorage.setItem('loginRedirectPath', '/');
    removeProfitFinderFilters();
  };

  public removeFilters = () => {
    localStorage.removeItem('filterState');
    localStorage.removeItem('filterSelectAllCategories');
    localStorage.removeItem('trackerFilter');
    localStorage.removeItem('filterSelectAllReviews');
  };

  public logout = () => {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;
    // Remove user profile
    this.userProfile = null;
    // Remove isLoggedIn flag from localStorage
    this.removeStoredItems();
    this.auth0Lock.logout({
      returnTo: window.location.origin,
    });

    if (navigator.userAgent.indexOf('Chrome') !== -1) {
      if (chrome && chrome.runtime) {
        chrome.runtime.sendMessage(chromeID, {
          status: 'logout',
          payload: {},
        });
      }
    }
  };

  public isAuthenticated = () => {
    const expiresAt = localStorage.getItem('idTokenExpires');
    if (expiresAt === null) {
      return false;
    }
    return new Date().getTime() < new Date(Number(expiresAt)).getTime();
  };
}
