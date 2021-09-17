import React, { memo } from 'react';
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

  let alignSettings;
  switch (align) {
    case 'right':
      alignSettings = 'flex-end';
      break;

    case 'left':
      alignSettings = 'flex-start';
      break;

    case 'center':
      alignSettings = 'center';
      break;
  }

  let displayStat = formatNumber(rowData[dataKey]);

  // format position rank KPI seperately
  if (dataKey === 'position_rank' && !rowData[dataKey]) {
    displayStat = '>300';
  }

  return (
    <Table.Cell {...otherProps}>
      <div
        className={styles.statsCell}
        style={{ alignSelf: alignSettings, color: specialKpi ? '#3B4557' : '#636d76' }}
      >
        {showNAIfZeroOrNull(displayStat, `${prependWith}${displayStat}${appendWith}`)}
      </div>
    </Table.Cell>
  );
};

export default memo(StatsCell);
