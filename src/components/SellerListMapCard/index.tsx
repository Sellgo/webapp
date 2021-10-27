import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Constants */
import { getMarketplaceFlag } from '../../constants/Settings';

/* Components */
import CopyToClipboard from '../CopyToClipboard';
import CopyAndLocateClipboard from '../CopyAndLocateClipboard';

/* Assets */
import placeholderImage from '../../assets/images/placeholderImage.svg';

const SellerListMapCard = () => {
  return (
    <div className={styles.sellerListCard}>
      {/* Seller Logo */}
      <div className={styles.sellerLogo}>
        <img src={placeholderImage} alt="" />
      </div>

      {/* Seller marketplace Details */}
      <div className={styles.sellerIdDetails}>
        <img src={getMarketplaceFlag('')} alt="Seller Market place Flag" />
        <CopyAndLocateClipboard data="AU12349G1" link="" className={styles.sellerId} />
      </div>

      <div className={styles.sellerDetails}>
        {/* Sales Estimate */}
        <h3 className={styles.salesEst}>$1,235,368</h3>

        {/* Brands */}
        <div className={styles.sellerCopyDetails}>
          <p>
            Brands:
            <span>
              <CopyToClipboard data="" displayData="xxxx, sgffax, afdadfds, ..." />
            </span>
          </p>
        </div>

        {/* ASINS */}
        <div className={styles.sellerCopyDetails}>
          <p>
            ASIN:
            <span>
              <CopyToClipboard data="" displayData="56/1000" />
            </span>
          </p>
        </div>

        {/* Address */}
        <div className={styles.sellerCopyDetails}>
          <p>
            Address:
            <span>City, State, Zip Code</span>
          </p>
        </div>

        {/* Country */}
        <div className={styles.sellerCopyDetails}>
          <p>
            Country:
            <span>US</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellerListMapCard;
