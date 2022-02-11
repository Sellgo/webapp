import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import 'rsuite/dist/styles/rsuite-default.css';
import './globals.scss';
import styles from './index.module.scss';

/* Components */
import HeaderDateCell from '../../../../../components/NewTable/HeaderDateCell';
import StatsCell from '../../../../../components/NewTable/StatsCell';
import SelectionFilter from '../../../../../components/FormFilters/SelectionFilter';
import TooltipWrapper from '../../../../../components/TooltipWrapper';

/* Constants */
import {
  TIME_SETTINGS_OPTIONS,
  UNIT_WIDTH,
} from '../../../../../constants/PerfectStock/OrderPlanning';

/* Assets */
import { ReactComponent as ExpandedCellIcon } from '../../../../../assets/images/expandCell.svg';
import { ReactComponent as DeExpandedCellIcon } from '../../../../../assets/images/deExpandCell.svg';

interface Props {
  productProjectedSales: any[];
  timeSettings: string;
  setTimeSettings: (timeSettings: string) => void;
  showTrends: boolean;
  setShowTrends: (showTrends: boolean) => void;
}

const HEADER_ROW_HEIGHT = 60;
const ROW_HEIGHT = 60;

/* Main component */
const ProductSalesTable = (props: Props) => {
  const { productProjectedSales, timeSettings, setTimeSettings, showTrends, setShowTrends } = props;
  const headers = productProjectedSales.length > 0 ? Object.keys(productProjectedSales[0]) : [];

  /* Custom scroll logic */
  const handleCustomTableScroll = (e: any) => {
    e.preventDefault();
    const horizontalScrollRef = document.querySelector('#salesProjectionTable #productSalesTable');
    if (horizontalScrollRef) {
      const newScrollX = horizontalScrollRef.scrollLeft + e.deltaX + e.deltaY;
      horizontalScrollRef.scrollTo({
        left: newScrollX,
        behavior: 'auto',
      });
    }
  };

  /* Added for custom scroll logic */
  React.useEffect(() => {
    const table = document.querySelector<HTMLElement>('#salesProjectionTable #productSalesTable');

    const bodyWheelArea = document.querySelector<HTMLElement>(
      '#salesProjectionTable #productSalesTable .rs-table-body-wheel-area'
    );

    const bodyWrapperArea = document.querySelector<HTMLElement>(
      '#salesProjectionTable #productSalesTable .rs-table-body-row-wrapper'
    );

    if (table && bodyWheelArea && bodyWrapperArea) {
      table.addEventListener('wheel', handleCustomTableScroll);
      const tableWidth =
        productProjectedSales.length > 0
          ? Object.keys(productProjectedSales[0]).length * UNIT_WIDTH
          : 0;

      /* Set wheel area and wrapper area to equal to full width of table columns for custom scrolling */
      bodyWheelArea.style.width = `${tableWidth}px`;
      bodyWrapperArea.style.width = `${tableWidth}px`;
    }

    return () => {
      // run cleanup
      if (table) {
        table.removeEventListener('wheel', handleCustomTableScroll);
      }
    };
  }, [productProjectedSales]);

  return (
    <>
      <div className={styles.productSalesTableWrapper}>
        <div className={styles.tableTitles}>
          <div style={{ height: HEADER_ROW_HEIGHT }} className={styles.timeSettings}>
            <SelectionFilter
              filterOptions={TIME_SETTINGS_OPTIONS}
              value={timeSettings}
              handleChange={value => setTimeSettings(value)}
              placeholder=""
            />
          </div>
          <p style={{ height: ROW_HEIGHT }} className={styles.salesRowTitle}>
            <button className={styles.expandButton} onClick={() => setShowTrends(!showTrends)}>
              {showTrends ? <DeExpandedCellIcon /> : <ExpandedCellIcon />}
            </button>
            <TooltipWrapper tooltipKey="Expected Weekly Sales">
              Expected Weekly Sales
            </TooltipWrapper>
          </p>
          {showTrends && (
            <>
              <p style={{ height: ROW_HEIGHT }}>Seasonal Trends </p>
              {/* <p style={{height: ROW_HEIGHT}}>Deep Discount Sales </p>
              <p style={{height: ROW_HEIGHT}}>Include MCF Sales </p>
              <p style={{height: ROW_HEIGHT}}>Additional Sales Growth </p> */}
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
          rowExpandedHeight={800}
          rowKey="id"
          virtualized
          id="productSalesTable"
          className={styles.productSalesTable}
        >
          {/* Render a column for each date from end date to statr date */}
          {productProjectedSales.length > 0 &&
            headers.map((date: string, index: number) => {
              return (
                <Table.Column width={UNIT_WIDTH} verticalAlign="middle" align="center" key={index}>
                  <Table.HeaderCell>
                    <HeaderDateCell title={date} />
                  </Table.HeaderCell>
                  <StatsCell dataKey={date} align="center" specialKpi />
                </Table.Column>
              );
            })}
        </Table>
      </div>
    </>
  );
};

export default ProductSalesTable;
