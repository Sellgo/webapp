import React from 'react';
import { DatePicker } from 'rsuite';

/* Styling */
import styles from './index.module.scss';
import './datePickerReset.scss';

/* Components */
import ActionButton from '../../../../../components/ActionButton';

/* Interfaces */
// import { CreateOrderPayload } from '../../../../../interfaces/PerfectStock/OrderPlanning';

/* Utils */
import { error } from '../../../../../utils/notifications';
import format from 'date-fns/format';

interface Props {
  handlePrev: () => void;
  handleNext: () => void;
  createStreamLinePayload: any;
  setCreateStreamLinePayload: (payload: any) => void;
}

const StartDateSelection = (props: Props) => {
  const { handlePrev, handleNext, createStreamLinePayload, setCreateStreamLinePayload } = props;
  const [selectedDate, setSelectedDate] = React.useState<string>();

  React.useEffect(() => {
    if (createStreamLinePayload?.start_date && !(createStreamLinePayload?.start_date === '')) {
      const tempDate = new Date(createStreamLinePayload?.start_date.replace(/-/g, '/'));
      const result = format(tempDate, 'yyyy-MM-dd');
      setSelectedDate(result);
    } else {
      setSelectedDate('');
    }
  }, [createStreamLinePayload?.start_date]);

  const onSelectDate = (date: Date) => {
    const result = format(date, 'yyyy-MM-dd');
    if (date) {
      const payload = {
        ...createStreamLinePayload,
        start_date: result,
      };
      setCreateStreamLinePayload(payload);
    } else {
      setSelectedDate('');
    }
  };

  const handleSubmit = () => {
    /* Handle Error */
    if (!selectedDate) {
      error('Please select a date');
      return;
    } else {
      handleNext();
    }
  };

  return (
    <div className={styles.createOrderWrapper}>
      <div className={styles.createOrderBox}>
        <h3>When would you like to start the replenishment?*</h3>
        <div className={styles.inputBox}>
          <p className={styles.title}>Start Date</p>
          <DatePicker
            oneTap
            value={selectedDate ? new Date(selectedDate.replace(/-/g, '/')) : undefined}
            onChange={onSelectDate}
            disabledDate={(date: Date | undefined) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              return date ? date.getTime() < today.getTime() + today.getTimezoneOffset() : false;
            }}
          />
        </div>
      </div>
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

export default StartDateSelection;
