import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Accordion, Icon, Image, Loader, Segment } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Constants */
import {
  //FILTER_REVIEW_OPTIONS,
  //REVIEW_FILTER_PERIOD_DURATIONS,
  //GROWTH_FILTER_PERIOD_DURATIONS,
  parseSellerMapFilterData,
  //LAUNCHED_FILTER_OPTIONS,
  //FBA_PERCENT_FILTER_OPTIONS,
} from '../../../../constants/SellerResearch';

/* Selectors */
import {
  getSellerMapFilterData,
  getIsLoadingSellerForMap,
} from '../../../../selectors/SellerResearch/SellerMap';

/* Actions */
import {
  fetchSellersForMap,
  fetchSellersListForMap,
  updateSellerMapFilterOptions,
} from '../../../../actions/SellerResearch/SellerMap';

/* Components */
import Placeholder from '../../../../components/Placeholder';
import InputFilter from '../../../../components/FormFilters/InputFilter';
import MinMaxFilter from '../../../../components/FormFilters/MinMaxFilter';
//import MinMaxRatingsFilter from '../../../../components/FormFilters/MinMaxRatingsFilter';
//import ReviewTypeFilter from '../../../../components/FormFilters/ReviewTypeFilter';
//import PeriodFilter from '../../../../components/FormFilters/PeriodFilter';
//import RadioListFilters from '../../../../components/FormFilters/RadioListFilters';
import FormFilterActions from '../../../../components/FormFilters/FormFilterActions';
import CheckboxDropdownFilter from '../../../../components/FormFilters/CheckboxDropdownFilter';

/* Interfaces */
import {
  SellerMapPayload,
  UpdateSellerMapFilterPayload,
} from '../../../../interfaces/SellerResearch/SellerMap';

/* Constants */
import {
  DEFAULT_INCLUDE_EXCLUDE_ERROR,
  getProductCategories,
} from '../../../../constants/ProductResearch/ProductsDatabase';
import { isValidAsin } from '../../../../constants';
import CheckboxFilter from '../../../../components/FormFilters/CheckboxFilter';

/* Assets */
import SquareMinusRegular from '../../../../assets/images/minus-square-regular.svg';
import SquarePlusRegular from '../../../../assets/images/plus-square-regular (1).svg';
import downArrow from '../../../../assets/images/sorting-icon-down.svg';
import upArrow from '../../../../assets/images/angle-up-black.svg';

interface Props {
  isLoadingSellersForMap: boolean;
  sellerMapFilterData: any[];
  showFilter: boolean;
  updateSellerMapFilterOptions: (payload: UpdateSellerMapFilterPayload) => void;
  fetchSellersFormap: (payload: SellerMapPayload) => void;
  fetchSellersForSellerList: () => void;
}

const SellerMapFilter = (props: Props) => {
  const {
    isLoadingSellersForMap,
    sellerMapFilterData,
    showFilter,
    updateSellerMapFilterOptions,
    fetchSellersFormap,
    fetchSellersForSellerList,
  } = props;

  const [asinsError, setAsinsError] = useState(DEFAULT_INCLUDE_EXCLUDE_ERROR);
  const [showGeneralFilters, setShowGeneralFilters] = useState(true);
  const [showBuyingIntentFilters, setShowBuyingIntentFilters] = useState(true);

  const [filterActiveIndex, setFilterActiveIndex] = useState<number>(-1);

  /* Get marketplace */
  const marketplace = parseSellerMapFilterData(sellerMapFilterData, 'marketplace_id');

  /* Categories */
  const categories = parseSellerMapFilterData(sellerMapFilterData, 'categories');

  /* Monthly revenue */
  //const monthlyRevenue = parseSellerMapFilterData(sellerMapFilterData, 'sales_estimate');

  /* Business Name */
  //const businessName = parseSellerMapFilterData(sellerMapFilterData, 'business_name');

  /* Zip Code */
  const zipCode = parseSellerMapFilterData(sellerMapFilterData, 'zip_code');

  /* Brands */
  const brands = parseSellerMapFilterData(sellerMapFilterData, 'brands');

  /* Asins */
  const asins = parseSellerMapFilterData(sellerMapFilterData, 'asins');

  /* seller Reachability */
  const sellerReachability = parseSellerMapFilterData(sellerMapFilterData, 'has_contact');

  /* Fba count */
  //const fbaCount = parseSellerMapFilterData(sellerMapFilterData, 'fba_percent');

  /* # of ASINs */
  const numberOfInventory = parseSellerMapFilterData(sellerMapFilterData, 'inventory_count');

  /* Brands count */
  const brandsCount = parseSellerMapFilterData(sellerMapFilterData, 'number_brands');

  /* Growth percent */
  //const growthPercent = parseSellerMapFilterData(sellerMapFilterData, 'growth');

  /* Review */
  //const review = parseSellerMapFilterData(sellerMapFilterData, 'review_ratings');

  /* Seller Launched */
  //const sellerLaunched = parseSellerMapFilterData(sellerMapFilterData, 'launched');

  /* Seller Ratings */
  //const sellerRatings = parseSellerMapFilterData(sellerMapFilterData, 'seller_rating');

  /* Merchant Name */
  const merchantName = parseSellerMapFilterData(sellerMapFilterData, 'merchant_name');

  const TEXT_INPUT_FILTERS = [
    'merchant_name',
    'zip_code',
    'brands',
    'asins',
    'inventory_count',
    'number_brands',
  ];

  /* Include Asin validation check */
  useEffect(() => {
    if (asins.value.include) {
      const asinList = asins.value.include.split(',');

      const isValidAsinList = asinList
        .filter((a: any) => a.trim().length > 0)
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
  }, [asins.value.include]);

  /* Exclude Asin validation check */
  useEffect(() => {
    if (asins.value.exclude) {
      const asinList = asins.value.exclude.split(',');

      const isValidAsinList = asinList
        .filter((a: any) => a.trim().length > 0)
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
  }, [asins.value.exclude]);

  const handleFilterChange = (keyName: any, value: any, pressedKey?: string) => {
    updateSellerMapFilterOptions({ keyName, value });
    if (TEXT_INPUT_FILTERS.indexOf(keyName) >= 0) {
      if (pressedKey === 'Enter') {
        handleSubmit();
      }
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    fetchSellersFormap({ enableLoader: true });
    fetchSellersForSellerList();
  };

  const handleReset = () => {
    fetchSellersFormap({ resetMap: true });
  };

  if (isLoadingSellersForMap) {
    return (
      <div className={`${styles.filterWrapper} ${!showFilter ? styles.filterWrapper__closed : ''}`}>
        <Placeholder numberParagraphs={10} numberRows={5} isGrey />
      </div>
    );
  }

  const handleAccordianUpArrowClick = (number: number) => {
    if (filterActiveIndex === number) {
      setFilterActiveIndex(-1);
    } else {
      setFilterActiveIndex(number);
    }
  };

  return (
    <div className={`${styles.filterWrapper} ${!showFilter ? styles.filterWrapper__closed : ''}`}>
      {isLoadingSellersForMap && (
        <Segment
          className={`${styles.sellerFiltersLoader} ${
            !showFilter ? styles.sellerFiltersLoader__closed : ''
          }`}
        >
          <Loader active={isLoadingSellersForMap} size="medium" content="" />
        </Segment>
      )}

      {/* Merchant Name */}
      <div className={styles.filterType}>
        {showGeneralFilters ? (
          <Image
            src={SquareMinusRegular}
            onClick={() => setShowGeneralFilters(false)}
            className={styles.filterType__img}
          />
        ) : (
          <Image
            src={SquarePlusRegular}
            onClick={() => setShowGeneralFilters(true)}
            className={styles.filterType__img}
          />
        )}
        <p className={styles.filterType__text}>GENERAL </p>
      </div>
      <div className={`${styles.basicFilters} ${!showGeneralFilters && styles.hide}`}>
        <Accordion>
          <div
            className={`${styles.accordianBlockWrapper} ${filterActiveIndex === 0 &&
              styles.accordianBlockWrapper__active}`}
          >
            <Accordion.Title
              active={filterActiveIndex === 0}
              index={0}
              onClick={() => handleAccordianUpArrowClick(0)}
              className={styles.accordian__title}
            >
              <div className={styles.accordian__title__block}>
                <Icon name="building" className={styles.accordian__title__icon} />
                <p>Company name</p>
              </div>
              <Image
                src={filterActiveIndex === 0 ? upArrow : downArrow}
                className={styles.accordian__title__arrowImage}
              />
            </Accordion.Title>
            <Accordion.Content active={filterActiveIndex === 0}>
              <div>
                <InputFilter
                  placeholder="Company Name"
                  label=""
                  value={merchantName.value}
                  handleKeyDown={e => {
                    if (e.key === 'Enter') {
                      handleFilterChange('merchant_name', e.target.value, 'Enter');
                    }
                  }}
                  handleChange={(value: any) => {
                    handleFilterChange('merchant_name', value);
                  }}
                />
              </div>
            </Accordion.Content>
          </div>
          <div
            className={`${styles.accordianBlockWrapper} ${filterActiveIndex === 1 &&
              styles.accordianBlockWrapper__active}`}
          >
            <Accordion.Title
              active={filterActiveIndex === 1}
              index={1}
              onClick={() => handleAccordianUpArrowClick(1)}
              className={styles.accordian__title}
            >
              <div className={styles.accordian__title__block}>
                <Icon name="map marker alternate" className={styles.accordian__title__icon} />
                <p>Zip Code</p>
              </div>
              <Image
                src={filterActiveIndex === 1 ? upArrow : downArrow}
                className={styles.accordian__title__arrowImage}
              />
            </Accordion.Title>
            <Accordion.Content active={filterActiveIndex === 1}>
              <div>
                <InputFilter
                  placeholder="Zip code"
                  label=""
                  value={zipCode.value}
                  handleKeyDown={e => {
                    if (e.key === 'Enter') {
                      handleFilterChange('zip_code', e.target.value, 'Enter');
                    }
                  }}
                  handleChange={(value: any) => {
                    handleFilterChange('zip_code', value);
                  }}
                />
              </div>
            </Accordion.Content>
          </div>
          <div
            className={`${styles.accordianBlockWrapper} ${filterActiveIndex === 4 &&
              styles.accordianBlockWrapper__active}`}
          >
            <Accordion.Title
              active={filterActiveIndex === 4}
              index={4}
              onClick={() => handleAccordianUpArrowClick(4)}
              className={styles.accordian__title}
            >
              <div className={styles.accordian__title__block}>
                <Icon name="map marker alternate" className={styles.accordian__title__icon} />
                <p>Contact</p>
              </div>
              <Image
                src={filterActiveIndex === 4 ? upArrow : downArrow}
                className={styles.accordian__title__arrowImage}
              />
            </Accordion.Title>
            <Accordion.Content active={filterActiveIndex === 4}>
              <div>
                <CheckboxFilter
                  label="Seller Reachability"
                  checkboxLabel="Sellers with decision makers"
                  checked={sellerReachability.value}
                  handleChange={(value: any) => {
                    handleFilterChange('has_contact', value);
                  }}
                />
              </div>
            </Accordion.Content>
          </div>
        </Accordion>
      </div>
      <div className={styles.filterType}>
        {showBuyingIntentFilters ? (
          <Image
            src={SquareMinusRegular}
            onClick={() => setShowBuyingIntentFilters(false)}
            className={styles.filterType__img}
          />
        ) : (
          <Image
            src={SquarePlusRegular}
            onClick={() => setShowBuyingIntentFilters(true)}
            className={styles.filterType__img}
          />
        )}
        <p className={styles.filterType__text}>MARKETPLACE METRICS</p>
      </div>
      <div className={`${styles.basicFilters} ${!showBuyingIntentFilters && styles.hide}`}>
        <Accordion>
          <div
            className={`${styles.accordianBlockWrapper} ${filterActiveIndex === 2 &&
              styles.accordianBlockWrapper__active}`}
          >
            <Accordion.Title
              active={filterActiveIndex === 2}
              index={2}
              onClick={() => handleAccordianUpArrowClick(2)}
              className={styles.accordian__title}
            >
              <div className={styles.accordian__title__block}>
                <Icon name="list" className={styles.accordian__title__icon} />
                <p>Categories</p>
              </div>
              <Image
                src={filterActiveIndex === 2 ? upArrow : downArrow}
                className={styles.accordian__title__arrowImage}
              />
            </Accordion.Title>
            <Accordion.Content active={filterActiveIndex === 2}>
              <div>
                <CheckboxDropdownFilter
                  filterOptions={getProductCategories(marketplace.value.code)}
                  label="Categories"
                  selectedValues={categories.value}
                  popUpPosition="bottom right"
                  handleChange={(newCategories: string[]) => {
                    handleFilterChange('categories', [...newCategories]);
                  }}
                />
              </div>
            </Accordion.Content>
          </div>
          <div
            className={`${styles.accordianBlockWrapper} ${filterActiveIndex === 3 &&
              styles.accordianBlockWrapper__active}`}
          >
            <Accordion.Title
              active={filterActiveIndex === 3}
              index={3}
              onClick={() => handleAccordianUpArrowClick(3)}
              className={styles.accordian__title}
            >
              <div className={styles.accordian__title__block}>
                <Icon name="map marker alternate" className={styles.accordian__title__icon} />
                <p>Brands</p>
              </div>
              <Image
                src={filterActiveIndex === 3 ? upArrow : downArrow}
                className={styles.accordian__title__arrowImage}
              />
            </Accordion.Title>
            <Accordion.Content active={filterActiveIndex === 3}>
              <div>
                <InputFilter
                  label="Include Brands"
                  placeholder="Enter separated by comma"
                  value={brands.value.include}
                  handleKeyDown={e => {
                    if (e.key === 'Enter') {
                      handleFilterChange(
                        'brands',
                        {
                          ...brands.value,
                          include: e.target.value,
                        },
                        'Enter'
                      );
                    }
                  }}
                  handleChange={(value: string) =>
                    handleFilterChange('brands', {
                      ...brands.value,
                      include: value,
                    })
                  }
                />

                {/* Exclude Brands */}
                <InputFilter
                  label="Exclude Brands"
                  placeholder="Enter separated by comma"
                  value={brands.value.exclude}
                  handleKeyDown={e => {
                    if (e.key === 'Enter') {
                      handleFilterChange(
                        'brands',
                        {
                          ...brands.value,
                          exclude: e.target.value,
                        },
                        'Enter'
                      );
                    }
                  }}
                  handleChange={(value: string) =>
                    handleFilterChange('brands', {
                      ...brands.value,
                      exclude: value,
                    })
                  }
                />

                <MinMaxFilter
                  label="Number of Brands"
                  minValue={brandsCount.value.min}
                  maxValue={brandsCount.value.max}
                  handleKeyDown={(e, type) => {
                    if (e.key === 'Enter' && type) {
                      handleFilterChange(
                        'number_brands',
                        {
                          ...brandsCount.value,
                          [type]: e.target.value,
                        },
                        'Enter'
                      );
                    }
                  }}
                  handleChange={(type: string, value: string) => {
                    handleFilterChange('number_brands', { ...brandsCount.value, [type]: value });
                  }}
                />
              </div>
            </Accordion.Content>
          </div>
          <div
            className={`${styles.accordianBlockWrapper} ${filterActiveIndex === 5 &&
              styles.accordianBlockWrapper__active}`}
          >
            <Accordion.Title
              active={filterActiveIndex === 5}
              index={5}
              onClick={() => handleAccordianUpArrowClick(5)}
              className={styles.accordian__title}
            >
              <div className={styles.accordian__title__block}>
                <Icon name="map marker alternate" className={styles.accordian__title__icon} />
                <p>Products</p>
              </div>
              <Image
                src={filterActiveIndex === 5 ? upArrow : downArrow}
                className={styles.accordian__title__arrowImage}
              />
            </Accordion.Title>
            <Accordion.Content active={filterActiveIndex === 5}>
              <div>
                {/* Include ASINS */}
                <InputFilter
                  label="Include ASINs or ISBNs"
                  placeholder="Enter separated by comma"
                  value={asins.value.include.toUpperCase()}
                  handleKeyDown={e => {
                    if (e.key === 'Enter') {
                      handleFilterChange(
                        'asins',
                        {
                          ...asins.value,
                          include: e.target.value,
                        },
                        'Enter'
                      );
                    }
                  }}
                  handleChange={(value: string) =>
                    handleFilterChange('asins', {
                      ...asins.value,
                      include: value,
                    })
                  }
                  error={asinsError.include}
                />

                {/* Exclude ASINS Name */}
                <InputFilter
                  label="Exclude ASINs or ISBNs"
                  placeholder="Enter separated by comma"
                  value={asins.value.exclude.toUpperCase()}
                  handleKeyDown={e => {
                    if (e.key === 'Enter') {
                      handleFilterChange(
                        'asins',
                        {
                          ...asins.value,
                          exclude: e.target.value,
                        },
                        'Enter'
                      );
                    }
                  }}
                  handleChange={(value: string) =>
                    handleFilterChange('asin', {
                      ...asins.value,
                      exclude: value,
                    })
                  }
                  error={asinsError.exclude}
                />

                <MinMaxFilter
                  label="Number of ASINs"
                  minValue={numberOfInventory.value.min}
                  maxValue={numberOfInventory.value.max}
                  handleKeyDown={(e, type) => {
                    if (e.key === 'Enter' && type) {
                      handleFilterChange(
                        'inventory_count',
                        {
                          ...numberOfInventory.value,
                          [type]: e.target.value,
                        },
                        'Enter'
                      );
                    }
                  }}
                  handleChange={(type: string, value: string) => {
                    handleFilterChange('inventory_count', {
                      ...numberOfInventory.value,
                      [type]: value,
                    });
                  }}
                />
              </div>
            </Accordion.Content>
          </div>
        </Accordion>
      </div>
      {/* <InputFilter
        placeholder="Company Name"
        label="Company Name"
        value={merchantName.value}
        handleKeyDown={e => {
          if (e.key === 'Enter') {
            handleFilterChange('merchant_name', e.target.value, 'Enter');
          }
        }}
        handleChange={(value: any) => {
          handleFilterChange('merchant_name', value);
        }}
      /> */}

      {/* Merchant Name */}
      {/*<InputFilter
        placeholder="Company Name"
        label="Merchant Name"
        value={merchantName.value}
        handleChange={(value: any) => {
          handleFilterChange('merchant_name', value);
        }}
      />*/}

      {/* Business Name */}
      {/*<InputFilter
        placeholder="Business Name"
        label="Business Name"
        value={businessName.value}
        handleChange={(value: any) => {
          handleFilterChange('business_name', value);
        }}
      />*/}

      {/* Categories */}
      {/* <CheckboxDropdownFilter
        filterOptions={getProductCategories(marketplace.value.code)}
        label="Categories"
        selectedValues={categories.value}
        popUpPosition="bottom right"
        handleChange={(newCategories: string[]) => {
          handleFilterChange('categories', [...newCategories]);
        }}
      /> */}

      {/* Monthly revenue */}
      {/*<MinMaxFilter
        label="Monthly Revenue"
        minValue={monthlyRevenue.value.min}
        maxValue={monthlyRevenue.value.max}
        handleChange={(type: string, value: string) => {
          handleFilterChange('sales_estimate', { ...monthlyRevenue.value, [type]: value });
        }}
      />*/}

      {/* Zip Code */}
      {/* <InputFilter
        placeholder="Zip code"
        label="Zip code"
        value={zipCode.value}
        handleChange={(value: any) => {
          handleFilterChange('zip_code', value);
        }}
      /> */}

      {/* Include Brands */}
      {/* <InputFilter
        label="Include Brands"
        placeholder="Enter separated by comma"
        value={brands.value.include}
        handleChange={(value: string) =>
          handleFilterChange('brands', {
            ...brands.value,
            include: value,
          })
        }
      /> */}

      {/* Exclude Brands */}
      {/* <InputFilter
        label="Exclude Brands"
        placeholder="Enter separated by comma"
        value={brands.value.exclude}
        handleChange={(value: string) =>
          handleFilterChange('brands', {
            ...brands.value,
            exclude: value,
          })
        }
      /> */}

      {/* Include ASINS */}
      {/* <InputFilter
        label="Include ASINs or ISBNs"
        placeholder="Enter separated by comma"
        value={asins.value.include.toUpperCase()}
        handleChange={(value: string) =>
          handleFilterChange('asins', {
            ...asins.value,
            include: value,
          })
        }
        error={asinsError.include}
      /> */}

      {/* Exclude ASINS Name */}
      {/* <InputFilter
        label="Exclude ASINs or ISBNs"
        placeholder="Enter separated by comma"
        value={asins.value.exclude.toUpperCase()}
        handleChange={(value: string) =>
          handleFilterChange('asin', {
            ...asins.value,
            exclude: value,
          })
        }
        error={asinsError.exclude}
      /> */}

      {/* Seller Reachability */}
      {/* <CheckboxFilter
        label="Seller Reachability"
        checkboxLabel="Sellers with decision makers"
        checked={sellerReachability.value}
        handleChange={(value: any) => {
          handleFilterChange('has_contact', value);
        }}
      /> */}

      {/* FBA % */}
      {/*<RadioListFilters
        label="FBA %"
        filterOptions={FBA_PERCENT_FILTER_OPTIONS}
        value={fbaCount.value}
        handleChange={(value: string) => handleFilterChange('fba_percent', value)}
      />*/}

      {/* Number of ASINs */}
      {/* <MinMaxFilter
        label="Number of ASINs"
        minValue={numberOfInventory.value.min}
        maxValue={numberOfInventory.value.max}
        handleChange={(type: string, value: string) => {
          handleFilterChange('inventory_count', { ...numberOfInventory.value, [type]: value });
        }}
      /> */}

      {/* Number of brands */}
      {/* <MinMaxFilter
        label="Number of Brands"
        minValue={brandsCount.value.min}
        maxValue={brandsCount.value.max}
        handleChange={(type: string, value: string) => {
          handleFilterChange('number_brands', { ...brandsCount.value, [type]: value });
        }}
      /> */}

      {/* Growth percent */}
      <div className={styles.groupFilters}>
        {/*<MinMaxFilter
          label="Growth %"
          minValue={growthPercent.value.min}
          maxValue={growthPercent.value.max}
          handleChange={(type: string, value: string) => {
            handleFilterChange('growth', {
              ...growthPercent.value,
              [type]: value,
            });
          }}
        />*/}
        {/*<PeriodFilter
          className={styles.periodFilter}
          placeholder="30D"
          value={growthPercent.value.period}
          filterOptions={GROWTH_FILTER_PERIOD_DURATIONS}
          handleChange={(period: string) => {
            handleFilterChange('growth', {
              ...growthPercent.value,
              period,
            });
          }}
        />*/}
      </div>

      {/* Review Filter */}
      <div className={styles.reviewGroupedFilter}>
        {/*<ReviewTypeFilter
          placeholder="Positive"
          label="Review"
          filterOptions={FILTER_REVIEW_OPTIONS}
          value={review.value.type}
          handleChange={(type: string) => {
            handleFilterChange('review_ratings', {
              ...review.value,
              type,
            });
          }}
        />*/}
        <div className={styles.groupFilters}>
          {/*<MinMaxFilter
            label=""
            minValue={review.value.min}
            maxValue={review.value.max}
            handleChange={(type: string, value: string) => {
              handleFilterChange('review_ratings', {
                ...review.value,
                [type]: value,
              });
            }}
          />*/}
          {/*<PeriodFilter
            placeholder="30D"
            value={review.value.period}
            filterOptions={REVIEW_FILTER_PERIOD_DURATIONS}
            handleChange={(period: string) => {
              handleFilterChange('review_ratings', {
                ...review.value,
                period,
              });
            }}
          />*/}
        </div>
      </div>

      {/* Launched FIlter */}
      {/*<RadioListFilters
        label="Seller Launched"
        filterOptions={LAUNCHED_FILTER_OPTIONS}
        value={sellerLaunched.value}
        handleChange={(value: string) => handleFilterChange('launched', value)}
      />*/}

      {/* Seller Ratings */}
      {/*<MinMaxRatingsFilter
        label="Seller Ratings"
        minValue={sellerRatings.value.min}
        maxValue={sellerRatings.value.max}
        handleChange={(type: string, value: string) => {
          handleFilterChange('seller_rating', { ...sellerRatings.value, [type]: value });
        }}
      />*/}

      <FormFilterActions
        onFind={handleSubmit}
        onReset={handleReset}
        className={styles.filtersSubmit}
        disabled={asinsError.include || asinsError.exclude}
        hideSubmit={true}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isLoadingSellersForMap: getIsLoadingSellerForMap(state),
    sellerMapFilterData: getSellerMapFilterData(state),
  };
};

export const mapDispatchToProps = (dispatch: any) => {
  return {
    updateSellerMapFilterOptions: (payload: UpdateSellerMapFilterPayload) =>
      dispatch(updateSellerMapFilterOptions(payload)),
    fetchSellersFormap: (payload: SellerMapPayload) => dispatch(fetchSellersForMap(payload)),
    fetchSellersForSellerList: () => dispatch(fetchSellersListForMap({})),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SellerMapFilter);
