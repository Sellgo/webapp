import React, { useState, useMemo } from 'react';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ExportResultAs from '../../../../components/ExportResultAs';

/* Actions */
import { fetchSellerDatabase } from '../../../../actions/SellerResearch/SellerDatabase';

/* Constants */
import { EXPORT_DATA, EXPORT_FORMATS } from '../../../../constants/SellerResearch/SellerDatabase';

/* Interface */
import {
  SellerDatabasePaginationInfo,
  SellerDatabasePayload,
  ShowFilterMessage,
} from '../../../../interfaces/SellerResearch/SellerDatabase';
import {
  getFilterMessage,
  getIsLoadingSellerDatabase,
  getSellerDatabasePaginationInfo,
  getSellerDatabaseResults,
} from '../../../../selectors/SellerResearch/SellerDatabase';
import { formatNumber } from '../../../../utils/format';
import numeral from 'numeral';

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

  const [openExports, setOpenExports] = useState(false);

  const hanleOnExport = async (details: any) => {
    await fetchSellerDatabase({ isExport: true, fileFormat: details.format });
    setOpenExports(false);
  };

  const shouldEnableExport = useMemo(
    () => !isLoadingSellerDatabase && sellerDatabaseResults.length > 0,
    [isLoadingSellerDatabase, sellerDatabaseResults]
  );

  const totalSellersFound = useMemo(() => {
    const count = sellerDatabasePaginationInfo.count;

    if (count < 49_999) {
      return formatNumber(count);
    }

    return numeral(count)
      .format('0.0a')
      .toUpperCase();
  }, [sellerDatabasePaginationInfo]);

  return (
    <>
      <div className={styles.exportsContainer}>
        {!sellerDatabaseFilterMessage.show && totalSellersFound !== '0' && (
          <h2>
            {totalSellersFound} sellers found, please add additional filters for a more targeted
            search.
          </h2>
        )}
        <div
          onClick={() => (shouldEnableExport ? setOpenExports(true) : 0)}
          className={`${styles.exportButton} ${
            shouldEnableExport ? 'export-button' : 'export-button-disabled'
          }`}
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
