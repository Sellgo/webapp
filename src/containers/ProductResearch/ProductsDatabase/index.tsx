import React, { useEffect } from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Components */
import DatabaseFilters from './DatabaseFilters';
import ProductsDatabaseTable from './DatabaseTable';

/* Actions */
import { fetchProductsDatabase } from '../../../actions/ProductsResearch/ProductsDatabase';

/* Interfaces */
import { ProductsDatabasePayload } from '../../../interfaces/ProductResearch/ProductsDatabase';

interface Props {
  fetchProductsDatabase: (payload: ProductsDatabasePayload) => void;
}

const ProductPanel = (props: Props) => {
  const { fetchProductsDatabase } = props;

  useEffect(() => {
    fetchProductsDatabase({ resetFilters: true });
  }, []);

  return (
    <main className={styles.productDatabasePage}>
      <DatabaseFilters />
      {/* <DatabaseExport/> */}
      <div className={styles.emptyRow} />
      <ProductsDatabaseTable />
    </main>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchProductsDatabase: (payload: ProductsDatabasePayload) =>
      dispatch(fetchProductsDatabase(payload)),
  };
};

export default connect(null, mapDispatchToProps)(ProductPanel);
