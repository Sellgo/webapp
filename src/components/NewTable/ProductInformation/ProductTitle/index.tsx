import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import CopyAndLocateClipboard from '../../../CopyAndLocateClipboard';

interface Props {
  asin: string;
  image: string;
}

const ProductTitle = (props: Props) => {
  const { asin, image } = props;
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
    </div>
  );
};

export default ProductTitle;
