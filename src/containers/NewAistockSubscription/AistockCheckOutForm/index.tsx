import React, { useState } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

/* Actions */
import {
  setStripeLoading,
  checkPromoCode,
  setPromoError,
  setPromoCode,
} from '../../../actions/Settings/Subscription';

/* Constants */
import { SUBSCRIPTION_PURCHASE_PHASES } from '../../../constants/Subscription/AiStock';

import styles from './index.module.scss';

/* Components */
import PaymentForm from './PaymentForm';
import EmailForm from './EmailForm';

interface Props {
  auth: any;
  accountType: string;
  paymentMode: string;
}

function CheckoutForm(props: Props) {
  const { auth, accountType, paymentMode } = props;
  const [email, setEmail] = useState<string>('');
  const [subscriptionPurchaseStep, setSubscriptionPurchaseStep] = useState<string>(
    SUBSCRIPTION_PURCHASE_PHASES.EMAIL_INPUT
  );

  const handleGoToPayment = () => {
    setSubscriptionPurchaseStep(SUBSCRIPTION_PURCHASE_PHASES.PAYMENT_INPUT);
  };

  return (
    <div className={styles.checkoutContainer}>
      {subscriptionPurchaseStep === SUBSCRIPTION_PURCHASE_PHASES.EMAIL_INPUT ? (
        <EmailForm handleUpdateEmail={setEmail} handleGoToNextStep={handleGoToPayment} />
      ) : (
        <PaymentForm
          accountType={accountType}
          paymentMode={paymentMode}
          auth={auth}
          defaultEmail={email}
        />
      )}
    </div>
  );
}

const mapStateToProps = (state: {}) => ({
  sellerSubscription: get(state, 'subscription.sellerSubscription'),
  stripeLoading: get(state, 'subscription.stripeLoading'),
  redeemedPromoCode: get(state, 'subscription.promoCode'),
  promoLoading: get(state, 'subscription.promoLoading'),
  promoError: get(state, 'subscription.promoError'),
  successPayment: get(state, 'subscription.successPayment'),
});

const mapDispatchToProps = {
  setStripeLoad: (data: boolean) => setStripeLoading(data),
  checkPromoCode: (promoCode: string, subscriptionId: number, paymentMode: string) =>
    checkPromoCode(promoCode, subscriptionId, paymentMode),
  setRedeemedPromoCode: (data: any) => setPromoCode(data),
  setPromoError: (data: string) => setPromoError(data),
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
