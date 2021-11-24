import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../ActionButton';
import PricePlanToggleButton from '../../PricePlanToggleButton';
import { DAILY_SUBSCRIPTION_PLANS } from '../../../constants/Subscription';

interface Props {
  id: number;
  name: string;
  desc: string;
  monthlyPrice: number;
  annualPrice: number;
  isNew?: boolean;
  isSmall?: boolean;

  // plan details
  isMonthly: boolean;
  setIsMonthly: (isMonthly: boolean) => void;

  // used for pricing cards on comparision table
  withToggle?: boolean;
  className?: string;
  handleChange?: () => void;

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
    isNew,
    isSmall,
    withToggle,
    className,
    handleChange,
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
			${isNew && isSmall ? styles.pricingHeadWrapper__new : ''}
			${!isNew && isSmall ? styles.pricingHeadWrapper__notNew : ''}
			${isSmall && styles.pricingHeadWrapper__bordered}`}
    >
      <div
        className={`
				${styles.pricingCardHead}
			`}
      >
        <div className={styles.pricingCardHead__Left}>
          <h2>{name}</h2>
          {!withToggle && <p>{desc}</p>}
        </div>
      </div>
      <div className={styles.startingAt}>
        <p>
          Starts At {!isMonthly && <span className="strike-text">${Math.round(monthlyPrice)}</span>}
        </p>

        {isMonthly ? (
          <span className={styles.betaPriceContainer}>
            <h3 className={`${styles.actualPrice} ${withToggle && styles.toggledPrice}`}>
              ${Math.round(monthlyPrice)}/ Mo
            </h3>
          </span>
        ) : (
          <span className={styles.betaPriceContainer}>
            <h3 className={`${styles.actualPrice} ${withToggle && styles.toggledPrice}`}>
              ${Math.round(annualPrice / 12)}/ Mo
            </h3>
          </span>
        )}

        {!isMonthly ? (
          <p className={styles.billedAtPrice}>
            <span
              className={`${styles.originalPrice} ${withToggle ? styles.originalPrice__small : ''}`}
            >
              Originally <br />
              billed At <span className="strike-text">${monthlyPrice * 12}</span>
            </span>
            <span className={`${styles.newPrice} ${withToggle ? styles.newPrice__small : ''}`}>
              Now ${Math.round(annualPrice)}
              /yr
            </span>
            <span className={`${styles.savings} ${withToggle ? styles.savings__small : ''}`}>
              Save ${Math.round(monthlyPrice * 12 - annualPrice)}
            </span>
          </p>
        ) : (
          <p>Billed Monthly</p>
        )}
      </div>

      {withToggle && handleChange && (
        <div className={styles.toggleWrapper}>
          <PricePlanToggleButton isMonthly={isMonthly} handleChange={handleChange} />
        </div>
      )}
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
          at the end of the month
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
  isNew: false,
  isSmall: false,
  withToggle: false,
  className: '',
  handleChange: () => null,
};

export default GenericPriceCardHead;
