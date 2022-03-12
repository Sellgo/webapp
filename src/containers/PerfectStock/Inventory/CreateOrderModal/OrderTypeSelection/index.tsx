import React from 'react';
import { Checkbox } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../../../../components/ActionButton';

/* Interfaces */
import { CreateOrderPayload } from '../../../../../interfaces/PerfectStock/OrderPlanning';

interface Props {
  onCloseModal: () => void;
  handleNext: () => void;
  createOrderPayload: CreateOrderPayload;
  setCreateOrderPayload: (payload: CreateOrderPayload) => void;
}

const OrderTypeSelection = (props: Props) => {
  const { onCloseModal, handleNext, createOrderPayload, setCreateOrderPayload } = props;
  const [orderType, setOrderType] = React.useState<'single' | 'multiple'>('single');
  const [smartOrderInterval, setSmartOrderInterval] = React.useState<number>(1);

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
        interval: smartOrderInterval,
      });
    }
    handleNext();
  };

  return (
    <div className={styles.createOrderWrapper}>
      <div className={styles.createOrderBox}>
        <h2>What kind of Order would you like to create*?*</h2>
        <div
          className={`
            ${styles.inputRadioRow} 
            ${orderType === 'single' ? styles.inputRadioRow__selected : ''}
          `}
          onClick={() => setOrderType('single')}
        >
          <Checkbox radio checked={orderType === 'single'} />
          &nbsp; Single Order &nbsp;
        </div>
        <div
          className={`
            ${styles.inputRadioRow} 
            ${orderType === 'multiple' ? styles.inputRadioRow__selected : ''}
          `}
          onClick={() => setOrderType('multiple')}
        >
          <Checkbox radio checked={orderType === 'multiple'} />
          &nbsp; Streamline Smart Order &nbsp;
          <div className={styles.intervalWrapper}>
            <Checkbox
              checked={smartOrderInterval === 1}
              radio
              label="Only for the next order"
              className={styles.inputRadioRow__interval}
              onChange={() => setSmartOrderInterval(1)}
            />
            <Checkbox
              checked={smartOrderInterval === 12}
              onChange={() => setSmartOrderInterval(12)}
              radio
              label="Future 12 months"
              className={styles.inputRadioRow__interval}
            />
            <Checkbox
              checked={smartOrderInterval === 24}
              onChange={() => setSmartOrderInterval(24)}
              radio
              label="Future 24 months"
              className={styles.inputRadioRow__interval}
            />
          </div>
        </div>
      </div>

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
          Next
        </ActionButton>
      </div>
    </div>
  );
};

export default OrderTypeSelection;
