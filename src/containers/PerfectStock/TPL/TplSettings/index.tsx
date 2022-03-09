import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Actions */
import { setSellerDatabaseMarketplace } from '../../../../actions/SellerResearch/SellerDatabase';

/* Interfaces */
import { MarketplaceOption } from '../../../../interfaces/SellerResearch/SellerDatabase';

import { CreateTplPayload } from '../../../../interfaces/PerfectStock/Tpl';

/* Constants */
import {
  DEFAULT_US_MARKET,
  SELLER_DB_MARKETPLACE,
} from '../../../../constants/SellerResearch/SellerDatabase';

import { DEFAULT_NEW_TPL_SETTINGS } from '../../../../constants/PerfectStock/Tpl';

import {
  COUNTRY_DROPDOWN_LIST,
  STATES_DROPDOWN_LIST,
} from '../../../../constants/SellerResearch/SellerMap';

/* Components */
import InputFilter from '../../../../components/FormFilters/InputFilter';
import FormFilterActions from '../../../../components/FormFilters/FormFilterActions';
import MarketPlaceFilter from '../../../../components/FormFilters/MarketPlaceFilter';
import SelectionFilter from '../../../../components/FormFilters/SelectionFilter';
import { createTplVendor } from '../../../../actions/PerfectStock/Tpl';

interface Props {
  createTplVendor: (payload: CreateTplPayload) => void;
}

const TplSettings = (props: Props) => {
  const { createTplVendor } = props;

  const [tplSettings, setTplSettings] = useState<CreateTplPayload>(DEFAULT_NEW_TPL_SETTINGS);
  const [marketPlace, setMarketPlace] = useState<MarketplaceOption>(DEFAULT_US_MARKET);

  const updateSellerDatabaseFilter = (key: string, value: any) => {
    setTplSettings({
      ...tplSettings,
      [key]: value,
    });
  };

  /* Handlers */
  const handleSubmit = () => {
    createTplVendor({
      ...tplSettings,
      status: 'active',
    });
    return 0;
  };

  const handleReset = () => {
    console.log('placeholder');
  };

  /* Effect on component mount */
  useEffect(() => {
    console.log('placeholder');
  }, []);

  return (
    <>
      <section className={styles.filterSection}>
        <div className={styles.basicFilters}>
          {/* 3PL NAME */}
          <InputFilter
            label="3PL NAME"
            placeholder="3PL Name"
            value={tplSettings.name}
            handleChange={(value: string) => updateSellerDatabaseFilter('name', value)}
          />

          {/* STATUS */}
          <SelectionFilter
            label="STATUS"
            placeholder="STATUS"
            filterOptions={STATES_DROPDOWN_LIST}
            value={tplSettings.state}
            handleChange={(value: string) => updateSellerDatabaseFilter('state', value)}
          />

          {/* Marketplace */}
          <MarketPlaceFilter
            label="Choose Marketplace"
            marketplaceDetails={marketPlace}
            marketPlaceChoices={SELLER_DB_MARKETPLACE}
            handleChange={(option: MarketplaceOption) => {
              setMarketPlace(option);
              setSellerDatabaseMarketplace(option);
            }}
          />

          {/* ACCOUNT NUMBER */}
          <InputFilter
            label="ACCOUNT NUMBER"
            placeholder="Account Number"
            value={tplSettings.account_number}
            handleChange={(value: string) => updateSellerDatabaseFilter('account_number', value)}
          />

          {/* MONTHLY STORAGE COST PER PALLET */}
          <InputFilter
            label="MONTHLY STORAGE COST PER PALLET"
            placeholder="MONTHLY STORAGE COST PER PALLET"
            value={tplSettings.monthly_cost?.toString() || ''}
            handleChange={(value: string) =>
              updateSellerDatabaseFilter('monthly_cost', parseFloat(value))
            }
          />

          {/* Address */}
          <InputFilter
            label="Address"
            placeholder="Address"
            value={tplSettings.address}
            handleChange={(value: string) => updateSellerDatabaseFilter('address', value)}
          />

          {/* City */}
          <InputFilter
            label="City"
            placeholder="City"
            value={tplSettings.city}
            handleChange={(value: string) => updateSellerDatabaseFilter('city', value)}
          />

          {/* All States */}
          <SelectionFilter
            label="U.S. States"
            placeholder="All States"
            filterOptions={STATES_DROPDOWN_LIST}
            value={tplSettings.state}
            handleChange={(value: string) => updateSellerDatabaseFilter('state', value)}
            disabled={tplSettings.country !== 'US'}
          />

          {/* Zip code */}
          <InputFilter
            label="Zip Code"
            placeholder="Zip Code"
            value={tplSettings.zip_code?.toString() || ''}
            handleChange={(value: string) => updateSellerDatabaseFilter('zip_code', value)}
          />

          {/* Country */}
          <SelectionFilter
            label="Country"
            placeholder="Country"
            filterOptions={COUNTRY_DROPDOWN_LIST}
            value={tplSettings.country}
            handleChange={(value: string) => {
              updateSellerDatabaseFilter('country', value);
            }}
          />
        </div>
        <FormFilterActions onFind={handleSubmit} onReset={handleReset} disabled={false} />
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
    createTplVendor: (payload: CreateTplPayload) => dispatch(createTplVendor(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TplSettings);
