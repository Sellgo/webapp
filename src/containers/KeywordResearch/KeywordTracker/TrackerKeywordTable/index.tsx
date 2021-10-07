import React, { useState } from 'react';
import { Table } from 'rsuite';
import { connect } from 'react-redux';

/* Styling */
import './global.scss';
import styles from './index.module.scss';

/* Componensts */
import HeaderSortCell from '../../../../components/NewTable/HeaderSortCell';
import CheckBoxCell from '../../../../components/NewTable/CheckboxCell';
import HeaderCheckboxCell from '../../../../components/NewTable/HeaderCheckboxCell';
import StatsCell from '../../../../components/NewTable/StatsCell';
import TablePagination from '../../../../components/NewTable/Pagination';
import TrackerKeywordsExport from './TrackerKeywordsExport';

/* Containers */
import Keyword from './Keyword';
import ActionsCell from './ActionsCell';
import ActionsIconCell from './ActionsIconCell';
import HeaderActionsCell from './HeaderActionsCell';
import TrackerCompetitors from './TrackerCompetitors';

/* Constants */
import {
  calculateKeywordsTableHeight,
  DEFAULT_PAGES_LIST,
  PRODUCT_KEYWORD_ROW_HEIGHT,
  TRACKER_PRODUCTS_TABLE_UNIQUE_ROW_KEY,
  TRACKER_PRODUCT_KEYWORDS_TABLE_UNIQUE_ROW_KEY,
} from '../../../../constants/KeywordResearch/KeywordTracker';

/* Selectors */
import {
  getIsLoadingTrackerProductKeywordsTable,
  getTrackerProductKeywordsTablePaginationInfo,
  getTrackerProductKeywordsTableResults,
} from '../../../../selectors/KeywordResearch/KeywordTracker';

/* Actions */
import { fetchTrackerProductKeywordsTable } from '../../../../actions/KeywordResearch/KeywordTracker';

/* Interfaces */
import {
  TrackerProductKeywordsTablePaginationInfo,
  TrackerProductKeywordsTablePayload,
} from '../../../../interfaces/KeywordResearch/KeywordTracker';
import AddEditKeywords from './AddEditKeywords';

/* Assets */
import amazonChoiceLabel from '../../../../assets/amazonLabels/amazonChoiceLabel.png';

interface Props {
  isLoadingTrackerProductKeywordsTable: boolean;
  trackerProductKeywordsTableResults: any[];
  trackerProductKeywordsTablePaginationInfo: TrackerProductKeywordsTablePaginationInfo;
  fetchTrackerProductKeywordsTable: (payload: TrackerProductKeywordsTablePayload) => void;
}

const TrackerKeywordTable = (props: Props) => {
  const {
    isLoadingTrackerProductKeywordsTable,
    trackerProductKeywordsTableResults,
    trackerProductKeywordsTablePaginationInfo,
    fetchTrackerProductKeywordsTable,
  } = props;

  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortType, setSortType] = useState<'asc' | 'desc' | undefined>();
  const [checkedRows, setCheckedRows] = useState<any>([]);

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

  /* Handle pagination */
  const handlePageChange = (pageNo: number, perPageNo?: number) => {
    const tableResults = trackerProductKeywordsTableResults;
    const [firstItem] = tableResults;

    if (!firstItem) {
      return;
    }

    fetchTrackerProductKeywordsTable({
      keywordTrackProductId: firstItem[TRACKER_PRODUCTS_TABLE_UNIQUE_ROW_KEY],
      page: pageNo,
      perPage: perPageNo,
    });
  };

  /* Handle single row check box click */
  const handleCheckboxClick = (rowData: any) => {
    const doesAlreadyExists = checkedRows.some(
      (row: any) =>
        row[TRACKER_PRODUCT_KEYWORDS_TABLE_UNIQUE_ROW_KEY] ===
        rowData[TRACKER_PRODUCT_KEYWORDS_TABLE_UNIQUE_ROW_KEY]
    );

    // if row does not exist from before add in checked rows state
    if (!doesAlreadyExists) {
      setCheckedRows((prevState: any) => {
        return [...prevState, rowData];
      });
    }
    // if already exisat from before remove from checked rows
    else {
      const filteredRows = checkedRows.filter((row: any) => {
        return (
          row[TRACKER_PRODUCT_KEYWORDS_TABLE_UNIQUE_ROW_KEY] !==
          rowData[TRACKER_PRODUCT_KEYWORDS_TABLE_UNIQUE_ROW_KEY]
        );
      });

      setCheckedRows(filteredRows);
    }
  };

  /* Handle Header checkbox click */
  const handleHeaderCheckboxClick = (e: any, data: any) => {
    const isCheked = Boolean(data.checked);

    if (!isCheked) {
      setCheckedRows([]);
    } else {
      const allRows = new Set([...trackerProductKeywordsTableResults]);
      setCheckedRows(Array.from(allRows));
    }
  };

  return (
    <section className={styles.keywordTableContainer}>
      {/* Competitors Section */}
      <TrackerCompetitors />

      {/* Export Section */}
      <TrackerKeywordsExport />

      {/* Add Edit Keywords Section */}
      <AddEditKeywords />

      {/* Table Section */}
      <section className={styles.keywordTableWrapper}>
        <Table
          wordWrap
          loading={isLoadingTrackerProductKeywordsTable}
          data={trackerProductKeywordsTableResults}
          height={calculateKeywordsTableHeight(trackerProductKeywordsTableResults.length - 5)}
          hover={false}
          rowHeight={PRODUCT_KEYWORD_ROW_HEIGHT}
          headerHeight={50}
          sortColumn={sortColumn}
          sortType={sortType}
          id="trackerKeywordTable"
          onSortColumn={handleSortColumn}
          rowKey={TRACKER_PRODUCT_KEYWORDS_TABLE_UNIQUE_ROW_KEY}
        >
          {/* Check Box Action Cell */}
          <Table.Column verticalAlign="middle" fixed align="left" width={40}>
            <HeaderCheckboxCell
              handleCheckboxClick={handleHeaderCheckboxClick}
              dataKey={'headerActions'}
              actionsCell={<HeaderActionsCell checkedRows={checkedRows} />}
            />
            <CheckBoxCell
              checkedRows={checkedRows}
              dataKey={TRACKER_PRODUCT_KEYWORDS_TABLE_UNIQUE_ROW_KEY}
              handleCheckboxClick={handleCheckboxClick}
            />
          </Table.Column>

          {/* Keyword Info */}
          <Table.Column verticalAlign="middle" fixed align="left" width={500} flexGrow={1}>
            <Table.HeaderCell>Keyword</Table.HeaderCell>
            <Keyword dataKey="keyword" />
          </Table.Column>

          {/* Amazon Choice */}
          <Table.Column width={140} verticalAlign="middle" align="left">
            <Table.HeaderCell />
            <Table.Cell>
              {(rowData: any) => {
                const { amazon_choice_asins } = rowData;
                return (
                  <div className={styles.amazonChoiceLabel}>
                    {amazon_choice_asins && amazon_choice_asins > 0 ? (
                      <img src={amazonChoiceLabel} alt="Amazon Choice Label" />
                    ) : null}
                  </div>
                );
              }}
            </Table.Cell>
          </Table.Column>

          {/* Search Volume */}
          <Table.Column width={130} verticalAlign="middle" align="left" sortable>
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Search\nVolume`}
                dataKey="search_volume"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <StatsCell dataKey="search_volume" align="center" specialKpi />
          </Table.Column>

          {/* Competing Products  */}
          <Table.Column width={130} verticalAlign="middle" align="left" sortable>
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Competing\nProducts`}
                dataKey="competing_products"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <StatsCell dataKey="competing_products" align="center" />
          </Table.Column>

          {/* Position Rank  */}
          <Table.Column width={130} verticalAlign="middle" align="left" sortable>
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Position\nRank`}
                dataKey="position_rank"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <StatsCell dataKey="position_rank" align="center" />
          </Table.Column>

          {/* Relative Rank */}
          <Table.Column width={130} verticalAlign="middle" align="left" sortable>
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Relative\nRank`}
                dataKey="relative_rank"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <StatsCell dataKey="relative_rank" align="center" />
          </Table.Column>

          {/* Average Rank  */}
          <Table.Column width={130} verticalAlign="middle" align="left" sortable>
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Rank\nAvg`}
                dataKey="average_rank"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <StatsCell dataKey="average_rank" align="center" />
          </Table.Column>

          {/* Ranking Asins   */}
          <Table.Column width={130} verticalAlign="middle" align="left" sortable>
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Ranking\nASIN's`}
                dataKey="ranking_asins"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <StatsCell dataKey="ranking_asins" align="center" />
          </Table.Column>

          {/* Sponsored Rank  */}
          <Table.Column width={130} verticalAlign="middle" align="left" sortable>
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Sponsored\nRank`}
                dataKey="sponsored_rank"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <StatsCell dataKey="sponsored_rank" align="center" />
          </Table.Column>

          {/* True Rank Performace Index */}
          <Table.Column width={150} verticalAlign="middle" align="left" sortable>
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Drop/Raise Index`}
                dataKey="index"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <StatsCell dataKey="index" align="center" appendWith="%" asRounded={false} />
          </Table.Column>

          {/* Actions Icon Cell */}
          <Table.Column width={40} verticalAlign="middle" fixed align="left">
            <Table.HeaderCell>{''}</Table.HeaderCell>
            <ActionsIconCell dataKey={TRACKER_PRODUCT_KEYWORDS_TABLE_UNIQUE_ROW_KEY} />
          </Table.Column>

          {/* Actions Cell */}
          <Table.Column width={40} verticalAlign="top" fixed align="left">
            <Table.HeaderCell>{''}</Table.HeaderCell>
            <ActionsCell dataKey={TRACKER_PRODUCT_KEYWORDS_TABLE_UNIQUE_ROW_KEY} />
          </Table.Column>
        </Table>

        {/* Table Pagination */}
        {trackerProductKeywordsTablePaginationInfo.total_pages > 0 && (
          <footer className={styles.trackerKeywordTablePagination}>
            <TablePagination
              totalPages={trackerProductKeywordsTablePaginationInfo.total_pages}
              currentPage={trackerProductKeywordsTablePaginationInfo.current_page}
              onPageChange={handlePageChange}
              showSiblingsCount={3}
              showPerPage={true}
              perPage={trackerProductKeywordsTablePaginationInfo.per_page}
              perPageList={DEFAULT_PAGES_LIST}
            />
          </footer>
        )}
      </section>
    </section>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isLoadingTrackerProductKeywordsTable: getIsLoadingTrackerProductKeywordsTable(state),
    trackerProductKeywordsTableResults: getTrackerProductKeywordsTableResults(state),
    trackerProductKeywordsTablePaginationInfo: getTrackerProductKeywordsTablePaginationInfo(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchTrackerProductKeywordsTable: (payload: TrackerProductKeywordsTablePayload) =>
      dispatch(fetchTrackerProductKeywordsTable(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackerKeywordTable);
