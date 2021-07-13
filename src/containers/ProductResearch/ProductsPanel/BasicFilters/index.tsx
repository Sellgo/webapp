import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import MinMaxFilter from '../../../../components/FormFilters/MinMaxFilter';
import SelectionFilter from '../../../../components/FormFilters/SelectionFilter';

const options = [
  {
    key: 'Justen Kitsune',
    text: 'Justen Kitsune',
    value: 'Justen Kitsune',
  },
  {
    key: 'Matt',
    text: 'Matt',
    value: 'Matt',
  },
];

const BasicFilters = () => {
  return (
    <div className={styles.basicFilters}>
      <SelectionFilter filterOptions={options} label="Categories" placeholder="Categories" />
      <MinMaxFilter label="Monthly Revenue" />
      <MinMaxFilter label="Price" />
      <MinMaxFilter label="Review Count" />
      <MinMaxFilter label="Review Rating" />
      <SelectionFilter filterOptions={options} label="Shipping Size Tier" placeholder="Size Tier" />
    </div>
  );
};

export default BasicFilters;
