import React, { useState, useEffect, useCallback } from 'react';
import { Button, Dropdown, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import validator from 'validator';

/* Styles */
import styles from './index.module.scss';
import '../globals.scss';

/* Constants */
import { STATES } from '../../../constants/SellerDatabase';
import { fetchSellersForMap } from '../../../actions/SellerMap';
import { SellerMapPayload } from '../../../interfaces/SellerMap';
import { COUNTRY_DROPDOWN_LIST, SELLER_LIMIT_OPTIONS } from '../../../constants/SellerMap';

// State Options
const states = STATES.map((state: any) => ({
  key: state.code,
  value: state.code,
  text: state.name,
}));

interface Props {
  fetchSellersForMap: (payload: SellerMapPayload) => void;
}

const SellerMapFilter: React.FC<Props> = props => {
  const { fetchSellersForMap } = props;

  const [state, setState] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');
  const [sellerLimit, setSellerLimit] = useState<number>(1000);
  const [country, setCountry] = useState<string>('US');

  /* Error States */
  const [zipCodeError, setZipCodeError] = useState<boolean>(false);

  /* Clear Filter State */
  const clearFilters = () => {
    setState('');
    setZipCode('');
  };

  /* Handle reset */
  const handleReset = useCallback(() => {
    clearFilters();
    fetchSellersForMap({ resetMap: true });
  }, []);

  /* Handle Submit */
  const handleSubmit = useCallback(() => {
    fetchSellersForMap({ state, zipCode, maxCount: sellerLimit, country });
  }, [state, zipCode, sellerLimit, country]);

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
      <section className={styles.sellerMapFilterContainer}>
        <div className={styles.sellerMapFilterHeading}>
          <h1>SELLER MAP</h1>
        </div>

        <div className={styles.sellermapFilterWrapper}>
          <div className={styles.filterGroup}>
            <p>Country</p>
            <Dropdown
              placeholder="Country"
              search
              fluid
              className="formDropdown__countryList"
              value={country}
              onChange={(evt, { value }: any) => setCountry(value)}
              selection
              options={COUNTRY_DROPDOWN_LIST}
            />
          </div>

          <div className={styles.filterGroup}>
            <p>U.S. State</p>
            <Dropdown
              placeholder="State"
              fluid
              className="formDropdown__state"
              value={state}
              onChange={(evt, { value }: any) => setState(value)}
              selection
              options={states}
              disabled={country !== 'US'}
            />
          </div>

          <div className={styles.filterGroup}>
            <p>U.S. Zip</p>
            <Input
              className={styles.formInput__long}
              placeholder="Enter Zip Code seperated by commas"
              value={zipCode}
              error={zipCodeError}
              onChange={evt => {
                const val = evt.target.value;
                setZipCode(val);
              }}
              disabled={country !== 'US'}
            />
          </div>

          <div className={styles.filterGroup}>
            <p>View</p>
            <Dropdown
              placeholder="Seller Limit"
              fluid
              className="formDropdown__sellerLimit"
              value={sellerLimit}
              onChange={(evt, { value }: any) => setSellerLimit(value)}
              selection
              options={SELLER_LIMIT_OPTIONS}
            />
          </div>
        </div>

        {/* Filter Submit */}
        <div className={styles.filterSubmit}>
          <Button size="small" className={styles.filterSubmit__reset} onClick={handleReset}>
            Reset
          </Button>
          <Button size="small" className={styles.filterSubmit__find} onClick={handleSubmit}>
            Find
          </Button>
        </div>
      </section>
    </>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSellersForMap: (payload: SellerMapPayload) => dispatch(fetchSellersForMap(payload)),
  };
};

export default connect(null, mapDispatchToProps)(SellerMapFilter);
