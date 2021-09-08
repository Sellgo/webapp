import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import CopyToClipboard from '../../../../components/CopyToClipboard';

/* Assets */
import { ReactComponent as RemoveCrossIcon } from '../../../../assets/images/removeCross.svg';

const ReverseAsinDisplay = () => {
  return (
    <div className={styles.reverseAsinDisplay}>
      <h2>Asin-Keyword Reversal Results</h2>

      <div className={styles.reverseAsinCardsWrapper}>
        <div className={styles.reverseAsinCard}>
          <RemoveCrossIcon className={styles.removeAsinIcon} />
          <p className={styles.title}>Title Title Title Title</p>

          <CopyToClipboard data={'B08NW8FP7V'} className={styles.asin} />

          <p className={styles.salesPerMonth}>
            <span>1,500</span> <br />
            Sales/mo
          </p>
        </div>

        <div className={styles.reverseAsinCard}>
          <RemoveCrossIcon className={styles.removeAsinIcon} />
          <p className={styles.title}>Title Title Title Title</p>

          <CopyToClipboard data={'B08NW8FP7V'} className={styles.asin} />

          <p className={styles.salesPerMonth}>
            <span>1,500</span> <br />
            Sales/mo
          </p>
        </div>

        <div className={styles.reverseAsinCard}>
          <RemoveCrossIcon className={styles.removeAsinIcon} />
          <p className={styles.title}>Title Title Title Title</p>

          <CopyToClipboard data={'B08NW8FP7V'} className={styles.asin} />

          <p className={styles.salesPerMonth}>
            <span>1,500</span> <br />
            Sales/mo
          </p>
        </div>

        <div className={styles.reverseAsinCard}>
          <RemoveCrossIcon className={styles.removeAsinIcon} />
          <p className={styles.title}>Title Title Title Title</p>

          <CopyToClipboard data={'B08NW8FP7V'} className={styles.asin} />

          <p className={styles.salesPerMonth}>
            <span>1,500</span> <br />
            Sales/mo
          </p>
        </div>

        <div className={styles.reverseAsinCard}>
          <RemoveCrossIcon className={styles.removeAsinIcon} />
          <p className={styles.title}>Title Title Title Title</p>

          <CopyToClipboard data={'B08NW8FP7V'} className={styles.asin} />

          <p className={styles.salesPerMonth}>
            <span>1,500</span> <br />
            Sales/mo
          </p>
        </div>

        <div className={styles.reverseAsinCard}>
          <RemoveCrossIcon className={styles.removeAsinIcon} />
          <p className={styles.title}>Title Title Title Title</p>

          <CopyToClipboard data={'B08NW8FP7V'} className={styles.asin} />

          <p className={styles.salesPerMonth}>
            <span>1,500</span> <br />
            Sales/mo
          </p>
        </div>

        <div className={styles.reverseAsinCard}>
          <RemoveCrossIcon className={styles.removeAsinIcon} />
          <p className={styles.title}>Title Title Title Title</p>

          <CopyToClipboard data={'B08NW8FP7V'} className={styles.asin} />

          <p className={styles.salesPerMonth}>
            <span>1,500</span> <br />
            Sales/mo
          </p>
        </div>

        <div className={styles.reverseAsinCard}>
          <RemoveCrossIcon className={styles.removeAsinIcon} />
          <p className={styles.title}>Title Title Title Title</p>

          <CopyToClipboard data={'B08NW8FP7V'} className={styles.asin} />

          <p className={styles.salesPerMonth}>
            <span>1,500</span> <br />
            Sales/mo
          </p>
        </div>

        <div className={styles.reverseAsinCard}>
          <RemoveCrossIcon className={styles.removeAsinIcon} />
          <p className={styles.title}>Title Title Title Title</p>

          <CopyToClipboard data={'B08NW8FP7V'} className={styles.asin} />

          <p className={styles.salesPerMonth}>
            <span>1,500</span> <br />
            Sales/mo
          </p>
        </div>

        <div className={styles.reverseAsinCard}>
          <RemoveCrossIcon className={styles.removeAsinIcon} />
          <p className={styles.title}>Title Title Title Title</p>

          <CopyToClipboard data={'B08NW8FP7V'} className={styles.asin} />

          <p className={styles.salesPerMonth}>
            <span>1,500</span> <br />
            Sales/mo
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReverseAsinDisplay;
