import React from 'react';
import { Table } from 'rsuite';
import { connect } from 'react-redux';

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
import Placeholder from '../../../../components/Placeholder';
import HeaderSortCell from '../../../../components/NewTable/HeaderSortCell';
import HeaderDateCell from '../../../../components/NewTable/HeaderDateCell';
import ProductInformation from './ProductInformation';
import StockOutDate from './StockOutDate';
import InventoryBarCell from './InventoryBarCell';
import ExpandedInventory from '../ExpandedInventory';
import ExpansionCell from '../../../../components/NewTable/ExpansionCell';
import { ReactComponent as ExclaimationIcon } from '../../../../assets/images/exclamation-triangle-solid.svg';

/* Selectors */
import {
  getActivePurchaseOrder,
  getDateRange,
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

/* Actions */
import { fetchInventoryTable } from '../../../../actions/PerfectStock/OrderPlanning';

/* Utils */
import { getDateOnly } from '../../../../utils/date';

interface Props {
  // States
  dateRange: DateRange;
  timeSetting: TimeSetting;
  showAllSkus: boolean;
  fetchInventoryTable: () => void;
  inventoryTableResults: any[];
  isLoadingInventoryTableResults: boolean;
  activePurchaseOrder: GanttChartPurchaseOrder;
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
  } = props;

  const [sortColumn, setSortColumn] = React.useState<string>('');
  const [expandedRowKeys, setExpandedRowkeys] = React.useState<string[]>([]);
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

  const handleExpansion = (rowData: any) => {
    const rowId = rowData.id;
    const [currentExpandedRowId] = expandedRowKeys;

    if (currentExpandedRowId !== rowId) {
      setExpandedRowkeys([rowId]);
    } else {
      setExpandedRowkeys([]);
    }
  };

  /* Refresh inventory table if date range or time setting is changed  */
  React.useEffect(() => {
    generateHeaders(new Date(dateRange.startDate), new Date(dateRange.endDate));
    fetchInventoryTable();
  }, [dateRange.startDate, dateRange.endDate, timeSetting]);

  /* Refresh inventory table if active purchase order is changed */
  React.useEffect(() => {
    generateHeaders(new Date(dateRange.startDate), new Date(dateRange.endDate));
    fetchInventoryTable();
  }, [activePurchaseOrder, showAllSkus]);

  const displayInventoryResults = inventoryTableResults.map((rowData: any) => {
    const expectedInventoriesObj = rowData.expected_inventories.reduce(
      (obj: any, expectedInventory: any) => {
        const date = Object.keys(expectedInventory)[0];
        return {
          ...obj,
          [date]: expectedInventory[date],
        };
      },
      {}
    );
    return {
      ...rowData,
      ...expectedInventoriesObj,
    };
  });

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
          rowExpandedHeight={850}
          onSortColumn={handleSortColumn}
          rowKey="id"
          virtualized
          expandedRowKeys={expandedRowKeys}
          renderRowExpanded={(rowData: any) => <ExpandedInventory rowData={rowData} />}
          id="stockInventoryTable"
        >
          {/* Expand Cell */}
          <Table.Column verticalAlign="top" fixed="left" align="left" width={30}>
            <Table.HeaderCell> </Table.HeaderCell>
            <ExpansionCell
              dataKey={'id'}
              expandedRowKeys={expandedRowKeys}
              onChange={handleExpansion}
            />
          </Table.Column>

          {/* Product Information  */}
          <Table.Column
            /* Calculate width to chart dates to align all the dates, minus 30 for offset from expansion cell */
            width={(OFFSET_TO_CHART_WIDTH - 30) * (2 / 3)}
            verticalAlign="top"
            align="center"
          >
            <Table.HeaderCell>Product</Table.HeaderCell>
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
                <InventoryBarCell dataKey={date} key={index} />
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
