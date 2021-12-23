import React from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Components */
import TableExport from '../../../../components/NewTable/TableExport';

/* Assets */
import { ReactComponent as XLSXExportImage } from '../../../../assets/images/xlsxExportImage.svg';
import { ReactComponent as CSVExportImage } from '../../../../assets/images/csvExportImage.svg';
import { ReactComponent as UndoIcon } from '../../../../assets/images/undoIcon.svg';

/* Selectors */
import {
  getSalesProjectionUpdateDate,
  getIsFetchingProgressForRefresh,
} from '../../../../selectors/PerfectStock/SalesProjection';

/* Actions */
import { refreshSalesProjection } from '../../../../actions/PerfectStock/SalesProjection';
import { Loader } from 'semantic-ui-react';

interface Props {
  salesProjectionUpdateDate: string;
  isFetchingProgressForRefresh: boolean;
  refreshSalesProjection: () => void;
}

const SalesProjectionMeta = (props: Props) => {
  const { salesProjectionUpdateDate, refreshSalesProjection, isFetchingProgressForRefresh } = props;
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
        <TableExport
          label=""
          disableExport={false}
          onButtonClick={() => console.log('Export')}
          exportContent={
            <>
              <div className={styles.exportOptions}>
                <span>Export As</span>
                <button
                  className={styles.exportOption}
                  onClick={() => console.log('Export')}
                  disabled={false}
                >
                  <XLSXExportImage /> .XLSX
                </button>

                <button
                  className={styles.exportOption}
                  onClick={() => console.log('Export')}
                  disabled={false}
                >
                  <CSVExportImage /> .CSV
                </button>
              </div>
            </>
          }
        />
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
