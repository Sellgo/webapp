import React, { useMemo } from 'react';

/* Styling */
import styles from './index.module.scss';

/* Utils */
import { formatNumber } from '../../../../utils/format';

const TrackerExport = () => {
  /*Total Products */
  const totalProductsFound = useMemo(() => {
    const count = 10_0000;
    return formatNumber(count);
  }, []);

  return (
    <div className={styles.exportsContainer}>
      <p className={styles.messageText}>
        Viewing <span className={styles.sellerCount}>{totalProductsFound}</span> products.
      </p>
    </div>
  );
};

export default TrackerExport;
