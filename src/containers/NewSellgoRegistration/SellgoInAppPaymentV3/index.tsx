import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { connect } from 'react-redux';
import _ from 'lodash';

/* Styling */
import styles from './index.module.scss';

/* Actions */
import { fetchSellerSubscription } from '../../../actions/Settings/Subscription';

/* Utils */
import { isSubscriptionIdPaid } from '../../../utils/subscriptions';

/* Containers */
// import PaidContent from './PaidContent';
import SuccessContent from './SuccessContent/SuccessContent';
import CheckoutForm from './CheckOutForm';

/* Components */
import Auth from '../../../components/Auth/Auth';
// import history from '../../../history';
// import LeftArrow from '../../../assets/images/leftArrowLong.svg';

/* Config */
import { AppConfig } from '../../../config';
import { subscriptionDetailsMappingByPlanName } from '../../../constants/Subscription/Sellgo';

const stripePromise = loadStripe(AppConfig.STRIPE_API_KEY);
interface PaymentProps {
  location?: any;
  subscriptionType?: string;
  successPayment: any;
  stripeErrorMessage: any;
  auth: Auth;
  sellerSubscription: any;
  fetchSellerSubscription: () => void;
  userName: string;
  email: string;
  password: string;
}

const Payment = (props: PaymentProps) => {
  const {
    auth,
    successPayment,
    stripeErrorMessage,
    sellerSubscription,
    fetchSellerSubscription,
    userName,
    email,
    password,
  } = props;

  const [paymentError, setPaymentError] = useState(false);
  const [paymentErrorMessage, setPaymentErrorMessage] = useState('');

  let accountType;
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const plan = urlParams.get('plan');
  console.log('plan 52 => ', plan);
  if (!plan) {
    accountType = 'starter';
  } else {
    const temp = plan.split('_')[0]?.toLowerCase();
    accountType = subscriptionDetailsMappingByPlanName[temp];
    if (!accountType) {
      accountType = 'starter';
    }
  }
  const paymentMode = 'yearly';
  let isFreeTrial = true;
  const td = urlParams.get('td');
  if (td && td === 'buynow') {
    isFreeTrial = false;
  }

  // const sellerID = localStorage.getItem('userId');

  const handlePaymentError = (data: any) => {
    if (_.isEmpty(data)) return;
    setPaymentError(true);
    setPaymentErrorMessage(data.message);
  };

  console.log('seller subscription');

  useEffect(() => {
    localStorage.setItem('loginRedirectPath', '/');

    if (localStorage.getItem('isLoggedIn') === 'true') {
      localStorage.setItem('loginRedirectPath', '/');
    }
    // else if (_.isEmpty(sellerID)) {
    //   history.push('/subscription');
    // }
    if (sellerSubscription === undefined && localStorage.getItem('idToken') !== null) {
      Axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('idToken')}`;
      fetchSellerSubscription();
      return;
    }
    handlePaymentError(stripeErrorMessage);
  }, [stripeErrorMessage, sellerSubscription]);

  return (
    <main className={styles.paymentPage}>
      <section>
        {/* {!successPayment && (
          <button className={styles.goBackButton} onClick={() => history.goBack()}>
            <img src={LeftArrow} alt="left arrow" />
            Back
          </button>
        )} */}
        <Elements stripe={stripePromise}>
          <CheckoutForm
            auth={auth}
            accountType={accountType}
            paymentMode={paymentMode}
            handlePaymentError={handlePaymentError}
            isPayNow={!isFreeTrial}
            userName={userName}
            email={email}
            password={password}
          />
        </Elements>
        {/* {!successPayment && !isSubscriptionIdPaid(sellerSubscription?.subscription_id) && (
          
        )} */}
        {!successPayment &&
          !isSubscriptionIdPaid(sellerSubscription?.subscription_id) &&
          paymentError && (
            <div className={styles.paymentErrorMessage}>
              <p>{paymentErrorMessage}</p>
            </div>
          )}
        {/* {isSubscriptionIdPaid(sellerSubscription?.subscription_id) && <PaidContent />} */}

        {successPayment && <SuccessContent />}
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
const mapDispatchToProps = {
  fetchSellerSubscription: () => fetchSellerSubscription(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
