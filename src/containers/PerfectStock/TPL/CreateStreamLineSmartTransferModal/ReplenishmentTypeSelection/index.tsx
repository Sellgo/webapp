import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../../../../components/ActionButton';
import RadioRow from '../../../../../components/RadioRow';

/* Interfaces */
// import { CreateOrderPayload } from '../../../../../interfaces/PerfectStock/OrderPlanning';
import InputTabSelection from '../../../../../components/InputTabSelection';

interface Props {
  onCloseModal: () => void;
  handleNext: () => void;
  createStreamLinePayload: any;
  setCreateStreamLinePayload: (payload: any) => void;
}

const ReplenishmentTypeSelection = (props: Props) => {
  const { onCloseModal, handleNext, createStreamLinePayload, setCreateStreamLinePayload } = props;
  const [orderType, setOrderType] = React.useState<'single' | 'multiple'>('single');
  const [smartOrderInterval, setSmartOrderInterval] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (createStreamLinePayload?.creation_type === 'single') {
      setOrderType('single');
    } else if (createStreamLinePayload?.creation_type === 'multiple') {
      setOrderType('multiple');
      setSmartOrderInterval(createStreamLinePayload?.interval);
    }
  }, []);

  const smartOrderIntervalsOptions = [
    {
      value: null,
      label: 'Daily',
    },
    {
      value: 3,
      label: 'Twice a week',
    },
    {
      value: 7,
      label: 'Weekly',
    },
    {
      value: 14,
      label: 'Biweekly',
    },
    {
      value: 30,
      label: 'Monthly',
    },
  ];
  const handleSubmit = () => {
    if (orderType === 'single') {
      setCreateStreamLinePayload({
        ...createStreamLinePayload,
        creation_type: 'single',
      });
    } else {
      setCreateStreamLinePayload({
        ...createStreamLinePayload,
        creation_type: 'multiple',
        interval: smartOrderInterval,
      });
    }
    handleNext();
  };

  return (
    <div className={styles.createOrderWrapper}>
      <div className={styles.createOrderBox}>
        <h2>What kind of Replenishment would you like to create?*</h2>
        <RadioRow
          handleChange={() => setOrderType('single')}
          checked={orderType === 'single'}
          className={styles.singleTransferRow}
        >
          Single Transfer
        </RadioRow>
        <RadioRow handleChange={() => setOrderType('multiple')} checked={orderType === 'multiple'}>
          Streamline Smart Transfer &nbsp;
          <InputTabSelection
            selectedOption={
              smartOrderIntervalsOptions.find(option => option.value === smartOrderInterval)
                ?.label || ''
            }
            options={smartOrderIntervalsOptions.map(interval => interval.label)}
            setSelectedOption={(option: string) =>
              setSmartOrderInterval(
                smartOrderIntervalsOptions.find(interval => interval.label === option)?.value ||
                  null
              )
            }
            isPurple
            className={styles.inputTabSelection}
          />
        </RadioRow>
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
          Continue
        </ActionButton>
      </div>
    </div>
  );
};

export default ReplenishmentTypeSelection;
