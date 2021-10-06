import React from 'react';
import { Modal, Radio } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Data */
import { subscriptionList, SummaryDetails } from '../../data';

/* Components */
import OrangeButton from '../../../../components/OrangeButton';

/* utils */
import { convertPlanNameToKey } from '../../../../utils/subscriptions';
import { connect } from 'react-redux';

import { setPromoCode, setPromoError } from '../../../../actions/Settings/Subscription';

interface Props {
  setPlanType: (planType: string) => any;
  setPaymentMode: (paymentMode: string) => any;
  planType: string;
  paymentMode: string;
  isChangingPlanModalOpen: any;
  setChangingPlanModalOpen: any;
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

  const [newPlanType, setNewPlanType] = React.useState<string>(planType);
  const [newPaymentMode, setNewPaymentMode] = React.useState<string>(paymentMode);

  /* Update default plan type and payment mode when changes occur */
  React.useEffect(() => {
    if (isChangingPlanModalOpen) {
      setNewPlanType(planType);
      setNewPaymentMode(paymentMode);
    }
  }, [isChangingPlanModalOpen, planType, paymentMode]);

  const handleChange = (e: any, data: any) => {
    const plan = data.value.split(',');
    const updatedPlanType = plan[0];
    const updatedPaymentMode = plan[1];

    setNewPlanType(convertPlanNameToKey(updatedPlanType));
    setNewPaymentMode(updatedPaymentMode);
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
        <div className={styles.changePlanModal}>
          <h2 className={styles.title}>Change Subscription Plan</h2>
          <div className={styles.plansBox}>
            {subscriptionList.map((plan: SummaryDetails) => {
              return (
                <>
                  {plan.dailyPrice !== -1 && (
                    <Radio
                      checked={
                        convertPlanNameToKey(plan.name) === newPlanType &&
                        newPaymentMode === 'daily'
                      }
                      label={`${plan.name} $${plan.dailyPrice} /day billed daily`}
                      name="plan"
                      value={`${plan.name},daily`}
                      className={
                        convertPlanNameToKey(plan.name) === newPlanType &&
                        newPaymentMode === 'daily'
                          ? `${styles.planOption} ${styles.planOption__selected}`
                          : styles.planOption
                      }
                      onChange={handleChange}
                    />
                  )}
                  {plan.monthlyPrice !== -1 && (
                    <Radio
                      checked={
                        convertPlanNameToKey(plan.name) === newPlanType &&
                        newPaymentMode === 'monthly'
                      }
                      className={
                        convertPlanNameToKey(plan.name) === newPlanType &&
                        newPaymentMode === 'monthly'
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
                        convertPlanNameToKey(plan.name) === newPlanType &&
                        newPaymentMode === 'yearly'
                      }
                      className={
                        convertPlanNameToKey(plan.name) === newPlanType &&
                        newPaymentMode === 'yearly'
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
            <button className={styles.cancelButton} onClick={() => setChangingPlanModalOpen(false)}>
              Cancel
            </button>
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
