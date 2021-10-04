import React, { useState } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Form, Dropdown, Loader } from 'semantic-ui-react';
import Axios from 'axios';

/* Constants */
import { countryList } from '../../../../constants/Settings';
import { postalCode } from '../../../../constants/Validators';

/* App Config */
import { AppConfig } from '../../../../config';

/* Actions */
import {
  createSubscription,
  retryInvoiceWithNewPaymentMethod,
  setStripeLoading,
  checkPromoCode,
  setPromoError,
  setPromoCode,
} from '../../../../actions/Settings/Subscription';

/* Hooks */
import { useInput } from '../../../../hooks/useInput';

/* Assets */
import cardIcons from '../../../../assets/images/4_Card_color_horizontal.svg';
import stripeIcon from '../../../../assets/images/powered_by_stripe.svg';

/* Data */
import { subscriptionPlans } from '../../data';

/* Styling */
import styles from './index.module.scss';

/* Types */
import { PromoCode } from '../../../../interfaces/Subscription';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#808080',
      fontFamily: "'Work Sans', sans-serif",
      fontSmoothing: 'antialiased',
      '::placeholder': {
        color: 'rgba(0,0,0,0.3)',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

interface MyProps {
  sellerSubscription: any;
  accountType: string;
  paymentMode: string;
  createSubscriptionData: (data: any) => void;
  retryInvoice: (data: any) => void;
  handlePaymentError: (data: any) => void;
  setStripeLoad: (data: boolean) => void;
  stripeLoading: boolean;
  checkPromoCode: (data: string) => void;
  promoLoading: boolean;
  setRedeemedPromoCode: (promoCode: any) => void;
  redeemedPromoCode: PromoCode;
  setPromoError: (err: string) => void;
  promoError: string;
}

function CheckoutForm(props: MyProps) {
  const stripe: any = useStripe();
  const elements = useElements();
  const {
    stripeLoading,
    checkPromoCode,
    redeemedPromoCode,
    promoError,
    promoLoading,
    setRedeemedPromoCode,
    setPromoError,
    setStripeLoad,
    handlePaymentError,
    paymentMode,
    accountType,
    retryInvoice,
    createSubscriptionData
  } = props;
  const [isPromoCodeChecked, setPromoCodeChecked] = useState<boolean>(false);
  const [promoCode, setPromoCode] = useState<string>('');
  const { value: name, bind: bindName } = useInput('');
  const { value: email, bind: bindEmail } = useInput('');
  const { value: firstName, bind: bindFirstName } = useInput('');
  const { value: lastName, bind: bindLastName } = useInput('');
  const [emailError, setEmailError] = useState(false);
  const [fnameError, setFnameError] = useState(false);
  const [lnameError, setLnameError] = useState(false);

  /* Upon successful checking of the entered promo code, either a valid redeemedPromoCode code 
  is returned, or an error message is returned. Upon completion of promo code check, set status 
  to checked and display success/error msg. */
  React.useEffect(() => {
    if (
      (redeemedPromoCode && redeemedPromoCode.message && redeemedPromoCode.message.length > 0) ||
      promoError.length > 0
    ) {
      setPromoCodeChecked(true);
    }
  }, [redeemedPromoCode, promoError]);

  const handleCheckPromoCode = async (event: any) => {
    event.preventDefault();
    checkPromoCode(promoCode);
  };

  const handlePromoCodeChange = (event: any) => {
    setPromoCode(event.target.value.toUpperCase());
    setPromoCodeChecked(false);
    setRedeemedPromoCode({});
    setPromoError('');
  };

  const getSubscriptionID = (planName: string) => {
    const DEFAULT_PROFESSIONAL_PLAN_ID = 2;
    const id = subscriptionPlans[planName];
    if (id) {
      return id;
    } else {
      return DEFAULT_PROFESSIONAL_PLAN_ID;
    }
  };

  const handleSubmit = async (event: any) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setStripeLoad(true);
    const cardElement = elements.getElement(CardNumberElement);

    // If a previous payment was attempted, get the latest invoice
    const latestInvoicePaymentIntentStatus = localStorage.getItem(
      'latestInvoicePaymentIntentStatus'
    );

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: name,
      },
    });

    if (error) {
      handlePaymentError(error);
      setStripeLoad(false);
    } else {
      const paymentMethodId = paymentMethod.id;
      if (latestInvoicePaymentIntentStatus === 'requires_payment_method') {
        // Update the payment method and retry invoice payment
        const invoiceId = localStorage.getItem('latestInvoiceId');
        retryInvoice({
          paymentMethodId,
          invoiceId,
        });
      } else {
        const data = {
          subscription_id: getSubscriptionID(accountType),
          payment_method_id: paymentMethodId,
          payment_mode: paymentMode,
          promo_code: promoCode,
          // Need to just add seller_id here
        };
        Axios.defaults.headers.common.Authorization = ``;
        createSubscriptionData(data);
      }
    }
  };

  return (
    <div className={styles.checkoutContainer}>
      <h2>Secure Credit Card Payment</h2>

      <form onSubmit={handleSubmit}>
      <Form.Group className={styles.formGroup}>
        <Form.Input
          size="huge"
          label="First Name"
          type="text"
          placeholder="First Name"
          required
          {...bindFirstName}
          error={fnameError}
          className={styles.formInput}
        />

        <Form.Input
          size="huge"
          label="Last Name"
          type="text"
          placeholder="Last Name"
          required
          {...bindLastName}
          error={lnameError}
          className={styles.formInput}
        />
      </Form.Group>
      <Form.Group className={styles.formGroup}>
        <Form.Input
          size="huge"
          label="Email"
          type="mail"
          placeholder="Email"
          {...bindEmail}
          error={emailError}
          className={styles.formInput}
        />
      </Form.Group>
      <Form.Group className={styles.formGroup}>
       <Form.Input
          size="huge"
          label="Email"
          type="mail"
          placeholder="Email"
          {...bindEmail}
          error={emailError}
          className={styles.formInput}
        />
      </Form.Group>
        <Form.Group className={styles.formGroup}>
          <Form.Field className={`${styles.formInput}`}>
            <label htmlFor="CardNumber">Credit Card Number</label>
            <CardNumberElement
              id="CardNumber"
              options={CARD_ELEMENT_OPTIONS}
              className={styles.stripeInput}
            />
          </Form.Field>

          <Form.Field className={`${styles.formInput} ${styles.formInput__expiry}`}>
            <label htmlFor="expiry">Expiry Date</label>
            <CardExpiryElement
              id="expiry"
              options={CARD_ELEMENT_OPTIONS}
              className={`${styles.stripeInput} ${styles.stripeInput__expiry}`}
            />
          </Form.Field>

          <Form.Field className={`${styles.formInput} ${styles.formInput__expiry}`}>
            <label htmlFor="cvc">CVC</label>
            <CardCvcElement
              id="cvc"
              options={CARD_ELEMENT_OPTIONS}
              className={`${styles.stripeInput} ${styles.stripeInput__cvv}`}
            />
          </Form.Field>
        </Form.Group>

        <h2>Redeem Coupon</h2>
        <Form.Group className={`${styles.formGroup} ${styles.formGroup__promo}`}>
          <Form.Input
            className={`${styles.formInput} ${styles.formInput__promo}`}
            size="huge"
            type="text"
            placeholder="Coupon Code"
            value={promoCode}
            onChange={handlePromoCodeChange}
          />
          <button
            disabled={!promoCode || promoLoading}
            className={styles.redeemButton}
            onClick={handleCheckPromoCode}
          >
            Redeem
          </button>
          <p className={styles.redemptionMessage__success}>
            {isPromoCodeChecked && redeemedPromoCode && redeemedPromoCode.message}
          </p>
          <p className={styles.redemptionMessage__error}>{isPromoCodeChecked && promoError}</p>
        </Form.Group>

        <div className={styles.paymentMeta}>
          <div className={styles.cardsWrapper}>
            <img className={styles.cardsWrapper__cards} src={cardIcons} alt="cards" />
            <img className={styles.cardsWrapper__stripe} src={stripeIcon} alt="powered by stripe" />
          </div>
          <button
            disabled={!stripe || stripeLoading}
            type="submit"
            className={styles.completeButton}
          >
            Complete Payment
            {stripeLoading && <Loader active inline size="mini" inverted />}
          </button>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state: {}) => ({
  sellerSubscription: get(state, 'subscription.sellerSubscription'),
  stripeLoading: get(state, 'subscription.stripeLoading'),
  redeemedPromoCode: get(state, 'subscription.promoCode'),
  promoLoading: get(state, 'subscription.promoLoading'),
  promoError: get(state, 'subscription.promoError'),
});
const mapDispatchToProps = {
  createSubscriptionData: (data: any) => createSubscription(data),
  retryInvoice: (data: any) => retryInvoiceWithNewPaymentMethod(data),
  setStripeLoad: (data: boolean) => setStripeLoading(data),
  checkPromoCode: (data: string) => checkPromoCode(data),
  setRedeemedPromoCode: (data: any) => setPromoCode(data),
  setPromoError: (data: string) => setPromoError(data),
};
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
