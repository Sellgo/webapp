import React from 'react';
import './index.scss';
import { Grid, Image } from 'semantic-ui-react';
import Auth from '../../components/Auth/Auth';
import Summary from './Summary';
import Login from './Login';
import Signup from './Signup';
import history from '../../history';

interface SubscriptionProps {
  auth: Auth;
}

interface SubscriptionStates {
  isLogin: boolean;
  isSignup: boolean;
  accountType: string;
}

class Subscription extends React.Component<SubscriptionProps, SubscriptionStates> {
  state = {
    isLogin: false,
    isSignup: true,
    accountType: '',
  };

  componentDidMount() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      localStorage.setItem('loginRedirectPath', '/');
      history.push('/settings/pricing');
    } else if (window.location.search.indexOf('-unverified') !== -1) {
      this.setLogin();
    }
    this.setState(
      {
        accountType: window.location.search.indexOf('basic') !== -1 ? 'basic' : 'pro',
      },
      () => {
        localStorage.setItem('planType', this.state.accountType);
      }
    );
  }

  setSignup() {
    localStorage.setItem('loginRedirectPath', '/subscription?type=' + this.state.accountType);
    window.location.search = '?type=' + this.state.accountType;
    this.setState({
      isSignup: true,
      isLogin: false,
    });
  }

  setLogin() {
    localStorage.setItem('loginRedirectPath', '/subscription' + window.location.search);
    this.setState({
      isLogin: true,
      isSignup: false,
    });
  }

  render() {
    const { isLogin, isSignup, accountType } = this.state;
    const { auth } = this.props;
    return (
      <Grid className="subscription-page" columns={2}>
        <Grid.Row>
          <Grid.Column width={5} className="subscription-page__logo-container">
            <div className="subscription-page__logo-container__image">
              <Image src="/images/sellgo_grey_logo.svg" wrapped={true} />
            </div>
          </Grid.Column>
          <Grid.Column width={11} className="subscription-page__content">
            <Summary planType={accountType} />
            {isLogin && (
              <Login auth={auth} planType={accountType} setSignup={this.setSignup.bind(this)} />
            )}
            {isSignup && <Signup auth={auth} setLogin={this.setLogin.bind(this)} />}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
export default Subscription;
