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
import generator from 'generate-password';

/* Components */
import Auth from '../../../components/Auth/Auth';

/* Constants */
import { Name, validateEmail } from '../../../constants/Validators';

/* App Config */
import { AppConfig } from '../../../config';

/* Actions */
import {
  setStripeLoading,
  checkPromoCode,
  setPromoError,
  setPromoCode,
} from '../../../actions/Settings/Subscription';

/* Hooks */
import { useInput } from '../../../hooks/useInput';

/* Assets */
import cardIcons from '../../../assets/images/4_Card_color_horizontal.svg';
import stripeIcon from '../../../assets/images/powered_by_stripe.svg';

/* Styling */
import styles from './index.module.scss';

/* Types */
import { PromoCode } from '../../../interfaces/Subscription';

/* Utils */
import { getSubscriptionID } from '../../../constants/Subscription';

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
  stripeLoading: boolean;
  checkPromoCode: (promoCode: string, subscriptionId: number, paymentMode: string) => void;
  promoLoading: boolean;
  setRedeemedPromoCode: (promoCode: any) => void;
  redeemedPromoCode: PromoCode;
  setPromoError: (err: string) => void;
  promoError: string;
  auth: Auth;
  successPayment: boolean;
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
  } = props;
  const [isPromoCodeChecked, setPromoCodeChecked] = useState<boolean>(false);
  const [promoCode, setPromoCode] = useState<string>('');
  const { value: email, bind: bindEmail } = useInput('');
  const { value: email2, bind: bindEmail2 } = useInput('');
  const { value: firstName, bind: bindFirstName } = useInput('');
  const { value: lastName, bind: bindLastName } = useInput('');
  const [emailError, setEmailError] = useState(false);
  const [fnameError, setFnameError] = useState(false);
  const [lnameError, setLnameError] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSignupSuccess, setSignupSuccess] = useState<boolean>(false);

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

  const handleError = (err: string) => {
    setErrorMessage(err);
    setSignupSuccess(false);
    setSignupLoading(false);
  };

  const handleSubmit = async (event: any) => {
    setSignupLoading(true);
    event.preventDefault();
    Axios.defaults.headers.common.Authorization = ``;

    if (!validateEmail(email)) {
      handleError(`Error in email - email format validation failed: ${email}`);
      setEmailError(true);
    } else if (email !== email2) {
      handleError(`Emails do not match`);
      setEmailError(true);
    } else if (!Name.validate(firstName)) {
      handleError('First Name must all be letters.');
      setFnameError(true);
    } else if (!Name.validate(lastName)) {
      handleError('Last Name must all be letters.');
      setLnameError(true);
    }

    try {
      /* Verify email */
      const { status: verifyEmailStatus } = await Axios.get(
        `${AppConfig.BASE_URL_API}checkout/verify-email/${email}`
      );

      if (verifyEmailStatus !== 200) {
        handleError('This email is already being used.');
        return;
      }
    } catch (e) {
      handleError('This email is already being used.');
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
      bodyFormData.set('email', email);
      bodyFormData.set('subscription_id', String(getSubscriptionID(accountType)));
      bodyFormData.set('payment_method_id', paymentMethodId);
      bodyFormData.set('payment_mode', paymentMode);
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
        if (e.response && e.response.data && e.response.data.message) {
          handleError(e.response.data.message);
        }
        handleError('Failed to make payment.');
        return;
      }

      /* Create auth0 account */
      if (stripeSubscription) {
        /* Generating Hash */
        const data = new TextEncoder().encode(stripeSubscription.id);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashString = `${btoa(email)}${hashArray
          .map(b => b.toString(16).padStart(2, '0'))
          .join('')}`;

        const randomPasswordLength = Math.max(20, Math.random() * 32);
        const randomPassword = generator.generate({
          length: randomPasswordLength,
          symbols: true,
          lowercase: true,
          uppercase: true,
          strict: true,
        });

        /* After successful sign up, auth.getSellerID will change the page */
        auth.webAuth.signup(
          {
            connection: 'Username-Password-Authentication',
            email: email,
            password: randomPassword,
            userMetadata: {
              first_name: firstName,
              last_name: lastName,
              activation_code: hashString,
            },
          },
          (err: any) => {
            if (err) {
              // This should not happen
              handleError(err.description);
              return;
            } else {
              const data: any = {
                email: email.trim(), // trim out white spaces to prevent 500
                name: firstName + ' ' + lastName,
                first_name: firstName,
                last_name: lastName,
                stripe_subscription_id: stripeSubscription.id,
                stripe_customer_id: stripeSubscription.customer,
                activation_code: hashString,
                subscription_id: getSubscriptionID(accountType),
                payment_mode: paymentMode,
              };

              auth.getSellerID(data, 'newSubscription');
            }
          }
        );
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
            label="Confirm Email"
            type="mail"
            placeholder="Email"
            {...bindEmail2}
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
          <button
            disabled={!stripe || stripeLoading || signupLoading || isSignupSuccess}
            type="submit"
            className={styles.completeButton}
          >
            Complete Payment
            {signupLoading && <Loader active inline size="mini" inverted />}
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
