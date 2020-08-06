import React from 'react';
import './index.scss';
import { Container, Grid, Image } from 'semantic-ui-react';
import StepsContent from '../StepsContent';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import Summary from '../Summary';
import { connect } from 'react-redux';
import { isSubscriptionNotPaid, isSubscriptionPaid } from '../../../utils/subscriptions';
import Auth from '../../../components/Auth/Auth';
import PaidContent from './PaidContent';
import { AppConfig } from '../../../config';
import get from 'lodash/get';
import SuccessContent from './SuccessContent';
const stripePromise = loadStripe(AppConfig.STRIPE_API_KEY);

interface PaymentProps {
  auth: Auth;
  location: any;
  subscriptionType: string;
  successPayment: any;
}
const Payment = (props: PaymentProps) => {
  // class Payment extends React.Component<PaymentProps> {

  const { subscriptionType, auth, successPayment } = props;
  const accountType = window.location.search === '?type=basic' ? 'basic' : 'pro';
  localStorage.setItem('planType', accountType);

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
            {!successPayment && isSubscriptionNotPaid(subscriptionType) && (
              <Elements stripe={stripePromise}>
                <CheckoutForm accountType={accountType} />
              </Elements>
            )}
            {isSubscriptionPaid(subscriptionType) && <PaidContent auth={auth} />}
            {successPayment && <SuccessContent auth={auth} />}
          </Container>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const mapStateToProps = (state: any) => ({
  subscriptionType: state.subscription.subscriptionType,
  successPayment: get(state, 'subscription.successPayment'),
});

export default connect(mapStateToProps)(Payment);
