import React from 'react';

/* Styling */
import styles from './index.module.scss';

interface Props {
  children: React.ReactNode;
}

const ProfileBoxFooter = (props: Props) => {
  const { children } = props;

  return <div className={styles.profileBoxFooter}>{children}</div>;
};

export default ProfileBoxFooter;
