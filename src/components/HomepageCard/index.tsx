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
  disabled?: boolean;
  className?: string;
}

export default (props: Props) => {
  const { label, desc, to, icon, className, disabled, openNewTab } = props;
  if (openNewTab) {
    return (
      <a
        href={to}
        style={{ textDecoration: 'none' }}
        target="_blank"
        rel="noopener noreferrer"
        className={`
          ${styles.cardWrapper} 
          ${disabled ? styles.cardWrapper__disabled : ''} 
          ${className}`}
      >
        <div className={styles.imageWrapper}>
          <img src={icon} alt="nav-icon" />
        </div>
        <p className={styles.label}>{label}</p>
        <p className={styles.desc}>{desc}</p>
      </a>
    );
  }
  return (
    <Link
      to={to}
      style={{ textDecoration: 'none' }}
      className={`
        ${styles.cardWrapper} 
        ${disabled ? styles.cardWrapper__disabled : ''} 
        ${className}`}
    >
      <div className={styles.imageWrapper}>
        <img src={icon} alt="nav-icon" />
      </div>
      <p className={styles.label}>{label}</p>
      <p className={styles.desc}>{desc}</p>
    </Link>
  );
};
