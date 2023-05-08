import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Components */
import LeftArrow from '../../../assets/images/leftArrowLong.svg';
import history from '../../../history';

/* Constants */
import { SETTINGS_PAGES } from '../../../constants/Settings';

/* Types */
import { isAiStockSession, isSellgoSession } from '../../../utils/session';
import { isMigrationSuccess } from '../../../utils/subscriptions';
import { SellerSubscription } from '../../../interfaces/Seller';

import { getSellerSubscription } from '../../../selectors/Subscription';
import { subscriptionDetailsMapping } from '../../../constants/Subscription/Sellgo';
import { Icon } from 'semantic-ui-react';
interface Props {
  match: any;
  sellerSubscription: SellerSubscription;
}

const SettingsNav = (props: Props) => {
  const { match, sellerSubscription } = props;
  const handleGoBack = () => {
    history.goBack();
  };

  console.log('SETTINGS NAV =>', match);
  return (
    <div className={styles.settingsNav}>
      <button className={styles.goBackButton} onClick={handleGoBack}>
        <img src={LeftArrow} alt="left arrow" />
        Back
      </button>
      <div className={styles.settingsPagesMenu}>
        {SETTINGS_PAGES.map((page: any) => {
          if (!page.showInSellgo && isSellgoSession()) {
            return null;
          } else if (!page.showInAistock && isAiStockSession()) {
            return null;
          }

          if (!page.disabled) {
            const isActive = match.path === page.url;
            const isMigrationRunning = !isMigrationSuccess(sellerSubscription);
            const isLeadTime = page.name === 'Global: Lead Time';
            const isEnablesForEliteOnly = page.isOnlyForElite;
            let showLock = false;
            const isBeta = page.isBeta;
            if (
              isEnablesForEliteOnly &&
              page.showInSellgo &&
              subscriptionDetailsMapping.team !== sellerSubscription.subscription_id
            ) {
              showLock = true;
            }
            return (
              <div
                className={`${styles.settingWrapper} ${isMigrationRunning &&
                  !isLeadTime &&
                  !isSellgoSession() &&
                  styles.disabled}`}
                key={page.url}
              >
                {/* Main page */}
                <Link key={page.url} to={page.url} style={{ textDecoration: 'none' }}>
                  <div
                    className={
                      isActive
                        ? `${styles.settingPageOption} 
                        ${styles.settingPageOption__active}`
                        : styles.settingPageOption
                    }
                  >
                    {page.name} {showLock && <Icon name="lock" />}{' '}
                    {isBeta && <p className={styles.beta}>Beta</p>}
                  </div>
                </Link>
                <div className={styles.settingsSubPagesMenu}>
                  {/* Sub pages */}
                  {isActive &&
                    page.subPages.map((subPage: any) => {
                      const isActive = match.path === subPage.url;
                      return (
                        <Link key={subPage.url} to={subPage.url} style={{ textDecoration: 'none' }}>
                          <div
                            className={
                              isActive
                                ? `${styles.settingSubPageOption} 
                                ${styles.settingSubPageOption__small} ${styles.settingSubPageOption__active}`
                                : `${styles.settingSubPageOption} ${styles.settingPageOption__small}`
                            }
                          >
                            {subPage.name}
                          </div>
                        </Link>
                      );
                    })}
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};
const mapStateToProps = (state: any) => {
  return {
    sellerSubscription: getSellerSubscription(state),
  };
};

export default connect(mapStateToProps)(SettingsNav);
