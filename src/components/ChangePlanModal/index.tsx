import React from 'react';
import { Modal } from 'semantic-ui-react';
import { get } from 'lodash';
import { connect } from 'react-redux';
import Carousel from 'react-multi-carousel';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../components/ActionButton';

/* utils */
import {
  getSubscriptionID,
  getSubscriptionNameKey,
  SUBSCRIPTION_PLANS,
  DAILY_SUBSCRIPTION_PLANS,
} from '../../constants/Subscription';

/* Actions */
import { checkPromoCode } from '../../actions/Settings/Subscription';
import PricingPlansSummary from '../PricingCardsSummary';

/* Types */
import { PromoCode, SubscriptionPlan } from '../../interfaces/Subscription';

interface Props {
  setPlanType: (planType: string) => any;
  setPaymentMode: (paymentMode: string) => any;
  planType: string;
  paymentMode: string;
  isChangingPlanModalOpen: any;
  setChangingPlanModalOpen: any;

  /* Redux functions */
  promoCode: PromoCode;
  checkPromoCode: (promoCode: string, subscriptionId: number, paymentMode: string) => any;
}

const ChangePlanModal = (props: Props) => {
  const {
    planType,
    paymentMode,
    isChangingPlanModalOpen,
    setChangingPlanModalOpen,
    setPlanType,
    setPaymentMode,
    promoCode,
    checkPromoCode,
  } = props;

  /* newPlanType/newPaymentMode/newSubscriptionId are the states storing the updated plan information */
  const [newPlanType, setNewPlanType] = React.useState<string>(planType);
  const [newPaymentMode, setNewPaymentMode] = React.useState<string>(paymentMode);
  const [newSubscriptionId, setNewSubscriptionId] = React.useState<number>(
    getSubscriptionID(planType)
  );
  const [isMonthly, setIsMonthly] = React.useState<boolean>(newPaymentMode === 'monthly');

  /* Update default plan type and payment mode when changes occur */
  React.useEffect(() => {
    if (isChangingPlanModalOpen) {
      setNewPlanType(planType);
      setNewPaymentMode(paymentMode);
      setIsMonthly(paymentMode === 'monthly');
      setNewSubscriptionId(getSubscriptionID(planType));
    }
  }, [isChangingPlanModalOpen, planType, paymentMode]);

  const handleChange = (data: any) => {
    setNewSubscriptionId(data.id);

    if (DAILY_SUBSCRIPTION_PLANS.includes(data.id)) {
      setNewPaymentMode('daily');
    } else if (isMonthly) {
      setNewPaymentMode('monthly');
    } else {
      setNewPaymentMode('yearly');
    }
    setNewPlanType(getSubscriptionNameKey(data.id));
  };

  const handleSave = () => {
    localStorage.setItem('planType', newPlanType);
    localStorage.setItem('paymentMode', newPaymentMode);
    setPlanType(newPlanType);
    setPaymentMode(newPaymentMode);
    setChangingPlanModalOpen(false);

    if (promoCode && promoCode.code) {
      checkPromoCode(promoCode.code, newSubscriptionId, newPaymentMode);
    }
  };

  return (
    <Modal
      open={isChangingPlanModalOpen}
      className={styles.changePlanModal}
      onClose={() => setChangingPlanModalOpen(false)}
      content={
        <div>
          <h2 className={styles.title}>Change Subscription Plan</h2>
          <div>
            <Carousel
              ssr
              partialVisible
              containerClass={styles.plansBox}
              deviceType={'desktop'}
              responsive={{
                monitor: {
                  breakpoint: { max: 3000, min: 2000 },
                  items: 4,
                  paritialVisibilityGutter: 60,
                },
                desktop: {
                  breakpoint: { max: 2000, min: 1500 },
                  items: 3,
                  paritialVisibilityGutter: 60,
                },
                tablet: {
                  breakpoint: { max: 1500, min: 1000 },
                  items: 2,
                  paritialVisibilityGutter: 50,
                },
                mobile: {
                  breakpoint: { max: 1000, min: 0 },
                  items: 1,
                  paritialVisibilityGutter: 30,
                },
              }}
              className={styles.plansBox}
            >
              {SUBSCRIPTION_PLANS.map((subscriptionPlan: SubscriptionPlan) => {
                const {
                  subscriptionId,
                  isLegacy,
                  dailyPrice,
                  monthlyPrice,
                  annualPrice,
                  name,
                  isDailyPlan,
                } = subscriptionPlan;

                if (subscriptionPlan.isLegacy) {
                  return null;
                }

                return (
                  <PricingPlansSummary
                    disableCancelOption
                    key={subscriptionId + 1}
                    subscriptionId={subscriptionId}
                    isLegacy={isLegacy}
                    name={name}
                    isMonthly={isMonthly}
                    dailyPrice={dailyPrice}
                    monthlyPrice={monthlyPrice}
                    annualPrice={annualPrice}
                    isDailyPlan={isDailyPlan}
                    handleChange={() => setIsMonthly(!isMonthly)}
                    // seller subscriptions
                    subscribedSubscription={{
                      id: newSubscriptionId,
                    }}
                    subscriptionType={'paid'}
                    sellerSubscription={{ payment_mode: newPaymentMode }}
                    // subscription details
                    // action on subscriptions
                    promptCancelSubscription={(subscriptionDetails: any) =>
                      handleChange(subscriptionDetails)
                    }
                    changePlan={(subscriptionDetails: any) => handleChange(subscriptionDetails)}
                  />
                );
              })}
            </Carousel>
          </div>
          <div className={styles.buttonsRow}>
            <button className={styles.cancelButton} onClick={() => setChangingPlanModalOpen(false)}>
              Cancel
            </button>
            <ActionButton type="purpleGradient" variant="primary" size="md" onClick={handleSave}>
              Confirm
            </ActionButton>
          </div>
        </div>
      }
    />
  );
};

const mapStateToProps = (state: {}) => ({
  promoCode: get(state, 'subscription.promoCode'),
});

const mapDispatchToProps = (dispatch: any) => ({
  checkPromoCode: (promoCode: string, subscriptionId: number, paymentMode: string) =>
    dispatch(checkPromoCode(promoCode, subscriptionId, paymentMode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePlanModal);
