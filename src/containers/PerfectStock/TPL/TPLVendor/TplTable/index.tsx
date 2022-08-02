import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import 'rsuite/dist/styles/rsuite-default.css';
import './globals.scss';
import styles from './index.module.scss';

/* Components */
import HeaderSortCell from '../../../../../components/NewTable/HeaderSortCell';
import Placeholder from '../../../../../components/Placeholder';
import MultipleStatBox from './MultipleStatBox';
import ProductInformation from './ProductInformation';
// import ScheduleToSendIn from './ScheduleToSendIn';
// import DaysOfInventory from './DaysOfInventory';
import ExpandedTplTable from './ExpandedTplTable';
import HeaderDateCell from '../../../../../components/NewTable/HeaderDateCell';
import InventoryBarCell from '../../../Inventory/InventoryTable/InventoryBarCell';
import StockOutDate from '../../../Inventory/InventoryTable/StockOutDate';

/* Selectors */
// import SingleStatBox from './SingleStatBox';

interface Props {
  // States
  isLoadingTplSkuData: boolean;
  tplSkuData: any;
  dateHeaders: any;
}

/* Main component */
const TplTable = (props: Props) => {
  const { isLoadingTplSkuData, tplSkuData, dateHeaders } = props;
  const [expandedRowKeys, setExpandedRowkeys] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (tplSkuData && tplSkuData.length > 0) {
      const tempExpandedRows: any = [];
      tplSkuData.forEach((data: any) => {
        tempExpandedRows.push(data.sku);
      });
      setExpandedRowkeys([...tempExpandedRows]);
    }
  }, [tplSkuData]);

  const displayTplSkuDataResults = tplSkuData.map((rowData: any) => {
    return {
      ...rowData,
      ...rowData.fba_inventories,
    };
  });
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
          data={!isLoadingTplSkuData ? displayTplSkuDataResults : []}
          hover={false}
          autoHeight
          rowHeight={90}
          headerHeight={70}
          rowKey="sku"
          virtualized
          id="tplTable"
          rowExpandedHeight={150}
          expandedRowKeys={expandedRowKeys}
          renderRowExpanded={(rowData: any) => (
            <ExpandedTplTable rowData={rowData} isLoadingTplSkuData={isLoadingTplSkuData} />
          )}
        >
          {/* Product Information  */}
          <Table.Column minWidth={300} verticalAlign="middle" fixed align="center" flexGrow={4}>
            <Table.HeaderCell>
              <span className={styles.productHeader}>Product</span>
            </Table.HeaderCell>
            <ProductInformation dataKey="productInformation" showProductMetaDetailWrapper={false} />
          </Table.Column>

          {/* Expected Sales  */}
          <Table.Column width={112} verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Days Until\nStock Out`}
                dataKey="days_until_so"
                currentSortColumn={''}
                currentSortType={undefined}
                disableSort
                alignMiddle
              />
            </Table.HeaderCell>
            <StockOutDate dataKey="days_until_so" />
          </Table.Column>
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
              columnHeight={90}
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

          <Table.Column width={80} verticalAlign="middle" align="center">
            <Table.HeaderCell> </Table.HeaderCell>
            <Table.Cell>
              <div className={styles.gasolineLabels}>
                <p>
                  Fulfillment <br /> Qty
                </p>
                <p>
                  Restock <br /> Limit
                </p>
                <p>3PL Limit</p>
              </div>
            </Table.Cell>
          </Table.Column>
          {/* Sales  */}
          {dateHeaders.map((date: string, index: number) => {
            return (
              <Table.Column width={43} verticalAlign="top" align="center" key={index}>
                <Table.HeaderCell>
                  <HeaderDateCell title={date} />
                </Table.HeaderCell>
                <InventoryBarCell
                  columnHeight={90}
                  dataKey={date}
                  key={index}
                  isShowingDaysUntilStockout={false}
                  showTpl={true}
                />
              </Table.Column>
            );
          })}
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

export default TplTable;
