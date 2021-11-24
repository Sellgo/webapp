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
              return (
                <Link key={page.url} to={page.url} style={{ textDecoration: 'none' }}>
                  <div
                    className={
                      match.path === page.url
                        ? `${styles.settingPageOption} ${styles.settingPageOption__active}`
                        : styles.settingPageOption
                    }
                  >
                    {page.name}
                  </div>
                </Link>
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
