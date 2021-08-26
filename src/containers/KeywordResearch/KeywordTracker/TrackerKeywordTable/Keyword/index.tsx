import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Component */
import CopyToClipboard from '../../../../../components/CopyToClipboard';

/* Interface */
import { RowCell } from '../../../../../interfaces/Table';

/* Utils */
import { truncateString } from '../../../../../utils/format';

const Keyword = (props: RowCell) => {
  const { rowData } = props;

  const { phrase } = rowData;

  return (
    <Table.Cell {...props}>
      <div className={styles.keyword}>
        <CopyToClipboard data={phrase} displayData={truncateString(phrase, 100)} />
      </div>
    </Table.Cell>
  );
};

export default Keyword;
