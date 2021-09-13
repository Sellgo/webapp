import React, { memo } from 'react';
import { Table } from 'rsuite';
import { Checkbox } from 'semantic-ui-react';
import { RowCell } from '../../../interfaces/Table';

/* Styling */
import styles from './index.module.scss';

interface Props extends RowCell {
  handleCheckboxClick: (e: any, data: any) => void;
}

const HeaderChekboxCell = (props: Props) => {
  const { handleCheckboxClick, ...otherProps } = props;

  return (
    <Table.HeaderCell {...otherProps}>
      <div className={styles.headerCheckBoxCell}>
        <Checkbox className={styles.checkbox} onChange={handleCheckboxClick} />
      </div>
    </Table.HeaderCell>
  );
};

export default memo(HeaderChekboxCell);
