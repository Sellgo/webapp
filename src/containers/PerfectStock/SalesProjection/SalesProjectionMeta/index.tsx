import React from 'react';
import { connect } from 'react-redux';
import { Checkbox, Loader } from 'semantic-ui-react';
import { DateRangePicker } from 'rsuite';
import axios from 'axios';

/* Styling */
import styles from './index.module.scss';

/* Components */
import TableExport from '../../../../components/NewTable/TableExport';
import TooltipWrapper from '../../../../components/TooltipWrapper';
import BoxHeader from '../../../../components/BoxHeader';
import BoxContainer from '../../../../components/BoxContainer';
import ActionButton from '../../../../components/ActionButton';
import AistockSelectionFilter from '../../../../components/AistockSelectionFilter';

/* Assets */
import { ReactComponent as UndoIcon } from '../../../../assets/images/undoIcon.svg';
import { ReactComponent as XLSXExportImage } from '../../../../assets/images/xlsxExportImage.svg';

/* Selectors */
import {
  getSalesProjectionUpdateDate,
  getIsFetchingProgressForRefresh,
  getSalesProjectionFilters,
} from '../../../../selectors/PerfectStock/SalesProjection';

/* Actions */
import {
  refreshSalesProjection,
  setSalesProjectionFilters,
} from '../../../../actions/PerfectStock/SalesProjection';

/* Utils */
import { downloadFile } from '../../../../utils/download';
import { AppConfig } from '../../../../config';
import { sellerIDSelector } from '../../../../selectors/Seller';
import { error, success } from '../../../../utils/notifications';
import { getDateOnly } from '../../../../utils/date';

/* Constants */
import {
  EXPORT_SALES_FORCASTING,
  ACTIVE_FILTER_OPTIONS,
  FBA_FILTER_OPTIONS,
} from '../../../../constants/PerfectStock/SalesProjection';

/* Types */
import { SalesProjectionFilters } from '../../../../interfaces/PerfectStock/SalesProjection';

interface Props {
  salesProjectionUpdateDate: string;
  isFetchingProgressForRefresh: boolean;
  refreshSalesProjection: () => void;
  salesProjectionFilters: SalesProjectionFilters;
  setSalesProjectionFilters: (filters: SalesProjectionFilters) => void;
}

const SalesProjectionMeta = (props: Props) => {
  const {
    salesProjectionUpdateDate,
    salesProjectionFilters,
    setSalesProjectionFilters,
    refreshSalesProjection,
    isFetchingProgressForRefresh,
  } = props;
  const [isExportLoading, setExportLoading] = React.useState<boolean>(false);
  const [isExportConfirmOpen, setExportConfirmOpen] = React.useState<boolean>(false);
  const [startEndDate, setStartEndDate] = React.useState<any>({
    1: [undefined, undefined],
    2: [undefined, undefined],
  });
  const [selectedExportType, setSelectedExportType] = React.useState<number>(1);
  const handleOnExport = async () => {
    if (!startEndDate[selectedExportType][0] || !startEndDate[selectedExportType][1]) {
      error('Please select a start and end date');
      return;
    }
    setExportLoading(true);
    setExportConfirmOpen(false);
    try {
      const url = `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/perfect-stock/export`;
      const { data } = await axios.post(url, {
        type: EXPORT_SALES_FORCASTING[selectedExportType],
        start_date: getDateOnly(startEndDate[selectedExportType][0]),
        end_date: getDateOnly(startEndDate[selectedExportType][1]),
      });
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
      <div className={styles.metaContainer}>
        <div className={styles.filterContainer}>
          <AistockSelectionFilter
            filterOptions={ACTIVE_FILTER_OPTIONS}
            value={salesProjectionFilters.active}
            handleChange={(value: string) => {
              setSalesProjectionFilters({ ...salesProjectionFilters, active: value });
            }}
            placeholder={''}
          />
          <AistockSelectionFilter
            filterOptions={FBA_FILTER_OPTIONS}
            value={salesProjectionFilters.fba}
            handleChange={(value: string) => {
              setSalesProjectionFilters({ ...salesProjectionFilters, fba: value });
            }}
            placeholder={''}
          />
        </div>
        <div className={styles.exportContainer}>
          <button
            id="salesProjectionRefreshButton"
            className={`${styles.refreshButton}`}
            onClick={refreshSalesProjection}
            disabled={isFetchingProgressForRefresh}
          >
            {salesProjectionUpdateDate && (
              <>
                <TooltipWrapper tooltipKey="Refresh Date">
                  <>
                    Last Update:&nbsp;<span>{displayDate}</span>
                  </>
                </TooltipWrapper>
                &nbsp;
              </>
            )}
            {!isFetchingProgressForRefresh ? (
              <UndoIcon className={styles.refreshIcon} />
            ) : (
              <Loader active inline size="tiny" />
            )}
          </button>

          <TableExport
            label=""
            loading={isExportLoading}
            disableExport={false}
            onButtonClick={handleOnExport}
            className={styles.exportOptions}
            isConfirmOpen={isExportConfirmOpen}
            setConfirmOpen={setExportConfirmOpen}
            exportConfirmation={
              <>
                <BoxHeader>EXPORT: SALES FORECASTING</BoxHeader>
                <BoxContainer className={styles.exportConfirmContainer}>
                  <div className={styles.salesForecastDateSelector}>
                    <Checkbox
                      checked={!!(selectedExportType === 1)}
                      radio
                      onChange={() => {
                        if (selectedExportType === 2) {
                          setSelectedExportType(1);
                          setStartEndDate({ 1: [], 2: [] });
                        }
                      }}
                    />
                    <span className={styles.dateSelectorLabel}>Sales Forecast</span>
                    <DateRangePicker
                      className={styles.dateRangePicker}
                      value={startEndDate[1][0] && startEndDate[1][1] ? startEndDate[1] : []}
                      onChange={value => {
                        if (value) {
                          setStartEndDate({ 1: value, 2: [] });
                        }
                      }}
                      showOneCalendar
                      disabled={!(selectedExportType === 1)}
                      preventOverflow
                    />
                  </div>
                  <div
                    className={`${styles.salesForecastDateSelector} ${styles.salesCalenderDataPickerMarginTop}`}
                  >
                    <Checkbox
                      checked={!!(selectedExportType === 2)}
                      radio
                      onChange={() => {
                        if (selectedExportType === 1) {
                          setStartEndDate({ 1: [], 2: [] });
                          setSelectedExportType(2);
                        }
                      }}
                    />
                    <span className={styles.dateSelectorLabel}>Sales Calender</span>
                    <DateRangePicker
                      className={styles.dateRangePicker}
                      value={startEndDate[2][0] && startEndDate[2][1] ? startEndDate[2] : []}
                      onChange={value => {
                        if (value) {
                          setStartEndDate({ 1: [], 2: value });
                        }
                      }}
                      showOneCalendar
                      disabled={!(selectedExportType === 2)}
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
    </>
  );
};

const mapStateToProps = (state: any) => ({
  isFetchingProgressForRefresh: getIsFetchingProgressForRefresh(state),
  salesProjectionUpdateDate: getSalesProjectionUpdateDate(state),
  salesProjectionFilters: getSalesProjectionFilters(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  refreshSalesProjection: () => dispatch(refreshSalesProjection()),
  setSalesProjectionFilters: (filters: SalesProjectionFilters) =>
    dispatch(setSalesProjectionFilters(filters)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SalesProjectionMeta);
