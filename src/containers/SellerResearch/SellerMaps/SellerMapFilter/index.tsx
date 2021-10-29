import React from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Constants */
import { parseSellerMapFilterData } from '../../../../constants/SellerResearch/SellerMap';

/* Selectors */
import { getSellerMapFilterData } from '../../../../selectors/SellerResearch/SellerMap';

/* Actions */
import { updateSellerMapFilterOptions } from '../../../../actions/SellerResearch/SellerMap';

/* Components */
import InputFilter from '../../../../components/FormFilters/InputFilter';
import MinMaxFilter from '../../../../components/FormFilters/MinMaxFilter';
import MinMaxRatingsFilter from '../../../../components/FormFilters/MinMaxRatingsFilter';

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
