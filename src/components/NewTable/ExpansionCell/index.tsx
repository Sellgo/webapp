import React from 'react';
import { Table } from 'rsuite';

/* Styles */
import styles from './index.module.scss';

/* Interfaces */
import { RowCell } from '../../../interfaces/Table';

/* Assets */
import { ReactComponent as ExpandedCellIcon } from '../../../assets/images/expandCell.svg';
import { ReactComponent as DeExpandedCellIcon } from '../../../assets/images/deExpandCell.svg';

interface Props extends RowCell {
  onChange: (rowData: any) => void;
  expandedRowKeys: string[];
}

const ExpansionCell = (props: Props) => {
  const { expandedRowKeys, onChange, ...otherProps } = props;
  const { rowData, dataKey } = otherProps;

  const isExpandedRow = expandedRowKeys.find((rowKey: any) => rowKey === rowData[dataKey]);

  return (
    <Table.Cell {...otherProps}>
      <div className={styles.expansionCell}>
        {isExpandedRow ? (
          <DeExpandedCellIcon onClick={() => onChange(rowData)} />
        ) : (
          <ExpandedCellIcon onClick={() => onChange(rowData)} />
        )}
      </div>
    </Table.Cell>
  );
};

export default ExpansionCell;
