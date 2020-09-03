import React from 'react';
import './index.scss';
import { Grid, Image } from 'semantic-ui-react';
import Auth from '../../components/Auth/Auth';
import Summary from './Summary';
import Login from './Login';
import Signup from './Signup';

interface SubscriptionProps {
  auth: Auth;
}

interface SubscriptionStates {
  isLogin: boolean;
  isSignup: boolean;
  accountType: string;
  paymentMode: string;
}

class Subscription extends React.Component<SubscriptionProps, SubscriptionStates> {
  state = {
    isLogin: false,
    isSignup: true,
    accountType: '',
    paymentMode: '',
  };

  componentDidMount() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.setLogin();
      localStorage.setItem('isLoggedIn', 'false');
    } else if (window.location.search.indexOf('-unverified') !== -1) {
      this.setLogin();
    }
    this.setState(
      {
        accountType: window.location.search.indexOf('basic') !== -1 ? 'basic' : 'pro',
        paymentMode: window.location.search.indexOf('yearly') !== -1 ? 'yearly' : 'monthly',
      },
      () => {
        localStorage.setItem('planType', this.state.accountType);
        localStorage.setItem('paymentMode', this.state.paymentMode);
      }
    );
  }

  setSignup() {
    window.location.search =
      '?type=' + this.state.accountType + '&' + 'mode=' + this.state.paymentMode;
    this.setState({
      isSignup: true,
      isLogin: false,
    });
  }

  setLogin() {
    this.setState({
      isLogin: true,
      isSignup: false,
    });
  }

  render() {
    const { isLogin, isSignup, accountType, paymentMode } = this.state;
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
            <Summary planType={accountType} paymentMode={paymentMode} />
            {isLogin && <Login auth={auth} setSignup={this.setSignup.bind(this)} />}
            {isSignup && <Signup auth={auth} setLogin={this.setLogin.bind(this)} />}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
export default Subscription;
