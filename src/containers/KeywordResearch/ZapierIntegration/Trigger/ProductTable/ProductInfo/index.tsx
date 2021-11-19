import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Interfaces */
import { RowCell } from '../../../../../../interfaces/Table';

/* Components */
import CopyAndLocateClipboard from '../../../../../../components/CopyAndLocateClipboard';

/* Utils */
import { truncateString } from '../../../../../../utils/format';

const ProductInfo = (props: RowCell) => {
  const { rowData } = props;

  const { title, asin, image_url } = rowData;

  const truncatedTitle = truncateString(title, 70);

  return (
    <Table.Cell {...props}>
      <div className={styles.productInfoContainer}>
        {/* Product Image */}
        <div className={styles.productImage} style={{ backgroundImage: `url(${image_url})` }} />

        {/* Product Meta Details */}
        <div className={styles.productDetails}>
          {truncatedTitle}

          <div className={styles.productMetaDetails}>
            <img src={require('../../../../../../assets/images/USFlag.png')} alt="American Flag" />
            <CopyAndLocateClipboard
              data={asin}
              displayData={asin}
              link={`https://www.amazon.com/dp/${asin}`}
            />
          </div>
        </div>
      </div>
    </Table.Cell>
  );
};

export default ProductInfo;
