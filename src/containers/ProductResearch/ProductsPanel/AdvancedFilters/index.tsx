import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import MinMaxFilter from '../../../../components/FormFilters/MinMaxFilter';
import SelectionFilter from '../../../../components/FormFilters/SelectionFilter';

const options = [
  {
    key: 'January',
    text: 'January',
    value: 'Januaray',
  },
  {
    key: 'February',
    text: 'February',
    value: 'February',
  },
];

const AdvancedFilters = () => {
  return (
    <div className={styles.advancedFiltersOptions}>
      <MinMaxFilter label="Sales Year Over Year (%)" />
      <MinMaxFilter label="Price Change (%)" />
      <MinMaxFilter label="Sales Change (%)" />
      <MinMaxFilter label="Sales Year Over Year (%)" />
      <SelectionFilter filterOptions={options} label="Best Sales Period" placeholder="Month" />
      <MinMaxFilter label="Sales to Reviews" />
      <MinMaxFilter label="Monthly Sales (units)" />
      <MinMaxFilter label="BSR" />
      <MinMaxFilter label="# of Sellers" />
      <MinMaxFilter label="# of Images" />
      <MinMaxFilter label="Variation Count" />
      <MinMaxFilter label="Weight(lbs)" />
      <MinMaxFilter label="Weight(lbs)" />
    </div>
  );
};

export default AdvancedFilters;
