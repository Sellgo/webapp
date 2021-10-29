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
import { updateSellerMapFilterOptions } from '../../../../actions/SellerResearch/SellerMap';

/* Components */
import InputFilter from '../../../../components/FormFilters/InputFilter';
import MinMaxFilter from '../../../../components/FormFilters/MinMaxFilter';
import MinMaxRatingsFilter from '../../../../components/FormFilters/MinMaxRatingsFilter';
import ReviewTypeFilter from '../../../../components/FormFilters/ReviewTypeFilter';
import PeriodFilter from '../../../../components/FormFilters/PeriodFilter';
import RadioListFilters from '../../../../components/FormFilters/RadioListFilters';

/* Interfaces */
import { UpdateSellerMapFilterPayload } from '../../../../interfaces/SellerResearch/SellerMap';

interface Props {
  sellerMapFilterData: any[];
  updateSellerMapFilterOptions: (payload: UpdateSellerMapFilterPayload) => void;
}

const SellerMapFilter = (props: Props) => {
  const { sellerMapFilterData, updateSellerMapFilterOptions } = props;

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

  // const handleSubmit = () => {
  //   console.log('Submit filters');
  // };

  // const handleReset = () => {
  //   console.log('Handle Reset');
  // };

  return (
    <div className={styles.filterWrapper}>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SellerMapFilter);
