import React from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Constants */
import {
  COUNTRY_DROPDOWN_LIST,
  getMapLimitOptions,
  SELLER_MAP_MARKETPLACE,
  STATES_DROPDOWN_LIST,
} from '../../../../constants/SellerResearch/SellerMap';
import { parseSellerMapFilterData } from '../../../../constants/SellerResearch';
import { getProductCategories } from '../../../../constants/ProductResearch/ProductsDatabase';

/* Selectors */
import {
  getIsLoadingSellerForMap,
  getSellerMapFilterData,
} from '../../../../selectors/SellerResearch/SellerMap';
import { getSellerSubscriptionLimits } from '../../../../selectors/Subscription';

/* Actions */
import {
  fetchSellersForMap,
  fetchSellersListForMap,
  updateSellerMapFilterOptions,
} from '../../../../actions/SellerResearch/SellerMap';

/* Utils */
import { timeout } from '../../../../utils/timeout';

/* Components */
import MarketPlaceFilter from '../../../../components/FormFilters/MarketPlaceFilter';
import SelectionFilter from '../../../../components/FormFilters/SelectionFilter';

/* Interfaces */
import {
  SellerMapPayload,
  UpdateSellerMapFilterPayload,
} from '../../../../interfaces/SellerResearch/SellerMap';
import { SellerSubscriptionLimits } from '../../../../interfaces/Subscription';
import { MarketplaceOption } from '../../../../interfaces/SellerResearch/SellerDatabase';

interface Props {
  sellerMapFilterData: any[];
  isLoadingSellerMap: boolean;
  sellerSubscriptionLimits: SellerSubscriptionLimits;
  updateSellerMapFilterOptions: (payload: UpdateSellerMapFilterPayload) => void;
  fetchSellersForMap: (payload: SellerMapPayload) => void;
  fetchSellersListForMap: () => void;
}

const GlobalMapFilters = (props: Props) => {
  const {
    sellerMapFilterData,
    isLoadingSellerMap,
    sellerSubscriptionLimits,
    updateSellerMapFilterOptions,
    fetchSellersForMap,
    fetchSellersListForMap,
  } = props;

  /* Marketplace */
  const marketPlace = parseSellerMapFilterData(sellerMapFilterData, 'marketplace_id');

  /* Country */
  const country = parseSellerMapFilterData(sellerMapFilterData, 'country');

  /* State */
  const state = parseSellerMapFilterData(sellerMapFilterData, 'state');

  /* Seller Limit */
  const sellerLimit = parseSellerMapFilterData(sellerMapFilterData, 'max_count');

  const handleFilterChange = (keyName: any, value: any) => {
    updateSellerMapFilterOptions({ keyName, value });
  };

  const handleRefectSellers = async () => {
    await timeout(500);
    fetchSellersForMap({ enableLoader: true });
    fetchSellersListForMap();
  };

  let mapDisplayOptions = getMapLimitOptions(sellerSubscriptionLimits.sellerMapDropdownLimit);
  mapDisplayOptions = mapDisplayOptions.map((option: MarketplaceOption) => {
    return {
      ...option,
      // content: <div>Add upgrade CTA here</div>
    };
  });

  /* Update max count to seller's subscription max limit */
  React.useEffect(() => {
    const availableMapDisplayOptions = mapDisplayOptions.filter(
      (item: MarketplaceOption) => !item.disabled
    );
    handleFilterChange(
      'max_count',
      availableMapDisplayOptions[availableMapDisplayOptions.length - 1].value
    );
    handleRefectSellers();
  }, []);

  return (
    <div className={styles.globlMapFilters}>
      {/* Marketplace */}
      <MarketPlaceFilter
        label="Choose Marketplace"
        marketPlaceChoices={SELLER_MAP_MARKETPLACE}
        marketplaceDetails={marketPlace.value}
        handleChange={(option: MarketplaceOption) => {
          handleFilterChange('marketplace_id', option);
          handleFilterChange('country', option.code);
          if (getProductCategories(option.code) !== getProductCategories(marketPlace.code)) {
            // set empty categories here
          }

          if (marketPlace.value !== option.value) {
            handleRefectSellers();
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
          if (value !== country.value) {
            handleRefectSellers();
          }
        }}
        loading={isLoadingSellerMap}
        disabled={isLoadingSellerMap}
        className={styles.countryFilter}
      />

      {/* All States */}
      <SelectionFilter
        label="U.S. States"
        placeholder="All States"
        filterOptions={STATES_DROPDOWN_LIST}
        value={state.value}
        handleChange={(value: string) => {
          handleFilterChange('state', value);
          if (value !== state.value) {
            handleRefectSellers();
          }
        }}
        disabled={country.value !== 'US' || isLoadingSellerMap}
        loading={isLoadingSellerMap}
        className={styles.countryFilter}
      />

      {/* Seller Limit */}
      <SelectionFilter
        label="View"
        placeholder="Seller Limit"
        value={String(sellerLimit.value)}
        filterOptions={mapDisplayOptions}
        handleChange={(value: string) => {
          handleFilterChange('max_count', value);
          if (value !== sellerLimit.value) {
            handleRefectSellers();
          }
        }}
        disabled={isLoadingSellerMap}
        loading={isLoadingSellerMap}
        className={styles.limitFilter}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    sellerMapFilterData: getSellerMapFilterData(state),
    isLoadingSellerMap: getIsLoadingSellerForMap(state),
    sellerSubscriptionLimits: getSellerSubscriptionLimits(state),
  };
};

export const mapDispatchToProps = (dispatch: any) => {
  return {
    updateSellerMapFilterOptions: (payload: UpdateSellerMapFilterPayload) =>
      dispatch(updateSellerMapFilterOptions(payload)),
    fetchSellersForMap: (payload: SellerMapPayload) => dispatch(fetchSellersForMap(payload)),
    fetchSellersListForMap: () => dispatch(fetchSellersListForMap({})),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GlobalMapFilters);
