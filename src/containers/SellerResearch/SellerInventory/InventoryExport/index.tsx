import React from 'react';

/* Styling */
import styles from './index.module.scss';

const InventoryExport = () => {
  return (
    <section className={styles.exportsContainer}>
      <p className={styles.messageText}>
        Viewing <span className={styles.sellerCount}>10,000</span> sellers.
      </p>
    </section>
  );
};

export default InventoryExport;
