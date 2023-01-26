import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../ActionButton';
import {
  DAILY_SUBSCRIPTION_PLANS,
  MONTHLY_AND_ANNUAL_PLANS_IDS,
} from '../../../constants/Subscription/Sellgo';
import { formatNumber } from '../../../utils/format';

interface Props {
  id: number;
  name: string;
  desc: string;
  monthlyPrice: number;
  annualPrice: number;
  className?: string;
  isNew?: boolean;

  // plan details
  isMonthly: boolean;

  // subscription actions
  changePlan: (
    subscriptionDetails: { name: string; id: number },
    isUpgradingToYearly?: boolean
  ) => void;

  // seller details
  sellerSubscription: any;
}

const GenericPriceCardHead: React.FC<Props> = props => {
  const {
    id,
    name,
    isMonthly,
    monthlyPrice,
    annualPrice,
    desc,
    className,
    changePlan,
    sellerSubscription,
    isNew,
  } = props;
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
        {isSubscribed && <p className={styles.currentPlan}>Current Plan</p>}
        <div className={styles.pricingCardHead__Left}>
          <h2>{name}</h2>
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
            <h3 className={`${styles.actualPrice}`}>${formatNumber(monthlyPrice)}/ Mo</h3>
          </span>
        ) : (
          <span className={styles.betaPriceContainer}>
            <h3 className={`${styles.actualPrice}`}>${formatNumber(annualPrice / 12)}/ Mo</h3>
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
      </div>
      {isSubscribed && !isPending ? (
        sellerSubscription.payment_mode === 'monthly' ? (
          <ActionButton
            variant="primary"
            size="md"
            type="purpleGradient"
            className={styles.buyNowCTA}
            onClick={() => changePlan({ name, id }, true)}
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
        <ActionButton
          variant="secondary"
          size="md"
          type="grey"
          className={styles.buyNowCTA}
          disabled
        >
          Subscription expiring <br />
          at the end of the {sellerSubscription.payment_mode === 'monthly' ? ' month' : ' year'}
        </ActionButton>
      ) : isAccountSubscribed ? (
        <ActionButton
          variant={'secondary'}
          size="md"
          type="purpleGradient"
          className={styles.buyNowCTA}
          onClick={() => changePlan({ name, id })}
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

export default GenericPriceCardHead;
