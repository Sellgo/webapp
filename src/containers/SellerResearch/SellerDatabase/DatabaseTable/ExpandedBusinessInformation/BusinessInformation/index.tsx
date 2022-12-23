import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

// Styles
import styles from './index.module.scss';

// Components
import { getMarketplaceName } from '../../../../../../constants/Settings';
import SocialLinkIcon from '../../../../../../components/SocialLinkIcon';

// Constants
import { SOCIAL_LINK_COLORS } from '../../../../../../constants/SellerResearch/SellerDatabase';

interface Props {
  rowData?: any;
  className: string;
}
const BusinessInformation = (props: Props) => {
  const { rowData, className } = props;
  return (
    <div className={className}>
      {/* Social presence */}
      <div className={styles.socialPresence}>
        <p className={styles.informationHeading}>Company Social Presence</p>
        <div className={styles.socialPresence__linksRow}>
          {Object.keys(rowData?.company_info?.links ?? {}).map((link: string) => (
            <SocialLinkIcon
              key={link}
              site={link.toLowerCase()}
              link={rowData?.company_info?.links[link]}
              color={SOCIAL_LINK_COLORS[link.toLowerCase()]}
              className={styles.socialPresence__linksRow__links}
            />
          ))}
          {Object.keys(rowData?.company_info?.links ?? {}).length === 0 && (
            <p className={styles.socialPresence__linksRow__links}>No Social Links Available</p>
          )}
        </div>
      </div>
      {/* Company Information */}
      <div className={styles.companyInformation}>
        <p className={styles.informationHeading}>Company Information</p>
        <div className={styles.companyInformation_detailsBox}>
          <Icon name="amazon" className={styles.companyInformation_detailsBox_icon} />
          <p className={styles.companyInformation_detailsBox_heading}>Amazon store name</p>
          <p className={styles.companyInformation_detailsBox_text}>{rowData?.merchant_name}</p>
        </div>
        <div className={styles.companyInformation_detailsBox}>
          <Icon name="heading" className={styles.companyInformation_detailsBox_icon} />
          <p className={styles.companyInformation_detailsBox_heading}>Business name</p>
          <p className={styles.companyInformation_detailsBox_text}>{rowData?.business_name}</p>
        </div>
        <div className={styles.companyInformation_detailsBox}>
          <Icon name="world" className={styles.companyInformation_detailsBox_icon} />
          <p className={styles.companyInformation_detailsBox_heading}>Marketplace</p>
          <p className={styles.companyInformation_detailsBox_text}>
            {getMarketplaceName(rowData?.marketplace_id)}
          </p>
        </div>
        <div className={styles.companyInformation_detailsBox}>
          <Icon name="amazon" className={styles.companyInformation_detailsBox_icon} />
          <p className={styles.companyInformation_detailsBox_heading}>Amazon store link</p>
          <Link to={{ pathname: rowData?.seller_link }} className={styles.blueText}>
            {rowData?.seller_link}
          </Link>
        </div>
        <div className={styles.companyInformation_detailsBox}>
          <Icon
            name="phone"
            flipped="horizontally"
            className={styles.companyInformation_detailsBox_icon}
          />
          <p className={styles.companyInformation_detailsBox_heading}>Support phone</p>
          <p className={styles.blueText}>{rowData?.phone ?? 'N/A'}</p>
        </div>
        <div className={styles.companyInformation_detailsBox}>
          <Icon
            name="phone"
            flipped="horizontally"
            className={styles.companyInformation_detailsBox_icon}
          />
          <p className={styles.companyInformation_detailsBox_heading}>Phone</p>
          <p className={styles.blueText}>{rowData?.company_info?.phone ?? 'N/A'}</p>
        </div>
        <div className={styles.companyInformation_detailsBox}>
          <Icon name="fax" className={styles.companyInformation_detailsBox_icon} />
          <p className={styles.companyInformation_detailsBox_heading}>Fax</p>
          <p className={styles.blueText}>{rowData?.company_info?.fax ?? 'N/A'}</p>
        </div>
        <div className={styles.companyInformation_detailsBox}>
          <Icon name="linkify" className={styles.companyInformation_detailsBox_icon} />
          <p className={styles.companyInformation_detailsBox_heading}>Website</p>
          {rowData?.company_info?.website_url ? (
            <Link
              to={{ pathname: rowData?.company_info?.website_url }}
              target="_blank"
              className={styles.blueText}
            >
              {rowData?.company_info?.website_url ?? 'N/A'}
            </Link>
          ) : (
            <p>-</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessInformation;
