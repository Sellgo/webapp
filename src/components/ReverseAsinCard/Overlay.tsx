import React, { useEffect, useState } from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import CopyToClipboard from '../CopyToClipboard';

/* Assets */
import { ReactComponent as RemoveCrossIcon } from '../../assets/images/removeCross.svg';
import placeholderImage from '../../assets/images/placeholderImage.svg';

/* COnstants */
import { isValidAsin } from '../../constants';

/* Utils */
import { error } from '../../utils/notifications';

interface Props {
  hideOverlay: () => void;
}

const ReverseAsinCardOverlay = (props: Props) => {
  const { hideOverlay } = props;

  const [asin, setAsin] = useState<string>('');

  const [asinError, setAsinError] = useState<boolean>(false);

  useEffect(() => {
    if (asin.length > 0) {
      setAsinError(!isValidAsin(asin));
    } else {
      setAsinError(false);
    }
  }, [asin]);

  const handleAddAsin = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (asinError) {
      error(`ASIN: ${asin} format is invalid`);
      return;
    }

    console.log('Add asin and start trigger process');
  };

  const inputClassName = `${styles.addAsin} ${asinError ? styles.addAsin__error : ''}`;

  return (
    <div className={styles.overlayContainer}>
      <div className={styles.reverseAsinCard}>
        {/* Hide the background remove icon */}
        <RemoveCrossIcon className={styles.removeAsinIcon} style={{ opacity: 0 }} />

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
        <RemoveCrossIcon className={styles.removeOverlayIcon} onClick={hideOverlay} />

        <form action="" onSubmit={handleAddAsin}>
          <input
            type="text"
            placeholder="Enter ASIN"
            className={inputClassName}
            value={asin.toUpperCase()}
            onChange={(e: any) => setAsin(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};

export default ReverseAsinCardOverlay;
