import React from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Components */
import MarketPlaceFilter from '../../../../components/FormFilters/MarketPlaceFilter';
import {
  fetchSellersForMap,
  updateSellerMapFilterOptions,
} from '../../../../actions/SellerResearch/SellerMap';
import {
  SellerMapPayload,
  UpdateSellerMapFilterPayload,
} from '../../../../interfaces/SellerResearch/SellerMap';
import {
  getIsLoadingSellerForMap,
  getSellerMapFilterData,
} from '../../../../selectors/SellerResearch/SellerMap';
import {
  COUNTRY_DROPDOWN_LIST,
  SELLER_MAP_MARKETPLACE,
  STATES_DROPDOWN_LIST,
} from '../../../../constants/SellerResearch/SellerMap';
import { parseSellerMapFilterData } from '../../../../constants/SellerResearch';
import { MarketplaceOption } from '../../../../interfaces/SellerResearch/SellerDatabase';
import { getProductCategories } from '../../../../constants/ProductResearch/ProductsDatabase';
import SelectionFilter from '../../../../components/FormFilters/SelectionFilter';

interface Props {
  sellerMapFilterData: any[];
  isLoadingSellerMap: boolean;
  updateSellerMapFilterOptions: (payload: UpdateSellerMapFilterPayload) => void;
  fetchSellersFormap: (payload: SellerMapPayload) => void;
}

const GlobalMapFilters = (props: Props) => {
  const { sellerMapFilterData, isLoadingSellerMap, updateSellerMapFilterOptions } = props;

  /* Marketplace */
  const marketPlace = parseSellerMapFilterData(sellerMapFilterData, 'marketplace');

  /* Country */
  const country = parseSellerMapFilterData(sellerMapFilterData, 'country');

  /* State */
  const state = parseSellerMapFilterData(sellerMapFilterData, 'state');

  const handleFilterChange = (keyName: any, value: any) => {
    updateSellerMapFilterOptions({ keyName, value });
  };

  return (
    <div className={styles.globlMapFilters}>
      {/* Marketplace */}
      <MarketPlaceFilter
        label="Choose Marketplace"
        marketPlaceChoices={SELLER_MAP_MARKETPLACE}
        marketplaceDetails={marketPlace.value}
        handleChange={(option: MarketplaceOption) => {
          handleFilterChange('marketplace', option);
          handleFilterChange('country', option.code);
          if (getProductCategories(option.code) !== getProductCategories(marketPlace.code)) {
            // set empty categories here
          }
        }}
      />

      {/* Country */}
      <SelectionFilter
        label="Seller Country"
        placeholder="Country"
        filterOptions={COUNTRY_DROPDOWN_LIST}
        value={country.value}
        handleChange={(value: string) => {
          handleFilterChange('country', value);
          handleFilterChange('state', '');
        }}
        loading={isLoadingSellerMap}
        disabled={isLoadingSellerMap}
      />

      {/* All States */}
      <SelectionFilter
        label="U.S. States"
        placeholder="All States"
        filterOptions={STATES_DROPDOWN_LIST}
        value={state.value}
        handleChange={(value: string) => {
          handleFilterChange('state', value);
        }}
        disabled={country.value !== 'US' || isLoadingSellerMap}
        loading={isLoadingSellerMap}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    sellerMapFilterData: getSellerMapFilterData(state),
    isLoadingSellerMap: getIsLoadingSellerForMap(state),
  };
};

export const mapDispatchToProps = (dispatch: any) => {
  return {
    updateSellerMapFilterOptions: (payload: UpdateSellerMapFilterPayload) =>
      dispatch(updateSellerMapFilterOptions(payload)),
    fetchSellersFormap: (payload: SellerMapPayload) => dispatch(fetchSellersForMap(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GlobalMapFilters);
