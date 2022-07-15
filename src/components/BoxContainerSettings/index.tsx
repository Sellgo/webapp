import React from 'react';

/* Styling */
import styles from './index.module.scss';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const BoxContainerSettings = (props: Props) => {
  const { children, className } = props;

  return <div className={`${styles.profileBoxContainerSettings} ${className}`}>{children}</div>;
};

export default BoxContainerSettings;
