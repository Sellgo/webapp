import React from 'react';
import { Table } from 'rsuite';

/* Utils */
import { removeSpecialChars, showNAIfZeroOrNull } from '../../../utils/format';

/* Types */
import { RowCell } from '../../../interfaces/Table';
import CopyToClipboard from '../../CopyToClipboard';

/* Row cell, Appends $ sign infront of monetary cells */
const BrandsListCell = (props: RowCell) => {
  const { rowData, dataKey } = props;

  const brands = rowData[dataKey];

  const parsedBrands = JSON.parse(JSON.stringify(brands));

  return (
    <Table.Cell {...props}>
      <div>
        {parsedBrands.length > 0 ? (
          <CopyToClipboard
            displayData={showNAIfZeroOrNull(parsedBrands.length, parsedBrands.length)}
            data={removeSpecialChars(parsedBrands)}
          />
        ) : (
          <span>-</span>
        )}
      </div>
    </Table.Cell>
  );
};

export default BrandsListCell;
