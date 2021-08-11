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
  align?: 'left' | 'right' | 'center';
}

const StatsCell = (props: Props) => {
  const { appendWith = '', prependWith = '', align = 'left', ...otherProps } = props;

  const { rowData, dataKey } = otherProps;

  const displayStat = formatNumber(rowData[dataKey]);

  return (
    <Table.Cell {...otherProps}>
      <div className={styles.statsCell} style={{ textAlign: align }}>
        {showNAIfZeroOrNull(rowData[dataKey], `${prependWith}${displayStat}${appendWith}`)}
      </div>
    </Table.Cell>
  );
};

export default StatsCell;
