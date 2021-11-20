import React, { memo } from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import CopyAndLocateClipboard from '../CopyAndLocateClipboard';
import Placeholder from '../Placeholder';

/* Utils */
import { formatNumber, showNAIfZeroOrNull, truncateString } from '../../utils/format';

/* Interfaces */
import { KeywordReverseAsinProduct } from '../../interfaces/KeywordResearch/KeywordReverse';

/* Assets */
import crossIcon from '../../assets/images/removeCross.svg';
import placeholderImage from '../../assets/images/placeholderImage.svg';
import { ReactComponent as BullseyeIcon } from '../../assets/images/bullseye-arrow-regular.svg';

interface Props {
  isLoading: boolean;
  data: KeywordReverseAsinProduct;
  handleRemoveProduct: (asin: string) => void;
  handleCardClick: (asin: string) => void;
  isActive: boolean;
  index: number;
}

const ReverseAsinCard = (props: Props) => {
  const { isLoading, data, handleRemoveProduct, isActive, handleCardClick, index } = props;
  const { asin, image_url, title, sales_monthly, rank } = data;

  const monthlySales = showNAIfZeroOrNull(sales_monthly, formatNumber(sales_monthly));
  const productTitle = title ? truncateString(title, 18) : '-';

  return (
    <div>
      <div
        onClick={e => {
          e.preventDefault();
          handleCardClick(asin);
        }}
        className={`${styles.crown} ${isActive ? styles.crown__active : ''}`}
      >
        {index + 1}
        <BullseyeIcon className={styles.bullsEyeIcon} />
      </div>
      <div className={styles.reverseAsinCard}>
        <img
          src={crossIcon}
          className={styles.removeAsinIcon}
          onClick={(e: any) => {
            e.preventDefault();
            e.stopPropagation();
            handleRemoveProduct(asin);
          }}
        />
        <p className={styles.title}>{productTitle}</p>

        <CopyAndLocateClipboard
          data={asin}
          wrapperClassName={styles.asinWrapper}
          className={styles.asin}
          link={`https://www.amazon.com/dp/${asin}`}
        />
        <div className={styles.salesAndRank}>
          <p className={styles.salesPerMonth}>
            <span>{monthlySales}</span>
            <br />
            Sold/mo
          </p>
          <p className={styles.rank}>
            <span>#{rank}</span>
            <br />
            Rank
          </p>
        </div>

        <div className={styles.productImage}>
          <img src={image_url ? image_url : placeholderImage} alt={title} />
        </div>

        {isLoading && (
          <div className={styles.loader}>
            <Placeholder numberRows={3} numberParagraphs={1} />
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(ReverseAsinCard);
