import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../../../../components/ActionButton';
import RadioListFilters from '../../../../../components/FormFilters/RadioListFilters';

/* Interfaces */
import { CreateOrderPayload } from '../../../../../interfaces/PerfectStock/OrderPlanning';

/* Constants */
import { AUTO_GENERATE_DURATION_OPTIONS } from '../../../../../constants/PerfectStock/OrderPlanning';

interface Props {
  handlePrevious: () => void;
  createOrderPayload: CreateOrderPayload;
  setCreateOrderPayload: (payload: CreateOrderPayload) => void;
  handleCreateOrder: () => void;
}

const CreateOrderSettings = (props: Props) => {
  const { handlePrevious, createOrderPayload, setCreateOrderPayload, handleCreateOrder } = props;

  /* Disable user from proceeding when any of the fields are empty */
  const isHandleNextDisabled = createOrderPayload.auto_generate_orders_days === -1;

  const [isCreatingOrder, setIsCreatingOrder] = React.useState(false);

  const onOrderCreate = () => {
    setIsCreatingOrder(true);
    handleCreateOrder();
  };
  return (
    <div className={styles.createOrderWrapper}>
      <div className={styles.createOrderBox}>
        <h2>How far would you like to auto-generate future draft P.O.?</h2>
        <div className={styles.inputField}>
          <RadioListFilters
            label=""
            filterOptions={AUTO_GENERATE_DURATION_OPTIONS}
            value={createOrderPayload.auto_generate_orders_days}
            handleChange={(value: number) =>
              setCreateOrderPayload({ ...createOrderPayload, auto_generate_orders_days: value })
            }
          />
        </div>
      </div>

      <div className={styles.buttonsRow}>
        <ActionButton
          className={styles.cancelButton}
          onClick={handlePrevious}
          variant="reset"
          size="md"
        >
          Back
        </ActionButton>
        <ActionButton
          className={styles.createButton}
          onClick={onOrderCreate}
          variant="secondary"
          type="purpleGradient"
          size="md"
          disabled={isHandleNextDisabled}
          loading={isCreatingOrder}
        >
          Create Order
        </ActionButton>
      </div>
    </div>
  );
};

export default CreateOrderSettings;
