import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

/* Styling */
import styles from './index.module.scss';

/* Actions */
import {
  fetchSellerDatabase,
  setIsRestoringSellerDatabaseLastSearch,
  setSellerDatabaseMarketplace,
} from '../../../../actions/SellerResearch/SellerDatabase';

/* Interfaces */
import {
  MarketplaceOption,
  SellerDatabasePayload,
} from '../../../../interfaces/SellerResearch/SellerDatabase';

/* Constants */
import {
  DEFAULT_SELLER_DATABASE_FILTER,
  DEFAULT_INCLUDE_EXCLUDE_ERROR,
  FILTER_PERIOD_DURATIONS,
  DEFAULT_US_MARKET,
  SELLER_DB_MARKETPLACE,
  FILTER_REVIEW_OPTIONS,
  // GROWTH_PERCENT_PERIOD_OPTIONS,
  // LAUNCHED_FILTER_OPTIONS,
  // SELLER_TYPE_FILTER_OPTIONS,
  FILTER_QUERY_KEY_MAPPER,
  getMinMaxPeriodFilter,
  getGrowthFilter,
  getMarketplace,
} from '../../../../constants/SellerResearch/SellerDatabase';
import { getProductCategories } from '../../../../constants/ProductResearch/ProductsDatabase';
import { isValidAmazonSellerId, isValidAsin } from '../../../../constants';
import {
  COUNTRY_DROPDOWN_LIST,
  STATES_DROPDOWN_LIST,
} from '../../../../constants/SellerResearch/SellerMap';
import { F_TYPES } from '../../../../constants/SellerResearch';

/* Components */
import AdvanceFilterToggle from '../../../../components/AdvanceFilterToggle';
import InputFilter from '../../../../components/FormFilters/InputFilter';
import FormFilterActions from '../../../../components/FormFilters/FormFilterActions';
import MinMaxFilter from '../../../../components/FormFilters/MinMaxFilter';
import PeriodFilter from '../../../../components/FormFilters/PeriodFilter';
import MarketPlaceFilter from '../../../../components/FormFilters/MarketPlaceFilter';
import MinMaxRatingsFilter from '../../../../components/FormFilters/MinMaxRatingsFilter';
import ReviewTypeFilter from '../../../../components/FormFilters/ReviewTypeFilter';
import CheckboxDropdownFilter from '../../../../components/FormFilters/CheckboxDropdownFilter';
// import RadioListFilters from '../../../../components/FormFilters/RadioListFilters';
import SelectionFilter from '../../../../components/FormFilters/SelectionFilter';
import CheckboxFilter from '../../../../components/FormFilters/CheckboxFilter';

/* Selectors */
import { sellerIDSelector } from '../../../../selectors/Seller';

/* Configs */
import { AppConfig } from '../../../../config';

interface Props {
  fetchSellerDatabase: (payload: SellerDatabasePayload) => void;
  setSellerDatabaseMarketplace: (payload: MarketplaceOption) => void;
  setIsRestoringSellerDatabaseLastSearch: (isRestoringSellerDatabaseLastSearch: boolean) => void;
  sellerDatabaseIsRestoringLastSearch: boolean;
}

const SellerDatabaseFilters = (props: Props) => {
  const {
    fetchSellerDatabase,
    setSellerDatabaseMarketplace,
    sellerDatabaseIsRestoringLastSearch,
    setIsRestoringSellerDatabaseLastSearch,
  } = props;

  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [sellerDatabaseFilters, setSellerDatabaseFilters] = useState(
    DEFAULT_SELLER_DATABASE_FILTER
  );
  const [marketPlace, setMarketPlace] = useState<MarketplaceOption>(DEFAULT_US_MARKET);

  const updateSellerDatabaseFilter = (key: string, value: any) => {
    if (key === 'country') {
      setSellerDatabaseFilters({
        ...sellerDatabaseFilters,
        [key]: value,
        state: '',
      });
    } else {
      setSellerDatabaseFilters({
        ...sellerDatabaseFilters,
        [key]: value,
      });
    }
  };

  /* Error States */
  const [asinsError, setAsinsError] = useState(DEFAULT_INCLUDE_EXCLUDE_ERROR);
  const [sellerIdsError, setSellerIdsError] = useState(DEFAULT_INCLUDE_EXCLUDE_ERROR);

  /* Handlers */
  const handleSubmit = () => {
    const filterPayload = { ...sellerDatabaseFilters };
    filterPayload.categories = filterPayload.categories.join('|');
    filterPayload.country = filterPayload.country === 'All Countries' ? '' : filterPayload.country;
    filterPayload.state = filterPayload.state === 'All States' ? '' : filterPayload.state;

    fetchSellerDatabase({ filterPayload, marketplaceId: marketPlace.value });
  };

  const handleReset = () => {
    setSellerDatabaseMarketplace(DEFAULT_US_MARKET);
    setSellerDatabaseFilters(DEFAULT_SELLER_DATABASE_FILTER);
    /* Reset Error States */
    setAsinsError(DEFAULT_INCLUDE_EXCLUDE_ERROR);
    setSellerIdsError(DEFAULT_INCLUDE_EXCLUDE_ERROR);

    fetchSellerDatabase({ resetFilter: true });
  };

  const handleRestoreLastSearch = async () => {
    const sellerID = sellerIDSelector();
    try {
      const URL = `${AppConfig.BASE_URL_API}sellers/${sellerID}/last-search?type=seller_database`;
      const { data } = await axios.get(URL);
      const restoredSellerDatabaseFilters = { ...sellerDatabaseFilters };
      if (data && data.length > 0) {
        const restoredFilter = JSON.parse(data[0].parameter);
        /* Special treatment to set categories */
        if (restoredFilter.categories) {
          restoredFilter.categories = restoredFilter.categories.split('|');
          restoredSellerDatabaseFilters.categories = restoredFilter.categories;
        }

        /* Special treatment to set marketplace */
        if (restoredFilter.marketplace_id) {
          setMarketPlace(getMarketplace(restoredFilter.marketplace_id));
          setSellerDatabaseMarketplace(getMarketplace(restoredFilter.marketplace_id));
        }

        Object.keys(FILTER_QUERY_KEY_MAPPER).forEach((payloadKey: string) => {
          const filter = FILTER_QUERY_KEY_MAPPER[payloadKey];
          /* If MIN_MAX_FILTER */
          if (filter.type === F_TYPES.MIN_MAX) {
            if (restoredFilter[`${filter.keyName}_min`]) {
              restoredSellerDatabaseFilters[payloadKey] = {
                ...restoredSellerDatabaseFilters[payloadKey],
                min: restoredFilter[`${filter.keyName}_min`],
              };
            }

            if (restoredFilter[`${filter.keyName}_max`]) {
              restoredSellerDatabaseFilters[payloadKey] = {
                ...restoredSellerDatabaseFilters[payloadKey],
                max: restoredFilter[`${filter.keyName}_max`],
              };
            }
            /* IF INPUT_EXCLUDE FILTER */
          } else if (filter.type === F_TYPES.INPUT_INCLUDE_EXCLUDE) {
            if (restoredFilter[`include_${filter.keyName}`]) {
              restoredSellerDatabaseFilters[payloadKey] = {
                ...restoredSellerDatabaseFilters[payloadKey],
                include: restoredFilter[`include_${filter.keyName}`],
              };
            }
            if (restoredFilter[`exclude_${filter.keyName}`]) {
              restoredSellerDatabaseFilters[payloadKey] = {
                ...restoredSellerDatabaseFilters[payloadKey],
                exclude: restoredFilter[`exclude_${filter.keyName}`],
              };
            }
            /* IF MIN_MAX_PERIOD_REVIEW FILTER */
          } else if (filter.type === F_TYPES.MIN_MAX_PERIOD_REVIEW) {
            Object.keys(restoredFilter).forEach((key: string) => {
              if (getMinMaxPeriodFilter(key, restoredFilter[key], true)) {
                restoredSellerDatabaseFilters[payloadKey] = {
                  ...restoredSellerDatabaseFilters[payloadKey],
                  ...getMinMaxPeriodFilter(key, restoredFilter[key], true),
                };
              }
            });

            /* IF MIN_MAX_PERIOD FILTER */
          } else if (filter.type === F_TYPES.MIN_MAX_PERIOD) {
            Object.keys(restoredFilter).forEach((key: string) => {
              if (getMinMaxPeriodFilter(key, restoredFilter[key]) && key.includes(filter.keyName)) {
                restoredSellerDatabaseFilters[payloadKey] = {
                  ...restoredSellerDatabaseFilters[payloadKey],
                  ...getMinMaxPeriodFilter(key, restoredFilter[key]),
                };
              }
            });

            /* IF GROWTH FILTER */
          } else if (
            filter.type === F_TYPES.GROWTH_PERCENT_FILTER ||
            filter.type === F_TYPES.GROWTH_COUNT_FILTER
          ) {
            Object.keys(restoredFilter).forEach((key: string) => {
              if (getGrowthFilter(key, restoredFilter[key])) {
                restoredSellerDatabaseFilters[payloadKey] = {
                  ...restoredSellerDatabaseFilters[payloadKey],
                  ...getGrowthFilter(key, restoredFilter[key]),
                };
              }
            });
            /* IF OTHER TYPES OF FILTER */
          } else if (restoredFilter[filter.keyName] && filter.keyName !== 'categories') {
            restoredSellerDatabaseFilters[payloadKey] = restoredFilter[filter.keyName];
          }
        });

        setSellerDatabaseFilters(restoredSellerDatabaseFilters);
      }
    } catch (err) {
      handleReset();
    }
  };

  /* Effect on component mount */
  useEffect(() => {
    handleReset();

    return () => {
      handleReset();
    };
  }, []);

  /* Effect on restore last search */
  useEffect(() => {
    if (sellerDatabaseIsRestoringLastSearch) {
      handleRestoreLastSearch();
      setIsRestoringSellerDatabaseLastSearch(false);
    }
  }, [sellerDatabaseIsRestoringLastSearch]);

  /* Include Asin validation check */
  useEffect(() => {
    if (sellerDatabaseFilters.asins.include) {
      const asinList = sellerDatabaseFilters.asins.include.split(',');

      const isValidAsinList = asinList
        .filter((a: string) => a.trim().length > 0)
        .every((asin: string) => isValidAsin(asin));

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
  }, [sellerDatabaseFilters.asins.include]);

  /* Exclude Asin validation check */
  useEffect(() => {
    if (sellerDatabaseFilters.asins.exclude) {
      const asinList = sellerDatabaseFilters.asins.exclude.split(',');

      const isValidAsinList = asinList
        .filter((a: string) => a.trim().length > 0)
        .every((asin: string) => isValidAsin(asin));

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
  }, [sellerDatabaseFilters.asins.exclude]);

  /* Include Seller ID validation check */
  useEffect(() => {
    if (sellerDatabaseFilters.sellerIds.include) {
      const sellerIdList = sellerDatabaseFilters.sellerIds.include.split(',');
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
  }, [sellerDatabaseFilters.sellerIds.include]);

  /* Include Seller ID validation check */
  useEffect(() => {
    if (sellerDatabaseFilters.sellerIds.exclude) {
      const sellerIdList = sellerDatabaseFilters.sellerIds.exclude.split(',');
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
  }, [sellerDatabaseFilters.sellerIds.exclude]);

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
              setSellerDatabaseMarketplace(option);
              if (getProductCategories(option.code) !== getProductCategories(marketPlace.code)) {
                updateSellerDatabaseFilter('categories', []);
              }
            }}
          />

          {/* Categories */}
          <CheckboxDropdownFilter
            filterOptions={getProductCategories(marketPlace.code)}
            label="Categories"
            selectedValues={sellerDatabaseFilters.categories}
            handleChange={(newCategories: string[]) => {
              updateSellerDatabaseFilter('categories', [...newCategories]);
            }}
          />

          {/* Merchant Name */}
          <InputFilter
            label="Merchant Name"
            placeholder="Merchant Name"
            value={sellerDatabaseFilters.merchantName}
            handleChange={(value: string) => updateSellerDatabaseFilter('merchantName', value)}
          />

          {/* Include ASINS */}
          <InputFilter
            label="Include ASINs or ISBNs"
            placeholder="Enter separated by comma"
            value={sellerDatabaseFilters.asins.include.toUpperCase()}
            handleChange={(value: string) =>
              updateSellerDatabaseFilter('asins', {
                ...sellerDatabaseFilters.asins,
                include: value,
              })
            }
            error={asinsError.include}
          />

          {/* Include Seller IDs */}
          <InputFilter
            label="Include Seller IDs"
            placeholder="Enter separated by comma"
            value={sellerDatabaseFilters.sellerIds.include.toUpperCase()}
            handleChange={(value: string) =>
              updateSellerDatabaseFilter('sellerIds', {
                ...sellerDatabaseFilters.sellerIds,
                include: value,
              })
            }
            error={sellerIdsError.include}
          />

          {/*  Include brands */}
          {/* <InputFilter
            label="Include Brands"
            placeholder="Enter separated by comma"
            value={sellerDatabaseFilters.brands.include}
            handleChange={(value: string) =>
              updateSellerDatabaseFilter('brands', {
                ...sellerDatabaseFilters.brands,
                include: value,
              })
            }
          /> */}

          {/* Monthly Revenue = Sales Estimate */}
          {/* <MinMaxFilter
            label="Monthly Revenue"
            minValue={sellerDatabaseFilters.monthlyRevenue.min}
            maxValue={sellerDatabaseFilters.monthlyRevenue.max}
            handleChange={(type: string, value: string) =>
              updateSellerDatabaseFilter('monthlyRevenue', {
                ...sellerDatabaseFilters.monthlyRevenue,
                [type]: value,
              })
            }
            prependWith={marketPlace.currency}
          /> */}
        </div>
        <div className={styles.advancedFilterWrapper}>
          <AdvanceFilterToggle
            handleClick={() => setShowAdvancedFilter(prevState => !prevState)}
            showAdvancedFilter={showAdvancedFilter}
          />

          {showAdvancedFilter && (
            <div className={styles.showAdvancedFilter}>
              {/* Merchant Name */}
              {/* <InputFilter
                label="Merchant Name"
                placeholder="Merchant Name"
                value={sellerDatabaseFilters.merchantName}
                handleChange={(value: string) => updateSellerDatabaseFilter('merchantName', value)}
              /> */}

              {/* Business name */}
              <InputFilter
                label="Business Name"
                placeholder="Business Name"
                value={sellerDatabaseFilters.businessName}
                handleChange={(value: string) => updateSellerDatabaseFilter('businessName', value)}
              />

              {/* Zip code */}
              {/* <InputFilter
                label="Zip Code"
                placeholder="Zip Code"
                value={sellerDatabaseFilters.zipCode}
                handleChange={(value: string) => updateSellerDatabaseFilter('zipCode', value)}
              /> */}

              {/*  Include brands */}
              <InputFilter
                label="Include Brands"
                placeholder="Enter separated by comma"
                value={sellerDatabaseFilters.brands.include}
                handleChange={(value: string) =>
                  updateSellerDatabaseFilter('brands', {
                    ...sellerDatabaseFilters.brands,
                    include: value,
                  })
                }
              />

              {/* Exclude brands */}
              <InputFilter
                label="Exclude Brands"
                placeholder="Enter separated by comma"
                value={sellerDatabaseFilters.brands.exclude}
                handleChange={(value: string) =>
                  updateSellerDatabaseFilter('brands', {
                    ...sellerDatabaseFilters.brands,
                    exclude: value,
                  })
                }
              />

              {/* Include ASINS */}
              {/* <InputFilter
                label="Include ASINs or ISBNs"
                placeholder="Enter separated by comma"
                value={sellerDatabaseFilters.asins.include.toUpperCase()}
                handleChange={(value: string) =>
                  updateSellerDatabaseFilter('asins', {
                    ...sellerDatabaseFilters.asins,
                    include: value,
                  })
                }
                error={asinsError.include}
              /> */}

              {/* Exclude ASINS Name */}
              <InputFilter
                label="Exclude ASINs or ISBNs"
                placeholder="Enter separated by comma"
                value={sellerDatabaseFilters.asins.exclude.toUpperCase()}
                handleChange={(value: string) =>
                  updateSellerDatabaseFilter('asins', {
                    ...sellerDatabaseFilters.asins,
                    exclude: value,
                  })
                }
                error={asinsError.exclude}
              />

              {/* Include Seller IDs */}
              {/* <InputFilter
                label="Include Seller IDs"
                placeholder="Enter separated by comma"
                value={sellerDatabaseFilters.sellerIds.include.toUpperCase()}
                handleChange={(value: string) =>
                  updateSellerDatabaseFilter('sellerIds', {
                    ...sellerDatabaseFilters.sellerIds,
                    include: value,
                  })
                }
                error={sellerIdsError.include}
              /> */}

              {/* Exclude Seller IDS */}
              <InputFilter
                label="Exclude Seller IDs"
                placeholder="Enter separated by comma"
                value={sellerDatabaseFilters.sellerIds.exclude.toUpperCase()}
                handleChange={(value: string) =>
                  updateSellerDatabaseFilter('sellerIds', {
                    ...sellerDatabaseFilters.sellerIds,
                    exclude: value,
                  })
                }
                error={sellerIdsError.exclude}
              />

              {/* Country */}
              <SelectionFilter
                label="Seller Country"
                placeholder="Country"
                filterOptions={COUNTRY_DROPDOWN_LIST}
                value={sellerDatabaseFilters.country}
                handleChange={(value: string) => {
                  updateSellerDatabaseFilter('country', value);
                }}
              />

              {/* All States */}
              <SelectionFilter
                label="U.S. States"
                placeholder="All States"
                filterOptions={STATES_DROPDOWN_LIST}
                value={sellerDatabaseFilters.state}
                handleChange={(value: string) => updateSellerDatabaseFilter('state', value)}
                disabled={sellerDatabaseFilters.country !== 'US'}
              />

              {/* Seller Reachability */}
              <div>
                <CheckboxFilter
                  label="Seller Reachability"
                  checkboxLabel="Sellers with Phone"
                  checked={sellerDatabaseFilters.sellerReachability}
                  handleChange={value => updateSellerDatabaseFilter('sellerReachability', value)}
                />

                <CheckboxFilter
                  checkboxLabel="Sellers with contact"
                  checked={sellerDatabaseFilters.hasContact}
                  handleChange={value => updateSellerDatabaseFilter('hasContact', value)}
                />
              </div>

              {/* # of Inventory */}
              {/* <MinMaxFilter
                label="# of Inventory"
                minValue={sellerDatabaseFilters.numOfInventory.min}
                maxValue={sellerDatabaseFilters.numOfInventory.max}
                handleChange={(type: string, value: string) =>
                  updateSellerDatabaseFilter('numOfInventory', {
                    ...sellerDatabaseFilters.numOfInventory,
                    [type]: value,
                  })
                }
              /> */}

              {/* # of Brands */}
              <MinMaxFilter
                label="Number of Brands"
                minValue={sellerDatabaseFilters.numOfBrands.min}
                maxValue={sellerDatabaseFilters.numOfBrands.max}
                handleChange={(type: string, value: string) =>
                  updateSellerDatabaseFilter('numOfBrands', {
                    ...sellerDatabaseFilters.numOfBrands,
                    [type]: value,
                  })
                }
              />

              {/* Growth % */}
              {/* <div className={styles.groupFilters}>
                <MinMaxFilter
                  label="Growth %"
                  minValue={sellerDatabaseFilters.growthPercent.min}
                  maxValue={sellerDatabaseFilters.growthPercent.max}
                  handleChange={(type: string, value: string) =>
                    updateSellerDatabaseFilter('growthPercent', {
                      ...sellerDatabaseFilters.growthPercent,
                      [type]: value,
                    })
                  }
                  appendWith="%"
                />

                <PeriodFilter
                  placeholder="30D"
                  label="Period"
                  className={styles.filterPeriod}
                  value={sellerDatabaseFilters.growthPercent.period}
                  filterOptions={GROWTH_PERCENT_PERIOD_OPTIONS}
                  handleChange={(period: string) => {
                    updateSellerDatabaseFilter('growthPercent', {
                      ...sellerDatabaseFilters.growthPercent,
                      period,
                    });
                  }}
                />
              </div> */}

              {/* Review Count */}
              {/* <div className={styles.groupFilters}>
                <MinMaxFilter
                  label="Review Count"
                  minValue={sellerDatabaseFilters.reviewCount.min}
                  maxValue={sellerDatabaseFilters.reviewCount.max}
                  handleChange={(type: string, value: string) =>
                    updateSellerDatabaseFilter('reviewCount', {
                      ...sellerDatabaseFilters.reviewCount,
                      [type]: value,
                    })
                  }
                />
                <PeriodFilter
                  placeholder="30D"
                  label="Period"
                  value={sellerDatabaseFilters.reviewCount.period}
                  className={styles.filterPeriod}
                  filterOptions={FILTER_PERIOD_DURATIONS}
                  handleChange={(period: string) => {
                    updateSellerDatabaseFilter('reviewCount', {
                      ...sellerDatabaseFilters.reviewCount,
                      period,
                    });
                  }}
                />
              </div> */}

              {/* FBA Percent */}
              {/* <MinMaxFilter
                label="FBA %"
                minValue={sellerDatabaseFilters.fbaPercent.min}
                maxValue={sellerDatabaseFilters.fbaPercent.max}
                handleChange={(type: string, value: string) =>
                  updateSellerDatabaseFilter('fbaPercent', {
                    ...sellerDatabaseFilters.fbaPercent,
                    [type]: value,
                  })
                }
                appendWith="%"
              /> */}

              {/*  Review Filter */}
              <div className={styles.reviewGroupedFilter}>
                <ReviewTypeFilter
                  placeholder="Positive"
                  label="Review"
                  filterOptions={FILTER_REVIEW_OPTIONS}
                  value={sellerDatabaseFilters.review.type}
                  handleChange={(type: string) => {
                    updateSellerDatabaseFilter('review', {
                      ...sellerDatabaseFilters.review,
                      type,
                    });
                  }}
                />
                <div className={styles.groupFilters}>
                  <MinMaxFilter
                    label=""
                    minValue={sellerDatabaseFilters.review.min}
                    maxValue={sellerDatabaseFilters.review.max}
                    handleChange={(type: string, value: string) =>
                      updateSellerDatabaseFilter('review', {
                        ...sellerDatabaseFilters.review,
                        [type]: value,
                      })
                    }
                  />
                  <PeriodFilter
                    placeholder="30D"
                    value={sellerDatabaseFilters.review.period}
                    filterOptions={FILTER_PERIOD_DURATIONS}
                    handleChange={(period: string) => {
                      updateSellerDatabaseFilter('review', {
                        ...sellerDatabaseFilters.review,
                        period,
                      });
                    }}
                  />
                </div>
              </div>

              {/* Launched FIlter */}
              {/* <RadioListFilters
                filterOptions={LAUNCHED_FILTER_OPTIONS}
                label="Seller Launched"
                value={sellerDatabaseFilters.launched}
                handleChange={(value: string) => updateSellerDatabaseFilter('launched', value)}
              /> */}

              {/* Seller Type FIlter */}
              {/* <RadioListFilters
                label="Seller Type"
                filterOptions={SELLER_TYPE_FILTER_OPTIONS}
                value={sellerDatabaseFilters.sellerType}
                handleChange={(value: string) => updateSellerDatabaseFilter('sellerType', value)}
              /> */}

              {/* Seller Ratings */}
              <MinMaxRatingsFilter
                label="Seller Ratings"
                minValue={sellerDatabaseFilters.sellerRatings.min}
                maxValue={sellerDatabaseFilters.sellerRatings.max}
                handleChange={(type: string, value: string) =>
                  updateSellerDatabaseFilter('sellerRatings', {
                    ...sellerDatabaseFilters.sellerRatings,
                    [type]: value,
                  })
                }
              />
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

const mapStateToProps = (state: any) => {
  return {
    sellerDatabaseIsRestoringLastSearch: state.sellerDatabase.sellerDatabaseIsRestoringLastSearch,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setIsRestoringSellerDatabaseLastSearch: (isRestoringSellerDatabaseLastSearch: boolean) =>
      dispatch(setIsRestoringSellerDatabaseLastSearch(isRestoringSellerDatabaseLastSearch)),
    fetchSellerDatabase: (payload: SellerDatabasePayload) => dispatch(fetchSellerDatabase(payload)),
    setSellerDatabaseMarketplace: (payload: MarketplaceOption) =>
      dispatch(setSellerDatabaseMarketplace(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SellerDatabaseFilters);
