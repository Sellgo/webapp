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
import StockOutDate from '../StockOutDate';
import { ReactComponent as ExclaimationIcon } from '../../../../../assets/images/exclamation-triangle-solid.svg';
import ExpandedInventory from '../../ExpandedInventory';
import ExpansionCell from '../../../../../components/NewTable/ExpansionCell';

/* Constants */
import { OFFSET_TO_CHART_WIDTH } from '../../../../../constants/PerfectStock/OrderPlanning';

interface Props {
  className?: string;
  data: any;
  sortColumn: string;
  sortType: 'asc' | 'desc' | undefined;
  handleSortColumn: (sortColumn: string, sortType: 'asc' | 'desc' | undefined) => void;
  handleExpansion: (rowData: any) => void;
  expandedRowKeys: any;
  isLoadingInventoryTableResults: boolean;
}

const TodaySkuTable = (props: Props) => {
  const {
    isLoadingInventoryTableResults,
    data,
    sortColumn,
    sortType,
    handleSortColumn,
    handleExpansion,
    expandedRowKeys,
  } = props;

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
      rowExpandedHeight={1050}
      rowKey="sku"
      className={styles.inventorySkuStatusTable}
      id="inventoryTodaySkuTable"
      sortColumn={sortColumn}
      sortType={sortType}
      onSortColumn={handleSortColumn}
      expandedRowKeys={expandedRowKeys}
      renderRowExpanded={(rowData: any) => <ExpandedInventory rowData={rowData} />}
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

      <Table.Column width={OFFSET_TO_CHART_WIDTH - 30 - 112} verticalAlign="top" align="center">
        <Table.HeaderCell>
          <span className={styles.productTitle}>Product</span>
        </Table.HeaderCell>
        <ProductInformation dataKey="productInformation" />
      </Table.Column>

      <Table.Column width={112} verticalAlign="top" align="center" sortable>
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
