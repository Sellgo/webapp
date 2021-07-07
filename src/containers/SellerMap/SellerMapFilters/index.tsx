import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';

/* Styles */
import styles from './index.module.scss';

const SellerMapFilter = () => {
  const [showFilters, setShowFilters] = useState(true);

  return (
    <section className={styles.sellerMapFilterContainer}>
      <div className={styles.sellerMapFilterHeading}>
        <button onClick={() => setShowFilters(prevState => !prevState)}>SELLER MAP</button>
      </div>

      {showFilters && (
        <div className={styles.sellermapFilterWrapper}>
          <div className={styles.filterSubmit}>
            <Button size="small" className={styles.filterSubmit__reset}>
              Reset
            </Button>
            <Button size="small" className={styles.filterSubmit__find}>
              Find
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default SellerMapFilter;
