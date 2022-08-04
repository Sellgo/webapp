import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../../../../components/ActionButton';
import RadioRow from '../../../../../components/RadioRow';

/* Interfaces */
import { CreateOrderPayload } from '../../../../../interfaces/PerfectStock/OrderPlanning';
import InputTabSelection from '../../../../../components/InputTabSelection';
import AlertModal from '../../../../../components/AlertModal';

/* Utils */
import { isSubscriptionIdFreeTrial } from '../../../../../utils/subscriptions';

import history from '../../../../../history';

interface Props {
  sellerId: number;
  onCloseModal: () => void;
  handleNext: () => void;
  createOrderPayload: CreateOrderPayload;
  setCreateOrderPayload: (payload: CreateOrderPayload) => void;
}

const OrderTypeSelection = (props: Props) => {
  const { sellerId, onCloseModal, handleNext, createOrderPayload, setCreateOrderPayload } = props;
  const [orderType, setOrderType] = React.useState<'single' | 'multiple'>('single');
  const [smartOrderInterval, setSmartOrderInterval] = React.useState<number | null>(null);
  const [isAlertModalOpened, setIsAlertModalOpened] = React.useState<boolean>(false);

  const smartOrderIntervalsOptions = [
    {
      value: null,
      label: 'Next Order',
    },
    {
      value: 183,
      label: '6 months',
    },
    {
      value: 365,
      label: '12 Months',
    },
    {
      value: 730,
      label: '24 Months',
    },
  ];
  const handleSubmit = () => {
    if (orderType === 'single') {
      setCreateOrderPayload({
        ...createOrderPayload,
        creation_type: 'single',
      });
    } else {
      setCreateOrderPayload({
        ...createOrderPayload,
        creation_type: 'multiple',
        auto_generate_orders_days: smartOrderInterval,
      });
    }
    handleNext();
  };

  return (
    <>
      <div className={styles.createOrderWrapper}>
        <div className={styles.createOrderBox}>
          <h2>What kind of Order would you like to create?</h2>
          <RadioRow handleChange={() => setOrderType('single')} checked={orderType === 'single'}>
            Single Order
          </RadioRow>
          <RadioRow
            handleChange={() => setOrderType('multiple')}
            checked={orderType === 'multiple'}
          >
            Streamline Smart Order &nbsp;
            <InputTabSelection
              selectedOption={
                smartOrderIntervalsOptions.find(option => option.value === smartOrderInterval)
                  ?.label || ''
              }
              options={smartOrderIntervalsOptions.map(interval => interval.label)}
              setSelectedOption={(option: string) => {
                const value =
                  smartOrderIntervalsOptions.find(interval => interval.label === option)?.value ||
                  null;
                if (
                  value &&
                  (value === 365 || value === 730) &&
                  isSubscriptionIdFreeTrial(sellerId)
                ) {
                  setIsAlertModalOpened(true);
                  return;
                }
                setSmartOrderInterval(value);
              }}
              isPurple
              className={styles.inputTabSelection}
            />
          </RadioRow>
        </div>
        <span className={styles.helperMessage}>
          *You can also generate smart order in the Order Planning.
        </span>
        <div className={styles.buttonsRow}>
          <ActionButton
            className={styles.cancelButton}
            onClick={onCloseModal}
            variant="reset"
            size="md"
          >
            Cancel
          </ActionButton>
          <ActionButton
            className={styles.createButton}
            onClick={handleSubmit}
            variant="secondary"
            type="purpleGradient"
            size="md"
          >
            Continue
          </ActionButton>
        </div>
        <AlertModal
          isOpen={isAlertModalOpened}
          title={'You discovered a Premium feature!'}
          text={'With AiStock paid plan, you can create as many orders as you want'}
          cancelText={'Dismiss'}
          saveText={'Learn More'}
          setIsOpen={(value: boolean) => setIsAlertModalOpened(value)}
          handleCancel={() => setIsAlertModalOpened(false)}
          handleSave={() => history.push({ pathname: '/settings/pricing' })}
        />
      </div>
    </>
  );
};

export default OrderTypeSelection;
