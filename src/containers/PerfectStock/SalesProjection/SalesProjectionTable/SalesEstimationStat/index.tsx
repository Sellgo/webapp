import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Interface */
import { RowCell } from '../../../../../interfaces/Table';

/* Utils */
import { formatNumber, formatDecimal, showNAIfZeroOrNull } from '../../../../../utils/format';

/* Components */
import HoveredCell from './HoveredCell';

interface Props extends RowCell {
  daysOffset: number;
}

const SalesEstimationStat = (props: Props) => {
  const { daysOffset, ...otherProps } = props;
  const { rowData, dataKey } = otherProps;
  const [onHovered, setOnHovered] = React.useState<boolean>(false);

  /* Formatting key stats */
  const stat = showNAIfZeroOrNull(rowData[dataKey], formatNumber(rowData[dataKey]));
  const included = rowData[`${dataKey}_included`];
  const weight = showNAIfZeroOrNull(
    rowData[`${dataKey}_weight`],
    formatDecimal(rowData[`${dataKey}_weight`])
  );

  return (
    <Table.Cell {...otherProps}>
      <div
        className={`
          ${styles.salesEstimationStatCell}
          ${!included ? styles.salesEstimationStatCell__disabled : ''}
        `}
        onMouseEnter={() => setOnHovered(true)}
        onMouseLeave={() => setOnHovered(false)}
      >
        {!onHovered ? (
          <>
            <div className={styles.mainStat}>{stat}</div>
            <div className={styles.weight}>{weight}%</div>
          </>
        ) : (
          <HoveredCell daysOffset={daysOffset} disabled={!included} />
        )}
      </div>
    </Table.Cell>
  );
};

export default SalesEstimationStat;
