import React from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Selectors */
import {
  getTrackerProductKeywordsTableResults,
  getKeywordTrackerProductsExpandedRow,
} from '../../../../../selectors/KeywordResearch/KeywordTracker';

/* Componensts*/
import TableExport from '../../../../../components/NewTable/TableExport';

/* Utils */
import { downloadFile } from '../../../../../utils/download';
import { success } from '../../../../../utils/notifications';

/* Assets */
import { ReactComponent as XLSXExportImage } from '../../../../../assets/images/xlsxExportImage.svg';

interface Props {
  trackerProductKeywordsTableResults: any[];
  keywordTrackerProductsExpandedRow: any;
}

const TrackerKeywordsExport = (props: Props) => {
  const { trackerProductKeywordsTableResults, keywordTrackerProductsExpandedRow } = props;
  const exportXlsxReport = keywordTrackerProductsExpandedRow.report_xlsx_url;
  const handleExport = async (type: 'xlsx' | 'csv') => {
    if (type === 'xlsx') {
      await downloadFile(exportXlsxReport);
      success('File Successfully downloaded');
    }
  };

  const shouldEnableXlsxExport =
    trackerProductKeywordsTableResults && trackerProductKeywordsTableResults.length > 0;

  return (
    <>
      <section className={styles.exportsContainer}>
        <TableExport
          className={styles.exportText}
          label="All Keywords"
          disableExport={!shouldEnableXlsxExport}
          onButtonClick={() => handleExport('xlsx')}
          exportContent={
            <>
              <div className={styles.exportOptions}>
                <span>Export As</span>
                <button
                  className={styles.exportOption}
                  onClick={() => handleExport('xlsx')}
                  disabled={!shouldEnableXlsxExport}
                >
                  <XLSXExportImage /> .XLSX
                </button>
              </div>
            </>
          }
        />
      </section>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    trackerProductKeywordsTableResults: getTrackerProductKeywordsTableResults(state),
    keywordTrackerProductsExpandedRow: getKeywordTrackerProductsExpandedRow(state),
  };
};

export default connect(mapStateToProps)(TrackerKeywordsExport);
