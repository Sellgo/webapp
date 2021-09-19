import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Components */
import InputFilter from '../../../../components/FormFilters/InputFilter';
import MinMaxFilter from '../../../../components/FormFilters/MinMaxFilter';
import FormFilterActions from '../../../../components/FormFilters/FormFilterActions';

/* Constants */
import { DEFAULT_MIN_MAX_FILTER } from '../../../../constants/KeywordResearch/KeywordDatabase';
import { DEFAULT_INCLUDE_EXCLUDE_FILTER } from '../../../../constants/KeywordResearch/KeywordReverse';

/* Actions */
import {
  fetchKeywordDatabaseTableInformation,
  resetKeywordDatabase,
} from '../../../../actions/KeywordResearch/KeywordDatabase';

/* Interfaces */
import { KeywordDatabaseTablePayload } from '../../../../interfaces/KeywordResearch/KeywordDatabase';

interface Props {
  fetchKeywordDatabaseTableInfo: (payload: KeywordDatabaseTablePayload) => void;
  resetKeywordDatabase: () => void;
}

const DatabaseFilters = (props: Props) => {
  const { fetchKeywordDatabaseTableInfo, resetKeywordDatabase } = props;

  const [showAdvancedFilter, setShowAdvancedFilter] = useState(true);

  /* Basic Filters */
  const [searchVolume, setSearchVolume] = useState(DEFAULT_MIN_MAX_FILTER);
  const [wordCount, setWordCount] = useState(DEFAULT_MIN_MAX_FILTER);
  const [competingProducts, setCompetitingProducts] = useState(DEFAULT_MIN_MAX_FILTER);
  const [titleDensity, setTitleDensity] = useState(DEFAULT_MIN_MAX_FILTER);
  // const [amazonChoice, setAmazonChoice] = useState<boolean>(false);

  /* Advanced Filters */
  const [searchTerm, setSearchTerm] = useState(DEFAULT_INCLUDE_EXCLUDE_FILTER);

  /* Handle Reset */
  const handleReset = () => {
    /* Basic Filters */
    setSearchVolume(DEFAULT_MIN_MAX_FILTER);
    setWordCount(DEFAULT_MIN_MAX_FILTER);
    setCompetitingProducts(DEFAULT_MIN_MAX_FILTER);
    setTitleDensity(DEFAULT_MIN_MAX_FILTER);

    /* Advanced Filters */
    setSearchTerm(DEFAULT_INCLUDE_EXCLUDE_FILTER);

    resetKeywordDatabase();
  };

  const handleSubmit = () => {
    const filterPayload = {
      /* Basic Filters */
      searchVolume,
      wordCount,
      competingProducts,
      titleDensity,

      /* Advanced Filters */
      searchTerm,
    };
    fetchKeywordDatabaseTableInfo({ filterPayload });
  };

  return (
    <section className={styles.filterSection}>
      {/* Basic Filters */}
      <div className={styles.basicFilters}>
        {/* Search Volume */}
        <MinMaxFilter
          label="Search Volume"
          minValue={searchVolume.min}
          maxValue={searchVolume.max}
          handleChange={(type, value) => {
            setSearchVolume(prevState => ({
              ...prevState,
              [type]: value,
            }));
          }}
        />
        {/* Word Count  */}
        <MinMaxFilter
          label="Word Count"
          minValue={wordCount.min}
          maxValue={wordCount.max}
          handleChange={(type, value) => {
            setWordCount(prevState => ({
              ...prevState,
              [type]: value,
            }));
          }}
        />
        {/* Competing Products */}
        <MinMaxFilter
          label="Competing Products"
          minValue={competingProducts.min}
          maxValue={competingProducts.max}
          handleChange={(type, value) => {
            setCompetitingProducts(prevState => ({
              ...prevState,
              [type]: value,
            }));
          }}
        />
        {/* Title Density */}
        <MinMaxFilter
          label="Title Density"
          minValue={titleDensity.min}
          maxValue={titleDensity.max}
          handleChange={(type, value) => {
            setTitleDensity(prevState => ({
              ...prevState,
              [type]: value,
            }));
          }}
        />

        {/* Amazon Choice
        <CheckboxFilter
          label="Amazon Choice"
          checkboxLabel="Amazon Choice"
          checked={amazonChoice}
          handleChange={(data: boolean) => {
            setAmazonChoice(data);
          }}
        /> */}
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
            {/* Include Search Terms)  */}
            <InputFilter
              label="Include Search Terms that contain"
              value={searchTerm.include}
              handleChange={value =>
                setSearchTerm(prevState => ({
                  ...prevState,
                  include: value,
                }))
              }
              placeholder="Enter words"
              className={styles.longInput}
            />

            {/* Exclude Search Terms)  */}
            <InputFilter
              label="Exclude Search Terms that contain"
              value={searchTerm.exclude}
              handleChange={value =>
                setSearchTerm(prevState => ({
                  ...prevState,
                  exclude: value,
                }))
              }
              placeholder="Enter words"
              className={styles.longInput}
            />
          </div>
        )}
      </div>

      <FormFilterActions onFind={handleSubmit} onReset={handleReset} submitLabel="Apply" />
    </section>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchKeywordDatabaseTableInfo: (payload: KeywordDatabaseTablePayload) =>
      dispatch(fetchKeywordDatabaseTableInformation(payload)),
    resetKeywordDatabase: () => dispatch(resetKeywordDatabase()),
  };
};

export default connect(null, mapDispatchToProps)(DatabaseFilters);
