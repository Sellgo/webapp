import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Assets */
import MinMaxFilter from '../../../../components/Filters/MinMaxFilter';

const BasicFilters = () => {
  return (
    <div className={styles.basicFilters}>
      <MinMaxFilter label="Monthly Revenue" />
      <MinMaxFilter label="Price" />
      <MinMaxFilter label="Review Count" />
      <MinMaxFilter label="Review Rating" />
    </div>
  );
};

export default BasicFilters;
