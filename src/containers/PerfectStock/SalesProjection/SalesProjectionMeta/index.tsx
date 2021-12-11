import React, { useMemo } from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Components */
import TableExport from '../../../../components/NewTable/TableExport';

/* Actions */
import { fetchProductsDatabase } from '../../../../actions/ProductsResearch/ProductsDatabase';

/* Assets */
import { ReactComponent as XLSXExportImage } from '../../../../assets/images/xlsxExportImage.svg';
import { ReactComponent as CSVExportImage } from '../../../../assets/images/csvExportImage.svg';
import { ReactComponent as UndoIcon } from '../../../../assets/images/undoIcon.svg';

/* Interface */
import { ProductsDatabasePayload } from '../../../../interfaces/ProductResearch/ProductsDatabase';
import {
  getIsLoadingProductsDatabase,
  getProductsDatabasePaginationInfo,
  getProductsDatabaseResults,
} from '../../../../selectors/ProductResearch/ProductsDatabase';

interface Props {
  productDatabaseResults: any;
  isLoadingProductDatabase: boolean;
  fetchProductsDatabase: (payload: ProductsDatabasePayload) => void;
  productDatabasePaginationInfo: any;
}

const SalesEstimationMeta = (props: Props) => {
  const { fetchProductsDatabase, productDatabaseResults, isLoadingProductDatabase } = props;

  const handleOnExport = async (fileFormat: 'csv' | 'xlsx') => {
    await fetchProductsDatabase({ isExport: true, fileFormat });
  };

  const shouldEnableExport = useMemo(
    () => !isLoadingProductDatabase && productDatabaseResults.length > 0,
    [isLoadingProductDatabase, productDatabaseResults]
  );

  return (
    <>
      <div className={styles.exportsContainer}>
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
        <button className={styles.refreshButton}>
          Last Update:&nbsp;<span>1 October 2021 11.53 pm PDT</span>
          &nbsp;
          <UndoIcon className={styles.refreshIcon} />
        </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(SalesEstimationMeta);
