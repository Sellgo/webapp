import React from 'react';
import { connect } from 'react-redux';
import { Icon, Popup } from 'semantic-ui-react';

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

/* Assets */
import { ReactComponent as XLSXExportImage } from '../../../../assets/images/xlsxExportImage.svg';

interface Props {
  keywordDatabaseProgressData: KeywordDatabaseProgressData;
  keywordDatabasePaginationInfo: KeywordDatabasePaginationInfo;
}

const DatabaseExport = (props: Props) => {
  const { keywordDatabaseProgressData, keywordDatabasePaginationInfo } = props;

  const handleOnExport = async () => {
    if (keywordDatabaseProgressData.report_xlsx_url) {
      await downloadFile(keywordDatabaseProgressData.report_xlsx_url);
      success('File successfully downloaded');
    }
  };

  const shouldEnableXlsxExport = keywordDatabaseProgressData.report_xlsx_url;

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
    keywordDatabaseProgressData: getKeywordDatabaseProgressData(state),
    keywordDatabasePaginationInfo: getKeywordDatabaseTablePaginationInfo(state),
  };
};

export default connect(mapStateToProps)(DatabaseExport);
