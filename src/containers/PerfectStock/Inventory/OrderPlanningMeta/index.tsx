import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Loader } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../../../components/ActionButton';
import CreateOrderModal from '../CreateOrderModal';
import TableExport from '../../../../components/NewTable/TableExport';

/* Assets */
import { ReactComponent as ThinAddIcon } from '../../../../assets/images/thinAddIcon.svg';
import { ReactComponent as ArrowDown } from '../../../../assets/images/view-detail-down-arrow.svg';
import { ReactComponent as UndoIcon } from '../../../../assets/images/undoIcon.svg';
import { ReactComponent as XLSXExportImage } from '../../../../assets/images/xlsxExportImage.svg';

/* Actions */
import { refreshInventoryTable } from '../../../../actions/PerfectStock/OrderPlanning';

/* Selectors */
import {
  getInventoryTableUpdateDate,
  getIsFetchingProgressForRefresh,
} from '../../../../selectors/PerfectStock/OrderPlanning';
import { sellerIDSelector } from '../../../../selectors/Seller';

/* Utils */
import { downloadFile } from '../../../../utils/download';
import { error, success } from '../../../../utils/notifications';
import { AppConfig } from '../../../../config';

interface Props {
  refreshInventoryTable: () => void;
  isFetchingProgressForRefresh: boolean;
  inventoryTableUpdateDate: string;
}

const OrderPlanningMeta = (props: Props) => {
  const { refreshInventoryTable, isFetchingProgressForRefresh, inventoryTableUpdateDate } = props;
  const [isExportLoading, setExportLoading] = React.useState<boolean>(false);
  const [isCreatingOrder, setIsCreatingOrder] = React.useState(false);

  const handleOnExport = async () => {
    setExportLoading(true);
    try {
      const url = `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/perfect-stock/export`;
      const { data } = await axios.post(url, { type: 'order' });
      const exportUrl = data.report_xlsx_url;
      if (exportUrl) {
        await downloadFile(exportUrl);
      }
      success('File successfully downloaded');
    } catch (err) {
      error('Failed to export file');
      console.error(err);
    }
    setExportLoading(false);
  };

  const displayDate = inventoryTableUpdateDate
    ? new Date(inventoryTableUpdateDate).toLocaleDateString('en-US', {
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
        <ActionButton
          variant="primary"
          type="purpleGradient"
          size="md"
          className={styles.createOrderButton}
          onClick={() => setIsCreatingOrder(true)}
        >
          <ThinAddIcon />
          <span>Create</span>
          <ArrowDown />
        </ActionButton>
        <div className={styles.exportOptionsWrapper}>
          {true && (
            <button
              className={styles.refreshButton}
              onClick={refreshInventoryTable}
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
      </div>
      <CreateOrderModal open={isCreatingOrder} onCloseModal={() => setIsCreatingOrder(false)} />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  isFetchingProgressForRefresh: getIsFetchingProgressForRefresh(state),
  inventoryTableUpdateDate: getInventoryTableUpdateDate(state),
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    refreshInventoryTable: () => dispatch(refreshInventoryTable()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPlanningMeta);
