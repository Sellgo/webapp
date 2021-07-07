import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Loader, Dimmer } from 'semantic-ui-react';
import { truncateString } from '../../utils/format';

import CopyToClipBoard from '../CopyToClipboard';

/* Styles */
import styles from './index.module.scss';

interface Props {
  internalId: string;
  showSellerCard: boolean;
}

interface SellerData {
  business_name: string;
  city: string;
  id: string;
  merchant_id: string;
  seller_link: string;
  seller_name: string;
  state: string;
  zip_code: string;
}

const defaultSellerInfo = {
  business_name: '',
  city: '',
  id: '',
  merchant_id: '',
  seller_link: '',
  seller_name: '',
  state: '',
  zip_code: '',
};

const SellerMapInfoCard: React.FC<Props> = props => {
  const { internalId, showSellerCard } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [sellerInfo, setSellerInfo] = useState<SellerData>(defaultSellerInfo);

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
        setSellerInfo(defaultSellerInfo);
      });
  }, [internalId]);

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
                displayData={truncateString(sellerInfo.business_name, 15)}
              />
            </p>
          </div>
          <div className={styles.sellerDetail}>
            <h2>Seller ID:</h2>
            <p>
              <CopyToClipBoard data={sellerInfo.merchant_id || ''} />
            </p>
          </div>

          <div className={styles.sellerDetail}>
            <h2>{sellerInfo.seller_name}</h2>
            <p>{sellerInfo.seller_link}</p>
            <p>{sellerInfo.state}</p>
            <p>{sellerInfo.zip_code}</p>
          </div>
        </div>
      )}
    </article>
  );
};

export default SellerMapInfoCard;
