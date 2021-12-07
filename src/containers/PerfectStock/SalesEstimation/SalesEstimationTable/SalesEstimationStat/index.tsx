import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Interface */
import { RowCell } from '../../../../../interfaces/Table';

/* Utils */
import { formatNumber, formatDecimal, showNAIfZeroOrNull } from '../../../../../utils/format';

/* Assets */
import { ReactComponent as LinkIcon } from '../../../../../assets/images/link.svg';
import { ReactComponent as UnlinkIcon } from '../../../../../assets/images/unlink.svg';

const SalesEstimationStat = (props: RowCell) => {
  const { rowData, dataKey } = props;
  const stat = showNAIfZeroOrNull(rowData[dataKey], formatNumber(rowData[dataKey]));
  const included = rowData[`${dataKey}_included`];
  const weight = showNAIfZeroOrNull(
    rowData[`${dataKey}_weight`],
    formatDecimal(rowData[`${dataKey}_weight`])
  );

  const [onHovered, setOnHovered] = React.useState<boolean>(false);
  let onHoveredContent;
  if (included) {
    onHoveredContent = <LinkIcon />;
  } else {
    onHoveredContent = <UnlinkIcon />;
  }

  return (
    <Table.Cell {...props}>
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
          onHoveredContent
        )}
      </div>
    </Table.Cell>
  );
};

export default SalesEstimationStat;
