import React, { useState } from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import TextAreaInput from '../FormFilters/TextAreaInput';

const AddReverseBulkAsins = () => {
  const [reverseAsins, setReverseAsins] = useState<string>('');
  return (
    <div className={styles.addReverseBulkAsinsModal}>
      <div className={styles.filterForm}>
        <TextAreaInput
          label="Add Bulk ASINs"
          placeholder="Enter ASINs (1 per line..)"
          value={reverseAsins}
          handleChange={value => {
            setReverseAsins(value);
          }}
        />
      </div>
    </div>
  );
};

export default AddReverseBulkAsins;
