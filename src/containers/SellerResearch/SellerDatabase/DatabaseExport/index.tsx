import React, { useMemo } from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Actions */
import { fetchSellerDatabase } from '../../../../actions/SellerResearch/SellerDatabase';

/* Interface */
import {
  SellerDatabasePaginationInfo,
  SellerDatabasePayload,
  ShowFilterMessage,
} from '../../../../interfaces/SellerResearch/SellerDatabase';

/* Selectors */
import {
  getFilterMessage,
  getIsLoadingSellerDatabase,
  getSellerDatabasePaginationInfo,
  getSellerDatabaseResults,
} from '../../../../selectors/SellerResearch/SellerDatabase';

/* Components */
import TableExport from '../../../../components/NewTable/TableExport';

/* Utils */
import { formatNumber } from '../../../../utils/format';

/* Assets */
import { ReactComponent as XLSXExportImage } from '../../../../assets/images/xlsxExportImage.svg';
import { ReactComponent as CSVExportImage } from '../../../../assets/images/csvExportImage.svg';

interface Props {
  sellerDatabaseResults: any;
  isLoadingSellerDatabase: boolean;
  fetchSellerDatabase: (payload: SellerDatabasePayload) => void;
  sellerDatabaseFilterMessage: ShowFilterMessage;
  sellerDatabasePaginationInfo: SellerDatabasePaginationInfo;
}

const DatabaseExport = (props: Props) => {
  const {
    fetchSellerDatabase,
    sellerDatabaseResults,
    isLoadingSellerDatabase,
    sellerDatabaseFilterMessage,
    sellerDatabasePaginationInfo,
  } = props;

  const handleOnExport = (fileFormat: 'csv' | 'xlsx') => {
    fetchSellerDatabase({ isExport: true, fileFormat });
  };

  const shouldEnableExport = useMemo(
    () => !isLoadingSellerDatabase && sellerDatabaseResults.length > 0,
    [isLoadingSellerDatabase, sellerDatabaseResults]
  );

  const totalSellersFound = useMemo(() => {
    const count = sellerDatabasePaginationInfo.count;
    return formatNumber(count);
  }, [sellerDatabasePaginationInfo]);

  return (
    <>
      <div className={styles.exportsContainer}>
        {!sellerDatabaseFilterMessage.show && totalSellersFound !== '0' && (
          <p className={styles.messageText}>
            Viewing <span className={styles.sellerCount}>{totalSellersFound}</span> sellers.
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
  sellerDatabaseResults: getSellerDatabaseResults(state),
  isLoadingSellerDatabase: getIsLoadingSellerDatabase(state),
  sellerDatabaseFilterMessage: getFilterMessage(state),
  sellerDatabasePaginationInfo: getSellerDatabasePaginationInfo(state),
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSellerDatabase: (payload: SellerDatabasePayload) => dispatch(fetchSellerDatabase(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseExport);
