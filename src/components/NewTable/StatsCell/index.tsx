import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Utils */
import { formatNumber, showNAIfZeroOrNull } from '../../../utils/format';

/* Types */
import { RowCell } from '../../../interfaces/Table';

interface Props extends RowCell {
  appendWith?: string;
  prependWith?: string;
}

const StatsCell = (props: Props) => {
  const { appendWith = '', prependWith = '', ...otherProps } = props;

  const { rowData, dataKey } = otherProps;

  const displayStat = formatNumber(rowData[dataKey]);

  return (
    <Table.Cell {...otherProps}>
      <div className={styles.statsCell}>
        {showNAIfZeroOrNull(rowData[dataKey], `${prependWith}${displayStat}${appendWith}`)}
      </div>
    </Table.Cell>
  );
};

export default StatsCell;
