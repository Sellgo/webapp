import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Utils */
import { downloadFile } from '../../../../utils/download';
import { success } from '../../../../utils/notifications';

/* Selectors */
import {
  getKeywordDatabaseProgressData,
  getKeywordDatabaseTablePaginationInfo,
} from '../../../../selectors/KeywordResearch/KeywordDatabase';

/* Interface */
import {
  KeywordDatabaseProgressData,
  KeywordDatabasePaginationInfo,
} from '../../../../interfaces/KeywordResearch/KeywordDatabase';

/* Constants */
import { EXPORT_DATA, EXPORT_FORMATS } from '../../../../constants/KeywordResearch/KeywordDatabase';

/* Components */
import ExportResultAs from '../../../../components/ExportResultAs';

interface Props {
  keywordDatabaseProgressData: KeywordDatabaseProgressData;
  keywordDatabasePaginationInfo: KeywordDatabasePaginationInfo;
}

const DatabaseExport = (props: Props) => {
  const { keywordDatabaseProgressData, keywordDatabasePaginationInfo } = props;

  const [openExports, setOpenExports] = useState(false);

  const handleOnExport = async () => {
    if (keywordDatabaseProgressData.report_xlsx_url) {
      await downloadFile(keywordDatabaseProgressData.report_xlsx_url);
      success('File successfully downloaded');
      setOpenExports(false);
    }
  };

  const shouldEnableExport = keywordDatabaseProgressData.report_xlsx_url;

  return (
    <>
      <section className={styles.exportsContainer}>
        {keywordDatabasePaginationInfo.total_pages > 0 && (
          <p className={styles.messageText}>
            Viewing{' '}
            <span className={styles.sellerCount}>{keywordDatabasePaginationInfo.count}</span>{' '}
            keywords.
          </p>
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
      </section>

      <ExportResultAs
        open={openExports}
        formats={EXPORT_FORMATS}
        data={EXPORT_DATA}
        onClose={() => setOpenExports(false)}
        loading={false}
        onExport={handleOnExport}
        format={'xlsx'}
      />
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    keywordDatabaseProgressData: getKeywordDatabaseProgressData(state),
    keywordDatabasePaginationInfo: getKeywordDatabaseTablePaginationInfo(state),
  };
};

export default connect(mapStateToProps)(DatabaseExport);
