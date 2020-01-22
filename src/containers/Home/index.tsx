import * as React from 'react';
import queryString from 'query-string';
import history from '../../history';
import { success } from '../../utils/notifications';

export default class Home extends React.Component<any> {
  componentDidMount() {
    const { auth, location } = this.props;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      history.replace('/synthesis');
    } else {
      // Show Auth0 modal automatically.
      // Options can be passed via history.
      // Replace state such as error to display when redirecting back from /callback.
      auth.login(location.state && location.state.options ? location.state.options : {});
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
    // No UI rendered (just Auth0 modal)
    return null;
  }
}
