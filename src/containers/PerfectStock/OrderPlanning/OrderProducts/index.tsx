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

/* Constants */
import { OFFSET_TO_CHART_WIDTH } from '../../../../constants/PerfectStock/OrderPlanning';

interface Props {
  className?: string;
}

const DATA = [
  {
    product: 'Product 1',
    moq: 1000,
    cartons: 1000,
    cost_per_unit: 7,
  },
];

const OrderProducts = (props: Props) => {
  const { className } = props;

  return (
    <div className={`${styles.orderProducts} ${className}`}>
      <Table
        renderLoading={() => false && <Placeholder numberParagraphs={2} numberRows={3} isGrey />}
        renderEmpty={() => <div />}
        data={DATA}
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
          <Table.Cell dataKey="product" />
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

        {/* Stock out date info  */}
        <Table.Column width={110} verticalAlign="top" align="center">
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Cartons`}
              dataKey="cartons"
              currentSortColumn={''}
              currentSortType={undefined}
              alignMiddle
              disableSort
            />
          </Table.HeaderCell>
          <StatsCell
            dataKey="cartons"
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

export default OrderProducts;
