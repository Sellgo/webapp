import React, { useState, useEffect } from 'react';
import './index.scss';
import { Container, Grid, Image } from 'semantic-ui-react';
import StepsContent from '../StepsContent';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import Summary from '../Summary';
import { connect } from 'react-redux';
import { isSubscriptionNotPaid, isSubscriptionPaid } from '../../../utils/subscriptions';
import PaidContent from './PaidContent';
import { AppConfig } from '../../../config';
import get from 'lodash/get';
import SuccessContent from './SuccessContent';
import _ from 'lodash';
import Auth from '../../../components/Auth/Auth';
import history from '../../../history';
const stripePromise = loadStripe(AppConfig.STRIPE_API_KEY);

interface PaymentProps {
  location: any;
  subscriptionType: string;
  successPayment: any;
  stripeErrorMessage: any;
  auth: Auth;
}
const Payment = (props: PaymentProps) => {
  const [paymentError, setPaymentError] = useState(false);
  const [paymentErrorMessage, setPaymentErrorMessage] = useState('');
  const { subscriptionType, successPayment, stripeErrorMessage } = props;
  const accountType = localStorage.getItem('planType') || '';

  const handlePaymentError = (data: any) => {
    if (_.isEmpty(data)) return;
    setPaymentError(true);
    setPaymentErrorMessage(data.message);
  };

  const sellerID = localStorage.getItem('userId');
  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      localStorage.setItem('loginRedirectPath', '/');
      history.push('/settings/pricing');
    } else if (_.isEmpty(sellerID)) {
      history.push('/subscription');
    }
    handlePaymentError(stripeErrorMessage);
  }, [stripeErrorMessage]);

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
            {!successPayment && isSubscriptionNotPaid(subscriptionType) && paymentError && (
              <div className="payment-container__error">
                <div className="payment-container__error__title">{paymentErrorMessage}</div>
              </div>
            )}
            {!successPayment && isSubscriptionNotPaid(subscriptionType) && (
              <Elements stripe={stripePromise}>
                <CheckoutForm accountType={accountType} handlePaymentError={handlePaymentError} />
              </Elements>
            )}
            {isSubscriptionPaid(subscriptionType) && <PaidContent />}
            {successPayment && <SuccessContent />}
          </Container>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const mapStateToProps = (state: any) => ({
  subscriptionType: state.subscription.subscriptionType,
  successPayment: get(state, 'subscription.successPayment'),
  stripeErrorMessage: get(state, 'subscription.stripeErrorMessage'),
});

export default connect(mapStateToProps)(Payment);
