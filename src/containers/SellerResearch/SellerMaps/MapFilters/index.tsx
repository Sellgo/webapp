import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

/* Styling */
import styles from './index.module.scss';

/* Constants */
import {
  COUNTRY_DROPDOWN_LIST,
  getMapLimitOptions,
  STATES_DROPDOWN_LIST,
} from '../../../../constants/SellerResearch/SellerMap';

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

/* Interfaces */
import { SellerMapPayload } from '../../../../interfaces/SellerResearch/SellerMap';
import { SellerSubscriptionLimits } from '../../../../interfaces/Subscription';

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
  const [country, setCountry] = useState<string>('US');
  const [state, setState] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');
  const [sellerLimit, setSellerLimit] = useState<string>('1000');

  /* Error States */
  const [zipCodeError, setZipCodeError] = useState<boolean>(false);

  /* Map loading condition */
  const isLoadingMapDetails = useMemo(() => {
    return isLoadingSellerDetailsForMap || isLoadingSellersForMap;
  }, [isLoadingSellerDetailsForMap, isLoadingSellersForMap]);

  /* ==================== Handlers ==================== */
  const clearFilters = () => {
    setState('');
    setZipCode('');
    setCountry('US');
    setSellerLimit('1000');
  };

  const handleReset = useCallback(() => {
    clearFilters();
    fetchSellersForMap({ resetMap: true });
  }, []);

  /* Handle Submit */
  const handleSubmit = useCallback(() => {
    fetchSellersForMap({
      state,
      zipCode,
      maxCount: Number(sellerLimit),
      country,
    });
  }, [state, zipCode, sellerLimit, country]);

  /* =================================== */

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
        <SelectionFilter
          label="Country"
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

        <SelectionFilter
          label="U.S. States"
          placeholder="All States"
          filterOptions={STATES_DROPDOWN_LIST}
          value={state}
          handleChange={(value: string) => setState(value)}
          disabled={country !== 'US' || isLoadingMapDetails}
          loading={isLoadingMapDetails}
        />

        <InputFilter
          label="Zipcode"
          placeholder="Enter U.S Zip code"
          value={zipCode}
          handleChange={(value: string) => setZipCode(value)}
          disabled={country !== 'US' || isLoadingMapDetails}
          error={zipCodeError}
        />

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

      {/* Advanced Filter */}
      {/* <div className={styles.advancedFilterWrapper}>
        <div
          className={styles.advancedFilterToggle}
          onClick={() => setShowAdvancedFilter(prevState => !prevState)}
        >
          <span>Advanced Filters</span>
          <span>
            {showAdvancedFilter ? <Icon name="chevron up" /> : <Icon name="chevron down" />}
          </span>
        </div>

        {showAdvancedFilter && <div className={styles.showAdvancedFilter}>Advanced Filters</div>}
      </div> */}

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
