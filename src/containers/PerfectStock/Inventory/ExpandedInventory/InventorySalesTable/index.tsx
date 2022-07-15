import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import 'rsuite/dist/styles/rsuite-default.css';
import './globals.scss';
import styles from './index.module.scss';

/* Components */
import HeaderDateCell from '../../../../../components/NewTable/HeaderDateCell';
import StatsCell from '../../../../../components/NewTable/StatsCell';
import TooltipWrapper from '../../../../../components/TooltipWrapper';

/* Constants */
import {
  UNIT_WIDTH,
  GANTT_ORDERS_WIDTH,
} from '../../../../../constants/PerfectStock/OrderPlanning';

/* Assets */
import { ReactComponent as ExpandedCellIcon } from '../../../../../assets/images/expandCell.svg';
import { ReactComponent as DeExpandedCellIcon } from '../../../../../assets/images/deExpandCell.svg';

interface Props {
  productProjectedSales: any[];
  showTrends: boolean;
  setShowTrends: (showTrends: boolean) => void;
}

const HEADER_ROW_HEIGHT = 60;
const ROW_HEIGHT = 60;

/* Main component */
const InventorySalesTable = (props: Props) => {
  const { productProjectedSales, showTrends, setShowTrends } = props;
  const headers = productProjectedSales.length > 0 ? Object.keys(productProjectedSales[0]) : [];

  /* Added for dynamic table width */
  React.useEffect(() => {
    const table = document.querySelector<HTMLElement>('#stockInventoryTable #productSalesTable');

    const bodyWheelArea = document.querySelector<HTMLElement>(
      '#stockInventoryTable #productSalesTable .rs-table-body-wheel-area'
    );

    const bodyWrapperArea = document.querySelector<HTMLElement>(
      '#stockInventoryTable #productSalesTable .rs-table-body-row-wrapper'
    );

    if (table && bodyWheelArea && bodyWrapperArea) {
      const tableWidth =
        productProjectedSales.length > 0
          ? Object.keys(productProjectedSales[0]).length * UNIT_WIDTH
          : 0;

      /* Set wheel area and wrapper area to equal to full width of table columns for custom scrolling */
      bodyWheelArea.style.width = `${tableWidth}px`;
      bodyWrapperArea.style.width = `${tableWidth}px`;
    }
  }, [productProjectedSales]);

  return (
    <>
      <div className={styles.productSalesTableWrapper}>
        <div
          className={styles.tableTitles}
          style={{
            width: GANTT_ORDERS_WIDTH,
            minWidth: GANTT_ORDERS_WIDTH,
          }}
        >
          <p
            style={{ height: ROW_HEIGHT, marginTop: HEADER_ROW_HEIGHT }}
            className={styles.salesRowTitle}
          >
            <button className={styles.expandButton} onClick={() => setShowTrends(!showTrends)}>
              {showTrends ? <DeExpandedCellIcon /> : <ExpandedCellIcon />}
            </button>
            <TooltipWrapper tooltipKey="Expected Inventory">Expected Inventory</TooltipWrapper>
          </p>
          {showTrends && (
            <>
              <p style={{ height: ROW_HEIGHT }}>Days Until Stockout</p>
              <p style={{ height: ROW_HEIGHT }}>Order Estimate </p>
            </>
          )}
        </div>
        <Table
          renderEmpty={() => <div />}
          affixHorizontalScrollbar={0}
          // Dont display old data when loading
          data={productProjectedSales}
          hover={false}
          autoHeight
          rowHeight={HEADER_ROW_HEIGHT}
          headerHeight={ROW_HEIGHT}
          rowExpandedHeight={500}
          rowKey="id"
          virtualized
          id="productSalesTable"
          className={styles.productSalesTablee}
        >
          {/* Render a column for each date from end date to statr date */}
          {productProjectedSales.length > 0 &&
            headers.map((date: string, index: number) => {
              return (
                <Table.Column width={UNIT_WIDTH} verticalAlign="middle" align="center" key={index}>
                  <Table.HeaderCell>
                    <HeaderDateCell title={date} />
                  </Table.HeaderCell>
                  <StatsCell dataKey={date} align="center" isOrderPlanning={true} specialKpi />
                </Table.Column>
              );
            })}
        </Table>
      </div>
    </>
  );
};

export default InventorySalesTable;
