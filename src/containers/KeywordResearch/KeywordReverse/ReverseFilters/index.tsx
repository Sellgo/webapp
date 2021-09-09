import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Components */
import MinMaxFilter from '../../../../components/FormFilters/MinMaxFilter';
import FormFilterActions from '../../../../components/FormFilters/FormFilterActions';

/* Constants */
import { DEFAULT_MIN_MAX_FILTER } from '../../../../constants/KeywordResearch/KeywordReverse';

/* Actions */
import {
  fetchKeywordReverseTableInformation,
  resetKeywordReverse,
} from '../../../../actions/KeywordResearch/KeywordReverse';

/* Interfaces */
import { KeywordReverseTablePayload } from '../../../../interfaces/KeywordResearch/KeywordReverse';

interface Props {
  fetchKeywordReverseTableInfo: (payload: KeywordReverseTablePayload) => void;
  resetKeywordReverse: () => void;
}

const ReverseFilters = (props: Props) => {
  /* Props */
  const { fetchKeywordReverseTableInfo, resetKeywordReverse } = props;

  const [showAdvancedFilter, setShowAdvancedFilter] = useState(true);

  /* Basic Filters */
  const [searchVolume, setSearchVolume] = useState(DEFAULT_MIN_MAX_FILTER);
  const [positionRank, setPositionRank] = useState(DEFAULT_MIN_MAX_FILTER);

  /* Advanced Filters */
  const [sponsoredAsins, setSponsoredAsins] = useState(DEFAULT_MIN_MAX_FILTER);
  const [sponsoredRank, setSponsoredRank] = useState(DEFAULT_MIN_MAX_FILTER);
  const [competingProducts, setCompetingProducts] = useState(DEFAULT_MIN_MAX_FILTER);
  const [titleDensity, setTitleDensity] = useState(DEFAULT_MIN_MAX_FILTER);

  /* Handle Submit */
  const handleSubmit = () => {
    const filterPayload = {
      searchVolume,
      positionRank,

      /* Advanced Filters */
      sponsoredAsins,
      sponsoredRank,
      competingProducts,
      titleDensity,
    };
    fetchKeywordReverseTableInfo({ filterPayload });
  };

  /* Handle Reset */
  const handleReset = () => {
    setSearchVolume(DEFAULT_MIN_MAX_FILTER);
    setPositionRank(DEFAULT_MIN_MAX_FILTER);

    /* Advanced Filters */
    setSponsoredAsins(DEFAULT_MIN_MAX_FILTER);
    setSponsoredRank(DEFAULT_MIN_MAX_FILTER);
    setCompetingProducts(DEFAULT_MIN_MAX_FILTER);
    setTitleDensity(DEFAULT_MIN_MAX_FILTER);

    resetKeywordReverse();
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
            setSearchVolume(prevState => ({ ...prevState, [type]: value }));
          }}
        />

        {/* Position Rank  */}
        <MinMaxFilter
          label="Position Rank"
          minValue={positionRank.min}
          maxValue={positionRank.max}
          handleChange={(type, value) => {
            setPositionRank(prevState => ({ ...prevState, [type]: value }));
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
            {/* Sponsored ASINs */}
            <MinMaxFilter
              label="Sponsored ASINs"
              minValue={sponsoredAsins.min}
              maxValue={sponsoredAsins.max}
              handleChange={(type, value) => {
                setSponsoredAsins(prevState => ({ ...prevState, [type]: value }));
              }}
            />

            {/* Sponsored Rank */}
            <MinMaxFilter
              label="Sponsored Rank"
              minValue={sponsoredRank.min}
              maxValue={sponsoredRank.max}
              handleChange={(type, value) => {
                setSponsoredRank(prevState => ({ ...prevState, [type]: value }));
              }}
            />

            {/* Competing Products  */}
            <MinMaxFilter
              label="Competing Products"
              minValue={competingProducts.min}
              maxValue={competingProducts.max}
              handleChange={(type, value) => {
                setCompetingProducts(prevState => ({ ...prevState, [type]: value }));
              }}
            />

            {/* Title Density  */}
            <MinMaxFilter
              label="Title Density"
              minValue={titleDensity.min}
              maxValue={titleDensity.max}
              handleChange={(type, value) => {
                setTitleDensity(prevState => ({ ...prevState, [type]: value }));
              }}
            />
          </div>
        )}
      </div>

      <FormFilterActions onFind={handleSubmit} onReset={handleReset} />
    </section>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchKeywordReverseTableInfo: (payload: KeywordReverseTablePayload) =>
      dispatch(fetchKeywordReverseTableInformation(payload)),
    resetKeywordReverse: () => dispatch(resetKeywordReverse()),
  };
};

export default connect(null, mapDispatchToProps)(ReverseFilters);
