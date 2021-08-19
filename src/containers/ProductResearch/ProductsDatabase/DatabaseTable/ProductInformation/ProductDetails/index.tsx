import React from 'react';
import {
  truncateString,
  formatNumber,
  showNAIfZeroOrNull,
  formatDecimal,
  truncateIntoTwoLines,
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
    // fulfillment,
  } = props;

  // const getFulfillmentString = (fulfillment: any) => {
  //   let fulfillmentString = '';
  //   if (fulfillment.is_fba) {
  //     fulfillmentString += 'FBA, ';
  //   }

  //   if (fulfillment.is_fbm) {
  //     fulfillmentString += 'FBM, ';
  //   }

  //   if (fulfillment.is_amazon) {
  //     fulfillmentString += 'Amazon, ';
  //   }

  //   if (fulfillmentString.length > 0) {
  //     /* Remove trailing comma and space on last item */
  //     fulfillmentString = fulfillmentString.substring(0, fulfillmentString.length - 2);
  //   }

  //   return fulfillmentString;
  // };

  // const fulfilmentString = fulfillment && getFulfillmentString(fulfillment);
  const titleString = title && truncateIntoTwoLines(title, 38, 76);
  return (
    <div className={styles.productDetails}>
      <p className={styles.productDetailsHeading}>{titleString[0]}</p>
      <p className={`${styles.productDetailsHeading} ${styles.productDetailsHeading__bottom}`}>
        {titleString[1]}
      </p>
      {brand && brand.length > 0 && (
        <span>
          <p className={styles.productDetailsText}>
            Category: {truncateString(showNAIfZeroOrNull(category, category), 30)}
          </p>
          <p className={styles.productDetailsText}>
            Brand: {truncateString(showNAIfZeroOrNull(brand, brand), 30)}
          </p>
          {/* <p className={styles.productDetailsText}>
            Fulfillment: {showNAIfZeroOrNull(fulfilmentString, fulfilmentString)}
          </p> */}
          <p className={styles.productDetailsText}>
            Size Tier: {truncateString(showNAIfZeroOrNull(sizeTier, sizeTier), 30)}
          </p>
          <p className={styles.productDetailsText}>
            Number of Images: {formatNumber(numberOfImages)}
          </p>
          <p className={styles.productDetailsText}>
            Variation Count: {showNAIfZeroOrNull(variationCount, formatNumber(variationCount))}
          </p>
          <p className={styles.productDetailsText}>
            Weight (lbs): {showNAIfZeroOrNull(weight, formatDecimal(weight))}
          </p>
          <p className={styles.productDetailsText}>
            Package Dimensions:{' '}
            {truncateString(showNAIfZeroOrNull(packageDimension, packageDimension), 30)}
          </p>
          <p className={styles.productDetailsText}>
            Storage Fee (1,000 units/month):{' '}
            {showNAIfZeroOrNull(storageFee, formatNumber(storageFee))}
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
