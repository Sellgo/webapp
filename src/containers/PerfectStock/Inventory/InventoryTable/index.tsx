import React from 'react';
import { Table } from 'rsuite';
import { connect } from 'react-redux';

/* Styling */
import 'rsuite/dist/styles/rsuite-default.css';
import './globals.scss';
import styles from './index.module.scss';

/* Actions */
import { fetchInventoryTable } from '../../../../actions/PerfectStock/OrderPlanning';

/* Interfaces */
import {
  DateRange,
  GanttChartPurchaseOrder,
  InventoryTableFilters,
  InventoryTablePayload,
} from '../../../../interfaces/PerfectStock/OrderPlanning';

/* Components */
import Placeholder from '../../../../components/Placeholder';
import HeaderSortCell from '../../../../components/NewTable/HeaderSortCell';
import HeaderDateCell from '../../../../components/NewTable/HeaderDateCell';
import ProductInformation from './ProductInformation';
import StockOutDate from './StockOutDate';
import InventoryBarCell from './InventoryBarCell';
import ExpandedInventory from '../ExpandedInventory';
import ExpansionCell from '../../../../components/NewTable/ExpansionCell';
import { ReactComponent as ExclaimationIcon } from '../../../../assets/images/exclamation-triangle-solid.svg';
import TodaySkuTable from './TodaySkuTable';

/* Selectors */
import {
  getActivePurchaseOrder,
  getDateRange,
  getInventoryTableFilters,
  getInventoryTableResults,
  getInventoryTableShowAllSkus,
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

/* Utils */
import { getDateOnly } from '../../../../utils/date';

interface Props {
  // States
  dateRange: DateRange;
  timeSetting: TimeSetting;
  showAllSkus: boolean;
  fetchInventoryTable: (payload: InventoryTablePayload) => void;
  inventoryTableResults: any[];
  isLoadingInventoryTableResults: boolean;
  activePurchaseOrder: GanttChartPurchaseOrder;
  tableViewMode: 'Inventory' | 'Stockout' | 'Today';
  inventoryTableFilters: InventoryTableFilters;
}

/* Main component */
const InventoryTable = (props: Props) => {
  const {
    dateRange,
    timeSetting,
    showAllSkus,
    fetchInventoryTable,
    inventoryTableResults,
    isLoadingInventoryTableResults,
    activePurchaseOrder,
    tableViewMode,
    inventoryTableFilters,
  } = props;

  const [sortColumn, setSortColumn] = React.useState<string>('');
  const [expandedRowKeys, setExpandedRowkeys] = React.useState<string[]>([]);
  const [sortType, setSortType] = React.useState<'asc' | 'desc' | undefined>(undefined);
  const handleSortColumn = (sortColumn: string, sortType: 'asc' | 'desc' | undefined) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
    fetchInventoryTable({
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

  const handleExpansion = (rowData: any) => {
    const rowSku = rowData.sku;
    const [currentExpandedRowId] = expandedRowKeys;

    if (currentExpandedRowId !== rowSku) {
      setExpandedRowkeys([rowSku]);
    } else {
      setExpandedRowkeys([]);
    }
  };

  /* Refresh inventory table if date range or time setting is changed  */
  React.useEffect(() => {
    generateHeaders(new Date(dateRange.startDate), new Date(dateRange.endDate));
    fetchInventoryTable({
      sort: sortColumn,
      sortDir: sortType,
    });
  }, [dateRange.startDate, dateRange.endDate, timeSetting]);

  /* Refresh inventory table if active purchase order is changed */
  React.useEffect(() => {
    generateHeaders(new Date(dateRange.startDate), new Date(dateRange.endDate));
    fetchInventoryTable({
      sort: sortColumn,
      sortDir: sortType,
    });
    setExpandedRowkeys([]);
  }, [activePurchaseOrder, showAllSkus]);

  /* Refresh inventory table if filters are changed */
  React.useEffect(() => {
    generateHeaders(new Date(dateRange.startDate), new Date(dateRange.endDate));
    fetchInventoryTable({
      sort: sortColumn,
      sortDir: sortType,
    });
    setExpandedRowkeys([]);
  }, [inventoryTableFilters.active, inventoryTableFilters.fba]);

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
    if (tableViewMode === 'Inventory') {
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

  if (tableViewMode === 'Today') {
    return (
      <>
        <section className={styles.productDatabaseWrapper}>
          <TodaySkuTable
            data={displayInventoryResults}
            sortColumn={sortColumn}
            sortType={sortType}
            handleSortColumn={handleSortColumn}
            handleExpansion={handleExpansion}
            expandedRowKeys={expandedRowKeys}
          />
        </section>
      </>
    );
  }

  return (
    <>
      <section className={styles.productDatabaseWrapper}>
        <Table
          renderLoading={() =>
            isLoadingInventoryTableResults && (
              <Placeholder numberParagraphs={2} numberRows={3} isGrey />
            )
          }
          renderEmpty={() => <div />}
          affixHorizontalScrollbar={0}
          // Dont display old data when loading
          data={!isLoadingInventoryTableResults ? displayInventoryResults : []}
          hover={false}
          autoHeight
          rowHeight={90}
          headerHeight={60}
          rowExpandedHeight={1050}
          onSortColumn={handleSortColumn}
          rowKey="sku"
          virtualized
          expandedRowKeys={expandedRowKeys}
          renderRowExpanded={(rowData: any) => <ExpandedInventory rowData={rowData} />}
          id="stockInventoryTable"
        >
          {/* Expand Cell */}
          <Table.Column verticalAlign="top" fixed="left" align="left" width={30}>
            <Table.HeaderCell> </Table.HeaderCell>
            <ExpansionCell
              dataKey={'sku'}
              expandedRowKeys={expandedRowKeys}
              onChange={handleExpansion}
            />
          </Table.Column>

          {/* Product Information  */}
          <Table.Column
            /* Calculate width to chart dates to align all the dates, minus 30 for offset from expansion cell */
            width={OFFSET_TO_CHART_WIDTH - 30 - 112}
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
            width={112}
            verticalAlign="top"
            align="center"
            sortable
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
                  isShowingDaysUntilStockout={tableViewMode === 'Stockout'}
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
    showAllSkus: getInventoryTableShowAllSkus(state),
    inventoryTableFilters: getInventoryTableFilters(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchInventoryTable: (payload: InventoryTablePayload) => dispatch(fetchInventoryTable(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InventoryTable);
