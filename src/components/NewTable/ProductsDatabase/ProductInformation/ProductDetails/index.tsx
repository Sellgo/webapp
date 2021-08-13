import React from 'react';
import { truncateString } from '../../../../../utils/format';

/* Styling */
import styles from './index.module.scss';

interface Props {
  title: string;
  brand: string;
}

const ProductDetails = (props: Props) => {
  const { brand, title } = props;

  return (
    <div className={styles.productDetails}>
      <h3 className={styles.productDetailsHeading}>{truncateString(title, 15)}</h3>
      {brand && brand.length > 0 && (
        <p className={styles.productDetailsText}>Brand: {truncateString(brand, 25)}</p>
      )}
    </div>
  );
};

export default ProductDetails;
