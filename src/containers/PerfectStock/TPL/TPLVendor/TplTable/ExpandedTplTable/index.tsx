import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import 'rsuite/dist/styles/rsuite-default.css';
import './globals.scss';
import styles from './index.module.scss';

/* Components */
import HeaderSortCell from '../../../../../../components/NewTable/HeaderSortCell';
import Placeholder from '../../../../../../components/Placeholder';
import MultipleStatBox from '../MultipleStatBox';
// import ProductInformation from '../ProductInformation';
import ScheduleToSendIn from '../ScheduleToSendIn';
import DaysOfInventory from '../DaysOfInventory';

/* Selectors */
import SingleStatBox from '../SingleStatBox';

interface Props {
  // States
  isLoadingTplSkuData: boolean;
  rowData: any;
}

/* Main component */
const ExpandedTplTable = (props: Props) => {
  const { isLoadingTplSkuData, rowData } = props;
  console.log('expanded table view render', rowData);
  return (
    <>
      <section className={styles.productDatabaseWrapper}>
        <Table
          renderLoading={() =>
            isLoadingTplSkuData && <Placeholder numberParagraphs={2} numberRows={3} isGrey />
          }
          renderEmpty={() => <div />}
          affixHorizontalScrollbar={0}
          // Dont display old data when loading
          data={!isLoadingTplSkuData ? rowData : []}
          hover={false}
          autoHeight
          rowHeight={90}
          headerHeight={65}
          rowKey="id"
          virtualized
          id="expandedTplTable"
        >
          {/* Product Information  */}
          <Table.Column minWidth={400} verticalAlign="middle" fixed align="center" flexGrow={4} />

          {/* Expected Sales  */}
          <Table.Column width={112} verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Schedule to\nSend In`}
                dataKey="interval"
                currentSortColumn={''}
                currentSortType={undefined}
                disableSort
                alignMiddle
              />
            </Table.HeaderCell>
            <ScheduleToSendIn dataKey="interval" />
          </Table.Column>

          <Table.Column width={112} verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Days of Inventory`}
                dataKey="inventory_threshold"
                currentSortColumn={''}
                currentSortType={undefined}
                alignMiddle
                disableSort
              />
            </Table.HeaderCell>
            <DaysOfInventory dataKey="inventory_threshold" />
          </Table.Column>
          {/* Sales  */}
          <Table.Column width={112} verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Sales`}
                dataKey="sales"
                currentSortColumn={''}
                currentSortType={undefined}
                alignMiddle
                disableSort
              />
            </Table.HeaderCell>
            <MultipleStatBox
              isFloat
              displayData={[
                {
                  title: 'Total LND',
                  dataKey: 'total_lnd',
                },
                {
                  title: 'Daily LND',
                  dataKey: 'avg_lnd',
                },
                {
                  title: 'Forecast',
                  dataKey: 'forecast',
                },
              ]}
              dataKey="fulfillable_fba"
            />
          </Table.Column>

          {/* FBA Inbound  */}
          <Table.Column width={112} verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`FBA Inbound`}
                dataKey="sales"
                currentSortColumn={''}
                currentSortType={undefined}
                alignMiddle
                disableSort
              />
            </Table.HeaderCell>
            <MultipleStatBox
              displayData={[
                {
                  title: 'Working',
                  dataKey: 'working',
                },
                {
                  title: 'Shipped',
                  dataKey: 'shipped',
                },
                {
                  title: 'Receiving',
                  dataKey: 'receiving',
                },
                {
                  title: 'Transfer',
                  dataKey: 'transfer',
                },
              ]}
              dataKey="working"
            />
          </Table.Column>

          {/* FBA Inbound  */}
          <Table.Column width={112} verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`FBA Fulfillable\nInventory`}
                dataKey="fulfillable"
                currentSortColumn={''}
                currentSortType={undefined}
                alignMiddle
                disableSort
              />
            </Table.HeaderCell>
            <SingleStatBox dataKey="fulfillable" highlightZero />
          </Table.Column>

          {/* Days until FBA Inbound  */}
          <Table.Column width={112} verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Days of Fulfillable\nInventory`}
                dataKey="days_until_so_fulfillable"
                currentSortColumn={''}
                currentSortType={undefined}
                alignMiddle
                disableSort
              />
            </Table.HeaderCell>
            <SingleStatBox dataKey="days_until_so_fulfillable" highlightZero />
          </Table.Column>

          {/* Days until FBA Inbound  */}
          <Table.Column width={112} verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Total \n3PL Stock`}
                dataKey="tpl_quantity"
                currentSortColumn={''}
                currentSortType={undefined}
                alignMiddle
                disableSort
              />
            </Table.HeaderCell>
            <SingleStatBox dataKey="tpl_quantity" />
          </Table.Column>

          <Table.Column width={112} verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Shipment\nQuantity`}
                dataKey="send_quantity_avg"
                currentSortColumn={''}
                currentSortType={undefined}
                alignMiddle
                disableSort
              />
            </Table.HeaderCell>
            <MultipleStatBox
              displayData={[
                {
                  title: 'Using LND',
                  dataKey: 'send_quantity_lnd',
                },
                {
                  title: 'Using Pred',
                  dataKey: 'send_quantity_predictive',
                },
                {
                  title: 'Avg',
                  dataKey: 'send_quantity_avg',
                },
              ]}
              dataKey="working"
            />
          </Table.Column>

          <Table.Column width={112} verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Carton`}
                dataKey="total_carton"
                currentSortColumn={''}
                currentSortType={undefined}
                alignMiddle
                disableSort
              />
            </Table.HeaderCell>
            <MultipleStatBox
              displayData={[
                {
                  title: 'Units/ Carton',
                  dataKey: 'carton_count',
                },
                {
                  title: 'Carton #',
                  dataKey: 'total_carton',
                },
              ]}
              dataKey="total_carton"
            />
          </Table.Column>
        </Table>
        {/* {productsDatabasePaginationInfo && productsDatabasePaginationInfo.total_pages > 0 && (
          <footer className={styles.productDatabasePagination}>
            <TablePagination
              totalPages={productsDatabasePaginationInfo.total_pages}
              currentPage={productsDatabasePaginationInfo.current_page}
              showSiblingsCount={3}
              onPageChange={handleChangePage}
            />
          </footer>
        )} */}
      </section>
    </>
  );
};

export default ExpandedTplTable;
