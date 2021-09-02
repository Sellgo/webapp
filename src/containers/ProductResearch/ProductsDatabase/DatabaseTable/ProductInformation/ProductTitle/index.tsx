import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import CopyAndLocateClipboard from '../../../../../../components/CopyAndLocateClipboard';
import CopyToClipboard from '../../../../../../components/CopyToClipboard';

/* Utils */
import { truncateString } from '../../../../../../utils/format';

interface Props {
  asin: string;
  image: string;
  upc: string[];
}

const ProductTitle = (props: Props) => {
  const { asin, image, upc } = props;
  const upcString = upc && upc.join(',');

  let upcDisplayString;
  if (upcString && upc.length === 1) {
    upcDisplayString = upcString;
  } else if (upcString && upc.length > 0) {
    upcDisplayString = truncateString(upcString, 9);
  } else {
    upcDisplayString = '';
  }

  return (
    <div className={styles.productTitle}>
      <img src={image} className={styles.productImage} />
      <div className={styles.productTextWrapper}>
        {/* ASIN */}
        <div className={styles.productTitleTextBox}>
          <p className={styles.productTitleText}>ASIN:</p>
          {asin.length > 0 ? (
            <CopyAndLocateClipboard
              data={asin}
              link={`http://www.amazon.com/dp/${props.asin}`}
              className={styles.productAsin}
            />
          ) : (
            '-'
          )}
        </div>
        {/* UPC */}
        <div className={styles.productTitleTextBox}>
          <p className={styles.productTitleText}>UPC:</p>
          {upcString && upcString.length > 0 ? (
            <CopyToClipboard
              data={upcString}
              displayData={upcDisplayString}
              className={styles.productTitleText}
            />
          ) : (
            '-'
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductTitle;
