import React from 'react';
import './index.scss';
import { Grid, Image } from 'semantic-ui-react';
import Auth from '../../components/Auth/Auth';
import Summary from './Summary';
import Login from './Login';

interface SubscriptionProps {
  auth: Auth;
}

interface SubscriptionStates {
  isLogin: boolean;
  isSignup: boolean;
}

class Subscription extends React.Component<SubscriptionProps, SubscriptionStates> {
  state = {
    isLogin: true,
    isSignup: false,
  };

  setSignup() {
    this.setState({
      isSignup: true,
    });
  }

  render() {
    const { isLogin, isSignup } = this.state;
    const { auth } = this.props;
    return (
      <Grid className="subscription-page" columns={2}>
        <Grid.Row>
          <Grid.Column width={5} className="subscription-page__logo-container">
            <div className="subscription-page__container__image">
              <Image src="/images/sellgo_grey_logo.svg" wrapped={true} />
            </div>
          </Grid.Column>
          <Grid.Column width={11} className="subscription-page__content">
            <Summary />
            {isLogin && <Login auth={auth} setSignup={this.setSignup} />}
            {isSignup && <Login auth={auth} setSignup={this.setSignup} />}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
export default Subscription;
