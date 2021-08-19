import React from 'react';

/* Styling */
import styles from './index.module.scss';

const CategoryPanel = () => {
  return (
    <>
      <section className={styles.filterSection}>
        <div className={styles.basicFilters}>
          <p>Basic Filters will go here</p>
        </div>
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
export default CategoryPanel;
