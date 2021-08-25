import React, { useState } from 'react';
import { Table } from 'rsuite';

/* Styling */
import './global.scss';
import styles from './index.module.scss';

/* Componensts */
import HeaderSortCell from '../../../../components/NewTable/HeaderSortCell';
import StatsCell from '../../../../components/NewTable/StatsCell';

/* Fake Data */
const fakeData = Array(10).fill({ title: 'Demo' });

const TrackerKeywordTable = () => {
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortType, setSortType] = useState<'asc' | 'desc' | undefined>();

  const handleSortColumn = (sortColumn: string, sortType: 'asc' | 'desc' | undefined) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
  };

  return (
    <div className={styles.keywordTableWrapper}>
      <Table
        loading={false}
        data={fakeData}
        autoHeight
        hover={false}
        rowHeight={50}
        headerHeight={50}
        sortColumn={sortColumn}
        sortType={sortType}
        id="trackerKeywordTable"
        onSortColumn={handleSortColumn}
      >
        {/* Keyword Info */}
        <Table.Column verticalAlign="middle" fixed align="left" width={500} flexGrow={1}>
          <Table.HeaderCell>Keyword</Table.HeaderCell>
          <Table.Cell>Big thermos water bottle insultaed ...</Table.Cell>
        </Table.Column>

        {/* Search Volume */}
        <Table.Column width={180} verticalAlign="middle" fixed align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Tracked Keywords`}
              dataKey="tracked_keywords"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <StatsCell dataKey="tracked_keywords" align="center" />
        </Table.Column>

        {/* Competing Products Volume */}
        <Table.Column width={180} verticalAlign="middle" fixed align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Tracked Keywords`}
              dataKey="tracked_keywords"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <Table.Cell>{'>306'}</Table.Cell>
        </Table.Column>

        {/* Competing Trend Volume */}
        <Table.Column width={180} verticalAlign="middle" fixed align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Tracked Keywords`}
              dataKey="tracked_keywords"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <Table.Cell>{'>306'}</Table.Cell>
        </Table.Column>
      </Table>
    </div>
  );
};

export default TrackerKeywordTable;
