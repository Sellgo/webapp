import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { connect } from 'react-redux';
import _ from 'lodash';

/* Styling */
import styles from './index.module.scss';

/* Actions */
import { fetchSellerSubscription } from '../../../../../actions/Settings/Subscription';

/* Utils */

/* Containers */
// import PaidContent from './PaidContent';
// import SuccessContent from './SuccessContent/SuccessContent';
import UpdateSubscriptionDetails from './UpdateSubscriptionDetails';

/* Components */
import Auth from '../../../../../components/Auth/Auth';
import history from '../../../../../history';
import LeftArrow from '../../../../../assets/images/leftArrowLong.svg';

/* Config */
import { AppConfig } from '../../../../../config';
import SuccessContent from './SuccessContent/SuccessContent';

const stripePromise = loadStripe(AppConfig.STRIPE_API_KEY);

interface PaymentProps {
  location: any;
  subscriptionType: string;
  stripeErrorMessage: any;
  auth: Auth;
  sellerSubscription: any;
  fetchSellerSubscription: () => void;
}

const Payment = (props: PaymentProps) => {
  const { stripeErrorMessage, sellerSubscription, fetchSellerSubscription } = props;
  const [successPayment, setSuccessPayment] = useState<boolean>(false);
  const accountType = localStorage.getItem('planType') || '';
  const paymentMode = localStorage.getItem('paymentMode') || '';
  const sellerID = localStorage.getItem('userId');
  const [prorateValue, setProrateValue] = useState<number>();
  console.log('Seller subscription', sellerSubscription);

  useEffect(() => {
    if (sellerSubscription && sellerSubscription.is_trialing) {
      history.push('/settings/pricing');
    }
  }, [sellerSubscription]);

  const fetchCurrentProtate = async () => {
    try {
      const URL = `${AppConfig.BASE_URL_API}sellers/${sellerID}/billing/current-prorate`;

      const { data } = await Axios.get(URL);
      const { prorate } = data;
      setProrateValue(Number(prorate));
      console.log('56 =>', data);
    } catch (err) {
      console.log('Err while getting ');
    }
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
    if (sellerSubscription) {
      fetchCurrentProtate();
    }
  }, [stripeErrorMessage, sellerSubscription]);

  return (
    <main className={styles.paymentPage}>
      <section>
        {!successPayment && (
          <button className={styles.goBackButton} onClick={() => history.goBack()}>
            <img src={LeftArrow} alt="left arrow" />
            Back to previous page
          </button>
        )}
        {!successPayment && sellerSubscription && prorateValue && (
          <Elements stripe={stripePromise}>
            <UpdateSubscriptionDetails
              accountType={accountType}
              paymentMode={paymentMode}
              prorateValue={prorateValue}
              setSuccessPayment={setSuccessPayment}
            />
          </Elements>
        )}
        {successPayment && <SuccessContent />}
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
