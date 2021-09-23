import React from 'react';
import { Table } from 'rsuite';
import { Popup, Icon } from 'semantic-ui-react';

/* Styling */
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
        <Popup trigger={<Icon name="chevron down" />} on="click" />
      </div>
    </Table.Cell>
  );
};

export default BuyboxCompetition;
