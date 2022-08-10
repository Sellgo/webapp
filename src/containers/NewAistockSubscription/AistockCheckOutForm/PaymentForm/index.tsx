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

/* Components */
import Auth from '../../../../components/Auth/Auth';
import StepsInfo from '../../../../components/StepsInfo';
import ActionButton from '../../../../components/ActionButton';
import {
  UNITS_SOLD_PER_MONTH,
  PLAN_UNIT,
  UNITS_SOLD_TYPE,
  SELLER_TYPE_PER_UNITS_SOLD,
  getSellerPlan,
  getNearestUnitsSold,
  getSliderValue,
} from '../../../Settings/Pricing/AistockPricing/Herobox/data';

import FormInput from '../../../../components/FormInput';
import { formatString, commify, formatDecimal } from '../../../../utils/format';
import CheckoutPlanToggleRadio from '../../../../components/CheckoutPlanToggleRadio';

/* Constants */
import { Length, Name, validateEmail } from '../../../../constants/Validators';
import { getSubscriptionID } from '../../../../constants/Subscription/AiStock';

/* App Config */
import { AppConfig } from '../../../../config';

/* Assets */
import aistockLogo from '../../../../assets/images/aistockLogo.png';

/* Actions */
import {
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

/* Styling */
import styles from './index.module.scss';
import RainbowText from '../../../../components/RainbowText';

/* Types */
import { PromoCode } from '../../../../interfaces/Subscription';

/* Utils */
import { generatePromoCodeMessage } from '../../../../utils/subscriptions';
import { trackEvent } from '../../../../utils/analyticsTracking';

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
  defaultEmail: string;
  sellerSubscription: any;
  accountType: string;
  paymentMode: string;
  stripeLoading: boolean;
  checkPromoCode: (promoCode: string, subscriptionId: number, paymentMode: string) => void;
  promoLoading: boolean;
  setRedeemedPromoCode: (promoCode: any) => void;
  redeemedPromoCode: PromoCode;
  setPromoError: (err: string) => void;
  promoError: string;
  auth: Auth;
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
    accountType,
    successPayment,
    auth,
    defaultEmail,
    promoCodeObj,
  } = props;
  const [isPromoCodeChecked, setPromoCodeChecked] = useState<boolean>(false);
  const [promoCode, setPromoCode] = useState<string>('');
  const { value: email, bind: bindEmail } = useInput(defaultEmail);
  const { value: firstName, bind: bindFirstName } = useInput('');
  const { value: lastName, bind: bindLastName } = useInput('');
  const [emailError, setEmailError] = useState(false);
  const [fnameError, setFnameError] = useState(false);
  const [lnameError, setLnameError] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSignupSuccess, setSignupSuccess] = useState<boolean>(false);
  const [isFocusPW, setFocusPassword] = React.useState<boolean>(false);
  const { value: password, bind: bindPassword } = useInput('');
  const { value: password2, bind: bindPassword2 } = useInput('');
  const [unitsSoldInput, setUnitsSoldInput] = useState<number>(1000);
  const [unitsSold, setUnitsSold] = useState<UNITS_SOLD_TYPE>('1,000');
  const sellerPlan = getSellerPlan(unitsSold);
  const [isMonthly, setIsMonthly] = useState<boolean>(true);

  const queryParams = new URLSearchParams(window.location.search);
  const order = queryParams.get('order');
  const mode = queryParams.get('mode');

  const stepsInfo = [
    {
      id: 1,
      stepShow: true,
      stepClass: Length.validate(password) ? 'title-success' : 'title-error',
      stepTitle: 'Length',
      stepDescription: 'At least 6 characters',
      stepIcon: Length.validate(password) ? 'check' : 'times',
    },
  ];

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

  React.useEffect(() => {
    // @ts-ignore
    setUnitsSold(getNearestUnitsSold(parseInt(order)));
    // @ts-ignore
    setUnitsSoldInput(parseInt(order));
  }, [order]);

  React.useEffect(() => {
    setIsMonthly(mode === null || mode === 'monthly');
  }, [mode]);

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

  const calculateDiscountedPrice = (price: number) => {
    if (promoCodeObj && promoCodeObj.percent_off) {
      return price * ((100 - promoCodeObj.percent_off) / 100);
    } else if (promoCodeObj && promoCodeObj.amount_off) {
      return price - promoCodeObj.amount_off;
    } else {
      return price;
    }
  };

  const handleError = (err: string) => {
    setErrorMessage(err);
    setSignupSuccess(false);
    setSignupLoading(false);
  };

  const handleSubmit = async () => {
    setSignupLoading(true);
    Axios.defaults.headers.common.Authorization = ``;

    if (!validateEmail(email)) {
      handleError(`Your account: email format validation failed: ${email}`);
      setEmailError(true);
      return;
    } else if (!Name.validate(firstName)) {
      handleError('Your account: first name must all be letters');
      setFnameError(true);
      return;
    } else if (!Name.validate(lastName)) {
      handleError('Your account: last name must all be letters');
      setLnameError(true);
      return;
    } else if (password !== password2) {
      handleError('Your account: passwords do not match');
      return;
    }

    try {
      /* Verify email */
      const { status: verifyEmailStatus } = await Axios.get(
        `${AppConfig.BASE_URL_API}checkout/verify-email/${email.toLowerCase()}`
      );

      if (verifyEmailStatus !== 200) {
        handleError('Your account: this email is already being used');
        return;
      }
    } catch (e) {
      handleError('Your account: this email is already being used');
      return;
    }

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: `${firstName} ${lastName}`,
      },
    });

    let stripeSubscription: any = null;
    if (error) {
      handleError(error.message);
      return;
    } else {
      /* Make stripe payment */
      const paymentMethodId = paymentMethod.id;
      const bodyFormData = new FormData();
      bodyFormData.set('email', email.toLowerCase());
      // @ts-ignore
      bodyFormData.set('subscription_id', SELLER_TYPE_PER_UNITS_SOLD[unitsSold].id);
      bodyFormData.set('payment_method_id', paymentMethodId);
      bodyFormData.set('payment_mode', isMonthly ? 'monthly' : 'yearly');
      bodyFormData.set('promo_code', promoCode);

      // @ts-ignore
      const referralID = typeof window !== 'undefined' && window.Rewardful.referral;
      if (referralID) {
        bodyFormData.set('referral', referralID);
      }

      try {
        const { data } = await Axios.post(
          AppConfig.BASE_URL_API + `sellers/subscription/create`,
          bodyFormData
        );
        const { stripe_subscription } = data;
        if (
          (stripe_subscription && stripe_subscription.status === 'active') ||
          stripe_subscription.payment_intent.status === 'succeeded'
        ) {
          stripeSubscription = stripe_subscription;
          localStorage.removeItem('planType');
        } else if (data.message) {
          handleError(data.message);
          return;
        }
      } catch (e) {
        const { response } = e as any;
        if (response && response.data && response.data.message) {
          handleError(response.data.message);
        }
        handleError('Error: failed to make payment');
        return;
      }

      /* Create auth0 account */
      if (stripeSubscription) {
        /* After successful sign up, auth.getSellerID will change the page */
        auth.webAuth.signup(
          {
            connection: 'Username-Password-Authentication',
            email: email.toLowerCase(),
            password: password,
            userMetadata: {
              first_name: firstName,
              last_name: lastName,
              is_aistock: 'true',
            },
          },
          (err: any) => {
            if (err) {
              // This should not happen
              handleError(err.description);
              return;
            } else {
              // Successful Signup
              const data: any = {
                email: email.trim().toLowerCase(), // trim out white spaces to prevent 500
                name: firstName + ' ' + lastName,
                first_name: firstName,
                last_name: lastName,
                stripe_subscription_id: stripeSubscription.id,
                stripe_customer_id: stripeSubscription.customer,
                subscription_id: SELLER_TYPE_PER_UNITS_SOLD[unitsSold].id,
                payment_mode: paymentMode,
                password: password,
              };

              /* Tracking for google analytics upon successful payment */
              trackEvent({
                event: 'purchase',
                ecommerce: {
                  transaction_id: stripeSubscription.id,
                  affiliation: 'Stripe',
                  revenue: stripeSubscription.plan.amount / 100,
                  tax: 0,
                  shipping: 0,
                  items: [
                    {
                      name: accountType,
                      id: SELLER_TYPE_PER_UNITS_SOLD[unitsSold].id,
                      price: stripeSubscription.plan.amount / 100,
                      brand: 'Stripe',
                      category: 'Subscription',
                      quantity: 1,
                    },
                  ],
                },
              });
              auth.getSellerID(data, 'newSubscription');
            }
          }
        );
      }
    }
  };

  return (
    <div className={styles.paymentForm}>
      <div className={styles.profileInfoFormWrapper}>
        <img src={aistockLogo} className={styles.logo} alt="Sellgo Company Logo" />
        <div className={styles.profileInfoForm}>
          <h2> Your account </h2>
          <Form.Group className={styles.formGroup}>
            <Form.Input
              size="huge"
              label="Email*"
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
              label="First Name*"
              type="text"
              placeholder="First Name"
              required
              {...bindFirstName}
              error={fnameError}
              className={styles.formInput}
            />
          </Form.Group>
          <Form.Group className={styles.formGroup}>
            <Form.Input
              size="huge"
              label="Last Name*"
              type="text"
              placeholder="Last Name"
              required
              {...bindLastName}
              error={lnameError}
              className={styles.formInput}
            />
          </Form.Group>
          <Form.Group className={styles.formGroup}>
            <Form.Field className={`${styles.formInput} ${styles.formInput__password}`}>
              <label htmlFor="password">Password*</label>
              <StepsInfo
                id="password"
                subscriptionRegister={true}
                isFocusPW={isFocusPW}
                focusInput={() => setFocusPassword(true)}
                blurInput={() => setFocusPassword(false)}
                stepsData={stepsInfo}
                {...bindPassword}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group className={styles.formGroup}>
            <Form.Input
              size="huge"
              label="Confirm Password*"
              type="password"
              placeholder="Confirm Password"
              required
              {...bindPassword2}
              className={styles.formInput}
            />
          </Form.Group>
        </div>
      </div>
      <div className={styles.paymentInfoForm}>
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
                    <span>billed monthly + overage 2ç/order (billed by end of month)</span>
                  </div>
                ) : (
                  <div>
                    {commify(formatString(PLAN_UNIT[unitsSold]))} orders per month (usage-based)
                    <br />
                    <span>billed yearly + overage 1ç/order (billed by end of month)</span>
                  </div>
                )}
              </p>
              {isMonthly ? (
                <p className={styles.orderPrice}>${formatDecimal(sellerPlan.monthlyPrice)}</p>
              ) : (
                <p className={styles.orderPrice}>${formatDecimal(sellerPlan.annualPrice)}</p>
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
                    <span className={styles.totalContainer}>
                      Save with annual billing &nbsp;
                      <span className={styles.greenhighlight}>&nbsp;20% OFF&nbsp;</span>
                      <span className={styles.total}>
                        ${formatDecimal(sellerPlan.annualPrice)} /year
                      </span>
                    </span>
                  ) : (
                    <span className={styles.totalContainer}>
                      Switch to monthly &nbsp;
                      <span className={styles.total}>
                        $
                        {formatDecimal(sellerPlan.monthlyPrice)} /mo
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
                <p className={styles.orderPrice}>${formatDecimal(sellerPlan.monthlyPrice)}</p>
              ) : (
                <p className={styles.orderPrice}>${formatDecimal(sellerPlan.annualPrice)}</p>
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
              {isPromoCodeChecked && redeemedPromoCode && redeemedPromoCode.message && (
                <div className={styles.couponItem}>
                  <p className={styles.orderPrice}>
                    {isMonthly ? (
                      <span>
                        -$
                        {formatDecimal(
                          sellerPlan.monthlyPrice -
                            calculateDiscountedPrice(sellerPlan.monthlyPrice)
                        )}
                      </span>
                    ) : (
                      <span>
                        -$
                        {formatDecimal(
                          sellerPlan.annualPrice - calculateDiscountedPrice(sellerPlan.annualPrice)
                        )}
                      </span>
                    )}
                  </p>
                </div>
              )}
            </Form.Group>
            <p className={styles.redemptionMessage__success}>
              {isPromoCodeChecked && redeemedPromoCode && redeemedPromoCode.message && (
                <span>{generatePromoCodeMessage(redeemedPromoCode, paymentMode)}</span>
              )}
            </p>
            <p className={styles.redemptionMessage__error}>{isPromoCodeChecked && promoError}</p>

            <div className={styles.totalPrice}>
              <p>Total due today</p>
              <p className={styles.orderPrice}>
                USD $
                {isMonthly
                  ? formatDecimal(calculateDiscountedPrice(sellerPlan.monthlyPrice))
                  : formatDecimal(calculateDiscountedPrice(sellerPlan.annualPrice))}
              </p>
            </div>
          </div>
        </div>

        <h2>Secure Credit Card Payment</h2>
        <Form.Group className={styles.formGroup}>
          <Form.Field className={`${styles.formInput} ${styles.formInput__creditCard}`}>
            <label htmlFor="CardNumber">Credit card number</label>
            <CardNumberElement
              id="CardNumber"
              options={CARD_ELEMENT_OPTIONS}
              className={`${styles.stripeInput} ${styles.stripeInput__creditCard}`}
            />
          </Form.Field>

          <Form.Field className={`${styles.formInput} ${styles.formInput__expiry}`}>
            <label htmlFor="expiry">Expiry date</label>
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

        <ActionButton
          variant={'primary'}
          size={'md'}
          type="purpleGradient"
          className={styles.completeButton}
          onClick={handleSubmit}
          disabled={!stripe || stripeLoading || signupLoading || isSignupSuccess}
        >
          Complete payment&nbsp;
          {signupLoading && <Loader active inline size="mini" inverted />}
        </ActionButton>

        <div>
          <h4>
            By clicking Complete payment, you agree to our Terms of Service and Privacy Statement.
          </h4>
        </div>
        {!successPayment && errorMessage.length > 0 && (
          <div className={styles.paymentErrorMessage}>
            <p>{errorMessage}</p>
          </div>
        )}

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
  setStripeLoad: (data: boolean) => setStripeLoading(data),
  checkPromoCode: (promoCode: string, subscriptionId: number, paymentMode: string) =>
    checkPromoCode(promoCode, subscriptionId, paymentMode),
  setRedeemedPromoCode: (data: any) => setPromoCode(data),
  setPromoError: (data: string) => setPromoError(data),
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
