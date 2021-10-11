import React, { memo } from 'react';
import { Table } from 'rsuite';
import Rating from 'react-rating';
import { Icon } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Types */
import { RowCell } from '../../../interfaces/Table';

interface Props extends RowCell {
  asRounded?: boolean;
}
/* Row Cell, for review stars */
const RatingCell = (props: Props) => {
  const { asRounded = true, ...otherProps } = props;

  const { rowData, dataKey = 'rating' } = otherProps;

  const rating = parseFloat(rowData[dataKey] || 0);

  const ratingValue = asRounded ? Math.round(rating) : rating;

  return (
    <Table.Cell {...otherProps}>
      <div className={styles.ratingCell}>
        <Rating
          emptySymbol={<Icon name="star outline" className={styles.ratingIcon} />}
          fullSymbol={<Icon name="star" className={styles.ratingIcon} />}
          placeholderSymbol={<Icon name="star" className={styles.ratingIcon} />}
          initialRating={ratingValue}
          readonly
          fractions={2}
        />
      </div>
    </Table.Cell>
  );
};

export default memo(RatingCell);
