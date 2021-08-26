import React from 'react';

/* Styling */
import styles from './index.module.scss';

interface Props {
  children: React.ReactNode;
}

const ProfileBoxContainer = (props: Props) => {
  const { children } = props;

  return <div className={styles.profileBoxContainer}>{children}</div>;
};

export default ProfileBoxContainer;
