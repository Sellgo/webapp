import React from 'react';
import { Link } from 'react-router-dom';

/* Styling */
import styles from './index.module.scss';

/* Components */
import LeftArrow from '../../../assets/images/leftArrowLong.svg';
import history from '../../../history';

/* Constants */
import { SETTINGS_PAGES } from '../../../constants/Settings';

/* Types */
import { isAiStockSession, isSellgoSession } from '../../../utils/session';

interface Props {
  match: any;
}

const SettingsNav = (props: Props) => {
  const { match } = props;
  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <div className={styles.settingsNav}>
      <button className={styles.goBackButton} onClick={handleGoBack}>
        <img src={LeftArrow} alt="left arrow" />
        Back to previous page
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

export default SettingsNav;
