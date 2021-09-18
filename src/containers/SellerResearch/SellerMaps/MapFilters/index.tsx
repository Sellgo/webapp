import React, { useState, useMemo, useEffect } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

/* Styling */
import styles from './index.module.scss';

/* Constants */
import {
  COUNTRY_DROPDOWN_LIST,
  getMapLimitOptions,
  STATES_DROPDOWN_LIST,
  DEFAULT_US_MARKET,
  SELLER_MAP_MARKETPLACE,
  DEFAULT_MIN_MAX_FILTER,
} from '../../../../constants/SellerResearch/SellerMap';

import { PRODUCTS_DATABASE_CATEGORIES } from '../../../../constants/ProductResearch/ProductsDatabase';

/* Selectors */
import {
  getIsLoadingSellerDetailsForMap,
  getIsLoadingSellerForMap,
} from '../../../../selectors/SellerResearch/SellerMap';
import { getSellerSubscriptionLimits } from '../../../../selectors/Subscription';

/* Actions */
import { fetchSellersForMap } from '../../../../actions/SellerResearch/SellerMap';

/* Components */
import FormFilterActions from '../../../../components/FormFilters/FormFilterActions';
import InputFilter from '../../../../components/FormFilters/InputFilter';
import SelectionFilter from '../../../../components/FormFilters/SelectionFilter';
import MarketPlaceFilter from '../../../../components/FormFilters/MarketPlaceFilter';
import MinMaxFilter from '../../../../components/FormFilters/MinMaxFilter';
import CheckboxDropdownFilter from '../../../../components/FormFilters/CheckboxDropdownFilter';

/* Interfaces */
import { SellerMapPayload } from '../../../../interfaces/SellerResearch/SellerMap';
import { SellerSubscriptionLimits } from '../../../../interfaces/Subscription';
import { MarketplaceOption } from '../../../../interfaces/SellerResearch/SellerDatabase';

/* Props */
interface Props {
  fetchSellersForMap: (payload: SellerMapPayload) => void;
  isLoadingSellersForMap: boolean;
  isLoadingSellerDetailsForMap: boolean;
  sellerSubscriptionLimits: SellerSubscriptionLimits;
}

const MapFilters = (props: Props) => {
  const {
    isLoadingSellersForMap,
    sellerSubscriptionLimits,
    fetchSellersForMap,
    isLoadingSellerDetailsForMap,
  } = props;

  /* Basic Filters */
  const [marketPlace, setMarketPlace] = useState<MarketplaceOption>(DEFAULT_US_MARKET);
  const [country, setCountry] = useState<string>('US');
  const [state, setState] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');
  const [merchantName, setMerchantName] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState(DEFAULT_MIN_MAX_FILTER);
  const [sellerLimit, setSellerLimit] = useState<string>('1000');

  /* Error States */
  const [zipCodeError, setZipCodeError] = useState<boolean>(false);

  /* Map loading condition */
  const isLoadingMapDetails = useMemo(() => {
    return isLoadingSellerDetailsForMap || isLoadingSellersForMap;
  }, [isLoadingSellerDetailsForMap, isLoadingSellersForMap]);

  /* ==================== Handlers ==================== */
  const clearFilters = () => {
    setMarketPlace(DEFAULT_US_MARKET);
    setCountry('US');
    setState('');
    setZipCode('');
    setMerchantName('');
    setCategories([]);
    setMonthlyRevenue(DEFAULT_MIN_MAX_FILTER);
    setSellerLimit('1000');
  };

  const handleReset = () => {
    clearFilters();
    fetchSellersForMap({ resetMap: true });
  };

  /* Handle Submit */
  const handleSubmit = () => {
    fetchSellersForMap({
      marketplaceId: marketPlace.value,
      country,
      state,
      zipCode,
      merchantName,
      categories: categories.join(','),
      minMonthlyRevenue: monthlyRevenue.min,
      maxMonthlyRevenue: monthlyRevenue.max,
      maxCount: Number(sellerLimit),
    });
  };

  /* Effect to handle errroron zipcodes */
  useEffect(() => {
    if (zipCode.length) {
      setZipCodeError(!validator.isNumeric(zipCode));
    } else {
      setZipCodeError(false);
    }
  }, [zipCode]);

  return (
    <>
      {/* Basic Filter */}
      <div className={styles.basicFilters}>
        {/* Marketplace */}
        <MarketPlaceFilter
          label="Choose Marketplace"
          marketPlaceChoices={SELLER_MAP_MARKETPLACE}
          marketplaceDetails={marketPlace}
          handleChange={(option: MarketplaceOption) => setMarketPlace(option)}
        />

        {/* Country */}
        <SelectionFilter
          label="Seller Country"
          placeholder="Country"
          filterOptions={COUNTRY_DROPDOWN_LIST}
          value={country}
          handleChange={(value: string) => {
            setCountry(value);
            setState('');
          }}
          loading={isLoadingMapDetails}
          disabled={isLoadingMapDetails}
        />

        {/* All States */}
        <SelectionFilter
          label="U.S. States"
          placeholder="All States"
          filterOptions={STATES_DROPDOWN_LIST}
          value={state}
          handleChange={(value: string) => setState(value)}
          disabled={country !== 'US' || isLoadingMapDetails}
          loading={isLoadingMapDetails}
        />

        {/* Zip code */}
        <InputFilter
          label="Zipcode"
          placeholder="Enter U.S Zip code"
          value={zipCode}
          handleChange={(value: string) => setZipCode(value)}
          disabled={country !== 'US' || isLoadingMapDetails}
          error={zipCodeError}
        />

        {/* Merchant Name */}
        <InputFilter
          label="Merchant Name"
          placeholder="Enter Merchant Name"
          value={merchantName}
          handleChange={value => setMerchantName(value)}
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

        {/* Monthly Revenue */}
        <MinMaxFilter
          label="Monthly Revenue"
          prependWith={marketPlace.currency}
          minValue={monthlyRevenue.min}
          maxValue={monthlyRevenue.max}
          handleChange={(type: string, value: string) =>
            setMonthlyRevenue(prevState => ({
              ...prevState,
              [type]: value,
            }))
          }
        />

        {/* Seller Limit */}
        <SelectionFilter
          label="View"
          placeholder="Seller Limit"
          value={String(sellerLimit)}
          filterOptions={getMapLimitOptions(sellerSubscriptionLimits.sellerMapDropdownLimit)}
          handleChange={(value: string) => setSellerLimit(value)}
          disabled={isLoadingMapDetails}
          loading={isLoadingMapDetails}
        />
      </div>

      <FormFilterActions onFind={handleSubmit} onReset={handleReset} />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  isLoadingSellersForMap: getIsLoadingSellerForMap(state),
  isLoadingSellerDetailsForMap: getIsLoadingSellerDetailsForMap(state),
  sellerSubscriptionLimits: getSellerSubscriptionLimits(state),
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSellersForMap: (payload: SellerMapPayload) => dispatch(fetchSellersForMap(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapFilters);
