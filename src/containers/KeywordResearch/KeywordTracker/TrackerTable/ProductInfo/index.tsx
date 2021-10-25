import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Interfaces */
import { RowCell } from '../../../../../interfaces/Table';

/* Components */
import CopyAndLocateClipboard from '../../../../../components/CopyAndLocateClipboard';
import VariationModal from '../VariationModal';

/* Utils */
import { truncateIntoTwoLines } from '../../../../../utils/format';

/* Constants */
import { TRACKER_PRODUCTS_TABLE_UNIQUE_ROW_KEY } from '../../../../../constants/KeywordResearch/KeywordTracker';

const ProductInfo = (props: RowCell) => {
  const { rowData } = props;

  const { title, asin, image_url } = rowData;
  const [isVariationsModalOpen, setVariationModalOpen] = React.useState<boolean>(false);

  const [firstPart, secondPart] = truncateIntoTwoLines(title, 55, 105);

  return (
    <Table.Cell {...props}>
      <VariationModal
        title={title}
        asin={asin}
        image_url={image_url}
        isModalOpen={isVariationsModalOpen}
        setModalOpen={setVariationModalOpen}
        keywordTrackProductId={rowData[TRACKER_PRODUCTS_TABLE_UNIQUE_ROW_KEY]}
      />

      <div className={styles.productInfoContainer}>
        {/* Product Image */}
        <div className={styles.productImage} style={{ backgroundImage: `url(${image_url})` }} />

        {/* Product Meta Details */}
        <div className={styles.productDetails}>
          {firstPart.length > 0 && <h2>{firstPart}</h2>}
          {secondPart.length > 0 && <h2>{secondPart}</h2>}

          <div className={styles.productMetaDetails}>
            <img src={require('../../../../../assets/images/USFlag.png')} alt="American Flag" />
            <CopyAndLocateClipboard
              data={asin}
              displayData={asin}
              link={`https://www.amazon.com/dp/${asin}`}
            />
            <img
              src={require('../../../../../assets/images/variationsIcon.svg')}
              alt="sitemap"
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                setVariationModalOpen(true);
              }}
              className={styles.variationIcon}
            />
          </div>
        </div>
      </div>
    </Table.Cell>
  );
};

export default ProductInfo;
