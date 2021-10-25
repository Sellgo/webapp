import React from 'react';

/* Styling */
import styles from './index.module.scss';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const ProfileBoxContainer = (props: Props) => {
  const { children, className } = props;

  return <div className={`${styles.profileBoxContainer} ${className}`}>{children}</div>;
};

export default ProfileBoxContainer;
