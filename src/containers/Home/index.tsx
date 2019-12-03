import * as React from 'react';
import history from '../../history';

export default class Home extends React.Component<any> {
  componentDidMount() {
    const { auth, location } = this.props;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      history.replace('/synthesis');
    } else {
      // Show Auth0 modal automatically
      // Options can be passed via history.replace state
      // such as error to display when redirecting back from /callback.
      auth.login(location.state && location.state.options ? location.state.options : {});
    }
  }

  render() {
    // No UI rendered (just Auth0 modal)
    return null;
  }
}
