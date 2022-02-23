import React from 'react';
import { Link } from 'react-router-dom';

/* Styling */
import styles from './index.module.scss';

/* Components */
import LeftArrow from '../../../assets/images/leftArrowLong.svg';
import history from '../../../history';

/* Constants */
import { SETTINGS_PAGES } from '../../../constants/Settings';

/* Utils */
import { isFirstTimeLoggedIn } from '../../../utils/subscriptions';

/* Types */
import { SellerSubscription } from '../../../interfaces/Seller';
import { getSellerSubscription } from '../../../selectors/Subscription';
import { connect } from 'react-redux';

interface Props {
  match: any;
  sellerSubscription: SellerSubscription;
}

const SettingsNav = (props: Props) => {
  const { match, sellerSubscription } = props;
  const firstTimeLoggedIn = isFirstTimeLoggedIn();
  const isAiStock = sellerSubscription.is_aistock;
  const handleGoBack = () => {
    history.goBack();
  };

  /* Disabling settings based on seller subscription */
  const filteredSettingsPages = SETTINGS_PAGES.map(page => {
    if (
      (page.name === 'Subscription' || page.name === 'Billing' || page.name === 'API Keys') &&
      isAiStock
    ) {
      return {
        ...page,
        disabled: true,
      };
    } else if (page.name === 'AiStock' && !isAiStock) {
      return {
        ...page,
        disabled: true,
      };
    } else {
      return page;
    }
  });

  return (
    <div className={styles.settingsNav}>
      <button className={styles.goBackButton} onClick={handleGoBack}>
        <img src={LeftArrow} alt="left arrow" />
        Back to previous page
      </button>

      {!firstTimeLoggedIn && (
        <div className={styles.settingsPagesMenu}>
          {filteredSettingsPages.map((page: any) => {
            if (!page.disabled) {
              const isActive = match.path === page.url;
              return (
                <div className={styles.settingWrapper} key={page.url}>
                  {/* Main page */}
                  <Link key={page.url} to={page.url} style={{ textDecoration: 'none' }}>
                    <div
                      className={
                        isActive
                          ? `${styles.settingPageOption} ${styles.settingPageOption__active}`
                          : styles.settingPageOption
                      }
                    >
                      {page.name}
                    </div>
                  </Link>

                  {/* Sub pages */}
                  {isActive &&
                    page.subPages.map((subPage: any) => {
                      const isActive = match.path === subPage.url;
                      return (
                        <Link key={subPage.url} to={subPage.url} style={{ textDecoration: 'none' }}>
                          <div
                            className={
                              isActive
                                ? `${styles.settingPageOption} 
                                  ${styles.settingPageOption__small} ${styles.settingPageOption__active}`
                                : `${styles.settingPageOption} ${styles.settingPageOption__small}`
                            }
                          >
                            {subPage.name}
                          </div>
                        </Link>
                      );
                    })}
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    sellerSubscription: getSellerSubscription(state),
  };
};

export default connect(mapStateToProps)(SettingsNav);
