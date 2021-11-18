import React from 'react';

/* Styling */
import styles from './index.module.scss';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const BoxHeader = (props: Props) => {
  const { children, className } = props;

  return <div className={`${styles.profileBoxHeader} ${className}`}>{children}</div>;
};

export default BoxHeader;
