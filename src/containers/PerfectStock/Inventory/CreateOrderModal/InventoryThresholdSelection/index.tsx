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
        <h2>Please define the inventory level to trigger next order</h2>
        <div
          className={`
            ${styles.inputRadioRow} 
            ${inventoryUnit === 'percent' ? styles.inputRadioRow__selected : ''}
          `}
          onClick={() => setInventoryUnit('percent')}
        >
          <Checkbox radio checked={inventoryUnit === 'percent'} />
          <div className={styles.inputRadioRowText}>
            <p>Inventory-level trigger</p>
            <span className={styles.inputRow}>
              Generate next order when the Priority SKU has &nbsp;
              <InputFilter
                placeholder="0"
                isNumber
                isPositiveOnly
                value={stockLevelThreshold?.toString() || ''}
                handleChange={value => setStockLevelThreshold(value ? parseFloat(value) : 0)}
                className={styles.inputFilter}
              />
              &nbsp;% of stock left.
            </span>
          </div>
        </div>
        <div
          className={`
            ${styles.inputRadioRow} 
            ${inventoryUnit === 'days' ? styles.inputRadioRow__selected : ''}
          `}
          onClick={() => setInventoryUnit('days')}
        >
          <Checkbox radio checked={inventoryUnit === 'days'} />
          <div className={styles.inputRadioRowText}>
            <p>Inventory-calendar trigger</p>
            <span className={styles.inputRow}>
              Generate next order when the Priority SKU has &nbsp;
              <InputFilter
                placeholder="0"
                isNumber
                isPositiveOnly
                isInteger
                value={dusThreshold?.toString() || ''}
                handleChange={value => setDusThreshold(value ? parseInt(value) : 0)}
                className={styles.inputFilter}
              />
              &nbsp; of days until stockout.
            </span>
          </div>
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
          Back
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

export default InventoryThresholdSelection;
