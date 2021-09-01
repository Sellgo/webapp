import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Interfaces */
import { RowCell } from '../../../../../interfaces/Table';

/* Components */
import CopyAndLocateClipboard from '../../../../../components/CopyAndLocateClipboard';

/* Utils */
import { truncateIntoTwoLines } from '../../../../../utils/format';

const ProductInfo = (props: RowCell) => {
  const { rowData } = props;

  const { title, asin, image_url } = rowData;

  const [firstPart, secondPart] = truncateIntoTwoLines(title, 55, 105);

  return (
    <Table.Cell {...props}>
      <div className={styles.productInfoContainer}>
        {/* Product Image */}
        <div className={styles.productImage}>
          <img src={image_url} alt={title} />
        </div>

        {/* Product Meta Details */}
        <div className={styles.productDetails}>
          {firstPart.length > 0 && <h2>{firstPart}</h2>}
          {secondPart.length > 0 && <h2>{secondPart}</h2>}

          <div className={styles.productMetaDetails}>
            <img src={require('../../../../../assets/images/USFlag.png')} alt="American Flag" />
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
