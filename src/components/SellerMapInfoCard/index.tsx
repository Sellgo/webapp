import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Loader, Dimmer, Icon } from 'semantic-ui-react';
import { truncateString } from '../../utils/format';

import CopyToClipBoard from '../CopyToClipboard';

/* Styles */
import styles from './index.module.scss';

interface Props {
  internalId: string;
  showSellerCard: boolean;
}

const SellerMapInfoCard: React.FC<Props> = props => {
  const { internalId, showSellerCard } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [sellerInfo, setSellerInfo] = useState({
    business_name: '',
    zip_code: '',
    merchant_id: '',
  });

  useEffect(() => {
    if (!internalId) {
      return;
    }
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
        setSellerInfo({
          business_name: '',
          zip_code: '',
          merchant_id: '',
        });
      });
  }, [internalId]);

  console.log(sellerInfo);

  if (!showSellerCard) {
    return null;
  }

  return (
    <article className={styles.sellerMapInfoCard}>
      {isLoading ? (
        <>
          <Dimmer active inverted>
            <Loader inverted>Fetching Seller Data...</Loader>
          </Dimmer>
        </>
      ) : (
        <div className={styles.sellerCardDetails}>
          <div className={styles.sellerDetail}>
            <h2>Name:</h2>
            <p>
              <CopyToClipBoard
                data="chongqinglingmaoyunkejiyouxiangongsi"
                displayData={truncateString('chongqinglingmaoyunkejiyouxiangongsi', 15)}
              />
            </p>
          </div>
          <div className={styles.sellerDetail}>
            <h2>Seller ID:</h2>
            <p>
              <CopyToClipBoard data={'A2OMAQX8BED4EL'} />
            </p>
          </div>
          <div className={styles.sellerDetail}>
            <h2>Seller Link</h2>
            <p>
              <Icon
                name="external"
                onCLick={() => window.open('https://www.amazon.in', '_blank')}
              />
            </p>
          </div>
          <div className={styles.sellerDetail}>
            <h2>Seller Name</h2>
            <p>Fari Ash</p>
          </div>
          <div className={styles.sellerDetail}>
            <h2>Seller Name</h2>
            <p>Fari Ash</p>
          </div>
        </div>
      )}
    </article>
  );
};

export default SellerMapInfoCard;
