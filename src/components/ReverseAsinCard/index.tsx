import React, { memo } from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import CopyAndLocateClipboard from '../CopyAndLocateClipboard';

/* Utils */
import { formatNumber, showNAIfZeroOrNull, truncateString } from '../../utils/format';

/* Interfaces */
import { KeywordReverseAsinProduct } from '../../interfaces/KeywordResearch/KeywordReverse';

/* Assets */
import crossIcon from '../../assets/images/removeCross.svg';
import placeholderImage from '../../assets/images/placeholderImage.svg';
import loadingAnimation from '../../assets/images/sellgo-loading-animation-450-1.gif';

interface Props {
  isLoading: boolean;
  data: KeywordReverseAsinProduct;
  handleRemoveProduct: (asin: string) => void;
  isActive: boolean;
}

const ReverseAsinCard = (props: Props) => {
  const { isLoading, data, handleRemoveProduct, isActive } = props;

  const { asin, image_url, title, sales_monthly } = data;

  const monthlySales = showNAIfZeroOrNull(sales_monthly, formatNumber(sales_monthly));
  const productTitle = title ? truncateString(title, 20) : '-';

  const asinCardClasses = `${styles.reverseAsinCard} ${isActive ? styles.activeCard : ''} `;

  return (
    <div className={asinCardClasses}>
      <img
        src={crossIcon}
        className={styles.removeAsinIcon}
        onClick={() => handleRemoveProduct(asin)}
      />
      <p className={styles.title}>{productTitle}</p>

      <CopyAndLocateClipboard
        data={asin}
        className={styles.asin}
        link={`https://www.amazon.com/dp/${asin}`}
      />

      <p className={styles.salesPerMonth}>
        <span>{monthlySales}</span> <br />
        Sales/mo
      </p>

      <div className={styles.productImage}>
        <img src={image_url ? image_url : placeholderImage} alt={title} />
      </div>

      {isLoading && (
        <div className={styles.loader}>
          <img src={loadingAnimation} alt="" />
        </div>
      )}
    </div>
  );
};

export default memo(ReverseAsinCard);
