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

/* Market place constants */
import { DEFAULT_US_MARKETPLACE } from '../../../../../../constants/Settings';

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

  return (
    <div className={styles.productTitle}>
      <img src={image} className={styles.productImage} />
      <div className={styles.amazonsChoiceOrBestSellerRow}>
        {isBestSeller && <img src={bestSellerImg} className={styles.amazonsChoiceImg} />}
        {isAmazonsChoice && <img src={amazonsChoiceImg} className={styles.amazonsChoiceImg} />}
      </div>

      <div className={styles.flagAndTitleRow}>
        <img
          className={styles.flagIcon}
          src={require(`../../../../../../assets/flags/${DEFAULT_US_MARKETPLACE.code}.png`)}
        />
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
    </div>
  );
};

export default ProductTitle;
