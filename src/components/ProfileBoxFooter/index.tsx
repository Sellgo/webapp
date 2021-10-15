import React from 'react';

/* Styling */
import styles from './index.module.scss';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const ProfileBoxFooter = (props: Props) => {
  const { children, className } = props;

  return <div className={`${styles.profileBoxFooter} ${className}`}>{children}</div>;
};

export default ProfileBoxFooter;
