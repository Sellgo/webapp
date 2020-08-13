import * as React from 'react';
import queryString from 'query-string';
import history from '../../history';
import { success } from '../../utils/notifications';
import Login from '../Login';

export default class Home extends React.Component<any> {
  componentDidMount() {
    const { location } = this.props;
    let redirectPath = localStorage.getItem('loginRedirectPath');
    if (localStorage.getItem('isLoggedIn') === 'true') {
      history.replace('/synthesis');
    }
    if (location.state && redirectPath) {
      if (
        location.state.options &&
        location.state.options.flashMessage.text === 'Please verify your email before logging in.'
      ) {
        redirectPath = redirectPath + '-unverified';
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
