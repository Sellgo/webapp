import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../../../../components/ActionButton';
import RadioRow from '../../../../../components/RadioRow';

/* Interfaces */
import { CreateOrderPayload } from '../../../../../interfaces/PerfectStock/OrderPlanning';
import InputTabSelection from '../../../../../components/InputTabSelection';

interface Props {
  onCloseModal: () => void;
  handleNext: () => void;
  createOrderPayload: CreateOrderPayload;
  setCreateOrderPayload: (payload: CreateOrderPayload) => void;
}

const OrderTypeSelection = (props: Props) => {
  const { onCloseModal, handleNext, createOrderPayload, setCreateOrderPayload } = props;
  const [orderType, setOrderType] = React.useState<'single' | 'multiple'>('single');
  const [smartOrderInterval, setSmartOrderInterval] = React.useState<number | null>(null);

  const smartOrderIntervalsOptions = [
    {
      value: null,
      label: 'Next Order',
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
    <div className={styles.createOrderWrapper}>
      <div className={styles.createOrderBox}>
        <h2>What kind of Order would you like to create?</h2>
        <RadioRow handleChange={() => setOrderType('single')} checked={orderType === 'single'}>
          Single Order
        </RadioRow>
        <RadioRow handleChange={() => setOrderType('multiple')} checked={orderType === 'multiple'}>
          Streamline Smart Order &nbsp;
          <InputTabSelection
            selectedOption={
              smartOrderIntervalsOptions.find(option => option.value === smartOrderInterval)
                ?.label || ''
            }
            options={smartOrderIntervalsOptions.map(interval => interval.label)}
            setSelectedOption={(option: string) =>
              setSmartOrderInterval(
                smartOrderIntervalsOptions.find(interval => interval.label === option)?.value ||
                  null
              )
            }
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
    </div>
  );
};

export default OrderTypeSelection;
