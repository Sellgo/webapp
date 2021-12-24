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

interface Props {
  match: any;
}

const SettingsNav = (props: Props) => {
  const { match } = props;
  const firstTimeLoggedIn = isFirstTimeLoggedIn();
  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <div className={styles.settingsNav}>
      <button className={styles.goBackButton} onClick={handleGoBack}>
        <img src={LeftArrow} alt="left arrow" />
        Back to previous page
      </button>

      {!firstTimeLoggedIn && (
        <div className={styles.settingsPagesMenu}>
          {SETTINGS_PAGES.map((page: any) => {
            if (!page.disabled) {
              const isActive = match.path === page.url;
              return (
                <div className={styles.settingWrapper}>
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

export default SettingsNav;
