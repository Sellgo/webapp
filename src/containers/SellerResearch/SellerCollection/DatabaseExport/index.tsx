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
  getIsLoadingSellerDatabaseExport,
} from '../../../../selectors/SellerResearch/SellerDatabase';

/* Components */
import TableExport from '../../../../components/NewTable/TableExport';

/* Assets */
import { ReactComponent as CSVExportImage } from '../../../../assets/images/csvExportImage.svg';

interface Props {
  sellerDatabaseResults: any;
  isLoadingSellerDatabase: boolean;
  isLoadingSellerDatabaseExport: boolean;
  fetchSellerDatabase: (payload: SellerDatabasePayload) => void;
  sellerDatabaseFilterMessage: ShowFilterMessage;
  sellerDatabasePaginationInfo: SellerDatabasePaginationInfo;
  sellerMarketplace: MarketplaceOption;
  sellerDatabaseQuotaExceeded: boolean;
}

const DatabaseExport = (props: Props) => {
  const {
    isLoadingSellerDatabaseExport,
    fetchSellerDatabase,
    sellerDatabaseResults,
    isLoadingSellerDatabase,
    sellerMarketplace,
  } = props;

  const handleOnExport = (type: 'company' | 'employee') => {
    fetchSellerDatabase({
      isExport: true,
      fileFormat: 'csv',
      marketplaceId: sellerMarketplace.value,
      filterPayload: {
        isLookedUp: true,
      },
      exportEmployees: type === 'employee',
    });
  };

  const shouldEnableExport = useMemo(
    () => !isLoadingSellerDatabase && sellerDatabaseResults.length > 0,
    [isLoadingSellerDatabase, sellerDatabaseResults]
  );
  return (
    <>
      <div className={styles.exportsContainer}>
        <TableExport
          loading={isLoadingSellerDatabaseExport}
          label=""
          disableExport={!shouldEnableExport}
          openPopUponDownloadClick
          exportContent={
            <>
              <div className={styles.exportOptions}>
                <span>Export As</span>
                <button
                  className={styles.exportOption}
                  onClick={() => handleOnExport('company')}
                  disabled={!shouldEnableExport}
                >
                  <CSVExportImage /> Company
                </button>

                <button
                  className={styles.exportOption}
                  onClick={() => handleOnExport('employee')}
                  disabled={!shouldEnableExport}
                >
                  <CSVExportImage /> Employee
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
  isLoadingSellerDatabaseExport: getIsLoadingSellerDatabaseExport(state),
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
