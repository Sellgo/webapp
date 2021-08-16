import React, { useMemo } from 'react';
// import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import numeral from 'numeral';

/* Styling */
import styles from './index.module.scss';

/* Components */
// import ExportResultAs from '../../../../components/ExportResultAs';

/* Actions */
import { fetchProductsDatabase } from '../../../../actions/ProductsResearch/ProductsDatabase';

/* Constants */
// import { EXPORT_DATA, EXPORT_FORMATS } from '../../../../constants/SellerResearch/SellerDatabase';

/* Interface */
import { ProductsDatabasePayload } from '../../../../interfaces/ProductResearch/ProductsDatabase';
import {
  // getIsLoadingProductsDatabase,
  getProductsDatabasePaginationInfo,
  // getProductsDatabaseResults,
} from '../../../../selectors/ProductResearch/ProductsDatabase';

/* Utils */
import { formatNumber } from '../../../../utils/format';

interface Props {
  // productDatabaseResults: any;
  // isLoadingProductDatabase: boolean;
  // fetchProductsDatabase: (payload: ProductsDatabasePayload) => void;
  productDatabasePaginationInfo: any;
}

const DatabaseExport = (props: Props) => {
  const {
    // fetchProductsDatabase,
    // productDatabaseResults,
    // isLoadingProductDatabase,
    productDatabasePaginationInfo,
  } = props;

  // const [openExports, setOpenExports] = useState(false);

  // const hanleOnExport = async (details: any) => {
  //   await fetchProductsDatabase({ isExport: true, fileFormat: details.format });
  //   setOpenExports(false);
  // };

  // const shouldEnableExport = useMemo(
  //   () => !isLoadingProductDatabase && productDatabaseResults.length > 0,
  //   [isLoadingProductDatabase, productDatabaseResults]
  // );

  const totalProductsFound = useMemo(() => {
    const count = productDatabasePaginationInfo.count;

    if (count < 49_999) {
      return formatNumber(count);
    }

    return numeral(count)
      .format('0.0a')
      .toUpperCase();
  }, [productDatabasePaginationInfo]);

  return (
    <>
      <div className={styles.exportsContainer}>
        {totalProductsFound !== '0' && totalProductsFound !== '0.0' && (
          <p className={styles.messageText}>
            Viewing <span className={styles.productCount}>{totalProductsFound}</span> products.
          </p>
        )}
        {/* <div
          onClick={() => (shouldEnableExport ? setOpenExports(true) : 0)}
          className={`${shouldEnableExport ? 'export-button' : 'export-button-disabled'}`}
        >
          <Icon name="download" />
          <span>Export</span>
        </div> */}
      </div>

      {/* Export modal */}
      {/* <ExportResultAs
        open={openExports}
        formats={EXPORT_FORMATS}
        data={EXPORT_DATA}
        onClose={() => setOpenExports(false)}
        loading={false}
        onExport={hanleOnExport}
        format={'csv'}
      /> */}
    </>
  );
};

const mapStateToProps = (state: any) => ({
  // productDatabaseResults: getProductsDatabaseResults(state),
  // isLoadingProductDatabase: getIsLoadingProductsDatabase(state),
  productDatabasePaginationInfo: getProductsDatabasePaginationInfo(state),
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchProductsDatabase: (payload: ProductsDatabasePayload) =>
      dispatch(fetchProductsDatabase(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseExport);
