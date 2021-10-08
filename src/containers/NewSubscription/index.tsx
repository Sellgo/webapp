import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { connect } from 'react-redux';
import _ from 'lodash';

/* Styling */
import styles from './index.module.scss';

/* Utils */
import { isSubscriptionNotPaid, isSubscriptionPaid } from '../../utils/subscriptions';

/* Containers */
import PaidContent from './PaidContent';
import Summary from './Summary';
import SuccessContent from './SuccessContent/SuccessContent';
import CheckoutForm from './CheckOutForm';

/* Components */
import Auth from '../../components/Auth/Auth';

/* Assets */
import newSellgoLogo from '../../assets/images/sellgoNewLogo.png';

/* Config */
import { AppConfig } from '../../config';

/* Data */
import { subscriptionPlans, paymentModes, subscriptionDetails } from './data';

const stripePromise = loadStripe(AppConfig.STRIPE_API_KEY);

interface PaymentProps {
  location: any;
  subscriptionType: string;
  successPayment: any;
  auth: Auth;
  sellerSubscription: any;
}

const Payment = (props: PaymentProps) => {
  const { subscriptionType, successPayment, sellerSubscription, auth } = props;

  const [accountType, setAccountType] = useState<string>('');
  const [paymentMode, setPaymentMode] = useState<string>('');

  /* Get valid subscription name from URL */
  const getSubscriptionNameAndPaymentMode = (search: string) => {
    /* Parsing to obtain plan type */
    const LENGTH_OF_SEARCH_STRING = 5; // Length of "type=", and "mode="
    const DEFAULT_PLAN = 'professional';
    const DEFAULT_PAYMENT_MODE = 'monthly';
    const startTypeIndex = search.indexOf('type=') + LENGTH_OF_SEARCH_STRING;
    let endTypeIndex = search.indexOf('&', startTypeIndex);
    if (endTypeIndex === -1) {
      endTypeIndex = search.length;
    }

    let subscriptionName = search.substring(startTypeIndex, endTypeIndex);
    if (!subscriptionPlans[subscriptionName]) {
      subscriptionName = DEFAULT_PLAN;
    }

    /* Parsing to obtain payment mode */
    const startModeIndex = search.indexOf('mode=') + LENGTH_OF_SEARCH_STRING;
    let endModeIndex = search.indexOf('&', startModeIndex);
    if (endModeIndex === -1) {
      endModeIndex = search.length;
    }

    let paymentMode = search.substring(startModeIndex, endModeIndex);
    if (!paymentModes.includes(paymentMode)) {
      paymentMode = DEFAULT_PAYMENT_MODE;
    }

    /* If plan mode does not match an available payment method, return default plan
    e.g. type=Seller Scout Pro, with mode=daily */

    const subscriptionDetail = subscriptionDetails[subscriptionName];
    let planCost;
    if (paymentMode === 'daily') {
      planCost = subscriptionDetail.dailyPrice;
    } else if (paymentMode === 'monthly') {
      planCost = subscriptionDetail.monthlyPrice;
    } else {
      planCost = subscriptionDetail.annualPrice;
    }

    if (planCost === -1) {
      return {
        subscriptionName: DEFAULT_PLAN,
        paymentMode: DEFAULT_PAYMENT_MODE,
      };
    } else {
      return {
        subscriptionName,
        paymentMode,
      };
    }
  };

  useEffect(() => {
    const search = window.location.search.toLowerCase();
    const { subscriptionName, paymentMode } = getSubscriptionNameAndPaymentMode(search);
    setAccountType(subscriptionName);
    localStorage.setItem('planType', subscriptionName);
    setPaymentMode(paymentMode);
    localStorage.setItem('paymentMode', paymentMode);
  }, []);

  // const loggedIn =
  //   sellerSubscription !== undefined || localStorage.getItem('isLoggedIn') === 'true';

  return (
    <main className={styles.paymentPage}>
      <div className={styles.logo}>
        <img src={newSellgoLogo} alt="Sellgo Company Logo" />
      </div>

      <section>
        <Summary
          planType={accountType}
          paymentMode={paymentMode}
          showCoupon={true && !isSubscriptionPaid(subscriptionType) && !successPayment}
        />

        {!successPayment && isSubscriptionNotPaid(subscriptionType) && (
          <Elements stripe={stripePromise}>
            <CheckoutForm accountType={accountType} paymentMode={paymentMode} auth={auth} />
          </Elements>
        )}
        {isSubscriptionPaid(subscriptionType) && <PaidContent />}

        {successPayment && <SuccessContent sellerSubscription={sellerSubscription} />}
      </section>
    </main>
  );
};

const mapStateToProps = (state: {}) => ({
  subscriptionType: _.get(state, 'subscription.subscriptionType'),
  successPayment: _.get(state, 'subscription.successPayment'),
  stripeErrorMessage: _.get(state, 'subscription.stripeErrorMessage'),
  sellerSubscription: _.get(state, 'subscription.sellerSubscription'),
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
