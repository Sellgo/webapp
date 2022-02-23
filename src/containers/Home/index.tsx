import * as React from 'react';
import queryString from 'query-string';
import history from '../../history';
import { success } from '../../utils/notifications';
import Login from '../Login';
import Auth from '../../components/Auth/Auth';

const auth = new Auth();
// export default class Home extends React.Component<any> {
class Home extends React.Component<any> {
  componentDidMount() {
    const { location } = this.props;
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
      if (localStorage.getItem('isAiStock') === 'true') {
        history.replace('/aistock/sales');
      } else {
        history.replace('/synthesis');
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
      <Login auth={auth} location={location} />
    ) : null;
  }
}

export default Home;
