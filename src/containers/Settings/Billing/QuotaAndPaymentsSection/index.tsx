import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Loader, Modal, Dimmer } from 'semantic-ui-react';

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
import ProfileBoxHeader from '../../../../components/ProfileBoxHeader';
import ProfileBoxFooter from '../../../../components/ProfileBoxFooter';
import CreditCardIcon from '../../../../assets/images/credit-card-solid.svg';
import HelpingHandsIcon from '../../../../assets/images/hands-helping-solid.svg';

/* Interfaces */
import {
  QuotaCollection,
  StripeSubscriptionInfo,
  CreditCard,
  SubscriptionPlanType,
} from '../../../../interfaces/Settings/billing';

/* Utils */
import { capitalizeFirstLetter } from '../../../../utils/format';

const stripePromise = loadStripe(AppConfig.STRIPE_API_KEY);
interface Props {
  subscriptionPlan: SubscriptionPlanType;
  subscriptionDetails: StripeSubscriptionInfo;
  quotas: QuotaCollection;
  card: CreditCard;
  isQuotaLoading: boolean;
  isSubscriptionStripeLoading: boolean;
  isCreditCardLoading: boolean;
  fetchCreditCardInfo: () => void;
}

const QuotaAndPaymentsSection = (props: Props) => {
  const {
    subscriptionPlan,
    subscriptionDetails,
    quotas,
    card,
    isQuotaLoading,
    isSubscriptionStripeLoading,
    isCreditCardLoading,
    fetchCreditCardInfo,
  } = props;
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const getTotalUsedQuota = () => {
    let totalUsed = 0;
    let totalAvailable = 0;
    totalUsed += quotas.product_tracker.used | 0;
    totalUsed += quotas.sales_estimation.used | 0;
    totalUsed += quotas.seller_research.used | 0;
    totalUsed += quotas.profit_finder.used | 0;
    totalAvailable += quotas.product_tracker.available | 0;
    totalAvailable += quotas.sales_estimation.available | 0;
    totalAvailable += quotas.seller_research.available | 0;
    totalAvailable += quotas.profit_finder.available | 0;

    // Ensure we dont divide by 0.
    totalAvailable = Math.max(totalAvailable, 1);

    const percentage = Number((totalUsed / totalAvailable) * 100.0).toFixed(2);
    return `${percentage}%`;
  };

  return (
    <section className={styles.quotaAndPaymentsWrapper}>
      <ProfileBoxHeader>Billing</ProfileBoxHeader>
      <div className={styles.billingGrid}>
        <p className={`${styles.boxTitle}`}> Your Plan</p>
        <div>
          <div className={styles.planDetailsRow}>
            <PlanTypeRectangle plan={subscriptionPlan} />
            <span>&nbsp; - You have used {getTotalUsedQuota()} of the available quota.</span>
          </div>
          <div className={styles.quotaBarsWrapper}>
            <NewQuotaMeter
              className={styles.quotaBar}
              type="Profit Finder"
              quota={{ used: quotas.profit_finder.used, available: quotas.profit_finder.available }}
            />
            <NewQuotaMeter
              type="Product Tracker"
              quota={{
                used: quotas.product_tracker.used,
                available: quotas.product_tracker.available,
              }}
            />
            <NewQuotaMeter
              className={styles.quotaBar}
              type="Seller Research"
              quota={{
                used: quotas.seller_research.used,
                available: quotas.seller_research.available,
              }}
            />
            <NewQuotaMeter
              type="Sales Estimation"
              quota={{
                used: quotas.sales_estimation.used,
                available: quotas.sales_estimation.available,
              }}
            />
          </div>

          <div className={styles.innerGrid}>
            <p className={styles.actionLabel}> Action </p>
            <OrangeButton
              asExternal
              type="white"
              size="small"
              navigateTo="/settings/pricing"
              className={styles.actionButton}
            >
              Change Plan
            </OrangeButton>
          </div>
        </div>

        <p className={`${styles.boxTitle} ${styles.boxTitle_payment}`}> Payment Method</p>
        <div>
          <div className={styles.paymentsInformationRow}>
            <img src={CreditCardIcon} className={styles.creditCardIcon} alt="credit-card" />
            <p> {capitalizeFirstLetter(card.brand)} </p>
            <p className={styles.cardNumber}> **** **** **** {card.last4}</p>
          </div>
          <div className={styles.innerGrid}>
            <p className={styles.paymentDetailsLabel}> Next Payment Due</p>
            <p className={styles.paymentDetailsContent}> {subscriptionDetails.next_due_date} </p>
            <p className={styles.paymentDetailsLabel}> Amount </p>
            <p className={styles.paymentDetailsContent}> {subscriptionDetails.payment_amount} </p>
            <p className={styles.actionLabel}> Action </p>
            <OrangeButton
              type="white"
              size="small"
              onClick={handleModalOpen}
              className={styles.actionButton}
            >
              Change Payment
            </OrangeButton>
          </div>
        </div>
        {/* To show dimmer when page is still loading */}
        {(isQuotaLoading || isSubscriptionStripeLoading || isCreditCardLoading) && (
          <Dimmer blurring inverted active>
            <Loader className={styles.loader} />
          </Dimmer>
        )}
      </div>
      <ProfileBoxFooter>
        <div>
          <img src={HelpingHandsIcon} alt="helping-hands-icon" />
          &nbsp;&nbsp; If you have any trouble with the payment setting, you can contact us at&nbsp;
          <a href="mailto: support@sellgo.com" className={styles.mailLink}>
            support@sellgo.com
          </a>
          . We Can Help.
        </div>
      </ProfileBoxFooter>
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
    </section>
  );
};

export default QuotaAndPaymentsSection;
