import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';

/* Styling */
import styles from './index.module.scss';

/* Components */
import TableExport from '../../../../components/NewTable/TableExport';

/* Actions */
import { fetchProductsDatabase } from '../../../../actions/ProductsResearch/ProductsDatabase';

/* Assets */
import { ReactComponent as XLSXExportImage } from '../../../../assets/images/xlsxExportImage.svg';
import { ReactComponent as CSVExportImage } from '../../../../assets/images/csvExportImage.svg';

/* Interface */
import { ProductsDatabasePayload } from '../../../../interfaces/ProductResearch/ProductsDatabase';
import {
  getIsLoadingProductsDatabase,
  getProductsDatabasePaginationInfo,
  getProductsDatabaseResults,
} from '../../../../selectors/ProductResearch/ProductsDatabase';

/* Utils */
import { formatNumber } from '../../../../utils/format';

interface Props {
  productDatabaseResults: any;
  isLoadingProductDatabase: boolean;
  fetchProductsDatabase: (payload: ProductsDatabasePayload) => void;
  productDatabasePaginationInfo: any;
}

const DatabaseExport = (props: Props) => {
  const {
    fetchProductsDatabase,
    productDatabaseResults,
    isLoadingProductDatabase,
    productDatabasePaginationInfo,
  } = props;

  const handleOnExport = async (fileFormat: 'csv' | 'xlsx') => {
    await fetchProductsDatabase({ isExport: true, fileFormat });
  };

  const shouldEnableExport = useMemo(
    () => !isLoadingProductDatabase && productDatabaseResults.length > 0,
    [isLoadingProductDatabase, productDatabaseResults]
  );

  const totalProductsFound = useMemo(() => {
    const count = productDatabasePaginationInfo.count;

    if (parseInt(count) === 200) {
      return '200+';
    } else if (count < 49_999) {
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
        <TableExport
          label=""
          disableExport={!shouldEnableExport}
          onButtonClick={() => handleOnExport('xlsx')}
          exportContent={
            <>
              <div className={styles.exportOptions}>
                <span>Export As</span>
                <button
                  className={styles.exportOption}
                  onClick={() => handleOnExport('xlsx')}
                  disabled={!shouldEnableExport}
                >
                  <XLSXExportImage /> .XLSX
                </button>

                <button
                  className={styles.exportOption}
                  onClick={() => handleOnExport('csv')}
                  disabled={!shouldEnableExport}
                >
                  <CSVExportImage /> .CSV
                </button>
              </div>
            </>
          }
        />
      </div>
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseExport);
