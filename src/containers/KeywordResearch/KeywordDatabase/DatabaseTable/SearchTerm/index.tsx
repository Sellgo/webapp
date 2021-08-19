import React from 'react';
import { Table } from 'rsuite';

/* Styles */
import styles from './index.module.scss';

/* Components */
import CopyAndLocateClipboard from '../../../../../components/CopyAndLocateClipboard';

/* Assets */
import { ReactComponent as AmazonChoiceLabel } from '../../../../../assets/images/amazon_choice.svg';
import bestSellerLabel from '../../../../../assets/images/best-seller.png';

/* Interface */
import { RowCell } from '../../../../../interfaces/Table';

const SearchTerm = (props: RowCell) => {
  return (
    <Table.Cell {...props}>
      <div className={styles.searchTermContainer}>
        <CopyAndLocateClipboard
          data={'fidget toys'}
          displayData={'fidget toys'}
          className={styles.searchTerm}
          link={`https://www.amazon.com/s?k=${''}`}
        />
        <div className={styles.labels}>
          {<AmazonChoiceLabel />}
          {<img src={bestSellerLabel} alt="Amazon Best Seller Label" />}
        </div>
      </div>
    </Table.Cell>
  );
};

export default SearchTerm;
