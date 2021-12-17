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

/* Components */
import Placeholder from '../../../../components/Placeholder';
import HeaderDateCell from '../../../../components/NewTable/HeaderDateCell';

/* Selectors */
import { getTimeSetting } from '../../../../selectors/PerfectStock/OrderPlanning';

/* Constants */
import { UNIT_WIDTH } from '../../../../constants/PerfectStock/OrderPlanning';

interface Props {
  data: any[];
}

/* Main component */
const InventoryTable = (props: Props) => {
  const { data } = props;
  const [sortColumn, setSortColumn] = React.useState<string>('');
  console.log(sortColumn);
  const [sortType, setSortType] = React.useState<'asc' | 'desc' | undefined>(undefined);
  console.log(sortType);
  const handleSortColumn = (sortColumn: string, sortType: 'asc' | 'desc' | undefined) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
    fetchSalesProjection({
      sort: sortColumn,
      sortDir: sortType,
    });
  };

  /* Custom scroll logic */
  const handleCustomTableScroll = (e: any) => {
    const verticalScrollRef = document.querySelector(
      '#keywordTrackerTable #trackerKeywordTable .rs-table-body-wheel-area'
    );

    if (verticalScrollRef) {
      const newScrollY = verticalScrollRef.scrollTop + e.deltaY;
      const newScrollX = verticalScrollRef.scrollLeft + e.deltaX;
      verticalScrollRef.scrollTo({
        top: newScrollY,
        behavior: 'auto',
      });
      verticalScrollRef.scrollTo({
        left: newScrollX,
        behavior: 'auto',
      });
      console.log(verticalScrollRef.scrollLeft);
    }
  };

  /* Need to overide the custom scroll behavior on mount */
  React.useEffect(() => {
    const bodyWheelArea = document.querySelector(
      '#salesEstimationTable #productSalesTable .rs-table-body-wheel-area'
    );

    if (bodyWheelArea) {
      bodyWheelArea.addEventListener('wheel', handleCustomTableScroll);
    }

    return () => {
      // run cleanup
      if (bodyWheelArea) {
        bodyWheelArea.removeEventListener('wheel', handleCustomTableScroll);
      }
    };
  }, []);

  return (
    <>
      <section className={styles.productDatabaseWrapper}>
        <Table
          renderLoading={() => false && <Placeholder numberParagraphs={2} numberRows={3} isGrey />}
          renderEmpty={() => <div />}
          affixHorizontalScrollbar={0}
          // Dont display old data when loading
          data={data}
          hover={true}
          autoHeight
          rowHeight={70}
          headerHeight={55}
          rowExpandedHeight={800}
          onSortColumn={handleSortColumn}
          rowKey="id"
          virtualized
          id="productSalesTable"
        >
          {/* Render a column for each date from end date to statr date */}
          {data.length > 0 &&
            Object.keys(data[0]).map((date: string, index: number) => {
              return (
                <Table.Column width={UNIT_WIDTH} verticalAlign="middle" align="center" key={index}>
                  <Table.HeaderCell>
                    <HeaderDateCell title={date} />
                  </Table.HeaderCell>
                  <Table.Cell> 1 </Table.Cell>
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
