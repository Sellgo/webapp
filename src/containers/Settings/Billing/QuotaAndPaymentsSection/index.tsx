import React, { ReactChild, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Modal, Dimmer } from 'semantic-ui-react';
// import Axios from 'axios';

/* App Config */
import { AppConfig } from '../../../../config';

/* Styling */
import styles from './index.module.scss';
import './modalReset.scss';

/* Components */
import NewQuotaMeter from '../../../../components/NewQuotaMeter';
import PlanTypeRectangle from '../../../../components/PlanTypeRectangle';
import UpdateCardForm from '../UpdateCardForm';
import OrangeButton from '../../../../components/OrangeButton';
import BoxContainer from '../../../../components/BoxContainer';
import BoxHeader from '../../../../components/BoxHeader';
import BoxFooter from '../../../../components/BoxFooter';
import CreditCardIcon from '../../../../assets/images/credit-card-solid.svg';
import HelpingHandsIcon from '../../../../assets/images/hands-helping-solid.svg';
import history from '../../../../history';
import Placeholder from '../../../../components/Placeholder';
import { UNITS_SOLD_TYPE, getSellerPlan } from '../../Pricing/AistockPricing/Herobox/data';

/* Interfaces */
import {
  QuotaCollection,
  StripeSubscriptionInfo,
  CreditCard,
  SubscriptionPlanType,
} from '../../../../interfaces/Settings/billing';
import { SellerSubscription } from '../../../../interfaces/Seller';

/* Utils */
import {
  capitalizeFirstLetter,
  formatCurrency,
  prettyPrintDate,
  prettyPrintNumber,
  stringToNumber,
} from '../../../../utils/format';
// import { sellerIDSelector } from '../../../../selectors/Seller';
// import { error, success } from '../../../../utils/notifications';
import { isSellgoSession } from '../../../../utils/session';
import { getSubscriptionDetailsById } from '../../../../constants/Subscription/Sellgo';

const stripePromise = loadStripe(AppConfig.STRIPE_API_KEY);
interface Props {
  subscriptionPlan: SubscriptionPlanType;
  subscriptionDetails: StripeSubscriptionInfo;
  sellerSubscription: SellerSubscription;
  quotas: QuotaCollection;
  card: CreditCard;
  isQuotaLoading: boolean;
  isSubscriptionStripeLoading: boolean;
  isCreditCardLoading: boolean;
  fetchCreditCardInfo: () => void;
  hasActivePlan: boolean;
  hasPaymentMethod: boolean;
  fetchSellerSubscription: () => void;
  getSellerInfo: () => void;
  resumeSubscription: boolean;
  removeSubscriptionCancel: () => void;
}

const QuotaAndPaymentsSection = (props: Props) => {
  const {
    subscriptionPlan,
    subscriptionDetails,
    sellerSubscription,
    quotas,
    card,
    isQuotaLoading,
    isSubscriptionStripeLoading,
    isCreditCardLoading,
    fetchCreditCardInfo,
    hasActivePlan,
    hasPaymentMethod,
    removeSubscriptionCancel,
  } = props;

  const [unitsSoldInput] = useState<number>(1000);
  const [unitsSold] = useState<UNITS_SOLD_TYPE>('1,000');
  const sellerPlan = getSellerPlan(unitsSold);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  // const [isCancellingSubscription, setCancellingSubscription] = React.useState<boolean>(false);
  // const [isCancelSubscriptionLoading, setCancelSubscriptionLoading] = React.useState<boolean>(
  //   false
  // );

  const isSubscriptionExpiring = sellerSubscription && sellerSubscription.status === 'pending';
  const subscriptionFeDetails =
    sellerSubscription && getSubscriptionDetailsById(sellerSubscription?.subscription_id);
  let subscriptionFePlanName: SubscriptionPlanType = null;
  if (subscriptionFeDetails?.name === 'Starter') {
    subscriptionFePlanName = 'Professional Plan';
  } else if (subscriptionFeDetails?.name === 'Elite') {
    subscriptionFePlanName = 'Business Plan';
  }
  /* Calculation of quotas */
  const salesEstAvailable = quotas.sales_estimation.available || 1;
  const sellerResearchAvailable = quotas?.seller_detail?.available || 1;
  const profitFinderAvailable = quotas.profit_finder.available || 1;

  const salesEstUsed = Math.min(quotas.sales_estimation.used || 0, salesEstAvailable);
  const sellerResearchUsed = Math.min(quotas?.seller_detail?.used || 0, sellerResearchAvailable);
  const profitFinderUsed = Math.min(quotas.profit_finder.used || 0, profitFinderAvailable);

  const salesEstPercent = salesEstUsed / salesEstAvailable;
  const sellerResearchPercent = sellerResearchUsed / sellerResearchAvailable;
  const profitFinderPercent = profitFinderUsed / profitFinderAvailable;

  const totalUsedQuotaPercent =
    ((salesEstPercent + sellerResearchPercent + profitFinderPercent) / 3) * 100;

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  // const cancelSubscription = () => {
  //   setCancelSubscriptionLoading(true);
  //   Axios.post(AppConfig.BASE_URL_API + `sellers/${sellerIDSelector()}/subscription/cancel`)
  //     .then(() => {
  //       getSellerInfo();
  //       fetchSellerSubscription();
  //       success(`Your subscription has been cancelled`);
  //       history.push('/cancel');
  //       setCancelSubscriptionLoading(false);
  //     })
  //     .catch(() => {
  //       setCancelSubscriptionLoading(false);
  //       error(`There was an error cancelling your subscription`);
  //     });
  // };

  /* Content to show if user has no active plan, and no payment methods */
  const DimmerContent: ReactChild = (
    <Dimmer active={!hasActivePlan} inverted>
      <div className={styles.dimmerWrapper}>
        No active plan found
        <div className={styles.buttonsRow}>
          <OrangeButton
            asExternal
            type="white"
            size="small"
            navigateTo="/settings/pricing"
            className={styles.actionButton}
          >
            View plans
          </OrangeButton>
          {!hasPaymentMethod && (
            <OrangeButton
              type="white"
              size="small"
              onClick={handleModalOpen}
              className={`${styles.actionButton} ${styles.dimmerButton}`}
            >
              Add a new card
            </OrangeButton>
          )}
        </div>
      </div>
    </Dimmer>
  );

  /* Loading display placeholder */
  if (isQuotaLoading || isSubscriptionStripeLoading || isCreditCardLoading) {
    return (
      <section className={styles.quotaAndPaymentsWrapper}>
        <BoxHeader>Plan and Billing</BoxHeader>
        <BoxContainer>
          <Placeholder numberParagraphs={3} numberRows={3} />
        </BoxContainer>
        <BoxFooter>
          <div>
            <img src={HelpingHandsIcon} alt="helping-hands-icon" />
            &nbsp;&nbsp; If you have any trouble with the payment setting, you can contact us
            at&nbsp;
            {isSellgoSession() ? (
              <a href="mailto: support@sellgo.com" className={styles.mailLink}>
                support@sellgo.com
              </a>
            ) : (
              <a href="mailto: support@aistock.co" className={styles.mailLink}>
                support@aistock.co
              </a>
            )}
            . We can help.
          </div>
        </BoxFooter>
      </section>
    );
  }

  return (
    <section className={styles.quotaAndPaymentsWrapper}>
      <BoxHeader>Plan and Billing</BoxHeader>
      <BoxContainer>
        <div className={styles.billingGrid}>
          <span className={styles.quotaSection}>
            <p className={`${styles.boxTitle}`}> Current plan</p>
            <div>
              {/* Show dimmer content if user has no active subscription, but has payment method */}
              {DimmerContent}
              {isSellgoSession() ? (
                <div className={styles.planDetailsRow}>
                  <PlanTypeRectangle
                    plan={subscriptionFePlanName ? subscriptionFePlanName : subscriptionPlan}
                    planType={
                      sellerSubscription.is_trialing
                        ? 'Free Trial'
                        : sellerSubscription.payment_mode
                    }
                  />
                  <span>
                    {/* &nbsp; - You have used {formatDecimal(totalUsedQuotaPercent)}% of the available
                    quota. */}
                  </span>

                  {isSellgoSession() ? (
                    <div className={styles.quotaBarsWrapper}>
                      {/* <NewQuotaMeter
                    className={styles.quotaBar}
                    type="Profit Finder"
                    quota={{
                      used: profitFinderUsed,
                      available: profitFinderAvailable,
                    }}
                  /> */}
                      <NewQuotaMeter
                        className={styles.quotaBar}
                        type="Remaining lookups"
                        quota={{
                          used: sellerResearchUsed,
                          available: sellerResearchAvailable,
                        }}
                      />
                      <span>
                        &nbsp; You have used {prettyPrintNumber(totalUsedQuotaPercent)}% of the
                        available lookups.
                      </span>
                      {/* <NewQuotaMeter
                    type="Sales Estimation"
                    quota={{
                      used: salesEstUsed,
                      available: salesEstAvailable,
                    }}
                  /> */}
                    </div>
                  ) : (
                    <div className={styles.quotaBarsWrapper} />
                  )}
                </div>
              ) : (
                <div className={styles.planDetailsRow}>
                  <PlanTypeRectangle plan={subscriptionPlan} />
                  <span>
                    &nbsp;You are currently subscribed to&nbsp;{sellerPlan.name}&nbsp;
                    <br />
                    &nbsp;with&nbsp;{unitsSoldInput}&nbsp;unit sold per month.
                  </span>
                </div>
              )}

              {isSellgoSession() && sellerSubscription.status === 'pending' && (
                <div className={styles.resumeSubscriptionText}>
                  <p className={styles.cancelWarningText}>
                    Your subscription will not renew after{' '}
                    <strong>
                      {prettyPrintDate(new Date(sellerSubscription.next_billing_cycle_date ?? ''))}
                    </strong>
                  </p>
                </div>
              )}

              <div className={styles.innerGrid}>
                {/* <p className={styles.actionLabel}> Action </p> */}

                <div className={styles.planActions}>
                  <OrangeButton
                    asExternal
                    type="primary"
                    size="small"
                    //navigateTo="/settings/pricing"
                    onClick={() => history.push('/settings/pricing')}
                    className={`${styles.actionButton} ${
                      sellerSubscription?.is_trialing ? styles.disabledBtn : ''
                    }`}
                  >
                    Change plan
                  </OrangeButton>
                  {isSellgoSession() && sellerSubscription.status === 'pending' && (
                    <div className={styles.resumeSubscriptionWrapper}>
                      <OrangeButton
                        // asExternal
                        type="primary"
                        size="small"
                        onClick={() => removeSubscriptionCancel()}
                        className={styles.actionButton}
                      >
                        Remove cancellation
                      </OrangeButton>
                    </div>
                  )}
                  {!isSubscriptionExpiring && (
                    <OrangeButton
                      asExternal
                      type="secondary"
                      size="small"
                      onClick={() => history.push('/cancel')}
                      className={styles.actionButton}
                    >
                      {/* {!isCancelSubscriptionLoading ? (
                        'Cancel plan'
                      ) : (
                        <Loader inline active={true} size="tiny" />
                      )} */}
                      Cancel plan
                    </OrangeButton>
                  )}
                </div>
              </div>
            </div>
          </span>
          {/* Only show payments section if user has a credit card added. */}
          {hasPaymentMethod && (
            <span className={styles.paymentsSection}>
              <p className={`${styles.boxTitle} ${styles.boxTitle_payment}`}> Payment method</p>
              <div>
                <div className={styles.paymentsInformationRow}>
                  <img src={CreditCardIcon} className={styles.creditCardIcon} alt="credit-card" />
                  <p> {capitalizeFirstLetter(card.brand)} </p>
                  <p className={styles.cardNumber}> **** **** **** {card.last4}</p>
                  <OrangeButton
                    type="primary"
                    size="small"
                    onClick={handleModalOpen}
                    className={styles.actionButton}
                  >
                    Change payment
                  </OrangeButton>
                </div>
                <div className={styles.innerGrid}>
                  {hasActivePlan && (
                    <p className={styles.paymentDetailsLabel}> Next payment due:</p>
                  )}
                  {hasActivePlan && (
                    <p className={styles.paymentDetailsContent}>
                      {!isSubscriptionExpiring ? subscriptionDetails.next_due_date : '-'}
                    </p>
                  )}
                  {hasActivePlan && (
                    <p className={styles.paymentDetailsLabel}> Next payment amount:</p>
                  )}
                  {hasActivePlan && (
                    <p className={styles.paymentDetailsContent}>
                      {!isSubscriptionExpiring
                        ? formatCurrency(stringToNumber(subscriptionDetails.payment_amount))
                        : '-'}
                    </p>
                  )}
                </div>
              </div>
            </span>
          )}
        </div>
      </BoxContainer>
      <BoxFooter>
        <div>
          <img src={HelpingHandsIcon} alt="helping-hands-icon" />
          &nbsp;&nbsp; If you have any trouble with the payment setting, you can contact us at&nbsp;
          {isSellgoSession() ? (
            <a href="mailto: support@sellgo.com" className={styles.mailLink}>
              support@sellgo.com
            </a>
          ) : (
            <a href="mailto: support@aistock.co" className={styles.mailLink}>
              support@aistock.co
            </a>
          )}
          . We can help.
        </div>
      </BoxFooter>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        onOpen={handleModalOpen}
        className={styles.popupForm}
        closeIcon
      >
        <Elements stripe={stripePromise}>
          <UpdateCardForm
            handleCloseModal={handleModalClose}
            fetchCreditCardInfo={fetchCreditCardInfo}
          />
        </Elements>
      </Modal>

      {/* <Confirm
        content="Are you sure you want to cancel your subscription?"
        open={isCancellingSubscription}
        onCancel={() => {
          setCancellingSubscription(false);
        }}
        onConfirm={() => {
          cancelSubscription();
          setCancellingSubscription(false);
        }}
        loading={true}
      /> */}
    </section>
  );
};

export default QuotaAndPaymentsSection;
