import React, { memo } from 'react';
import { Table } from 'rsuite';

/* Styles */
import styles from './index.module.scss';

/* Types */
import { RowCell } from '../../../../../interfaces/Table';

interface Props extends RowCell {
  secondDataKey?: string;
  isFirstTextBold?: boolean;
  isSecondTextBold?: boolean;
  textAlign?: 'left' | 'right' | 'center';
}

/* Row cell, Appends $ sign infront of monetary cells */
const MultipleDataCell = (props: Props) => {
  const { rowData, dataKey, secondDataKey, isFirstTextBold, isSecondTextBold, textAlign } = props;
  return (
    <Table.Cell {...props}>
      <div
        className={styles.txtCell}
        style={{
          textAlign,
        }}
      >
        <p className={`${isFirstTextBold ? styles.txtCell__bold : ''}`}>{rowData[dataKey]}</p>
        {secondDataKey && (
          <p className={`${isSecondTextBold ? styles.txtCell__bold : ''}`}>
            {rowData[secondDataKey]}
          </p>
        )}
      </div>
    </Table.Cell>
  );
};

export default memo(MultipleDataCell);
