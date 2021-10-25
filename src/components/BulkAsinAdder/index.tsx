import React, { memo, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import validator from 'validator';

/* Styling */
import styles from './index.module.scss';

/* Constants */
import { isValidAsin } from '../../constants';

/* utils */
import { convertAsinLinks } from '../../utils/amazonStore';

/* Components */
import AsinPill from '../AsinPill';
import InputFilter from '../FormFilters/InputFilter';
import FormFilterActions from '../FormFilters/FormFilterActions';

interface SendPaylod {
  asins: string;
}
interface Props {
  label: string;
  maxAsinsAllowed: number;
  currentAsins: string;
  onSubmit: (asins: SendPaylod) => void;
  submitLabel?: string;
  resetLabel?: string;
  hideReset?: boolean;
}

const AddReverseBulkAsins = (props: Props) => {
  const {
    label,
    maxAsinsAllowed,
    currentAsins,
    submitLabel,
    hideReset,
    resetLabel,
    onSubmit,
  } = props;

  const [userInputAsins, setUserInputAsins] = useState<string>('');
  const [asinsArray, setAsinsArray] = useState<string[]>([]);

  /* On load set the already existing asins if needed */
  useEffect(() => {
    setAsinsArray(currentAsins.split(',').filter(a => a.trim().length > 0));
  }, []);

  /* When user enteres something */
  const handleAsinInputChange = (value: string) => {
    const convertedValue = value.replace(/[ ,]+/g, '|').toUpperCase();

    if (convertedValue.includes('|')) {
      const convertedValueArray = convertedValue.split('|').filter(a => a.trim().length > 0);
      setAsinsArray(prevState => {
        const groupedAsins = [...prevState, ...convertedValueArray];
        return Array.from(new Set(groupedAsins));
      });
      setUserInputAsins('');
    } else {
      setUserInputAsins(validator.isURL(value) ? value : value.toUpperCase());
    }
  };

  /* When user pasted a amazon link */
  const handlePastedInput = (value: string) => {
    if (validator.isURL(value)) {
      const convertedValues = convertAsinLinks(value);
      setAsinsArray(prevState => {
        const groupedAsins = [...prevState, ...[convertedValues]];
        return Array.from(new Set(groupedAsins));
      });
      setUserInputAsins('');
    } else {
      setUserInputAsins(validator.isURL(value) ? value : value.toUpperCase());
    }
  };

  /* When asin needs to be removed */
  const handleRemoveAsin = (asin: string) => {
    const updatedAsins = asinsArray.filter(a => a !== asin);
    setAsinsArray(updatedAsins);
  };

  /* When reset is pressed */
  const handleReset = () => {
    setUserInputAsins('');
    setAsinsArray(currentAsins.split(',').filter(a => a.trim().length > 0));
  };

  /* When apply button is clicked */
  const handleApply = () => {
    const sendPayload = asinsArray.join(',');
    onSubmit({ asins: sendPayload });
  };

  const totalAsinsCount = asinsArray.length;

  const allValidAsins = asinsArray.every(a => isValidAsin(a));

  const shouldDisableSubmit =
    !asinsArray.length || !allValidAsins || totalAsinsCount > maxAsinsAllowed;

  return (
    <div className={styles.addReverseBulkAsinsModal}>
      <p className={styles.label}>{label}</p>

      <div className={styles.filterForm}>
        {/* Asin Wrapper which shows all ASINs */}
        <div className={styles.asinPillWrapper}>
          {asinsArray.map(a => {
            return <AsinPill asin={a} key={uuid()} handleRemove={handleRemoveAsin} />;
          })}
        </div>

        <InputFilter
          label=""
          placeholder="Enter ASINs seperated by space or paste product URL"
          value={userInputAsins}
          handleChange={handleAsinInputChange}
          className={styles.formInput}
          handleOnPaste={handlePastedInput}
          disabled={totalAsinsCount >= maxAsinsAllowed}
        />
      </div>

      <p className={styles.leftOverMessage}>
        Total ASINs:
        <span>
          {totalAsinsCount}/{maxAsinsAllowed}
        </span>
      </p>

      <FormFilterActions
        submitLabel={submitLabel ? submitLabel : 'Apply'}
        resetLabel={resetLabel ? resetLabel : 'Reset'}
        onFind={handleApply}
        onReset={handleReset}
        withSecondarySubmit
        hideReset={hideReset}
        disabled={shouldDisableSubmit}
      />
    </div>
  );
};

export default memo(AddReverseBulkAsins);
