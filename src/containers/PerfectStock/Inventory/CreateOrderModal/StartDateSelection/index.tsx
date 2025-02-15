import React from 'react';
import { DatePicker } from 'rsuite';

/* Styling */
import styles from './index.module.scss';
import './datePickerReset.scss';

/* Components */
import ActionButton from '../../../../../components/ActionButton';
import InputTabSelection from '../../../../../components/InputTabSelection';
import LeadTimeBar from '../../../../../components/LeadTimeBar';

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

const StartDateSelection = (props: Props) => {
  const { handlePrev, handleNext, createOrderPayload, setCreateOrderPayload } = props;

  const [dateType, setDateType] = React.useState<string>('Start Date');
  const [selectedDate, setSelectedDate] = React.useState<string>();

  const onSelectDate = (date: Date) => {
    if (date) {
      setSelectedDate(date.toISOString().split('T')[0]);
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
      const payload = {
        ...createOrderPayload,
        start_date: dateType === 'Start Date' ? selectedDate : null,
        end_date: dateType === 'Arrival Date' ? selectedDate : null,
      };
      setCreateOrderPayload(payload);
      handleNext();
    }
  };

  return (
    <div className={styles.createOrderWrapper}>
      <div className={styles.createOrderBox}>
        <h2>When would you like to date the first order?</h2>
        <div className={styles.inputBox}>
          <InputTabSelection
            options={['Start Date', 'Arrival Date']}
            selectedOption={dateType}
            setSelectedOption={setDateType}
            isPurple={true}
          />
          <DatePicker
            oneTap
            selected={selectedDate ? new Date(selectedDate) : new Date()}
            onChange={onSelectDate}
            disabledDate={(date: Date | undefined) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              return date ? date.getTime() < today.getTime() + today.getTimezoneOffset() : false;
            }}
          />
        </div>
        <LeadTimeBar
          className={styles.leadTimeBar}
          leadTimes={createOrderPayload.lead_time_group?.lead_times || []}
          showDates={selectedDate ? true : false}
          startDate={dateType === 'Start Date' ? selectedDate : undefined}
          endDate={dateType === 'Arrival Date' ? selectedDate : undefined}
          showDurationOnTop
        />
      </div>

      <span className={styles.helperMessage}>
        *You can change the start or arrival date in the Order Planning easily through Gantt chart.
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
          Next
        </ActionButton>
      </div>
    </div>
  );
};

export default StartDateSelection;
