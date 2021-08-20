import React, { useState } from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import InputFilter from '../../../../components/FormFilters/InputFilter';
import FormFilterActions from '../../../../components/FormFilters/FormFilterActions';
import { Checkbox } from 'semantic-ui-react';

const TrackerFilters = () => {
  /* Basic Filters */
  const [asins, setAsins] = useState('');
  const [keywords, setKeywords] = useState('');
  const [trackParentsAndVariations, setTrackParentsAndVariations] = useState<boolean>(false);
  const [removeSpecialChars, setRemoveSpecialChars] = useState<boolean>(false);

  /* Handle Reset */
  const handleReset = () => {
    console.log('Clicked Reset');
  };

  /* Handle Submit */
  const handleSubmit = () => {
    console.log('Handle submit');
  };

  return (
    <section className={styles.filterSection}>
      {/* Basic Filters */}
      <div className={styles.basicFilters}>
        <InputFilter
          label="Add ASINs"
          placeholder="Enter ASINs seperated by comma"
          value={asins}
          handleChange={value => setAsins(value)}
          className={styles.longInput}
        />

        <InputFilter
          label="Add Keywords"
          placeholder="Enter Keywords seperated by comma"
          value={keywords}
          handleChange={value => setKeywords(value)}
          className={styles.longInput}
        />

        <Checkbox
          readOnly={false}
          label="Track Parent Products and All Variations"
          checked={trackParentsAndVariations}
          onChange={() => setTrackParentsAndVariations(prevState => !prevState)}
          className={styles.checkbox}
        />

        <Checkbox
          readOnly={false}
          label="Remove Special Characters"
          checked={removeSpecialChars}
          onChange={() => setRemoveSpecialChars(prevState => !prevState)}
          className={styles.checkbox}
        />
      </div>
      <FormFilterActions onFind={handleSubmit} onReset={handleReset} submitLabel="Apply" />
    </section>
  );
};

export default TrackerFilters;
