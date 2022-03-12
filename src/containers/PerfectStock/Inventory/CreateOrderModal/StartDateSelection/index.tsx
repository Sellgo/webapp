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
  handleCreateOrder: (payload: CreateOrderPayload) => void;
  createOrderPayload: CreateOrderPayload;
  setCreateOrderPayload: (payload: CreateOrderPayload) => void;
  isCreateOrderLoading: boolean;
}

const StartDateSelection = (props: Props) => {
  const {
    handlePrev,
    handleCreateOrder,
    createOrderPayload,
    setCreateOrderPayload,
    isCreateOrderLoading,
  } = props;

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
      handleCreateOrder(payload);
    }
  };

  return (
    <div className={styles.createOrderWrapper}>
      <div className={styles.createOrderBox}>
        <h2>When would you like to date the first order?*</h2>
        <div className={styles.inputBox}>
          <InputTabSelection
            options={['Start Date', 'Arrival Date']}
            selectedOption={dateType}
            setSelectedOption={setDateType}
          />
          <DatePicker
            selected={selectedDate ? new Date(selectedDate) : new Date()}
            onChange={onSelectDate}
            disabledDate={(date: Date | undefined) =>
              date ? date.getTime() < new Date().getTime() : false
            }
          />
        </div>
        <LeadTimeBar
          className={styles.leadTimeBar}
          leadTimes={createOrderPayload.lead_time_group?.lead_times || []}
          showDates={selectedDate ? true : false}
          startDate={dateType === 'Start Date' ? selectedDate : undefined}
          endDate={dateType === 'Arrival Date' ? selectedDate : undefined}
        />
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
          loading={isCreateOrderLoading}
        >
          Submit
        </ActionButton>
      </div>
    </div>
  );
};

export default StartDateSelection;
