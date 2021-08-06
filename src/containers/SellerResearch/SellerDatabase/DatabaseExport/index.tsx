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
import { SellerDatabasePayload } from '../../../../interfaces/SellerResearch/SellerDatabase';
import {
  getIsLoadingSellerDatabase,
  getSellerDatabaseResults,
} from '../../../../selectors/SellerResearch/SellerDatabase';

interface Props {
  sellerDatabaseResults: any;
  isLoadingSellerDatabase: boolean;
  fetchSellerDatabase: (payload: SellerDatabasePayload) => void;
}

const DatabaseExport = (props: Props) => {
  const { fetchSellerDatabase, sellerDatabaseResults, isLoadingSellerDatabase } = props;

  const [openExports, setOpenExports] = useState(false);

  const hanleOnExport = async (details: any) => {
    console.log('Run export with', details);

    await fetchSellerDatabase({ isExport: true, fileFormat: details.format });
    setOpenExports(false);
  };

  const shouldEnableExport = useMemo(
    () => !isLoadingSellerDatabase && sellerDatabaseResults.length > 0,
    [isLoadingSellerDatabase, sellerDatabaseResults]
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
  sellerDatabaseResults: getSellerDatabaseResults(state),
  isLoadingSellerDatabase: getIsLoadingSellerDatabase(state),
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSellerDatabase: (payload: SellerDatabasePayload) => dispatch(fetchSellerDatabase(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseExport);
