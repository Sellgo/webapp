import React from 'react';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Carousel from 'react-multi-carousel';

/* Styling */
import styles from './index.module.scss';

/* Components */
import OrangeButton from '../../components/OrangeButton';

/* utils */
import {
  getSubscriptionID,
  getSubscriptionNameKey,
  SUBSCRIPTION_PLANS,
  DAILY_SUBSCRIPTION_PLANS,
} from '../../constants/Subscription';

/* Actions */
import { setPromoCode, setPromoError } from '../../actions/Settings/Subscription';
import PricingPlansSummary from '../PricingCardsSummary';

/* Types */
import { SubscriptionPlan } from '../../interfaces/Subscription';

interface Props {
  setPlanType: (planType: string) => any;
  setPaymentMode: (paymentMode: string) => any;
  planType: string;
  paymentMode: string;
  isChangingPlanModalOpen: any;
  setChangingPlanModalOpen: any;

  /* Redux functions */
  setPromoCode: (promoCode: any) => void;
  setPromoError: (err: string) => void;
}

const ChangePlanModal = (props: Props) => {
  const {
    planType,
    paymentMode,
    isChangingPlanModalOpen,
    setChangingPlanModalOpen,
    setPlanType,
    setPaymentMode,
    setPromoCode,
    setPromoError,
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
    setPromoError('');
    setPromoCode({});
    setPlanType(newPlanType);
    setPaymentMode(newPaymentMode);
    setChangingPlanModalOpen(false);
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
                desktop: {
                  breakpoint: { max: 3000, min: 1420 },
                  items: 3,
                  paritialVisibilityGutter: 60,
                },
                tablet: {
                  breakpoint: { max: 1420, min: 950 },
                  items: 2,
                  paritialVisibilityGutter: 50,
                },
                mobile: {
                  breakpoint: { max: 950, min: 0 },
                  items: 1,
                  paritialVisibilityGutter: 30,
                },
              }}
              className={styles.plansBox}
            >
              {SUBSCRIPTION_PLANS.map((subscriptionPlan: SubscriptionPlan) => {
                const {
                  subscriptionId,
                  monthlyPrice,
                  annualPrice,
                  name,
                  isDailyPlan,
                } = subscriptionPlan;
                return (
                  <PricingPlansSummary
                    disableCancelOption
                    key={subscriptionId + 1}
                    subscriptionId={subscriptionId}
                    name={name}
                    isMonthly={isMonthly}
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
            <OrangeButton type="primary" size="small" onClick={handleSave}>
              Confirm
            </OrangeButton>
          </div>
        </div>
      }
    />
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  setPromoCode: (payload: any) => dispatch(setPromoCode(payload)),
  setPromoError: (err: string) => dispatch(setPromoError(err)),
});

export default connect(null, mapDispatchToProps)(ChangePlanModal);
