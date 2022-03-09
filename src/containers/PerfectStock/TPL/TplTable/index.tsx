import React from 'react';
import { Table } from 'rsuite';
import { connect } from 'react-redux';

/* Styling */
import 'rsuite/dist/styles/rsuite-default.css';
import './globals.scss';
import styles from './index.module.scss';

/* Actions */
import { fetchTplSkuData } from '../../../../actions/PerfectStock/Tpl';

/* Components */
import HeaderSortCell from '../../../../components/NewTable/HeaderSortCell';
import Placeholder from '../../../../components/Placeholder';
import MultipleStatBox from './MultipleStatBox';
import ProductInformation from './ProductInformation';
import SalesPrediction from './SalesPrediction';
import InventoryThreshold from './InventoryThreshold';

/* Selectors */
import { getIsLoadingTplSkuData, getTplSkuData } from '../../../../selectors/PerfectStock/Tpl';

interface Props {
  // States
  isLoadingTplSkuData: boolean;
  fetchTplSkuData: () => void;
  tplSkuData: any;
}

/* Main component */
const TplTable = (props: Props) => {
  const { fetchTplSkuData, isLoadingTplSkuData, tplSkuData } = props;

  React.useEffect(() => {
    fetchTplSkuData();
  }, []);
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
          data={!isLoadingTplSkuData ? tplSkuData : []}
          hover={false}
          autoHeight
          rowHeight={90}
          headerHeight={55}
          rowKey="id"
          virtualized
          id="tplTable"
        >
          {/* Product Information  */}
          <Table.Column minWidth={400} verticalAlign="middle" fixed align="center" flexGrow={4}>
            <Table.HeaderCell>
              <span className={styles.productHeader}>Product</span>
            </Table.HeaderCell>
            <ProductInformation dataKey="productInformation" />
          </Table.Column>

          {/* Expected Sales  */}
          <Table.Column width={112} verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Schedule to\nSend In`}
                dataKey="predictive_sales"
                currentSortColumn={''}
                currentSortType={undefined}
                disableSort
                alignMiddle
              />
            </Table.HeaderCell>
            <SalesPrediction dataKey="predictive_sales" />
          </Table.Column>

          {/* Inventory Threshold  */}
          <Table.Column width={112} verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Automate FBA \n Shipping Plan`}
                dataKey="inventory_threshold"
                currentSortColumn={''}
                currentSortType={undefined}
                alignMiddle
                disableSort
              />
            </Table.HeaderCell>
            <InventoryThreshold dataKey="inventory_threshold" />
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
            <InventoryThreshold dataKey="inventory_threshold" />
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
              displayData={[
                {
                  title: 'Total L7D',
                  dataKey: 'fulfillable_fba',
                },
                {
                  title: 'Daily L7D',
                  dataKey: 'daily_l7d',
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
                  dataKey: 'fulfillable_fba',
                },
                {
                  title: 'Shipped',
                  dataKey: 'daily_l7d',
                },
                {
                  title: 'Receiving',
                  dataKey: 'forecast',
                },
                {
                  title: 'Transfer',
                  dataKey: 'forecast',
                },
              ]}
              dataKey="fulfillable_fba"
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

const mapStateToProps = (state: any) => {
  return {
    tplSkuData: getTplSkuData(state),
    isLoadingTplSkuData: getIsLoadingTplSkuData(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchTplSkuData: () => dispatch(fetchTplSkuData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TplTable);
