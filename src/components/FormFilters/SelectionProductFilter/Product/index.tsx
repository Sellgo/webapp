import React from 'react';
import CopyAndLocateClipboard from '../../../CopyAndLocateClipboard';

/* Styling */
import styles from './index.module.scss';

interface Props {
  productName: string;
  skuName?: string;
  asin: string;
  img: string;
  activePurchaseOrders?: number;
  fulfillmentChannel?: string;
  skuStatus?: string;
}

const Product: React.FC<Props> = (props: Props) => {
  const {
    productName,
    asin,
    img,
    skuName,
    activePurchaseOrders,
    fulfillmentChannel,
    skuStatus,
  } = props;
  return (
    <div className={styles.productInformation}>
      {/* Product Image */}
      <img src={img} className={styles.productImage} />
      <div className={styles.productDetails}>
        <p className={styles.productTitle}>{productName}</p>

        <div className={styles.productAttributes}>
          <div className={styles.flagAndAsinCol}>
            <img className={styles.flagIcon} src={require(`../../../../assets/flags/US.png`)} />
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
              <span className={styles.upcText}>{skuName}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.productMetaDetailWrapper}>
        <div className={styles.productMetaDetail}>
          <div className={`${styles.circle} ${styles.circle__green}`} />
          {activePurchaseOrders} Orders
        </div>
        <div className={styles.productMetaDetail}>
          <div className={`${styles.circle} ${styles.circle__orange}`} />
          {fulfillmentChannel === 'fba' ? 'FBA' : 'FBM'}
        </div>
        <div className={styles.productMetaDetail}>
          <div className={`${styles.circle} ${styles.circle__blue}`} />
          {skuStatus === 'active' ? 'Active' : 'Inactive'}
        </div>
      </div>
    </div>
  );
};

export default Product;
