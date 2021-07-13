import React from 'react';

/* Components */
import BasicFilters from './BasicFilters';

/* Styling */
import styles from './index.module.scss';

const ProductPanel = () => {
  return (
    <>
      <section className={styles.filterSection}>
        <BasicFilters />
        <div className={styles.advancedFilter}>
          <p>Advanced Filter will go here</p>
        </div>
      </section>

      <section style={{ marginTop: '50px' }}>
        <p>Table will go here</p>
      </section>
    </>
  );
};
export default ProductPanel;
