import React from 'react';
import { connect } from 'react-redux';

/* Components */
import DatabaseFilters from './DatabaseFilters';
import ProductsDatabaseTable from './DatabaseTable';
import DatabaseExport from './DatabaseExport';

/* Selectors */
import { getFilterMessage } from '../../../selectors/ProductResearch/ProductsDatabase';

/* Components */
import FilterMessage from '../../../components/FilterMessage';

/* Interfaces */
import { ShowFilterMessage } from '../../../interfaces/SellerResearch/SellerDatabase';

/* Styles */
import styles from './index.module.scss';

interface Props {
  showFilterMessage: ShowFilterMessage;
}

const ProductsDatabase = (props: Props) => {
  const { showFilterMessage } = props;

  return (
    <main>
      <DatabaseFilters />
      <FilterMessage
        active={showFilterMessage.show}
        message={showFilterMessage.message}
        type={showFilterMessage.type}
        className={styles.filterMessage}
      />
      <DatabaseExport />
      <ProductsDatabaseTable />
    </main>
  );
};

const mapStateToProps = (state: any) => {
  return {
    showFilterMessage: getFilterMessage(state),
  };
};

export default connect(mapStateToProps)(ProductsDatabase);
