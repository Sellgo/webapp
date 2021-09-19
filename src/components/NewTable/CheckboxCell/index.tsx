import React, { memo } from 'react';
import { Table } from 'rsuite';
import { Checkbox } from 'semantic-ui-react';
import { RowCell } from '../../../interfaces/Table';

/* Styling */
import styles from './index.module.scss';

interface Props extends RowCell {
  handleCheckboxClick: (data: any) => void;
  checkedRows: any[];
}

const CheckBoxCell = (props: Props) => {
  const { checkedRows, handleCheckboxClick, ...otherProps } = props;

  const { dataKey, rowData } = otherProps;

  const isCheckedRow = checkedRows.some((row: any) => {
    return row[dataKey] === rowData[dataKey];
  });

  return (
    <Table.Cell {...otherProps}>
      <div className={styles.checkBoxCell}>
        <Checkbox
          className={styles.checkbox}
          checked={isCheckedRow}
          onChange={() => handleCheckboxClick(rowData)}
        />
      </div>
    </Table.Cell>
  );
};

export default memo(CheckBoxCell);
