import React from 'react';

/* Styling */
import styles from './index.module.scss';
import RainbowText from '../../RainbowText';

/* Components */
import PricePlanToggleButton from '../../PricePlanToggleButton';

/* Utils */
import { prettyPrintNumber } from '../../../utils/format';
import ActionButton from '../../ActionButton';

interface Props {
  name: string;
  desc: string;
  monthlyPrice: number;
  launchDiscount: number;
  launchSaving: number;
  launchSavingPercentage: number;
  annualPrice: number;
  isNew?: boolean;
  isSmall?: boolean;

  // plan details
  planId: number;
  isMonthly: boolean;
  setIsMonthly: (isMonthly: boolean) => void;
  isPaidSellerSubscription: boolean;

  // used for pricing cards on comparision table
  requestChangeSubscription: (name: string, id: number, mode: string) => void;
  withToggle?: boolean;
  className?: string;
  isPurple?: boolean;
  handleChange?: () => void;
  ctaText?: string;
}

const GenericPriceCardHead: React.FC<Props> = props => {
  const {
    name,
    isMonthly,
    monthlyPrice,
    annualPrice,
    desc,
    isNew,
    isSmall,
    withToggle,
    ctaText,
    planId,
    requestChangeSubscription,
    className,
    handleChange,
    isPaidSellerSubscription,
  } = props;

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
          <h2>
            <RainbowText type="orange_purple_gradient">{name}</RainbowText>
          </h2>
          {!withToggle && <p>{desc}</p>}
        </div>
      </div>
      <div className={styles.startingAt}>
        <p>Starting at</p>

        {isMonthly ? (
          <span className={styles.betaPriceContainer}>
            <h3 className={`${styles.actualPrice} ${withToggle && styles.toggledPrice}`}>
              ${Math.round(monthlyPrice)} /month
            </h3>
          </span>
        ) : (
          <span className={styles.betaPriceContainer}>
            <h3 className={`${styles.actualPrice} ${withToggle && styles.toggledPrice}`}>
              ${Math.round(annualPrice)} /year
            </h3>
          </span>
        )}

        {!isMonthly ? (
          <p className={styles.billedAtPrice}>
            <span
              className={`${styles.originalPrice} ${withToggle ? styles.originalPrice__small : ''}`}
            >
              Originally{' '}
              <span className="strike-text">
                ${prettyPrintNumber(monthlyPrice * 12)}
                /yr
              </span>
            </span>
            <span className={`${styles.newPrice} ${withToggle ? styles.newPrice__small : ''}`}>
              Now ${prettyPrintNumber(Math.round(annualPrice))}
              /yr
            </span>
            <span className={`${styles.savings} ${withToggle ? styles.savings__small : ''}`}>
              Save ${prettyPrintNumber(Math.round(monthlyPrice * 12 - annualPrice))}
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
      {ctaText ? <p className={styles.ctaText}> {ctaText} </p> : ''}

      {!isMonthly ? (
        <ActionButton
          onClick={() => requestChangeSubscription(name, planId, isMonthly ? 'monthly' : 'yearly')}
          className={`
              ${styles.buyNowCTA}
              ${isPaidSellerSubscription ? styles.buyNowCTA__disabled : ''}
            `}
          variant={'secondary'}
          type="purpleGradient"
          size={'md'}
        >
          {isPaidSellerSubscription ? 'This is your current plan' : 'Switch to this annual billing'}
        </ActionButton>
      ) : (
        <ActionButton
          onClick={() => requestChangeSubscription(name, planId, isMonthly ? 'monthly' : 'yearly')}
          className={`
            ${styles.buyNowCTA}
            ${isPaidSellerSubscription ? styles.buyNowCTA__disabled : ''}
          `}
          variant={'primary'}
          type="purpleGradient"
          size={'md'}
        >
          {isPaidSellerSubscription ? 'This is your current plan' : 'Switch to this monthly plan'}
        </ActionButton>
      )}
    </div>
  );
};

GenericPriceCardHead.defaultProps = {
  isNew: false,
  isSmall: false,
  withToggle: false,
  isPurple: false,
  className: '',
  handleChange: () => null,
  ctaText: '',
};

export default GenericPriceCardHead;
