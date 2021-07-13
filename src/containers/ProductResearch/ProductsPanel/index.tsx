import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';

/* Components */
import BasicFilters from './BasicFilters';
import AdvancedFilters from './AdvancedFilters';

/* Styling */
import styles from './index.module.scss';
import FormFilterActions from '../../../components/FormFilters/FormFilterActions';

const ProductPanel = () => {
  const [showAdvancedFilter, setShowAdvancedFilter] = useState<boolean>(true);

  return (
    <>
      <section className={styles.filterSection}>
        {/* Basic Filter */}
        <div className={styles.showbasicFilters}>
          <BasicFilters />
        </div>
        {/* Advanced Filter */}
        <div className={styles.advancedFilterWrapper}>
          <div
            className={styles.advancedFilterToggle}
            onClick={() => setShowAdvancedFilter(prevState => !prevState)}
          >
            <span>Advanced Filters</span>
            <span>
              {showAdvancedFilter ? <Icon name="chevron up" /> : <Icon name="chevron down" />}
            </span>
          </div>

          {showAdvancedFilter && (
            <div className={styles.showAdvancedFilter}>
              <AdvancedFilters />
            </div>
          )}
        </div>
        <FormFilterActions
          onFind={() => console.log('Find')}
          onReset={() => console.log('Reset')}
        />
      </section>

      <section style={{ marginTop: '50px' }}>
        <p>Table will go here</p>
      </section>
    </>
  );
};
export default ProductPanel;
