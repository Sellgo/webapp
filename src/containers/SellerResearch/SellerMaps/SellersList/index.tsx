import React, { useEffect } from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Actions */
import { fetchSellersListForMap } from '../../../../actions/SellerResearch/SellerMap';

/* Components */
import CopyAndLocateClipboard from '../../../../components/CopyAndLocateClipboard';
import CopyToClipboard from '../../../../components/CopyToClipboard';

/* Assets */
import placeholderImage from '../../../../assets/images/placeholderImage.svg';

/* Interfaces */
import { SellersListPayload } from '../../../../interfaces/SellerResearch/SellerMap';
import { getMarketplaceFlag } from '../../../../constants/Settings';

interface Props {
  fetchSellersListForMap: (payload: SellersListPayload) => void;
}

const SellersList = (props: Props) => {
  const { fetchSellersListForMap } = props;

  useEffect(() => {
    fetchSellersListForMap({});
  }, []);

  return (
    <div className={styles.sellersListWrapper}>
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
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSellersListForMap: (payload: SellersListPayload) =>
      dispatch(fetchSellersListForMap(payload)),
  };
};

export default connect(null, mapDispatchToProps)(SellersList);
