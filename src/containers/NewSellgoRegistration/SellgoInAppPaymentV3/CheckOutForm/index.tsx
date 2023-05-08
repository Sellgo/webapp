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
import { Form, Header, Modal, TextArea, Loader, Radio, Icon, Image } from 'semantic-ui-react';
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
import { fetchTOS, fetchPP } from '../../../../actions/UserOnboarding';

/* Components */
// import CheckoutPlanToggleRadio from '../../../../components/CheckoutPlanToggleRadio';
import ActionButton from '../../../../components/ActionButton';

/* Assets */
import cardIcons from '../../../../assets/images/4_Card_color_horizontal.svg';
import stripeIcon from '../../../../assets/images/powered_by_stripe.svg';
import ProfilePicture from '../../../../assets/images/justin.png';

/* Styling */
import styles from './index.module.scss';

/* Types */
import { PromoCode, SummaryDetails } from '../../../../interfaces/Subscription';

/* Utils */
import { generatePromoCodeMessage } from '../../../../utils/subscriptions';
import { formatNumber, prettyPrintDate } from '../../../../utils/format';

/* Constants */
import {
  generateSubscriptionDetails,
  getSubscriptionID,
} from '../../../../constants/Subscription/Sellgo';
import { AppConfig } from '../../../../config';
// import { trackEvent } from '../../../../utils/analyticsTracking';
import Auth from '../../../../components/Auth/Auth';

import sellgoGradientLogo from '../../../../assets/images/sellgoGradientLogo.png';
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
  auth: Auth;
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
  termsOfService: any;
  privacyPolicy: any;
  fetchPP: any;
  fetchTOS: any;
  isPayNow: boolean;
  userName: string;
  email: string;
  password: string;
}

function CheckoutForm(props: MyProps) {
  const stripe: any = useStripe();
  const elements = useElements();
  const {
    auth,
    stripeLoading,
    checkPromoCode,
    redeemedPromoCode,
    promoError,
    promoLoading,
    setRedeemedPromoCode,
    setPromoError,
    accountType,
    paymentMode,
    successPayment,
    promoCodeObj,
    isPayNow,
    userName,
    email,
    password,
  } = props;
  const [isPromoCodeChecked, setPromoCodeChecked] = useState<boolean>(false);
  const [promoCode, setPromoCode] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isMonthly, setIsMonthly] = useState<boolean>(paymentMode === 'monthly');
  const { termsOfService, privacyPolicy, fetchPP, fetchTOS } = props;
  const [openTOS, setOpenTOS] = React.useState<boolean>(false);
  const [openPP, setOpenPP] = React.useState<boolean>(false);
  const [showPromoField, setShowPromoField] = useState<boolean>(false);

  /* ---------------------------------------- */
  /* -------------- TOS --------------------- */
  /* ---------------------------------------- */
  React.useEffect(() => {
    fetchTOS();
    fetchPP();
  }, [fetchTOS, fetchPP]);
  const [isLoading, setLoading] = React.useState<boolean>(false);

  const onClose = () => {
    setOpenTOS(false);
    setOpenPP(false);
  };

  const TOS = () => {
    return (
      <div style={{ textAlign: 'center' }}>
        <Header as="h4">Our Terms of Service</Header>
        <Form>
          <TextArea rows="20" value={termsOfService} />
        </Form>
      </div>
    );
  };

  const PP = () => {
    return (
      <div style={{ textAlign: 'center' }}>
        <Header as="h4">Our Privacy Policy</Header>
        <Form>
          <TextArea rows="20" value={privacyPolicy} />
        </Form>
      </div>
    );
  };

  const newUserExperiencePopup = () => {
    return (
      <Modal onClose={() => onClose()} size={'small'} open={openTOS || openPP}>
        <Modal.Content>
          {openTOS && <TOS />}
          {openPP && <PP />}
        </Modal.Content>
      </Modal>
    );
  };
  console.log('163', accountType);
  const summaryDetails: SummaryDetails = generateSubscriptionDetails(accountType.toLowerCase());
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

  const handleError = (err: string) => {
    setErrorMessage(err);
  };

  console.log('HANDLE CHECKOUT ERROR => ', errorMessage);

  const calculateDiscountedPrice = (price: number) => {
    if (promoCodeObj && promoCodeObj.percent_off) {
      return price * ((100 - promoCodeObj.percent_off) / 100);
    } else if (promoCodeObj && promoCodeObj.amount_off) {
      return price - promoCodeObj.amount_off;
    } else {
      return price;
    }
  };

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

  const handleSubmitV2 = async () => {
    setLoading(true);
    const firstName = userName.split(' ')[0] ?? '';
    const lastName = userName.split(' ')[1] ?? '';
    // event.preventDefault();
    Axios.defaults.headers.common.Authorization = ``;

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      setLoading(false);
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
      console.log(310);
      handleError(error.message);
      setLoading(false);
      return;
    } else {
      /* Make stripe payment */
      const paymentMethodId = paymentMethod.id;
      const bodyFormData = new FormData();
      bodyFormData.set('email', email.toLowerCase());
      bodyFormData.set('subscription_id', String(getSubscriptionID(accountType)));
      bodyFormData.set('payment_method_id', paymentMethodId);
      bodyFormData.set('payment_mode', isMonthly ? 'monthly' : 'yearly');
      bodyFormData.set('promo_code', promoCode);
      bodyFormData.set('free_trial', isPayNow ? 'false' : 'true');

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
          stripe_subscription &&
          (stripe_subscription.status === 'active' ||
            stripe_subscription.status === 'trialing' ||
            stripe_subscription?.payment_intent?.status === 'succeeded')
        ) {
          stripeSubscription = stripe_subscription;
          localStorage.removeItem('planType');
        } else if (data.message) {
          console.log(341);
          handleError(data.message);
          setLoading(false);
          return;
        }
      } catch (e) {
        const { response } = e as any;
        if (response && response.data && response.data.message) {
          console.log(348);
          handleError(response.data.message);
          setLoading(false);
          return;
        }
        console.log(351);
        handleError('Failed to make payment');
        setLoading(false);
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
            },
          },
          (err: any) => {
            if (err) {
              // This should not happen
              console.log(373);
              handleError(err.description);
              setLoading(false);
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
                subscription_id: getSubscriptionID(accountType),
                payment_mode: isMonthly ? 'monthly' : 'yearly',
                password: password,
              };

              /* Tracking for google analytics upon successful payment */
              // trackEvent({
              //   event: 'purchase',
              //   ecommerce: {
              //     transaction_id: stripeSubscription.id,
              //     affiliation: 'Stripe',
              //     revenue: stripeSubscription.plan.amount / 100,
              //     tax: 0,
              //     shipping: 0,
              //     currency: 'USD',
              //     items: [
              //       {
              //         name: accountType,
              //         id: getSubscriptionID(accountType),
              //         price: stripeSubscription.plan.amount / 100,
              //         brand: 'Stripe',
              //         category: 'Subscription',
              //         quantity: 1,
              //       },
              //     ],
              //   },
              // });
              auth.getSellerID(data, 'newSubscription');

              localStorage.removeItem('isFilteredOnce');
            }
          }
        );
      }
    }
  };

  const benefitIcon: { [key: string]: any } = {
    chromeExtension: <Icon name="building" />,
    sellerDatabase: <Icon name="building" />,
    sellerCount: <Icon name="building" />,
    sellerMap: <Icon name="building" />,
    export: <Icon name="building" />,
  };

  return (
    <>
      <div className={styles.paymentForm}>
        {newUserExperiencePopup()}
        <section className={styles.reviewsSection}>
          <Image src={sellgoGradientLogo} alt="sellgo logo" width={170} />
          <h2>The 1st Amazon Seller Database that I ever needed!</h2>
          <p>
            “Sellgo enables me as an agency and influencer to close more deals with high quality
            leads. My ROI got an immediate increase of 300% in a week!"
          </p>

          <div className={styles.reviewerRow}>
            <img src={ProfilePicture} alt="profile picture" />
            <div className={styles.reviewerDetails}>
              Justin Willhite
              <br />
              <span>Amazon Product Content Creator</span>
            </div>
          </div>
        </section>

        <div className={styles.paymentInfoForm}>
          <div className={styles.header}>
            <h2 className={styles.heading}>
              Enter your <span className={styles.heading__purple}>billing information</span>
            </h2>
            <div className={styles.descriptionWrapper}>
              <Icon name="lock" color="grey" />
              <p className={styles.description}>
                Your payment is secured and confidential through Stripe. We do not store any of your
                payment credentials.
              </p>
            </div>
            {/* <div className={styles.pricing}>
              <p className={styles.label}>{`${summaryDetails?.displayName ??
                summaryDetails?.name ??
                accountType}`}</p>
              <p className={styles.price}>
                {isMonthly ? (
                  <>
                    {`$${formatNumber(summaryDetails.monthlyPrice)}`}
                    <span className={styles.pricerepeatition}> &nbsp;per month</span>
                  </>
                ) : (
                  <>
                    {`$${formatNumber(summaryDetails.annualPrice)}`}
                    <span className={styles.pricerepeatition}>&nbsp; per year</span>
                  </>
                )}
              </p>
            </div> */}
          </div>
          <div className={styles.orderSummaryContainer}>
            <>
              {console.log('summaryDetails', summaryDetails)}
              <p className={styles.orderSummaryContainer__label}>Select your billing cycle</p>
              <div
                className={`${styles.orderSummaryContainer__box} ${
                  isMonthly ? '' : styles.orderSummaryContainer__active
                }`}
                onClick={() => setIsMonthly(false)}
              >
                <Radio checked={!isMonthly} onClick={() => setIsMonthly(false)} />
                <div className={styles.orderSummaryContainer__details}>
                  <p className={styles.orderSummaryContainer__details__title}>
                    {summaryDetails.displayName} Annual
                  </p>
                  {isPayNow && (
                    <p className={styles.orderSummaryContainer__details__priceCut}>
                      USD ${`${formatNumber(summaryDetails?.annualPrice)}`} <span>/year</span>
                    </p>
                  )}
                  <p className={styles.orderSummaryContainer__details__price}>
                    USD $
                    {`${
                      isPayNow
                        ? formatNumber(
                            (summaryDetails?.annualPrice - summaryDetails?.annualPrice * 0.2) / 12
                          )
                        : formatNumber(summaryDetails?.annualPrice / 12)
                    }`}{' '}
                    <span>/month</span>
                  </p>
                  <p className={styles.orderSummaryContainer__details__description}>
                    Billed annually for USD $
                    {`${
                      isPayNow
                        ? formatNumber(
                            summaryDetails?.annualPrice - summaryDetails?.annualPrice * 0.2
                          )
                        : formatNumber(summaryDetails?.annualPrice)
                    }`}{' '}
                  </p>
                  {isPayNow && (
                    <p className={styles.orderSummaryContainer__details__description}>
                      Discount applies for first year.
                    </p>
                  )}
                </div>
                <p className={styles.bestValue}>BEST VALUE</p>
              </div>
              <div
                className={`${styles.orderSummaryContainer__box} ${
                  isMonthly ? styles.orderSummaryContainer__active : ''
                }`}
                onClick={() => setIsMonthly(true)}
              >
                {' '}
                <Radio checked={isMonthly} onClick={() => setIsMonthly(true)} />
                <div className={styles.orderSummaryContainer__details}>
                  <p className={styles.orderSummaryContainer__details__title}>
                    {summaryDetails.displayName} Monthly
                  </p>
                  {isPayNow && (
                    <p className={styles.orderSummaryContainer__details__priceCut}>
                      USD ${`${formatNumber(summaryDetails?.monthlyPrice)}`} <span>/month</span>
                    </p>
                  )}
                  <p className={styles.orderSummaryContainer__details__price}>
                    USD $
                    {`${
                      isPayNow
                        ? formatNumber(
                            summaryDetails?.monthlyPrice - summaryDetails?.monthlyPrice * 0.2
                          )
                        : formatNumber(summaryDetails?.monthlyPrice)
                    }`}{' '}
                    <span>/month</span>
                  </p>
                  <p className={styles.orderSummaryContainer__details__description}>
                    Billed monthly for USD $
                    {`${
                      isPayNow
                        ? formatNumber(
                            summaryDetails?.monthlyPrice - summaryDetails?.monthlyPrice * 0.2
                          )
                        : formatNumber(summaryDetails?.monthlyPrice)
                    }`}{' '}
                  </p>
                  {isPayNow && (
                    <p className={styles.orderSummaryContainer__details__description}>
                      Discount applies for first month.
                    </p>
                  )}
                </div>
              </div>
            </>

            <p className={styles.orderSummaryContainer__label}>Enter your billing details</p>
            <Form.Group className={styles.formGroup}>
              <Form.Field className={`${styles.formInput} ${styles.formInput__creditCard}`}>
                {/* <label htmlFor="CardNumber">Credit Card Number</label> */}
                <CardNumberElement
                  id="CardNumber"
                  options={CARD_ELEMENT_OPTIONS}
                  className={`${styles.stripeInput} ${styles.stripeInput__creditCard}`}
                />
              </Form.Field>

              <Form.Field className={`${styles.formInput} ${styles.formInput__expiry}`}>
                {/* <label htmlFor="expiry">Expiry Date</label> */}
                <CardExpiryElement
                  id="expiry"
                  options={CARD_ELEMENT_OPTIONS}
                  className={`${styles.stripeInput} ${styles.stripeInput__expiry}`}
                />
              </Form.Field>

              <Form.Field className={`${styles.formInput} ${styles.formInput__cvc}`}>
                {/* <label htmlFor="cvc">CVC</label> */}
                <CardCvcElement
                  id="cvc"
                  options={CARD_ELEMENT_OPTIONS}
                  className={`${styles.stripeInput} ${styles.stripeInput__cvc}`}
                />
              </Form.Field>
            </Form.Group>
            <p
              className={showPromoField ? styles.hidePromoCodeText : styles.showPromoCodeText}
              onClick={() => setShowPromoField(!showPromoField)}
            >
              {' '}
              <span>
                <Icon name={showPromoField ? 'caret up' : 'caret down'} />
              </span>{' '}
              Add promotion code
            </p>
            {showPromoField && (
              <div className={styles.totalItemsWrapper}>
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
                  {/* {isPromoCodeChecked && redeemedPromoCode && redeemedPromoCode.message && (
                  <div className={styles.couponItem}>
                    <p className={styles.orderPrice}>
                      {isMonthly ? (
                        <span>
                          - USD $
                          {formatNumber(
                            summaryDetails.monthlyPrice -
                              calculateDiscountedPrice(summaryDetails.monthlyPrice)
                          )}
                        </span>
                      ) : (
                        <span>
                          - USD $
                          {formatNumber(
                            summaryDetails.annualPrice -
                              calculateDiscountedPrice(summaryDetails.annualPrice)
                          )}
                        </span>
                      )}
                    </p>
                  </div>
                )} */}
                </Form.Group>
                {/* <p className={styles.redemptionMessage__success}>
                {isPromoCodeChecked && redeemedPromoCode && redeemedPromoCode.message && (
                  <span>
                    {generatePromoCodeMessage(redeemedPromoCode, isMonthly ? 'monthly' : 'yearly')}
                  </span>
                )}
              </p> */}
                <p className={styles.redemptionMessage__error}>
                  {isPromoCodeChecked && promoError}
                </p>
              </div>
            )}
          </div>

          <div className={styles.totalPriceSummary}>
            <p className={styles.totalPriceSummary__label}>Order summary</p>
            <div className={styles.totalPriceSummary__priceDetails}>
              <p>
                {summaryDetails.displayName}
                {isMonthly ? ` Monthly` : ` Annual`} plan
              </p>
              <p className={styles.orderPrice}>
                USD $
                {`${
                  isMonthly
                    ? formatNumber(summaryDetails.monthlyPrice)
                    : formatNumber(summaryDetails.annualPrice)
                }`}{' '}
                {isMonthly ? ` /month` : ` /year`}
              </p>
            </div>
            {isPromoCodeChecked && redeemedPromoCode && redeemedPromoCode.message ? (
              <div className={styles.totalPriceSummary__discountDetails}>
                <p>
                  {generatePromoCodeMessage(redeemedPromoCode, isMonthly ? 'monthly' : 'yearly')}
                </p>
                <p className={styles.orderPrice}>
                  - USD $
                  {`${
                    isMonthly
                      ? formatNumber(calculateDiscountedPrice(summaryDetails.monthlyPrice))
                      : formatNumber(calculateDiscountedPrice(summaryDetails.annualPrice))
                  }`}{' '}
                  {isMonthly ? ` /month` : ` /year`}
                </p>
              </div>
            ) : (
              <>
                {isPayNow && (
                  <div className={styles.totalPriceSummary__discountDetails}>
                    <p>
                      20% OFF discount for first
                      {isMonthly ? ` month` : ` year`}
                    </p>
                    <p className={styles.orderPrice}>
                      - USD $
                      {`${
                        isMonthly
                          ? formatNumber(
                              calculateDiscountedPrice(summaryDetails.monthlyPrice * 0.2)
                            )
                          : formatNumber(calculateDiscountedPrice(summaryDetails.annualPrice * 0.2))
                      }`}{' '}
                      {isMonthly ? ` /month` : ` /year`}
                    </p>
                  </div>
                )}
              </>
            )}
            <hr />
            {/* <p className={styles.totalPriceSummary__due}>DUE NOW</p> */}
            <div className={styles.totalPriceSummary__dueDetails}>
              <p>DUE NOW</p>
              {!isPayNow && (
                <>
                  <p className={`${styles.orderPrice} ${styles.purpleText}`}>USD $0</p>
                </>
              )}
              {isPayNow && (
                <p className={`${styles.orderPrice} ${styles.purpleText}`}>
                  <strong>
                    USD $
                    {`${
                      isMonthly
                        ? formatNumber(
                            calculateDiscountedPrice(
                              summaryDetails.monthlyPrice - summaryDetails.monthlyPrice * 0.2
                            )
                          )
                        : formatNumber(
                            calculateDiscountedPrice(
                              summaryDetails.annualPrice - summaryDetails.annualPrice * 0.2
                            )
                          )
                    }`}{' '}
                  </strong>
                  {isMonthly ? ` /month` : ` /year`}
                </p>
              )}
            </div>
            {!isPayNow ? (
              <p className={styles.totalPriceSummary__cardCharge}>
                Your card will be charged USD $
                {`${
                  isMonthly
                    ? formatNumber(summaryDetails.monthlyPrice)
                    : formatNumber(summaryDetails.annualPrice)
                }`}{' '}
                on{' '}
                <strong>
                  {prettyPrintDate(new Date(new Date().setDate(new Date().getDate() + 7)))}.
                </strong>
              </p>
            ) : (
              <p className={styles.totalPriceSummary__cardCharge}>
                Your card will be charged USD $
                {`${
                  isMonthly
                    ? formatNumber(
                        calculateDiscountedPrice(
                          summaryDetails.monthlyPrice - summaryDetails.monthlyPrice * 0.2
                        )
                      )
                    : formatNumber(
                        calculateDiscountedPrice(
                          summaryDetails.annualPrice - summaryDetails.annualPrice * 0.2
                        )
                      )
                }`}{' '}
                on{' '}
                <strong>
                  {prettyPrintDate(new Date(new Date().setDate(new Date().getDate())))}.
                </strong>
              </p>
            )}
          </div>

          <div className={styles.consent}>
            <p>
              {`${
                isPayNow
                  ? 'By clicking "Start my subscription", you agree to our'
                  : 'By clicking "Start my free trial", you agree to our'
              }`}{' '}
              <span
                onClick={() => {
                  setOpenTOS(true);
                }}
              >
                Terms of Service&nbsp;
              </span>
              and&nbsp;
              <span
                onClick={() => {
                  setOpenPP(true);
                }}
              >
                Privacy Policy.
              </span>
            </p>
          </div>

          {isPayNow ? (
            <ActionButton
              variant={'primary'}
              size={'md'}
              type="purpleGradient"
              className={styles.completeButton}
              onClick={handleSubmitV2}
              disabled={!stripe || stripeLoading || isLoading}
            >
              Start my subscription &nbsp;
              <Loader active={isLoading} inline inverted size="mini" />
              {false && <Loader active={isLoading} inline size="mini" inverted />}
            </ActionButton>
          ) : (
            <ActionButton
              variant={'primary'}
              size={'md'}
              type="purpleGradient"
              className={styles.completeButton}
              onClick={handleSubmitV2}
              disabled={!stripe || stripeLoading || isLoading}
            >
              Start my free trial &nbsp;
              <Loader active={isLoading} inline inverted size="mini" />
              {false && <Loader active={isLoading} inline size="mini" inverted />}
            </ActionButton>
          )}

          {!successPayment && errorMessage.length > 0 && (
            <div className={styles.paymentErrorMessage}>
              <p>{errorMessage}</p>
            </div>
          )}

          <div className={styles.paymentMeta}>
            <div className={styles.cardsWrapper}>
              <img className={styles.cardsWrapper__cards} src={cardIcons} alt="cards" />
              <img
                className={styles.cardsWrapper__stripe}
                src={stripeIcon}
                alt="powered by stripe"
              />
            </div>
          </div>
        </div>

        <div className={styles.notes}>
          {isPayNow && (
            <>
              <p className={styles.skipTrial}>
                Skip the trial - 20% off on{' '}
                {isMonthly
                  ? `${summaryDetails.displayName} Monthly plan for an entire month`
                  : `${summaryDetails.displayName} Annual plan for an entire year`}
              </p>
            </>
          )}
          <div className={styles.notesWrapper}>
            {!isPayNow && (
              <p className={styles.notesWrapper__freeTrial}>
                Your 7-day trial is <strong>100% free</strong> and lasts until{' '}
                <strong>
                  {prettyPrintDate(new Date(new Date().setDate(new Date().getDate() + 7)))}.
                </strong>{' '}
                Cancel any time.
                <br />
              </p>
            )}
            <p className={styles.notesWrapper__benefitTitle}>
              Your {summaryDetails.displayName} plan includes:
            </p>
            <p className={styles.notesWrapper__benefit}>
              {isMonthly
                ? summaryDetails?.monthlyBenefits?.map((benefit: any) => {
                    return (
                      <>
                        {benefit.name && (
                          <div>
                            {benefitIcon[benefit.name]} <span>{benefit.description}</span>
                          </div>
                        )}
                      </>
                    );
                  })
                : summaryDetails?.annuallyBenefits?.map((benefit: any) => {
                    return (
                      <>
                        {benefit.name && (
                          <div>
                            {benefitIcon[benefit.name]} <span>{benefit.description}</span>
                          </div>
                        )}
                      </>
                    );
                  })}
            </p>
          </div>
          <div className={styles.notesWrapper}>
            {isPayNow && (
              <div>
                <p className={styles.notesWrapper__faqTitle}>How does the discount offer work?</p>
                <p className={styles.notesWrapper__faqContent}>
                  Your discount applies for one {isMonthly ? 'month' : 'year'}. After your discount
                  period expires, you ll be charged standard rates.
                </p>
              </div>
            )}
            {!isPayNow && (
              <div>
                <p className={styles.notesWrapper__faqTitle}>Will I see this charge right away?</p>
                <p className={styles.notesWrapper__faqContent}>
                  No. You won{`’`}t be charged until after your free trial ends on{' '}
                  {prettyPrintDate(new Date(new Date().setDate(new Date().getDate() + 7)))}. After
                  your free trial, you{`’`}ll be charged USD $
                  {`${
                    isMonthly
                      ? formatNumber(summaryDetails.monthlyPrice)
                      : formatNumber(summaryDetails.annualPrice)
                  }
                  `}{' '}
                  {isMonthly ? 'monthly' : 'annually'} until you change your plan or cancel your
                  subscription.
                </p>
              </div>
            )}
            <div>
              <p className={styles.notesWrapper__faqTitle}>Can I change or cancel my plan?</p>
              <p className={styles.notesWrapper__faqContent}>
                Yes, you can switch to a new plan or cancel your subscription at any time. We don
                {`’`}t offer refund due to the nature of the data service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
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
  termsOfService: get(state, 'userOnboarding.termsOfService'),
  privacyPolicy: get(state, 'userOnboarding.privacyPolicy'),
});
const mapDispatchToProps = {
  createSubscriptionData: (data: any) => createSubscription(data),
  retryInvoice: (data: any) => retryInvoiceWithNewPaymentMethod(data),
  setStripeLoad: (data: boolean) => setStripeLoading(data),
  checkPromoCode: (promoCode: string, subscriptionId: number, paymentMode: string) =>
    checkPromoCode(promoCode, subscriptionId, paymentMode),
  setRedeemedPromoCode: (data: any) => setPromoCode(data),
  setPromoError: (data: string) => setPromoError(data),
  fetchTOS: () => fetchTOS(),
  fetchPP: () => fetchPP(),
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
