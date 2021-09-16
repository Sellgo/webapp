import React, { useState } from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import FormFilterActions from '../../../../components/FormFilters/FormFilterActions';
import InputFilter from '../../../../components/FormFilters/InputFilter';

const InventoryFilters = () => {
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = () => {
    console.log('Handle Submit');
  };

  const handleReset = () => {
    console.log('Handle Reset');
  };

  return (
    <section className={styles.filterSection}>
      <div className={styles.basicFilters}>
        {/* Search Input  */}
        <InputFilter
          label="Amazon Link"
          placeholder="Insert Amazon Links or ASINs or Seller IDs"
          value={searchInput}
          handleChange={value => setSearchInput(value)}
          className={styles.longInput}
        />
      </div>

      <FormFilterActions onFind={handleSubmit} onReset={handleReset} submitLabel="Search" />
    </section>
  );
};

export default InventoryFilters;
