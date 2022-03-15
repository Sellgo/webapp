import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Checkbox, Loader } from 'semantic-ui-react';
import { DateRangePicker } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../../../components/ActionButton';
import CreateOrderModal from '../CreateOrderModal';
import TableExport from '../../../../components/NewTable/TableExport';
import TooltipWrapper from '../../../../components/TooltipWrapper';
import BoxContainer from '../../../../components/BoxContainer';
import BoxHeader from '../../../../components/BoxHeader';

/* Assets */
import { ReactComponent as ThinAddIcon } from '../../../../assets/images/thinAddIcon.svg';
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
import { getDateOnly } from '../../../../utils/date';
import InputTabSelection from '../../../../components/InputTabSelection';

interface Props {
  refreshInventoryTable: () => void;
  isFetchingProgressForRefresh: boolean;
  inventoryTableUpdateDate: string;

  tableViewMode: 'Inventory' | 'Stockout' | 'Today';
  setTableViewMode: (tableViewMode: 'Inventory' | 'Stockout' | 'Today') => void;
}

const OrderPlanningMeta = (props: Props) => {
  const {
    refreshInventoryTable,
    isFetchingProgressForRefresh,
    inventoryTableUpdateDate,
    tableViewMode,
    setTableViewMode,
  } = props;
  const [isExportLoading, setExportLoading] = React.useState<boolean>(false);
  const [isCreatingOrder, setIsCreatingOrder] = React.useState(false);
  const [isExportConfirmOpen, setExportConfirmOpen] = React.useState<boolean>(false);
  const [startEndDate, setStartEndDate] = React.useState<any>([undefined, undefined]);

  const handleOnExport = async () => {
    if (!startEndDate[0] || !startEndDate[1]) {
      error('Please select a start and end date');
    }
    setExportLoading(true);
    setExportConfirmOpen(false);
    try {
      const url = `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/perfect-stock/export`;
      const { data } = await axios.post(url, {
        type: 'order',
        start_date: getDateOnly(startEndDate[0]),
        end_date: getDateOnly(startEndDate[1]),
      });
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
        <TooltipWrapper tooltipKey="Create Order">
          <ActionButton
            variant="primary"
            type="purpleGradient"
            size="md"
            className={styles.createOrderButton}
            onClick={() => setIsCreatingOrder(true)}
          >
            <ThinAddIcon />
            <span>Smart Order</span>
          </ActionButton>
        </TooltipWrapper>
        <div className={styles.exportOptionsWrapper}>
          {displayDate && (
            <button
              className={styles.refreshButton}
              onClick={refreshInventoryTable}
              disabled={isFetchingProgressForRefresh}
            >
              <TooltipWrapper tooltipKey="Refresh Date">
                Last Update:&nbsp;<span>{displayDate}</span>
              </TooltipWrapper>
              &nbsp;
              {!isFetchingProgressForRefresh ? (
                <UndoIcon className={styles.refreshIcon} />
              ) : (
                <Loader active inline size="tiny" />
              )}
            </button>
          )}
          &nbsp;
          <TooltipWrapper tooltipKey="Toggle Show Days Until Stockout">
            <InputTabSelection
              options={['Inventory', 'Stockout', 'Today']}
              selectedOption={tableViewMode}
              setSelectedOption={setTableViewMode}
              isPurple
              borderless
            />
          </TooltipWrapper>
          <TableExport
            label=""
            loading={isExportLoading}
            disableExport={false}
            onButtonClick={() => setExportConfirmOpen(true)}
            className={styles.exportOptions}
            isConfirmOpen={isExportConfirmOpen}
            setConfirmOpen={setExportConfirmOpen}
            exportConfirmation={
              <>
                <BoxHeader>DOWNLOAD: ORDER PLANNING</BoxHeader>
                <BoxContainer className={styles.exportConfirmContainer}>
                  <div className={styles.salesForecastDateSelector}>
                    <Checkbox checked={true} disabled />
                    <span className={styles.dateSelectorLabel}>Past Inventory</span>
                    <DateRangePicker
                      className={styles.dateRangePicker}
                      value={startEndDate}
                      onChange={value => setStartEndDate(value)}
                    />
                  </div>
                  <ActionButton
                    variant="primary"
                    size={'md'}
                    type="black"
                    onClick={handleOnExport}
                    className={styles.confirmButton}
                  >
                    Download
                  </ActionButton>
                </BoxContainer>
              </>
            }
            exportContent={
              <>
                <div className={styles.exportOptions}>
                  <span>Export As</span>
                  <button
                    className={styles.exportOption}
                    onClick={() => setExportConfirmOpen(true)}
                    disabled={false}
                  >
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
