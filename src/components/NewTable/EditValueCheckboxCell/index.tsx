import React, { memo } from 'react';
import { Table } from 'rsuite';
import { Checkbox } from 'semantic-ui-react';
import { RowCell } from '../../../interfaces/Table';

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
        <Checkbox
          className={!toggle ? styles.checkbox : ''}
          checked={checked}
          onChange={(_e, data) => {
            setChecked(data.checked);
            if (toggle) {
              handleCheckboxClick(dataKey, data.checked ? 'active' : null, rowData.id);
            } else {
              handleCheckboxClick(dataKey, data.checked, rowData.id);
            }
          }}
          toggle={toggle ? true : false}
        />
      </div>
    </Table.Cell>
  );
};

export default memo(EditValueCheckBoxCell);
