import React, { memo } from 'react';
import { Table } from 'rsuite';
import Rating from 'react-rating';
import { Icon } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Types */
import { RowCell } from '../../../interfaces/Table';

/* Row Cell, for review stars */
const RatingCell = (props: RowCell) => {
  const { rowData, dataKey = 'rating' } = props;

  const ratingValue = Math.round(parseFloat(rowData[dataKey] || 0));

  return (
    <Table.Cell {...props}>
      <div className={styles.ratingCell}>
        <Rating
          emptySymbol={<Icon name="star outline" className={styles.ratingIcon} />}
          fullSymbol={<Icon name="star" className={styles.ratingIcon} />}
          placeholderSymbol={<Icon name="star" className={styles.ratingIcon} />}
          initialRating={ratingValue}
          readonly
        />
      </div>
    </Table.Cell>
  );
};

export default memo(RatingCell);
