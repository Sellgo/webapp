import React from 'react';
import { connect } from 'react-redux';
import { Loader } from 'semantic-ui-react';
import axios from 'axios';

/* Styling */
import styles from './index.module.scss';

/* Components */
import TableExport from '../../../../components/NewTable/TableExport';

/* Assets */
import { ReactComponent as UndoIcon } from '../../../../assets/images/undoIcon.svg';
import { ReactComponent as XLSXExportImage } from '../../../../assets/images/xlsxExportImage.svg';

/* Selectors */
import {
  getSalesProjectionUpdateDate,
  getIsFetchingProgressForRefresh,
} from '../../../../selectors/PerfectStock/SalesProjection';

/* Actions */
import { refreshSalesProjection } from '../../../../actions/PerfectStock/SalesProjection';

/* Utils */
import { downloadFile } from '../../../../utils/download';
import { AppConfig } from '../../../../config';
import { sellerIDSelector } from '../../../../selectors/Seller';
import { error, success } from '../../../../utils/notifications';

interface Props {
  salesProjectionUpdateDate: string;
  isFetchingProgressForRefresh: boolean;
  refreshSalesProjection: () => void;
}

const SalesProjectionMeta = (props: Props) => {
  const { salesProjectionUpdateDate, refreshSalesProjection, isFetchingProgressForRefresh } = props;
  const [isExportLoading, setExportLoading] = React.useState<boolean>(false);

  const handleOnExport = async () => {
    setExportLoading(true);
    try {
      const url = `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/perfect-stock/export`;
      const { data } = await axios.post(url, { type: 'sales' });
      const exportUrl = data.report_xlsx_url;
      await downloadFile(exportUrl);
      success('File successfully downloaded');
    } catch (err) {
      error('Failed to export file');
      console.error(err);
    }
    setExportLoading(false);
  };

  /* Display date in format: DD-Month-YYYY */
  const displayDate = salesProjectionUpdateDate
    ? new Date(salesProjectionUpdateDate).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  return (
    <>
      <div className={styles.exportsContainer}>
        {salesProjectionUpdateDate && (
          <button
            className={styles.refreshButton}
            onClick={refreshSalesProjection}
            disabled={isFetchingProgressForRefresh}
          >
            Last Update:&nbsp;<span>{displayDate}</span>
            &nbsp;
            {!isFetchingProgressForRefresh ? (
              <UndoIcon className={styles.refreshIcon} />
            ) : (
              <Loader active inline size="tiny" />
            )}
          </button>
        )}
        <TableExport
          label=""
          loading={isExportLoading}
          disableExport={false}
          onButtonClick={handleOnExport}
          className={styles.exportOptions}
          exportContent={
            <>
              <div className={styles.exportOptions}>
                <span>Export As</span>
                <button className={styles.exportOption} onClick={handleOnExport} disabled={false}>
                  <XLSXExportImage /> .XLSX
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
  isFetchingProgressForRefresh: getIsFetchingProgressForRefresh(state),
  salesProjectionUpdateDate: getSalesProjectionUpdateDate(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  refreshSalesProjection: () => dispatch(refreshSalesProjection()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SalesProjectionMeta);
