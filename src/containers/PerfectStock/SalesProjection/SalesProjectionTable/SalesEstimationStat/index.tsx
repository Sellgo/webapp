import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Interface */
import { RowCell } from '../../../../../interfaces/Table';

/* Utils */
import {
  formatNumber,
  formatDecimal,
  showNAIfZeroOrNull,
  prettyPrintDate,
} from '../../../../../utils/format';

/* Assets */
import { ReactComponent as LinkIcon } from '../../../../../assets/images/link.svg';
import { ReactComponent as UnlinkIcon } from '../../../../../assets/images/unlink.svg';

interface Props extends RowCell {
  daysOffset: number;
}

const SalesEstimationStat = (props: Props) => {
  const { daysOffset, ...otherProps } = props;
  const { rowData, dataKey } = otherProps;
  const stat = showNAIfZeroOrNull(rowData[dataKey], formatNumber(rowData[dataKey]));
  const included = rowData[`${dataKey}_included`];
  const weight = showNAIfZeroOrNull(
    rowData[`${dataKey}_weight`],
    formatDecimal(rowData[`${dataKey}_weight`])
  );
  const [onHovered, setOnHovered] = React.useState<boolean>(false);
  let onHoveredContent;

  let smallerDate;
  let largerDate;
  if (daysOffset < 0) {
    smallerDate = new Date();
    smallerDate.setDate(smallerDate.getDate() + daysOffset);
    largerDate = new Date();
  } else {
    smallerDate = new Date();
    largerDate = new Date();
    largerDate.setDate(largerDate.getDate() + daysOffset);
  }

  if (!included) {
    onHoveredContent = (
      <div className={styles.hoveredContent}>
        <div className={styles.date}>
          {prettyPrintDate(smallerDate)} -
          <br />
          {prettyPrintDate(largerDate)}
        </div>
        <LinkIcon />
      </div>
    );
  } else {
    onHoveredContent = (
      <div className={styles.hoveredContent}>
        <div className={`${styles.date} ${styles.date__dark}`}>
          {prettyPrintDate(smallerDate)} -
          <br />
          {prettyPrintDate(largerDate)}
        </div>
        <UnlinkIcon />
      </div>
    );
  }

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
          onHoveredContent
        )}
      </div>
    </Table.Cell>
  );
};

export default SalesEstimationStat;
