import React from 'react';
import { Table } from 'rsuite';
import Rating from 'react-rating';
import { Icon } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Types */
import { RowCell } from '../../../interfaces/Table';

/* Row Cell, for review stars */
const RatingWithCountCell = (props: RowCell) => {
  const { rowData, dataKey = 'rating' } = props;

  const ratingValue = Math.round(parseFloat(rowData[dataKey] || 0));

  return (
    <Table.Cell {...props}>
      <div className={styles.ratingCell}>
        <Rating
          emptySymbol={<Icon name="star outline" color={'grey'} className={styles.ratingIcon} />}
          fullSymbol={<Icon name="star" color={'grey'} className={styles.ratingIcon} />}
          placeholderSymbol={<Icon name="star" color={'grey'} className={styles.ratingIcon} />}
          initialRating={ratingValue}
          readonly
        />
        <p>{rowData.review_count}</p>
      </div>
    </Table.Cell>
  );
};

export default RatingWithCountCell;
