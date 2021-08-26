import React from 'react';
import { Table } from 'rsuite';

/* Types */
import { RowCell } from '../../../../../interfaces/Table';

/* Icons */
import DownloadIcon from '../../../../../assets/images/download-solid.svg';

const ReceiptCell = (props: RowCell) => {
  const { rowData, dataKey } = props;

  return (
    <Table.Cell {...props}>
      <a href={rowData[dataKey]} target="__blank">
        <img src={DownloadIcon} alt="download-receipt" />
      </a>
    </Table.Cell>
  );
};

export default ReceiptCell;
