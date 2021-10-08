import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

/* Styling */
import styles from './index.module.scss';

/* Utils */
import { formatDecimal } from '../../../utils/format';

/* Data */
import { generateSubscriptionDetails, SummaryDetails } from '../data';

/* Types */
import { PromoCode } from '../../../interfaces/Subscription';

interface Props {
  planType: string;
  paymentMode: string;
  promoCode: PromoCode;
  showCoupon?: boolean;
  isCouponApplied?: boolean;
  redeemCoupon?: (couponValue: any, sellerID: any) => void;
}

const Summary = (props: Props) => {
  const { planType, paymentMode, promoCode } = props;

  const calculateDiscountedPrice = (price: number) => {
    if (promoCode && promoCode.percent_off) {
      return price * ((100 - promoCode.percent_off) / 100);
    } else if (promoCode && promoCode.amount_off) {
      return price - promoCode.amount_off;
    } else {
      return price;
    }
  };

  const displayPrice = (paymentMode: 'year' | 'month' | 'day') => {
    let discountedPrice;
    let originalPrice;
    if (paymentMode === 'year') {
      discountedPrice = calculateDiscountedPrice(summaryDetails.annualPrice);
      originalPrice = summaryDetails.annualPrice;
    } else if (paymentMode === 'month') {
      discountedPrice = calculateDiscountedPrice(summaryDetails.monthlyPrice);
      originalPrice = summaryDetails.monthlyPrice;
    } else if (paymentMode === 'day') {
      discountedPrice = calculateDiscountedPrice(summaryDetails.dailyPrice);
      originalPrice = summaryDetails.dailyPrice;
    }

    if (discountedPrice !== originalPrice) {
      /* Discounted */
      return (
        <div className={styles.priceInformation}>
          <p className={styles.bold}> Billed Today </p>
          <p className={`${styles.strikeThrough} ${styles.price}`}>${originalPrice}</p>
          <p className={styles.price}>${formatDecimal(discountedPrice)}</p>
          <p className={styles.priceDesc}>
            Then
            {/* If promo code duration only lasts for one payment, 
            don't show discounted price for recurring payments */}
            {promoCode.duration !== 'once' ? (
              <span>
                <span className={styles.strikeThrough}>&nbsp;${originalPrice}</span>
                <span className={styles.bold}> ${formatDecimal(discountedPrice)} </span>
              </span>
            ) : (
              <span className={styles.bold}> ${originalPrice} </span>
            )}
            {/* If promo code duration repeats for a certain number of months, reflect that in description */}
            {promoCode.duration === 'repeating'
              ? promoCode.message.split('off')[1] //e.g. 10% off for 12 months -> "for 12 months"
              : `next ${paymentMode} and every ${paymentMode} after that.`}
          </p>
        </div>
      );
    } else {
      return (
        <div className={styles.priceInformation}>
          <p className={styles.bold}> Billed Today</p>
          <p className={styles.price}> ${originalPrice}</p>
          <p className={styles.priceDesc}>
            Then
            <span className={styles.bold}>&nbsp;${originalPrice}&nbsp;</span>
            next {paymentMode} and every {paymentMode} after that.{' '}
          </p>
        </div>
      );
    }
  };

  const summaryDetails: SummaryDetails = generateSubscriptionDetails(planType.toLowerCase());

  return (
    <>
      <div className={styles.summaryContainer}>
        <h1>You'll be Up and Running in Minutes </h1>
        <p className={styles.planName}>{summaryDetails.name}</p>
        <ul className={styles.benefitsWrapper}>
          {summaryDetails.benefits.map((benefit: string, index: number) => {
            return <li key={index}>- {benefit}</li>;
          })}
        </ul>
        {paymentMode === 'yearly'
          ? displayPrice('year')
          : paymentMode === 'monthly'
          ? displayPrice('month')
          : displayPrice('day')}
        <p className={styles.subDescription}>{summaryDetails.subDescription}</p>
      </div>
    </>
  );
};

const mapStateToProps = (state: {}) => ({
  promoCode: get(state, 'subscription.promoCode'),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
