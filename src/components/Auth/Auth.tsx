import Auth0Lock from 'auth0-lock';
import history from '../../history';
import axios from 'axios';
import { AppConfig } from '../../config';

export default class Auth {
  accessToken: any;
  idToken: any;
  expiresAt: any;
  userProfile: any;

  public auth0Lock = new Auth0Lock(AppConfig.clientID, AppConfig.domain, {
    auth: {
      redirectUrl: AppConfig.callbackUrl,
      responseType: 'token id_token',
      params: {
        scope: 'openid profile',
      },
    },
    allowShowPassword: true,
    autoclose: true,
    theme: {
      logo: '/images/sellgo_logo_black.png',
      primaryColor: '#4285F4',
    },
    languageDictionary: {
      emailInputPlaceholder: 'something@youremail.com',
      title: '',
      signUpTitle: '',
      forgotPasswordTitle: '',
    },
    allowSignUp: true,
  });
  public login = () => {
    this.auth0Lock.show();
  };

  registerSeller = () => {
    const headers = { Authorization: `Bearer ${this.idToken}`, 'Content-Type': 'application/json' };
    const formData = new FormData();
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(this.userProfile.name)) {
      localStorage.setItem('userEmail', this.userProfile.name);
      formData.append('email', this.userProfile.name);
    } else {
      localStorage.setItem('userEmail', '');
    }
    if (this.userProfile.given_name || this.userProfile.family_name) {
      formData.append('name', `${this.userProfile.given_name} ${this.userProfile.family_name}`);
    }
    formData.append('auth0_user_id', this.userProfile.sub);

    axios
      .post(AppConfig.BASE_URL_API + 'seller/', formData, { headers })
      .then((response: any) => {
        const data = response.data[0] ? response.data[0] : response.data;
        if (data) {
          localStorage.setItem('userId', data.id);
          localStorage.setItem('cDate', data.cdate);
          history.replace('/');
        }
      })
      .catch();
  };

  public handleAuthentication = () => {
    this.auth0Lock.checkSession({}, (err, authResult) => {
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
    // Set the time that the access token will expire at
    const date = new Date();
    date.setSeconds(date.getSeconds() + authResult.expiresIn);
    this.expiresAt = date.getTime();
    this.idToken = authResult.idToken;
    this.accessToken = authResult.accessToken;
    localStorage.setItem('idToken', this.idToken);
    localStorage.setItem('idTokenExpires', String(this.expiresAt));
    localStorage.setItem('isLoggedIn', 'true');
    this.getProfile((err: any, profile: any) => {
      this.registerSeller();
    });
  };

  getProfile(cb: any) {
    this.auth0Lock.getUserInfo(this.accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
        localStorage.setItem('auth0_user_id', this.userProfile.sub);
        localStorage.setItem('nickName', this.userProfile.nickname);
      }
      cb(err, profile);
    });
  }

  public removeStoredItems = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    localStorage.removeItem('idToken');
    localStorage.removeItem('idTokenExpires');
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

    // navigate to the home route
    // history.replace('/');
  };

  public isAuthenticated = () => {
    const expiresAt = localStorage.getItem('idTokenExpires');
    if (expiresAt === null) {
      return false;
    }
    return new Date().getTime() < new Date(Number(expiresAt)).getTime();
  };
}
