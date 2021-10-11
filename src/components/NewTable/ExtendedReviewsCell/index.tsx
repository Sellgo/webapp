import React, { memo } from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Utils */
import { formatNumber, showNAIfZeroOrNull } from '../../../utils/format';

/* Assets */
import { ReactComponent as PositiveReview } from '../../../assets/images/positiveReview.svg';
import { ReactComponent as NegativeReview } from '../../../assets/images/negativeReview.svg';
import { ReactComponent as NeutralReview } from '../../../assets/images/neutralReview.svg';

/* Types */
import { RowCell } from '../../../interfaces/Table';

interface Props extends RowCell {
  mainReviewKey: string;
  positiveReviewKey: string;
  neutralReviewKey: string;
  negativeReviewKey: string;
}

/* Row cell, Appends $ sign infront of monetary cells */
const ExtendedReviewsCell = (props: Props) => {
  const {
    mainReviewKey,
    positiveReviewKey,
    neutralReviewKey,
    negativeReviewKey,
    ...otherProps
  } = props;

  const { rowData } = otherProps;

  const mainReviewCount = formatNumber(rowData[mainReviewKey]);
  const positiveReviewCount = rowData[positiveReviewKey];
  const neutralReviewCount = rowData[neutralReviewKey];
  const negativeReviewCount = rowData[negativeReviewKey];

  return (
    <Table.Cell {...otherProps}>
      <div className={styles.extendedReviewsCell}>
        <p>{showNAIfZeroOrNull(mainReviewCount, mainReviewCount)}</p>

        <div className={styles.groupedReviewCategory}>
          <div className={styles.reviewCategory}>
            <PositiveReview />
            <span>{showNAIfZeroOrNull(positiveReviewCount, `${positiveReviewCount}`)}</span>
          </div>

          <div className={styles.reviewCategory}>
            <NeutralReview />
            <span>{showNAIfZeroOrNull(neutralReviewCount, `${neutralReviewCount}`)}</span>
          </div>

          <div className={styles.reviewCategory}>
            <NegativeReview />
            <span>{showNAIfZeroOrNull(negativeReviewCount, `${negativeReviewCount}`)}</span>
          </div>
        </div>
      </div>
    </Table.Cell>
  );
};

export default memo(ExtendedReviewsCell);
