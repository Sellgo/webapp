import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ExportResultAs from '../../../../components/ExportResultAs';

/* Constants */
import { EXPORT_DATA, EXPORT_FORMATS } from '../../../../constants/KeywordResearch/KeywordReverse';

/* Selectors */
import {
  getKeywordReverseProgressData,
  getKeywordReverseTablePaginationInfo,
} from '../../../../selectors/KeywordResearch/KeywordReverse';

/* Interfaces */
import {
  ReverseKeywordProgressData,
  KeywordReversePaginationInfo,
} from '../../../../interfaces/KeywordResearch/KeywordReverse';

/* Utils */
import { downloadFile } from '../../../../utils/download';
import { success } from '../../../../utils/notifications';

interface Props {
  reverseKeywordProgressData: ReverseKeywordProgressData;
  reverseKeywordTablePaginationInfo: KeywordReversePaginationInfo;
}

const ReverseExport = (props: Props) => {
  const { reverseKeywordProgressData, reverseKeywordTablePaginationInfo } = props;

  const [openExports, setOpenExports] = useState(false);

  const handleOnExport = async () => {
    if (reverseKeywordProgressData.report_xlsx_url) {
      await downloadFile(reverseKeywordProgressData.report_xlsx_url);
      success('File successfully downloaded');
      setOpenExports(false);
    }
  };

  const shouldEnableExport = reverseKeywordProgressData.report_xlsx_url;

  return (
    <>
      <section className={styles.exportsContainer}>
        {reverseKeywordTablePaginationInfo.total_pages > 0 && (
          <h2>
            {reverseKeywordTablePaginationInfo.count} keywords found, please add additional filters
            for a more targeted search.
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
    reverseKeywordProgressData: getKeywordReverseProgressData(state),
    reverseKeywordTablePaginationInfo: getKeywordReverseTablePaginationInfo(state),
  };
};

export default connect(mapStateToProps)(ReverseExport);
