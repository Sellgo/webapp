import React from 'react';
import { Link } from 'react-router-dom';

/* Styling */
import styles from './index.module.scss';

interface Props {
  settingsPages: { url: string; name: string; disabled: boolean }[];
}

const PerfectStockSettingsNav = (props: Props) => {
  const { settingsPages } = props;

  return (
    <div className={styles.settingsNav}>
      <div className={styles.settingsPagesMenu}>
        {settingsPages.map((page: any) => {
          if (!page.disabled) {
            const isActive = window.location.pathname === page.url;
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

export default PerfectStockSettingsNav;
