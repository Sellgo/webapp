import React from 'react';
import { connect } from 'react-redux';
import { decode } from 'qss';

/* Components */
import DatabaseFilters from './DatabaseFilters';
import ProductsDatabaseTable from './DatabaseTable';
import DatabaseExport from './DatabaseExport';

/* Selectors */
import { getFilterMessage } from '../../../selectors/ProductResearch/ProductsDatabase';
import { sellerIDSelector } from '../../../selectors/Seller';

/* Actions */
import { fetchProductsDatabase } from '../../../actions/ProductsResearch/ProductsDatabase';

/* Components */
import FilterMessage from '../../../components/FilterMessage';

/* Interfaces */
import { ShowFilterMessage } from '../../../interfaces/SellerResearch/SellerDatabase';
import { ProductsDatabasePayload } from '../../../interfaces/ProductResearch/ProductsDatabase';

/* Styles */
import styles from './index.module.scss';

/* Utils */
import { error, success } from '../../../utils/notifications';
import { decodeBase64 } from '../../../utils/format';
import history from '../../../history';

/* Constants */
import { isValidAsin } from '../../../constants';

interface Props {
  showFilterMessage: ShowFilterMessage;
  fetchProductsDatabase: (payload: ProductsDatabasePayload) => void;
}

const ProductsDatabase = (props: Props) => {
  const { showFilterMessage, fetchProductsDatabase } = props;

  React.useEffect(() => {
    const searchString = history.location.search;
    console.log(sellerIDSelector());
    if (searchString) {
      // query triggered from chrome extension
      if (searchString.includes('?query=')) {
        const encodedQuery = searchString.split('?query=')[1] || '';

        if (!encodedQuery) {
          return;
        }

        const decodedString = decodeBase64(encodedQuery);

        if (!decodedString) {
          return;
        }

        const { sellerId, asin } = decode(decodedString) as any;

        if (!sellerId || !asin) {
          return;
        }

        if (String(sellerId) !== sellerIDSelector()) {
          error('Unauthorized user');
          return;
        }

        if (!isValidAsin(asin)) {
          error('Invalid asin');
          return;
        }
        success('Fetching product');
        fetchProductsDatabase({ filterPayload: { asin } });
        history.replace('/product-research/database');
      }
    }
  }, []);

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

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchProductsDatabase: (payload: ProductsDatabasePayload) =>
      dispatch(fetchProductsDatabase(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsDatabase);
