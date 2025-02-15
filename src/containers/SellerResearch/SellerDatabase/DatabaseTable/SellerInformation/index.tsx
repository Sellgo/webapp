import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Components */
// import CopyAndLocateClipboard from '../../../../../components/CopyAndLocateClipboard';

/* Interface */
import { RowCell } from '../../../../../interfaces/Table';

/* Assets */
import placeholderImage from '../../../../../assets/images/placeholderImage.svg';
import { Icon } from 'semantic-ui-react';

const SellerInformation = (props: RowCell) => {
  const { rowData } = props;

  const sellerLogo = rowData.seller_logo;
  const businessName = rowData.business_name;
  // const merchantId = rowData.merchant_id;
  // const sellerLink = rowData.seller_link;
  // const merchantName = rowData.merchant_name;
  // const businessAddress = rowData.address;
  // const businessCity = rowData.city;
  // const businessZipCode = rowData.zip_code;
  // const businessCountry = rowData.country;
  // const marketplaceId = rowData.marketplace_id;

  return (
    <Table.Cell {...props}>
      <div className={styles.sellerInformation}>
        {/* Left part seller information */}
        <div className={styles.sellerInformationLeft}>
          <img src={sellerLogo ? sellerLogo : placeholderImage} alt={businessName} />
          {/* <CopyAndLocateClipboard data={merchantId} link={sellerLink} /> */}
          {rowData?.company_info?.is_looked_up || rowData?.is_looked_up ? '' : <Icon name="lock" />}
        </div>

        {/* Right part seller information */}
        {/* <div className={styles.sellerInformationRight}>
          <h2>{merchantName ? merchantName : '-'}</h2>

          Business Name
          <div className={styles.sellerBusinessDetails}>
            <h3>Business Name:</h3>
            <p>{businessName ? truncateString(businessName, 26) : '-'}</p>
          </div>

          Business Address

          <div className={styles.sellerBusinessDetails}>
            <h3>Business Address:</h3>
            <div className={styles.address}>
              <p>{businessAddress ? businessAddress : '-'}</p>
              <p>
                {businessCity &&
                  businessZipCode &&
                  businessCountry &&
                  `${businessCity}, ${businessZipCode}, ${businessCountry}`}
              </p>
            </div>
          </div>

          Marketplace Details 
          <div className={styles.sellerBusinessDetails}>
            <h3>Marketplace:</h3>
            <img src={getMarketplaceFlag(marketplaceId)} alt="Marketplace Flags" />
          </div>
        </div> */}
      </div>
    </Table.Cell>
  );
};

export default SellerInformation;
