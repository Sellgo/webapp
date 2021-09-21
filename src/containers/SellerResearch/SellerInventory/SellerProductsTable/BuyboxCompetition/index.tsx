import React from 'react';
import { Table } from 'rsuite';

import styles from './index.module.scss';

/* Utils */
import { formatNumber, showNAIfZeroOrNull } from '../../../../../utils/format';

/* Interfaces */
import { RowCell } from '../../../../../interfaces/Table';

const BuyboxCompetition = (props: RowCell) => {
  const { rowData } = props;

  const numOfSellers = formatNumber(rowData.num_sellers);

  return (
    <Table.Cell {...props}>
      <div className={styles.buyBoxCompetition}>
        <span>{showNAIfZeroOrNull(numOfSellers, numOfSellers)}</span>
      </div>
    </Table.Cell>
  );
};

export default BuyboxCompetition;
