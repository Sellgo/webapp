import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Constants */
import {
  FILTER_REVIEW_OPTIONS,
  FILTER_PERIOD_DURATIONS,
  parseSellerMapFilterData,
  LAUNCHED_FILTER_OPTIONS,
  FBA_PERCENT_FILTER_OPTIONS,
} from '../../../../constants/SellerResearch';

/* Selectors */
import { getSellerMapFilterData } from '../../../../selectors/SellerResearch/SellerMap';

/* Actions */
import {
  fetchSellersForMap,
  fetchSellersListForMap,
  updateSellerMapFilterOptions,
} from '../../../../actions/SellerResearch/SellerMap';

/* Components */
import InputFilter from '../../../../components/FormFilters/InputFilter';
import MinMaxFilter from '../../../../components/FormFilters/MinMaxFilter';
import MinMaxRatingsFilter from '../../../../components/FormFilters/MinMaxRatingsFilter';
import ReviewTypeFilter from '../../../../components/FormFilters/ReviewTypeFilter';
import PeriodFilter from '../../../../components/FormFilters/PeriodFilter';
import RadioListFilters from '../../../../components/FormFilters/RadioListFilters';
import FormFilterActions from '../../../../components/FormFilters/FormFilterActions';

/* Interfaces */
import {
  SellerMapPayload,
  UpdateSellerMapFilterPayload,
} from '../../../../interfaces/SellerResearch/SellerMap';
import CheckboxDropdownFilter from '../../../../components/FormFilters/CheckboxDropdownFilter';
import {
  DEFAULT_INCLUDE_EXCLUDE_ERROR,
  getProductCategories,
} from '../../../../constants/ProductResearch/ProductsDatabase';
import { isValidAsin } from '../../../../constants';

interface Props {
  sellerMapFilterData: any[];
  showFilter: boolean;
  updateSellerMapFilterOptions: (payload: UpdateSellerMapFilterPayload) => void;
  fetchSellersFormap: (payload: SellerMapPayload) => void;
  fetchSellersForSellerList: () => void;
}

const SellerMapFilter = (props: Props) => {
  const {
    sellerMapFilterData,
    showFilter,
    updateSellerMapFilterOptions,
    fetchSellersFormap,
    fetchSellersForSellerList,
  } = props;
  const [asinsError, setAsinsError] = useState(DEFAULT_INCLUDE_EXCLUDE_ERROR);

  /* Get marketplace */
  const marketplace = parseSellerMapFilterData(sellerMapFilterData, 'marketplace');

  /* Categories */
  const categories = parseSellerMapFilterData(sellerMapFilterData, 'categories');

  /* Monthly revenue */
  const monthlyRevenue = parseSellerMapFilterData(sellerMapFilterData, 'sales_estimate');

  /* Business Name */
  const businessName = parseSellerMapFilterData(sellerMapFilterData, 'business_name');

  /* Brands */
  const brands = parseSellerMapFilterData(sellerMapFilterData, 'brands');

  /* Asins */
  const asins = parseSellerMapFilterData(sellerMapFilterData, 'asin');

  /* Fba count */
  const fbaCount = parseSellerMapFilterData(sellerMapFilterData, 'fba_percent');

  /* # of ASINs */
  const numberOfInventory = parseSellerMapFilterData(sellerMapFilterData, 'inventory_count');

  /* Brands count */
  const brandsCount = parseSellerMapFilterData(sellerMapFilterData, 'number_brands');

  /* Growth percent */
  const growthPercent = parseSellerMapFilterData(sellerMapFilterData, 'growth_percent');

  /* Growth count */
  const growthCount = parseSellerMapFilterData(sellerMapFilterData, 'growth_count');

  /* Review */
  const review = parseSellerMapFilterData(sellerMapFilterData, 'review_ratings');

  /* Seller Launched */
  const sellerLaunched = parseSellerMapFilterData(sellerMapFilterData, 'launched');

  /* Seller Ratings */
  const sellerRatings = parseSellerMapFilterData(sellerMapFilterData, 'seller_rating');

  /* Merchant Name???/? */
  const merchantName = parseSellerMapFilterData(sellerMapFilterData, 'merchant_name');

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

  const handleFilterChange = (keyName: any, value: any) => {
    updateSellerMapFilterOptions({ keyName, value });
  };

  const handleSubmit = () => {
    fetchSellersFormap({ enableLoader: true });
    fetchSellersForSellerList();
  };

  const handleReset = () => {
    fetchSellersFormap({ resetMap: true });
  };

  return (
    <div className={`${styles.filterWrapper} ${!showFilter ? styles.filterWrapper__closed : ''}`}>
      {/* Categories */}
      <CheckboxDropdownFilter
        filterOptions={getProductCategories(marketplace.value.code)}
        label="Categories"
        selectedValues={categories.value}
        popUpPosition="bottom right"
        handleChange={(newCategories: string[]) => {
          handleFilterChange('categories', [...newCategories]);
        }}
      />

      {/* Monthly revenue */}
      <MinMaxFilter
        label="Monthly Revenue"
        minValue={monthlyRevenue.value.min}
        maxValue={monthlyRevenue.value.max}
        handleChange={(type: string, value: string) => {
          handleFilterChange('monthly_revenue', { ...monthlyRevenue.value, [type]: value });
        }}
      />

      {/* Merchant Name */}
      <InputFilter
        placeholder="Merchant Name"
        label="Merchant Name"
        value={merchantName.value}
        handleChange={(value: any) => {
          handleFilterChange('merchant_name', value);
        }}
      />

      {/* Business Name */}
      <InputFilter
        placeholder="Business Name"
        label="Business Name"
        value={businessName.value}
        handleChange={(value: any) => {
          handleFilterChange('business_name', value);
        }}
      />

      {/* Include Brands */}
      <InputFilter
        label="Include Brands"
        placeholder="Enter separated by comma"
        value={brands.value.include}
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
        handleChange={(value: string) =>
          handleFilterChange('brands', {
            ...brands.value,
            exclude: value,
          })
        }
      />

      {/* Include ASINS */}
      <InputFilter
        label="Include ASINs or ISBNs"
        placeholder="Enter separated by comma"
        value={asins.value.include.toUpperCase()}
        handleChange={(value: string) =>
          handleFilterChange('asin', {
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
        handleChange={(value: string) =>
          handleFilterChange('asin', {
            ...asins.value,
            exclude: value,
          })
        }
        error={asinsError.exclude}
      />

      {/* FBA % */}
      <RadioListFilters
        label="FBA %"
        filterOptions={FBA_PERCENT_FILTER_OPTIONS}
        value={fbaCount.value}
        handleChange={(value: string) => handleFilterChange('fba_percent', value)}
      />

      {/* Number of ASINs */}
      <MinMaxFilter
        label="Number of ASINs"
        minValue={numberOfInventory.value.min}
        maxValue={numberOfInventory.value.max}
        handleChange={(type: string, value: string) => {
          handleFilterChange('inventory_count', { ...numberOfInventory.value, [type]: value });
        }}
      />

      {/* Number of brands */}
      <MinMaxFilter
        label="Number of Brands"
        minValue={brandsCount.value.min}
        maxValue={brandsCount.value.max}
        handleChange={(type: string, value: string) => {
          handleFilterChange('number_brands', { ...brandsCount.value, [type]: value });
        }}
      />

      {/* Growth percent */}
      <div className={styles.groupFilters}>
        <MinMaxFilter
          label="Growth %"
          minValue={growthPercent.value.min}
          maxValue={growthPercent.value.max}
          handleChange={(type: string, value: string) => {
            handleFilterChange('growth_percent', {
              ...growthPercent.value,
              [type]: value,
            });
          }}
        />
        <PeriodFilter
          className={styles.periodFilter}
          placeholder="30D"
          value={growthPercent.value.period}
          filterOptions={FILTER_PERIOD_DURATIONS}
          handleChange={(period: string) => {
            handleFilterChange('growth_percent', {
              ...growthPercent.value,
              period,
            });
          }}
        />
      </div>

      {/* Growth count */}
      <div className={styles.groupFilters}>
        <MinMaxFilter
          label="Growth Count"
          minValue={growthCount.value.min}
          maxValue={growthCount.value.max}
          handleChange={(type: string, value: string) => {
            handleFilterChange('growth_count', {
              ...growthCount.value,
              [type]: value,
            });
          }}
        />
        <PeriodFilter
          placeholder="30D"
          value={growthCount.value.period}
          filterOptions={FILTER_PERIOD_DURATIONS}
          handleChange={(period: string) => {
            handleFilterChange('growth_count', {
              ...growthCount.value,
              period,
            });
          }}
        />
      </div>

      {/* Review Filter */}
      <div className={styles.reviewGroupedFilter}>
        <ReviewTypeFilter
          placeholder="Positive"
          label="Review Count"
          filterOptions={FILTER_REVIEW_OPTIONS}
          value={review.value.type}
          handleChange={(type: string) => {
            handleFilterChange('review_ratings', {
              ...review.value,
              type,
            });
          }}
        />
        <div className={styles.groupFilters}>
          <MinMaxFilter
            label=""
            minValue={review.value.min}
            maxValue={review.value.max}
            handleChange={(type: string, value: string) => {
              handleFilterChange('review', {
                ...review.value,
                [type]: value,
              });
            }}
          />
          <PeriodFilter
            placeholder="30D"
            value={review.value.period}
            filterOptions={FILTER_PERIOD_DURATIONS}
            handleChange={(period: string) => {
              handleFilterChange('review', {
                ...review.value,
                period,
              });
            }}
          />
        </div>
      </div>

      {/* Launched FIlter */}
      <RadioListFilters
        label="Seller Launched"
        filterOptions={LAUNCHED_FILTER_OPTIONS}
        value={sellerLaunched.value}
        handleChange={(value: string) => handleFilterChange('launched', value)}
      />

      {/* Seller Ratings */}
      <MinMaxRatingsFilter
        label="Seller Ratings"
        minValue={sellerRatings.value.min}
        maxValue={sellerRatings.value.max}
        handleChange={(type: string, value: string) => {
          handleFilterChange('seller_rating', { ...sellerRatings.value, [type]: value });
        }}
      />

      <FormFilterActions
        onFind={handleSubmit}
        onReset={handleReset}
        className={styles.filtersSubmit}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
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
