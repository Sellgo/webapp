import * as auth0 from 'auth0-js';
import history from '../../history';
import axios from 'axios';
import { URLS, AUTH_CONFIG } from '../../config';

export default class Auth {
  accessToken: any;
  idToken: any;
  expiresAt: any;
  userProfile: any;

  public auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.clientID,
    domain: AUTH_CONFIG.domain,
    redirectUri: AUTH_CONFIG.callbackUrl,
    responseType: 'token id_token',
    scope: 'openid profile',
  });

  public login = () => {
    this.auth0.authorize();
  };

  registerSeller = () => {
    const headers = { Authorization: `Bearer ${this.idToken}`, 'Content-Type': 'application/json' };
    localStorage.setItem('auth0_user_id', this.userProfile.sub);
    let form_data = new FormData();
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(this.userProfile.name)) {
      localStorage.setItem('userEmail', this.userProfile.name);
      form_data.append('email', this.userProfile.name);
    } else {
      localStorage.setItem('userEmail', '');
      // form_data.append('email', '');
    }
    form_data.append('auth0_user_id', this.userProfile.sub);
    form_data.append('name', this.userProfile.nickname);

    axios
      .post(
        URLS.BASE_URL_API + 'seller/',
        form_data,
        { headers }
      )
      .then((response: any) => {
        const data = response.data[0] ? response.data[0] : response.data;
        if(data) {
          localStorage.setItem('userId', data.id);
          localStorage.setItem('cDate', data.cdate);
        }
      })
      .catch();
  };

  public handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        history.replace('/');
        alert(`Error: ${err.error}. Check the console for further details.`);
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
    localStorage.setItem('isLoggedIn', 'true');
    // Set the time that the access token will expire at
    const expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;
    localStorage.setItem('idToken', authResult.idToken);

    this.getProfile((err: any, profile: any) => {
      this.handleProfile(profile);
    });
  };

  handleProfile(profile: any) {
    this.registerSeller();
    history.replace('/dashboard');
  }

  public renewSession = () => {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.logout();
        alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
      }
    });
  };

  getProfile(cb: any) {
    this.auth0.client.userInfo(this.accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  public logout = () => {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    // Remove user profile
    this.userProfile = null;
    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');
    this.auth0.logout({
      returnTo: window.location.origin,
    });

    // navigate to the home route
    history.replace('/');
  };

  public isAuthenticated = () => {
    const expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  };
}
