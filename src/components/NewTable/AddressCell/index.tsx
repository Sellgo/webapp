import React, { memo } from 'react';
import { Table } from 'rsuite';

/* Styles */
import styles from './index.module.scss';

/* Types */
import { RowCell } from '../../../interfaces/Table';

interface Props extends RowCell {
  textAlign?: 'left' | 'right' | 'center';
}

/* Row cell, Appends $ sign infront of monetary cells */
const AddressCell = (props: Props) => {
  const { rowData, textAlign } = props;
  const businessAddress = rowData.address;
  const businessCity = rowData.city;
  const businessZipCode = rowData.zip_code;
  const businessCountry = rowData.country;
  const businessState = rowData.state;
  return (
    <Table.Cell {...props}>
      <div
        className={styles.address}
        style={{
          textAlign,
        }}
      >
        <p>{businessAddress ? businessAddress : '-'}</p>

        <p>{businessCity ? businessCity : '-'}</p>
        <p>
          {businessState &&
            businessZipCode &&
            businessCountry &&
            `${businessState}, ${businessZipCode}, ${businessCountry}`}
        </p>
      </div>
    </Table.Cell>
  );
};

export default memo(AddressCell);
