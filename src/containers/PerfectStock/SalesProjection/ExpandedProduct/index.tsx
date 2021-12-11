import React from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Actions */
import { fetchProductsDatabase } from '../../../../actions/ProductsResearch/ProductsDatabase';

/* Interface */
import { ProductsDatabasePayload } from '../../../../interfaces/ProductResearch/ProductsDatabase';
import {
  getIsLoadingProductsDatabase,
  getProductsDatabasePaginationInfo,
  getProductsDatabaseResults,
} from '../../../../selectors/ProductResearch/ProductsDatabase';

const ExpandedProduct = () => {
  return (
    <div className={styles.expandedProduct}>
      <h1> WEIGHTED AVERAGE SETTINGS </h1>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  productDatabaseResults: getProductsDatabaseResults(state),
  isLoadingProductDatabase: getIsLoadingProductsDatabase(state),
  productDatabasePaginationInfo: getProductsDatabasePaginationInfo(state),
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchProductsDatabase: (payload: ProductsDatabasePayload) =>
      dispatch(fetchProductsDatabase(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpandedProduct);
