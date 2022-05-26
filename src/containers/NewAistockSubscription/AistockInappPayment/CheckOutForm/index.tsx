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
import { Form, Loader } from 'semantic-ui-react';
import Axios from 'axios';

/* Actions */
import {
  createSubscription,
  retryInvoiceWithNewPaymentMethod,
  setStripeLoading,
  checkPromoCode,
  setPromoError,
  setPromoCode,
} from '../../../../actions/Settings/Subscription';

/* Assets */
import cardIcons from '../../../../assets/images/4_Card_color_horizontal.svg';
import stripeIcon from '../../../../assets/images/powered_by_stripe.svg';

/* Styling */
import styles from './index.module.scss';

/* Types */
import { PromoCode } from '../../../../interfaces/Subscription';

/* Utils */
import { getSubscriptionID } from '../../../../constants/Subscription/AiStock';
import { generatePromoCodeMessage } from '../../../../utils/subscriptions';
import ActionButton from '../../../../components/ActionButton';

/* Data */
import { ORDER_ITEMS, getTotalOrderPrice } from '../../AistockCheckOutForm/data';

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
  checkPromoCode: (promoCode: string, subscriptionId: number, paymentMode: string) => void;
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
    accountType,
    paymentMode,
  } = props;
  const [isPromoCodeChecked, setPromoCodeChecked] = useState<boolean>(false);
  const [promoCode, setPromoCode] = useState<string>('');

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
    const subscriptionId = getSubscriptionID(accountType);
    Axios.defaults.headers.common.Authorization = ``;
    checkPromoCode(promoCode, subscriptionId, paymentMode);
  };

  const handlePromoCodeChange = (event: any) => {
    setPromoCode(event.target.value.toUpperCase());
    setPromoCodeChecked(false);
    setRedeemedPromoCode({});
    setPromoError('');
  };

  const handleSubmit = async () => {
    const {
      accountType,
      paymentMode,
      createSubscriptionData,
      retryInvoice,
      handlePaymentError,
      setStripeLoad,
    } = props;
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
        };
        Axios.defaults.headers.common.Authorization = ``;
        createSubscriptionData(data);
      }
    }
  };
  return (
    <div className={styles.paymentInfoForm}>
      <h2> Order Summary </h2>
      <div className={styles.orderItemsWrapper}>
        {ORDER_ITEMS.map((order: any, index: number) => (
          <div className={styles.orderItem} key={index}>
            <p className={styles.orderTitle}>{order.title}</p>
            <p className={styles.orderPrice}>${order.price}</p>
          </div>
        ))}
        <div className={styles.totalPrice}>
          <p>Total charges today </p>
          <p>${getTotalOrderPrice()} </p>
        </div>
      </div>
      <h2>Secure Credit Card Payment</h2>
      <Form.Group className={styles.formGroup}>
        <Form.Field className={`${styles.formInput} ${styles.formInput__creditCard}`}>
          <label htmlFor="CardNumber">Credit Card Number</label>
          <CardNumberElement
            id="CardNumber"
            options={CARD_ELEMENT_OPTIONS}
            className={`${styles.stripeInput} ${styles.stripeInput__creditCard}`}
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

        <Form.Field className={`${styles.formInput} ${styles.formInput__cvc}`}>
          <label htmlFor="cvc">CVC</label>
          <CardCvcElement
            id="cvc"
            options={CARD_ELEMENT_OPTIONS}
            className={`${styles.stripeInput} ${styles.stripeInput__cvc}`}
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
      </Form.Group>
      <p className={styles.redemptionMessage__success}>
        {isPromoCodeChecked && redeemedPromoCode && redeemedPromoCode.message && (
          <span>{generatePromoCodeMessage(redeemedPromoCode, paymentMode)}</span>
        )}
      </p>
      <p className={styles.redemptionMessage__error}>{isPromoCodeChecked && promoError}</p>

      {/* {!successPayment && errorMessage.length > 0 && (
      <div className={styles.paymentErrorMessage}>
        <p>{errorMessage}</p>
      </div>
    )} */}

      <ActionButton
        variant={'primary'}
        size={'md'}
        type="purpleGradient"
        className={styles.completeButton}
        onClick={handleSubmit}
        disabled={!stripe || stripeLoading}
      >
        Complete Payment&nbsp;
        {false && <Loader active inline size="mini" inverted />}
      </ActionButton>

      <div className={styles.paymentMeta}>
        <div className={styles.cardsWrapper}>
          <img className={styles.cardsWrapper__cards} src={cardIcons} alt="cards" />
          <img className={styles.cardsWrapper__stripe} src={stripeIcon} alt="powered by stripe" />
        </div>
      </div>
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
  checkPromoCode: (promoCode: string, subscriptionId: number, paymentMode: string) =>
    checkPromoCode(promoCode, subscriptionId, paymentMode),
  setRedeemedPromoCode: (data: any) => setPromoCode(data),
  setPromoError: (data: string) => setPromoError(data),
};
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
