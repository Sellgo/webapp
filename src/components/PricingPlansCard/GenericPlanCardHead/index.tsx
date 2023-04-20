import React, { useState } from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../ActionButton';
import {
  DAILY_SUBSCRIPTION_PLANS,
  MONTHLY_AND_ANNUAL_PLANS_IDS,
} from '../../../constants/Subscription/Sellgo';
import { formatNumber, prettyPrintDate } from '../../../utils/format';
import { sellerIDSelector } from '../../../selectors/Seller';
import { AppConfig } from '../../../config';
import axios from 'axios';
import { error } from '../../../utils/notifications';
import { fetchSellerSubscription } from '../../../actions/Settings/Subscription';
import { connect } from 'react-redux';

interface Props {
  id: number;
  name: string;
  displayName?: string;
  desc: string;
  monthlyPrice: number;
  annualPrice: number;
  className?: string;
  isNew?: boolean;
  monthlyLookups?: number;
  annualLookups?: number;

  // plan details
  isMonthly: boolean;

  // subscription actions
  changePlan: (
    subscriptionDetails: { name: string; id: number },
    isUpgradingToYearly?: boolean
  ) => void;

  // seller details
  sellerSubscription: any;
  isFreeTrial?: boolean;
  fetchSellerSubscription: () => void;
}

const GenericPriceCardHead: React.FC<Props> = props => {
  const {
    id,
    name,
    displayName,
    isMonthly,
    monthlyPrice,
    annualPrice,
    desc,
    className,
    changePlan,
    sellerSubscription,
    isNew,
    monthlyLookups,
    annualLookups,
    isFreeTrial = false,
    fetchSellerSubscription,
  } = props;
  const [resumeSubscription, setResumeSubscription] = useState<boolean>(false);
  const isAccountSubscribed = MONTHLY_AND_ANNUAL_PLANS_IDS.includes(
    sellerSubscription.subscription_id
  );
  let isSubscribed;
  if (DAILY_SUBSCRIPTION_PLANS.includes(id)) {
    isSubscribed = sellerSubscription && sellerSubscription.subscription_id === id;
  } else {
    isSubscribed =
      sellerSubscription &&
      sellerSubscription.subscription_id === id &&
      (isMonthly
        ? sellerSubscription.payment_mode === 'monthly'
        : sellerSubscription.payment_mode === 'yearly');
  }

  const isPending =
    sellerSubscription &&
    sellerSubscription.subscription_id === id &&
    sellerSubscription &&
    sellerSubscription.status === 'pending';

  const removeSubscriptionCancel = async () => {
    setResumeSubscription(true);
    try {
      const sellerId = sellerIDSelector();
      const url = `${AppConfig.BASE_URL_API}sellers/${sellerId}/subscription/redo-cancel
      `;
      const res = await axios.post(url);
      const { status } = res;
      if (status === 200) {
        fetchSellerSubscription();
      }
    } catch (err) {
      console.error(err);
      error('Cannot resume subscription at the moment');
    }
    setResumeSubscription(false);
  };

  return (
    <div
      className={`
			${className} 
			${styles.pricingHeadWrapper} 
      `}
    >
      <div
        className={`
				${styles.pricingCardHead}
			`}
      >
        {isSubscribed && <p className={styles.currentPlan}>This is your current plan</p>}
        <div className={styles.pricingCardHead__Left}>
          <h2>{displayName ?? name}</h2>
          <p>{desc}</p>
        </div>
      </div>
      <div className={styles.startingAt}>
        <p>
          Starts At{' '}
          {!isMonthly && <span className="strike-text">${formatNumber(monthlyPrice)}</span>}
        </p>

        {isMonthly ? (
          <span className={styles.betaPriceContainer}>
            <h3 className={`${styles.actualPrice}`}>${formatNumber(monthlyPrice)}/ mo</h3>
          </span>
        ) : (
          <span className={styles.betaPriceContainer}>
            <h3 className={`${styles.actualPrice}`}>${formatNumber(annualPrice / 12)}/ mo</h3>
          </span>
        )}

        {!isMonthly ? (
          <p className={styles.billedAtPrice}>
            <span className={`${styles.originalPrice}`}>
              Originally <span className="strike-text">${formatNumber(monthlyPrice * 12)}</span>
            </span>
            <span className={`${styles.newPrice}`}>
              Now ${formatNumber(annualPrice)}
              /yr
            </span>
            <span className={`${styles.savings}`}>
              Save ${formatNumber(monthlyPrice * 12 - annualPrice)}
            </span>
          </p>
        ) : (
          <p>Billed Monthly</p>
        )}
        <p className={styles.lookups}>
          {isMonthly
            ? `${formatNumber(monthlyLookups)} lookups`
            : `${formatNumber(annualLookups)} lookups`}
        </p>
      </div>
      {isSubscribed && !isPending ? (
        sellerSubscription.payment_mode === 'monthly' ? (
          <ActionButton
            variant="primary"
            size="md"
            type="purpleGradient"
            className={styles.buyNowCTA}
            onClick={() => changePlan({ name, id }, true)}
            disabled={isFreeTrial || sellerSubscription.status === 'pending'}
          >
            Switch to annual billing
          </ActionButton>
        ) : (
          <ActionButton
            variant="secondary"
            size="md"
            type="grey"
            className={styles.buyNowCTA}
            disabled
          >
            Current Plan
          </ActionButton>
        )
      ) : isSubscribed && isPending ? (
        <>
          <p className={styles.cancelWarningText}>
            Subscription expiring by{' '}
            {prettyPrintDate(new Date(sellerSubscription.next_billing_cycle_date ?? ''))}
          </p>
          <ActionButton
            variant="primary"
            size="md"
            type="purpleGradient"
            className={`${styles.buyNowCTA} ${styles.removeCancelCTA}`}
            onClick={async () => await removeSubscriptionCancel()}
            loading={resumeSubscription}
          >
            Remove cancellation
          </ActionButton>
        </>
      ) : isAccountSubscribed ? (
        <ActionButton
          variant={'secondary'}
          size="md"
          type="purpleGradient"
          className={styles.buyNowCTA}
          onClick={() => changePlan({ name, id })}
          disabled={isFreeTrial || sellerSubscription.status === 'pending'}
        >
          {isMonthly ? 'Switch to monthly billing' : 'Switch to annual billing'}
        </ActionButton>
      ) : (
        <ActionButton
          variant={isNew ? 'primary' : 'secondary'}
          size="md"
          type="purpleGradient"
          className={styles.buyNowCTA}
          onClick={() => changePlan({ name, id })}
          disabled={isFreeTrial || sellerSubscription.status === 'pending'}
        >
          Activate plan
        </ActionButton>
      )}
    </div>
  );
};

GenericPriceCardHead.defaultProps = {
  className: '',
};

const mapDispatchToProps = {
  fetchSellerSubscription: () => fetchSellerSubscription(),
};

export default connect(null, mapDispatchToProps)(GenericPriceCardHead);
