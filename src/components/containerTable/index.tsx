import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import './global.scss';
import styles from './index.module.scss';

/* Componensts */
import EditValueCell from '../NewTable/EditValueCell';
import RadioCell from '../NewTable/RadioCell';

/* Types */
import { Column } from '../../interfaces/Container/settings';

interface Props {
  tableColumns: Column[];
  errorColumns?: string[];
  data: any[];
  handleEditRow: (key: string, value: any, id: number) => void;
  handleRadioClick: (key: string, value: any) => void;
  handleDeleteRow?: (id: number) => void;
  showError?: boolean;
  disableDelete?: boolean;
}

interface DataCellProps {
  column: Column;
  dataKey: string;
}

const DataCell = (props: DataCellProps) => {
  const { column, dataKey, ...otherProps } = props;
  return (
    <Table.Cell {...otherProps}>
      {(rowData: any) => {
        return (
          <p>
            {column.prepend ? column.prepend : ''}&nbsp;{rowData[dataKey]}&nbsp;
            {column.append ? column.append : ''}
          </p>
        );
      }}
    </Table.Cell>
  );
};

const InputTable = (props: Props) => {
  const {
    data,
    tableColumns,
    handleEditRow,
    handleRadioClick,
    showError = false,
    errorColumns,
  } = props;

  console.log('data is', data);
  return (
    <section className={styles.inputTable}>
      <Table
        data={data}
        height={400}
        hover={false}
        rowHeight={60}
        headerHeight={55}
        id="inputContainerTable"
        shouldUpdateScroll={false}
      >
        {tableColumns &&
          tableColumns.map((column: Column) => {
            const { dataKey } = column;
            console.log('data key', dataKey);
            let contentCell;
            if (column.isEditable) {
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
                    hasError={errorColumns && errorColumns.includes(column.dataKey)}
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
                    hasError={errorColumns && errorColumns.includes(column.dataKey)}
                    isLarge
                  />
                );
              }
            } else if (column.isRadio) {
              contentCell = (
                <RadioCell
                  selectedValue={true}
                  isRadio={true}
                  dataKey={dataKey}
                  handleCheckboxClick={rowData => {
                    handleRadioClick(dataKey, rowData);
                  }}
                />
              );
            } else {
              contentCell = <DataCell column={column} dataKey={dataKey} />;
            }
            return (
              <Table.Column
                key={column.dataKey}
                align={column.align}
                width={column.width}
                verticalAlign="middle"
              >
                <Table.HeaderCell>{column.title}</Table.HeaderCell>
                {contentCell}
              </Table.Column>
            );
          })}
      </Table>
    </section>
  );
};

export default React.memo(InputTable);
