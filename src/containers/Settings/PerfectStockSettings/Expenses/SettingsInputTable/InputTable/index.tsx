import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import './global.scss';
import styles from './index.module.scss';

/* Componensts */
import DeleteCell from '../../../../../../components/NewTable/DeleteCell';
import EditValueCell from '../../../../../../components/NewTable/EditValueCell';
import EditValueSelectionCell from '../../../../../../components/NewTable/EditValueSelectionCell';

interface Props {
  data: any[];
  handleEditRow: (key: string, value: any, id: number) => void;
  handleDeleteRow: (id: number) => void;
  showError?: boolean;
}

const InputTable = (props: Props) => {
  const { data, handleEditRow, handleDeleteRow, showError = false } = props;

  const REPEAT_OPTIONS = [
    {
      key: 'Does not repeat',
      value: 0,
      text: 'Does not repeat',
    },
    {
      key: 'Daily',
      value: 1,
      text: 'Daily',
    },
    {
      key: 'Weekly',
      value: 7,
      text: 'Weekly',
    },
    {
      key: 'Biweekly',
      value: 14,
      text: 'Biweekly',
    },
    {
      key: 'Monthly',
      value: 30,
      text: 'Monthly',
    },
    {
      key: 'Annually',
      value: 365,
      text: 'Annually',
    },
  ];
  return (
    <section className={styles.inputTable}>
      <Table
        // loading={false}
        data={data}
        height={300}
        hover={false}
        rowHeight={60}
        headerHeight={55}
        id="inputTable"
        shouldUpdateScroll={false}
      >
        <Table.Column width={200} verticalAlign="middle" align="center">
          <Table.HeaderCell>Description</Table.HeaderCell>
          <EditValueCell
            dataKey="name"
            handleChange={handleEditRow}
            showEmptyError={showError}
            isLarge
          />
        </Table.Column>

        <Table.Column width={200} verticalAlign="middle" align="center">
          <Table.HeaderCell>Expense Start Date</Table.HeaderCell>
          <EditValueCell
            dataKey="start_date"
            isLarge
            handleChange={handleEditRow}
            showEmptyError={showError}
          />
        </Table.Column>

        <Table.Column width={130} verticalAlign="middle" align="center">
          <Table.HeaderCell>Debt</Table.HeaderCell>
          <EditValueCell
            dataKey="amount"
            handleChange={handleEditRow}
            prependMessage="$"
            isLarge
            isNumber
            isPositiveOnly
            showEmptyError={showError}
          />
        </Table.Column>
        <Table.Column width={200} verticalAlign="middle" align="center">
          <Table.HeaderCell></Table.HeaderCell>
          <EditValueSelectionCell
            dataKey="repeat_days"
            handleChange={handleEditRow}
            options={REPEAT_OPTIONS}
            inputWidth={180}
            showEmptyError={showError}
          />
        </Table.Column>
        {/* Delete Cell */}
        <Table.Column flexGrow={1} verticalAlign="middle" align="right">
          <Table.HeaderCell />
          <DeleteCell
            dataKey="id"
            deleteMessage="Remove this entry?"
            handleDelete={handleDeleteRow}
          />
        </Table.Column>
      </Table>
    </section>
  );
};

export default InputTable;
