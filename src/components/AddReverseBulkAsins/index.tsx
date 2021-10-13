import React, { memo, useState } from 'react';
import { v4 as uuid } from 'uuid';
import validator from 'validator';

/* Styling */
import styles from './index.module.scss';

/* Constants */
import { MAX_ASINS_ALLOWED } from '../../constants/KeywordResearch/KeywordReverse';
import { isValidAsin } from '../../constants';

/* Components */
import AsinPill from '../AsinPill';
import InputFilter from '../FormFilters/InputFilter';
import { convertAsinLinks } from '../../utils/amazonStore';

const AddReverseBulkAsins = () => {
  const [reverseAsins, setReverseAsins] = useState<string>('');
  const [reverseAsinsArray, setReverseAsinsArray] = useState<string[]>([]);

  /* When user enteres something */
  const handleAsinInputChange = (value: string) => {
    const convertedValue = value.replace(/[ ,]+/g, '|').toUpperCase();

    if (convertedValue.includes('|')) {
      const convertedValueArray = convertedValue.split('|').filter(a => a.trim().length > 0);
      setReverseAsinsArray(prevState => {
        const groupedAsins = [...prevState, ...convertedValueArray];
        return Array.from(new Set(groupedAsins));
      });
      setReverseAsins('');
    } else {
      setReverseAsins(validator.isURL(value) ? value : value.toUpperCase());
    }
  };

  /* When user pasted a amazon link */
  const handlePastedInput = (value: string) => {
    if (validator.isURL(value)) {
      const convertedValues = convertAsinLinks(value);
      setReverseAsinsArray(prevState => {
        const groupedAsins = [...prevState, ...[convertedValues]];
        return Array.from(new Set(groupedAsins));
      });
      setReverseAsins('');
    } else {
      setReverseAsins(validator.isURL(value) ? value : value.toUpperCase());
    }
  };

  /* When apply button is clicked */
  const handleApply = () => {
    const sendPayload = reverseAsinsArray.join(',');
    console.log(sendPayload);
  };

  /* When asin needs to be removed */
  const handleRemoveAsin = (asin: string) => {
    const updatedAsins = reverseAsinsArray.filter(a => a !== asin);
    setReverseAsinsArray(updatedAsins);
  };

  const totalAsinsCount = reverseAsinsArray.length;

  const allValidAsins = reverseAsinsArray.every(a => isValidAsin(a));

  const shouldDisableSubmit = !allValidAsins || totalAsinsCount > MAX_ASINS_ALLOWED;

  return (
    <div className={styles.addReverseBulkAsinsModal}>
      <p className={styles.label}>Add Bulk ASINs</p>

      <div className={styles.filterForm}>
        {/* Asin Wrapper which shows all ASINs */}
        <div className={styles.asinPillWrapper}>
          {reverseAsinsArray.map(a => {
            return <AsinPill asin={a} key={uuid()} handleRemove={handleRemoveAsin} />;
          })}
        </div>

        <InputFilter
          label=""
          placeholder="Enter ASINs seperated by space or paste product URL"
          value={reverseAsins}
          handleChange={handleAsinInputChange}
          className={styles.formInput}
          handleOnPaste={handlePastedInput}
        />
      </div>

      <p className={styles.leftOverMessage}>
        Total ASINs:
        <span>
          {totalAsinsCount}/{MAX_ASINS_ALLOWED}
        </span>
      </p>

      {/* Submit Button */}
      <button className={styles.applyButton} onClick={handleApply} disabled={shouldDisableSubmit}>
        Apply
      </button>
    </div>
  );
};

export default memo(AddReverseBulkAsins);
