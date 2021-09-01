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
  specialKpi?: boolean;
}

const StatsCell = (props: Props) => {
  const {
    appendWith = '',
    prependWith = '',
    align = 'left',
    specialKpi = false,
    ...otherProps
  } = props;

  const { rowData, dataKey } = otherProps;

  const displayStat = formatNumber(rowData[dataKey]);

  return (
    <Table.Cell {...otherProps}>
      <div
        className={styles.statsCell}
        style={{ textAlign: align, color: specialKpi ? '#3B4557' : '#95A1AC' }}
      >
        {showNAIfZeroOrNull(rowData[dataKey], `${prependWith}${displayStat}${appendWith}`)}
      </div>
    </Table.Cell>
  );
};

export default StatsCell;
