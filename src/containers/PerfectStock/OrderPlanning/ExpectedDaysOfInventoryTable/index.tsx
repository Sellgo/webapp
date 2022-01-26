import React from 'react';
import { Table } from 'rsuite';
import { connect } from 'react-redux';

/* Styling */
import 'rsuite/dist/styles/rsuite-default.css';
import './globals.scss';
import styles from './index.module.scss';

/* Components */
import StatsCell from '../../../../components/NewTable/StatsCell';
import Placeholder from '../../../../components/Placeholder';

/* Constants */
import {
  UNIT_WIDTH,
  OFFSET_TO_CHART_WIDTH,
  TimeSetting,
} from '../../../../constants/PerfectStock/OrderPlanning';

/* selectors */
import {
  getActiveDraftOrderTemplate,
  getDateRange,
  getDraftOrderInformation,
  getExpectedDaysOfInventory,
  getIsLoadingExpectedDaysOfInventory,
  getPurchaseOrders,
  getTimeSetting,
} from '../../../../selectors/PerfectStock/OrderPlanning';

/* Actions */
import { fetchExpectedDaysOfInventory } from '../../../../actions/PerfectStock/OrderPlanning';

/* types */
import {
  DateRange,
  DraftOrderInformation,
  DraftOrderTemplate,
} from '../../../../interfaces/PerfectStock/OrderPlanning';

const HEADER_ROW_HEIGHT = 40;
const ROW_HEIGHT = 40;

interface Props {
  dateRange: DateRange;
  timeSetting: TimeSetting;
  fetchExpectedDaysOfInventory: () => void;
  draftOrderInformation: DraftOrderInformation;
  activeDraftOrderTemplate: DraftOrderTemplate;
  expectedDaysOfInventory: any[];
  isLoadingExpectedDaysOfInventory: boolean;
  emptySkuContent: React.ReactNode;
  purchaseOrders: any[];
}

const ExpectedDaysOfInventoryTable = (props: Props) => {
  const {
    dateRange,
    timeSetting,
    fetchExpectedDaysOfInventory,
    draftOrderInformation,
    expectedDaysOfInventory,
    isLoadingExpectedDaysOfInventory,
    emptySkuContent,
    activeDraftOrderTemplate,
    purchaseOrders,
  } = props;

  /* Fetch expected days of inventory upon date range change, time setting change, or draft order info changes */
  React.useEffect(() => {
    fetchExpectedDaysOfInventory();
  }, [
    dateRange.startDate,
    dateRange.endDate,
    timeSetting,
    draftOrderInformation.id,
    activeDraftOrderTemplate,
    purchaseOrders,
  ]);
  const headers = expectedDaysOfInventory.length > 0 ? Object.keys(expectedDaysOfInventory[0]) : [];

  return (
    <>
      <div className={styles.expectedDaysOfInventoryTableWrapper}>
        <Table
          renderEmpty={() => !isLoadingExpectedDaysOfInventory && emptySkuContent}
          // Dont display old data when loading
          renderLoading={() =>
            isLoadingExpectedDaysOfInventory && <Placeholder numberParagraphs={1} numberRows={1} />
          }
          data={!isLoadingExpectedDaysOfInventory ? expectedDaysOfInventory : []}
          hover={false}
          autoHeight
          maxHeight={50}
          rowHeight={HEADER_ROW_HEIGHT}
          headerHeight={ROW_HEIGHT}
          id="expectedDaysOfInventoryTable"
        >
          <Table.Column width={OFFSET_TO_CHART_WIDTH - 18} verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <span className={styles.tableTitle}>EXPECTED DAYS OF INVENTORY</span>
            </Table.HeaderCell>
            <Table.Cell dataKey="title" className={styles.titleCell} />
          </Table.Column>

          {/* Render a column for each date from start date to end date */}
          {expectedDaysOfInventory.length > 0 &&
            headers.map((date: string, index: number) => {
              /* If date is not valid */
              if (new Date(date).toDateString() === 'Invalid Date') {
                return null;
              }
              return (
                <Table.Column width={UNIT_WIDTH} verticalAlign="middle" align="center" key={index}>
                  <Table.HeaderCell />
                  <StatsCell
                    dataKey={date}
                    align="center"
                    specialKpi
                    className={styles.borderedCell}
                    showZeroes
                  />
                </Table.Column>
              );
            })}
        </Table>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    dateRange: getDateRange(state),
    timeSetting: getTimeSetting(state),
    draftOrderInformation: getDraftOrderInformation(state),
    activeDraftOrderTemplate: getActiveDraftOrderTemplate(state),
    expectedDaysOfInventory: getExpectedDaysOfInventory(state),
    isLoadingExpectedDaysOfInventory: getIsLoadingExpectedDaysOfInventory(state),
    purchaseOrders: getPurchaseOrders(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchExpectedDaysOfInventory: () => dispatch(fetchExpectedDaysOfInventory()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpectedDaysOfInventoryTable);
