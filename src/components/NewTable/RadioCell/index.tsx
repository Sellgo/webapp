import React, { memo } from 'react';
import { Table } from 'rsuite';
import { Checkbox } from 'semantic-ui-react';
import { RowCell } from '../../../interfaces/Table';

/* Styling */
import styles from './index.module.scss';

interface Props extends RowCell {
  handleCheckboxClick: (data: any) => void;
  selectedValue: any;
}

const RadioCell = (props: Props) => {
  const { selectedValue, handleCheckboxClick, ...otherProps } = props;

  const { dataKey, rowData } = otherProps;

  const isCheckedRow = selectedValue === rowData[dataKey];

  return (
    <Table.Cell {...otherProps}>
      <div className={styles.checkBoxCell}>
        <Checkbox
          radio
          className={styles.checkbox}
          checked={isCheckedRow}
          onChange={() => handleCheckboxClick(rowData)}
        />
      </div>
    </Table.Cell>
  );
};

export default memo(RadioCell);
