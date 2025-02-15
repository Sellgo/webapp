import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Components */
import CopyAndLocateClipboard from '../../../../../components/CopyAndLocateClipboard';

/* Utils */
import { truncateString } from '../../../../../utils/format';

/* Assets */
import placeholderImage from '../../../../../assets/images/placeholderImage.svg';

/* Interfaces */
import { RowCell } from '../../../../../interfaces/Table';

const ProductInformation = (props: RowCell) => {
  const { rowData } = props;

  const asin = rowData.asin;
  const image = rowData.image_url;
  const productName = rowData.product_name;
  const productLink = rowData.product_url;

  return (
    <Table.Cell {...props}>
      <div className={styles.productInformation}>
        <div className={styles.productImage}>
          <img src={image ? image.replace('SL75', 'SL40') : placeholderImage} alt={productName} />
        </div>

        <div className={styles.productInfo}>
          <h2>{truncateString(productName, 80)}</h2>
          <CopyAndLocateClipboard data={asin} link={productLink} />
        </div>
      </div>
    </Table.Cell>
  );
};

export default ProductInformation;
