import React from 'react';
import { DatePicker } from 'rsuite';

/* Styling */
import styles from './index.module.scss';
import './datePickerReset.scss';

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

const StartDateSelection = (props: Props) => {
  const { onCloseModal, handleNext, createOrderPayload, setCreateOrderPayload } = props;

  /* Disable user from proceeding when any of the fields are empty */
  const isHandleNextDisabled = createOrderPayload.date === '';

  return (
    <div className={styles.createOrderWrapper}>
      <div className={styles.createOrderBox}>
        <h2>When would you like to start the first order?*</h2>
        <div className={styles.inputField}>
          <DatePicker
            selected={createOrderPayload.date ? new Date(createOrderPayload.date) : new Date()}
            onChange={(date: Date) => {
              setCreateOrderPayload({
                ...createOrderPayload,
                date: date ? date.toISOString().split('T')[0] : '',
              });
            }}
            disabledDate={(date: Date | undefined) =>
              date ? date.getTime() < new Date().getTime() : false
            }
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
