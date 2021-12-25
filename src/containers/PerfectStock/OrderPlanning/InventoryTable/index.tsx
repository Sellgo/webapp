import React from 'react';
import { Table } from 'rsuite';
import { connect } from 'react-redux';

/* Styling */
import 'rsuite/dist/styles/rsuite-default.css';
import './globals.scss';
import styles from './index.module.scss';

/* Actions */
import { fetchSalesProjection } from '../../../../actions/PerfectStock/SalesProjection';

/* Interfaces */
import { SalesProjectionPayload } from '../../../../interfaces/PerfectStock/SalesProjection';
import { DateRange } from '../../../../interfaces/PerfectStock/OrderPlanning';

/* Components */
import Placeholder from '../../../../components/Placeholder';
import HeaderDateCell from '../../../../components/NewTable/HeaderDateCell';
import ProductInformation from './ProductInformation';
import StockOutDate from './StockOutDate';
import InventoryBarCell from './InventoryBarCell';
import { ReactComponent as ExclaimationIcon } from '../../../../assets/images/exclamation-triangle-solid.svg';

/* Selectors */
import {
  getDateRange,
  getInventoryTableResults,
  getIsLoadingInventoryTableResults,
  getTimeSetting,
} from '../../../../selectors/PerfectStock/OrderPlanning';

/* Constants */
import {
  TimeSetting,
  TIME_SETTING,
  OFFSET_TO_CHART_WIDTH,
  UNIT_WIDTH,
} from '../../../../constants/PerfectStock/OrderPlanning';
import HeaderSortCell from '../../../../components/NewTable/HeaderSortCell';
import { fetchInventoryTable } from '../../../../actions/PerfectStock/OrderPlanning';

interface Props {
  // States
  dateRange: DateRange;
  timeSetting: TimeSetting;
  fetchInventoryTable: () => void;
  inventoryTableResults: any[];
  isLoadingInventoryTableResults: boolean;
}

/* Main component */
const InventoryTable = (props: Props) => {
  const {
    dateRange,
    timeSetting,
    fetchInventoryTable,
    inventoryTableResults,
    isLoadingInventoryTableResults,
  } = props;

  const [sortColumn, setSortColumn] = React.useState<string>('');
  const [sortType, setSortType] = React.useState<'asc' | 'desc' | undefined>(undefined);
  const handleSortColumn = (sortColumn: string, sortType: 'asc' | 'desc' | undefined) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
    fetchSalesProjection({
      sort: sortColumn,
      sortDir: sortType,
    });
  };

  /* Generate headers by producing a date array from start date to end date */
  const [headers, setHeaders] = React.useState<any>([]);
  const generateHeaders = (startDate: Date, endDate: Date) => {
    const DIFF = timeSetting === TIME_SETTING.DAY ? 1 : 7;
    if (startDate && endDate) {
      const dateArray = [];
      let currentDate = startDate;
      while (currentDate <= endDate) {
        currentDate = new Date(currentDate.setDate(currentDate.getDate() + DIFF));
        const dateString = `${currentDate.getFullYear()}-${currentDate.getMonth() +
          1}-${currentDate.getDate()}`;
        dateArray.push(dateString);
      }
      setHeaders(dateArray);
    } else {
      return [];
    }
  };

  /* Detect if dateRange changed */
  React.useEffect(() => {
    generateHeaders(new Date(dateRange.startDate), new Date(dateRange.endDate));
    fetchInventoryTable();
  }, [dateRange.startDate, dateRange.endDate, timeSetting]);

  return (
    <>
      <section className={styles.productDatabaseWrapper}>
        <Table
          renderLoading={() =>
            isLoadingInventoryTableResults && (
              <Placeholder numberParagraphs={2} numberRows={3} isGrey />
            )
          }
          renderEmpty={() => <div />}
          affixHorizontalScrollbar={0}
          // Dont display old data when loading
          data={!isLoadingInventoryTableResults ? inventoryTableResults : []}
          hover={true}
          autoHeight
          rowHeight={70}
          headerHeight={55}
          rowExpandedHeight={800}
          onSortColumn={handleSortColumn}
          rowKey="id"
          virtualized
          id="stockInventoryTable"
        >
          {/* Product Information  */}
          <Table.Column
            width={OFFSET_TO_CHART_WIDTH * (2 / 3)}
            verticalAlign="middle"
            align="center"
          >
            <Table.HeaderCell>Product</Table.HeaderCell>
            <ProductInformation dataKey="productInformation" />
          </Table.Column>

          {/* Stock out date info  */}
          <Table.Column
            width={OFFSET_TO_CHART_WIDTH * (1 / 3)}
            verticalAlign="middle"
            align="center"
          >
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

          {/* Render a column for each date from end date to statr date */}
          {headers.map((date: string, index: number) => {
            return (
              <Table.Column width={UNIT_WIDTH} verticalAlign="middle" align="center" key={index}>
                <Table.HeaderCell>
                  <HeaderDateCell title={date} />
                </Table.HeaderCell>
                <InventoryBarCell dataKey={date} key={index} />
              </Table.Column>
            );
          })}
        </Table>
      </section>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    dateRange: getDateRange(state),
    timeSetting: getTimeSetting(state),
    inventoryTableResults: getInventoryTableResults(state),
    isLoadingInventoryTableResults: getIsLoadingInventoryTableResults(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSalesProjection: (payload: SalesProjectionPayload) =>
      dispatch(fetchSalesProjection(payload)),
    fetchInventoryTable: () => dispatch(fetchInventoryTable()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InventoryTable);
