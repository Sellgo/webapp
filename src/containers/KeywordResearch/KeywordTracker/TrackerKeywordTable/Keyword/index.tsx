import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Component */
import CopyAndLocateClipboard from '../../../../../components/CopyAndLocateClipboard';

/* Interface */
import { RowCell } from '../../../../../interfaces/Table';

/* Utils */
import { truncateString } from '../../../../../utils/format';

const Keyword = (props: RowCell) => {
  const { rowData } = props;
  const { phrase, asin } = rowData;

  return (
    <Table.Cell {...props}>
      <div className={styles.searchTermContainer}>
        <CopyAndLocateClipboard
          data={phrase}
          displayData={truncateString(phrase, 60)}
          link={`https://www.amazon.com/s?k=${phrase}`}
          className={styles.searchTerm}
          wrapperClassName={styles.searchTermWrapper}
        />
        {asin && (
          <CopyAndLocateClipboard
            data={asin}
            displayData={asin}
            link={`https://www.amazon.com/dp/${asin}/`}
            wrapperClassName={styles.asinWrapper}
            className={styles.asin}
          />
        )}
      </div>
    </Table.Cell>
  );
};

export default Keyword;
