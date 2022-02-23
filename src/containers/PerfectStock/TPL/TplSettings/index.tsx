import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';

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
  DEFAULT_US_MARKET,
  SELLER_DB_MARKETPLACE,
} from '../../../../constants/SellerResearch/SellerDatabase';
import { getProductCategories } from '../../../../constants/ProductResearch/ProductsDatabase';

import {
  COUNTRY_DROPDOWN_LIST,
  STATES_DROPDOWN_LIST,
} from '../../../../constants/SellerResearch/SellerMap';

/* Components */
import InputFilter from '../../../../components/FormFilters/InputFilter';
import FormFilterActions from '../../../../components/FormFilters/FormFilterActions';
import MarketPlaceFilter from '../../../../components/FormFilters/MarketPlaceFilter';
import SelectionFilter from '../../../../components/FormFilters/SelectionFilter';

interface Props {
  fetchSellerDatabase: (payload: SellerDatabasePayload) => void;
  setSellerDatabaseMarketplace: (payload: MarketplaceOption) => void;
}

const SellerDatabaseFilters = (props: Props) => {
  const { fetchSellerDatabase, setSellerDatabaseMarketplace } = props;

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
    console.log(filterPayload);
  };

  const handleReset = () => {
    setSellerDatabaseMarketplace(DEFAULT_US_MARKET);
    setSellerDatabaseFilters(DEFAULT_SELLER_DATABASE_FILTER);
    /* Reset Error States */
    setAsinsError(DEFAULT_INCLUDE_EXCLUDE_ERROR);
    setSellerIdsError(DEFAULT_INCLUDE_EXCLUDE_ERROR);

    fetchSellerDatabase({ resetFilter: true });
  };

  /* Effect on component mount */
  useEffect(() => {
    handleReset();

    return () => {
      handleReset();
    };
  }, []);

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
          {/* 3PL NAME */}
          <SelectionFilter
            label="3PL NAME"
            placeholder="3PL NAME"
            filterOptions={STATES_DROPDOWN_LIST}
            value={sellerDatabaseFilters.state}
            handleChange={(value: string) => updateSellerDatabaseFilter('state', value)}
            disabled={sellerDatabaseFilters.country !== 'US'}
          />

          {/* STATUS */}
          <SelectionFilter
            label="STATUS"
            placeholder="STATUS"
            filterOptions={STATES_DROPDOWN_LIST}
            value={sellerDatabaseFilters.state}
            handleChange={(value: string) => updateSellerDatabaseFilter('state', value)}
            disabled={sellerDatabaseFilters.country !== 'US'}
          />

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

          {/* ACCOUNT NUMBER */}
          <InputFilter
            label="ACCOUNT NUMBER"
            placeholder="Account Number"
            value={sellerDatabaseFilters.brands.include}
            handleChange={(value: string) =>
              updateSellerDatabaseFilter('brands', {
                ...sellerDatabaseFilters.brands,
                include: value,
              })
            }
          />

          {/* MONTHLY STORAGE COST PER PALLET */}
          <InputFilter
            label="MONTHLY STORAGE COST PER PALLET"
            placeholder="MONTHLY STORAGE COST PER PALLET"
            value={sellerDatabaseFilters.merchantName}
            handleChange={(value: string) => updateSellerDatabaseFilter('merchantName', value)}
          />

          {/* Address */}
          <InputFilter
            label="Address"
            placeholder="Address"
            value={sellerDatabaseFilters.businessName}
            handleChange={(value: string) => updateSellerDatabaseFilter('businessName', value)}
          />

          {/* City */}
          <InputFilter
            label="City"
            placeholder="City"
            value={sellerDatabaseFilters.businessName}
            handleChange={(value: string) => updateSellerDatabaseFilter('businessName', value)}
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

          {/* Zip code */}
          <InputFilter
            label="Zip Code"
            placeholder="Zip Code"
            value={sellerDatabaseFilters.zipCode}
            handleChange={(value: string) => updateSellerDatabaseFilter('zipCode', value)}
          />

          {/* Country */}
          <SelectionFilter
            label="Country"
            placeholder="Country"
            filterOptions={COUNTRY_DROPDOWN_LIST}
            value={sellerDatabaseFilters.country}
            handleChange={(value: string) => {
              updateSellerDatabaseFilter('country', value);
            }}
          />
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
