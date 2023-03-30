import React, { useState } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import {
  // CardNumberElement,
  // CardExpiryElement,
  // CardCvcElement,
  useStripe,
} from '@stripe/react-stripe-js';
import { Form, Header, Modal, TextArea, Loader, Icon } from 'semantic-ui-react';
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
  fetchSellerSubscription,
} from '../../../../../../actions/Settings/Subscription';
import { fetchTOS, fetchPP } from '../../../../../../actions/UserOnboarding';

/* Components */
import ActionButton from '../../../../../../components/ActionButton';

/* Assets */
import cardIcons from '../../../../../../assets/images/4_Card_color_horizontal.svg';
import stripeIcon from '../../../../../../assets/images/powered_by_stripe.svg';

/* Styling */
import styles from './index.module.scss';

/* Types */
import { PromoCode, SummaryDetails } from '../../../../../../interfaces/Subscription';

/* Utils */
import { generatePromoCodeMessage } from '../../../../../../utils/subscriptions';
import { formatDecimal, formatNumber, prettyPrintDate } from '../../../../../../utils/format';

/* Constants */
import {
  generateSubscriptionDetails,
  getSubscriptionDetailsById,
  getSubscriptionID,
  isSubscriptionUpgrading,
} from '../../../../../../constants/Subscription/Sellgo';
import { sellerIDSelector } from '../../../../../../selectors/Seller';
import { error } from '../../../../../../utils/notifications';
import { AppConfig } from '../../../../../../config';
import SubscriptionDetailsComparisonTable from './SubsriptionComparisonTable';

/* Data */

// const CARD_ELEMENT_OPTIONS = {
//   style: {
//     base: {
//       color: '#808080',
//       fontFamily: "'Work Sans', sans-serif",
//       fontSmoothing: 'antialiased',
//       '::placeholder': {
//         color: 'rgba(0,0,0,0.3)',
//       },
//     },
//     invalid: {
//       color: '#fa755a',
//       iconColor: '#fa755a',
//     },
//   },
// };

interface MyProps {
  sellerSubscription: any;
  accountType?: string;
  paymentMode: string;
  createSubscriptionData: (data: any) => void;
  retryInvoice: (data: any) => void;
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
  prorateValue: number;
  fetchSellerSubscription: () => void;
  setSuccessPayment: (a: boolean) => void;
}

function UpdateSubscriptionDetails(props: MyProps) {
  const stripe: any = useStripe();
  const {
    sellerSubscription,
    stripeLoading,
    // checkPromoCode,
    redeemedPromoCode,
    promoError,
    // promoLoading,
    // setRedeemedPromoCode,
    // setPromoError,
    accountType,
    paymentMode,
    promoCodeObj,
    prorateValue,
    fetchSellerSubscription,
    setSuccessPayment,
  } = props;
  const [isPromoCodeChecked, setPromoCodeChecked] = useState<boolean>(false);
  // const [promoCode, setPromoCode] = useState<string>('');
  const isMonthly = paymentMode === 'monthly';
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
  const summaryDetails: SummaryDetails = generateSubscriptionDetails(
    accountType?.toLowerCase() ?? ''
  );
  const currentSubscriptionDetails = getSubscriptionDetailsById(
    sellerSubscription?.subscription_id
  );
  const isSubsciptionUpgrade = isSubscriptionUpgrading(
    currentSubscriptionDetails,
    sellerSubscription?.payment_mode === 'monthly',
    summaryDetails,
    isMonthly
  );
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

  // const handleCheckPromoCode = async (event: any) => {
  //   event.preventDefault();
  //   const subscriptionId = getSubscriptionID(accountType ?? '');
  //   Axios.defaults.headers.common.Authorization = ``;
  //   checkPromoCode(promoCode, subscriptionId, paymentMode);
  // };

  // const handlePromoCodeChange = (event: any) => {
  //   setPromoCode(event.target.value.toUpperCase());
  //   setPromoCodeChecked(false);
  //   setRedeemedPromoCode({});
  //   setPromoError('');
  // };

  const handleSubmit = async () => {
    setLoading(true);
    const bodyFormData = new FormData();
    const subscriptionId = getSubscriptionID(accountType ?? '');
    bodyFormData.append('subscription_id', `${subscriptionId}`);
    bodyFormData.append('payment_mode', `${isMonthly ? 'monthly' : 'yearly'}`);

    Axios.post(
      AppConfig.BASE_URL_API + `sellers/${sellerIDSelector()}/subscription/update`,
      bodyFormData
    )
      .then(() => {
        setSuccessPayment(true);
        fetchSellerSubscription();
      })
      .catch(() => {
        error(`Failed to change subscription`);
      });
  };

  return (
    <>
      <div className={styles.paymentForm}>
        {newUserExperiencePopup()}
        <SubscriptionDetailsComparisonTable
          currentSubscriptionDetails={currentSubscriptionDetails}
          newSubscriptionDetails={summaryDetails}
          isCurrentSubscriptionMonthly={sellerSubscription.payment_mode === 'monthly'}
          isNewSubscriptionMonthly={isMonthly}
        />

        <div className={styles.paymentInfoForm}>
          <div className={styles.header}>
            <h2 className={styles.heading}>Sellgo secure payment page</h2>
            <div className={styles.descriptionBlock}>
              <Icon name="lock" color="grey" />
              <p className={styles.description}>
                We guarantee that the payment process is secured and confidential through Stripe. We
                do not store your payment credential information.
              </p>
            </div>
            <div className={styles.pricing}>
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
            </div>
          </div>
          <div className={styles.orderSummaryContainer}>
            <div className={styles.orderItemsWrapper}>
              <div className={styles.orderItem}>
                <p className={styles.orderTitle}>
                  {isMonthly ? (
                    <div>
                      {/* {commify(formatString(PLAN_UNIT[unitsSold]))}*/ `${formatNumber(
                        summaryDetails.monthlyLookups
                      )} lookups per month usage-based`}
                      <br />
                      <span>billed monthly</span>
                    </div>
                  ) : (
                    <div>
                      {/* {commify(formatString(PLAN_UNIT[unitsSold]))}*/ `${formatNumber(
                        summaryDetails.annualLookups
                      )} lookups per year usage-based`}
                      <br />
                      <span>billed yearly</span>
                    </div>
                  )}
                </p>
                {isMonthly ? (
                  <p className={styles.orderPrice}>{formatDecimal(summaryDetails.monthlyPrice)}</p>
                ) : (
                  <p className={styles.orderPrice}>{formatDecimal(summaryDetails.annualPrice)}</p>
                )}
              </div>

              {/* <div className={styles.paymentModeToggle}>
                <div className={styles.paymentToggleTextWrapper}>
                  <p className={styles.paymentToggleText}>
                    {isMonthly ? (
                      <span>
                        Switch to {summaryDetails?.displayName ?? summaryDetails?.name} monthly
                        &nbsp;
                        <span className={styles.total}>
                          {formatDecimal(summaryDetails.monthlyPrice)} /mo
                        </span>
                      </span>
                    ) : (
                      <span>
                        Switch to {summaryDetails?.displayName ?? summaryDetails?.name} yearly
                        &nbsp;
                        <span className={styles.total}>
                          {formatDecimal(summaryDetails.annualPrice)} /year
                        </span>
                      </span>
                    )}
                  </p>
                </div>
              </div> */}
            </div>

            <div className={styles.totalItemsWrapper}>
              <div className={styles.overageItem}>
                <p className={styles.orderTitle}>Subtotal</p>
                {isMonthly ? (
                  <p className={styles.orderPrice}>{formatDecimal(summaryDetails.monthlyPrice)}</p>
                ) : (
                  <p className={styles.orderPrice}>{formatDecimal(summaryDetails.annualPrice)}</p>
                )}
              </div>
              {isSubsciptionUpgrade && (
                <div className={styles.overageItem}>
                  <p className={styles.orderTitle}>Prorated</p>
                  <p className={styles.orderPrice}>-{formatDecimal(prorateValue)}</p>
                </div>
              )}

              {/* <Form.Group className={`${styles.formGroup} ${styles.formGroup__promo}`}>
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
              </Form.Group> */}
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
                    ? formatDecimal(
                        calculateDiscountedPrice(summaryDetails.monthlyPrice) -
                          (isSubsciptionUpgrade ? prorateValue : 0)
                      )
                    : formatDecimal(
                        calculateDiscountedPrice(summaryDetails.annualPrice) -
                          (isSubsciptionUpgrade ? prorateValue : 0)
                      )}
                </p>
              </div>
              <div className={styles.updateMsg}>
                {isSubsciptionUpgrade ? (
                  <p>
                    Your new{' '}
                    <strong>
                      {summaryDetails?.displayName ?? summaryDetails?.name}{' '}
                      {`${isMonthly ? 'monthly' : 'yearly'}`}{' '}
                    </strong>
                    subscription will begin today and will renew on
                    <strong>
                      {prettyPrintDate(new Date(sellerSubscription?.next_billing_cycle_date))}.
                    </strong>
                  </p>
                ) : (
                  <p>
                    Your new{' '}
                    <strong>
                      {summaryDetails?.displayName ?? summaryDetails?.name}{' '}
                      {`${isMonthly ? 'monthly' : 'yearly'}`}{' '}
                    </strong>
                    subscription will begin on{' '}
                    <strong>
                      {prettyPrintDate(new Date(sellerSubscription?.next_billing_cycle_date))}.
                    </strong>
                  </p>
                )}
                <p>
                  Once your payment is successful you will have access to{' '}
                  <strong>
                    {isMonthly
                      ? `${formatNumber(summaryDetails?.monthlyLookups)} lookups per month.`
                      : `${formatNumber(summaryDetails?.annualLookups)} lookups per year.`}
                  </strong>
                </p>
              </div>
            </div>
          </div>

          {/* <Form.Group className={styles.formGroup}>
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
          </Form.Group> */}

          <ActionButton
            variant={'primary'}
            size={'md'}
            type="purpleGradient"
            className={styles.completeButton}
            onClick={handleSubmit}
            disabled={!stripe || stripeLoading || isLoading}
          >
            Switch plan&nbsp;
            {false && <Loader active={isLoading} inline size="mini" inverted />}
          </ActionButton>

          <div className={styles.consent}>
            <p>
              By clicking Switch plan, you agree to our&nbsp;
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
  fetchSellerSubscription: () => fetchSellerSubscription(),
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateSubscriptionDetails);
