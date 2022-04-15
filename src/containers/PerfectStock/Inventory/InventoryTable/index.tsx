import React from 'react';
import { Table } from 'rsuite';
import { connect } from 'react-redux';

/* Styling */
import 'rsuite/dist/styles/rsuite-default.css';
import './globals.scss';
import styles from './index.module.scss';

/* Actions */
import {
  fetchInventoryTable,
  fetchPurchaseOrders,
} from '../../../../actions/PerfectStock/OrderPlanning';

/* Interfaces */
import {
  DateRange,
  InventoryTableFilters,
  InventoryTablePayload,
  PurchaseOrder,
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
import DeleteCell from '../../../../components/NewTable/DeleteCell';
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
import axios from 'axios';
import { AppConfig } from '../../../../config';
import { sellerIDSelector } from '../../../../selectors/Seller';
import { success, error } from '../../../../utils/notifications';

interface Props {
  // States
  dateRange: DateRange;
  timeSetting: TimeSetting;
  showAllSkus: boolean;
  fetchInventoryTable: (payload: InventoryTablePayload) => void;
  fetchPurchaseOrders: () => void;
  inventoryTableResults: any[];
  isLoadingInventoryTableResults: boolean;
  activePurchaseOrder: PurchaseOrder;
  tableViewMode: 'Inventory' | 'Stockout' | 'Today';
  inventoryTableFilters: InventoryTableFilters;
}

/* Main component */
const InventoryTable = (props: Props) => {
  const {
    dateRange,
    timeSetting,
    fetchPurchaseOrders,
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

  const handleDeleteSku = async (merchant_listing_id: number) => {
    const selectedSkus = activePurchaseOrder.merchant_listings;
    const newSkus = selectedSkus.filter(
      (sku: any) => sku.merchant_listing_id !== merchant_listing_id
    );
    try {
      const { status } = await axios.patch(
        `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/purchase-order-templates/${
          activePurchaseOrder.purchase_order_template_id
        }`,
        { merchant_listing_ids: newSkus.map(newSkus => newSkus.merchant_listing_id) }
      );
      if (status === 200) {
        success('Deleted SKU successfully');
        fetchPurchaseOrders();
        fetchInventoryTable({});
      }
    } catch (e) {
      console.error(e);
      error('Failed to delete SKU');
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
            isLoadingInventoryTableResults={isLoadingInventoryTableResults}
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
          rowExpandedHeight={800}
          onSortColumn={handleSortColumn}
          sortColumn={sortColumn}
          sortType={sortType}
          rowKey="sku"
          virtualized
          expandedRowKeys={expandedRowKeys}
          renderRowExpanded={(rowData: any) => <ExpandedInventory rowData={rowData} />}
          id="stockInventoryTable"
          className={styles.stockInventoryTable}
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

        {activePurchaseOrder.id && activePurchaseOrder.id !== -1 && (
          <Table
            renderLoading={() => isLoadingInventoryTableResults && null}
            renderEmpty={() => <div />}
            affixHorizontalScrollbar={0}
            // Dont display old data when loading
            data={!isLoadingInventoryTableResults ? displayInventoryResults : []}
            hover={false}
            autoHeight
            rowHeight={90}
            headerHeight={60}
            rowExpandedHeight={800}
            virtualized
            id="deleteTable"
            className={styles.deleteTable}
          >
            {/* Empty first row to deal with styling */}
            <Table.Column width={0}>
              <Table.HeaderCell />
              <Table.Cell />
            </Table.Column>

            {/* Delete Cell */}
            <Table.Column verticalAlign="middle" align="center" width={30}>
              <Table.HeaderCell />
              <DeleteCell
                dataKey={'merchant_listing_id'}
                handleDelete={handleDeleteSku}
                deleteMessage="Delete SKU?"
              />
            </Table.Column>
          </Table>
        )}
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
    fetchPurchaseOrders: () => dispatch(fetchPurchaseOrders()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InventoryTable);
