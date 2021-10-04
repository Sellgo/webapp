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

/* Components */
import OrangeButton from '../../../components/OrangeButton';
import ChangePlanModal from './ChangePlanModal';

interface Props {
  hideChangePlan?: boolean;
  setPlanType: (planType: string) => any;
  setPaymentMode: (paymentMode: string) => any;
  planType: string;
  paymentMode: string;
  promoCode: PromoCode;
  showCoupon?: boolean;
  isCouponApplied?: boolean;
  redeemCoupon?: (couponValue: any, sellerID: any) => void;
}

const Summary = (props: Props) => {
  const { planType, paymentMode, promoCode, setPlanType, setPaymentMode, hideChangePlan } = props;
  const [isChangingPlanModalOpen, setChangingPlanModalOpen] = React.useState<boolean>(false);
  const displayAnnualPrice = () => {
    if (promoCode && promoCode.percent_off) {
      return (
        <span>
          &nbsp;
          <span className={styles.strikeThrough}>
            {' '}
            ${summaryDetails.annualPrice} billed yearly{' '}
          </span>
          <span>
            {' '}
            &nbsp;$
            {formatDecimal(summaryDetails.annualPrice * ((100 - promoCode.percent_off) / 100))}{' '}
            billed yearly {promoCode.duration}
          </span>
        </span>
      );
    } else if (promoCode && promoCode.amount_off) {
      return (
        <span>
          &nbsp;
          <span className={styles.strikeThrough}>
            {' '}
            ${summaryDetails.annualPrice} billed yearly{' '}
          </span>
          <span>
            {' '}
            &nbsp;${formatDecimal(summaryDetails.annualPrice - promoCode.amount_off)} billed yearly{' '}
            {promoCode.duration}
          </span>
        </span>
      );
    } else {
      return <span> &nbsp;${summaryDetails.annualPrice} billed yearly </span>;
    }
  };

  const displayMonthlyPrice = () => {
    if (promoCode && promoCode.percent_off) {
      return (
        <span>
          &nbsp;
          <span className={styles.strikeThrough}>
            {' '}
            ${summaryDetails.monthlyPrice} /mo billed monthly{' '}
          </span>
          <span>
            {' '}
            &nbsp;$
            {formatDecimal(summaryDetails.monthlyPrice * ((100 - promoCode.percent_off) / 100))} /mo
            billed monthly {promoCode.duration}
          </span>
        </span>
      );
    } else if (promoCode && promoCode.amount_off) {
      return (
        <span>
          &nbsp;
          <span className={styles.strikeThrough}>
            {' '}
            ${summaryDetails.monthlyPrice} /mo billed monthly{' '}
          </span>
          <span>
            {' '}
            &nbsp;${formatDecimal(summaryDetails.monthlyPrice - promoCode.amount_off)} /mo billed
            monthly {promoCode.duration}
          </span>
        </span>
      );
    } else {
      return <span> &nbsp;${summaryDetails.monthlyPrice} /mo billed monthly </span>;
    }
  };

  const displayDailyPrice = () => {
    if (promoCode && promoCode.percent_off) {
      return (
        <span>
          &nbsp;
          <span className={styles.strikeThrough}>
            {' '}
            ${summaryDetails.dailyPrice} /day billed daily{' '}
          </span>
          <span>
            {' '}
            &nbsp;$
            {formatDecimal(summaryDetails.dailyPrice * ((100 - promoCode.percent_off) / 100))} /day
            billed daily {promoCode.duration}
          </span>
        </span>
      );
    } else if (promoCode && promoCode.amount_off) {
      return (
        <span>
          &nbsp;
          <span className={styles.strikeThrough}>
            {' '}
            ${summaryDetails.dailyPrice} /day billed daily{' '}
          </span>
          <span>
            {' '}
            &nbsp;${formatDecimal(summaryDetails.dailyPrice - promoCode.amount_off)} /day billed
            daily {promoCode.duration}
          </span>
        </span>
      );
    } else {
      return <span> &nbsp;${summaryDetails.dailyPrice} /day billed daily </span>;
    }
  };

  const summaryDetails: SummaryDetails = generateSubscriptionDetails(planType.toLowerCase());

  return (
    <>
      <div className={styles.summaryContainer}>
        <div className={styles.headerRow}>
          <h1>Subscription Summary </h1>
          {!hideChangePlan && (
            <OrangeButton
              type="secondary"
              size="small"
              onClick={() => setChangingPlanModalOpen(!isChangingPlanModalOpen)}
            >
              Change Plan
            </OrangeButton>
          )}
        </div>
        <div className={styles.planDetails}>
          <p className={styles.planDetails__planName}>{summaryDetails.name}</p>

          {paymentMode === 'yearly'
            ? displayAnnualPrice()
            : paymentMode === 'monthly'
            ? displayMonthlyPrice()
            : displayDailyPrice()}
        </div>
        <p className={styles.subDescription}>{summaryDetails.subDescription}</p>

        <ul className={styles.benefitsWrapper}>
          {summaryDetails.benefits.map((benefit: string, index: number) => {
            return <li key={index}>- {benefit}</li>;
          })}
        </ul>
        <ChangePlanModal
          setPlanType={setPlanType}
          setPaymentMode={setPaymentMode}
          planType={planType}
          paymentMode={paymentMode}
          isChangingPlanModalOpen={isChangingPlanModalOpen}
          setChangingPlanModalOpen={setChangingPlanModalOpen}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state: {}) => ({
  promoCode: get(state, 'subscription.promoCode'),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
