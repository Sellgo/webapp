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
import { Radio } from 'semantic-ui-react';
import InputFilter from '../../../../../components/FormFilters/InputFilter';

interface Props {
  handlePrev: () => void;
  handleNext: () => void;
  createStreamLinePayload: any;
  setCreateStreamLinePayload: (payload: any) => void;
}

const StartEndDateSelection = (props: Props) => {
  const { handlePrev, handleNext, createStreamLinePayload, setCreateStreamLinePayload } = props;

  const [selectStartDate, setSelectStartDate] = React.useState<string>();
  const [radioChecked, setRadioChecked] = React.useState<number>(0);
  const [endDate, setEndDate] = React.useState<string>();
  const [numberOfMonths, setNumberOfMonths] = React.useState<string>('');
  const [tplThreshold, setTplThreshold] = React.useState<string>('');
  const onSelectDate = (date: Date, type: 'start' | 'end') => {
    let tempDate;
    if (date) {
      tempDate = date.toISOString().split('T')[0];
    } else {
      tempDate = '';
    }
    if (type === 'start') {
      setSelectStartDate(tempDate);
    } else if (type === 'end') {
      setEndDate(tempDate);
    }
  };

  const handleSubmit = () => {
    /* Handle Error */
    if (!selectStartDate) {
      error('Please select a date');
      return;
    } else {
      if (radioChecked === 1) {
        if (!endDate) {
          error('Please select end date');
          return;
        }
        const payload = {
          ...createStreamLinePayload,
          start_date: selectStartDate,
          end_date: endDate,
        };
        setCreateStreamLinePayload(payload);
        handleNext();
      } else if (radioChecked === 2) {
        if (!numberOfMonths || !(Number(numberOfMonths) > 0)) {
          error('Number of months must be greater than 0');
          return;
        }
        const startDate = new Date(selectStartDate.replace(/-/g, '/'));
        const tempEndDate = new Date(
          startDate.setMonth(startDate.getMonth() + Number(numberOfMonths))
        )
          .toISOString()
          .split('T')[0];

        const payload = {
          ...createStreamLinePayload,
          start_date: selectStartDate,
          end_date: tempEndDate,
        };
        setCreateStreamLinePayload(payload);
        handleNext();
      } else if (radioChecked === 3) {
        if (!tplThreshold) {
          error('Please enter tpl threshold value');
          return;
        }
        const payload = {
          ...createStreamLinePayload,
          start_date: selectStartDate,
          end_date: null,
          tpl_threshold: tplThreshold,
        };
        setCreateStreamLinePayload(payload);
        handleNext();
      } else {
        error('Please select one of end date type');
        return;
      }
    }
  };

  return (
    <div className={styles.createOrderWrapper}>
      <div className={styles.createOrderBox}>
        <h2>When would you like to start and end the replenishment?*</h2>
        <div className={styles.inputBox}>
          <div>
            <p className={styles.title}>Start Date</p>
            <DatePicker
              oneTap
              selected={selectStartDate ? new Date(selectStartDate) : new Date()}
              onChange={date => {
                onSelectDate(date, 'start');
              }}
              disabledDate={(date: Date | undefined) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return date ? date.getTime() < today.getTime() + today.getTimezoneOffset() : false;
              }}
            />
          </div>
          <div>
            <p className={styles.title}>End Date</p>
            <div className={styles.endDateRows}>
              <Radio checked={radioChecked === 1} onClick={() => setRadioChecked(1)} />
              <p
                className={`${styles.endDateInputLabels} ${radioChecked !== 1 &&
                  styles.endDateInputLabelsDisabled}`}
              >
                Specific Date
              </p>
              <DatePicker
                oneTap
                selected={endDate ? new Date(endDate) : new Date()}
                onChange={date => {
                  onSelectDate(date, 'end');
                }}
                disabledDate={(date: Date | undefined) => {
                  let today;
                  if (selectStartDate) {
                    today = new Date(selectStartDate.replace(/-/g, '/'));
                  } else {
                    today = new Date();
                  }
                  today.setHours(0, 0, 0, 0);
                  return date
                    ? date.getTime() < today.getTime() + today.getTimezoneOffset()
                    : false;
                }}
              />
            </div>
            <div className={styles.endDateRows}>
              <Radio checked={radioChecked === 2} onClick={() => setRadioChecked(2)} />
              <span
                className={`${styles.endDateInputLabels} ${radioChecked !== 2 &&
                  styles.endDateInputLabelsDisabled}`}
              >
                After &nbsp; &nbsp;
              </span>
              <InputFilter
                placeholder={''}
                value={numberOfMonths}
                handleChange={setNumberOfMonths}
                isNumber
                isInteger
                isPositiveOnly
                className={styles.input}
              />
              <span
                className={`${styles.endDateInputLabels} ${radioChecked !== 2 &&
                  styles.endDateInputLabelsDisabled}`}
              >
                &nbsp; &nbsp; months from starting date
              </span>
            </div>
            <div className={styles.endDateRows}>
              <Radio checked={radioChecked === 3} onClick={() => setRadioChecked(3)} />
              <span
                className={`${styles.endDateInputLabels} ${radioChecked !== 3 &&
                  styles.endDateInputLabelsDisabled}`}
              >
                After 3PL inventory reaches &nbsp; &nbsp;
              </span>
              <InputFilter
                placeholder={''}
                value={tplThreshold}
                handleChange={setTplThreshold}
                isNumber
                isInteger
                isPositiveOnly
                className={styles.input}
              />
              <span
                className={`${styles.endDateInputLabels} ${radioChecked !== 3 &&
                  styles.endDateInputLabelsDisabled}`}
              >
                {' '}
                &nbsp; &nbsp; quantity
              </span>
            </div>
          </div>
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

export default StartEndDateSelection;
