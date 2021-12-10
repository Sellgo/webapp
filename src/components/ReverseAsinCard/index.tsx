import React, { memo } from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import CopyAndLocateClipboard from '../CopyAndLocateClipboard';
import Placeholder from '../Placeholder';

/* Utils */
import { prettyPrintNumber, showNAIfZeroOrNull, truncateString } from '../../utils/format';

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
  const { asin, image_url, title, sales_monthly, rank, keywords_count } = data;

  const keywordsCount = showNAIfZeroOrNull(keywords_count, prettyPrintNumber(keywords_count));
  const monthlySales = showNAIfZeroOrNull(sales_monthly, prettyPrintNumber(sales_monthly));
  const productTitle = title ? truncateString(title, 18) : '-';

  // const handleCheckProduct = () => {
  //   const sellerID = sellerIDSelector();
  //   const query = encodeBase64(`sellerId=${sellerID}&asin=${asin}`);
  //   window.open(`${AppConfig.BASE_URL}/product-research/database?query=${query}`, '_blank');
  // };

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
        <div className={styles.keywordsAndRank}>
          <p className={styles.keywordsCount}>
            <span>{keywordsCount}</span>
            <br />
            Keywords
          </p>
          <p className={styles.rank}>
            <span>#{rank}</span>
            <br />
            Rank
          </p>
        </div>
        <p className={styles.sales}>
          <span>{monthlySales} </span>Sold
        </p>

        <img
          src={image_url ? image_url : placeholderImage}
          alt={title}
          className={styles.productImage}
        />

        {/* <button className={styles.checkProductLink} onClick={handleCheckProduct}>
          Check Product Database&nbsp;
          <Icon name="arrow right" />
        </button> */}

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
