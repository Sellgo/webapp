import React, { memo } from 'react';
import { Table } from 'rsuite';
import { Radio } from 'semantic-ui-react';
import { RowCell } from '../../../interfaces/Table';

/* Styling */
import styles from './index.module.scss';

interface Props extends RowCell {
  handleCheckboxClick: (data: any) => void;
  selectedValue: any;
  isRadio?: boolean;
}

const RadioCell = (props: Props) => {
  const { selectedValue, handleCheckboxClick, isRadio, ...otherProps } = props;

  const { dataKey, rowData } = otherProps;

  const isCheckedRow = selectedValue === rowData[dataKey];

  return (
    <Table.Cell {...otherProps}>
      <div className={styles.checkBoxCell}>
        <Radio
          className={`${styles.checkbox} ${isRadio ? styles.checkbox__radio : ''}`}
          checked={isCheckedRow}
          onChange={() => handleCheckboxClick(rowData)}
        />
      </div>
    </Table.Cell>
  );
};

export default memo(RadioCell);
