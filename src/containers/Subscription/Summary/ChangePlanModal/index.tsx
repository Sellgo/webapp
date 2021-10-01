import React from 'react';
import { Modal, Radio } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Data */
import { subscriptionList, SummaryDetails } from '../../data';

/* Components */
import OrangeButton from '../../../../components/OrangeButton';

interface Props {
  setPlanType: (planType: string) => any;
  setPaymentMode: (paymentMode: string) => any;
  planType: string;
  paymentMode: string;
  isChangingPlan: any;
  setChangingPlan: any;
}

const Summary = (props: Props) => {
  const {
    planType,
    paymentMode,
    isChangingPlan,
    setChangingPlan,
    setPlanType,
    setPaymentMode,
  } = props;

  const [newPlanType, setNewPlanType] = React.useState<string>('');
  const [newPaymentMode, setNewPaymentMode] = React.useState<string>('');

  React.useEffect(() => {
    setNewPlanType(planType);
    setNewPaymentMode(paymentMode);
  }, [planType, paymentMode]);

  const formatPlanName = (planType: string) => {
    const planTypeWithoutSpaces = planType.split(' ').join('');
    return planTypeWithoutSpaces.toLowerCase();
  };

  const handleChange = (e: any, data: any) => {
    const plan = data.value.split(',');
    const updatedPlanType = plan[0];
    const updatedPaymentMode = plan[1];

    setNewPlanType(formatPlanName(updatedPlanType));
    setNewPaymentMode(updatedPaymentMode);
  };

  const handleSave = () => {
    localStorage.setItem('planType', newPlanType);
    localStorage.setItem('paymentMode', newPaymentMode);
    setPlanType(newPlanType);
    setPaymentMode(newPaymentMode);
    setChangingPlan(false);
  };

  return (
    <Modal
      open={isChangingPlan}
      className={styles.changePlanModal}
      onClose={() => setChangingPlan(false)}
      content={
        <div className={styles.changePlanModal}>
          <h2 className={styles.title}>Change Subscription Plan</h2>
          <div className={styles.plansBox}>
            {subscriptionList.map((plan: SummaryDetails) => {
              return (
                <>
                  {plan.dailyPrice !== -1 && (
                    <Radio
                      checked={
                        formatPlanName(plan.name) === newPlanType && newPaymentMode === 'daily'
                      }
                      label={`${plan.name} $${plan.dailyPrice} /day billed daily`}
                      name="plan"
                      value={`${plan.name},daily`}
                      className={
                        formatPlanName(plan.name) === newPlanType && newPaymentMode === 'daily'
                          ? `${styles.planOption} ${styles.planOption__selected}`
                          : styles.planOption
                      }
                      onChange={handleChange}
                    />
                  )}
                  {plan.monthlyPrice !== -1 && (
                    <Radio
                      checked={
                        formatPlanName(plan.name) === newPlanType && newPaymentMode === 'monthly'
                      }
                      className={
                        formatPlanName(plan.name) === newPlanType && newPaymentMode === 'monthly'
                          ? `${styles.planOption} ${styles.planOption__selected}`
                          : styles.planOption
                      }
                      label={`${plan.name} $${plan.monthlyPrice} /mo billed monthly`}
                      name="plan"
                      value={`${plan.name},monthly`}
                      onChange={handleChange}
                    />
                  )}
                  {plan.annualPrice !== -1 && (
                    <Radio
                      checked={
                        formatPlanName(plan.name) === newPlanType && newPaymentMode === 'yearly'
                      }
                      className={
                        formatPlanName(plan.name) === newPlanType && newPaymentMode === 'yearly'
                          ? `${styles.planOption} ${styles.planOption__selected}`
                          : styles.planOption
                      }
                      label={`${plan.name} billed yearly at $${plan.annualPrice}`}
                      name="plan"
                      value={`${plan.name},yearly`}
                      onChange={handleChange}
                    />
                  )}
                </>
              );
            })}
          </div>
          <div className={styles.buttonsRow}>
            <OrangeButton type="primary" size="small" onClick={handleSave}>
              Change Plan
            </OrangeButton>
            <button className={styles.cancelButton} onClick={() => setChangingPlan(false)}>
              Cancel
            </button>
          </div>
        </div>
      }
    />
  );
};

export default Summary;
