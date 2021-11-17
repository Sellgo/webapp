import React, { useState, useEffect } from 'react';
import { Table } from 'rsuite';
import { connect } from 'react-redux';

/* Styling */
import './global.scss';
import styles from './index.module.scss';

/* Containers */
import Keyword from './Keyword';

/* Constants */
import {
  PRODUCT_KEYWORD_ROW_HEIGHT,
  TRACKER_PRODUCTS_TABLE_UNIQUE_ROW_KEY,
  TRACKER_PRODUCT_KEYWORDS_TABLE_UNIQUE_ROW_KEY,
} from '../../../../../constants/KeywordResearch/KeywordTracker';

/* Selectors */
import {
  getIsLoadingTrackerProductKeywordsTable,
  getTrackerProductKeywordsTableResults,
} from '../../../../../selectors/KeywordResearch/KeywordTracker';

/* Actions */
import { fetchTrackerProductKeywordsTable } from '../../../../../actions/KeywordResearch/KeywordTracker';

/* Interfaces */
import { TrackerProductKeywordsTablePayload } from '../../../../../interfaces/KeywordResearch/KeywordTracker';

interface Props {
  isLoadingTrackerProductKeywordsTable: boolean;
  trackerProductKeywordsTableResults: any[];
  fetchTrackerProductKeywordsTable: (payload: TrackerProductKeywordsTablePayload) => void;
}

const TrackerKeywordTable = (props: Props) => {
  const {
    isLoadingTrackerProductKeywordsTable,
    trackerProductKeywordsTableResults,
    fetchTrackerProductKeywordsTable,
  } = props;

  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortType, setSortType] = useState<'asc' | 'desc' | undefined>();

  /* Handle Column Sorting */
  const handleSortColumn = (sortColumn: string, sortType: 'asc' | 'desc' | undefined) => {
    const tableResults = trackerProductKeywordsTableResults;
    const [firstItem] = tableResults;
    if (!firstItem) {
      return;
    }
    setSortColumn(sortColumn);
    setSortType(sortType);

    fetchTrackerProductKeywordsTable({
      keywordTrackProductId: firstItem[TRACKER_PRODUCTS_TABLE_UNIQUE_ROW_KEY],
      sort: sortColumn,
      sortDir: sortType,
    });
  };

  /* Custom scroll logic */
  const handleCustomTableScroll = (e: any) => {
    const verticalScrollRef = document.querySelector(
      '#zapierProductTable #zapierKeywordTable .rs-table-body-wheel-area'
    );

    if (verticalScrollRef) {
      const newScrollY = verticalScrollRef.scrollTop + e.deltaY;
      verticalScrollRef.scrollTo({
        top: newScrollY,
        behavior: 'auto',
      });
    }
  };

  /* Need to overide the custom scroll behavior on mount */
  useEffect(() => {
    const bodyWheelArea = document.querySelector(
      '#zapierProductTable #zapierKeywordTable .rs-table-body-wheel-area'
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
      {/* Table Section */}
      <div className={styles.keywordTableWrapper}>
        <Table
          loading={isLoadingTrackerProductKeywordsTable}
          data={trackerProductKeywordsTableResults}
          height={300}
          // shouldUpdateScroll={false}
          hover={false}
          rowHeight={PRODUCT_KEYWORD_ROW_HEIGHT}
          headerHeight={50}
          sortColumn={sortColumn}
          sortType={sortType}
          id="zapierKeywordTable"
          onSortColumn={handleSortColumn}
          rowKey={TRACKER_PRODUCT_KEYWORDS_TABLE_UNIQUE_ROW_KEY}
        >
          {/* Keyword Info */}
          <Table.Column verticalAlign="middle" fixed align="left" width={500} flexGrow={1}>
            <Table.HeaderCell>Keyword</Table.HeaderCell>
            <Keyword dataKey="keyword" />
          </Table.Column>
        </Table>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isLoadingTrackerProductKeywordsTable: getIsLoadingTrackerProductKeywordsTable(state),
    trackerProductKeywordsTableResults: getTrackerProductKeywordsTableResults(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchTrackerProductKeywordsTable: (payload: TrackerProductKeywordsTablePayload) =>
      dispatch(fetchTrackerProductKeywordsTable(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackerKeywordTable);
