import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../ActionButton';
import { DAILY_SUBSCRIPTION_PLANS } from '../../../constants/Subscription/Sellgo';

interface Props {
  id: number;
  name: string;
  desc: string;
  monthlyPrice: number;
  annualPrice: number;
  className?: string;

  // plan details
  isMonthly: boolean;

  // subscription actions
  changePlan: (subscriptionDetails: { name: string; id: number }) => void;

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
  } = props;

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
        <div className={styles.pricingCardHead__Left}>
          <h2>{name}</h2>
          <p>{desc}</p>
        </div>
      </div>
      <div className={styles.startingAt}>
        <p>
          Starts At {!isMonthly && <span className="strike-text">${Math.round(monthlyPrice)}</span>}
        </p>

        {isMonthly ? (
          <span className={styles.betaPriceContainer}>
            <h3 className={`${styles.actualPrice}`}>${Math.round(monthlyPrice)}/ Mo</h3>
          </span>
        ) : (
          <span className={styles.betaPriceContainer}>
            <h3 className={`${styles.actualPrice}`}>${Math.round(annualPrice / 12)}/ Mo</h3>
          </span>
        )}

        {!isMonthly ? (
          <p className={styles.billedAtPrice}>
            <span className={`${styles.originalPrice}`}>
              Originally <br />
              billed At <span className="strike-text">${monthlyPrice * 12}</span>
            </span>
            <span className={`${styles.newPrice}`}>
              Now ${Math.round(annualPrice)}
              /yr
            </span>
            <span className={`${styles.savings}`}>
              Save ${Math.round(monthlyPrice * 12 - annualPrice)}
            </span>
          </p>
        ) : (
          <p>Billed Monthly</p>
        )}
      </div>

      {isSubscribed && !isPending ? (
        <ActionButton
          variant="secondary"
          size="md"
          type="grey"
          className={styles.buyNowCTA}
          disabled
        >
          Current Plan
        </ActionButton>
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
      ) : (
        <ActionButton
          variant="secondary"
          size="md"
          type="purpleGradient"
          className={styles.buyNowCTA}
          onClick={() => changePlan({ name, id })}
        >
          Change Plan
        </ActionButton>
      )}
    </div>
  );
};

GenericPriceCardHead.defaultProps = {
  className: '',
};

export default GenericPriceCardHead;
