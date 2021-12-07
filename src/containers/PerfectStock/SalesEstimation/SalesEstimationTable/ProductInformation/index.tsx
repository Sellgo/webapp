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
  const { image, asin, title } = rowData;
  const productImage = image ? image.replace('SL75', 'SL140') : placeholderImage;

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
                <span className={styles.upcText}>SKU_NAME</span>
              </div>
            </div>
            <div className={styles.sizeTierAndStatusCol}>
              <span> Size Tier </span>
              <span> Status </span>
            </div>
          </div>
        </div>
      </div>
    </Table.Cell>
  );
};

export default ProductInformation;
