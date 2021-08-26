import React from 'react';

/* Styling */
import styles from './index.module.scss';

interface Props {
  children: React.ReactNode;
}

const ProfileBoxHeader = (props: Props) => {
  const { children } = props;

  return <div className={styles.profileBoxHeader}>{children}</div>;
};

export default ProfileBoxHeader;
