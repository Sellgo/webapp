import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Components */
import CopyAndLocateClipboard from '../../../../../components/CopyAndLocateClipboard';

/* Interface */
import { RowCell } from '../../../../../interfaces/Table';

/* Utils */
import { truncateString } from '../../../../../utils/format';

/* Assets */
import USFlag from '../../../../../assets/images/USFlag.png';
import placeholderImage from '../../../../../assets/images/placeholderImage.svg';

const SellerInformation = (props: RowCell) => {
  const { rowData } = props;

  const sellerLogo = rowData.seller_logo;
  const businessName = rowData.business_name;
  const merchantId = rowData.merchant_id;
  const sellerLink = rowData.seller_link;
  const merchantName = rowData.merchant_name;
  const businessAddress = rowData.address;
  const launched = rowData.launched;
  const businessCity = rowData.city;
  const businessZipCode = rowData.zip_code;
  const businessCountry = rowData.country;

  return (
    <Table.Cell {...props}>
      <div className={styles.sellerInformation}>
        <div className={styles.sellerInformationLeft}>
          <img src={sellerLogo ? sellerLogo : placeholderImage} alt={businessName} />
          <CopyAndLocateClipboard data={merchantId} link={sellerLink} />
        </div>
        <div className={styles.sellerInformationRight}>
          <h2>{merchantName ? merchantName : '-'}</h2>
          <div className={styles.sellerBusinessDetails}>
            <h3>Business Name:</h3>
            <p>{businessName ? truncateString(businessName, 26) : '-'}</p>
          </div>
          <div className={styles.sellerBusinessDetails}>
            <h3>Business Address:</h3>
            <div className={styles.address}>
              <p>{businessAddress ? businessAddress : '-'}</p>
              <p>{`${businessCity}, ${businessZipCode}, ${businessCountry}`}</p>
            </div>
          </div>
          <div className={styles.sellerBusinessDetails}>
            <h3>Marketplace:</h3>
            <img src={USFlag} alt="American Flag" />
          </div>
          <div className={styles.sellerBusinessDetails}>
            <h3>Launched:</h3>
            <p>{launched ? launched : '-'}</p>
          </div>
        </div>
      </div>
    </Table.Cell>
  );
};

export default SellerInformation;
