import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { connect } from 'react-redux';
import _ from 'lodash';

/* Styling */
import styles from './index.module.scss';

/* Containers */
import AistockCheckOutForm from './AistockCheckOutForm';

/* Components */
import Auth from '../../components/Auth/Auth';
import history from '../../history';

/* Config */
import { AppConfig } from '../../config';

/* Data */
import {
  subscriptionDetailsMapping,
  PAYMENT_MODES,
  SUBSCRIPTION_DETAILS,
} from '../../constants/Subscription/AiStock';

/* Actions */
import { fetchSellerSubscription } from '../../actions/Settings/Subscription';

const stripePromise = loadStripe(AppConfig.STRIPE_API_KEY);

interface PaymentProps {
  location: any;
  auth: Auth;
  sellerSubscription: any;
  fetchSellerSubscription: () => void;
}

const Payment = (props: PaymentProps) => {
  const { auth, sellerSubscription, fetchSellerSubscription } = props;

  const [accountType, setAccountType] = useState<string>('');
  const [paymentMode, setPaymentMode] = useState<string>('');

  /* Get valid subscription name from URL */
  const getSubscriptionNameAndPaymentMode = (search: string) => {
    /* Parsing to obtain plan type */
    const LENGTH_OF_SEARCH_STRING = 5; // Length of "type=", and "mode="
    const DEFAULT_PLAN = 'aistock';
    const DEFAULT_PAYMENT_MODE = 'monthly';
    const startTypeIndex = search.indexOf('type=') + LENGTH_OF_SEARCH_STRING;
    let endTypeIndex = search.indexOf('&', startTypeIndex);
    if (endTypeIndex === -1) {
      endTypeIndex = search.length;
    }

    let subscriptionName = search.substring(startTypeIndex, endTypeIndex);
    if (!subscriptionDetailsMapping[subscriptionName]) {
      subscriptionName = DEFAULT_PLAN;
    }

    /* Parsing to obtain payment mode */
    const startModeIndex = search.indexOf('mode=') + LENGTH_OF_SEARCH_STRING;
    let endModeIndex = search.indexOf('&', startModeIndex);
    if (endModeIndex === -1) {
      endModeIndex = search.length;
    }

    let paymentMode = search.substring(startModeIndex, endModeIndex);
    if (!PAYMENT_MODES.includes(paymentMode)) {
      paymentMode = DEFAULT_PAYMENT_MODE;
    }

    /* If plan mode does not match an available payment method, return default plan
    e.g. type=Seller Scout Pro, with mode=daily */

    const subscriptionDetail = SUBSCRIPTION_DETAILS[subscriptionName];
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
    fetchSellerSubscription();
    const search = window.location.search.toLowerCase();
    const { subscriptionName, paymentMode } = getSubscriptionNameAndPaymentMode(search);
    setAccountType(subscriptionName);
    localStorage.setItem('planType', subscriptionName);
    setPaymentMode(paymentMode);
    localStorage.setItem('paymentMode', paymentMode);
  }, []);

  /* Redirect to app if user is already logged in */
  useEffect(() => {
    const loggedIn =
      sellerSubscription !== undefined || localStorage.getItem('isLoggedIn') === 'true';

    if (loggedIn) {
      localStorage.setItem('loginRedirectPath', '/');
      history.push('/');
    }
  }, [sellerSubscription]);

  return (
    <main className={styles.paymentPage}>
      <section>
        <Elements stripe={stripePromise}>
          <AistockCheckOutForm accountType={accountType} paymentMode={paymentMode} auth={auth} />
        </Elements>
      </section>
    </main>
  );
};

const mapStateToProps = (state: {}) => ({
  subscriptionType: _.get(state, 'subscription.subscriptionType'),
  stripeErrorMessage: _.get(state, 'subscription.stripeErrorMessage'),
  sellerSubscription: _.get(state, 'subscription.sellerSubscription'),
});

const mapDispatchToProps = {
  fetchSellerSubscription: () => fetchSellerSubscription(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
