import React, { useState, useEffect } from 'react';
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
import TrackerKeywordsExport from './TrackerKeywordsExport';
import Placeholder from '../../../../components/Placeholder';
import ChangeStats from './ChangeStats';

/* Containers */
import Keyword from './Keyword';
import ActionsCell from './ActionsCell';
import HeaderActionsCell from './HeaderActionsCell';
import TrackerCompetitors from './TrackerCompetitors';
import AddEditKeywords from './AddEditKeywords';

/* Constants */
import {
  calculateKeywordsTableHeight,
  PRODUCT_KEYWORD_ROW_HEIGHT,
  TRACKER_PRODUCTS_TABLE_UNIQUE_ROW_KEY,
  TRACKER_PRODUCT_KEYWORDS_TABLE_UNIQUE_ROW_KEY,
} from '../../../../constants/KeywordResearch/KeywordTracker';

/* Selectors */
import {
  getIsLoadingTrackerProductKeywordsTable,
  getTrackerProductKeywordsTableResults,
} from '../../../../selectors/KeywordResearch/KeywordTracker';

/* Actions */
import { fetchTrackerProductKeywordsTable } from '../../../../actions/KeywordResearch/KeywordTracker';

/* Interfaces */
import { TrackerProductKeywordsTablePayload } from '../../../../interfaces/KeywordResearch/KeywordTracker';

/* Assets */
import amazonChoiceLabel from '../../../../assets/amazonLabels/amazonChoiceLabel.png';

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
  const [checkedRows, setCheckedRows] = useState<any>([]);
  const [addEditKeywords, setAddEditKeywords] = useState(false);

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

  /* Custom scroll logic */
  const handleCustomTableScroll = (e: any) => {
    const verticalScrollRef = document.querySelector(
      '#keywordTrackerTable #trackerKeywordTable .rs-table-body-wheel-area'
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
      '#keywordTrackerTable #trackerKeywordTable .rs-table-body-wheel-area'
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
      {/* Competitors Section */}
      <TrackerCompetitors />

      {/* Export Section */}
      <TrackerKeywordsExport />

      {/* Add Edit Keywords Section */}
      <AddEditKeywords addEditKeywords={addEditKeywords} setAddEditKeywords={setAddEditKeywords} />

      {/* Table Section */}
      <section className={styles.keywordTableWrapper}>
        <Table
          wordWrap={false}
          renderLoading={() =>
            isLoadingTrackerProductKeywordsTable && (
              <Placeholder numberParagraphs={2} numberRows={3} isGrey />
            )
          }
          renderEmpty={() => (
            <p className={styles.emptyTableMessage}>
              No keywords are tracked.
              <span onClick={() => setAddEditKeywords(true)}> Add keywords </span>
              for this product
            </p>
          )}
          data={trackerProductKeywordsTableResults}
          height={calculateKeywordsTableHeight(
            trackerProductKeywordsTableResults && trackerProductKeywordsTableResults.length
          )}
          shouldUpdateScroll={false}
          hover={false}
          rowHeight={PRODUCT_KEYWORD_ROW_HEIGHT}
          // rowHeight={30}
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
            <ChangeStats dataKey="position_rank" align="center" />
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
            <ChangeStats dataKey="relative_rank" align="center" />
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
            <ChangeStats dataKey="average_rank" align="center" />
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
            <ChangeStats dataKey="ranking_asins" align="center" />
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
            <ChangeStats dataKey="sponsored_rank" align="center" />
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

          {/* Actions Cell */}
          <Table.Column width={40} verticalAlign="middle" fixed align="left">
            <Table.HeaderCell>{''}</Table.HeaderCell>
            <ActionsCell dataKey={TRACKER_PRODUCT_KEYWORDS_TABLE_UNIQUE_ROW_KEY} />
          </Table.Column>
        </Table>
      </section>
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
