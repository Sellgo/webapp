import React from 'react';
import { Checkbox } from 'semantic-ui-react';

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

const InventoryThresholdSelection = (props: Props) => {
  const { handleNext, handlePrev, createOrderPayload, setCreateOrderPayload } = props;
  const [inventoryUnit, setInventoryUnit] = React.useState<'percent' | 'days'>('percent');
  const [stockLevelThreshold, setStockLevelThreshold] = React.useState<number | null>(
    createOrderPayload.stockout_buffer_perc || null
  );
  const [dusThreshold, setDusThreshold] = React.useState<number | null>(
    createOrderPayload.stockout_buffer_days || null
  );

  const handleSubmit = () => {
    if (inventoryUnit === 'percent' && stockLevelThreshold) {
      setCreateOrderPayload({
        ...createOrderPayload,
        stockout_buffer_perc: stockLevelThreshold,
      });
      handleNext();
    } else if (inventoryUnit === 'days' && dusThreshold) {
      setCreateOrderPayload({
        ...createOrderPayload,
        stockout_buffer_days: dusThreshold,
      });
      handleNext();
    } else {
      error('Please fill in all fields');
    }
  };

  return (
    <div className={styles.createOrderWrapper}>
      <div className={styles.createOrderBox}>
        <h2>Please define the inventory level to trigger next order*</h2>
        <div
          className={`
            ${styles.inputRadioRow} 
            ${inventoryUnit === 'percent' ? styles.inputRadioRow__selected : ''}
          `}
          onClick={() => setInventoryUnit('percent')}
        >
          <Checkbox radio checked={inventoryUnit === 'percent'} />
          &nbsp; Generate next order when the Priority SKU has &nbsp;
          <InputFilter
            placeholder="0"
            isNumber
            isPositiveOnly
            value={stockLevelThreshold?.toString() || ''}
            handleChange={value => setStockLevelThreshold(parseFloat(value))}
            className={styles.inputFilter}
          />
          &nbsp;% of stock left.
        </div>
        <div
          className={`
            ${styles.inputRadioRow} 
            ${inventoryUnit === 'days' ? styles.inputRadioRow__selected : ''}
          `}
          onClick={() => setInventoryUnit('days')}
        >
          <Checkbox radio checked={inventoryUnit === 'days'} />
          &nbsp; Generate next order when the Priority SKU has &nbsp;
          <InputFilter
            placeholder="0"
            isNumber
            isPositiveOnly
            value={dusThreshold?.toString() || ''}
            handleChange={value => setDusThreshold(parseInt(value))}
            className={styles.inputFilter}
          />
          &nbsp; of days until stockout.
        </div>
      </div>
      <span className={styles.helperMessage}>
        *You can re-align next order in the Order Planning.
      </span>
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

export default InventoryThresholdSelection;
