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
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
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

/*Components*/
import {
  UNITS_SOLD_PER_MONTH,
  PLAN_UNIT,
  UNITS_SOLD_TYPE,
  getSellerPlan,
  getNearestUnitsSold,
  getSliderValue,
  SELLER_TYPE_PER_UNITS_SOLD,
} from '../../../Settings/Pricing/AistockPricing/Herobox/data';

import FormInput from '../../../../components/FormInput';
import { formatCurrency, formatString, commify } from '../../../../utils/format';
import CheckoutPlanToggleRadio from '../../../../components/CheckoutPlanToggleRadio';

/* Assets */
import cardIcons from '../../../../assets/images/4_Card_color_horizontal.svg';
import stripeIcon from '../../../../assets/images/powered_by_stripe.svg';

/* Styling */
import styles from './index.module.scss';
import RainbowText from '../../../../components/RainbowText';

/* Types */
import { PromoCode } from '../../../../interfaces/Subscription';

/* Utils */
import { generatePromoCodeMessage } from '../../../../utils/subscriptions';
import ActionButton from '../../../../components/ActionButton';

/* Data */

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
  successPayment: boolean;
  promoCodeObj: PromoCode;
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
    paymentMode,
    successPayment,
    promoCodeObj,
  } = props;
  const [isPromoCodeChecked, setPromoCodeChecked] = useState<boolean>(false);
  const [promoCode, setPromoCode] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState('');
  const [unitsSoldInput, setUnitsSoldInput] = useState<number>(1000);
  const [unitsSold, setUnitsSold] = useState<UNITS_SOLD_TYPE>('1,000');
  const sellerPlan = getSellerPlan(unitsSold);
  const [isMonthly, setIsMonthly] = useState<boolean>(true);
  console.log('isMonthly' + isMonthly);

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

  React.useEffect(() => {
    // @ts-ignore
    setUnitsSold(getNearestUnitsSold(unitsSoldInput));
  }, [unitsSoldInput]);

  const handleCheckPromoCode = async (event: any) => {
    event.preventDefault();
    const subscriptionId = SELLER_TYPE_PER_UNITS_SOLD[unitsSold].id;
    Axios.defaults.headers.common.Authorization = ``;
    checkPromoCode(promoCode, subscriptionId, isMonthly ? 'monthly' : 'yearly');
  };

  const handlePromoCodeChange = (event: any) => {
    setPromoCode(event.target.value.toUpperCase());
    setPromoCodeChecked(false);
    setRedeemedPromoCode({});
    setPromoError('');
  };

  const handleError = (err: string) => {
    setErrorMessage(err);
  };

  const calculateDiscountedPrice = (price: number) => {
    if (promoCodeObj && promoCodeObj.percent_off) {
      return price * ((100 - promoCodeObj.percent_off) / 100);
    } else if (promoCodeObj && promoCodeObj.amount_off) {
      return price - promoCodeObj.amount_off;
    } else {
      return price;
    }
  };

  const displayPrice = (price: number) => {
    const discountedPrice = calculateDiscountedPrice(price);
    return (
      <div className={styles.totalPrice}>
        <p>Total due today </p>
        <p>
          USD &nbsp;
          <span>{formatCurrency(discountedPrice)}</span>
        </p>
      </div>
    );
  };

  const handleSubmit = async () => {
    const { createSubscriptionData, retryInvoice, handlePaymentError, setStripeLoad } = props;
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
      handleError(error);
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
          subscription_id: SELLER_TYPE_PER_UNITS_SOLD[unitsSold].id,
          payment_method_id: paymentMethodId,
          payment_mode: isMonthly ? 'monthly' : 'yearly',
          promo_code: promoCode,
        };
        Axios.defaults.headers.common.Authorization = ``;
        createSubscriptionData(data);
      }
    }
  };
  return (
    <div className={styles.paymentForm}>
      <section className={styles.reviewsSection}>
        <h2>The 1st inventory planning for Amazon sellers!</h2>
        <p>
          "AiStock gives our supply chain one place to get whatever help we need. It gives us a
          single point of integration for all our logistic process, helping us focus on increasing
          sales and launch new products as we grow."
        </p>

        <div className={styles.reviewerRow}>
          <div className={styles.reviewerDetails}>
            Andrew Erickson
            <br />
            <span>7-figure Brand Entrepreneur</span>
          </div>
        </div>
      </section>

      <div className={styles.paymentInfoForm}>
        <h1>AiStock simple pricing plan</h1>
        <div className={styles.ordersPerMonthDisplay}>
          <div className={styles.ordersPerMonthText}>
            <span>
              <RainbowText type="pink_purple_blue_gradient">
                How many orders per month do you have?
              </RainbowText>
            </span>
          </div>
          <FormInput
            className={`
								${styles.formInputPricing}
							`}
            label=""
            placeholder="Orders/mo (numbers)"
            id="order"
            type="number"
            name="order"
            onChange={(e: any) => setUnitsSoldInput(parseInt(e.target.value, 10))}
            value={unitsSoldInput.toString()}
            autoComplete="off"
            errorMessage="Please enter orders/mo"
          />
        </div>

        <Slider
          className="slider"
          min={11}
          marks={UNITS_SOLD_PER_MONTH}
          step={null}
          onChange={(key: any) => {
            // @ts-ignore
            setUnitsSold(UNITS_SOLD_PER_MONTH[key]);
            setUnitsSoldInput(parseInt(UNITS_SOLD_PER_MONTH[key].replace(/,/g, ''), 10));
            return null;
          }}
          value={parseInt(getSliderValue(unitsSold), 10)}
          defaultValue={7}
        />

        <div className={styles.orderSummaryContainer}>
          <div className={styles.orderItemsWrapper}>
            <div className={styles.orderItem}>
              <p className={styles.orderTitle}>
                {isMonthly ? (
                  <div>
                    {commify(formatString(PLAN_UNIT[unitsSold]))} orders per month (usage-based)
                    <br />
                    <span>billed monthly</span>
                  </div>
                ) : (
                  <div>
                    {commify(formatString(PLAN_UNIT[unitsSold]))} orders per month (usage-based)
                    <br />
                    <span>billed yearly</span>
                  </div>
                )}
              </p>
              {isMonthly ? (
                <p className={styles.orderPrice}>{formatCurrency(sellerPlan.monthlyPrice)}</p>
              ) : (
                <p className={styles.orderPrice}>{formatCurrency(sellerPlan.annualPrice)}</p>
              )}
            </div>

            <div className={styles.paymentModeToggle}>
              <div className={styles.modalHeader}>
                <CheckoutPlanToggleRadio
                  isToggled={isMonthly}
                  handleChange={() => setIsMonthly(!isMonthly)}
                  label={''}
                  className={styles.paymentModeToggleButton}
                />
              </div>

              <div className={styles.paymentToggleTextWrapper}>
                <p className={styles.paymentToggleText}>
                  {isMonthly ? (
                    <span>
                      Save with annual billing &nbsp;
                      <span className={styles.greenhighlight}>&nbsp;20% OFF&nbsp;</span>
                      <span className={styles.total}>
                        {formatCurrency(sellerPlan.annualPrice)} /year
                      </span>
                    </span>
                  ) : (
                    <span>
                      Switch to monthly &nbsp;
                      <span className={styles.total}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {formatCurrency(sellerPlan.monthlyPrice)} /mo
                      </span>
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className={styles.totalItemsWrapper}>
            <div className={styles.overageItem}>
              <p className={styles.orderTitle}>Subtotal</p>
              {isMonthly ? (
                <p className={styles.orderPrice}>{formatCurrency(sellerPlan.monthlyPrice)}</p>
              ) : (
                <p className={styles.orderPrice}>{formatCurrency(sellerPlan.annualPrice)}</p>
              )}
            </div>

            <Form.Group className={`${styles.formGroup} ${styles.formGroup__promo}`}>
              <Form.Input
                className={`${styles.formInput} ${styles.formInput__promo}`}
                size="large"
                type="text"
                placeholder="Add promotion code"
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
              <div className={styles.couponItem}>
                <p className={styles.orderPrice}>{promoCode}</p>
              </div>
            </Form.Group>
            <p className={styles.redemptionMessage__success}>
              {isPromoCodeChecked && redeemedPromoCode && redeemedPromoCode.message && (
                <span>{generatePromoCodeMessage(redeemedPromoCode, paymentMode)}</span>
              )}
            </p>
            <p className={styles.redemptionMessage__error}>{isPromoCodeChecked && promoError}</p>

            {!successPayment && errorMessage.length > 0 && (
              <div className={styles.paymentErrorMessage}>
                <p>{errorMessage}</p>
              </div>
            )}
            {isMonthly
              ? displayPrice(sellerPlan.monthlyPrice)
              : displayPrice(sellerPlan.annualPrice)}
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
  promoCodeObj: get(state, 'subscription.promoCode'),
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
