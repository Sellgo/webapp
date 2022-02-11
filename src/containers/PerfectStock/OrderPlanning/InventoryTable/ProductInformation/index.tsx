import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Components */
import CopyAndLocateClipboard from '../../../../../components/CopyAndLocateClipboard';

/* Images */
import placeholderImage from '../../../../../assets/images/placeholderImage.svg';

/* Interface */
import { RowCell } from '../../../../../interfaces/Table';

const ProductInformation = (props: RowCell) => {
  const { rowData } = props;
  const { image_url, asin, title, sku } = rowData;
  const productImage = image_url ? image_url.replace('SL75', 'SL140') : placeholderImage;

  return (
    <Table.Cell {...props}>
      <div className={styles.productInformation}>
        {/* Product Image */}
        <img src={productImage} className={styles.productImage} />
        <div className={styles.productDetails}>
          <p className={styles.productTitle}>{title}</p>

          <div className={styles.productAttributes}>
            <div className={styles.flagAndAsinCol}>
              <img
                className={styles.flagIcon}
                src={require(`../../../../../assets/flags/US.png`)}
              />
              {/* ASIN and UPC details */}
              <div className={styles.productTitleTextBox}>
                {/* ASIN */}
                {asin.length > 0 ? (
                  <CopyAndLocateClipboard
                    data={asin}
                    link={`http://www.amazon.com/dp/${asin}`}
                    className={styles.productAsin}
                  />
                ) : (
                  '-'
                )}

                {/* UPC */}
                <span className={styles.upcText}>{sku}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.productMetaDetailWrapper}>
          <div className={styles.productMetaDetail}>
            <div className={`${styles.circle} ${styles.circle__green}`} />
            {rowData.active_purchase_orders} Orders
          </div>
          <div className={styles.productMetaDetail}>
            <div className={`${styles.circle} ${styles.circle__orange}`} />
            {rowData.fulfillment_channel === 'fba' ? 'FBA' : 'FBM'}
          </div>
        </div>
      </div>
    </Table.Cell>
  );
};

export default ProductInformation;
