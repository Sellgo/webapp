import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import CopyAndLocateClipboard from '../../../../../components/CopyAndLocateClipboard';

interface Props {
  asin: string;
}

const ProductTitle = (props: Props) => {
  const { asin } = props;
  return (
    <div className={styles.productTitle}>
      <p className={styles.productTitleText}>
        ASIN: <CopyAndLocateClipboard data={asin} link={`http://www.amazon.com/dp/${props.asin}`} />
      </p>
    </div>
  );
};

export default ProductTitle;
