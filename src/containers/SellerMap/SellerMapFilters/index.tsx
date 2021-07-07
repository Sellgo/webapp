import React, { useState } from 'react';
import { Button, Dropdown, Input } from 'semantic-ui-react';

/* Styles */
import styles from './index.module.scss';
import '../globals.scss';

/* Constants */
import { STATES } from '../../../constants/SellerDatabase';

// State Options
// State Options
const states = STATES.map((state: any) => ({
  key: state.code,
  value: state.code,
  text: state.name,
}));

const SellerMapFilter = () => {
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');

  return (
    <section className={styles.sellerMapFilterContainer}>
      <div className={styles.sellerMapFilterHeading}>
        <h1>SELLER MAP</h1>
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
            onChange={evt => {
              const val = evt.target.value;
              setZipCode(val);
            }}
          />
        </div>

        <div className={styles.filterSubmit}>
          <Button size="small" className={styles.filterSubmit__reset}>
            Reset
          </Button>
          <Button size="small" className={styles.filterSubmit__find}>
            Find
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SellerMapFilter;
