import React from 'react';

/* Assets */
import { ReactComponent as HomeIcon } from '../../../assets/images/house-user-solid.svg';

/* Styling */
import styles from './index.module.scss';

const LeadTimeMeta = () => {
  return (
    <>
      <div className={styles.settingMetaTitle}>
        <HomeIcon />
        &nbsp;&nbsp;HOME
      </div>
    </>
  );
};
export default LeadTimeMeta;
