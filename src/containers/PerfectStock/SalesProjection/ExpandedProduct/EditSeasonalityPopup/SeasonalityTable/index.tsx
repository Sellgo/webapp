import React from 'react';
import { Table } from 'rsuite';
import { connect } from 'react-redux';

/* Styling */
import 'rsuite/dist/styles/rsuite-default.css';
import './globals.scss';
import styles from './index.module.scss';

/* Actions */
import { fetchSalesProjection } from '../../../../../../actions/PerfectStock/SalesProjection';

/* Interfaces */
import { SalesProjectionPayload } from '../../../../../../interfaces/PerfectStock/SalesProjection';

/* Components */
import Placeholder from '../../../../../../components/Placeholder';
import {
  getSalesProjectionResults,
  getIsLoadingSalesProjection,
} from '../../../../../../selectors/PerfectStock/SalesProjection';
import EditValueCell from './EditValueCell';
import DeleteCell from '../../../../../../components/NewTable/DeleteCell';

interface Props {
  seasonalitySettings: any[];
  isLoadingSeasonality?: boolean;
  handleValueChange: (key: string, value: string, id: number) => void;
  handleDelete: (id: number) => void;
}

/* Main component */
const SeasonalityTable = (props: Props) => {
  const { seasonalitySettings, isLoadingSeasonality, handleValueChange, handleDelete } = props;

  return (
    <>
      <section className={styles.seasonalityTableWrapper}>
        <Table
          renderLoading={() =>
            isLoadingSeasonality && <Placeholder numberParagraphs={2} numberRows={3} isGrey />
          }
          renderEmpty={() => <div />}
          affixHorizontalScrollbar={0}
          // Dont display old data when loading
          data={!isLoadingSeasonality ? seasonalitySettings : []}
          hover={false}
          autoHeight
          rowHeight={60}
          headerHeight={55}
          rowKey="id"
          virtualized
          id="seasonalityTable"
        >
          {/* Average Next 90 Day */}
          <Table.Column width={150} verticalAlign="middle" align="center">
            <Table.HeaderCell>Season Name</Table.HeaderCell>
            <Table.Cell dataKey="name" />
          </Table.Column>
          {/* Average Next 90 Day */}
          <Table.Column width={150} verticalAlign="middle" align="center">
            <Table.HeaderCell>Start</Table.HeaderCell>
            <EditValueCell dataKey="start_date" handleChange={handleValueChange} />
          </Table.Column>
          {/* Average Next 90 Day */}
          <Table.Column width={150} verticalAlign="middle" align="center">
            <Table.HeaderCell>End</Table.HeaderCell>
            <EditValueCell dataKey="end_date" handleChange={handleValueChange} />
          </Table.Column>
          {/* Average Next 90 Day */}
          <Table.Column width={100} verticalAlign="middle" align="center">
            <Table.HeaderCell>Adjustor (x)</Table.HeaderCell>
            <EditValueCell dataKey="value" handleChange={handleValueChange} />
          </Table.Column>
          {/* Delete Cell */}
          <Table.Column width={800} verticalAlign="middle" align="right">
            <Table.HeaderCell />
            <DeleteCell
              dataKey="id"
              deleteMessage="Remove this product from Zapier?"
              handleDelete={handleDelete}
            />
          </Table.Column>
        </Table>
      </section>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    salesProjectionResult: getSalesProjectionResults(state),
    isLoadingSalesProjection: getIsLoadingSalesProjection(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSalesProjection: (payload: SalesProjectionPayload) =>
      dispatch(fetchSalesProjection(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SeasonalityTable);
