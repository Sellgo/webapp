import React from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Constants */
import {
  FILTER_REVIEW_OPTIONS,
  FILTER_PERIOD_DURATIONS,
  parseSellerMapFilterData,
  LAUNCHED_FILTER_OPTIONS,
} from '../../../../constants/SellerResearch';

/* Selectors */
import { getSellerMapFilterData } from '../../../../selectors/SellerResearch/SellerMap';

/* Actions */
import {
  fetchSellersForMap,
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
import { getProductCategories } from '../../../../constants/ProductResearch/ProductsDatabase';

interface Props {
  sellerMapFilterData: any[];
  updateSellerMapFilterOptions: (payload: UpdateSellerMapFilterPayload) => void;
  fetchSellersFormap: (payload: SellerMapPayload) => void;
}

const SellerMapFilter = (props: Props) => {
  const { sellerMapFilterData, updateSellerMapFilterOptions, fetchSellersFormap } = props;
  console.log(sellerMapFilterData);

  /* Get marketplace */
  const marketplace = parseSellerMapFilterData(sellerMapFilterData, 'marketplace');

  /* Categories */
  const categories = parseSellerMapFilterData(sellerMapFilterData, 'categories');

  /* Merchant Name */
  const merchantName = parseSellerMapFilterData(sellerMapFilterData, 'merchant_name');

  /* # of ASINs */
  const numberOfInventory = parseSellerMapFilterData(sellerMapFilterData, 'inventory_count');

  /* Seller Ratings */
  const sellerRatings = parseSellerMapFilterData(sellerMapFilterData, 'seller_rating');

  /* Review */
  const review = parseSellerMapFilterData(sellerMapFilterData, 'review');

  /* Seller Type */
  const sellerLaunched = parseSellerMapFilterData(sellerMapFilterData, 'launched');

  const handleFilterChange = (keyName: any, value: any) => {
    updateSellerMapFilterOptions({ keyName, value });
  };

  const handleSubmit = () => {
    fetchSellersFormap({ enableLoader: true });
  };

  const handleReset = () => {
    fetchSellersFormap({ resetMap: true });
  };

  return (
    <div className={styles.filterWrapper}>
      {/* Categories */}
      <CheckboxDropdownFilter
        filterOptions={getProductCategories(marketplace.value.code)}
        label="Categories"
        selectedValues={categories.value}
        handleChange={(newCategories: string[]) => {
          handleFilterChange('categories', [...newCategories]);
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

      {/* Number of ASINs */}
      <MinMaxFilter
        label="# of Inventory"
        minValue={numberOfInventory.value.min}
        maxValue={numberOfInventory.value.max}
        handleChange={(type: string, value: string) => {
          handleFilterChange('inventory_count', { ...numberOfInventory.value, [type]: value });
        }}
      />

      {/*  Review Filter */}
      <div className={styles.reviewGroupedFilter}>
        <ReviewTypeFilter
          placeholder="Positive"
          label="Review"
          filterOptions={FILTER_REVIEW_OPTIONS}
          value={review.value.type}
          handleChange={(type: string) => {
            handleFilterChange('review', {
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SellerMapFilter);
