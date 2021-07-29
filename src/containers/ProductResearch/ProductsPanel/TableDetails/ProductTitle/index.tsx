import React from 'react';

/* Styling */
import styles from './index.module.scss';

import CopyAndLocateClipboard from '../../../../../components/CopyAndLocateClipboard';
import CopyToClipboard from '../../../../../components/CopyToClipboard';

interface Props {
  asin: string;
  upc: string;
  img: string;
}

const ProductTitle = (props: Props) => {
  const { asin, upc, img } = props;
  return (
    <div className={styles.productTitle}>
      <img className={styles.productImage} src={img} />
      <p className={styles.productTitleText}>
        ASIN: <CopyAndLocateClipboard data={asin} link={`http://www.amazon.com/dp/${props.asin}`} />
      </p>
      <p className={styles.productTitleText}>
        UPC: <CopyToClipboard data={upc} />
      </p>
    </div>
  );
};

export default ProductTitle;
