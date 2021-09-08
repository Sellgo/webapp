import React from 'react';
import { connect } from 'react-redux';

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
import { fetchKeywordReverseRequestId } from '../../../../actions/KeywordResearch/KeywordReverse';

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
}

const ReverseAsinDisplay = (props: Props) => {
  const { keywordReverseProductsList } = props;

  const totalProducts = keywordReverseProductsList.length;

  return (
    <div className={styles.reverseAsinDisplay}>
      <h2>Asin-Keyword Reversal Results</h2>

      <div className={styles.reverseAsinCardsWrapper}>
        {keywordReverseProductsList &&
          keywordReverseProductsList.map(keywordProduct => {
            const { asin, image_url, title, sales_monthly, id } = keywordProduct;

            const monthlySales = showNAIfZeroOrNull(sales_monthly, formatNumber(sales_monthly));
            const productTitle = title ? truncateString(title, 20) : '-';

            return (
              <>
                <div className={styles.reverseAsinCard} key={id}>
                  <RemoveCrossIcon className={styles.removeAsinIcon} />
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
              </>
            );
          })}

        {totalProducts < MAX_ASINS_ALLOWED && (
          <div className={styles.addAsinCard}>
            <p>Add ASin</p>
          </div>
        )}
      </div>
    </div>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReverseAsinDisplay);
