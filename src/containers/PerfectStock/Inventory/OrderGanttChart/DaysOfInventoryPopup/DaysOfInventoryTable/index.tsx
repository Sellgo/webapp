import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import 'rsuite/dist/styles/rsuite-default.css';
import './globals.scss';
import styles from './index.module.scss';

/* Components */
import Placeholder from '../../../../../../components/Placeholder';
import EditValueCell from '../../../../../../components/NewTable/EditValueCell';
import DeleteCell from '../../../../../../components/NewTable/DeleteCell';

interface Props {
  daysOfInventory: any[];
  isLoadingDaysOfInventory?: boolean;
  handleValueChange: (key: string, value: string, id: number) => void;
  handleDelete: (id: number) => void;
}

/* Main component */
const DaysOfInventoryTable = (props: Props) => {
  const { daysOfInventory, isLoadingDaysOfInventory, handleValueChange, handleDelete } = props;
  const displayDaysOfInventory = daysOfInventory.filter(
    dayOfInventory => dayOfInventory.status === 'active' || dayOfInventory.status === 'pending'
  );

  return (
    <>
      <section className={styles.seasonalityTableWrapper}>
        <Table
          renderLoading={() =>
            isLoadingDaysOfInventory && <Placeholder numberParagraphs={2} numberRows={3} />
          }
          renderEmpty={() => <div />}
          affixHorizontalScrollbar={0}
          // Dont display old data when loading
          data={!isLoadingDaysOfInventory ? displayDaysOfInventory : []}
          hover={false}
          autoHeight
          rowHeight={60}
          headerHeight={55}
          rowKey="id"
          virtualized
          id="daysOfInventoryTable"
        >
          {/* Average Next 90 Day */}
          <Table.Column width={150} verticalAlign="middle" align="center">
            <Table.HeaderCell>Season Name</Table.HeaderCell>
            <EditValueCell dataKey="name" handleChange={handleValueChange} />
          </Table.Column>
          {/* Average Next 90 Day */}
          <Table.Column width={200} verticalAlign="middle" align="center">
            <Table.HeaderCell>Start</Table.HeaderCell>
            <EditValueCell dataKey="start_date" handleChange={handleValueChange} />
          </Table.Column>
          {/* Average Next 90 Day */}
          <Table.Column width={200} verticalAlign="middle" align="center">
            <Table.HeaderCell>End</Table.HeaderCell>
            <EditValueCell dataKey="end_date" handleChange={handleValueChange} />
          </Table.Column>
          {/* Average Next 90 Day */}
          <Table.Column width={100} verticalAlign="middle" align="center">
            <Table.HeaderCell>Days Of Inventory</Table.HeaderCell>
            <EditValueCell dataKey="value" handleChange={handleValueChange} isNumber />
          </Table.Column>
          {/* Delete Cell */}
          <Table.Column flexGrow={1} verticalAlign="middle" align="right">
            <Table.HeaderCell />
            <DeleteCell
              dataKey="id"
              deleteMessage="Remove this setting?"
              handleDelete={handleDelete}
            />
          </Table.Column>
        </Table>
      </section>
    </>
  );
};

export default DaysOfInventoryTable;
