import React from 'react';

/* Styling */
import styles from './index.module.scss';

interface Props {
  title: string;
  category: string;
  brand: string;
  fulfilment: string;
  size_tier: string;
  number_of_images: number;
  variation_count: number;
  multipack: string;
  weight_lbs: number;
  package_dimensions: string;
  storage_fees: number;
  listing_age: number;
  kpi_1: string;
  kpi_2: string;
  kpi_3: string;
}

const ProductDetails = (props: Props) => {
  return (
    <div className={styles.productDetails}>
      <h3 className={styles.productDetailsHeading}>{props.title}</h3>
      <p className={styles.productDetailsText}>Category: {props.category}</p>
      <p className={styles.productDetailsText}>Brand: {props.brand}</p>
      <p className={styles.productDetailsText}>Fulfilment: {props.fulfilment}</p>
      <p className={styles.productDetailsText}>Size Tier: {props.size_tier}</p>
      <p className={styles.productDetailsText}>Number of Images: {props.number_of_images}</p>
      <p className={styles.productDetailsText}>Variation Count: {props.variation_count}</p>
      <p className={styles.productDetailsText}>Multipack: {props.multipack}</p>
      <p className={styles.productDetailsText}>Weight: {props.weight_lbs}</p>
      <p className={styles.productDetailsText}>Package Dimensions: {props.package_dimensions}</p>
      <p className={styles.productDetailsText}>
        Storage Fee (1,000 units/ month): {props.storage_fees}
      </p>
      <p className={styles.productDetailsText}>Listing age (months): {props.listing_age}</p>
      <p className={styles.productDetailsText}>KPI: {props.kpi_1}</p>
      <p className={styles.productDetailsText}>KPI: {props.kpi_2}</p>
      <p className={styles.productDetailsText}>KPI: {props.kpi_3}</p>
    </div>
  );
};

export default ProductDetails;
