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
import { DEFAULT_INCLUDE_EXCLUDE_FILTER } from '../../../../constants/KeywordResearch/KeywordReverse';

const DatabaseFilters = () => {
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(true);

  /* Basic Filters */
  const [searchTerm, setSearchTerm] = useState(DEFAULT_INCLUDE_EXCLUDE_FILTER);

  /* Advanced Filters */
  const [searchVolume, setSearchVolume] = useState(DEFAULT_MIN_MAX_FILTER);
  const [wordCount, setWordCount] = useState(DEFAULT_MIN_MAX_FILTER);
  const [competingProducts, setCompetingProducts] = useState(DEFAULT_MIN_MAX_FILTER);
  const [titleDensity, setTitleDensity] = useState(DEFAULT_MIN_MAX_FILTER);

  /* Handle Reset */
  const handleReset = () => {
    setSearchTerm(DEFAULT_INCLUDE_EXCLUDE_FILTER);
    setSearchVolume(DEFAULT_MIN_MAX_FILTER);
    setWordCount(DEFAULT_MIN_MAX_FILTER);
    setCompetingProducts(DEFAULT_MIN_MAX_FILTER);
    setTitleDensity(DEFAULT_MIN_MAX_FILTER);
  };

  const handleSubmit = () => {
    console.log('Handle submit');
  };

  return (
    <section className={styles.filterSection}>
      {/* Basic Filters */}
      <div className={styles.basicFilters}>
        {/* Include Search Term */}
        <InputFilter
          label="Include Search Term"
          placeholder="Enter Search Term"
          value={searchTerm.include}
          handleChange={value => setSearchTerm(prevState => ({ ...prevState, include: value }))}
        />

        {/* Exclude Search Term */}
        <InputFilter
          label="Exclude Search Term"
          placeholder="Enter Search Term"
          value={searchTerm.exclude}
          handleChange={value => setSearchTerm(prevState => ({ ...prevState, exclude: value }))}
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
