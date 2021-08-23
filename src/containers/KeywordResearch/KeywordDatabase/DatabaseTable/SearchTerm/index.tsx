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
  const { rowData } = props;

  const { phrase, amazon_choice_asins, best_seller_asins } = rowData;
  return (
    <Table.Cell {...props}>
      <div className={styles.searchTermContainer}>
        <CopyAndLocateClipboard
          data={phrase}
          displayData={phrase}
          className={styles.searchTerm}
          link={`https://www.amazon.com/s?k=${phrase}`}
        />
        <div className={styles.labels}>
          {amazon_choice_asins > 0 ? <AmazonChoiceLabel /> : null}
          {best_seller_asins > 0 ? (
            <img src={bestSellerLabel} alt="Amazon Best Seller Label" />
          ) : null}
        </div>
      </div>
    </Table.Cell>
  );
};

export default SearchTerm;
