import React from 'react';

/* Styling */
import styles from './index.module.scss';

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const BoxHeader = (props: Props) => {
  const { children, className, onClick } = props;

  return (
    <div className={`${styles.profileBoxHeader} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default BoxHeader;
