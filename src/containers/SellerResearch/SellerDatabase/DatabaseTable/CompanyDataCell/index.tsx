import React, { memo, useMemo } from 'react';
import { Table } from 'rsuite';

/* Styles */
import styles from './index.module.scss';

/* Types */
import { RowCell } from '../../../../../interfaces/Table';
import { Link } from 'react-router-dom';
import { getMarketplaceLink } from '../../../../../constants/Settings';
import { Icon } from 'semantic-ui-react';
import SocialLinkIcon from '../../../../../components/SocialLinkIcon';
import { SOCIAL_LINK_COLORS } from '../../../../../constants/SellerResearch/SellerDatabase';

interface Props extends RowCell {
  textAlign?: 'left' | 'right' | 'center';
}

/* Row cell, Appends $ sign infront of monetary cells */
const CompanyDataCell = (props: Props) => {
  const { rowData, dataKey, textAlign } = props;
  const isDisabled = useMemo(() => !rowData.is_looked_up, [rowData.is_looked_up]);
  return (
    <Table.Cell {...props}>
      <div
        className={styles.txtCell}
        style={{
          textAlign,
        }}
      >
        <p className={styles.blueTxt}>{rowData[dataKey]}</p>
        <div className={`${styles.links} ${isDisabled && styles.disable}`}>
          {isDisabled ? (
            <p className={styles.marketPlaceLink}>
              {getMarketplaceLink(rowData.marketplace_id)}{' '}
              <Icon name="external alternate" size="small" />
            </p>
          ) : (
            <Link
              to={{ pathname: rowData?.company_info?.seller_link ?? rowData?.seller_link }}
              target="_blank"
              className={`${styles.marketPlaceLink} ${styles.blueText}`}
            >
              {getMarketplaceLink(rowData.marketplace_id)}{' '}
              <Icon name="external alternate" size="small" />
            </Link>
          )}
          <div className={styles.socialLinks}>
            {isDisabled ? (
              <Icon name="linkify" className={styles.companyInformation_detailsBox_icon} />
            ) : (
              <Link
                to={{ pathname: rowData?.company_info?.website_url }}
                target="_blank"
                className={`${styles.companyInformation_detailsBox_text} ${styles.blueText}`}
              >
                <Icon name="linkify" className={styles.companyInformation_detailsBox_icon} />
              </Link>
            )}
            <SocialLinkIcon
              width={14}
              height={14}
              site={'facebook'}
              link={rowData?.company_info?.links?.facebook}
              color={SOCIAL_LINK_COLORS.facebook}
              className={styles.socialPresence__linksRow__links}
              disabled={isDisabled || !rowData?.company_info?.links?.facebook}
            />
            <SocialLinkIcon
              width={14}
              height={14}
              site={'twitter'}
              link={rowData?.company_info?.links?.twitter}
              color={SOCIAL_LINK_COLORS.twitter}
              className={styles.socialPresence__linksRow__links}
              disabled={isDisabled || !rowData?.company_info?.links?.twitter}
            />
            <SocialLinkIcon
              width={14}
              height={14}
              site={'linkedin'}
              link={rowData?.company_info?.links?.linkedin}
              color={SOCIAL_LINK_COLORS.linkedin}
              className={styles.socialPresence__linksRow__links}
              disabled={isDisabled || !rowData?.company_info?.links?.linkedin}
            />
          </div>
        </div>
      </div>
    </Table.Cell>
  );
};

export default memo(CompanyDataCell);
