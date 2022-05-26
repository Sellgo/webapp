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
import { isSubscriptionNotPaid, isSubscriptionPaid } from '../../../utils/subscriptions';

/* Containers */
import PaidContent from './PaidContent';
import Summary from './Summary';
import SuccessContent from './SuccessContent/SuccessContent';
import CheckoutForm from './CheckOutForm';
import StepsContent from './StepsContent';

/* Components */
import Auth from '../../../components/Auth/Auth';
import history from '../../../history';

/* Assets */
import newSellgoLogo from '../../../assets/images/sellgoNewLogo.png';

/* Config */
import { AppConfig } from '../../../config';

const stripePromise = loadStripe(AppConfig.STRIPE_API_KEY);

interface PaymentProps {
  location: any;
  subscriptionType: string;
  successPayment: any;
  stripeErrorMessage: any;
  auth: Auth;
  sellerSubscription: any;
  fetchSellerSubscription: () => void;
}

const Payment = (props: PaymentProps) => {
  const {
    subscriptionType,
    successPayment,
    stripeErrorMessage,
    sellerSubscription,
    fetchSellerSubscription,
  } = props;

  const [paymentError, setPaymentError] = useState(false);
  const [paymentErrorMessage, setPaymentErrorMessage] = useState('');

  const [accountType, setAccountType] = useState<string>(localStorage.getItem('planType') || '');
  const [paymentMode, setPaymentMode] = useState<string>(localStorage.getItem('paymentMode') || '');
  const sellerID = localStorage.getItem('userId');

  const handlePaymentError = (data: any) => {
    if (_.isEmpty(data)) return;
    setPaymentError(true);
    setPaymentErrorMessage(data.message);
  };

  useEffect(() => {
    localStorage.setItem('loginRedirectPath', '/');

    if (localStorage.getItem('isLoggedIn') === 'true') {
      localStorage.setItem('loginRedirectPath', '/');
    } else if (_.isEmpty(sellerID)) {
      history.push('/subscription');
    }
    if (sellerSubscription === undefined && localStorage.getItem('idToken') !== null) {
      Axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('idToken')}`;
      fetchSellerSubscription();
      return;
    }
    handlePaymentError(stripeErrorMessage);
  }, [stripeErrorMessage, sellerSubscription]);

  const loggedIn =
    sellerSubscription !== undefined || localStorage.getItem('isLoggedIn') === 'true';

  return (
    <main className={styles.paymentPage}>
      <div className={styles.logo}>
        <img src={newSellgoLogo} alt="Sellgo Company Logo" />
      </div>

      <section>
        <Summary
          hideChangePlan={successPayment}
          setPlanType={setAccountType}
          setPaymentMode={setPaymentMode}
          planType={accountType}
          paymentMode={paymentMode}
          showCoupon={true && !isSubscriptionPaid(subscriptionType) && !successPayment}
        />

        <StepsContent contentType={'payment'} loggedIn={loggedIn} />
        {!successPayment && isSubscriptionNotPaid(subscriptionType) && paymentError && (
          <div className={styles.paymentErrorMessage}>
            <p>{paymentErrorMessage}</p>
          </div>
        )}

        {!successPayment && isSubscriptionNotPaid(subscriptionType) && (
          <Elements stripe={stripePromise}>
            <CheckoutForm
              accountType={accountType}
              paymentMode={paymentMode}
              handlePaymentError={handlePaymentError}
            />
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
const mapDispatchToProps = {
  fetchSellerSubscription: () => fetchSellerSubscription(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
