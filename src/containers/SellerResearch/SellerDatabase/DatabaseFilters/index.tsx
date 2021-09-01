import React, { useState, useEffect, useMemo } from 'react';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Components */
import InputFilter from '../../../../components/FormFilters/InputFilter';
import FormFilterActions from '../../../../components/FormFilters/FormFilterActions';
import MinMaxFilter from '../../../../components/FormFilters/MinMaxFilter';
import PeriodFilter from '../../../../components/FormFilters/PeriodFilter';
import MinMaxRatingsFilter from '../../../../components/FormFilters/MinMaxRatingsFilter';
// import RadioListFilters from '../../../../components/FormFilters/RadioListFilters';

/* Actions */
import { fetchSellerDatabase } from '../../../../actions/SellerResearch/SellerDatabase';

/* Interfaces */
import { SellerDatabasePayload } from '../../../../interfaces/SellerResearch/SellerDatabase';

/* Constants */
import {
  DEFAULT_INCLUDE_EXCLUDE_ERROR,
  DEFAULT_INCLUDE_EXCLUDE_FILTER,
  DEFAULT_MIN_MAX_FILTER,
  DEFAULT_MIN_MAX_PERIOD_FILTER,
  FILTER_PERIOD_DURATIONS,
} from '../../../../constants/SellerResearch/SellerDatabase';

import { isValidAmazonSellerId, isValidAsin } from '../../../../constants';

interface Props {
  fetchSellerDatabase: (payload: SellerDatabasePayload) => void;
}

const SellerDatabaseFilters = (props: Props) => {
  const { fetchSellerDatabase } = props;

  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);

  /* Basic Filters */
  const [merchantName, setMerchantName] = useState<string>('');
  const [asins, setAsins] = useState(DEFAULT_INCLUDE_EXCLUDE_FILTER);
  const [sellerIds, setSellerIds] = useState(DEFAULT_INCLUDE_EXCLUDE_FILTER);

  /* Advanced Filters */
  const [businessName, setBusinessName] = useState<string>('');
  const [brands, setBrands] = useState(DEFAULT_INCLUDE_EXCLUDE_FILTER);
  const [numInventory, setNumInventory] = useState(DEFAULT_MIN_MAX_FILTER);
  const [numBrands, setNumBrands] = useState(DEFAULT_MIN_MAX_FILTER);
  // const [reviewRatings, setReviewRatings] = useState(DEFAULT_MIN_MAX_FILTER);
  const [reviewCount, setReviewCount] = useState(DEFAULT_MIN_MAX_PERIOD_FILTER);
  const [neutralReview, setNeutralReview] = useState(DEFAULT_MIN_MAX_PERIOD_FILTER);
  const [positiveReview, setPositiveReview] = useState(DEFAULT_MIN_MAX_PERIOD_FILTER);
  const [negativeReview, setNegativeReview] = useState(DEFAULT_MIN_MAX_PERIOD_FILTER);
  const [sellerRatings, setSellerRatings] = useState(DEFAULT_MIN_MAX_FILTER);
  const [salesEstimate, setSalesEstimate] = useState(DEFAULT_MIN_MAX_FILTER);
  // const [launched, setLaunched] = useState<string>('');

  /* Error States */
  const [asinsError, setAsinsError] = useState(DEFAULT_INCLUDE_EXCLUDE_ERROR);
  const [sellerIdsError, setSellerIdsError] = useState(DEFAULT_INCLUDE_EXCLUDE_ERROR);

  /* Handlers */
  const handleSubmit = () => {
    const filterPayload = {
      merchantName,
      asins,
      sellerIds,
      businessName,
      brands,
      numInventory,
      numBrands,
      reviewCount,
      neutralReview,
      positiveReview,
      negativeReview,
      sellerRatings,
      salesEstimate,
    };
    fetchSellerDatabase({ filterPayload });
  };

  const handleReset = () => {
    fetchSellerDatabase({ resetFilter: true });
    setMerchantName('');
    setAsins(DEFAULT_INCLUDE_EXCLUDE_FILTER);
    setSellerIds(DEFAULT_INCLUDE_EXCLUDE_FILTER);
    setBusinessName('');
    setBrands(DEFAULT_INCLUDE_EXCLUDE_FILTER);
    setNumInventory(DEFAULT_MIN_MAX_FILTER);
    setNumBrands(DEFAULT_MIN_MAX_FILTER);
    // setReviewRatings(DEFAULT_MIN_MAX_FILTER);
    setReviewCount(DEFAULT_MIN_MAX_PERIOD_FILTER);
    setNeutralReview(DEFAULT_MIN_MAX_PERIOD_FILTER);
    setPositiveReview(DEFAULT_MIN_MAX_PERIOD_FILTER);
    setNegativeReview(DEFAULT_MIN_MAX_PERIOD_FILTER);
    setSellerRatings(DEFAULT_MIN_MAX_FILTER);
    setSalesEstimate(DEFAULT_MIN_MAX_FILTER);
    // setLaunched('')

    /* Reset Error States */
    setAsinsError(DEFAULT_INCLUDE_EXCLUDE_ERROR);
  };

  /* Effect on component mount */
  useEffect(() => {
    // handleReset();

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

              {/* Review Ratings */}
              {/* <MinMaxRatingsFilter
                label="Review Ratings"
                minValue={reviewRatings.min}
                maxValue={reviewRatings.max}
                handleChange={(type: string, value: string) =>
                  setReviewRatings(prevState => ({
                    ...prevState,
                    [type]: value,
                  }))
                }
              /> */}

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

              {/* Monthly Revenue = Sales Estimate */}
              <MinMaxFilter
                label="Monthly Revenue"
                minValue={salesEstimate.min}
                maxValue={salesEstimate.max}
                handleChange={(type: string, value: string) =>
                  setSalesEstimate(prevState => ({
                    ...prevState,
                    [type]: value,
                  }))
                }
              />

              {/* # of inventory */}
              <MinMaxFilter
                label="# of Inventory"
                minValue={numInventory.min}
                maxValue={numInventory.max}
                handleChange={(type: string, value: string) =>
                  setNumInventory(prevState => ({
                    ...prevState,
                    [type]: value,
                  }))
                }
              />

              {/* # of brands */}
              <MinMaxFilter
                label="# of Brands"
                minValue={numBrands.min}
                maxValue={numBrands.max}
                handleChange={(type: string, value: string) =>
                  setNumBrands(prevState => ({
                    ...prevState,
                    [type]: value,
                  }))
                }
              />

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
                  value={reviewCount.period}
                  filterOptions={FILTER_PERIOD_DURATIONS}
                  handleChange={(period: string) => {
                    setReviewCount(prevState => ({
                      ...prevState,
                      period,
                    }));
                  }}
                />
              </div>

              {/* Neutral Reviews */}
              <div className={styles.groupFilters}>
                <MinMaxFilter
                  label="Neutral Review"
                  minValue={neutralReview.min}
                  maxValue={neutralReview.max}
                  handleChange={(type: string, value: string) =>
                    setNeutralReview(prevState => ({
                      ...prevState,
                      [type]: value,
                    }))
                  }
                />
                <PeriodFilter
                  placeholder="30D"
                  value={neutralReview.period}
                  filterOptions={FILTER_PERIOD_DURATIONS}
                  handleChange={(period: string) => {
                    setNeutralReview(prevState => ({
                      ...prevState,
                      period,
                    }));
                  }}
                />
              </div>

              {/* Positive Reviews */}
              <div className={styles.groupFilters}>
                <MinMaxFilter
                  label="Positive Review"
                  minValue={positiveReview.min}
                  maxValue={positiveReview.max}
                  handleChange={(type: string, value: string) =>
                    setPositiveReview(prevState => ({
                      ...prevState,
                      [type]: value,
                    }))
                  }
                />
                <PeriodFilter
                  placeholder="30D"
                  value={positiveReview.period}
                  filterOptions={FILTER_PERIOD_DURATIONS}
                  handleChange={(period: string) => {
                    setPositiveReview(prevState => ({
                      ...prevState,
                      period,
                    }));
                  }}
                />
              </div>

              {/* Negative Reviews */}
              <div className={styles.groupFilters}>
                <MinMaxFilter
                  label="Negative Review"
                  minValue={negativeReview.min}
                  maxValue={negativeReview.max}
                  handleChange={(type: string, value: string) =>
                    setNegativeReview(prevState => ({
                      ...prevState,
                      [type]: value,
                    }))
                  }
                />
                <PeriodFilter
                  placeholder="30D"
                  value={negativeReview.period}
                  filterOptions={FILTER_PERIOD_DURATIONS}
                  handleChange={(period: string) => {
                    setNegativeReview(prevState => ({
                      ...prevState,
                      period,
                    }));
                  }}
                />
              </div>

              {/* Seller Launched */}
              {/* <RadioListFilters
                label="Seller Launched"
                filterOptions={FILTER_LAUNCHED_DURATIONS}
                value={launched}
                handleChange={(value: string) => setLaunched(value)}
              /> */}
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
