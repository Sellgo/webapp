import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ProductTitle from './ProductTitle';
import ProductDetails from './ProductDetails';

/* Interface */
import { RowCell } from '../../../../../interfaces/Table';

const ProductInformation = (props: RowCell) => {
  const { rowData } = props;

  return (
    <Table.Cell {...props}>
      <div className={styles.productInformationCell}>
        <ProductTitle asin={rowData.asin} image={rowData.image} upc={rowData.upc} />
        <ProductDetails
          weight={rowData.weight_lbs}
          fulfillment={rowData.fulfillment}
          title={rowData.title}
          brand={rowData.brand}
          sizeTier={rowData.size_tier || '-'}
          numberOfImages={rowData.image_count}
          packageDimension={rowData.package_dimension}
          storageFee={rowData.storage_fee}
          listingAge={rowData.listing_age_months}
          category={rowData.category}
          variationCount={rowData.variation_count}
        />
      </div>
    </Table.Cell>
  );
};

export default ProductInformation;
