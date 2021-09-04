import React from 'react';
import { Icon, Popup } from 'semantic-ui-react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Selectors */
import {
  getKeywordReverseProgressData,
  getKeywordReverseTablePaginationInfo,
} from '../../../../selectors/KeywordResearch/KeywordReverse';

/* Interfaces */
import {
  KeywordReverseProgressData,
  KeywordReversePaginationInfo,
} from '../../../../interfaces/KeywordResearch/KeywordReverse';

/* Utils */
import { downloadFile } from '../../../../utils/download';
import { success } from '../../../../utils/notifications';
import { formatNumber } from '../../../../utils/format';

/* Assets */
import { ReactComponent as XLSXExportImage } from '../../../../assets/images/xlsxExportImage.svg';

interface Props {
  reverseKeywordProgressData: KeywordReverseProgressData;
  reverseKeywordTablePaginationInfo: KeywordReversePaginationInfo;
}

const ReverseExport = (props: Props) => {
  const { reverseKeywordProgressData, reverseKeywordTablePaginationInfo } = props;

  const handleOnExport = async () => {
    if (reverseKeywordProgressData.report_xlsx_url) {
      await downloadFile(reverseKeywordProgressData.report_xlsx_url);
      success('File successfully downloaded');
    }
  };

  const shouldEnableXlsxExport = reverseKeywordProgressData.report_xlsx_url;

  return (
    <>
      <section className={styles.exportsContainer}>
        {reverseKeywordTablePaginationInfo.total_pages > 0 && (
          <p className={styles.messageText}>
            Viewing{' '}
            <span className={styles.sellerCount}>
              {formatNumber(reverseKeywordTablePaginationInfo.count)}
            </span>{' '}
            keywords.
          </p>
        )}

        <div className={styles.exportButtonContainer}>
          <Icon name="download" className={styles.downloadIcon} />
          <Popup
            className={styles.exportPopup}
            on="click"
            position="bottom right"
            offset="-5"
            trigger={
              <Icon
                name="angle down"
                className={styles.caretDownIcon}
                style={{ cursor: 'pointer' }}
              />
            }
            content={
              <>
                <div className={styles.exportOptions}>
                  <span>Export As</span>
                  <button
                    className={styles.exportOption}
                    onClick={handleOnExport}
                    disabled={!shouldEnableXlsxExport}
                  >
                    <XLSXExportImage /> .XLSX
                  </button>
                </div>
              </>
            }
          />
        </div>
      </section>
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
