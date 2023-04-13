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
import { Form, Header, Modal, TextArea, Loader, Radio } from 'semantic-ui-react';
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
import { formatDecimal, formatNumber, prettyPrintDate } from '../../../../utils/format';

/* Constants */
import {
  generateSubscriptionDetails,
  getSubscriptionID,
} from '../../../../constants/Subscription/Sellgo';

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
  termsOfService: any;
  privacyPolicy: any;
  fetchPP: any;
  fetchTOS: any;
  isPayNow: boolean;
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
    successPayment,
    promoCodeObj,
    isPayNow,
  } = props;
  const [isPromoCodeChecked, setPromoCodeChecked] = useState<boolean>(false);
  const [promoCode, setPromoCode] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isMonthly, setIsMonthly] = useState<boolean>(paymentMode === 'monthly');
  const { termsOfService, privacyPolicy, fetchPP, fetchTOS } = props;
  const [openTOS, setOpenTOS] = React.useState<boolean>(false);
  const [openPP, setOpenPP] = React.useState<boolean>(false);

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

  const handleSubmit = async () => {
    setLoading(true);
    const {
      accountType,
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
      handleError(error);
      setLoading(false);
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
          payment_mode: isMonthly ? 'monthly' : 'yearly',
          free_trial: isPayNow ? false : true,
          promo_code: promoCode,
        };
        Axios.defaults.headers.common.Authorization = ``;
        createSubscriptionData(data);
      }
    }
  };

  return (
    <>
      <div className={styles.paymentForm}>
        {newUserExperiencePopup()}
        <section className={styles.reviewsSection}>
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
            <p className={styles.description}>
              We guarantee that the payment process is secured and confidential through Stripe. We
              do not store your payment credential information.
            </p>
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
              >
                <Radio checked={!isMonthly} onClick={() => setIsMonthly(false)} />
                <div className={styles.orderSummaryContainer__details}>
                  <p className={styles.orderSummaryContainer__details__title}>Annual</p>
                  {isPayNow && (
                    <p className={styles.orderSummaryContainer__details__priceCut}>
                      ${`${formatNumber(summaryDetails?.annualPrice)}`} <span>per year</span>
                    </p>
                  )}
                  <p className={styles.orderSummaryContainer__details__price}>
                    $
                    {`${
                      isPayNow
                        ? formatNumber(
                            (summaryDetails?.annualPrice - summaryDetails?.annualPrice * 0.2) / 12
                          )
                        : formatNumber(summaryDetails?.annualPrice)
                    }`}{' '}
                    <span>per month</span>
                  </p>
                  <p className={styles.orderSummaryContainer__details__description}>
                    Billed yearly for USD $
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
                <p className={styles.bestValue}>Best Value</p>
              </div>
              <div
                className={`${styles.orderSummaryContainer__box} ${
                  isMonthly ? styles.orderSummaryContainer__active : ''
                }`}
              >
                {' '}
                <Radio checked={isMonthly} onClick={() => setIsMonthly(true)} />
                <div className={styles.orderSummaryContainer__details}>
                  <p className={styles.orderSummaryContainer__details__title}>Monthly</p>
                  {isPayNow && (
                    <p className={styles.orderSummaryContainer__details__priceCut}>
                      ${`${formatNumber(summaryDetails?.monthlyPrice)}`} <span>per month</span>
                    </p>
                  )}
                  <p className={styles.orderSummaryContainer__details__price}>
                    $
                    {`${
                      isPayNow
                        ? formatNumber(
                            summaryDetails?.monthlyPrice - summaryDetails?.monthlyPrice * 0.2
                          )
                        : formatNumber(summaryDetails?.monthlyPrice)
                    }`}{' '}
                    <span>per month</span>
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
                {isPromoCodeChecked && redeemedPromoCode && redeemedPromoCode.message && (
                  <div className={styles.couponItem}>
                    <p className={styles.orderPrice}>
                      {isMonthly ? (
                        <span>
                          -$
                          {formatDecimal(
                            summaryDetails.monthlyPrice -
                              calculateDiscountedPrice(summaryDetails.monthlyPrice)
                          )}
                        </span>
                      ) : (
                        <span>
                          -$
                          {formatDecimal(
                            summaryDetails.annualPrice -
                              calculateDiscountedPrice(summaryDetails.annualPrice)
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
            </div>
          </div>

          <h2 className={styles.securePayment}>Enter your billing details</h2>

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

          <div className={styles.totalPriceSummary}>
            <p className={styles.totalPriceSummary__label}>Order Summary</p>
            <div className={styles.totalPriceSummary__priceDetails}>
              <p>{summaryDetails.displayName} plan</p>

              <p className={styles.orderPrice}>
                USD $
                {isMonthly
                  ? formatDecimal(calculateDiscountedPrice(summaryDetails.monthlyPrice))
                  : formatDecimal(calculateDiscountedPrice(summaryDetails.annualPrice))}
              </p>
            </div>

            {isPayNow && (
              <div className={styles.totalPriceSummary__priceDetails}>
                <p>20% OFF discount for first month:</p>

                <p className={styles.orderPrice}>
                  USD $
                  {isMonthly
                    ? formatDecimal(calculateDiscountedPrice(summaryDetails.monthlyPrice * 0.2))
                    : formatDecimal(calculateDiscountedPrice(summaryDetails.annualPrice * 0.2))}
                </p>
              </div>
            )}
            <hr />
            <div className={styles.totalPriceSummary__priceDetails}>
              <p>Due now</p>
              {!isPayNow && (
                <>
                  <p className={`${styles.orderPrice} ${styles.purpleText}`}>USD $0.00</p>
                </>
              )}
              {isPayNow && (
                <p className={`${styles.orderPrice} ${styles.purpleText}`}>
                  USD $
                  {isMonthly
                    ? formatDecimal(
                        calculateDiscountedPrice(
                          summaryDetails.monthlyPrice - summaryDetails.monthlyPrice * 0.2
                        )
                      )
                    : formatDecimal(
                        calculateDiscountedPrice(
                          summaryDetails.annualPrice - summaryDetails.annualPrice * 0.2
                        )
                      )}
                </p>
              )}
            </div>
            {!isPayNow && (
              <p className={styles.totalPriceSummary__cardCharge}>
                Your card will be charged USD $
                {`${
                  isMonthly
                    ? formatNumber(summaryDetails.monthlyPrice)
                    : formatNumber(summaryDetails.annualPrice)
                }`}{' '}
                + tax on {prettyPrintDate(new Date(new Date().setDate(new Date().getDate() + 7)))}.
              </p>
            )}
          </div>

          <ActionButton
            variant={'primary'}
            size={'md'}
            type="purpleGradient"
            className={styles.completeButton}
            onClick={handleSubmit}
            disabled={!stripe || stripeLoading || isLoading}
          >
            Complete payment&nbsp;
            {false && <Loader active={isLoading} inline size="mini" inverted />}
          </ActionButton>

          <div className={styles.consent}>
            <p>
              By clicking Complete payment, you agree to our&nbsp;
              <span
                onClick={() => {
                  setOpenTOS(true);
                }}
              >
                Terms of Service&nbsp;
              </span>
              and &nbsp;
              <span
                onClick={() => {
                  setOpenPP(true);
                }}
              >
                Privacy Policy.
              </span>
            </p>
          </div>
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
          <div className={styles.copyrightFooter}>
            <button
              onClick={() => {
                setOpenTOS(true);
              }}
            >
              Terms of Service
            </button>
            <button
              onClick={() => {
                setOpenPP(true);
              }}
            >
              Privacy Policy&nbsp;
            </button>
            <span>Copyright @ sellgo 2022</span>
          </div>
        </div>

        <div className={styles.notes}>
          {isPayNow && (
            <>
              <p className={styles.skipTrial}>
                Skip the trial -20% off on{' '}
                {isMonthly
                  ? `${summaryDetails.displayName} Monthly plan for an entire month`
                  : `${summaryDetails.displayName} Annual plan for an entire year`}
              </p>
            </>
          )}
          <div className={styles.notesWrapper}>
            {!isPayNow && (
              <p>
                Your 7-day trial is <strong>100% free</strong> and lasts until{' '}
                <strong>
                  {prettyPrintDate(new Date(new Date().setDate(new Date().getDate() + 7)))}.
                </strong>{' '}
                Cancel any time.
              </p>
            )}
            <p>
              <strong>Your {summaryDetails.displayName} plan includes:</strong>
            </p>
            <ul>
              {summaryDetails?.benefits?.map((benefit: string) => {
                return (
                  <>
                    {benefit && (
                      <li key={benefit}>
                        <span>{benefit}</span>
                      </li>
                    )}
                  </>
                );
              })}
            </ul>
          </div>
          <div className={styles.notesWrapper}>
            {isPayNow && (
              <div>
                <p>
                  <strong>How does the discount offer work?</strong>
                </p>
                <p>
                  Your discount applies for one {isMonthly ? 'month' : 'year'}. After your discount
                  period expires, you’ll be charged standard rates.
                </p>
              </div>
            )}
            {!isPayNow && (
              <div>
                <p>
                  <strong>Will I see this charge right away?</strong>
                </p>
                <p>
                  No. You won{`’`}t be charged until after your free trial ends on{' '}
                  {prettyPrintDate(new Date(new Date().setDate(new Date().getDate() + 7)))}. After
                  your free trial, you{`’`}ll be charged{' '}
                  <strong>
                    USD ${isMonthly ? summaryDetails.monthlyPrice : summaryDetails.annualPrice}
                  </strong>{' '}
                  (plus tax) monthly until you change your plan or cancel your subscription.
                </p>
              </div>
            )}
            <div>
              <p>
                <strong>Can I change or cancel my plan?</strong>
              </p>
              <p>
                Yes, you can switch to a new plan or cancel your subscription at any time. Please
                note, refunds can only be issued within 30 days of your subscription start date.
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
