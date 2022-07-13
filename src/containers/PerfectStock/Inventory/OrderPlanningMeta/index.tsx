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
import InputTabSelection from '../../../../components/InputTabSelection';
import AistockSelectionFilter from '../../../../components/AistockSelectionFilter';

/* Assets */
import { ReactComponent as ThinAddIcon } from '../../../../assets/images/thinAddIcon.svg';
import { ReactComponent as UndoIcon } from '../../../../assets/images/undoIcon.svg';
import { ReactComponent as XLSXExportImage } from '../../../../assets/images/xlsxExportImage.svg';

/* Actions */
import {
  refreshInventoryTable,
  setInventoryTableFilters,
} from '../../../../actions/PerfectStock/OrderPlanning';

/* Selectors */
import {
  getInventoryTableFilters,
  getInventoryTableUpdateDate,
  getIsFetchingProgressForRefresh,
} from '../../../../selectors/PerfectStock/OrderPlanning';
import { sellerIDSelector } from '../../../../selectors/Seller';

/* Utils */
import { downloadFile } from '../../../../utils/download';
import { error, success } from '../../../../utils/notifications';
import { AppConfig } from '../../../../config';
import { getDateOnly } from '../../../../utils/date';

/* Constants */
import {
  EXPORT_ORDER_PLANNING,
  ACTIVE_FILTER_OPTIONS,
  FBA_FILTER_OPTIONS,
} from '../../../../constants/PerfectStock/OrderPlanning';

/* Types */
import { InventoryTableFilters } from '../../../../interfaces/PerfectStock/OrderPlanning';

interface Props {
  refreshInventoryTable: () => void;
  isFetchingProgressForRefresh: boolean;
  inventoryTableUpdateDate: string;
  inventoryTableFilters: InventoryTableFilters;
  setInventoryTableFilters: (filters: InventoryTableFilters) => void;

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
    inventoryTableFilters,
    setInventoryTableFilters,
  } = props;
  const [isExportLoading, setExportLoading] = React.useState<boolean>(false);
  const [isCreatingOrder, setIsCreatingOrder] = React.useState(false);
  const [isExportConfirmOpen, setExportConfirmOpen] = React.useState<boolean>(false);
  const [startEndDate, setStartEndDate] = React.useState<any>({
    2: [undefined, undefined],
    3: [undefined, undefined],
  });
  const [selectedExportType, setSelectedExportType] = React.useState<number>(1);

  React.useEffect(() => {
    if (!isExportConfirmOpen) {
      setStartEndDate({ 2: [], 3: [] });
      setSelectedExportType(1);
    }
  }, [isExportConfirmOpen]);

  const handleOnExport = async () => {
    if (selectedExportType !== 1) {
      if (!startEndDate[selectedExportType][0] || !startEndDate[selectedExportType][1]) {
        error('Please select a start and end date');
        return;
      }
    }
    setExportLoading(true);
    setExportConfirmOpen(false);
    try {
      const url = `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/perfect-stock/export`;
      let payload: any = {
        type: EXPORT_ORDER_PLANNING[selectedExportType],
      };
      if (selectedExportType !== 1) {
        payload = {
          ...payload,
          start_date: getDateOnly(startEndDate[selectedExportType][0]),
          end_date: getDateOnly(startEndDate[selectedExportType][1]),
        };
      }
      const { data } = await axios.post(url, payload);
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
    setSelectedExportType(1);
    setStartEndDate({ 2: [], 3: [] });
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
        <div className={styles.filterContainer}>
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
          <AistockSelectionFilter
            filterOptions={ACTIVE_FILTER_OPTIONS}
            value={inventoryTableFilters.active}
            handleChange={(value: string) => {
              setInventoryTableFilters({ ...inventoryTableFilters, active: value });
            }}
            placeholder={''}
          />
          <AistockSelectionFilter
            filterOptions={FBA_FILTER_OPTIONS}
            value={inventoryTableFilters.fba}
            handleChange={(value: string) => {
              setInventoryTableFilters({ ...inventoryTableFilters, fba: value });
            }}
            placeholder={''}
          />
        </div>
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
                <BoxHeader>EXPORT: ORDER PLANNING</BoxHeader>
                <BoxContainer className={styles.exportConfirmContainer}>
                  <div className={styles.salesForecastDateSelector}>
                    <Checkbox
                      checked={!!(selectedExportType === 1)}
                      radio
                      onChange={() => {
                        if (selectedExportType === 2 || selectedExportType === 3) {
                          setSelectedExportType(1);
                          setStartEndDate({ 2: [], 3: [] });
                        }
                      }}
                    />
                    <span className={styles.dateSelectorLabel}>Highlight Today's Inventory</span>
                  </div>
                  <div
                    className={`${styles.salesForecastDateSelector} ${styles.exportOrderPlanningMargin}`}
                  >
                    <Checkbox
                      checked={!!(selectedExportType === 2)}
                      radio
                      onChange={() => {
                        if (selectedExportType === 1 || selectedExportType === 3) {
                          setSelectedExportType(2);
                          setStartEndDate({ 2: [], 3: [] });
                        }
                      }}
                    />
                    <span className={styles.dateSelectorLabel}>Past Inventory</span>
                    <DateRangePicker
                      className={styles.dateRangePicker}
                      value={startEndDate[2][0] && startEndDate[2][1] ? startEndDate[2] : []}
                      onChange={value => {
                        if (value) {
                          setStartEndDate({ 2: value, 3: [] });
                        }
                      }}
                      showOneCalendar
                      disabled={!(selectedExportType === 2)}
                      preventOverflow
                    />
                  </div>
                  <div
                    className={`${styles.salesForecastDateSelector} ${styles.exportOrderPlanningMargin}`}
                  >
                    <Checkbox
                      checked={!!(selectedExportType === 3)}
                      radio
                      onChange={() => {
                        if (selectedExportType === 1 || selectedExportType === 2) {
                          setSelectedExportType(3);
                          setStartEndDate({ 2: [], 3: [] });
                        }
                      }}
                    />
                    <span className={styles.dateSelectorLabel}>Order Planning </span>
                    <DateRangePicker
                      className={styles.dateRangePicker}
                      value={startEndDate[3][0] && startEndDate[3][1] ? startEndDate[3] : []}
                      onChange={value => {
                        if (value) {
                          setStartEndDate({ 2: [], 3: value });
                        }
                      }}
                      showOneCalendar
                      disabled={!(selectedExportType === 3)}
                      preventOverflow
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
      <CreateOrderModal open={isCreatingOrder} setIsCreatingOrder={setIsCreatingOrder} />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  isFetchingProgressForRefresh: getIsFetchingProgressForRefresh(state),
  inventoryTableUpdateDate: getInventoryTableUpdateDate(state),
  inventoryTableFilters: getInventoryTableFilters(state),
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    refreshInventoryTable: () => dispatch(refreshInventoryTable()),
    setInventoryTableFilters: (filters: InventoryTableFilters) =>
      dispatch(setInventoryTableFilters(filters)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPlanningMeta);
