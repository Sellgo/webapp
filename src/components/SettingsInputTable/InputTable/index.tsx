import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import './global.scss';
import styles from './index.module.scss';

/* Componensts */
import DeleteCell from '../../NewTable/DeleteCell';
import EditValueCell from '../../NewTable/EditValueCell';
import EditValueSelectionCell from '../../NewTable/EditValueSelectionCell';

/* Types */
import { Column } from '../../../interfaces/PerfectStock/Settings';

interface Props {
  tableColumns: Column[];
  data: any[];
  handleEditRow: (key: string, value: any, id: number) => void;
  handleDeleteRow?: (id: number) => void;
  showError?: boolean;
  disableDelete?: boolean;
}

const InputTable = (props: Props) => {
  const {
    data,
    tableColumns,
    handleEditRow,
    handleDeleteRow,
    showError = false,
    disableDelete,
  } = props;
  return (
    <section className={styles.inputTable}>
      <Table
        data={data}
        height={400}
        hover={false}
        rowHeight={60}
        headerHeight={55}
        id="inputTable"
        shouldUpdateScroll={false}
      >
        {tableColumns.map((column: Column) => {
          let contentCell;
          if (column.type === 'text') {
            contentCell = (
              <EditValueCell
                dataKey={column.dataKey}
                handleChange={handleEditRow}
                showEmptyError={showError}
                prependMessage={column.prepend}
                appendMessage={column.append}
                isLarge
                isLong={column.width >= 300}
                disabled={column.disabled}
              />
            );
          } else if (column.type === 'number') {
            contentCell = (
              <EditValueCell
                dataKey={column.dataKey}
                prependMessage={column.prepend}
                appendMessage={column.append}
                handleChange={handleEditRow}
                showEmptyError={showError}
                isNumber
                isPositiveOnly={column.numberOptions?.isPositiveOnly}
                isInteger={column.numberOptions?.isInteger}
                allow5Decimal={column.numberOptions?.allow5Decimal}
                isLarge
                disabled={column.disabled}
              />
            );
          } else if (column.type === 'date') {
            contentCell = (
              <EditValueCell
                dataKey={column.dataKey}
                handleChange={handleEditRow}
                showEmptyError={showError}
                prependMessage={column.prepend}
                appendMessage={column.append}
                disabled={column.disabled}
              />
            );
          } else {
            contentCell = (
              <EditValueSelectionCell
                inputWidth={column.width - 20}
                dataKey={column.dataKey}
                handleChange={handleEditRow}
                showEmptyError={showError}
                options={column.options || []}
                disabled={column.disabled}
              />
            );
          }

          return (
            <Table.Column
              key={column.dataKey}
              align="center"
              width={column.width}
              verticalAlign="middle"
            >
              <Table.HeaderCell>{column.title}</Table.HeaderCell>
              {contentCell}
            </Table.Column>
          );
        })}
        {/* Delete Cell */}
        {!disableDelete && handleDeleteRow && (
          <Table.Column flexGrow={1} verticalAlign="middle" align="right">
            <Table.HeaderCell />
            <DeleteCell
              dataKey="id"
              deleteMessage="Remove this entry?"
              handleDelete={handleDeleteRow}
            />
          </Table.Column>
        )}
      </Table>
    </section>
  );
};

export default React.memo(InputTable);
