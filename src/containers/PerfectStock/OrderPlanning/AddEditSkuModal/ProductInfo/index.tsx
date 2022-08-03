import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Components */
import CopyAndLocateClipboard from '../../../../../components/CopyAndLocateClipboard';

/* Utils */
import { truncateString } from '../../../../../utils/format';

/* Images */
import placeholderImage from '../../../../../assets/images/placeholderImage.svg';

interface ProductInfo {
  rowData?: any;
  dataKey: string;
  prioritySkuId?: any;
}

const ProductInfo = (props: ProductInfo) => {
  const { rowData, prioritySkuId } = props;

  const { title, asin, image_url } = rowData;
  const productImage = image_url ? image_url.replace('SL75', 'SL140') : placeholderImage;

  const truncatedTitle = truncateString(title, 50);

  return (
    <Table.Cell {...props}>
      <div className={styles.productInfoContainer}>
        {/* Product Image */}
        <img src={productImage} className={styles.productImage} />

        {/* Product Meta Details */}
        <div className={styles.productDetails}>
          <div className={styles.titleContainer}>
            <span>{truncatedTitle}</span>
            <span
              className={`${styles.prioritySku} ${
                prioritySkuId === rowData?.id && styles.prioritySkuBg
              }`}
            >
              {prioritySkuId === rowData?.id && 'Priority SKU'}
            </span>
          </div>
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
