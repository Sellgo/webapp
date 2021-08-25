import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Interfaces */
import { RowCell } from '../../../../../interfaces/Table';

/* Components */
import CopyToClipboard from '../../../../../components/CopyToClipboard';

/* Utils */
import { truncateIntoTwoLines } from '../../../../../utils/format';

const ProductInfo = (props: RowCell) => {
  const [firstPart, secondPart] = truncateIntoTwoLines(
    'Title of the product Title of the product Title of the product',
    45,
    70
  );

  return (
    <Table.Cell {...props}>
      <div className={styles.productInfoContainer}>
        {/* Product Image */}
        <div className={styles.productImage}>
          <img
            src={require('../../../../../assets/images/Image 37.png')}
            alt="Product name goes here"
          />
        </div>

        {/* Product Meta Details */}
        <div className={styles.productDetails}>
          {firstPart.length > 0 && <h2>{firstPart}</h2>}
          {secondPart.length > 0 && <h2>{secondPart}</h2>}

          <div className={styles.productMetaDetails}>
            <img src={require('../../../../../assets/images/USFlag.png')} alt="American Flag" />
            <CopyToClipboard data={'B078WLH42J'} displayData={'B078WLH42J'} />
          </div>
        </div>
      </div>
    </Table.Cell>
  );
};

export default ProductInfo;
