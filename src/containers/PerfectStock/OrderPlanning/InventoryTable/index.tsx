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
import { TimeSetting, TIME_SETTING } from '../../../../constants/PerfectStock/OrderPlanning';

/* Containers */

/* Components */
import Placeholder from '../../../../components/Placeholder';
import HeaderDateCell from '../../../../components/NewTable/HeaderDateCell';
import { getDateRange, getTimeSetting } from '../../../../selectors/PerfectStock/OrderPlanning';

interface Props {
  // States
  dateRange: DateRange;
  timeSetting: TimeSetting;
}

/* Main component */
const InventoryTable = (props: Props) => {
  const { dateRange, timeSetting } = props;

  const getDateArray = (startDate: Date, endDate: Date) => {
    const DIFF = timeSetting === TIME_SETTING.DAY ? 1 : 7;
    if (startDate && endDate) {
      const dateArray = [];
      let currentDate = startDate;
      while (currentDate <= endDate) {
        currentDate = new Date(currentDate.setDate(currentDate.getDate() + DIFF));
        const dateString = currentDate.toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'numeric',
          year: '2-digit',
        });
        dateArray.push(dateString);
      }
      return dateArray;
    } else {
      return [];
    }
  };

  const headers = getDateArray(new Date(dateRange.startDate), new Date(dateRange.endDate));
  const generateDummyData = () => {
    const data: any = {};
    for (let i = 0; i < headers.length; i++) {
      data[headers[i]] = 840;
    }

    return [data];
  };
  const FAKE_DATA = generateDummyData();

  return (
    <>
      <section className={styles.productDatabaseWrapper}>
        <Table
          renderLoading={() => false && <Placeholder numberParagraphs={2} numberRows={3} isGrey />}
          renderEmpty={() => <div />}
          affixHorizontalScrollbar={0}
          // Dont display old data when loading
          data={FAKE_DATA}
          hover={true}
          autoHeight
          rowHeight={120}
          headerHeight={55}
          rowExpandedHeight={800}
          rowKey="id"
          virtualized
          id="stockInventoryTable"
        >
          {/* Product Information  */}
          <Table.Column minWidth={200} verticalAlign="middle" fixed align="center" flexGrow={4}>
            <Table.HeaderCell>Product</Table.HeaderCell>
            <Table.Cell dataKey="productInformation" />
          </Table.Column>

          {/* Render a column for each date from end date to statr date */}
          {headers.map((date, index) => {
            return (
              <Table.Column width={48} verticalAlign="middle" fixed align="center" key={index}>
                <Table.HeaderCell>
                  <HeaderDateCell title={date} />
                </Table.HeaderCell>
                <Table.Cell dataKey={date} key={index} />
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
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSalesProjection: (payload: SalesProjectionPayload) =>
      dispatch(fetchSalesProjection(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InventoryTable);
