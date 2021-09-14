import React, { useState } from 'react';

/* Components */
import FormFilterActions from '../FormFilters/FormFilterActions';
import InputFilter from '../FormFilters/InputFilter';
import TextAreaInput from '../FormFilters/TextAreaInput';
import MarketplaceDropdown from '../MarketplaceDropdown';

/* Styling */
import styles from './index.module.scss';

const AddCompetitorsModal = () => {
  const [competitorsAsins, setCompetitorsAsins] = useState('');

  const handleReset = () => {
    console.log('Log Reset');
  };

  const handleSubmit = () => {
    console.log('Log Find');
  };

  return (
    <div className={styles.addCompetitorModal}>
      <div className={styles.metaData}>
        <h1>ADD COMPETITORS</h1>
        <MarketplaceDropdown />
      </div>

      <div className={styles.filterForm}>
        <InputFilter
          placeholder="Parent Product ASIN"
          value="B07YKPJJYN"
          disabled
          label="Parent ASIN"
          handleChange={() => {
            return;
          }}
          className={styles.longInput}
        />

        <div style={{ marginTop: '30px' }} />

        <TextAreaInput
          label="Add Comepetitor's ASIN's"
          placeholder="Enter ASIN's (1 per line)..."
          value={competitorsAsins.split(',').join('\n')}
          handleChange={(value: string) => {
            setCompetitorsAsins(value.toUpperCase());
          }}
          className={styles.addAsinTextArea}
        />

        <p className={styles.leftOverMessage}>
          Total ASIN's left :<span>10/10</span>
        </p>

        <FormFilterActions
          resetLabel="Reset"
          submitLabel="Track"
          onReset={handleReset}
          onFind={handleSubmit}
          withSecondarySubmit
        />
      </div>
    </div>
  );
};

export default AddCompetitorsModal;
