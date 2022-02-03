import React from 'react';
import { Table } from 'rsuite';
import { connect } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';

/* Styling */
import 'rsuite/dist/styles/rsuite-default.css';
import './globals.scss';
import styles from './index.module.scss';

/* Actions */
import { fetchSalesProjection } from '../../../../actions/PerfectStock/SalesProjection';

/* Interfaces */
import { SalesProjectionPayload } from '../../../../interfaces/PerfectStock/SalesProjection';
import {
  DateRange,
  GanttChartPurchaseOrder,
} from '../../../../interfaces/PerfectStock/OrderPlanning';

/* Components */
import HeaderSortCell from '../../../../components/NewTable/HeaderSortCell';
import HeaderDateCell from '../../../../components/NewTable/HeaderDateCell';
import ProductInformation from './ProductInformation';
import StockOutDate from './StockOutDate';
import InventoryBarCell from './InventoryBarCell';
import EditProductRow from './EditProductRow';
import { ReactComponent as ExclaimationIcon } from '../../../../assets/images/exclamation-triangle-solid.svg';

/* Selectors */
import {
  getActivePurchaseOrder,
  getDateRange,
  getInventoryTableResults,
  getIsLoadingInventoryTableResults,
  getTimeSetting,
} from '../../../../selectors/PerfectStock/OrderPlanning';

/* Constants */
import {
  TimeSetting,
  TIME_SETTING,
  OFFSET_TO_CHART_WIDTH,
  UNIT_WIDTH,
} from '../../../../constants/PerfectStock/OrderPlanning';

/* Actions */
import { fetchInventoryTable } from '../../../../actions/PerfectStock/OrderPlanning';

/* Utils */
import { getDateOnly } from '../../../../utils/date';

interface Props {
  // States
  dateRange: DateRange;
  timeSetting: TimeSetting;
  fetchInventoryTable: () => void;
  inventoryTableResults: any[];
  isLoadingInventoryTableResults: boolean;
  activePurchaseOrder: GanttChartPurchaseOrder;

  emptySkusContent: React.ReactNode;
  isShowingDaysUntilStockout: boolean;
}

/* Main component */
const InventoryTable = (props: Props) => {
  const {
    dateRange,
    timeSetting,
    fetchInventoryTable,
    inventoryTableResults,
    isLoadingInventoryTableResults,
    activePurchaseOrder,
    emptySkusContent,
    isShowingDaysUntilStockout,
  } = props;

  const [sortColumn, setSortColumn] = React.useState<string>('');
  const [sortType, setSortType] = React.useState<'asc' | 'desc' | undefined>(undefined);
  const handleSortColumn = (sortColumn: string, sortType: 'asc' | 'desc' | undefined) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
    fetchSalesProjection({
      sort: sortColumn,
      sortDir: sortType,
    });
  };

  /* Generate headers by producing a date array from start date to end date */
  const [headers, setHeaders] = React.useState<any>([]);
  const generateHeaders = (startDate: Date, endDate: Date) => {
    const DIFF = timeSetting === TIME_SETTING.DAY ? 1 : 7;
    if (startDate && endDate) {
      const dateArray = [];
      let currentDate = startDate;
      while (currentDate <= endDate) {
        const dateString = getDateOnly(currentDate);
        dateArray.push(dateString);
        currentDate = new Date(currentDate.setDate(currentDate.getDate() + DIFF));
      }
      setHeaders(dateArray);
    } else {
      return [];
    }
  };

  /* Refresh inventory table if date range or time setting is changed  */
  React.useEffect(() => {
    generateHeaders(new Date(dateRange.startDate), new Date(dateRange.endDate));
    fetchInventoryTable();
  }, [dateRange.startDate, timeSetting, activePurchaseOrder]);

  /* Parse backend data to fit into a table format */
  /* i.e. {
    sku: xxx,
    name: xxx,
    21-05-2020: 20 inventory,
    22-05-2020: 20 inventory,
    23-05-2020: 20 inventory,
    ...
  } */
  const displayInventoryResults = inventoryTableResults.map((rowData: any) => {
    if (!isShowingDaysUntilStockout) {
      return {
        ...rowData,
        ...rowData.expected_inventories,
      };
    } else {
      return {
        ...rowData,
        ...rowData.days_until_sos,
      };
    }
  });

  const inventoryResultsIds =
    activePurchaseOrder.id !== -1 ? displayInventoryResults.map((rowData: any) => rowData.sku) : [];

  return (
    <>
      <section className={styles.productDatabaseWrapper}>
        <Table
          renderLoading={() =>
            isLoadingInventoryTableResults && (
              <Dimmer active inverted>
                <Loader />
              </Dimmer>
            )
          }
          renderEmpty={() => emptySkusContent}
          affixHorizontalScrollbar={0}
          // Dont display old data when loading
          data={displayInventoryResults}
          hover={false}
          autoHeight
          rowHeight={90}
          headerHeight={60}
          rowExpandedHeight={90}
          onSortColumn={handleSortColumn}
          rowKey="sku"
          virtualized
          expandedRowKeys={inventoryResultsIds}
          renderRowExpanded={(rowData: any) => (
            <EditProductRow orderId={activePurchaseOrder.id} rowData={rowData} />
          )}
          id="orderPlanningStockInventoryTable"
        >
          {/* Product Information  */}
          <Table.Column
            /* Calculate width to chart dates to align all the dates, minus 30 for offset from expansion cell */
            width={(OFFSET_TO_CHART_WIDTH - 30) * (2 / 3)}
            verticalAlign="top"
            align="center"
          >
            <Table.HeaderCell>
              <span className={styles.productTitle}>Product</span>
            </Table.HeaderCell>
            <ProductInformation dataKey="productInformation" />
          </Table.Column>

          {/* Stock out date info  */}
          <Table.Column
            /* Calculate width to chart dates to align all the dates, minus 30 for offset from expansion cell */
            width={(OFFSET_TO_CHART_WIDTH - 30) * (1 / 3)}
            verticalAlign="top"
            align="center"
          >
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Days Until\nStock Out`}
                dataKey="days_until_so"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
                alignMiddle
                icon={<ExclaimationIcon />}
              />
            </Table.HeaderCell>
            <StockOutDate dataKey="days_until_so" />
          </Table.Column>

          {/* Render a column for each date from end date to statr date */}
          {headers.map((date: string, index: number) => {
            return (
              <Table.Column width={UNIT_WIDTH} verticalAlign="top" align="center" key={index}>
                <Table.HeaderCell>
                  <HeaderDateCell title={date} />
                </Table.HeaderCell>
                <InventoryBarCell
                  dataKey={date}
                  key={index}
                  isShowingDaysUntilStockout={isShowingDaysUntilStockout}
                />
              </Table.Column>
            );
          })}
        </Table>
      </section>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    dateRange: getDateRange(state),
    timeSetting: getTimeSetting(state),
    inventoryTableResults: getInventoryTableResults(state),
    isLoadingInventoryTableResults: getIsLoadingInventoryTableResults(state),
    activePurchaseOrder: getActivePurchaseOrder(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSalesProjection: (payload: SalesProjectionPayload) =>
      dispatch(fetchSalesProjection(payload)),
    fetchInventoryTable: () => dispatch(fetchInventoryTable()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InventoryTable);
