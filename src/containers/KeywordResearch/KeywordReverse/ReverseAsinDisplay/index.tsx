import React from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';

/* Styling */
import styles from './index.module.scss';

/* Components */
import CopyToClipboard from '../../../../components/CopyToClipboard';

/* Selectors */
import {
  getIsLoadingKeywordReverseProductsList,
  getKeywordReverseProductsList,
} from '../../../../selectors/KeywordResearch/KeywordReverse';

/* Actions */
import {
  fetchKeywordReverseRequestId,
  setKeywordReverseProductsList,
} from '../../../../actions/KeywordResearch/KeywordReverse';

/* Assets */
import { ReactComponent as RemoveCrossIcon } from '../../../../assets/images/removeCross.svg';
import placeholderImage from '../../../../assets/images/placeholderImage.svg';

/* Interfaces */
import { KeywordReverseAsinProduct } from '../../../../interfaces/KeywordResearch/KeywordReverse';

/* Utils */
import { formatNumber, showNAIfZeroOrNull, truncateString } from '../../../../utils/format';

/* Constants */
import { MAX_ASINS_ALLOWED } from '../../../../constants/KeywordResearch/KeywordReverse';

interface Props {
  isLoadingKeywordReverseProductsList: boolean;
  keywordReverseProductsList: KeywordReverseAsinProduct[];
  setKeywordReverseProductsList: (payload: KeywordReverseAsinProduct[]) => void;
}

const ReverseAsinDisplay = (props: Props) => {
  const {
    keywordReverseProductsList,
    isLoadingKeywordReverseProductsList,
    setKeywordReverseProductsList,
  } = props;

  const totalProducts = keywordReverseProductsList.length;

  // Handle a proudtc removal
  const removeProduct = (asinToRemove: string) => {
    const currentProducts = keywordReverseProductsList;

    const updatedProducts =
      currentProducts &&
      currentProducts.filter(product => {
        return product.asin !== asinToRemove;
      });

    setKeywordReverseProductsList(updatedProducts);
  };

  return (
    <section className={styles.reverseAsinDisplay}>
      <h2>Asin-Keyword Reversal Results</h2>

      <div className={styles.reverseAsinCardsWrapper}>
        {keywordReverseProductsList &&
          keywordReverseProductsList.map(keywordProduct => {
            const { asin, image_url, title, sales_monthly } = keywordProduct;

            const monthlySales = showNAIfZeroOrNull(sales_monthly, formatNumber(sales_monthly));
            const productTitle = title ? truncateString(title, 20) : '-';

            return (
              <div
                className={styles.reverseAsinCard}
                style={{ opacity: isLoadingKeywordReverseProductsList ? 0.5 : 1 }}
                key={uuid()}
              >
                <RemoveCrossIcon
                  className={styles.removeAsinIcon}
                  onClick={() => removeProduct(asin)}
                />
                <p className={styles.title}>{productTitle}</p>

                <CopyToClipboard data={asin} className={styles.asin} />
                <p className={styles.salesPerMonth}>
                  <span>{monthlySales}</span> <br />
                  Sales/mo
                </p>
                <div className={styles.productImage}>
                  <img src={image_url ? image_url : placeholderImage} alt={title} />
                </div>
              </div>
            );
          })}

        {totalProducts < MAX_ASINS_ALLOWED && (
          <div className={styles.addAsinCard}>
            <p>Add ASin</p>
          </div>
        )}
      </div>
    </section>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isLoadingKeywordReverseProductsList: getIsLoadingKeywordReverseProductsList(state),
    keywordReverseProductsList: getKeywordReverseProductsList(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchKeywordReverseRequestId: (payload: string) =>
      dispatch(fetchKeywordReverseRequestId(payload)),
    setKeywordReverseProductsList: (payload: KeywordReverseAsinProduct[]) =>
      dispatch(setKeywordReverseProductsList(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReverseAsinDisplay);
