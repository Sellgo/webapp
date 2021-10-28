import React, { memo } from 'react';

/* Styling */
import styles from './index.module.scss';

/* Constants */
import { getMarketplaceFlag } from '../../constants/Settings';

/* Utils */
import {
  formatNumber,
  parseKpiLists,
  removeSpecialChars,
  showNAIfZeroOrNull,
  truncateString,
} from '../../utils/format';

/* Components */
import CopyToClipboard from '../CopyToClipboard';
import CopyAndLocateClipboard from '../CopyAndLocateClipboard';

/* Assets */
import placeholderImage from '../../assets/images/placeholderImage.svg';

interface SellerDetails {
  seller_logo: string;
  merchant_id: string;
  seller_link: string;
  marketplace_id: string;

  sales_estimate: number;
  inventory_count: number;

  city: string;
  country: string;
  state: string;
  zip_code: string;

  brands: string;
  asins: string;
}

interface Props {
  sellerDetails: SellerDetails;
}

const SellerListMapCard = (props: Props) => {
  const { sellerDetails } = props;

  const sellerLogo = sellerDetails.seller_logo ? sellerDetails.seller_logo : placeholderImage;
  const sellerId = sellerDetails.merchant_id;
  const sellerLink = sellerDetails.seller_link ? sellerDetails.seller_link : '';
  const marketplaceId = sellerDetails.marketplace_id;

  const salesEstimate = sellerDetails.sales_estimate;
  const formattedSalesEst = showNAIfZeroOrNull(salesEstimate, `$${formatNumber(salesEstimate)}`);

  /* Location */
  const country = sellerDetails.country ? sellerDetails.country : '';
  const city = sellerDetails.city ? `${sellerDetails.city},` : '';
  const state = sellerDetails.state ? `${sellerDetails.state},` : '';
  const zipCode = sellerDetails.zip_code ? `${sellerDetails.zip_code}` : '';

  /* Brands */
  const brands = sellerDetails.brands;
  const parsedBrands = parseKpiLists(brands);
  const copyBrandsString = removeSpecialChars(parsedBrands, ',');

  /* ASINs*/

  const asins = sellerDetails.asins;
  const parsedAsins = parseKpiLists(asins);
  const currentAsinsCount = formatNumber(parsedAsins.length);
  const totalInventory = formatNumber(sellerDetails.inventory_count);
  const copyAsins = removeSpecialChars(parsedAsins, ',');

  return (
    <div className={styles.sellerListCard}>
      {/* Seller Logo */}
      <div className={styles.sellerLogo}>
        <img src={sellerLogo} alt={sellerId} />
      </div>

      {/* Seller marketplace Details */}
      <div className={styles.sellerIdDetails}>
        <img
          src={getMarketplaceFlag(marketplaceId ? marketplaceId : '')}
          alt="Seller Market place Flag"
        />
        <CopyAndLocateClipboard data={sellerId} link={sellerLink} className={styles.sellerId} />
      </div>

      <div className={styles.sellerDetails}>
        {/* Sales Estimate */}
        <h3 className={styles.salesEst}>{formattedSalesEst}</h3>

        {/* Brands */}
        <div className={styles.sellerCopyDetails}>
          <p>
            Brands:
            <span>
              <CopyToClipboard
                data={copyBrandsString}
                displayData={truncateString(copyBrandsString, 20)}
              />
            </span>
          </p>
        </div>

        {/* ASINS */}
        <div className={styles.sellerCopyDetails}>
          <p>
            ASIN:
            <span>
              <CopyToClipboard
                data={copyAsins}
                displayData={`${currentAsinsCount}/${totalInventory}`}
              />
            </span>
          </p>
        </div>

        {/* Address */}
        <div className={styles.sellerCopyDetails}>
          <p>
            Address:
            <span>
              {city} {state} {zipCode}
            </span>
          </p>
        </div>

        {/* Country */}
        <div className={styles.sellerCopyDetails}>
          <p>
            Country:
            <span>{country}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(SellerListMapCard);
