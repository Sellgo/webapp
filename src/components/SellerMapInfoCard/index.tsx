import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Loader, Dimmer, Icon } from 'semantic-ui-react';

/* Assets */
// import { ReactComponent as SellerFinderIcon } from '../../assets/images/sellerFinder.svg';

/* Styles */
import styles from './index.module.scss';

/* Components */
import CopyToClipboard from '../CopyToClipboard';

/* Selectors */
import {
  getIsLoadingSellerDetailsForMap,
  getSellerDetailsDataForMap,
  getShowSellerDetailsCardForMap,
} from '../../selectors/SellerResearch/SellerMap';

/* Actions */
import {
  fetchSellerDetailsForMap,
  setShowSellerDetailsCard,
} from '../../actions/SellerResearch/SellerMap';

import { trackMerchantFromDatabase } from '../../actions/SellerResearch/SellerDatabase';

/* Utils */
import { removeSpecialChars, showNAIfZeroOrNull, truncateString } from '../../utils/format';
// import history from '../../history';
// import { timeout } from '../../utils/timeout';

interface Props {
  internalId: string;
  isLoadingSellerDetailsForMap: boolean;
  sellerDetailsForMap: any;
  showSellerDetailsCardForMap: boolean;
  fetchSellerDetailsForMap: (internalId: string) => void;
  setShowSellerDetailsCard: (payload: boolean) => void;
  trackMerchantFromDatabase: (merhcnatId: string) => void;
}

const SellerMapInfoCard = (props: Props) => {
  const {
    internalId,
    isLoadingSellerDetailsForMap,
    sellerDetailsForMap,
    showSellerDetailsCardForMap,
    fetchSellerDetailsForMap,
    setShowSellerDetailsCard,
    // trackMerchantFromDatabase,
  } = props;

  useEffect(() => {
    if (!internalId) {
      return;
    }

    setShowSellerDetailsCard(true);
    fetchSellerDetailsForMap(internalId);
  }, [internalId]);

  if (!showSellerDetailsCardForMap) {
    return null;
  }

  const {
    seller_name = '',
    seller_link = '',
    business_name = '',
    state = '',
    country = '',
    brands = [],
    // merchant_id = '',
    inventory_count = 0,
    // tracking_status = false,
  } = sellerDetailsForMap;

  const prettyBrands = brands.length > 0 ? removeSpecialChars(brands) : '-';

  // const inventoryButtonStyles = tracking_status
  //   ? styles.checkInventoryActive
  //   : styles.checkInventory;
  //
  /* Handle click inventory button */
  // const handleClickInventory = async () => {
  //   trackMerchantFromDatabase(merchant_id);
  //   await timeout(1500);
  //   history.push('/seller-research/collection');
  // };

  return (
    <div className={styles.sellerMapInfoCard}>
      <button className={styles.sellerMapCloseIcon} onClick={() => setShowSellerDetailsCard(false)}>
        <Icon name="close" color="black" />
      </button>
      {isLoadingSellerDetailsForMap ? (
        <>
          <Dimmer active inverted>
            <Loader inverted active={isLoadingSellerDetailsForMap}>
              Fetching Seller Data...
            </Loader>
          </Dimmer>
        </>
      ) : (
        <div className={styles.sellerCard}>
          {/* Upper Details Section */}
          <div className={styles.sellerCardDetails}>
            <div className={styles.sellerDetail}>
              <h2>Name</h2>
              <p>
                <span>{truncateString(seller_name, 10)}</span>
                <Icon name="external" onClick={() => window.open(seller_link, '_blank')} />
              </p>
            </div>
            <div className={styles.sellerDetail}>
              <h2>Business Name</h2>
              <p>
                <CopyToClipboard
                  data={business_name}
                  displayData={truncateString(business_name, 15)}
                  className={styles.copyBrands}
                />
              </p>
            </div>
            <div className={styles.sellerDetail}>
              <h2>State</h2>
              <p>{state.toUpperCase()}</p>
            </div>
            <div className={styles.sellerDetail}>
              <h2>Country</h2>
              <p>{country ? country : '-'}</p>
            </div>
          </div>

          {/* Lower Details Section */}
          <div className={styles.sellerCardDetails}>
            {/* <div className={styles.sellerDetail}>
              <h2>Monthly Revenue</h2>
              <p>
                {showNAIfZeroOrNull(
                  sales_estimate_n5p,
                  `$${sales_estimate_n5p && sales_estimate_n5p.toLocaleString()}`
                )}
              </p>
            </div> */}
            <div className={`${styles.sellerDetail} ${styles.sellerDetail__long}`}>
              <h2>Brands</h2>
              <p>
                <CopyToClipboard
                  data={prettyBrands}
                  displayData={truncateString(prettyBrands, 40)}
                />
              </p>
            </div>
            <div className={styles.sellerDetail}>
              <h2>Products</h2>
              <p>
                {showNAIfZeroOrNull(
                  inventory_count,
                  `#${inventory_count && inventory_count.toLocaleString()}`
                )}
              </p>
            </div>
            {/* <div className={styles.sellerDetail}>
              <h2>FBA</h2>
              <p>{showNAIfZeroOrNull(fba_percent_n5p, `${fba_percent_n5p && fba_percent_n5p}%`)}</p>
            </div> */}
          </div>

          {/* Check Inventory Button */}
          {/* <button className={inventoryButtonStyles} onClick={handleClickInventory}>
            <SellerFinderIcon />
            <span>Inventory</span>
          </button> */}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isLoadingSellerDetailsForMap: getIsLoadingSellerDetailsForMap(state),
    sellerDetailsForMap: getSellerDetailsDataForMap(state),
    showSellerDetailsCardForMap: getShowSellerDetailsCardForMap(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSellerDetailsForMap: (internalID: string) =>
      dispatch(fetchSellerDetailsForMap(internalID)),
    trackMerchantFromDatabase: (merchantId: string) =>
      dispatch(trackMerchantFromDatabase(merchantId)),
    setShowSellerDetailsCard: (payload: boolean) => dispatch(setShowSellerDetailsCard(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SellerMapInfoCard);
