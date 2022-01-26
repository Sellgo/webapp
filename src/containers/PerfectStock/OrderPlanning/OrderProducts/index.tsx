import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';
import 'rsuite/dist/styles/rsuite-default.css';
import './globals.scss';

/* Components */
import HeaderSortCell from '../../../../components/NewTable/HeaderSortCell';
import StatsCell from '../../../../components/NewTable/StatsCell';
import Placeholder from '../../../../components/Placeholder';
import ProductInformation from './ProductInformation/';
import UnitsToOrder from './UnitsToOrder';

/* Constants */
import { OFFSET_TO_CHART_WIDTH } from '../../../../constants/PerfectStock/OrderPlanning';
import { getDraftOrderInformation } from '../../../../selectors/PerfectStock/OrderPlanning';
import { connect } from 'react-redux';
import { DraftOrderInformation } from '../../../../interfaces/PerfectStock/OrderPlanning';

interface Props {
  className?: string;
  draftOrderInformation: DraftOrderInformation;
}

const OrderProducts = (props: Props) => {
  const { className, draftOrderInformation } = props;

  return (
    <div className={`${styles.orderProducts} ${className}`}>
      <Table
        renderLoading={() => false && <Placeholder numberParagraphs={2} numberRows={3} isGrey />}
        renderEmpty={() => <div />}
        data={draftOrderInformation.merchant_listings}
        hover={false}
        autoHeight
        rowHeight={90}
        headerHeight={60}
        rowKey="id"
        className={styles.inventorySkuStatusTable}
        id="orderProductsTable"
      >
        <Table.Column width={OFFSET_TO_CHART_WIDTH} verticalAlign="middle" align="center">
          <Table.HeaderCell>Product</Table.HeaderCell>
          <ProductInformation dataKey="title" />
        </Table.Column>

        {/* Stock out date info  */}
        <Table.Column width={110} verticalAlign="top" align="center">
          <Table.HeaderCell>
            <HeaderSortCell
              title={`MOQ`}
              dataKey="moq"
              currentSortColumn={''}
              currentSortType={undefined}
              alignMiddle
              disableSort
            />
          </Table.HeaderCell>
          <StatsCell dataKey="moq" className={styles.borderedStatCell} align="center" specialKpi />
        </Table.Column>

        {/* Expected Sales  */}
        <Table.Column width={300} verticalAlign="middle" align="center">
          <Table.HeaderCell>
            <HeaderSortCell
              title="Expected Sales"
              dataKey="predictive_sales"
              currentSortColumn={''}
              currentSortType={undefined}
              disableSort
              alignMiddle
            />
          </Table.HeaderCell>
          <UnitsToOrder dataKey="predictive_sales" />
        </Table.Column>

        {/* Stock out date info  */}
        <Table.Column width={110} verticalAlign="top" align="center">
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Cartons`}
              dataKey="carton_count"
              currentSortColumn={''}
              currentSortType={undefined}
              alignMiddle
              disableSort
            />
          </Table.HeaderCell>
          <StatsCell
            dataKey="carton_count"
            className={styles.borderedStatCell}
            align="center"
            specialKpi
          />
        </Table.Column>

        {/* Stock out date info  */}
        <Table.Column width={110} verticalAlign="top" align="center">
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Cost per unit`}
              dataKey="cost_per_unit"
              currentSortColumn={''}
              currentSortType={undefined}
              alignMiddle
              disableSort
            />
          </Table.HeaderCell>
          <StatsCell
            dataKey="cost_per_unit"
            className={styles.borderedStatCell}
            prependWith="$"
            specialKpi
            align="center"
          />
        </Table.Column>
      </Table>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    draftOrderInformation: getDraftOrderInformation(state),
  };
};

export default connect(mapStateToProps)(OrderProducts);
