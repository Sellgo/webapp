import React, { useState, useMemo } from 'react';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ExportResultAs from '../../../../components/ExportResultAs';

/* Actions */
import { fetchProductsDatabase } from '../../../../actions/ProductsResearch/ProductsDatabase';

/* Constants */
import { EXPORT_DATA, EXPORT_FORMATS } from '../../../../constants/SellerResearch/SellerDatabase';

/* Interface */
import { ProductsDatabasePayload } from '../../../../interfaces/ProductResearch/ProductsDatabase';
import {
  getIsLoadingProductsDatabase,
  getProductsDatabaseResults,
} from '../../../../selectors/ProductResearch/ProductsDatabase';

interface Props {
  productDatabaseResults: any;
  isLoadingProductDatabase: boolean;
  fetchProductsDatabase: (payload: ProductsDatabasePayload) => void;
}

const DatabaseExport = (props: Props) => {
  const { fetchProductsDatabase, productDatabaseResults, isLoadingProductDatabase } = props;

  const [openExports, setOpenExports] = useState(false);

  const hanleOnExport = async (details: any) => {
    await fetchProductsDatabase({ isExport: true, fileFormat: details.format });
    setOpenExports(false);
  };

  const shouldEnableExport = useMemo(
    () => !isLoadingProductDatabase && productDatabaseResults.length > 0,
    [isLoadingProductDatabase, productDatabaseResults]
  );

  return (
    <>
      <div className={styles.exportsContainer}>
        {/* <h2>
          Results note is described here, please explain in concise yet short, not longer than this
          line.
        </h2> */}
        <div
          onClick={() => (shouldEnableExport ? setOpenExports(true) : 0)}
          className={`${shouldEnableExport ? 'export-button' : 'export-button-disabled'}`}
        >
          <Icon name="download" />
          <span>Export</span>
        </div>
      </div>

      {/* Export modal */}
      <ExportResultAs
        open={openExports}
        formats={EXPORT_FORMATS}
        data={EXPORT_DATA}
        onClose={() => setOpenExports(false)}
        loading={false}
        onExport={hanleOnExport}
        format={'csv'}
      />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  productDatabaseResults: getProductsDatabaseResults(state),
  isLoadingProductDatabase: getIsLoadingProductsDatabase(state),
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchProductsDatabase: (payload: ProductsDatabasePayload) =>
      dispatch(fetchProductsDatabase(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseExport);
