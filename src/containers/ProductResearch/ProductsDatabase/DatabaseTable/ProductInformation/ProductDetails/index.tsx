import React from 'react';
import {
  truncateString,
  formatNumber,
  showNAIfZeroOrNull,
  formatDecimal,
} from '../../../../../../utils/format';

/* Styling */
import styles from './index.module.scss';

interface Props {
  title: string;
  category: string;
  brand: string;
  weight: number;
  sizeTier: string;
  numberOfImages: number;
  packageDimension: string;
  storageFee: number;
  listingAge: number;
  variationCount: number;
  fulfillment?: any;
}

const ProductDetails = (props: Props) => {
  const {
    title,
    category,
    brand,
    weight,
    sizeTier,
    numberOfImages,
    packageDimension,
    storageFee,
    listingAge,
    variationCount,
  } = props;

  return (
    <div className={styles.productDetails}>
      {/* Heading */}
      <h2 className={styles.productDetailsHeading}>{showNAIfZeroOrNull(title, title)}</h2>

      {/* Other Product Details */}
      {brand && brand.length > 0 && (
        <div className={styles.otherProductDetails}>
          {/* Category */}
          <p className={styles.productDetailsText}>
            Category: {truncateString(showNAIfZeroOrNull(category, category), 30)}
          </p>

          {/* Brands */}
          <p className={styles.productDetailsText}>
            Brand: {truncateString(showNAIfZeroOrNull(brand, brand), 30)}
          </p>

          {/* Size Tier */}
          <p className={styles.productDetailsText}>
            Size Tier: {truncateString(showNAIfZeroOrNull(sizeTier, sizeTier), 30)}
          </p>

          {/* Number of Images */}
          <p className={styles.productDetailsText}>
            Number of Images: {formatNumber(numberOfImages)}
          </p>

          {/* Variation Count */}
          <p className={styles.productDetailsText}>
            Variation Count: {showNAIfZeroOrNull(variationCount, formatNumber(variationCount))}
          </p>

          {/* Weight  */}
          <p className={styles.productDetailsText}>
            Weight (lbs): {showNAIfZeroOrNull(weight, formatDecimal(weight))}
          </p>

          {/* Package Dimension */}
          <p className={styles.productDetailsText}>
            Package Dimensions:{' '}
            {truncateString(showNAIfZeroOrNull(packageDimension, packageDimension), 30)}
          </p>

          {/* Storage */}
          <p className={styles.productDetailsText}>
            Storage Fee (1,000 units/month):{' '}
            {showNAIfZeroOrNull(storageFee, formatNumber(storageFee))}
          </p>

          {/* Listing Age */}
          <p className={styles.productDetailsText}>
            Listing Age (months): {formatNumber(listingAge)}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
