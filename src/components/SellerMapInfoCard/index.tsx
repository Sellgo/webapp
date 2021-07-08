import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Loader, Dimmer, Icon } from 'semantic-ui-react';

/* Assets */
import { ReactComponent as SellerFinderIcon } from '../../assets/images/sellerFinder.svg';

/* Styles */
import styles from './index.module.scss';

/* Components */
import CopyToClipboard from '../CopyToClipboard';

/* Selectors */
import {
  getIsLoadingSellerDetailsForMap,
  getSellerDetailsDataForMap,
} from '../../selectors/SellerMap';

/* Actions */
import { fetchSellerDetailsForMap } from '../../actions/SellerMap';
import { truncateString } from '../../utils/format';
import history from '../../history';

const SellerMapInfoCard = (props: any) => {
  const {
    internalId,
    showSellerCard,
    hideSellerCard,
    isLoadingSellerDetailsForMap,
    sellerDetailsForMap,
    fetchSellerDetailsForMap,
  } = props;

  useEffect(() => {
    if (!internalId) {
      return;
    }

    fetchSellerDetailsForMap(internalId);
  }, [internalId]);

  if (!showSellerCard) {
    return null;
  }

  const {
    business_name = '',
    city = '',
    seller_link = '',
    seller_name = '',
    state = '',
  } = sellerDetailsForMap;

  return (
    <div className={styles.sellerMapInfoCard}>
      <button className={styles.sellerMapCloseIcon} onClick={hideSellerCard}>
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
                  displayData={truncateString(business_name, 25)}
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
              <p>{city}</p>
            </div>
          </div>

          {/* Lower Details Section */}
          <div className={styles.sellerCardDetails}>
            <div className={styles.sellerDetail}>
              <h2>Monthly Revenue</h2>
              <p>$1,234,658</p>
            </div>
            <div className={styles.sellerDetail}>
              <h2>Brand</h2>
              <p>
                <CopyToClipboard data={'Brandsssss'} />
              </p>
            </div>
            <div className={styles.sellerDetail}>
              <h2>Products</h2>
              <p>#</p>
            </div>
            <div className={styles.sellerDetail}>
              <h2>FBA</h2>
              <p>100%</p>
            </div>
          </div>

          {/* Check Inventory Button */}
          <button className={styles.checkInventory} onClick={() => history.push('/seller-finder')}>
            <SellerFinderIcon />
            <span>Inventory</span>
          </button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isLoadingSellerDetailsForMap: getIsLoadingSellerDetailsForMap(state),
    sellerDetailsForMap: getSellerDetailsDataForMap(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSellerDetailsForMap: (internalID: string) =>
      dispatch(fetchSellerDetailsForMap(internalID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SellerMapInfoCard);
