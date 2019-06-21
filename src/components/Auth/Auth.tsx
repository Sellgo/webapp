import * as auth0 from 'auth0-js';
import history from '../../history';
import { AUTH_CONFIG } from './auth0-variables';
import axios from 'axios';
import { URLS } from '../../constant/constant';

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
    axios
      .post(
        URLS.BASE_URL_API + 'seller/',
        {
          email: this.userProfile.name,
          auth0_user_id: this.userProfile.sub,
          name: this.userProfile.nickname,
        },
        { headers: headers }
      )
      .then((response: any) => {
        localStorage.setItem('userEmail', this.userProfile.name);
        localStorage.setItem('userId', response.data.id);
      })
      .catch(error => console.log(error));
  };

  public handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        history.replace('/');
        console.log(err);
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
        console.log(err);
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
