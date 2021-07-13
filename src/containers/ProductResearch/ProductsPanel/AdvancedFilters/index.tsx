import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import MinMaxFilter from '../../../../components/FormFilters/MinMaxFilter';
import SelectionFilter from '../../../../components/FormFilters/SelectionFilter';
import InputFilter from '../../../../components/FormFilters/InputFilter';
import CheckboxListFilter from '../../../../components/FormFilters/CheckboxListFilter';

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
      {/* First Row */}
      <MinMaxFilter label="Sales Year Over Year (%)" />
      <MinMaxFilter label="Price Change (%)" />
      <MinMaxFilter label="Sales Change (%)" />
      <SelectionFilter filterOptions={options} label="Best Sales Period" placeholder="Month" />
      <MinMaxFilter label="Sales to Reviews" />
      <MinMaxFilter label="Monthly Sales (units)" />

      {/* Second Row */}
      <MinMaxFilter label="BSR" />
      <MinMaxFilter label="# of Sellers" />
      <MinMaxFilter label="# of Images" />
      <CheckboxListFilter label="Fulfillment" />
      <MinMaxFilter label="Variation Count" />
      <MinMaxFilter label="Weight(lbs)" />

      {/* last Row*/}
      <InputFilter label="Include Title Keywords" placeholder="Enter keywords" />
      <InputFilter label="Exclude Title Keywords" placeholder="Enter keywords" />
      <InputFilter label="Include Brands" placeholder="Enter brands" />
      <InputFilter label="Exclude Brands" placeholder="Enter brands" />
      <InputFilter label="Include Sellers" placeholder="Enter sellers" />
      <InputFilter label="Exclude Sellers" placeholder="Enter sellers" />
    </div>
  );
};

export default AdvancedFilters;
