import React, { useState, useEffect } from 'react';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Components */
import BasicFilters from './BasicFilters';
import AdvancedFilters from './AdvancedFilters';
import ProductsDatabaseTable from './Table';
import FormFilterActions from '../../../components/FormFilters/FormFilterActions';

/* Actions */
import { fetchProductsDatabase } from '../../../actions/ProductsResearch/ProductsDatabase';

/* Interfaces */
import { ProductsDatabasePayload } from '../../../interfaces/ProductResearch/ProductsDatabase';

interface Props {
  fetchProductsDatabase: (payload: ProductsDatabasePayload) => void;
}

const ProductPanel = (props: Props) => {
  const { fetchProductsDatabase } = props;

  const [showAdvancedFilter, setShowAdvancedFilter] = useState<boolean>(true);

  useEffect(() => {
    fetchProductsDatabase({});
  }, []);

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

      <ProductsDatabaseTable />
    </>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchProductsDatabase: (payload: ProductsDatabasePayload) =>
      dispatch(fetchProductsDatabase(payload)),
  };
};

export default connect(null, mapDispatchToProps)(ProductPanel);
