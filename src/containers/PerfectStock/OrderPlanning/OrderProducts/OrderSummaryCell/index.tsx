import React, { memo } from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Utils */
import { formatNumber, showNAIfZeroOrNull } from '../../../../../utils/format';

/* Types */
import { RowCell } from '../../../../../interfaces/Table';

interface Props extends RowCell {
  icon?: React.ReactNode;
}

const SkuStatCell = (props: Props) => {
  const { icon, ...otherProps } = props;

  const { rowData, dataKey } = otherProps;

  const displayStat = formatNumber(rowData[dataKey]);

  return (
    <Table.Cell {...otherProps}>
      <div className={styles.statsCell}>
        <span className={styles.statIcon}>{icon}</span>
        <span className={styles.stat}>{showNAIfZeroOrNull(displayStat, `${displayStat}`)}</span>
      </div>
    </Table.Cell>
  );
};

export default memo(SkuStatCell);
