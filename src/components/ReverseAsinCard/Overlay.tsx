import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Selectors */
import { getKeywordReverseProductsList } from '../../selectors/KeywordResearch/KeywordReverse';

/* Actions */
import { fetchKeywordReverseRequestId } from '../../actions/KeywordResearch/KeywordReverse';

/* Components */
import CopyToClipboard from '../CopyToClipboard';

/* Assets */
import crossIcon from '../../assets/images/removeCross.svg';
import placeholderImage from '../../assets/images/placeholderImage.svg';
import loadingAnimation from '../../assets/images/sellgo-loading-animation-450-1.gif';

/* Constants */
import { isValidAsin } from '../../constants';

/* Utils */
import { error } from '../../utils/notifications';

/* Interfaces */
import { KeywordReverseAsinProduct } from '../../interfaces/KeywordResearch/KeywordReverse';

interface Props {
  isLoading: boolean;
  keywordReverseProductsList: KeywordReverseAsinProduct[];

  fetchKeywordReverseRequestId: (asinList: string) => void;
  hideOverlay: () => void;
}

const ReverseAsinCardOverlay = (props: Props) => {
  const {
    isLoading,
    keywordReverseProductsList,
    fetchKeywordReverseRequestId,
    hideOverlay,
  } = props;

  const [asin, setAsin] = useState<string>('');

  const [asinError, setAsinError] = useState<boolean>(false);

  useEffect(() => {
    if (asin.length > 0) {
      setAsinError(!isValidAsin(asin));
    } else {
      setAsinError(false);
    }
  }, [asin]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (asinError) {
      error(`Invalid format for asin: ${asin}`);
      return;
    }

    const currentKeywordReverseProductAsins =
      (keywordReverseProductsList && keywordReverseProductsList.map(product => product.asin)) || [];

    const newAsinList = [...currentKeywordReverseProductAsins, asin].join(',');

    fetchKeywordReverseRequestId(newAsinList);
    setAsin('');
  };

  const inputClassName = `${styles.addAsin} ${asinError ? styles.addAsin__error : ''}`;

  return (
    <div className={styles.overlayContainer}>
      <div className={styles.reverseAsinCard}>
        {/* Hide the background remove icon */}
        <img src={crossIcon} className={styles.removeAsinIcon} style={{ opacity: 0 }} />

        <p className={styles.title}>Title of the pro...</p>

        <CopyToClipboard data={'B0899J7918'} className={styles.asin} />

        <p className={styles.salesPerMonth}>
          <span>1,500</span> <br />
          Sales/mo
        </p>
        <div className={styles.productImage}>
          <img src={placeholderImage} alt={''} />
        </div>
      </div>

      {/* Asin input overlay */}
      <div className={styles.asinInput}>
        {/* Icon to remove overlay */}
        <img src={crossIcon} className={styles.removeOverlayIcon} onClick={hideOverlay} />

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter ASIN"
            className={inputClassName}
            value={asin.toUpperCase()}
            onChange={(e: any) => setAsin(e.target.value)}
          />
        </form>

        {isLoading && (
          <div className={styles.loader}>
            <img src={loadingAnimation} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    keywordReverseProductsList: getKeywordReverseProductsList(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchKeywordReverseRequestId: (asinList: string) =>
      dispatch(fetchKeywordReverseRequestId(asinList)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReverseAsinCardOverlay);
