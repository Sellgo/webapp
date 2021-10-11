import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Interfaces */
import { RowCell } from '../../../interfaces/Table';

const MatchTypeCell = (props: RowCell) => {
  return (
    <Table.Cell {...props}>
      <div className={styles.matchTypeCell}>
        <span className={styles.matchType}>A</span>
        <span className={styles.matchType}>S</span>
        <span className={styles.matchType}>O</span>
      </div>
    </Table.Cell>
  );
};

export default MatchTypeCell;
