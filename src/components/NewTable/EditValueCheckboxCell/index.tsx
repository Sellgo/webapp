import React, { memo } from 'react';
import { Table } from 'rsuite';
import { RowCell } from '../../../interfaces/Table';
import ToggleRadio from '../../../components/ToggleRadio';

/* Styling */
import styles from './index.module.scss';

interface Props extends RowCell {
  handleCheckboxClick: (key: string, checked: any, id: number) => void;
  toggle?: boolean;
}

const EditValueCheckBoxCell = (props: Props) => {
  const { handleCheckboxClick, ...otherProps } = props;

  const { dataKey, rowData, toggle } = otherProps;

  const [checked, setChecked] = React.useState<any>(
    rowData[dataKey] || rowData[dataKey] === 'active' ? true : false
  );

  return (
    <Table.Cell {...otherProps}>
      <div className={styles.checkBoxCell}>
        <ToggleRadio
          isToggled={checked}
          label=""
          handleChange={() => {
            if (toggle) {
              handleCheckboxClick(dataKey, !checked ? 'active' : null, rowData.id);
            } else {
              handleCheckboxClick(dataKey, !checked, rowData.id);
            }

            setChecked((prev: boolean) => !prev);
          }}
        />
      </div>
    </Table.Cell>
  );
};

export default memo(EditValueCheckBoxCell);
