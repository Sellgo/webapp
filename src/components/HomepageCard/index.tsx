import * as React from 'react';
import { Link } from 'react-router-dom';

/* Styling */
import styles from './index.module.scss';

interface Props {
  label: string;
  desc: string;
  to: string;
  icon: string;
  openNewTab?: boolean;
  className?: string;
}

export default (props: Props) => {
  const { label, desc, to, icon, className, openNewTab } = props;
  if (openNewTab) {
    return (
      <a href={to} style={{ textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
        <div className={`${styles.cardWrapper} ${className}`}>
          <div className={styles.imageWrapper}>
            <img src={icon} alt="nav-icon" />
          </div>
          <p className={styles.label}>{label}</p>
          <p className={styles.desc}>{desc}</p>
        </div>
      </a>
    );
  }
  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      <div className={`${styles.cardWrapper} ${className}`}>
        <div className={styles.imageWrapper}>
          <img src={icon} alt="nav-icon" />
        </div>
        <p className={styles.label}>{label}</p>
        <p className={styles.desc}>{desc}</p>
      </div>
    </Link>
  );
};
