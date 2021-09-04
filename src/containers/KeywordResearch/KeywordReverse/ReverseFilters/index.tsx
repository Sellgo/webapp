import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Components */
import MinMaxFilter from '../../../../components/FormFilters/MinMaxFilter';
import FormFilterActions from '../../../../components/FormFilters/FormFilterActions';
import InputFilter from '../../../../components/FormFilters/InputFilter';

/* Constants */
import {
  DEFAULT_INCLUDE_EXCLUDE_FILTER,
  DEFAULT_MIN_MAX_FILTER,
} from '../../../../constants/KeywordResearch/KeywordReverse';

/* Actions */
import { fetchKeywordReverseTableInformation } from '../../../../actions/KeywordResearch/KeywordReverse';

/* Interfaces */
import { KeywordReverseTablePayload } from '../../../../interfaces/KeywordResearch/KeywordReverse';

interface Props {
  fetchKeywordReverseTableInfo: (payload: KeywordReverseTablePayload) => void;
}

const ReverseFilters = (props: Props) => {
  /* Props */
  const { fetchKeywordReverseTableInfo } = props;

  const [showAdvancedFilter, setShowAdvancedFilter] = useState(true);

  /* Basic Filters */
  const [searchVolume, setSearchVolume] = useState(DEFAULT_MIN_MAX_FILTER);
  const [positionRank, setPositionRank] = useState(DEFAULT_MIN_MAX_FILTER);

  /* Advanced Filters */
  const [sponsoredAsins, setSponsoredAsins] = useState(DEFAULT_MIN_MAX_FILTER);
  const [competingProducts, setCompetitingProducts] = useState(DEFAULT_MIN_MAX_FILTER);
  const [relativeRank, setRelativeRank] = useState(DEFAULT_MIN_MAX_FILTER);
  const [competitorRank, setCompetitorRank] = useState(DEFAULT_MIN_MAX_FILTER);
  const [rankingCompetitors, setRankingCompetitors] = useState(DEFAULT_MIN_MAX_FILTER);
  const [searchTerm, setSearchTerm] = useState(DEFAULT_INCLUDE_EXCLUDE_FILTER);

  /* Handle Submit */
  const handleSubmit = () => {
    const filterPayload = {
      searchVolume,
      positionRank,
      sponsoredAsins,
      competingProducts,
      relativeRank,
      competitorRank,
      rankingCompetitors,
      searchTerm,
    };
    fetchKeywordReverseTableInfo({ filterPayload });
  };

  /* Handle Reset */
  const handleReset = () => {
    fetchKeywordReverseTableInfo({ resetFilter: true });
    setSearchVolume(DEFAULT_MIN_MAX_FILTER);
    setPositionRank(DEFAULT_MIN_MAX_FILTER);
    setSponsoredAsins(DEFAULT_MIN_MAX_FILTER);
    setRelativeRank(DEFAULT_MIN_MAX_FILTER);
    setCompetitorRank(DEFAULT_MIN_MAX_FILTER);
    setRankingCompetitors(DEFAULT_MIN_MAX_FILTER);
    setCompetitingProducts(DEFAULT_MIN_MAX_FILTER);
    setSearchTerm(DEFAULT_INCLUDE_EXCLUDE_FILTER);
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
            {/* Sponsored Rank count */}
            <MinMaxFilter
              label="Sponsored ASINs"
              minValue={sponsoredAsins.min}
              maxValue={sponsoredAsins.max}
              handleChange={(type, value) => {
                setSponsoredAsins(prevState => ({ ...prevState, [type]: value }));
              }}
            />

            {/* Relative Rank */}
            <MinMaxFilter
              label="Relative Rank"
              minValue={relativeRank.min}
              maxValue={relativeRank.max}
              handleChange={(type, value) => {
                setRelativeRank(prevState => ({ ...prevState, [type]: value }));
              }}
            />

            {/* Competitor Rank */}
            <MinMaxFilter
              label="Competitor Rank"
              minValue={competitorRank.min}
              maxValue={competitorRank.max}
              handleChange={(type, value) => {
                setCompetitorRank(prevState => ({ ...prevState, [type]: value }));
              }}
            />

            {/* Ranking Competitors */}
            <MinMaxFilter
              label="Ranking Competitors"
              minValue={rankingCompetitors.min}
              maxValue={rankingCompetitors.max}
              handleChange={(type, value) => {
                setRankingCompetitors(prevState => ({ ...prevState, [type]: value }));
              }}
            />

            {/* Competing Products */}
            <MinMaxFilter
              label="Competing Products"
              minValue={competingProducts.min}
              maxValue={competingProducts.max}
              handleChange={(type, value) => {
                setCompetitingProducts(prevState => ({ ...prevState, [type]: value }));
              }}
            />

            {/* Include Search Terms)  */}
            <InputFilter
              label="Include Search Term"
              value={searchTerm.include}
              handleChange={value => setSearchTerm(prevState => ({ ...prevState, include: value }))}
              placeholder="Enter Search Term"
            />

            {/* Exclude Search Terms)  */}
            <InputFilter
              label="Exclude Search Terms"
              value={searchTerm.exclude}
              handleChange={value => setSearchTerm(prevState => ({ ...prevState, exclude: value }))}
              placeholder="Enter Search Term"
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
  };
};

export default connect(null, mapDispatchToProps)(ReverseFilters);
