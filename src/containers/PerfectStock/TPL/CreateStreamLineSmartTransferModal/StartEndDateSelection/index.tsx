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
import format from 'date-fns/format';

interface Props {
  handlePrev: () => void;
  handleNext: () => void;
  createStreamLinePayload: any;
  setCreateStreamLinePayload: (payload: any) => void;
}

const StartEndDateSelection = (props: Props) => {
  const { handlePrev, handleNext, createStreamLinePayload, setCreateStreamLinePayload } = props;

  const [selectStartDate, setSelectStartDate] = React.useState<string>('');
  const [radioChecked, setRadioChecked] = React.useState<number>(1);
  const [endDate, setEndDate] = React.useState<string>();
  const [numberOfMonths, setNumberOfMonths] = React.useState<string>('');
  const [tplThreshold, setTplThreshold] = React.useState<string>('');
  const onSelectDate = (date: Date, type: 'start' | 'end') => {
    let tempDate;
    if (date) {
      tempDate = format(date, 'yyyy-MM-dd');
    } else {
      tempDate = '';
    }
    if (type === 'start') {
      setSelectStartDate(tempDate);
    } else if (type === 'end') {
      setEndDate(tempDate);
    }
  };

  React.useEffect(() => {
    if (createStreamLinePayload?.start_date && !(createStreamLinePayload?.start_date === '')) {
      const tempDate = new Date(createStreamLinePayload?.start_date.replace(/-/g, '/'));
      const result = format(tempDate, 'yyyy-MM-dd');
      setSelectStartDate(result);
    }
    if (createStreamLinePayload?.end_date && !(createStreamLinePayload?.end_date === '')) {
      const tempDate = new Date(createStreamLinePayload?.end_date.replace(/-/g, '/'));
      const result = format(tempDate, 'yyyy-MM-dd');
      setEndDate(result);
      setRadioChecked(1);
    } else if (
      createStreamLinePayload.tpl_threshold &&
      !(createStreamLinePayload?.tpl_threshold === '')
    ) {
      setTplThreshold(createStreamLinePayload.tpl_threshold);
      setRadioChecked(3);
    }
  }, [
    createStreamLinePayload.start_date,
    createStreamLinePayload.end_date,
    createStreamLinePayload.tpl_threshold,
  ]);

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
        let tempEndDate: Date | string = new Date(
          startDate.setMonth(startDate.getMonth() + Number(numberOfMonths))
        );
        tempEndDate = format(tempEndDate, 'yyyy-MM-dd');

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

  const handlePrevClick = () => {
    /* Handle Error */
    let tempEndDate: Date | string | undefined | null = endDate;
    let tempTplThreshold: string | null = tplThreshold;
    if (numberOfMonths && Number(numberOfMonths) > 0) {
      const startDate = new Date(selectStartDate.replace(/-/g, '/'));
      tempEndDate = new Date(startDate.setMonth(startDate.getMonth() + Number(numberOfMonths)));
      tempEndDate = format(tempEndDate, 'yyyy-MM-dd');
    }

    if (radioChecked === 3) {
      tempEndDate = null;
    } else {
      tempTplThreshold = null;
    }
    const payload = {
      ...createStreamLinePayload,
      start_date: selectStartDate,
      end_date: tempEndDate,
      tpl_threshold: tempTplThreshold,
    };
    setCreateStreamLinePayload(payload);
    handlePrev();
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
              value={selectStartDate ? new Date(selectStartDate) : undefined}
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
          <div className={selectStartDate ? '' : styles.endDateBox}>
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
                value={endDate ? new Date(endDate) : undefined}
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
          onClick={handlePrevClick}
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
