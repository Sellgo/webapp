import React from 'react';
import { Table } from 'rsuite';
import { Rating } from 'semantic-ui-react';

/* Types */
import { RowCell } from '../../../interfaces/Table';

/* Row Cell, for review stars */
const RatingCell = (props: RowCell) => {
  const { rowData } = props;
  return (
    <Table.Cell {...props}>
      <Rating defaultRating={rowData.rating} maxRating={5} disabled fractions={2} />
    </Table.Cell>
  );
};

export default RatingCell;
