import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Image } from 'semantic-ui-react';

// Styles
import styles from './index.module.scss';

// Components
import { getMarketplaceName } from '../../../constants/Settings';
import SocialLinkIcon from '../../../components/SocialLinkIcon';

// Constants
import { SOCIAL_LINK_COLORS } from '../../../constants/SellerResearch/SellerDatabase';
import ValidCheckIcon from '../../../components/Icons/ValidCheckIcon';

interface Props {
  rowData?: any;
}
const BusinessInformation = (props: Props) => {
  const { rowData } = props;
  const businessAddress = rowData.address;
  const businessCity = rowData.city;
  const businessZipCode = rowData.zip_code;
  const businessCountry = rowData.country;
  const businessState = rowData.state;
  return (
    <div className={styles.summaryDetails}>
      {/* Social presence */}
      <div className={styles.socialPresence}>
        <div className={styles.businessIdentity}>
          <Image src={rowData.seller_logo} className={styles.businessIdentity__image} />
          <p className={styles.businessIdentity__name}>{rowData.business_name}</p>
        </div>
        <div className={styles.businessAddress}>
          <Icon name="map marker alternate" className={styles.companyInformation_detailsBox_icon} />
          <p className={styles.businessAddress__text}>
            <span>{businessAddress}</span>
            <span>{`${businessCity && `${businessCity}, `}${businessState &&
              `${businessState},`}${businessZipCode && `${businessZipCode},`}${businessCountry &&
              `${businessCountry}`}`}</span>
          </p>
        </div>
        <div className={styles.socialPresence__linksRow}>
          {Object.keys(rowData?.company_info?.links ?? {}).map((link: string) => (
            <SocialLinkIcon
              key={link}
              site={link.toLowerCase()}
              link={rowData?.company_info?.links?.[link]}
              color={SOCIAL_LINK_COLORS[link.toLowerCase()]}
              className={styles.socialPresence__linksRow__links}
              disabled={!rowData?.company_info?.links?.[link]}
            />
          ))}
          {Object.keys(rowData?.company_info?.links ?? {}).length === 0 && (
            <p className={styles.socialPresence__linksRow__links}>No Social Links Available</p>
          )}
        </div>
      </div>
      {/* Company Information */}
      <div className={styles.companyInformation}>
        <div className={styles.companyInformation_details}>
          <div className={styles.companyInformation_detailsBox}>
            <Icon name="amazon" className={styles.companyInformation_detailsBox_icon} />
            <p className={styles.companyInformation_detailsBox_heading}>Amazon store name</p>
            <p className={styles.companyInformation_detailsBox_text}>{rowData?.merchant_name}</p>
          </div>
          <div className={styles.companyInformation_detailsBox}>
            <Icon name="address card" className={styles.companyInformation_detailsBox_icon} />
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
            {rowData?.company_info?.seller_link || rowData?.seller_link ? (
              <div className={styles.verifiedIconBox}>
                {rowData.is_looked_up && <ValidCheckIcon fill="#5DC560" />}
                <Link
                  to={{ pathname: rowData?.company_info?.seller_link ?? rowData?.seller_link }}
                  target="_blank"
                  className={`${styles.companyInformation_detailsBox_text} ${styles.blueText}`}
                >
                  {rowData?.company_info?.seller_link ?? rowData?.seller_link ?? 'N/A'}
                </Link>
              </div>
            ) : (
              <p className={`${styles.companyInformation_detailsBox_text} ${styles.blueText}`}>
                N/A
              </p>
            )}
          </div>
          <div className={styles.companyInformation_detailsBox}>
            <Icon
              name="phone"
              flipped="horizontally"
              className={styles.companyInformation_detailsBox_icon}
            />
            <p className={styles.companyInformation_detailsBox_heading}>Support phone</p>
            {rowData?.phone ? (
              <div className={styles.verifiedIconBox}>
                {rowData.is_looked_up && <ValidCheckIcon fill="#5DC560" />}
                <p className={`${styles.companyInformation_detailsBox_text} ${styles.blueText}`}>
                  {rowData?.phone}
                </p>
              </div>
            ) : (
              <p className={`${styles.companyInformation_detailsBox_text} ${styles.blueText}`}>
                N/A
              </p>
            )}
          </div>
          <div className={styles.companyInformation_detailsBox}>
            <Icon
              name="phone"
              flipped="horizontally"
              className={styles.companyInformation_detailsBox_icon}
            />
            <p className={styles.companyInformation_detailsBox_heading}>Phone</p>
            {rowData?.company_info?.phone ? (
              <div className={styles.verifiedIconBox}>
                {rowData.is_looked_up && <ValidCheckIcon fill="#5DC560" />}
                <p className={`${styles.companyInformation_detailsBox_text} ${styles.blueText}`}>
                  {rowData?.company_info?.phone}
                </p>
              </div>
            ) : (
              <p className={`${styles.companyInformation_detailsBox_text} ${styles.blueText}`}>
                N/A
              </p>
            )}
          </div>
          <div className={styles.companyInformation_detailsBox}>
            <Icon name="fax" className={styles.companyInformation_detailsBox_icon} />
            <p className={styles.companyInformation_detailsBox_heading}>Fax</p>
            {rowData?.company_info?.fax ? (
              <div className={styles.verifiedIconBox}>
                {rowData.is_looked_up && <ValidCheckIcon fill="#5DC560" />}
                <p className={`${styles.companyInformation_detailsBox_text} ${styles.blueText}`}>
                  {rowData?.company_info?.fax}
                </p>
              </div>
            ) : (
              <p className={`${styles.companyInformation_detailsBox_text} ${styles.blueText}`}>
                N/A
              </p>
            )}
          </div>
          <div className={styles.companyInformation_detailsBox}>
            <Icon name="linkify" className={styles.companyInformation_detailsBox_icon} />
            <p className={styles.companyInformation_detailsBox_heading}>Website</p>
            {rowData?.company_info?.website_url ? (
              <div className={styles.verifiedIconBox}>
                {rowData.is_looked_up && <ValidCheckIcon fill="#5DC560" />}
                <Link
                  to={{ pathname: rowData?.company_info?.website_url }}
                  target="_blank"
                  className={`${styles.companyInformation_detailsBox_text} ${styles.blueText}`}
                >
                  {rowData?.company_info?.website_url}
                </Link>
              </div>
            ) : (
              <p className={`${styles.companyInformation_detailsBox_text} ${styles.blueText}`}>
                N/A
              </p>
            )}
          </div>

          <div className={styles.companyInformation_detailsBox}>
            <Icon name="mail" className={styles.companyInformation_detailsBox_icon} />
            <p className={styles.companyInformation_detailsBox_heading}>
              Company Emails{' '}
              {`(${rowData?.company_info?.emails?.length ?? rowData?.emails?.length ?? 0})`}
            </p>
            {rowData?.company_info?.emails?.length > 0 ? (
              <div className={styles.companyEmailsBox}>
                {rowData?.company_info?.emails?.map((emailData: any) => (
                  <>
                    {emailData.type === 'company' && (
                      <div className={styles.verifiedIconBox}>
                        {rowData.is_looked_up && emailData.last_verified && (
                          <ValidCheckIcon fill="#5DC560" />
                        )}
                        <p
                          className={`${styles.companyInformation_detailsBox_text} ${styles.blueText}`}
                        >
                          {emailData.email}
                        </p>
                      </div>
                    )}
                  </>
                ))}
              </div>
            ) : (
              <>
                {rowData?.emails?.length > 0 ? (
                  <div className={styles.companyEmailsBox}>
                    {rowData?.emails?.map((emailData: any) => (
                      <>
                        {emailData.type === 'company' && (
                          <div className={styles.verifiedIconBox}>
                            {rowData.is_looked_up && emailData.last_verified && (
                              <ValidCheckIcon fill="#5DC560" />
                            )}
                            <p
                              className={`${styles.companyInformation_detailsBox_text} ${styles.blueText}`}
                            >
                              {emailData.email}
                            </p>
                          </div>
                        )}
                      </>
                    ))}
                  </div>
                ) : (
                  <p className={`${styles.companyInformation_detailsBox_text} ${styles.blueText}`}>
                    N/A
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessInformation;
