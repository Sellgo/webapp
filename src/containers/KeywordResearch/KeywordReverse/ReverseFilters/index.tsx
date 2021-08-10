import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import MinMaxFilter from '../../../../components/FormFilters/MinMaxFilter';
import FormFilterActions from '../../../../components/FormFilters/FormFilterActions';
import InputFilter from '../../../../components/FormFilters/InputFilter';

const ReverseFilters = () => {
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(true);

  const handleSubmit = () => {
    console.log('Find');
  };

  const handleReset = () => {
    console.log('Reset');
  };

  return (
    <section className={styles.filterSection}>
      {/* Basic Filters */}
      <div className={styles.basicFilters}>
        {/* Search Volume */}
        <MinMaxFilter
          label="Search Volume"
          minValue="0"
          maxValue="1"
          handleChange={() => {
            console.log('Hello World');
          }}
        />

        {/* Position Rank  */}
        <MinMaxFilter
          label="Position Rank"
          minValue="0"
          maxValue="1"
          handleChange={() => {
            console.log('Hello World');
          }}
        />

        {/* Word  Count  */}
        <MinMaxFilter
          label="Word Count"
          minValue="0"
          maxValue="1"
          handleChange={() => {
            console.log('Hello World');
          }}
        />
      </div>

      {/* Advanced Filters */}
      <div className={styles.advancedFilterWrapper}>
        <div
          className={styles.advancedFilterToggle}
          onClick={() => setShowAdvancedFilter(prevState => !prevState)}
        >
          <span>Advanced Filters</span>
          <span>
            {showAdvancedFilter ? <Icon name="chevron up" /> : <Icon name="chevron down" />}
          </span>
        </div>

        {showAdvancedFilter && (
          <div className={styles.showAdvancedFilter}>
            {/* Sponsored Rank avg*/}
            <MinMaxFilter
              label="Sponsored Rank (avg)"
              minValue="0"
              maxValue="1"
              handleChange={() => {
                console.log('Hello World');
              }}
            />
            {/* Sponsored Rank count */}
            <MinMaxFilter
              label="Sponsored Rank (count)"
              minValue="0"
              maxValue="1"
              handleChange={() => {
                console.log('Hello World');
              }}
            />
            {/* Amz. Recommeneded Rank avg */}
            <MinMaxFilter
              label="Amz Recommended Rank (avg)"
              minValue="0"
              maxValue="1"
              handleChange={() => {
                console.log('Hello World');
              }}
            />
            {/* Amz. Recommeneded Rank count */}
            <MinMaxFilter
              label="Amz Recommended Rank (count)"
              minValue="0"
              maxValue="1"
              handleChange={() => {
                console.log('Hello World');
              }}
            />
            {/* Relative Rank */}
            <MinMaxFilter
              label="Relative Rank"
              minValue="0"
              maxValue="1"
              handleChange={() => {
                console.log('Hello World');
              }}
            />
            {/* Competitor Rank */}
            <MinMaxFilter
              label="Competitor Rank"
              minValue="0"
              maxValue="1"
              handleChange={() => {
                console.log('Hello World');
              }}
            />
            {/* Ranking Competitors */}
            <MinMaxFilter
              label="Ranking Competitors"
              minValue="0"
              maxValue="1"
              handleChange={() => {
                console.log('Hello World');
              }}
            />
            {/* Competitor Performance */}
            <MinMaxFilter
              label="Competitor Performance"
              minValue="0"
              maxValue="1"
              handleChange={() => {
                console.log('Hello World');
              }}
            />
            {/* Competing Products */}
            <MinMaxFilter
              label="Competing Products"
              minValue="0"
              maxValue="1"
              handleChange={() => {
                console.log('Hello World');
              }}
            />
            {/* Search Volumn Trends (30D)  */}
            <MinMaxFilter
              label="Search Volumn Trends (30D)"
              minValue="0"
              maxValue="1"
              handleChange={() => {
                console.log('Hello World');
              }}
            />

            {/* Include Search Terms)  */}
            <InputFilter
              label="Include Search Term"
              value=""
              handleChange={() => console.log('Hello')}
              placeholder="Enter Search Term"
            />

            {/* Exclude Search Terms)  */}
            <InputFilter
              label="Exclude Search Terms"
              value=""
              handleChange={() => console.log('Hello')}
              placeholder="Enter Search Term"
            />
          </div>
        )}
      </div>
      <FormFilterActions onFind={handleSubmit} onReset={handleReset} />
    </section>
  );
};

export default ReverseFilters;
