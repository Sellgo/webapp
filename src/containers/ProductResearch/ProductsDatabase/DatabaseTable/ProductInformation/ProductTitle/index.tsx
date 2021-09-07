import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import CopyAndLocateClipboard from '../../../../../../components/CopyAndLocateClipboard';
import CopyToClipboard from '../../../../../../components/CopyToClipboard';

/* Utils */
import { truncateString } from '../../../../../../utils/format';

/* Images */
import amazonsChoiceImg from '../../../../../../assets/images/amazon_choice.svg';
import bestSellerImg from '../../../../../../assets/images/best-seller.png';
import placeholderImage from '../../../../../../assets/images/placeholderImage.svg';

interface Props {
  asin: string;
  image: string;
  upc: string[];
  isAmazonsChoice: boolean;
  isBestSeller: boolean;
}

const ProductTitle = (props: Props) => {
  const { asin, image, upc, isAmazonsChoice, isBestSeller } = props;
  const upcString = upc && upc.join(',');

  let upcDisplayString;
  if (upcString && upc.length === 1) {
    upcDisplayString = upcString;
  } else if (upcString && upc.length > 0) {
    upcDisplayString = truncateString(upcString, 9);
  } else {
    upcDisplayString = '';
  }

  // use image with size 140
  const productImage = image ? image.replace('SL75', 'SL140') : placeholderImage;

  return (
    <div className={styles.productTitle}>
      <img src={productImage} className={styles.productImage} />
      <div className={styles.flagAndTitleRow}>
        <img className={styles.flagIcon} src={require(`../../../../../../assets/flags/US.png`)} />
        <div className={styles.productTitleTextBox}>
          {asin.length > 0 ? (
            <CopyAndLocateClipboard data={asin} link={`http://www.amazon.com/dp/${props.asin}`} />
          ) : (
            '-'
          )}
          <span className={styles.upcText}>
            {upcString && upcString.length > 0 ? (
              <CopyToClipboard
                data={upcString}
                displayData={upcDisplayString}
                className={styles.upcText}
              />
            ) : (
              '-'
            )}
          </span>
        </div>
      </div>
      <div className={styles.amazonsChoiceOrBestSellerRow}>
        {isBestSeller && <img src={bestSellerImg} className={styles.amazonsChoiceImg} />}
        {isAmazonsChoice && <img src={amazonsChoiceImg} className={styles.amazonsChoiceImg} />}
      </div>
    </div>
  );
};

export default ProductTitle;
