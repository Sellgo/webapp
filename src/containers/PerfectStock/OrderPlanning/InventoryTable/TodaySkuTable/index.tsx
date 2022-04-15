import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';
import 'rsuite/dist/styles/rsuite-default.css';
import './globals.scss';

/* Components */
import HeaderSortCell from '../../../../../components/NewTable/HeaderSortCell';
import SkuStatCell from './SkuStatCell';
import Placeholder from '../../../../../components/Placeholder';
import ProductInformation from '../ProductInformation';
import QuantityToOrder from '../QuantityToOrder';
import EditProductRow from '../EditProductRow';

/* Constants */
import { OFFSET_TO_CHART_WIDTH } from '../../../../../constants/PerfectStock/OrderPlanning';

/* Types */
import { PurchaseOrder } from '../../../../../interfaces/PerfectStock/OrderPlanning';

interface Props {
  className?: string;
  data: any;
  sortColumn: string;
  sortType: 'asc' | 'desc' | undefined;
  handleSortColumn: (sortColumn: string, sortType: 'asc' | 'desc' | undefined) => void;
  activePurchaseOrder: PurchaseOrder;
  isLoadingInventoryTableResults: boolean;
}

const TodaySkuTable = (props: Props) => {
  const {
    isLoadingInventoryTableResults,
    data,
    sortColumn,
    sortType,
    handleSortColumn,
    activePurchaseOrder,
  } = props;

  const inventoryResultsIds =
    activePurchaseOrder.id !== -1 ? data.map((rowData: any) => rowData.sku) : [];

  return (
    <Table
      renderLoading={() =>
        isLoadingInventoryTableResults && <Placeholder numberParagraphs={2} numberRows={3} isGrey />
      }
      renderEmpty={() => <div />}
      data={isLoadingInventoryTableResults ? [] : data}
      hover={false}
      autoHeight
      rowHeight={90}
      headerHeight={60}
      rowExpandedHeight={50}
      rowKey="sku"
      className={styles.inventorySkuStatusTable}
      id="todaySkuTable"
      onSortColumn={handleSortColumn}
      expandedRowKeys={inventoryResultsIds}
      renderRowExpanded={(rowData: any) => (
        <EditProductRow
          hideDaysUntilStockout={false}
          rowData={rowData}
          orderId={activePurchaseOrder.id}
        />
      )}
    >
      <Table.Column
        /* Calculate width to chart dates to align all the dates, minus 30 for offset from expansion cell */
        width={OFFSET_TO_CHART_WIDTH - 112}
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
      >
        <Table.HeaderCell>
          <HeaderSortCell
            title={`Quantity To Order`}
            dataKey="quantity"
            currentSortColumn={sortColumn}
            currentSortType={sortType}
            alignMiddle
            disableSort
          />
        </Table.HeaderCell>
        <QuantityToOrder dataKey="quantity" orderId={activePurchaseOrder.id} />
      </Table.Column>

      {/* Stock out date info  */}
      <Table.Column width={112} verticalAlign="top" align="center">
        <Table.HeaderCell>
          <HeaderSortCell
            title={`In\nProduction`}
            dataKey="in_production"
            currentSortColumn={''}
            currentSortType={undefined}
            alignMiddle
            disableSort
          />
        </Table.HeaderCell>
        <SkuStatCell dataKey="in_production" />
      </Table.Column>

      {/* Stock out date info  */}
      <Table.Column width={112} verticalAlign="top" align="center">
        <Table.HeaderCell>
          <HeaderSortCell
            title={`En Route`}
            dataKey="en_route"
            currentSortColumn={''}
            currentSortType={undefined}
            alignMiddle
            disableSort
          />
        </Table.HeaderCell>
        <SkuStatCell dataKey="en_route" />
      </Table.Column>

      <Table.Column width={112} verticalAlign="top" align="center">
        <Table.HeaderCell>
          <HeaderSortCell
            title={`Incoming\nInventory`}
            dataKey="incoming_inventory"
            currentSortColumn={''}
            currentSortType={undefined}
            alignMiddle
            disableSort
          />
        </Table.HeaderCell>
        <SkuStatCell dataKey="incoming_inventory" />
      </Table.Column>

      <Table.Column width={112} verticalAlign="top" align="center">
        <Table.HeaderCell>
          <HeaderSortCell
            title={`3PL\nInventory`}
            dataKey="tpl_inventory"
            currentSortColumn={''}
            currentSortType={undefined}
            alignMiddle
            disableSort
          />
        </Table.HeaderCell>
        <SkuStatCell dataKey="tpl_inventory" />
      </Table.Column>

      <Table.Column width={112} verticalAlign="top" align="center">
        <Table.HeaderCell>
          <HeaderSortCell
            title={`Inbound\nto FBA`}
            dataKey="inbound_fba"
            currentSortColumn={''}
            currentSortType={undefined}
            alignMiddle
            disableSort
          />
        </Table.HeaderCell>
        <SkuStatCell dataKey="inbound_fba" />
      </Table.Column>

      <Table.Column width={112} verticalAlign="top" align="center">
        <Table.HeaderCell>
          <HeaderSortCell
            title={`Reserved\nInventory`}
            dataKey="reserved_fba"
            currentSortColumn={''}
            currentSortType={undefined}
            alignMiddle
            disableSort
          />
        </Table.HeaderCell>
        <SkuStatCell dataKey="reserved_fba" />
      </Table.Column>

      <Table.Column width={112} verticalAlign="top" align="center">
        <Table.HeaderCell>
          <HeaderSortCell
            title={`Fulfillable\nInventory`}
            dataKey="fulfillable_fba"
            currentSortColumn={''}
            currentSortType={undefined}
            alignMiddle
            disableSort
          />
        </Table.HeaderCell>
        <SkuStatCell dataKey="fulfillable_fba" />
      </Table.Column>

      <Table.Column width={112} verticalAlign="top" align="center">
        <Table.HeaderCell>
          <HeaderSortCell
            title={`Total FBA\nInventory`}
            dataKey="total_fba_inventory"
            currentSortColumn={''}
            currentSortType={undefined}
            alignMiddle
            disableSort
          />
        </Table.HeaderCell>
        <SkuStatCell dataKey="total_fba_inventory" />
      </Table.Column>

      <Table.Column width={112} verticalAlign="top" align="center">
        <Table.HeaderCell>
          <HeaderSortCell
            title={`Total Domestic\nInventory`}
            dataKey="total_domestic_inventory"
            currentSortColumn={''}
            currentSortType={undefined}
            alignMiddle
            disableSort
          />
        </Table.HeaderCell>
        <SkuStatCell dataKey="total_domestic_inventory" />
      </Table.Column>

      <Table.Column width={112} verticalAlign="top" align="center">
        <Table.HeaderCell>
          <HeaderSortCell
            title={`Total Expected\nInventory`}
            dataKey="total_expected_inventory"
            currentSortColumn={''}
            currentSortType={undefined}
            alignMiddle
            disableSort
          />
        </Table.HeaderCell>
        <SkuStatCell dataKey="total_expected_inventory" />
      </Table.Column>
    </Table>
  );
};

export default TodaySkuTable;
