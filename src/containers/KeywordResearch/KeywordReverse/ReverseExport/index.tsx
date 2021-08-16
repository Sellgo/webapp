import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ExportResultAs from '../../../../components/ExportResultAs';

/* Constants */
import { EXPORT_DATA, EXPORT_FORMATS } from '../../../../constants/KeywordResearch/KeywordReverse';

/* Selectors */
import {
  getKeywordReverseProgressData,
  getKeywordReverseTableResults,
} from '../../../../selectors/KeywordResearch/KeywordReverse';

/* Interfaces */
import { ReverseKeywordProgressData } from '../../../../interfaces/KeywordResearch/KeywordReverse';
import { connect } from 'react-redux';
import { downloadFile } from '../../../../utils/download';
import { success } from '../../../../utils/notifications';

interface Props {
  reverseKeywordDatabaseTable: any;
  reverseKeywordProgressData: ReverseKeywordProgressData;
}

const ReverseExport = (props: Props) => {
  const { reverseKeywordDatabaseTable, reverseKeywordProgressData } = props;

  const [openExports, setOpenExports] = useState(false);

  const handleOnExport = async () => {
    if (reverseKeywordProgressData.report_xlsx_url) {
      await downloadFile(reverseKeywordProgressData.report_xlsx_url);
      success('File successfully downloaded');
    }
  };

  const shouldEnableExport = reverseKeywordProgressData.report_xlsx_url;

  return (
    <>
      <section className={styles.exportsContainer}>
        {reverseKeywordDatabaseTable.length > 0 && (
          <h2>
            {reverseKeywordDatabaseTable.length} keywords found, please add additional filters for a
            more targeted search.
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
    reverseKeywordDatabaseTable: getKeywordReverseTableResults(state),
    reverseKeywordProgressData: getKeywordReverseProgressData(state),
  };
};

export default connect(mapStateToProps)(ReverseExport);
