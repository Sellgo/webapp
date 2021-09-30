import React, { memo, useState } from 'react';
import { v4 as uuid } from 'uuid';

/* Styling */
import styles from './index.module.scss';

/* Constants */
import { MAX_ASINS_ALLOWED } from '../../constants/KeywordResearch/KeywordReverse';
import { isValidAsin } from '../../constants';

/* Components */
import AsinPill from '../AsinPill';
import InputFilter from '../FormFilters/InputFilter';

const AddReverseBulkAsins = () => {
  const [reverseAsins, setReverseAsins] = useState<string>('');
  const [reverseAsinsArray, setReverseAsinsArray] = useState<string[]>([]);

  /* When user enteres something */
  const handleAsinInputChange = (value: string) => {
    const convertedValue = value.replace(/[ ,]+/g, ',');

    if (convertedValue.includes(',')) {
      const convertedValueArray = convertedValue.split(',').filter(a => a.trim().length > 0);
      setReverseAsinsArray(prevState => {
        const groupedAsins = [...prevState, ...convertedValueArray];
        return Array.from(new Set(groupedAsins));
      });
      setReverseAsins('');
    } else {
      setReverseAsins(value);
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
          placeholder="Enter ASINs seperated by space"
          value={reverseAsins}
          handleChange={handleAsinInputChange}
          className={styles.formInput}
          handleOnPaste={handleAsinInputChange}
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
