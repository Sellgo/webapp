import React from 'react';
import './index.scss';
import { Container, Grid, Image } from 'semantic-ui-react';
import StepsContent from '../StepsContent';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import Summary from '../Summary';
import { connect } from 'react-redux';
import { isSubscriptionNotPaid } from '../../../utils/subscriptions';
import Auth from '../../../components/Auth/Auth';
import PaidContent from './PaidContent';
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

interface PaymentProps {
  auth: Auth;
  location: any;
  subscriptionType: string;
}
class Payment extends React.Component<PaymentProps> {
  state = {
    accountType: '',
  };
  componentDidMount() {
    this.setState(
      {
        accountType: window.location.search === '?type=basic' ? 'basic' : 'pro',
      },
      () => {
        localStorage.setItem('planType', this.state.accountType);
      }
    );
  }
  render() {
    const { accountType } = this.state;
    const { subscriptionType, auth } = this.props;
    console.log('subscriptionType: ', subscriptionType);
    console.log(isSubscriptionNotPaid(subscriptionType));
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
            <Container text className="payment-container">
              <StepsContent contentType={'payment'} />
              {isSubscriptionNotPaid(subscriptionType) ? (
                <Elements stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              ) : (
                <PaidContent auth={auth} />
              )}
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state: any) => ({
  subscriptionType: state.subscription.subscriptionType,
});

export default connect(mapStateToProps)(Payment);
