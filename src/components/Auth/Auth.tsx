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
    const formData = new FormData();
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(this.userProfile.name)) {
      localStorage.setItem('userEmail', this.userProfile.name);
      formData.append('email', this.userProfile.name);
    } else {
      localStorage.setItem('userEmail', '');
      // formData.append('email', '');
    }
    if (this.userProfile.given_name || this.userProfile.family_name) {
      formData.append('name', `${this.userProfile.given_name} ${this.userProfile.family_name}`);
    }
    formData.append('auth0_user_id', this.userProfile.sub);

    axios
      .post(URLS.BASE_URL_API + 'seller/', formData, { headers })
      .then((response: any) => {
        const data = response.data[0] ? response.data[0] : response.data;
        if (data) {
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
    const date = new Date();
    console.log(authResult.expiresIn);
    console.log(date.getTime());
    date.setSeconds(date.getSeconds() + authResult.expiresIn);
    console.log(date.getTime());
    this.expiresAt = date.getTime();
    this.idToken = authResult.idToken;
    this.accessToken = authResult.accessToken;
    localStorage.setItem('idToken', this.idToken);
    localStorage.setItem('idTokenExpires', String(this.expiresAt));
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
    localStorage.removeItem('userId');
    localStorage.removeItem('idToken');
    localStorage.removeItem('idTokenExpires');
    this.auth0.logout({
      returnTo: window.location.origin,
    });

    // navigate to the home route
    history.replace('/');
  };

  public isAuthenticated = () => {
    const expiresAt = localStorage.getItem('idTokenExpires');
    if (expiresAt === null) {
      return false;
    }
    return new Date().getTime() < new Date(Number(expiresAt)).getTime();
  };
}
