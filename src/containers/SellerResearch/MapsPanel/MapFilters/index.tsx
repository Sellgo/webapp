import React, { useState } from 'react';

/* Styling */
import styles from './index.module.scss';

/* Constants */
import {
  COUNTRY_DROPDOWN_LIST,
  getMapLimitOptions,
  STATES_DROPDOWN_LIST,
} from '../../../../constants/SellerMap';

/* Components */
import FormFilterActions from '../../../../components/FormFilters/FormFilterActions';
import InputFilter from '../../../../components/FormFilters/InputFilter';
import SelectionFilter from '../../../../components/FormFilters/SelectionFilter';

const MapFilters = () => {
  // const [showAdvancedFilter, setShowAdvancedFilter] = useState(true);

  /* Basic Filters */
  const [country, setCountry] = useState<string>('US');
  const [state, setState] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');
  const [sellerLimit, setSellerLimit] = useState<string>('1000');

  return (
    <>
      {/* Basic Filter */}
      <div className={styles.basicFilters}>
        <SelectionFilter
          label="Country"
          placeholder="Country"
          filterOptions={COUNTRY_DROPDOWN_LIST}
          value={country}
          handleChange={(value: string) => setCountry(value)}
        />

        <SelectionFilter
          label="U.S. States"
          placeholder="All States"
          filterOptions={STATES_DROPDOWN_LIST}
          value={state}
          handleChange={(value: string) => setState(value)}
        />

        <InputFilter
          label="Zipcode"
          placeholder="Enter Zip code"
          value={zipCode}
          handleChange={(value: string) => setZipCode(value)}
        />

        <SelectionFilter
          label="View"
          placeholder="Seller Limit"
          value={String(sellerLimit)}
          filterOptions={getMapLimitOptions(50000)}
          handleChange={(value: string) => setSellerLimit(value)}
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

      <FormFilterActions onFind={() => console.log('Find')} onReset={() => console.log('Reset')} />
    </>
  );
};

export default MapFilters;
