import React from 'react';
import { Table } from 'rsuite';

/* Styles */
import styles from './index.module.scss';

/* Components */
import CopyAndLocateClipboard from '../../../../../components/CopyAndLocateClipboard';

/* Interface */
import { RowCell } from '../../../../../interfaces/Table';

const SearchTerm = (props: RowCell) => {
  const { rowData, dataKey } = props;

  const phrase = rowData[dataKey];

  return (
    <Table.Cell {...props}>
      <div className={styles.searchTermContainer}>
        <CopyAndLocateClipboard
          data={phrase}
          displayData={phrase}
          className={styles.searchTerm}
          link={`https://www.amazon.com/s?k=${phrase}`}
        />
      </div>
    </Table.Cell>
  );
};

export default SearchTerm;
