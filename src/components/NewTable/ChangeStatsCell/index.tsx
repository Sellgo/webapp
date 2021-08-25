import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Utils */
import { formatNumber, showNAIfZeroOrNull } from '../../../utils/format';

/* Assets */
import { ReactComponent as ChangeArrowIcon } from '../../../assets/images/changeArrowIcon.svg';

/* Types */
import { RowCell } from '../../../interfaces/Table';

interface Props extends RowCell {
  align?: 'left' | 'right' | 'center';
  statsCount: number;
  changePercent: number;
}

const ChangeStatsCell = (props: Props) => {
  const { align = 'left', statsCount, changePercent, ...otherProps } = props;

  const displayStat = formatNumber(statsCount);

  const isPositiveChange = changePercent >= 0;

  return (
    <Table.Cell {...otherProps}>
      <div className={styles.changeStatsCell} style={{ textAlign: align }}>
        {/*  SHow the actual stat */}
        <span>{showNAIfZeroOrNull(displayStat, displayStat)} /</span>

        {/* Show percent change */}
        <span className={isPositiveChange ? styles.positiveChange : styles.negativeChange}>
          <ChangeArrowIcon />
          {showNAIfZeroOrNull(changePercent, `${changePercent.toFixed(2)} %`)}
        </span>
      </div>
    </Table.Cell>
  );
};

export default ChangeStatsCell;
