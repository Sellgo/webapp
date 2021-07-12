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
import { SELLER_LIMIT_OPTIONS } from '../../../constants/SellerMap';

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
    fetchSellersForMap({ state, zipCode, maxCount: sellerLimit });
  }, [state, zipCode, sellerLimit]);

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

        <div className={styles.sellermapFilterWrapper}>
          <div className={styles.filterGroup}>
            <p>State</p>
            <Dropdown
              placeholder="State"
              fluid
              className="formDropdown__state"
              value={state}
              onChange={(evt, { value }: any) => setState(value)}
              selection
              options={states}
            />
          </div>

          <span className={styles.orSeperator}>or</span>

          <div className={styles.filterGroup}>
            <p>Zip</p>
            <Input
              className={styles.formInput__long}
              placeholder="Enter Zip Code seperated by commas"
              value={zipCode}
              error={zipCodeError}
              onChange={evt => {
                const val = evt.target.value;
                setZipCode(val);
              }}
            />
          </div>

          <div className={styles.filterSubmit}>
            <Button size="small" className={styles.filterSubmit__reset} onClick={handleReset}>
              Reset
            </Button>
            <Button size="small" className={styles.filterSubmit__find} onClick={handleSubmit}>
              Find
            </Button>
          </div>
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
