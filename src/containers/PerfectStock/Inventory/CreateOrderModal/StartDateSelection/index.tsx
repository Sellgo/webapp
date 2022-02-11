import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../../../../components/ActionButton';
import InputFilter from '../../../../../components/FormFilters/InputFilter';

/* Interfaces */
import { CreateOrderPayload } from '../../../../../interfaces/PerfectStock/OrderPlanning';

interface Props {
  onCloseModal: () => void;
  handleNext: () => void;
  createOrderPayload: CreateOrderPayload;
  setCreateOrderPayload: (payload: CreateOrderPayload) => void;
}

const StartDateSelection = (props: Props) => {
  const { onCloseModal, handleNext, createOrderPayload, setCreateOrderPayload } = props;

  /* Disable user from proceeding when any of the fields are empty */
  const isHandleNextDisabled = createOrderPayload.date === '';

  return (
    <div className={styles.createOrderWrapper}>
      <div className={styles.createOrderBox}>
        <h2>When would you like to start the first order?*</h2>
        <div className={styles.inputField}>
          <InputFilter
            label=""
            placeholder="Project Start Date"
            value={createOrderPayload.date}
            handleChange={(value: string) =>
              setCreateOrderPayload({ ...createOrderPayload, date: value })
            }
            isDate
          />
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
          onClick={handleNext}
          variant="secondary"
          type="purpleGradient"
          size="md"
          disabled={isHandleNextDisabled}
        >
          Next
        </ActionButton>
      </div>
    </div>
  );
};

export default StartDateSelection;
