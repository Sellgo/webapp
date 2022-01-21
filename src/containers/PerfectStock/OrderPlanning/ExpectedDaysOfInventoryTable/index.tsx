import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import 'rsuite/dist/styles/rsuite-default.css';
import './globals.scss';
import styles from './index.module.scss';

/* Components */
import HeaderDateCell from '../../../../components/NewTable/HeaderDateCell';
import StatsCell from '../../../../components/NewTable/StatsCell';

/* Constants */
import {
  UNIT_WIDTH,
  OFFSET_TO_CHART_WIDTH,
} from '../../../../constants/PerfectStock/OrderPlanning';

const HEADER_ROW_HEIGHT = 60;
const ROW_HEIGHT = 60;

/* Main component */
const ExpectedDaysOfInventoryTable = () => {
  const productProjectedSales = [
    {
      product: 'Simple Product 1',
      '2021-1-1': 5,
      '2021-2-1': 5,
      '2021-3-1': 5,
    },
    {
      product: 'Simple Product 2',
      '2021-1-1': 5,
      '2021-2-1': 5,
      '2021-3-1': 5,
    },
  ];
  const headers = productProjectedSales.length > 0 ? Object.keys(productProjectedSales[0]) : [];

  return (
    <>
      <div className={styles.expectedDaysOfInventoryTableWrapper}>
        <Table
          renderEmpty={() => <div />}
          // Dont display old data when loading
          data={productProjectedSales}
          hover={false}
          autoHeight
          rowHeight={HEADER_ROW_HEIGHT}
          headerHeight={ROW_HEIGHT}
          id="expectedDaysOfInventoryTable"
        >
          <Table.Column width={OFFSET_TO_CHART_WIDTH} verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <span className={styles.tableTitle}>EXPECTED DAYS OF INVENTORY</span>
            </Table.HeaderCell>
            <Table.Cell dataKey="product" />
          </Table.Column>

          {/* Render a column for each date from end date to statr date */}
          {productProjectedSales.length > 0 &&
            headers.map((date: string, index: number) => {
              /* If date is not valid */
              if (new Date(date).toDateString() === 'Invalid Date') {
                return null;
              }
              return (
                <Table.Column width={UNIT_WIDTH} verticalAlign="middle" align="center" key={index}>
                  <Table.HeaderCell>
                    <HeaderDateCell title={date} />
                  </Table.HeaderCell>
                  <StatsCell
                    dataKey={date}
                    align="center"
                    specialKpi
                    className={styles.borderedCell}
                  />
                </Table.Column>
              );
            })}
        </Table>
      </div>
    </>
  );
};

export default ExpectedDaysOfInventoryTable;
