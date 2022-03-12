import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../../../../components/ActionButton';
import InputFilter from '../../../../../components/FormFilters/InputFilter';

/* Interfaces */
import { CreateOrderPayload } from '../../../../../interfaces/PerfectStock/OrderPlanning';

/* Utils */
import { error } from '../../../../../utils/notifications';

interface Props {
  handlePrev: () => void;
  handleNext: () => void;
  createOrderPayload: CreateOrderPayload;
  setCreateOrderPayload: (payload: CreateOrderPayload) => void;
}

const OrderIntervalSelection = (props: Props) => {
  const { handleNext, handlePrev, createOrderPayload, setCreateOrderPayload } = props;
  const [orderInterval, setOrderInterval] = React.useState<number | null>(
    createOrderPayload.interval || null
  );

  const handleSubmit = () => {
    if (!orderInterval) {
      error('Please fill in all fields');
    } else {
      setCreateOrderPayload({
        ...createOrderPayload,
        interval: orderInterval,
      });
      handleNext();
    }
  };

  return (
    <div className={styles.createOrderWrapper}>
      <div className={styles.createOrderBox}>
        <h2>Please define the recurring time interval for each order*</h2>
        <div
          className={`
            ${styles.inputRadioRow} 
          `}
        >
          Generate order every &nbsp;
          <InputFilter
            placeholder="0"
            isNumber
            isPositiveOnly
            isInteger
            value={orderInterval?.toString() || ''}
            handleChange={value => setOrderInterval(parseInt(value))}
            className={styles.inputFilter}
          />
          &nbsp;days.
        </div>
      </div>

      <div className={styles.buttonsRow}>
        <ActionButton
          className={styles.cancelButton}
          onClick={handlePrev}
          variant="reset"
          size="md"
        >
          Previous
        </ActionButton>
        <ActionButton
          className={styles.createButton}
          onClick={handleSubmit}
          variant="secondary"
          type="purpleGradient"
          size="md"
        >
          Next
        </ActionButton>
      </div>
    </div>
  );
};

export default OrderIntervalSelection;
