import React, { useState } from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Constants */
import { DEFAULT_MIN_MAX_FILTER } from '../../../../constants/KeywordResearch/KeywordReverse';

/* Selectors */
import { getKeywordReverseProductsList } from '../../../../selectors/KeywordResearch/KeywordReverse';
import { getUserOnboardingResources } from '../../../../selectors/UserOnboarding';

/* Actions */
import {
  fetchKeywordReverseTableInformation,
  resetKeywordReverse,
} from '../../../../actions/KeywordResearch/KeywordReverse';

/* Components */
import MinMaxFilter from '../../../../components/FormFilters/MinMaxFilter';
import FormFilterActions from '../../../../components/FormFilters/FormFilterActions';
import AdvanceFilterToggle from '../../../../components/AdvanceFilterToggle';

/* Interfaces */
import {
  KeywordReverseAsinProduct,
  KeywordReverseTablePayload,
} from '../../../../interfaces/KeywordResearch/KeywordReverse';

interface Props {
  keywordReverseProductsList: KeywordReverseAsinProduct[];

  fetchKeywordReverseTableInfo: (payload: KeywordReverseTablePayload) => void;
  resetKeywordReverse: () => void;
}

const ReverseFilters = (props: Props) => {
  /* Props */
  const { fetchKeywordReverseTableInfo, resetKeywordReverse, keywordReverseProductsList } = props;

  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);

  /* Basic Filters */
  const [searchVolume, setSearchVolume] = useState(DEFAULT_MIN_MAX_FILTER);
  const [organicRank, setOrganicRank] = useState(DEFAULT_MIN_MAX_FILTER);
  const [positionRank, setPositionRank] = useState(DEFAULT_MIN_MAX_FILTER);

  /* Advanced Filters */
  const [sponsoredAsins, setSponsoredAsins] = useState(DEFAULT_MIN_MAX_FILTER);
  const [competingProducts, setCompetingProducts] = useState(DEFAULT_MIN_MAX_FILTER);
  const [titleDensity, setTitleDensity] = useState(DEFAULT_MIN_MAX_FILTER);

  const [sponsoredRank, setSponsoredRank] = useState(DEFAULT_MIN_MAX_FILTER);
  const [sponsoredRankAvg, setSponsoredRankAvg] = useState(DEFAULT_MIN_MAX_FILTER);
  const [sponsoredRankCount, setSponsoredRankCount] = useState(DEFAULT_MIN_MAX_FILTER);

  const singleAsinOnReverse = keywordReverseProductsList && keywordReverseProductsList.length === 1;

  /* Handle Submit */
  const handleSubmit = () => {
    const filterPayload = {
      searchVolume,
      organicRank,
      positionRank,

      /* Advanced Filters */
      sponsoredAsins,
      competingProducts,
      titleDensity,

      sponsoredRank,
      sponsoredRankAvg,
      sponsoredRankCount,
    };
    fetchKeywordReverseTableInfo({ filterPayload });
  };

  /* Handle Reset */
  const handleReset = () => {
    setSearchVolume(DEFAULT_MIN_MAX_FILTER);
    setOrganicRank(DEFAULT_MIN_MAX_FILTER);
    setPositionRank(DEFAULT_MIN_MAX_FILTER);

    /* Advanced Filters */
    setSponsoredAsins(DEFAULT_MIN_MAX_FILTER);
    setCompetingProducts(DEFAULT_MIN_MAX_FILTER);
    setTitleDensity(DEFAULT_MIN_MAX_FILTER);

    setSponsoredRank(DEFAULT_MIN_MAX_FILTER);
    setSponsoredRankAvg(DEFAULT_MIN_MAX_FILTER);
    setSponsoredRankCount(DEFAULT_MIN_MAX_FILTER);

    resetKeywordReverse();
  };

  return (
    <section className={styles.filterSection}>
      <div className={styles.advancedFilterWrapper}>
        <AdvanceFilterToggle
          handleClick={() => setShowAdvancedFilter(prevState => !prevState)}
          showAdvancedFilter={showAdvancedFilter}
        />

        {showAdvancedFilter && (
          <div className={styles.showAdvancedFilter}>
            {/* Search Volume */}
            <MinMaxFilter
              label="Search Volume"
              minValue={searchVolume.min}
              maxValue={searchVolume.max}
              handleChange={(type, value) => {
                setSearchVolume(prevState => ({ ...prevState, [type]: value }));
              }}
            />

            {/* Show different filters based on asin count */}

            {singleAsinOnReverse ? (
              <>
                {/* Organic Rank */}
                <MinMaxFilter
                  label="Organic Rank"
                  minValue={organicRank.min}
                  maxValue={organicRank.max}
                  handleChange={(type, value) => {
                    setOrganicRank(prevState => ({ ...prevState, [type]: value }));
                  }}
                />
              </>
            ) : (
              <>
                {/* Position Rank */}
                <MinMaxFilter
                  label="Position Rank"
                  minValue={positionRank.min}
                  maxValue={positionRank.max}
                  handleChange={(type, value) => {
                    setPositionRank(prevState => ({ ...prevState, [type]: value }));
                  }}
                />
              </>
            )}

            {/* Sponsored ASINs */}
            <MinMaxFilter
              label="Sponsored ASINs"
              minValue={sponsoredAsins.min}
              maxValue={sponsoredAsins.max}
              handleChange={(type, value) => {
                setSponsoredAsins(prevState => ({ ...prevState, [type]: value }));
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

            {singleAsinOnReverse ? (
              <>
                {/* Sponsored Rank */}
                <MinMaxFilter
                  label="Sponsored Rank"
                  minValue={sponsoredRank.min}
                  maxValue={sponsoredRank.max}
                  handleChange={(type, value) => {
                    setSponsoredRank(prevState => ({ ...prevState, [type]: value }));
                  }}
                />
              </>
            ) : (
              <>
                {/* Sponsored Rank  (avg) */}
                <MinMaxFilter
                  label="Sponsored Rank (avg)"
                  minValue={sponsoredRankAvg.min}
                  maxValue={sponsoredRankAvg.max}
                  handleChange={(type, value) => {
                    setSponsoredRankAvg(prevState => ({ ...prevState, [type]: value }));
                  }}
                />

                {/* Sponsored Rank  (#) */}
                <MinMaxFilter
                  label="Sponsored Rank (#)"
                  minValue={sponsoredRankCount.min}
                  maxValue={sponsoredRankCount.max}
                  handleChange={(type, value) => {
                    setSponsoredRankCount(prevState => ({ ...prevState, [type]: value }));
                  }}
                />
              </>
            )}
          </div>
        )}
      </div>

      <FormFilterActions onFind={handleSubmit} onReset={handleReset} />
    </section>
  );
};

const mapStateToProps = (state: any) => {
  return {
    keywordReverseProductsList: getKeywordReverseProductsList(state),
    userOnboardingResources: getUserOnboardingResources(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchKeywordReverseTableInfo: (payload: KeywordReverseTablePayload) =>
      dispatch(fetchKeywordReverseTableInformation(payload)),
    resetKeywordReverse: () => dispatch(resetKeywordReverse()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReverseFilters);
