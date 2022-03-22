import React, { useState } from 'react';

import { connect } from 'react-redux';

/* Stylin */
import styles from './index.module.scss';

/* Constants */
import { DEFAULT_MIN_MAX_FILTER } from '../../../../constants/KeywordResearch/KeywordDatabase';
import { DEFAULT_INCLUDE_EXCLUDE_FILTER } from '../../../../constants/KeywordResearch/KeywordReverse';

/* Actions */
import {
  fetchKeywordDatabaseTableInformation,
  resetKeywordDatabase,
} from '../../../../actions/KeywordResearch/KeywordDatabase';

/* Selectors */
import {
  getIsLoadingkeywordDatabaseTable,
  getShouldFetchkeywordDatabaseProgress,
} from '../../../../selectors/KeywordResearch/KeywordDatabase';

/* Components */
import AdvanceFilterToggle from '../../../../components/AdvanceFilterToggle';
import InputFilter from '../../../../components/FormFilters/InputFilter';
import MinMaxFilter from '../../../../components/FormFilters/MinMaxFilter';
import FormFilterActions from '../../../../components/FormFilters/FormFilterActions';
import CheckboxFilter from '../../../../components/FormFilters/CheckboxFilter';

/* Interfaces */
import { KeywordDatabaseTablePayload } from '../../../../interfaces/KeywordResearch/KeywordDatabase';

interface Props {
  fetchKeywordDatabaseTableInfo: (payload: KeywordDatabaseTablePayload) => void;
  resetKeywordDatabase: () => void;
  isLoadingKeywordDatabaseTable: boolean;
  shouldFetchKeywordDatabaseProgress: boolean;
}

const DatabaseFilters = (props: Props) => {
  const {
    fetchKeywordDatabaseTableInfo,
    resetKeywordDatabase,
    isLoadingKeywordDatabaseTable,
    shouldFetchKeywordDatabaseProgress,
  } = props;

  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);

  /* Basic Filters */
  const [searchVolume, setSearchVolume] = useState(DEFAULT_MIN_MAX_FILTER);
  const [wordCount, setWordCount] = useState(DEFAULT_MIN_MAX_FILTER);
  const [competingProducts, setCompetitingProducts] = useState(DEFAULT_MIN_MAX_FILTER);
  const [titleDensity, setTitleDensity] = useState(DEFAULT_MIN_MAX_FILTER);
  const [amazonChoice, setAmazonChoice] = useState(false);

  /* Advanced Filters */
  const [searchTerm, setSearchTerm] = useState(DEFAULT_INCLUDE_EXCLUDE_FILTER);
  const [matchKeywords, setMatchKeywords] = useState(false);

  React.useEffect(() => {
    if (shouldFetchKeywordDatabaseProgress || isLoadingKeywordDatabaseTable) {
      setShowAdvancedFilter(false);
    }
  }, [shouldFetchKeywordDatabaseProgress, isLoadingKeywordDatabaseTable]);

  /* Handle Reset */
  const handleReset = () => {
    /* Basic Filters */
    setSearchVolume(DEFAULT_MIN_MAX_FILTER);
    setWordCount(DEFAULT_MIN_MAX_FILTER);
    setCompetitingProducts(DEFAULT_MIN_MAX_FILTER);
    setTitleDensity(DEFAULT_MIN_MAX_FILTER);
    setAmazonChoice(false);

    /* Advanced Filters */
    setSearchTerm(DEFAULT_INCLUDE_EXCLUDE_FILTER);
    setMatchKeywords(false);

    resetKeywordDatabase();
  };

  const handleSubmit = () => {
    const filterPayload = {
      /* Basic Filters */
      searchVolume,
      wordCount,
      competingProducts,
      titleDensity,
      amazonChoice: amazonChoice ? 'true' : '',

      /* Advanced Filters */
      searchTerm,
      matchKeywords,
    };
    fetchKeywordDatabaseTableInfo({ filterPayload });
  };

  return (
    <section className={styles.filterSection}>
      {/* Advanced Filters */}
      <div className={styles.advancedFilterWrapper}>
        <AdvanceFilterToggle
          handleClick={() => setShowAdvancedFilter(prevState => !prevState)}
          showAdvancedFilter={showAdvancedFilter}
        />

        {showAdvancedFilter && (
          <>
            <div className={styles.showAdvancedFilter}>
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

              {/* Amazon choice filter */}
              <CheckboxFilter
                label="Amazon Choice"
                checkboxLabel="Amazon Choice"
                checked={amazonChoice}
                handleChange={val => setAmazonChoice(val)}
              />

              {/* Include Search Terms)  */}
              <div>
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

                <CheckboxFilter
                  checkboxLabel="Match keyword"
                  checked={matchKeywords}
                  handleChange={value => setMatchKeywords(value)}
                />
              </div>

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
            <FormFilterActions
              className={styles.formSubmit}
              onFind={handleSubmit}
              onReset={handleReset}
              submitLabel="Apply"
            />
          </>
        )}
      </div>
    </section>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isLoadingKeywordDatabaseTable: getIsLoadingkeywordDatabaseTable(state),
    shouldFetchKeywordDatabaseProgress: getShouldFetchkeywordDatabaseProgress(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchKeywordDatabaseTableInfo: (payload: KeywordDatabaseTablePayload) =>
      dispatch(fetchKeywordDatabaseTableInformation(payload)),
    resetKeywordDatabase: () => dispatch(resetKeywordDatabase()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseFilters);
