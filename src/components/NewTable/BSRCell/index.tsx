import React from 'react';
import { Table } from 'rsuite';

/* Utils */
import { formatNumber, truncateIntoTwoLines } from '../../../utils/format';

/* Types */
import { RowCell } from '../../../interfaces/Table';

/* Styles */
import styles from './index.module.scss';

const BSRCell = (props: RowCell) => {
  const { rowData, dataKey } = props;

  const parseBsr = (bsrStr: any) => {
    const bsrArr = bsrStr.split('in');
    const bsrNumber: number = parseInt(bsrArr[0].substring(1));
    const bsrCategory: string = bsrArr[1].trim();
    return {
      rank: bsrNumber,
      category: bsrCategory,
    };
  };

  const bsrToDisplay = rowData[dataKey] && parseBsr(rowData[dataKey]);

  const categoryString = bsrToDisplay && truncateIntoTwoLines(bsrToDisplay.category, 20, 40);
  return (
    <Table.Cell {...props}>
      {bsrToDisplay ? (
        <span className={styles.bsrCell}>
          <span>{formatNumber(bsrToDisplay.rank)}</span>
          <span> {categoryString && categoryString[0]} </span>
          <span> {categoryString && categoryString[1]} </span>
        </span>
      ) : (
        '-'
      )}
    </Table.Cell>
  );
};

export default BSRCell;
