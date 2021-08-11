import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import CopyAndLocateClipboard from '../../../CopyAndLocateClipboard';
import CopyToClipboard from '../../../CopyToClipboard';

/* Utils */
import { truncateString } from '../../../../utils/format';

interface Props {
  asin: string;
  image: string;
  upc: string[];
}

const ProductTitle = (props: Props) => {
  const { asin, image, upc } = props;
  const upcString = upc && upc.join(',');

  return (
    <div className={styles.productTitle}>
      <img src={image} className={styles.productImage} />
      <div className={styles.productTitleTextBox}>
        <p className={styles.productTitleText}>ASIN:</p>
        {asin.length > 0 ? (
          <CopyAndLocateClipboard data={asin} link={`http://www.amazon.com/dp/${props.asin}`} />
        ) : (
          '-'
        )}
      </div>
      <div className={styles.productTitleTextBox}>
        <p className={styles.productTitleText}>UPC:</p>
        {upcString && upcString.length > 0 ? (
          <CopyToClipboard
            data={upcString}
            displayData={truncateString(upcString, 9)}
            className={styles.productTitleText}
          />
        ) : (
          '-'
        )}
      </div>
    </div>
  );
};

export default ProductTitle;
