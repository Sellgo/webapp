import axios from 'axios';
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
import { sellerIDSelector } from '../../../../selectors/Seller';

/* Components */
import TableExport from '../../../../components/NewTable/TableExport';

/* Assets */
import { ReactComponent as CSVExportImage } from '../../../../assets/images/csvExportImage.svg';
import TableResultsMessage from '../../../../components/TableResultsMessage';
import { Icon } from 'semantic-ui-react';
import { AppConfig } from '../../../../config';

/* Utils */
import { success } from '../../../../utils/notifications';

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
    sellerDatabasePaginationInfo,
    sellerDatabaseFilterMessage,
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

  const handlePushToZapier = async () => {
    const sellerID = sellerIDSelector();
    // eslint-disable-next-line max-len
    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerID}/merchants-employees?page=${sellerDatabasePaginationInfo.current_page}&ordering=seller_id&is_looked_up=true&is_zapier_export=true`;
    try {
      const { status, data } = await axios.get(URL);
      if (status === 200) {
        success(data.message);
      }
    } catch (err) {
      console.log('error: ', err);
    }
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
            prependMessage="Showing"
            count={sellerDatabasePaginationInfo.count}
            actualCount={sellerDatabaseResults ? sellerDatabaseResults.length : 0}
            appendMessage="contacts"
            limitType="seller_database_display_limit"
          />
        )}
        <button
          className={styles.zapierButton}
          onClick={() => handlePushToZapier()}
          disabled={!shouldEnableExport}
        >
          <Icon name="cloud upload" size="small" /> &nbsp; Push to Zapier
        </button>
        <TableExport
          loading={isLoadingSellerDatabaseExport}
          label="Export"
          disableExport={!shouldEnableExport}
          openPopUponDownloadClick
          className={styles.exportBtn}
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
