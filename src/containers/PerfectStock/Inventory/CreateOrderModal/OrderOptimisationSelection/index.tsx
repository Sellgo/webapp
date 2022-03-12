import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../../../../components/ActionButton';

/* Interfaces */
import { CreateOrderPayload } from '../../../../../interfaces/PerfectStock/OrderPlanning';
import { Checkbox } from 'semantic-ui-react';

interface Props {
  handlePrev: () => void;
  handleNext: () => void;
  createOrderPayload: CreateOrderPayload;
  setCreateOrderPayload: (payload: CreateOrderPayload) => void;
}

const OrderOptimisationSelection = (props: Props) => {
  const { handleNext, handlePrev, createOrderPayload, setCreateOrderPayload } = props;
  const [approach, setApproach] = React.useState<'inventory' | 'moq' | 'time'>('moq');

  const handleSubmit = () => {
    setCreateOrderPayload({
      ...createOrderPayload,
      approach,
    });
    handleNext();
  };

  return (
    <div className={styles.createOrderWrapper}>
      <div className={styles.createOrderBox}>
        <h2>How would you like to optimize your Smart Order?*</h2>
        <div
          className={`
            ${styles.inputRadioRow} 
            ${approach === 'moq' ? styles.inputRadioRow__selected : ''}
          `}
          onClick={() => setApproach('moq')}
        >
          <Checkbox
            radio
            checked={approach === 'moq'}
            label="MOQ/ MINIMUM ORDER QUANTITY OPTIMIZATION"
            className={styles.inputRadioRow__radio}
          />
          <p>
            The account sells&nbsp;<span>less than 1,000 units per month.</span>
          </p>
        </div>
        <div
          className={`
            ${styles.inputRadioRow} 
            ${approach === 'inventory' ? styles.inputRadioRow__selected : ''}
          `}
          onClick={() => setApproach('inventory')}
        >
          <Checkbox
            radio
            checked={approach === 'inventory'}
            label="INVENTORY-LEVEL OPTIMIZATION"
            className={styles.inputRadioRow__radio}
          />
          <p>
            The account sells&nbsp;
            <span>less than 20 cbm per month in volume</span>
            &nbsp;and&nbsp;
            <span>more than 1,000 units per month.</span>
          </p>
        </div>
        <div
          className={`
            ${styles.inputRadioRow} 
            ${approach === 'time' ? styles.inputRadioRow__selected : ''}
          `}
          onClick={() => setApproach('time')}
        >
          <Checkbox
            radio
            checked={approach === 'time'}
            label="TIME-BOUND OPTIMIZATION"
            className={styles.inputRadioRow__radio}
          />
          <p>
            The account sells&nbsp;
            <span>greater than 20 cbm per month in volume.</span>
          </p>
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

export default OrderOptimisationSelection;
