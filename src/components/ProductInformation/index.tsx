import React from 'react';

/* Components */
import CopyAndLocateClipboard from '../CopyAndLocateClipboard';

/* Styling */
import styles from './index.module.scss';

interface Props {
  image_url: string;
  title: string;
  asin: string;
  sku: string;
}

const ProductInformation = (props: Props) => {
  const { image_url, title, asin, sku } = props;
  return (
    <>
      <div className={styles.productInformation}>
        <img src={image_url} className={styles.productImage} />
        <div className={styles.productDetails}>
          <p className={styles.productTitle}>{title}</p>
          <div className={styles.productAttributes}>
            <div className={styles.flagAndAsinCol}>
              <img className={styles.flagIcon} src={require(`../../assets/flags/US.png`)} />
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
      </div>
    </>
  );
};
export default ProductInformation;
