import React from 'react';
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
  mainreviewkey: string;
  positivereviewkey: string;
  neutralreviewkey: string;
  negativereviewkey: string;
}

/* Row cell, Appends $ sign infront of monetary cells */
const ExtendedReviewsCell = (props: Props) => {
  const { rowData, mainreviewkey, positivereviewkey, neutralreviewkey, negativereviewkey } = props;

  const mainReviewCount = formatNumber(rowData[mainreviewkey]);
  const positiveReviewCount = rowData[positivereviewkey];
  const neutralReviewCount = rowData[neutralreviewkey];
  const negativeReviewCount = rowData[negativereviewkey];

  return (
    <Table.Cell {...props}>
      <div className={styles.extendedReviewsCell}>
        <p>{showNAIfZeroOrNull(mainReviewCount, mainReviewCount)}</p>

        <div className={styles.groupedReviewCategory}>
          <div className={styles.reviewCategory}>
            <PositiveReview />
            <span>{showNAIfZeroOrNull(positiveReviewCount, `${positiveReviewCount}%`)}</span>
          </div>

          <div className={styles.reviewCategory}>
            <NeutralReview />
            <span>{showNAIfZeroOrNull(neutralReviewCount, `${neutralReviewCount}%`)}</span>
          </div>

          <div className={styles.reviewCategory}>
            <NegativeReview />
            <span>{showNAIfZeroOrNull(negativeReviewCount, `${negativeReviewCount}%`)}</span>
          </div>
        </div>
      </div>
    </Table.Cell>
  );
};

export default ExtendedReviewsCell;
