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
  MarketplaceOption,
} from '../../../../interfaces/SellerResearch/SellerDatabase';

/* Selectors */
import {
  getFilterMessage,
  getIsLoadingSellerDatabase,
  getSellerDatabasePaginationInfo,
  getSellerDatabaseMarketplaceInfo,
  getSellerDatabaseResults,
  getSellerDatabaseQuotaExceeded,
} from '../../../../selectors/SellerResearch/SellerDatabase';

/* Components */
import TableExport from '../../../../components/NewTable/TableExport';
import TableResultsMessage from '../../../../components/TableResultsMessage';
import TableErrorMessage from '../../../../components/TableErrorMessage';

/* Assets */
import { ReactComponent as XLSXExportImage } from '../../../../assets/images/xlsxExportImage.svg';
import { ReactComponent as CSVExportImage } from '../../../../assets/images/csvExportImage.svg';

interface Props {
  sellerDatabaseResults: any;
  isLoadingSellerDatabase: boolean;
  fetchSellerDatabase: (payload: SellerDatabasePayload) => void;
  sellerDatabaseFilterMessage: ShowFilterMessage;
  sellerDatabasePaginationInfo: SellerDatabasePaginationInfo;
  sellerMarketplace: MarketplaceOption;
  sellerDatabaseQuotaExceeded: boolean;
}

const DatabaseExport = (props: Props) => {
  const {
    fetchSellerDatabase,
    sellerDatabaseResults,
    isLoadingSellerDatabase,
    sellerDatabaseFilterMessage,
    sellerDatabasePaginationInfo,
    sellerMarketplace,
    sellerDatabaseQuotaExceeded,
  } = props;

  const handleOnExport = (fileFormat: 'csv' | 'xlsx') => {
    fetchSellerDatabase({ isExport: true, fileFormat, marketplaceId: sellerMarketplace.value });
  };

  const shouldEnableExport = useMemo(
    () => !isLoadingSellerDatabase && sellerDatabaseResults.length > 0,
    [isLoadingSellerDatabase, sellerDatabaseResults]
  );
  return (
    <>
      <div className={styles.exportsContainer}>
        {!sellerDatabaseFilterMessage.show && sellerDatabasePaginationInfo.total_pages > 0 && (
          <TableResultsMessage
            prependMessage="Viewing"
            count={sellerDatabasePaginationInfo.count}
            actualCount={sellerDatabaseResults ? sellerDatabaseResults.length : 0}
            appendMessage="sellers"
            limitType="seller_database_display_limit"
          />
        )}

        {!sellerDatabaseFilterMessage.show && sellerDatabaseQuotaExceeded && (
          <TableErrorMessage
            quotaType="seller_database_limit"
            prependMessage="You have used up your quota of "
            appendMessage=" products."
          />
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
  sellerMarketplace: getSellerDatabaseMarketplaceInfo(state),
  sellerDatabaseQuotaExceeded: getSellerDatabaseQuotaExceeded(state),
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSellerDatabase: (payload: SellerDatabasePayload) => dispatch(fetchSellerDatabase(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseExport);
