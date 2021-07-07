import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Loader, Dimmer, Icon } from 'semantic-ui-react';

/* Assets */
import { ReactComponent as SellerFinderIcon } from '../../assets/images/sellerFinder.svg';

/* Styles */
import styles from './index.module.scss';

/* Constants */
import { DEFAULT_SELLER_INFO } from '../../constants/SellerMap';

/* Interfaces */
import { SellerData } from '../../interfaces/SellerMap';
import CopyToClipboard from '../CopyToClipboard';

interface Props {
  internalId: string;
  showSellerCard: boolean;
  hideSellerCard: () => void;
}

const SellerMapInfoCard: React.FC<Props> = props => {
  const { internalId, showSellerCard, hideSellerCard } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [, setSellerInfo] = useState<SellerData>(DEFAULT_SELLER_INFO);

  useEffect(() => {
    if (!internalId) {
      return;
    }

    setIsLoading(true);
    axios
      .get(`http://18.207.105.104/api/sellers/1000000002/merchants/search?id=${internalId}`)
      .then(resp => {
        if (resp.data) {
          setSellerInfo(resp.data[0] || {});
          setIsLoading(false);
        }
      })
      .catch(() => {
        setIsLoading(false);
        setSellerInfo(DEFAULT_SELLER_INFO);
      });
  }, [internalId]);

  if (!showSellerCard) {
    return null;
  }

  return (
    <div className={styles.sellerMapInfoCard}>
      <button className={styles.sellerMapCloseIcon} onClick={hideSellerCard}>
        <Icon name="close" color="black" />
      </button>
      {isLoading ? (
        <>
          <Dimmer active inverted>
            <Loader inverted>Fetching Seller Data...</Loader>
          </Dimmer>
        </>
      ) : (
        <div className={styles.sellerCard}>
          {/* Upper Details Section */}
          <div className={styles.sellerCardDetails}>
            <div className={styles.sellerDetail}>
              <h2>Name</h2>
              <p>
                <span>Seller Names new Seller</span>
                <Icon name="external" />
              </p>
            </div>
            <div className={styles.sellerDetail}>
              <h2>Business Name</h2>
              <p>
                <CopyToClipboard data={'Businesssss Name'} className={styles.copyBrands} />
              </p>
            </div>
            <div className={styles.sellerDetail}>
              <h2>State</h2>
              <p>AA</p>
            </div>
            <div className={styles.sellerDetail}>
              <h2>Country</h2>
              <p>AA</p>
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
          <button className={styles.checkInventory}>
            <SellerFinderIcon />
            <span>Inventory</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SellerMapInfoCard;
