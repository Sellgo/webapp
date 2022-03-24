import React from 'react';
import { Checkbox } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../../../../components/ActionButton';
import RadioRow from '../../../../../components/RadioRow';

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
  const [smartOrderInterval, setSmartOrderInterval] = React.useState<number | null>(null);

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
          <div className={styles.intervalWrapper}>
            <Checkbox
              checked={smartOrderInterval === null}
              radio
              label="Only for the next order"
              className={styles.intervalWrapper__interval}
              onChange={() => setSmartOrderInterval(null)}
            />
            <Checkbox
              checked={smartOrderInterval === 365}
              onChange={() => setSmartOrderInterval(365)}
              radio
              label="Future 12 months"
              className={styles.intervalWrapper__interval}
            />
            <Checkbox
              checked={smartOrderInterval === 730}
              onChange={() => setSmartOrderInterval(730)}
              radio
              label="Future 24 months"
              className={styles.intervalWrapper__interval}
            />
          </div>
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
