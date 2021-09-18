import React, { useState, useEffect, useMemo } from 'react';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Actions */
import { fetchSellerDatabase } from '../../../../actions/SellerResearch/SellerDatabase';

/* Interfaces */
import {
  MarketplaceOption,
  SellerDatabasePayload,
} from '../../../../interfaces/SellerResearch/SellerDatabase';

/* Constants */
import {
  DEFAULT_INCLUDE_EXCLUDE_ERROR,
  DEFAULT_INCLUDE_EXCLUDE_FILTER,
  DEFAULT_MIN_MAX_FILTER,
  DEFAULT_MIN_MAX_PERIOD_FILTER,
  FILTER_PERIOD_DURATIONS,
  DEFAULT_US_MARKET,
  SELLER_DB_MARKETPLACE,
  FILTER_REVIEW_OPTIONS,
  DEFAULT_MIN_MAX_PERIOD_REVIEW,
  GROWTH_COUNT_PERIOD_OPTIONS,
  GROWTH_PERCENT_PERIOD_OPTIONS,
  DEFAULT_GROWTH_PERCENT_FILTER,
  DEFAULT_GROWTH_COUNT_FILTER,
} from '../../../../constants/SellerResearch/SellerDatabase';

import { isValidAmazonSellerId, isValidAsin } from '../../../../constants';

/* Components */
import InputFilter from '../../../../components/FormFilters/InputFilter';
import FormFilterActions from '../../../../components/FormFilters/FormFilterActions';
import MinMaxFilter from '../../../../components/FormFilters/MinMaxFilter';
import PeriodFilter from '../../../../components/FormFilters/PeriodFilter';
import MarketPlaceFilter from '../../../../components/FormFilters/MarketPlaceFilter';
import MinMaxRatingsFilter from '../../../../components/FormFilters/MinMaxRatingsFilter';
import ReviewTypeFilter from '../../../../components/FormFilters/ReviewTypeFilter';
import CheckboxDropdownFilter from '../../../../components/FormFilters/CheckboxDropdownFilter';
import { PRODUCTS_DATABASE_CATEGORIES } from '../../../../constants/ProductResearch/ProductsDatabase';

interface Props {
  fetchSellerDatabase: (payload: SellerDatabasePayload) => void;
}

const SellerDatabaseFilters = (props: Props) => {
  const { fetchSellerDatabase } = props;

  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);

  /* Basic Filters */
  const [marketPlace, setMarketPlace] = useState<MarketplaceOption>(DEFAULT_US_MARKET);

  const [merchantName, setMerchantName] = useState<string>('');
  const [asins, setAsins] = useState(DEFAULT_INCLUDE_EXCLUDE_FILTER);
  const [sellerIds, setSellerIds] = useState(DEFAULT_INCLUDE_EXCLUDE_FILTER);

  /* Advanced Filters */
  const [businessName, setBusinessName] = useState<string>('');
  const [brands, setBrands] = useState(DEFAULT_INCLUDE_EXCLUDE_FILTER);

  const [categories, setCategories] = useState<string[]>([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState(DEFAULT_MIN_MAX_FILTER);

  const [growthPercent, setGrowthPercent] = useState(DEFAULT_GROWTH_PERCENT_FILTER);
  const [growthCount, setGrowthCount] = useState(DEFAULT_GROWTH_COUNT_FILTER);

  const [reviewCount, setReviewCount] = useState(DEFAULT_MIN_MAX_PERIOD_FILTER);
  const [fbaPercent, setFbaPercent] = useState(DEFAULT_MIN_MAX_FILTER);

  const [sellerRatings, setSellerRatings] = useState(DEFAULT_MIN_MAX_FILTER);
  const [review, setReview] = useState(DEFAULT_MIN_MAX_PERIOD_REVIEW);

  /* Error States */
  const [asinsError, setAsinsError] = useState(DEFAULT_INCLUDE_EXCLUDE_ERROR);
  const [sellerIdsError, setSellerIdsError] = useState(DEFAULT_INCLUDE_EXCLUDE_ERROR);

  /* Handlers */
  const handleSubmit = () => {
    const filterPayload = {
      merchantName,
      asins,
      sellerIds,

      /* Advanced Filters */
      businessName,
      brands,

      categories,
      monthlyRevenue,

      growthPercent,
      growthCount,

      reviewCount,
      fbaPercent,

      sellerRatings,
      review,
    };

    fetchSellerDatabase({ filterPayload, marketplaceId: marketPlace.value });
  };

  const handleReset = () => {
    setMarketPlace(DEFAULT_US_MARKET);

    setMerchantName('');
    setAsins(DEFAULT_INCLUDE_EXCLUDE_FILTER);
    setSellerIds(DEFAULT_INCLUDE_EXCLUDE_FILTER);

    /* Advaced Filters */
    setBusinessName('');
    setBrands(DEFAULT_INCLUDE_EXCLUDE_FILTER);

    setCategories([]);
    setMonthlyRevenue(DEFAULT_MIN_MAX_FILTER);

    setGrowthPercent(DEFAULT_GROWTH_PERCENT_FILTER);
    setGrowthCount(DEFAULT_GROWTH_COUNT_FILTER);

    setReviewCount(DEFAULT_MIN_MAX_PERIOD_FILTER);
    setFbaPercent(DEFAULT_MIN_MAX_FILTER);

    setSellerRatings(DEFAULT_MIN_MAX_FILTER);

    setReview(DEFAULT_MIN_MAX_PERIOD_REVIEW);

    /* Reset Error States */
    setAsinsError(DEFAULT_INCLUDE_EXCLUDE_ERROR);

    fetchSellerDatabase({ resetFilter: true });
  };

  /* Effect on component mount */
  useEffect(() => {
    handleReset();

    return () => {
      handleReset();
    };
  }, []);

  /* Include Asin validation check */
  useEffect(() => {
    if (asins.include) {
      const asinList = asins.include.split(',');
      const isValidAsinList = asinList.every((asin: string) => isValidAsin(asin));
      setAsinsError(prevState => ({
        ...prevState,
        include: !isValidAsinList,
      }));
    } else {
      setAsinsError(prevState => ({
        ...prevState,
        include: false,
      }));
    }
  }, [asins.include]);

  /* Exclude Asin validation check */
  useEffect(() => {
    if (asins.exclude) {
      const asinList = asins.exclude.split(',');
      const isValidAsinList = asinList.every((asin: string) => isValidAsin(asin));
      setAsinsError(prevState => ({
        ...prevState,
        exclude: !isValidAsinList,
      }));
    } else {
      setAsinsError(prevState => ({
        ...prevState,
        exclude: false,
      }));
    }
  }, [asins.exclude]);

  /* Include Seller ID validation check */
  useEffect(() => {
    if (sellerIds.include) {
      const sellerIdList = sellerIds.include.split(',');
      const isValidSellerIdsList = sellerIdList.every((sellerid: string) =>
        isValidAmazonSellerId(sellerid)
      );
      setSellerIdsError(prevState => ({
        ...prevState,
        include: !isValidSellerIdsList,
      }));
    } else {
      setSellerIdsError(prevState => ({
        ...prevState,
        include: false,
      }));
    }
  }, [sellerIds.include]);

  /* Include Seller ID validation check */
  useEffect(() => {
    if (sellerIds.exclude) {
      const sellerIdList = sellerIds.exclude.split(',');
      const isVliadSellerIdsList = sellerIdList.every((sellerid: string) =>
        isValidAmazonSellerId(sellerid)
      );
      setSellerIdsError(prevState => ({
        ...prevState,
        exclude: !isVliadSellerIdsList,
      }));
    } else {
      setSellerIdsError(prevState => ({
        ...prevState,
        exclude: false,
      }));
    }
  }, [sellerIds.exclude]);

  /* Overall form submit diable condition */
  const disableFormSubmit = useMemo(() => {
    const shouldDisabledFormSubmit =
      asinsError.include || asinsError.exclude || sellerIdsError.include || sellerIdsError.exclude;

    return shouldDisabledFormSubmit;
  }, [asinsError.include, asinsError.exclude, sellerIdsError.include, sellerIdsError.exclude]);

  return (
    <>
      <section className={styles.filterSection}>
        <div className={styles.basicFilters}>
          {/* Marketplace */}
          <MarketPlaceFilter
            label="Choose Marketplace"
            marketplaceDetails={marketPlace}
            marketPlaceChoices={SELLER_DB_MARKETPLACE}
            handleChange={(option: MarketplaceOption) => {
              setMarketPlace(option);
            }}
          />

          {/* Merchant Name */}
          <InputFilter
            label="Merchant Name"
            placeholder="Merchant Name"
            value={merchantName}
            handleChange={(value: string) => setMerchantName(value)}
          />

          {/* Include ASINS */}
          <InputFilter
            label="Include ASINs or ISBNs"
            placeholder="Enter separated by comma"
            value={asins.include.toUpperCase()}
            handleChange={(value: string) =>
              setAsins(prevState => ({
                ...prevState,
                include: value,
              }))
            }
            error={asinsError.include}
          />

          {/* Exclude ASINS Name */}
          <InputFilter
            label="Exclude ASINs or ISBNs"
            placeholder="Enter separated by comma"
            value={asins.exclude.toUpperCase()}
            handleChange={(value: string) =>
              setAsins(prevState => ({
                ...prevState,
                exclude: value,
              }))
            }
            error={asinsError.exclude}
          />

          {/* Include Seller IDs */}
          <InputFilter
            label="Include Seller IDs"
            placeholder="Enter separated by comma"
            value={sellerIds.include.toUpperCase()}
            handleChange={(value: string) =>
              setSellerIds(prevState => ({
                ...prevState,
                include: value,
              }))
            }
            error={sellerIdsError.include}
          />

          {/* Exclude Seller IDS */}
          <InputFilter
            label="Exclude Seller IDs"
            placeholder="Enter separated by comma"
            value={sellerIds.exclude.toUpperCase()}
            handleChange={(value: string) =>
              setSellerIds(prevState => ({
                ...prevState,
                exclude: value,
              }))
            }
            error={sellerIdsError.exclude}
          />
        </div>

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
              {/* Business name */}
              <InputFilter
                label="Business Name"
                placeholder="Business Name"
                value={businessName}
                handleChange={(value: string) => setBusinessName(value)}
              />

              {/*  Include brands */}
              <InputFilter
                label="Include Brands"
                placeholder="Enter separated by comma"
                value={brands.include}
                handleChange={(value: string) =>
                  setBrands(prevState => ({
                    ...prevState,
                    include: value,
                  }))
                }
              />

              {/* Exclude brands */}
              <InputFilter
                label="Exclude Brands"
                placeholder="Enter separated by comma"
                value={brands.exclude}
                handleChange={(value: string) =>
                  setBrands(prevState => ({
                    ...prevState,
                    exclude: value,
                  }))
                }
              />

              {/* Categories */}
              <CheckboxDropdownFilter
                filterOptions={PRODUCTS_DATABASE_CATEGORIES}
                label="Categories"
                selectedValues={categories}
                handleChange={(newCategories: string[]) => {
                  setCategories([...newCategories]);
                }}
              />

              {/* Monthly Revenue = Sales Estimate */}
              <MinMaxFilter
                label="Monthly Revenue"
                minValue={monthlyRevenue.min}
                maxValue={monthlyRevenue.max}
                handleChange={(type: string, value: string) =>
                  setMonthlyRevenue(prevState => ({
                    ...prevState,
                    [type]: value,
                  }))
                }
                prependWith={marketPlace.currency}
              />

              {/* Growth % */}
              <div className={styles.groupFilters}>
                <MinMaxFilter
                  label="Growth %"
                  minValue={growthPercent.min}
                  maxValue={growthPercent.max}
                  handleChange={(type: string, value: string) =>
                    setGrowthPercent(prevState => ({
                      ...prevState,
                      [type]: value,
                    }))
                  }
                  appendWith="%"
                />

                <PeriodFilter
                  placeholder="30D"
                  label="Period"
                  className={styles.filterPeriod}
                  value={growthPercent.period}
                  filterOptions={GROWTH_PERCENT_PERIOD_OPTIONS}
                  handleChange={(period: string) => {
                    setGrowthPercent(prevState => ({
                      ...prevState,
                      period,
                    }));
                  }}
                />
              </div>

              {/* Growth Count */}
              <div className={styles.groupFilters}>
                <MinMaxFilter
                  label="Growth Count"
                  minValue={growthCount.min}
                  maxValue={growthCount.max}
                  handleChange={(type: string, value: string) =>
                    setGrowthCount(prevState => ({
                      ...prevState,
                      [type]: value,
                    }))
                  }
                />
                <PeriodFilter
                  placeholder="30D"
                  label="Period"
                  className={styles.filterPeriod}
                  value={growthCount.period}
                  filterOptions={GROWTH_COUNT_PERIOD_OPTIONS}
                  handleChange={(period: string) => {
                    setGrowthCount(prevState => ({
                      ...prevState,
                      period,
                    }));
                  }}
                />
              </div>

              {/* Review Count */}
              <div className={styles.groupFilters}>
                <MinMaxFilter
                  label="Review Count"
                  minValue={reviewCount.min}
                  maxValue={reviewCount.max}
                  handleChange={(type: string, value: string) =>
                    setReviewCount(prevState => ({
                      ...prevState,
                      [type]: value,
                    }))
                  }
                />
                <PeriodFilter
                  placeholder="30D"
                  label="Period"
                  value={reviewCount.period}
                  className={styles.filterPeriod}
                  filterOptions={FILTER_PERIOD_DURATIONS}
                  handleChange={(period: string) => {
                    setReviewCount(prevState => ({
                      ...prevState,
                      period,
                    }));
                  }}
                />
              </div>

              {/* Monthly Revenue = Sales Estimate */}
              <MinMaxFilter
                label="FBA %"
                minValue={fbaPercent.min}
                maxValue={fbaPercent.max}
                handleChange={(type: string, value: string) =>
                  setFbaPercent(prevState => ({
                    ...prevState,
                    [type]: value,
                  }))
                }
                appendWith="%"
              />

              {/* Seller Ratings */}
              <MinMaxRatingsFilter
                label="Seller Ratings"
                minValue={sellerRatings.min}
                maxValue={sellerRatings.max}
                handleChange={(type: string, value: string) =>
                  setSellerRatings(prevState => ({
                    ...prevState,
                    [type]: value,
                  }))
                }
              />

              {/*  Review Filter */}
              <div className={styles.reviewGroupedFilter}>
                <ReviewTypeFilter
                  placeholder="Positive"
                  label="Review"
                  filterOptions={FILTER_REVIEW_OPTIONS}
                  value={review.type}
                  handleChange={(type: string) => {
                    setReview(prevState => ({
                      ...prevState,
                      type,
                    }));
                  }}
                />
                <div className={styles.groupFilters}>
                  <MinMaxFilter
                    label=""
                    minValue={review.min}
                    maxValue={review.max}
                    handleChange={(type: string, value: string) =>
                      setReview(prevState => ({
                        ...prevState,
                        [type]: value,
                      }))
                    }
                  />
                  <PeriodFilter
                    placeholder="30D"
                    value={review.period}
                    filterOptions={FILTER_PERIOD_DURATIONS}
                    handleChange={(period: string) => {
                      setReview(prevState => ({
                        ...prevState,
                        period,
                      }));
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <FormFilterActions
          onFind={handleSubmit}
          onReset={handleReset}
          disabled={disableFormSubmit}
        />
      </section>
    </>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSellerDatabase: (payload: SellerDatabasePayload) => dispatch(fetchSellerDatabase(payload)),
  };
};

export default connect(null, mapDispatchToProps)(SellerDatabaseFilters);
