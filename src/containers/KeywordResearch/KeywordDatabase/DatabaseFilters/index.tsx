import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import InputFilter from '../../../../components/FormFilters/InputFilter';
import MinMaxFilter from '../../../../components/FormFilters/MinMaxFilter';
import FormFilterActions from '../../../../components/FormFilters/FormFilterActions';

/* Constants */
import { DEFAULT_MIN_MAX_FILTER } from '../../../../constants/KeywordResearch/KeywordDatabase';

const DatabaseFilters = () => {
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(true);

  /* Basic Filters */
  const [keywords, setKeywords] = useState('');

  /* Advanced Filters */
  const [searchVolume, setSearchVolume] = useState(DEFAULT_MIN_MAX_FILTER);
  const [wordCount, setWordCount] = useState(DEFAULT_MIN_MAX_FILTER);
  const [competingProducts, setCompetingProducts] = useState(DEFAULT_MIN_MAX_FILTER);
  const [titleDensity, setTitleDensity] = useState(DEFAULT_MIN_MAX_FILTER);

  /* Handle Reset */
  const handleReset = () => {
    console.log('Clicked Reset');
  };

  const handleSubmit = () => {
    console.log('Handle submit');
  };

  return (
    <section className={styles.filterSection}>
      {/* Basic Filters */}
      <div className={styles.basicFilters}>
        {/* Keywords */}
        <InputFilter
          label="Keywords"
          placeholder="Enter Keywords seperated by comma"
          value={keywords}
          handleChange={value => setKeywords(value)}
          className={styles.longInput}
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
            {/* Search Volume */}
            <MinMaxFilter
              label="Search Volume"
              minValue={searchVolume.min}
              maxValue={searchVolume.max}
              handleChange={(type, value) =>
                setSearchVolume(prevState => ({ ...prevState, [type]: value }))
              }
            />

            {/* Word Count */}
            <MinMaxFilter
              label="Word Count"
              minValue={wordCount.min}
              maxValue={wordCount.max}
              handleChange={(type, value) =>
                setWordCount(prevState => ({ ...prevState, [type]: value }))
              }
            />

            {/* Competing Products */}
            <MinMaxFilter
              label="Competing Products"
              minValue={competingProducts.min}
              maxValue={competingProducts.max}
              handleChange={(type, value) =>
                setCompetingProducts(prevState => ({ ...prevState, [type]: value }))
              }
            />

            {/* Title Density */}
            <MinMaxFilter
              label="Title Density"
              minValue={titleDensity.min}
              maxValue={titleDensity.max}
              handleChange={(type, value) =>
                setTitleDensity(prevState => ({ ...prevState, [type]: value }))
              }
            />
          </div>
        )}
      </div>

      <FormFilterActions onFind={handleSubmit} onReset={handleReset} submitLabel="Apply" />
    </section>
  );
};

export default DatabaseFilters;
