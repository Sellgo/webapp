import React from 'react';
import { truncateString, formatNumber } from '../../../../utils/format';

/* Styling */
import styles from './index.module.scss';

interface Props {
  title: string;
  category: string;
  brand: string;
  sizeTier: string;
  numberOfImages: number;
  packageDimension: string;
  storageFee: number;
  listingAge: number;
  variationCount: number;
}

const ProductDetails = (props: Props) => {
  const {
    title,
    category,
    brand,
    sizeTier,
    numberOfImages,
    packageDimension,
    storageFee,
    listingAge,
    variationCount,
  } = props;

  return (
    <div className={styles.productDetails}>
      <h3 className={styles.productDetailsHeading}>{truncateString(title, 15)}</h3>
      {brand && brand.length > 0 && (
        <span>
          <p className={styles.productDetailsText}>Category: {truncateString(category, 20)}</p>
          <p className={styles.productDetailsText}>Brand: {truncateString(brand, 20)}</p>
          <p className={styles.productDetailsText}>Size Tier: {truncateString(sizeTier, 20)}</p>
          <p className={styles.productDetailsText}>
            Number of Images: {formatNumber(numberOfImages)}
          </p>
          <p className={styles.productDetailsText}>
            Variation Count: {formatNumber(variationCount)}
          </p>
          <p className={styles.productDetailsText}>
            Package Dimensions: {truncateString(packageDimension, 20)}
          </p>
          <p className={styles.productDetailsText}>
            Storage Fee (1,000 units/month): {formatNumber(storageFee)}
          </p>
          <p className={styles.productDetailsText}>
            Listing Age (months): {formatNumber(listingAge)}
          </p>
        </span>
      )}
    </div>
  );
};

export default ProductDetails;
